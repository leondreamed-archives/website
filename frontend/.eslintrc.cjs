const path = require('path');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: '../.eslintrc.cjs',
	parserOptions: {
		project: [path.resolve(__dirname, './tsconfig.eslint.json')],
		extraFileExtensions: ['.vue'],
	},
	rules: {
		'import/extensions': [
			'error',
			{
				js: 'never',
				ts: 'never',
				vue: 'always',
				png: 'always',
				jpeg: 'always'
			},
		],
	},
	overrides: [
		{
			files: ['src/**/*.vue'],
			rules: {
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/consistent-type-imports': 'off',
			},
		},
	],
});
