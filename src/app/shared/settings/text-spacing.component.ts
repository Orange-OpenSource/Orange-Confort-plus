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

	activesValues = {
		"values": "default,small,big",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setSpacingText.bind(this));

		this.appendChild(tmplSpacingText.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback('spacingText');
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setSpacingText = (value: string): void => {
		const spacingTextValues = [
			{ name: 'spacingTextLabelSmall', wordSpacing: '.10em', lineHeight: '2em', letterSpacing: '.0625em' },
			{ name: 'spacingTextLabelBig', wordSpacing: '.25em', lineHeight: '2.5em', letterSpacing: '.25em' },
			{ name: 'spacingTextLabelHuge', wordSpacing: '.5em', lineHeight: '3em', letterSpacing: '.5em' }
		];

		if (value === 'noModifications') {
			document.querySelector('#cplus-styles-spacing-text')?.remove();
		} else {

			let objSpacingText = spacingTextValues?.find(o => o.name === value);
			let classSpacingText = `
				* {
					word-spacing: ${objSpacingText.wordSpacing} !important;
					line-height: ${objSpacingText.lineHeight} !important;
					letter-spacing: ${objSpacingText.letterSpacing} !important;
				}
			`;

			if (document.querySelectorAll('#cplus-styles-spacing-text').length === 0) {
				// @todo - trouver un moyen de ne pas dupliquer l'ajout de style dans le head dans chaque réglage
				let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
				// @todo - tester si on peut utiliser les adoptedStylesheet
				let stylesSpacingText: HTMLStyleElement = document.createElement('style');
				stylesSpacingText.setAttribute('id', 'cplus-styles-spacing-text');
				stylesSpacingText.innerHTML = classSpacingText;
				head.appendChild(stylesSpacingText);
			} else {
				document.querySelector('#cplus-styles-spacing-text').innerHTML = classSpacingText;
			}
		}
	}
}

customElements.define('app-spacing-text', TextSpacingComponent);
