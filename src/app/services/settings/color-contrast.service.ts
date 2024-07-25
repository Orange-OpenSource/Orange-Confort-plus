let colorContrastServiceIsInstantiated: boolean;

class ColorContrastService {
	colorContrastDictionnary: ColourThemeValues[] = [
		{ name: 'reinforcedContrasts', cursor: 'big_black', focus: 'big_black', scroll: 'big_black', link: 'darkblue_orange_brown' },
		{ name: 'white_black', cursor: 'big_ivory', focus: 'big_ivory', scroll: 'big_ivory', link: 'lightblue_orange_lightgreen' },
		{ name: 'black_ivory', cursor: 'big_black', focus: 'big_black', scroll: 'big_black', link: 'darkblue_orange_brown' },
		{ name: 'white_red', cursor: 'big_white', focus: 'big_white', scroll: 'big_white', link: 'yellow_darkblue_lightgreen' },
		{ name: 'black_yellow', cursor: 'big_black', focus: 'big_black', scroll: 'big_black', link: 'darkblue_purple_darkgreen' },
		{ name: 'white_blue', cursor: 'big_white', focus: 'big_white', scroll: 'big_white', link: 'yellow_orange_lightgreen' },
		{ name: 'yellow_blue', cursor: 'big_yellow', focus: 'big_yellow', scroll: 'big_yellow', link: 'white_darkgreen_lightgreen' },
		{ name: 'black_green', cursor: 'big_black', focus: 'big_black', scroll: 'big_black', link: 'yellow_orange_blue' }
	];

	/* Daltonism type deuteranomaly */
	matrixFilter = `
		0.8,   0.2,   0,     0, 0
    0.258, 0.742, 0,     0, 0
    0,     0.142, 0.858, 0, 0
    0,     0,     0,     1, 0`;

	svgFilterDaltonism = `<svg xmlns="http://www.w3.org/2000/svg"><filter id="daltonism"><feColorMatrix in="SourceGraphic" type="matrix" values="${this.matrixFilter.replace(/\s+/g, ' ').trim()}"/></filter></svg>`;

	styleFilterDaltonism = `
		html body > *:not(app-root) {
			filter: url('data:image/svg+xml;utf8,${this.svgFilterDaltonism}#daltonism');
		}
	`;

	constructor() {
		if (colorContrastServiceIsInstantiated) {
			throw new Error('ColorContrastService is already instantiated.');
		}

		colorContrastServiceIsInstantiated = true;
	}

	setColorsContrasts = (value: string): void => {
		stylesServiceInstance.removeStyle('color-contrast');
		stylesServiceInstance.removeStyle('filter-daltonism');
		colourThemeServiceInstance.setColourTheme(DEFAULT_VALUE);

		switch (value) {
			case DEFAULT_VALUE:
				break;
			case 'daltonism':
				stylesServiceInstance.setStyle('filter-daltonism', this.styleFilterDaltonism);
				break;
			case 'reinforcedContrasts':
			default:
				let color: string;
				let backgroundColor: string;
				if (value === 'reinforcedContrasts') {
					color = '#000';
					backgroundColor = '#fff';
				} else {
					color = value?.split('_')[0];
					backgroundColor = value?.split('_')[1];

					const colorParams = this.colorContrastDictionnary.find((o: ColourThemeValues) => o.name === value);
					colourThemeServiceInstance.setServices(colorParams);
				}

				this.setColorContrastStyle(color, backgroundColor);
				break;
		}
	}

	setColorContrastStyle = (color: string, backgroundColor: string): void => {
		let styleColorContrast = `
		* {
			color: ${color} !important;
			background-color: ${backgroundColor} !important;
		}

		li a {
			color: ${color} !important;
		}

		fieldset,
		button {
			border-color: ${color} !important;
		}

		input, td, th {
			border: 2px solid ${color} !important;
		}

		td, th {
			padding: .2em !important;
		}

		table {
			border-collapse: collapse !important;
		}
	`;
		stylesServiceInstance.setStyle('color-contrast', styleColorContrast);
	}
}
