const createESLintConfig = require('lionconfig/eslint');

module.exports = createESLintConfig(__dirname, {
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