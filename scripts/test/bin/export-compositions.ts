import {
	getDavinciPythonScriptPath,
	getProjectName,
	runDavinciScript,
} from '../../src/utils/index.js';

await runDavinciScript({
	scriptPath: getDavinciPythonScriptPath('export-compositions'),
	envVars: {
		PROJECT_NAME: getProjectName(),
	},
});
