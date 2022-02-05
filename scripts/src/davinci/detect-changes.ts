/* eslint-disable @typescript-eslint/naming-convention */

import { join } from 'desm';
import { getProjectName, runDavinciScript } from '../utils/davinci.js';

await runDavinciScript({
	scriptPath: join(import.meta.url, './python/detect-changes.py'),
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});
