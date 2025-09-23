import process from 'node:process';
import { readFileSync, unlinkSync, writeFileSync } from 'node:fs';

/* @note Mostly inspired by Boosted / Bootstrap
 * @link https://github.com/Orange-OpenSource/Orange-Boosted-Bootstrap/blob/main/build/change-version.mjs
 */

const oldVersion = readFileSync('build/version.txt', 'utf8');
const newVersion = process.env.npm_new_version;

const oldSemver = oldVersion.split('-')[0];
const newSemver = newVersion.split('-')[0];
const isrelease = (oldSemver !== oldVersion) || (newSemver !== newVersion);

const files = [
	'src/app/core/constantes.core.ts',
	'src/extension/manifest.chrome.json',
	'src/extension/manifest.firefox.json',
	'src/site/index.html',
	'src/site/index_en.html',
	'src/site/index_pl.html',
];

function regExpQuote(string) {
	return string.replace(/[$()*+-.?[\\\]^{|}]/g, '\\$&')
}

function regExpQuoteReplacement(string) {
	return string.replace(/\$/g, '$$')
}

function replaceRecursively(file) {
	const originalString = readFileSync(file, 'utf8');
	let newString = originalString
		.replace(
			new RegExp(regExpQuote(oldVersion), 'g'),
			regExpQuoteReplacement(newVersion)
		);

	if (isrelease && file.includes('manifest')) {
		newString = newString
			.replace(
				new RegExp(regExpQuote(`"version": "${oldSemver}",`), 'g'),
				regExpQuoteReplacement(`"version": "${newSemver}",`)
			);
	}

	if (originalString === newString) {
		return;
	}

	writeFileSync(file, newString, 'utf8');
}

files.forEach(file => replaceRecursively(file));
unlinkSync('build/version.txt');
