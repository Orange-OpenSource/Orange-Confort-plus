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
			'dist/js/app/services/categories.service.js',
			'dist/js/app/services/dom.service.js',
			'dist/js/app/services/mode-of-use.service.js',
			'dist/js/app/services/pause.service.js',
			'dist/js/app/services/route.service.js',
			'dist/js/app/services/settings/capital-letters.service.js',
			'dist/js/app/services/settings/abstracts/body-selector.service.js',
			'dist/js/app/services/settings/clearly-links.service.js',
			'dist/js/app/services/settings/click-facilite.service.js',
			'dist/js/app/services/settings/color-contrast.service.js',
			'dist/js/app/services/settings/cursor-aspect.service.js',
			'dist/js/app/services/settings/delete-background-images.service.js',
			'dist/js/app/services/settings/delete-layout.service.js',
			'dist/js/app/services/settings/focus-aspect.service.js',
			'dist/js/app/services/settings/font-family.service.js',
			'dist/js/app/services/settings/link-style.service.js',
			'dist/js/app/services/settings/magnifier.service.js',
			'dist/js/app/services/settings/margin-align.service.js',
			'dist/js/app/services/settings/navigation-auto.service.js',
			'dist/js/app/services/settings/navigation-buttons.service.js',
			'dist/js/app/services/settings/read-aloud.service.js',
			'dist/js/app/services/settings/reading-guide.service.js',
			'dist/js/app/services/settings/reading-page.service.js',
			'dist/js/app/services/settings/restart-top-left.service.js',
			'dist/js/app/services/settings/scroll-aspect.service.js',
			'dist/js/app/services/settings/scroll-type.service.js',
			'dist/js/app/services/settings/skip-to-content.service.js',
			'dist/js/app/services/settings/stop-animations.service.js',
			'dist/js/app/services/settings/text-size.service.js',
			'dist/js/app/services/settings/text-spacing.service.js',
			'dist/js/app/services/settings/zoom.service.js',
			'dist/js/app/services/string.service.js',
			'dist/js/app/services/styles.service.js',
			'dist/js/app/core/models.core.js',
			'dist/js/app/core/services.core.js',
			'dist/js/app/app.component.js',
			'dist/js/app/shared/settings/abstract-setting.component.js',
			'dist/js/app/shared/settings/capital-letters.component.js',
			'dist/js/app/shared/settings/clearly-links.component.js',
			'dist/js/app/shared/settings/click-facilite.component.js',
			'dist/js/app/shared/settings/color-contrast.component.js',
			'dist/js/app/shared/settings/cursor-aspect.component.js',
			'dist/js/app/shared/settings/delete-background-images.component.js',
			'dist/js/app/shared/settings/focus-aspect.component.js',
			'dist/js/app/shared/settings/font-family.component.js',
			'dist/js/app/shared/settings/link-style.component.js',
			'dist/js/app/shared/settings/magnifier.component.js',
			'dist/js/app/shared/settings/margin-align.component.js',
			'dist/js/app/shared/settings/navigation-auto.component.js',
			'dist/js/app/shared/settings/navigation-buttons.component.js',
			'dist/js/app/shared/settings/read-aloud.component.js',
			'dist/js/app/shared/settings/reading-guide.component.js',
			'dist/js/app/shared/settings/reading-page.component.js',
			'dist/js/app/shared/settings/scroll-aspect.component.js',
			'dist/js/app/shared/settings/stop-animations.component.js',
			'dist/js/app/shared/settings/text-size.component.js',
			'dist/js/app/shared/settings/text-spacing.component.js',
			'dist/js/app/shared/settings/zoom.component.js',
			'dist/js/app/shared/btn-modal.component.js',
			'dist/js/app/shared/btn-setting.component.js',
			'dist/js/app/shared/header.component.js',
			'dist/js/app/shared/icon.component.js',
			'dist/js/app/shared/select-edit-value.component.js',
			'dist/js/app/shared/select-mode.component.js',
			'dist/js/app/pages/edit-setting/edit-setting.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-click-facilite.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-color-contrast.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-cursor-aspect.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-delete-background-images.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-focus-aspect.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-font-family.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-link-style.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-magnifier.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-margin-align.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-navigation-auto.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-read-aloud.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-reading-guide.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-scroll-aspect.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-text-size.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-text-spacing.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-zoom.component.js',
			'dist/js/app/pages/edit-setting/settings/edit-navigation-buttons.component.js',
			'dist/js/app/pages/home/home.component.js',
			'dist/js/app/pages/home/components/mode.component.js',
			'dist/js/app/pages/modes/modes.component.js',
			'dist/js/app/pages/settings/settings.component.js',
			'dist/js/app/pages/settings/categories/abstract-category.component.js',
			'dist/js/app/pages/settings/categories/layout.component.js',
			'dist/js/app/pages/settings/categories/navigation.component.js',
			'dist/js/app/pages/settings/categories/picture-video.component.js',
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
			'src/extension/vendors/Readability.js',
			'dist/js/app/core/constantes.core.js',
			'dist/js/serveur/services/files.service.js',
			'dist/js/serveur/services/i18n.service.js',
			'dist/js/serveur/services/icons.service.js',
			'dist/js/serveur/services/local-storage.service.js',
			'dist/js/serveur/services/path.service.js',
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
			'src/extension/vendors/custom-elements.min.js',
			'src/extension/vendors/Readability.js',
			'dist/js/app/core/constantes.core.js',
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
				passes: 2,
				pure_funcs: ['console.log']
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
	const hasContext = process.argv.find(element => element.startsWith(`--context=`));

	if (!hasContext) return null;

	const value = hasContext.replace(`--context=`, '');

	return files[value];
}

const context = getContext();
context.files.forEach(async file => {
	Object.assign(code, { [file]: readFileSync(file, "utf8") });
});

const minified = await minify(code, context.options);

writeFileSync(context.dist, minified.code, 'utf-8');
if (minified.map) {
	writeFileSync(`${context.dist}.map`, minified.map, 'utf-8');
}
