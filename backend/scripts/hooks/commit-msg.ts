import process from 'node:process';
import { execaSync } from 'execa';

if (process.env.CI) process.exit(0);

const message = process.argv.at(-1);

if (message === undefined) {
	throw new Error('No message provided.');
}

try {
	execaSync('pnpm', ['exec', 'commitlint', '--edit', message], {
		stdio: 'inherit',
	});
} catch {
	process.exit(1);
}
