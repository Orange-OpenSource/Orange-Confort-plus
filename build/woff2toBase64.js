#!/usr/bin/env node

/*!
 * Script to convert woff2 font files to base64
 * and inline them as JavaScript variables
 */

'use strict'

const fs = require('node:fs')
const path = require('node:path')
const globby = require('globby')


const fontsPath = path.resolve(__dirname, '../src/fonts/').replace(/\\/g, '/')
const fontsFiles = globby.sync(`${fontsPath}/**/*.woff2`)

let encodedFonts = {};

function encodeFont(file) {
	const encodedFont = fs.readFileSync(file, 'base64');
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

fontsFiles.forEach(file => {
	const embeddableFont = encodeFont(file);
	Object.assign(encodedFonts, embeddableFont);
})

fs.writeFileSync('src/js/fonts.js', `const fontsPath = ${JSON.stringify(encodedFonts)}`);
