/* eslint-disable @typescript-eslint/naming-convention */

import fs from 'node:fs';
import { join } from 'desm';
import pWaitFor from 'p-wait-for';
import { Listr } from 'listr2';
import {
	getDavinciCompositions,
	getProjectName,
	runDavinciScript,
} from '../utils/davinci.js';

const fusionCompositions = getDavinciCompositions();

// Remove old compositions
for (const fusionComposition of fusionCompositions) {
	fs.rmSync(fusionComposition.path, { recursive: true, force: true });
}

const renderCompositionsScriptPath = join(
	import.meta.url,
	'./python/render-compositions.py'
);

await runDavinciScript({
	scriptPath: renderCompositionsScriptPath,
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});

const tasks = new Listr([], {
	concurrent: true,
});

for (const fusionComposition of fusionCompositions) {
	tasks.add({
		title: `Waiting for ${fusionComposition.name}.mov to finish rendering...`,
		async task() {
			return pWaitFor(() => fs.existsSync(fusionComposition.path), {
				interval: 500,
			});
		},
	});
}

await tasks.run();
