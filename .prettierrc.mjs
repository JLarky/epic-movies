/** @type {import("prettier").Config} */
export default {
	plugins: ['prettier-plugin-astro'],
	printWidth: 100,
	singleQuote: true,
	tabWidth: 2,
	useTabs: true,
	trailingComma: 'es5',
	overrides: [
		{
			files: 'package.json',
			options: {
				printWidth: 9999,
			},
		},
		{
			files: '*.{json,md,prettierrc}',
			options: {
				useTabs: false,
				singleQuote: false,
			},
		},
	],
};
