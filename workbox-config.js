module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{png,jpg,js,gif,css,wasm,ico,html}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'dist/sw.js',
	sourcemap: false,
};