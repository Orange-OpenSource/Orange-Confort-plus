let colorContrastServiceIsInstantiated: boolean;

class ColorContrastService {

	constructor() {
		if (colorContrastServiceIsInstantiated) {
			throw new Error('ColorContrastService is already instantiated.');
		}

		colorContrastServiceIsInstantiated = true;
	}

	setColorsContrasts = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			stylesServiceInstance.removeStyle('color-contrast');
		} else {
			let color = '';
			let backgroundColor = '';

			if (value === 'reinforcedContrasts') {
				color = '#000';
				backgroundColor = '#fff';
			} else if (value === 'daltonism') {
				// @todo Revoir les couleurs pour le daltonisme car pas clair
				color = '#000';
				backgroundColor = '#fff';
			} else {
				color = value.split('_')[0];
				backgroundColor = value.split('_')[1];
			}

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

							*:link,
							*:visited,
							*:hover {
								color: ${color} !important;
							}
						`;

			stylesServiceInstance.setStyle('color-contrast', styleColorContrast);
		}
	}
}
