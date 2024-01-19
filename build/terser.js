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
			'dist/js/app/services/mode-of-use.service.js',
			'dist/js/app/services/route.service.js',
			'dist/js/app/core/services.core.js',
			'dist/js/app/app.component.js',
			'dist/js/app/shared/settings/abstract-setting.component.js',
			'dist/js/app/shared/settings/color-contrast.component.js',
			'dist/js/app/shared/settings/cursor-aspect.component.js',
			'dist/js/app/shared/settings/focus-aspect.component.js',
			'dist/js/app/shared/settings/font-family.component.js',
			'dist/js/app/shared/settings/increase-text-size.component.js',
			'dist/js/app/shared/settings/link-style.component.js',
			'dist/js/app/shared/settings/margin-align.component.js',
			'dist/js/app/shared/settings/reading-guide.component.js',
			'dist/js/app/shared/settings/scroll.component.js',
			'dist/js/app/shared/settings/text-spacing.component.js',
			'dist/js/app/shared/settings/text-transform.component.js',
			'dist/js/app/shared/btn-modal.component.js',
			'dist/js/app/shared/btn-setting.component.js',
			'dist/js/app/shared/header.component.js',
			'dist/js/app/shared/icon.component.js',
			'dist/js/app/shared/select-mode.component.js',
			'dist/js/app/pages/edit-setting/edit-setting.component.js',
			'dist/js/app/pages/home/home.component.js',
			'dist/js/app/pages/home/components/mode.component.js',
			'dist/js/app/pages/modes/modes.component.js',
			'dist/js/app/pages/settings/settings.component.js',
			'dist/js/app/pages/settings/categories/abstract-category.component.js',
			'dist/js/app/pages/settings/categories/layout.component.js',
			'dist/js/app/pages/settings/categories/navigation.component.js',
			'dist/js/app/pages/settings/categories/picture-video.component.js',
			'dist/js/app/pages/settings/categories/pointer.component.js',
			'dist/js/app/pages/settings/categories/sound.component.js',
			'dist/js/app/pages/settings/categories/text.component.js',
			'dist/js/app/pages/toolbar.component.js',
			'dist/js/app/core/injector.core.js'
		],
		dist: 'dist/js/toolbar.js',
		options: {
			compress: false,
			mangle: false,
			format: {
				preamble: preamble,
				beautify: true
			}
		}
	},
	'server': {
		files: [
			'dist/js/serveur/services/files.service.js',
			'dist/js/serveur/services/i18n.service.js',
			'dist/js/serveur/services/path.service.js',
			'dist/js/serveur/services/icons.service.js',
			'dist/js/serveur/services/local-storage.service.js',
			'dist/js/toolbar.js'
		],
		dist: 'dist/serveur/js/toolbar.js',
		options: {
			compress: false,
			mangle: false,
			format: {
				preamble: preamble,
				beautify: true
			}
		}
	},
	'extension': {
		files: [
			'dist/js/extension/services/files.service.js',
			'dist/js/extension/services/i18n.service.js',
			'dist/js/extension/services/path.service.js',
			'dist/js/extension/services/icons.service.js',
			'dist/js/extension/services/local-storage.service.js',
			'dist/js/toolbar.js'
		],
		dist: 'dist/extension/js/toolbar.js',
		options: {
			compress: false,
			mangle: false,
			format: {
				preamble: preamble,
				beautify: true
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
			},
			sourceMap: {
				filename: 'toolbar.min.js',
				url: 'toolbar.min.js.map'
			},
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
			},
			sourceMap: {
				filename: 'toolbar.min.js',
				url: 'toolbar.min.js.map'
			},
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
