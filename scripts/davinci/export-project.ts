/* eslint-disable @typescript-eslint/naming-convention */

import process from 'node:process';
import type { Buffer } from 'node:buffer';
import path from 'node:path';
import * as fs from 'node:fs';
import { execaSync, execa } from 'execa';
import { join } from 'desm';
import yaml from 'js-yaml';
import { getProjectDir } from 'lion-system';

const projectDir = getProjectDir(import.meta.url);

const davinciConfigString = fs
	.readFileSync(path.join(projectDir, 'davinci/config.yaml'))
	.toString();

const { projectName } = yaml.load(davinciConfigString) as {
	projectName: string;
};

if (projectName === undefined) {
	throw new Error('Could not find projectName in davinci/config.yaml');
}

console.info(`Project name: ${projectName}`);

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

	davinciProcess.stdout.on('data', (data: Buffer) => {
		const dataString = data.toString();
		const result = /Host 'Fusion' \[(\d+)] Added/.exec(dataString);
		if (result !== null) {
			resolve(Number(result[1]));
		}
	});
});

const fuscriptPath =
	'/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fuscript';

const pythonScriptPath = join(import.meta.url, './python/export-project.py');

console.info('Running the DaVinci script...');

execaSync(fuscriptPath, [pythonScriptPath], {
	env: {
		PYTHONPATH: `${process.env
			.PYTHONPATH!}:/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules`,
		PROJECT_NAME: projectName,
	},
	stdio: 'inherit',
});

// Don't kill the Fusion server if it was already started before this script was run
if (davinciProcessPid !== undefined) {
	process.kill(davinciProcessPid);
}
