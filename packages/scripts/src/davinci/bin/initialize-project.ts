import * as process from 'node:process';
import { runDavinciScript } from '../../utils/davinci/script.js';
import {
	getDavinciPythonScriptPath,
	getProjectName,
} from '../../utils/index.js';

process.env.DEBUG = '1';
await runDavinciScript({
	scriptPath: getDavinciPythonScriptPath('initialize-project'),
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});
