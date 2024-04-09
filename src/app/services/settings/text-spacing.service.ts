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
			{ name: 'spacingTextLabelSmall', wordSpacing: '.10em', lineHeight: '2em', letterSpacing: '.0625em' },
			{ name: 'spacingTextLabelBig', wordSpacing: '.25em', lineHeight: '2.5em', letterSpacing: '.25em' },
			{ name: 'spacingTextLabelHuge', wordSpacing: '.5em', lineHeight: '3em', letterSpacing: '.5em' }
		];

		if (value === 'noModifications') {
			stylesServiceInstance.removeStyle('text-spacing');
		} else {
			let objSpacingText = spacingTextValues?.find(o => o.name === value);
			let styleSpacingText = `
				* {
					word-spacing: ${objSpacingText.wordSpacing} !important;
					line-height: ${objSpacingText.lineHeight} !important;
					letter-spacing: ${objSpacingText.letterSpacing} !important;
				}
			`;

			stylesServiceInstance.setStyle('text-spacing', styleSpacingText);
		}
	}
}
