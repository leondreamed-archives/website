import path from 'node:path';
import { join } from 'desm';
import onetime from 'onetime';

export const getRootPath = onetime(() => join(import.meta.url, '../../..'));

export function getDavinciPythonScriptPath(scriptName: string) {
	const rootPath = getRootPath();
	return path.join(
		rootPath,
		'./scripts/src/davinci/python',
		`${scriptName}.py`
	);
}
