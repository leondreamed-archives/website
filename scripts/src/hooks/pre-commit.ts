import process from 'node:process';
import { execaCommandSync as exec } from 'execa';

if (process.env.CI) process.exit(0);

try {
	exec('pnpm exec lint-staged', { stdio: 'inherit' });
} catch {
	process.exit(1);
}
