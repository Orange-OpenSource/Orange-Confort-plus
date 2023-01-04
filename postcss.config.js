const pkg = require('./package.json');
const date = new Date();

module.exports = ctx => ({
	map: ctx.options.map,
	plugins: {
		'autoprefixer': {},
		'cssnano': {},
		'postcss-banner': {
			banner: `${pkg.name} — version ${pkg.version} — ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
${pkg.description}
© 2014 — ${date.getFullYear()} ${pkg.author}`,
			important: true
		}
	}
})
