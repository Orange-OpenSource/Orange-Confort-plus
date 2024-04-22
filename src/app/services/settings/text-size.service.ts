let textSizeServiceIsInstantiated: boolean;

class TextSizeService {

	constructor() {
		if (textSizeServiceIsInstantiated) {
			throw new Error('TextSizeService is already instantiated.');
		}

		textSizeServiceIsInstantiated = true;
	}

	setFontSize = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			document.documentElement.style.fontSize = null;
		} else {
			document.documentElement.style.fontSize = `${value}%`;
		}
	}
}
