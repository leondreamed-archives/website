/* eslint-disable @typescript-eslint/naming-convention */

import { join } from 'desm';
import { getProjectName, runDavinciScript } from '../utils/davinci.js';

const exportProjectScriptPath = join(
	import.meta.url,
	'./python/export-project.py'
);

await runDavinciScript({
	scriptPath: exportProjectScriptPath,
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});
