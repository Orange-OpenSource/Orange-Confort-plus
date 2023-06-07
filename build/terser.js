/*!
 * Compress multiple JS files at once
 * using terser:
 * @link https://github.com/terser/terser/issues/544
 */

import { minify } from 'terser';
import { writeFileSync, readFileSync } from 'node:fs';
import process from 'node:process';
import { default as pkg } from '../package.json' assert { type: 'json'};
const date = new Date();

const code = {};
const preamble = `/*
 * ${pkg.name} - version ${pkg.version} - ${date.toLocaleDateString('en-GB')}
 * ${pkg.description}
 * © 2014 - ${date.getFullYear()} ${pkg.author}
 */`;
const files = {
	'serveur': {
		files: [
			'src/serveur/hebergement.js',
			'src/js/fonts.js',
			'src/js/ToolbarStrings.js',
			'src/js/UciUserPref.js',
			'src/serveur/UciCookie.js',
			'src/js/lang-en.js',
			'src/js/lang-es.js',
			'src/js/lang-fr.js',
			'src/js/lang-pl.js',
			'src/js/UciAideMotrice.js',
			'src/js/UciCouleur.js',
			'src/js/UciApparence.js',
			'src/js/UciSettings.js',
			'src/js/UciTypographie.js',
			'src/js/UciValidation.js',
			'src/js/UciProfile.js',
			'src/js/UciIhm.js',
			'src/js/mask.js',
			'src/js/toolbar.js',
			'src/serveur/start.js'
		],
		dist: 'dist/serveur/js/toolbar.js',
		options: {
			sourceMap: {
				filename: 'toolbar.js',
				url: 'toolbar.js.map'
			},
			compress: false,
			mangle: false,
			format: {
				preamble: preamble
			}
		}
	},
	'minified': {
		files: ['dist/serveur/js/toolbar.js'],
		dist: 'dist/serveur/js/toolbar.min.js',
		options: {
			sourceMap: {
				filename: 'toolbar.min.js',
				url: 'toolbar.min.js.map'
			},
			compress: {
				passes: 2
			},
			mangle: {
				keep_fnames: true,
				keep_classnames: true
			},
			format: {
				comments: false,
				preamble: preamble
			}
		}
	}
}

const getContext = () => {
	const hasContext = process.argv.find( element => element.startsWith( `--context=` ) );

	if ( !hasContext ) return null;

	const value= hasContext.replace( `--context=` , '' );

	return files[value];
}

const context = getContext();
context.files.forEach(async file => {
	Object.assign(code, {[file]: readFileSync(file, "utf8")});
});

const minified = await minify(code, context.options);

writeFileSync(context.dist, minified.code, 'utf-8');
if (minified.map) {
	writeFileSync(`${context.dist}.map`, minified.map, 'utf-8');
}
