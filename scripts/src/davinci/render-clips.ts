/* eslint-disable @typescript-eslint/naming-convention */

import { join } from 'desm';
import { getProjectName, runDavinciScript } from '../utils/davinci.js';

const renderClipsScriptPath = join(import.meta.url, './python/render-clips.py');

await runDavinciScript({
	scriptPath: renderClipsScriptPath,
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});
