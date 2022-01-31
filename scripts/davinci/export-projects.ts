/* eslint-disable @typescript-eslint/naming-convention */

import process from 'node:process';
import type { Buffer } from 'node:buffer';
import { execaSync, execa } from 'execa';
import { join } from 'desm';

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
const davinciProcessPid = await new Promise<number>((resolve) => {
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

const pythonScriptPath = join(import.meta.url, './python/create-project.py');

console.info('Running the DaVinci script...');

console.log(
	execaSync(fuscriptPath, ['-l', 'py3', pythonScriptPath], {
		env: {
			PYTHONPATH: `${process.env
				.PYTHONPATH!}:/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules`,
		},
	})
);

process.kill(davinciProcessPid, 'SIGTERM');
