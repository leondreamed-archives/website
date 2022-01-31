import * as path from 'node:path';
import * as fs from 'node:fs';
import { execaCommandSync as exec } from 'execa';

exec('tsc');
for (const file of ['readme.md', 'package.json']) {
	fs.copyFileSync(file, path.join('dist', file))
}