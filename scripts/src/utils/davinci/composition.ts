/* eslint-disable @typescript-eslint/naming-convention */

import fs from 'node:fs';
import path from 'node:path';
import { Listr } from 'listr2';
import onetime from 'onetime';
import pWaitFor from 'p-wait-for';
import type { DavinciComposition } from '../../types/davinci.js';
import { getDavinciPythonScriptPath, getRootPath } from '../paths.js';
import { getDavinciConfig, getProjectName } from './config.js';
import { runDavinciScript } from './script.js';

export const getDavinciCompositionFilesFolder = onetime(() => {
	const rootPath = getRootPath();
	return path.join(rootPath, `./assets/davinci/composition-files`);
});

export const getDavinciCompositionRendersFolder = onetime(() => {
	const rootPath = getRootPath();
	return path.join(rootPath, `./assets/davinci/composition-renders`);
});

export function getDavinciCompositions(): DavinciComposition[] {
	const compositionFilesFolder = getDavinciCompositionFilesFolder();
	const compositionRendersFolder = getDavinciCompositionRendersFolder();
	return getDavinciConfig().fusionCompositions.map((composition) => ({
		...composition,
		compFilePath: path.join(compositionFilesFolder, `${composition.name}.comp`),
		renderPath: path.join(compositionRendersFolder, `${composition.name}.mov`),
	}));
}

export async function getChangedCompositions(): Promise<DavinciComposition[]> {
	const compositions = getDavinciCompositions();
	const compositionFilesFolder = getDavinciCompositionFilesFolder();

	const getOldCompositionPath = (composition: DavinciComposition) =>
		path.join(compositionFilesFolder, `${composition.name}.old.comp`);

	// Rename compositions to old composition files
	for (const composition of compositions) {
		const oldCompositionPath = getOldCompositionPath(composition);
		if (fs.existsSync(oldCompositionPath)) {
			fs.renameSync(composition.compFilePath, oldCompositionPath);
		}
	}

	// Re-export the compositions
	await runDavinciScript({
		scriptPath: getDavinciPythonScriptPath('export-compositions'),
		envVars: {
			PROJECT_NAME: getProjectName(),
		},
	});

	const changedCompositions = [];

	// Compare each old composition to the new one
	for (const composition of compositions) {
		const oldCompositionPath = getOldCompositionPath(composition);
		// If the old composition doesn't exist, add it without checking
		if (!fs.existsSync(oldCompositionPath)) {
			changedCompositions.push(composition);
			continue;
		}

		const oldComposition = fs.readFileSync(oldCompositionPath).toString();
		const newComposition = fs.readFileSync(composition.compFilePath).toString();

		if (newComposition !== oldComposition) {
			changedCompositions.push(composition);
		}
	}

	// Remove old composition files
	for (const composition of compositions) {
		fs.rmSync(getOldCompositionPath(composition), { force: true });
	}

	return changedCompositions;
}

export async function renderCompositions(compositions: DavinciComposition[]) {
	// Remove old composition renders
	for (const composition of compositions) {
		fs.rmSync(composition.renderPath, { recursive: true, force: true });
	}

	await runDavinciScript({
		scriptPath: getDavinciPythonScriptPath('render-compositions'),
		envVars: {
			PROJECT_NAME: getProjectName(),
		},
	});

	const tasks = new Listr([], {
		concurrent: true,
	});

	for (const composition of compositions) {
		tasks.add({
			title: `Waiting for ${composition.name}.mov to finish rendering...`,
			async task() {
				return pWaitFor(() => fs.existsSync(composition.renderPath), {
					interval: 500,
				});
			},
		});
	}

	await tasks.run();
}
