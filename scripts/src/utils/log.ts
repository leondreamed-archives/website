import process from 'node:process';

export function logDebug(fn: () => unknown) {
	if (process.env.DEBUG) {
		fn();
	}
}
