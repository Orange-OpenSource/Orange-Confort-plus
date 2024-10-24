let textSizeServiceIsInstantiated: boolean;

class TextSizeService {

	constructor() {
		if (textSizeServiceIsInstantiated) {
			throw new Error('TextSizeService is already instantiated.');
		}

		textSizeServiceIsInstantiated = true;
	}

	setFontSize = (value: string): void => {
		const fontSize = value === DEFAULT_VALUE ? null : `${value}%`;
		document.documentElement.style.fontSize = fontSize;

		const layoutState = (Number(value) >= 350) ? 'active' : DEFAULT_VALUE;
		deleteLayoutServiceInstance.setDeleteLayout(layoutState);
	}
}
