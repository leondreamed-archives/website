const path = require('path');
const createAliases = require('@leonzalion/configs/eslint/alias');

module.exports = {
	extends: [require.resolve('@leonzalion/configs/eslint')],
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
			},
		],
	},
	settings: createAliases({ '~': './src', '~test': './test' }),
};
