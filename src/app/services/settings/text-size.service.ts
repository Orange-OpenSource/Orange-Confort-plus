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
			deleteLayoutServiceInstance.setDeleteLayout(DEFAULT_VALUE);
		} else {
			document.documentElement.style.fontSize = `${value}%`;

			if (Number(value) >= 350) {
				deleteLayoutServiceInstance.setDeleteLayout('active');
			}
		}
	}
}
