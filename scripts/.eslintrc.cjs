const path = require('path');

module.exports = {
	extends: '../.eslintrc.cjs',
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.eslint.json'),
	},
	rules: {
		'unicorn/no-process-exit': 'off',
	},
};
