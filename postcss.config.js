import * as pkg from './package.json' assert { type: "json" };
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import banner from 'postcss-banner'
const date = new Date();

export default function (ctx) {
	return {
		map: ctx.options.map,
		plugins: [
			autoprefixer(),
			cssnano(),
			banner({
				banner: `${pkg.name} — version ${pkg.version} — ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
	${pkg.description}
	© 2014 — ${date.getFullYear()} ${pkg.author}`,
				important: true
			})
		]
	}
}
