/* eslint-disable @typescript-eslint/naming-convention */

import path from 'node:path';
import fs from 'node:fs';
import { join } from 'desm';
import pWaitFor from 'p-wait-for';
import { Listr } from 'listr2';
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
	path.join(rootPath, `./assets/${comp}.mov`)
);

// Remove old clips
for (const fusionCompositionPath of fusionCompositionPaths) {
	fs.rmSync(fusionCompositionPath, { recursive: true, force: true });
}

const renderClipsScriptPath = join(import.meta.url, './python/render-clips.py');

await runDavinciScript({
	scriptPath: renderClipsScriptPath,
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});

const tasks = new Listr([], {
	concurrent: true,
});

for (const fusionCompositionName of Object.keys(
	davinciConfig.fusionCompositions
)) {
	tasks.add({
		title: `Waiting for ${fusionCompositionName}.mov to finish rendering...`,
		async task() {
			return pWaitFor(
				() =>
					fs.existsSync(
						path.join(rootPath, `./assets/${fusionCompositionName}.mov`)
					),
				{ interval: 500 }
			);
		},
	});
}

await tasks.run();
