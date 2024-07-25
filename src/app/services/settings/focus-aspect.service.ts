let focusAspectServiceIsInstantiated: boolean;

class FocusAspectService {

	constructor() {
		if (focusAspectServiceIsInstantiated) {
			throw new Error('FocusAspectService is already instantiated.');
		}

		focusAspectServiceIsInstantiated = true;
	}

	setFocus = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			stylesServiceInstance.removeStyle('focus-aspect');
		} else if (value) {
			const [size, color] = value.split('_');

			const styleFocusSize = size !== DEFAULT_VALUE ? `outline-width: ${size === FOCUS_SIZE_BIG ? FOCUS_SIZE_BIG : FOCUS_SIZE_HUGE} !important;` : '';
			const styleFocusColor = color !== DEFAULT_VALUE ? `outline-color: ${color} !important;` : '';

			let styleFocus = `
				*:focus, *:focus-visible {
					outline-style: solid !important;
					${styleFocusSize}
					${styleFocusColor}
				}
			`;

			stylesServiceInstance.setStyle('focus-aspect', styleFocus);
		}
	}
}
