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
	'toolbar': {
		files: [
			'dist/js/app/app.component.js',
			'dist/js/app/features/layout/layout.component.js',
			'dist/js/app/features/picture-video/picture-video.component.js',
			'dist/js/app/features/pointer/pointer.component.js',
			'dist/js/app/features/sound/sound.component.js',
			'dist/js/app/features/text/text.component.js',
			'dist/js/app/features/text/components/font-family.component.js',
			'dist/js/app/features/text/components/increase-text-size.component.js',
			'dist/js/app/features/text/components/reading-guide.component.js',
			'dist/js/app/features/text/components/text-transform.component.js',
			'dist/js/app/features/toolbar.component.js',
		],
		dist: 'dist/js/toolbar.js',
		options: {
			compress: false,
			mangle: false,
			format: {
				preamble: preamble
			}
		}
	},
	'server': {
		files: [
			'src/serveur/js/services/i18n.service.js',
			'src/serveur/js/services/path.service.js',
			'dist/js/toolbar.js'
		],
		dist: 'dist/serveur/js/toolbar.js',
		options: {
			compress: false,
			mangle: false,
			format: {
				preamble: preamble
			}
		}
	},
	'extension': {
		files: [
			'src/extension/services/i18n.service.js',
			'src/extension/services/path.service.js',
			'dist/js/toolbar.js'
		],
		dist: 'dist/extension/js/toolbar.js',
		options: {
			compress: false,
			mangle: false,
			format: {
				preamble: preamble
			}
		}
	},
	'min-server': {
		files: ['dist/serveur/js/toolbar.js'],
		dist: 'dist/serveur/js/toolbar.min.js',
		options: {
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
	},
	'min-extension': {
		files: ['dist/extension/js/toolbar.js'],
		dist: 'dist/extension/js/toolbar.min.js',
		options: {
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
