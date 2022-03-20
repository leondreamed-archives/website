/* eslint-disable @typescript-eslint/naming-convention */

import fs from 'node:fs';
import path from 'node:path';
import onetime from 'onetime';
import ora from 'ora';
import type { DavinciComposition } from '../../types/davinci.js';
import {
	getDavinciPythonScriptPath,
	getFrontendVideosPath,
	getRootPath,
} from '../paths.js';
import {
	getDavinciConfig,
	getProjectName,
	startFusionServer,
} from './config.js';
import { convertCompositions } from './convert.js';
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
	const getChangedCompositionsSpinner = ora(
		'🔎 Retrieving changed compositions...'
	);
	getChangedCompositionsSpinner.start();

	const compositions = getDavinciCompositions();
	const compositionFilesFolder = getDavinciCompositionFilesFolder();

	const getOldCompositionPath = (composition: DavinciComposition) =>
		path.join(compositionFilesFolder, `${composition.name}.old.comp`);

	// Rename compositions to old composition files
	for (const composition of compositions) {
		if (fs.existsSync(composition.compFilePath)) {
			const oldCompositionPath = getOldCompositionPath(composition);
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

	getChangedCompositionsSpinner.stop();

	return changedCompositions;
}

export async function renderCompositions(
	updatedCompositions: DavinciComposition[]
): Promise<DavinciComposition[]> {
	const compositionsToRender = new Set<DavinciComposition>(updatedCompositions);

	// Get all compositions without a render
	for (const composition of getDavinciCompositions()) {
		if (!fs.existsSync(composition.renderPath)) {
			compositionsToRender.add(composition);
		}
	}

	// Remove old composition renders
	for (const composition of compositionsToRender) {
		fs.rmSync(composition.renderPath, { recursive: true, force: true });
	}

	const renderSpinner = ora(
		'🎬 Waiting for compositions to finish rendering...'
	);
	renderSpinner.start();

	await runDavinciScript({
		scriptPath: getDavinciPythonScriptPath('render-compositions'),
		envVars: {
			PROJECT_NAME: getProjectName(),
			COMPOSITION_NAMES_TO_RENDER: JSON.stringify(
				[...compositionsToRender.values()].map((comp) => comp.name)
			),
		},
	});

	renderSpinner.stop();

	return [...compositionsToRender.values()];
}

export async function updateCompositionVideos() {
	await startFusionServer();
	const updatedCompositions = await getChangedCompositions();
	const renderedCompositions = await renderCompositions(updatedCompositions);
	await convertCompositions(renderedCompositions);
	return updatedCompositions;
}

export const getHevcVideoPath = (composition: DavinciComposition) =>
	path.join(getFrontendVideosPath(), `${composition.name}-hevc.mp4`);

export const getWebmVideoPath = (composition: DavinciComposition) =>
	path.join(getFrontendVideosPath(), `${composition.name}-webm.webm`);

/**
 * Takes the composition files from the assets folder and imports them
 * into the DaVinci project specified in the configs/davinci.yaml
 */
export async function importCompositions() {
	
}