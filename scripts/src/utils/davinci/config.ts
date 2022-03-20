import path from 'node:path';
import fs from 'node:fs';
import type { Buffer } from 'node:buffer';
import { setTimeout } from 'node:timers/promises';
import { execa } from 'execa';
import yaml from 'js-yaml';
import type { DavinciConfig } from '../../types/davinci.js';
import { getRootPath } from '../paths.js';
import { logDebug } from '../log.js';

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
	logDebug(() => `Running script -q /dev/null ${resolveExecutablePath} -nogui`);
	const davinciProcess = execa('script', [
		'-q',
		'/dev/null',
		resolveExecutablePath,
		'-nogui',
	]);

	logDebug(() => 'Waiting for the FusionScript server to start...');

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

	logDebug(() => `Davinci Process ID: ${davinciProcessPid}`);

	// TODO: Find a better way to guarantee that Fusion Server started
	await setTimeout(2000);

	return davinciProcessPid;
}

export function getProjectName() {
	const { projectName } = getDavinciConfig();

	if (projectName === undefined) {
		throw new Error('Could not find projectName in configs/davinci.yaml');
	}

	return projectName;
}
