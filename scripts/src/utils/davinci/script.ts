import process from 'node:process';
import type { Buffer } from 'node:buffer';
import type { Options as ExecaOptions } from 'execa';
import { execa } from 'execa';
import { logDebug } from '../log.js';
import { startFusionServer } from './config.js';

type RunDavinciScriptProps = {
	scriptPath: string;
	envVars?: Record<string, string>;
	execaOptions?: ExecaOptions;
	waitForServerStart?: boolean;
	silent?: boolean;
};
export async function runDavinciScript({
	scriptPath,
	envVars,
	execaOptions,
	waitForServerStart = true,
	silent,
}: RunDavinciScriptProps) {
	let davinciProcessPid: number | undefined;
	if (waitForServerStart) {
		davinciProcessPid = await startFusionServer();
	}

	const fuscriptPath =
		'/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fuscript';

	if (!silent) {
		logDebug(() => 'Running the DaVinci script...');
	}

	const scriptProcess = execa(
		'script',
		['-q', '/dev/null', fuscriptPath, '-l', 'python3', scriptPath],
		{
			stdio: 'pipe',
			env: {
				PYTHONPATH: `${process.env
					.PYTHONPATH!}:/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules`,
				...envVars,
			},
			...execaOptions,
		}
	);

	if (!silent) {
		// Excludes some weird "Exception ignored in:" message from the output
		// that only appears when using Python 3 with DaVinci
		scriptProcess.stdout?.on('data', (data: Buffer) => {
			const dataString = data.toString();
			if (!dataString.includes('Exception ignored in:')) {
				logDebug(() => dataString);
			}
		});

		scriptProcess.stderr?.on('data', (data: Buffer) => {
			const dataString = data.toString();
			if (!dataString.includes('Exception ignored in:')) {
				logDebug(() => dataString);
			}
		});
	}

	const result = await scriptProcess;

	// Don't kill the Fusion server if we never waited for it to start or if it was already started before this script was run
	if (waitForServerStart && davinciProcessPid !== undefined) {
		process.kill(davinciProcessPid);
	}

	return result;
}
