/* eslint-disable @typescript-eslint/naming-convention */

import process from 'node:process';
import type { Buffer } from 'node:buffer';
import { execaSync, execa } from 'execa';
import { join } from 'desm';

const resolveExecutablePath =
	'/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/MacOS/Resolve';

const davinciProcess = execa(resolveExecutablePath, ['-nogui']);

await new Promise((_resolve) => {
	davinciProcess.stderr.on('data', (data: Buffer) => {
		console.log(`stderr: ${data.toString()}`);
	});
	davinciProcess.stdout.on('data', (data: Buffer) => {
		console.log(`stdout: ${data.toString()}`);
	});
});

const fuscriptPath =
	'/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fuscript';

const pythonScriptPath = join(import.meta.url, './python/create-project.py');

console.log(
	execaSync(fuscriptPath, ['-l', 'python3', pythonScriptPath], {
		env: {
			PYTHONPATH: `${process.env
				.PYTHONPATH!}:/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules`,
		},
	})
);

davinciProcess.kill();
