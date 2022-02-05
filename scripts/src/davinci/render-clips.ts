/* eslint-disable @typescript-eslint/naming-convention */

import fs from 'node:fs';
import { join } from 'desm';
import pWaitFor from 'p-wait-for';
import ora from 'ora';
import {
	getDavinciConfig,
	getProjectName,
	runDavinciScript,
} from '../utils/davinci.js';
import { getRootPath } from '../utils/paths.js';

const rootPath = getRootPath();

const davinciConfig = getDavinciConfig();
const fusionCompositions = Object.keys(davinciConfig.fusionCompositions);
const fusionCompositionPaths = fusionCompositions.map((comp) =>
	join(rootPath, `./assets/${comp}`)
);

// Remove old clips
for (const fusionCompositionPath of fusionCompositionPaths) {
	fs.rmSync(fusionCompositionPath, { recursive: true });
}

const renderClipsScriptPath = join(import.meta.url, './python/render-clips.py');

await runDavinciScript({
	scriptPath: renderClipsScriptPath,
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});

await Promise.all(
	Object.keys(davinciConfig.fusionCompositions).map(async (comp) => {
		ora(`Waiting for ${comp}.mov to finish rendering...`).start();
		return pWaitFor(() =>
			fs.existsSync(join(rootPath, `./assets/${comp}.mov`))
		);
	})
);
