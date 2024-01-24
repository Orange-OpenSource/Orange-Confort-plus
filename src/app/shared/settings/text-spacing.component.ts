const tmplSpacingText: HTMLTemplateElement = document.createElement('template');
tmplSpacingText.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="spacingText" data-icon="Text_Espacement_Ligne"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class TextSpacingComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,spacingTextLabelSmall,spacingTextLabelBig",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setSpacingText.bind(this));

		this.appendChild(tmplSpacingText.content.cloneNode(true));
	}

	setSpacingText = (value: string): void => {
		const spacingTextValues = [
			{ name: 'spacingTextLabelSmall', wordSpacing: '.10em', lineHeight: '2em', letterSpacing: '.0625em' },
			{ name: 'spacingTextLabelBig', wordSpacing: '.25em', lineHeight: '2.5em', letterSpacing: '.25em' },
			{ name: 'spacingTextLabelHuge', wordSpacing: '.5em', lineHeight: '3em', letterSpacing: '.5em' }
		];

		if (value === 'noModifications') {
			stylesServiceInstance.removeStyle(this.name);
		} else {
			let objSpacingText = spacingTextValues?.find(o => o.name === value);
			let styleSpacingText = `
				* {
					word-spacing: ${objSpacingText.wordSpacing} !important;
					line-height: ${objSpacingText.lineHeight} !important;
					letter-spacing: ${objSpacingText.letterSpacing} !important;
				}
			`;

			stylesServiceInstance.setStyle(this.name, styleSpacingText);
		}
	}
}

customElements.define('app-text-spacing', TextSpacingComponent);
