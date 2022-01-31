import path from 'node:path/posix';
import { join } from 'desm';
import onetime from 'onetime';

export const getRootPath = onetime(() => join(import.meta.url, '../../..'));
export const getConfigsPath = onetime(() =>
	path.join(getRootPath(), './configs')
);
