let textSpacingServiceIsInstantiated: boolean;

class TextSpacingService {

	constructor() {
		if (textSpacingServiceIsInstantiated) {
			throw new Error('TextSpacingService is already instantiated.');
		}

		textSpacingServiceIsInstantiated = true;
	}

	setSpacingText = (value: string): void => {
		const spacingTextValues = [
			{ name: 'spacingTextSmall', wordSpacing: '.10em', lineHeight: '2em', letterSpacing: '.0625em' },
			{ name: 'spacingTextBig', wordSpacing: '.25em', lineHeight: '2.5em', letterSpacing: '.25em' },
			{ name: 'spacingTextHuge', wordSpacing: '.5em', lineHeight: '3em', letterSpacing: '.5em' }
		];

		if (value === DEFAULT_VALUE) {
			stylesServiceInstance.removeStyle('text-spacing');
		} else {
			let objSpacingText = spacingTextValues?.find(o => o.name === value);
			let styleSpacingText = `
				*:not(${APP_NAME}) {
					word-spacing: ${objSpacingText.wordSpacing} !important;
					line-height: ${objSpacingText.lineHeight} !important;
					letter-spacing: ${objSpacingText.letterSpacing} !important;
				}
			`;

			stylesServiceInstance.setStyle('text-spacing', styleSpacingText);
		}
	}
}
