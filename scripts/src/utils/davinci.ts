/* eslint-disable @typescript-eslint/naming-convention */

import process from 'node:process';
import type { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import { execaSync, execa } from 'execa';
import yaml from 'js-yaml';
import type { DavinciComposition, DavinciConfig } from '../types/davinci.js';
import { getRootPath } from './paths.js';

type RunDavinciScriptProps = {
	scriptPath: string;
	envVars: Record<string, string>;
};
export async function runDavinciScript({
	scriptPath,
	envVars,
}: RunDavinciScriptProps) {
	const davinciProcessPid = await startFusionServer();

	const fuscriptPath =
		'/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fuscript';

	console.info('Running the DaVinci script...');

	execaSync(fuscriptPath, [scriptPath], {
		env: {
			PYTHONPATH: `${process.env
				.PYTHONPATH!}:/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules`,
			...envVars,
		},
		stdio: 'inherit',
	});

	// Don't kill the Fusion server if it was already started before this script was run
	if (davinciProcessPid !== undefined) {
		process.kill(davinciProcessPid);
	}
}

export function getProjectName() {
	const { projectName } = getDavinciConfig();

	if (projectName === undefined) {
		throw new Error('Could not find projectName in configs/davinci.yaml');
	}

	return projectName;
}

export function getDavinciConfig(): DavinciConfig {
	const projectDir = getRootPath();

	const davinciConfigString = fs
		.readFileSync(path.join(projectDir, 'configs/davinci.yaml'))
		.toString();

	return yaml.load(davinciConfigString) as DavinciConfig;
}

export async function startFusionServer(): Promise<number | undefined> {
	const resolveExecutablePath =
		'/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/MacOS/Resolve';

	// Using the `script` executable to trick DaVinci into thinking we're
	// running the command from a TTY (because DaVinci changes its output)
	// otherwise that hides when the FusionScript Server starts which we
	// need to know so that we know when to run our DaVinci script
	const davinciProcess = execa('script', [
		'-q',
		'/dev/null',
		resolveExecutablePath,
		'-nogui',
	]);

	console.info('Waiting for the FusionScript server to start...');

	// If the davinciProcess closed, that means the Fusion server has already started
	const davinciProcessPid = await new Promise<number | undefined>((resolve) => {
		void davinciProcess.on('close', () => {
			resolve(undefined);
		});

		davinciProcess.stdout?.on('data', (data: Buffer) => {
			const dataString = data.toString();
			const result = /Host 'Fusion' \[(\d+)] Added/.exec(dataString);
			if (result !== null) {
				resolve(Number(result[1]));
			}
		});
	});

	return davinciProcessPid;
}

type AugmentedDavinciCompositions = DavinciComposition & {
	path: string;
};
export function getDavinciCompositions(): AugmentedDavinciCompositions[] {
	const rootPath = getRootPath();
	return getDavinciConfig().fusionCompositions.map((composition) => ({
		...composition,
		path: path.join(rootPath, `./assets/${composition.name}.mov`),
	}));
}
