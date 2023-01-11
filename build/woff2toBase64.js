#!/usr/bin/env node

/*!
 * Script to convert woff2 font files to base64
 * and inline them as JavaScript variables
 */

'use strict'

const fs = require('node:fs')
const path = require('node:path')

// @todo Try to get those dynamically: ./src/fonts/**/*.woff2 ?
const files = [
	'src/fonts/orangeconfortplus.woff2',
	'src/fonts/accessibleDFA/AccessibleDfA-Bold.woff2',
	'src/fonts/accessibleDFA/AccessibleDfA-Italic.woff2',
	'src/fonts/accessibleDFA/AccessibleDfA-Regular.woff2',
	'src/fonts/luciole/Luciole-Regular.woff2',
	'src/fonts/luciole/Luciole-Regular-Italic.woff2',
	'src/fonts/luciole/Luciole-Bold.woff2',
	'src/fonts/luciole/Luciole-Bold-Italic.woff2',
	'src/fonts/open-dyslexic/OpenDyslexic-Bold.woff2',
	'src/fonts/open-dyslexic/OpenDyslexic-BoldItalic.woff2',
	'src/fonts/open-dyslexic/OpenDyslexic-Italic.woff2',
	'src/fonts/open-dyslexic/OpenDyslexic-Regular.woff2',
	'src/fonts/open-sans/OpenSans-Regular.woff2',
	'src/fonts/open-sans/OpenSans-Italic.woff2',
	'src/fonts/open-sans/OpenSans-Bold.woff2',
	'src/fonts/open-sans/OpenSans-BoldItalic.woff2'
]

let encodedFonts = {};

function encodeFont(file) {
	const font = fs.readFileSync(file, 'utf8');
	const encodedFont = new Buffer.from(font).toString('base64');
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

	// @note Headers could be application/font-woff2;charset=utf-8;
	return {
		[fontIdentifier]: `url('data:font/woff2;base64,${encodedFont}') format('woff2')`
	}
}

files.forEach(file => {
	const embeddableFont = encodeFont(file);
	Object.assign(encodedFonts, embeddableFont);
})

// @todo Rename this to encodedFonts or something
// @note Maybe make it a dist file only?
fs.writeFileSync('src/js/fonts.js', `const fontsPath = ${JSON.stringify(encodedFonts)}`);
