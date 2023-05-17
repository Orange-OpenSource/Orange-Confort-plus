/*!
 * Script to convert woff2 font files to base64
 * and inline them as JavaScript variables
 */

import { writeFileSync, readFileSync } from 'node:fs';
import { globbySync }  from 'globby';

const fontsFiles = globbySync(`src/fonts/**/*.{woff,woff2}`)
let encodedFonts = {};

function encodeFont(file) {
	const encodedFont = readFileSync(file, 'base64');
	let fontIdentifier;

	if (file.includes('orangeconfortplus')) {
		fontIdentifier = 'fonticone'
	} else {
		fontIdentifier = file
			.split('/')
			.pop()
			.split('.')[0]
			.toLowerCase()
			.replace('-', '');
	}

	return {
		[fontIdentifier]: `url('data:font/woff2;base64,${encodedFont}') format('woff2')`
	}
}

fontsFiles.forEach(file => {
	const embeddableFont = encodeFont(file);
	Object.assign(encodedFonts, embeddableFont);
})

writeFileSync('src/js/fonts.js', `const fontsPath = ${JSON.stringify(encodedFonts)}`);
