/* eslint-disable @typescript-eslint/naming-convention */

import path from 'node:path';
import * as fs from 'node:fs';
import { join } from 'desm';
import yaml from 'js-yaml';
import { getRootPath } from '../utils/paths.js';
import { runDavinciScript } from '../utils/davinci.js';

const projectDir = getRootPath();

const davinciConfigString = fs
	.readFileSync(path.join(projectDir, 'davinci/config.yaml'))
	.toString();

const { projectName } = yaml.load(davinciConfigString) as {
	projectName: string;
};

if (projectName === undefined) {
	throw new Error('Could not find projectName in davinci/config.yaml');
}

console.info(`Project name: ${projectName}`);

const exportProjectScriptPath = join(
	import.meta.url,
	'./python/export-project.py'
);

await runDavinciScript({
	scriptPath: exportProjectScriptPath,
	envVars: {
		PROJECT_NAME: projectName,
	},
});
