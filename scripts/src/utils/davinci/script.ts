import process from 'node:process';
import type { Buffer } from 'node:buffer';
import { execa } from 'execa';
import { startFusionServer } from './config.js';

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

	const scriptProcess = execa(
		'script',
		['-q', '/dev/null', fuscriptPath, '-l', 'python3', scriptPath],
		{
			stdio: 'pipe',
			env: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				PYTHONPATH: `${process.env
					.PYTHONPATH!}:/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting/Modules`,
				...envVars,
			},
		}
	);

	// Excludes some weird "Exception ignored in:" message from the output
	// that only appears when using Python 3 with DaVinci
	scriptProcess.stdout?.on('data', (data: Buffer) => {
		const dataString = data.toString();
		if (!dataString.includes('Exception ignored in:')) {
			console.info(dataString);
		}
	});

	await scriptProcess;

	// Don't kill the Fusion server if it was already started before this script was run
	if (davinciProcessPid !== undefined) {
		process.kill(davinciProcessPid);
	}
}
