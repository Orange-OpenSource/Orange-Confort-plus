let capitalLettersServiceIsInstantiated: boolean;

class CapitalLettersService {

	constructor() {
		if (capitalLettersServiceIsInstantiated) {
			throw new Error('CapitalLettersService is already instantiated.');
		}

		capitalLettersServiceIsInstantiated = true;
	}

	setCapitalLetters = (value: string): void => {
		let styleCapitalLetters = '';

		switch (value) {
			case 'uppercase':
				styleCapitalLetters = `
				*:not(${APP_NAME}), *:not(${APP_NAME})::before, *:not(${APP_NAME})::after {
					text-transform: uppercase !important;
				}
			`;
				stylesServiceInstance.setStyle('capital-letters', styleCapitalLetters);
				break;
			case 'capitalize':
				styleCapitalLetters = `
				*:not(${APP_NAME}), *:not(${APP_NAME})::before, *:not(${APP_NAME})::after {
					text-transform: capitalize !important;
				}
			`;
				stylesServiceInstance.setStyle('capital-letters', styleCapitalLetters);
				break;
			default:
				stylesServiceInstance.removeStyle('capital-letters');
				break;
		}
	}
}
