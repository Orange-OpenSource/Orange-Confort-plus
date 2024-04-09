let focusAspectServiceIsInstantiated: boolean;

class FocusAspectService {

	constructor() {
		if (focusAspectServiceIsInstantiated) {
			throw new Error('FocusAspectService is already instantiated.');
		}

		focusAspectServiceIsInstantiated = true;
	}

	setFocus = (value: string): void => {
		if (value === 'noModifications') {
			stylesServiceInstance.removeStyle('focus-aspect');
		} else {
			let size = value.split('_')[0] === 'big' ? '4px' : '10px';
			let color = value.split('_')[1];

			let styleFocus = `
				*:focus, *:focus-visible {
					outline: ${color} solid ${size} !important;
				}
			`;

			stylesServiceInstance.setStyle('focus-aspect', styleFocus);
		}
	}
}
