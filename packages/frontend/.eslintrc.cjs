const createESLintConfig = require('@leonzalion/configs/eslint.cjs');

module.exports = createESLintConfig(__dirname, {
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
})