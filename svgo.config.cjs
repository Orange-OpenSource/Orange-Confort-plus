module.exports = {
	plugins: [
		"removeXMLNS",
		"removeXMLProcInst",
		{
			name: 'preset-default',
			params: {
				overrides: {
					removeViewBox: false,
				}
			}
		}
	]
};
