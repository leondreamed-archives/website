import { join } from 'desm';
import { runDavinciScript } from '../../utils/davinci/script.js';
import { getProjectName } from '../../utils/index.js';

process.env.DEBUG = '1';
await runDavinciScript({
	scriptPath: join(import.meta.url, '../python/initialize-project.py'),
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});
