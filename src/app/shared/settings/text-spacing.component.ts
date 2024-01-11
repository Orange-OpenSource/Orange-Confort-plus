const tmplSpacingText: HTMLTemplateElement = document.createElement('template');
tmplSpacingText.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="spacingText" data-icon="Text_Espacement_Ligne"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class TextSpacingComponent extends AbstractSetting {
	i18nService: any;

	constructor() {
		super();

		// @todo Utiliser singleton pour I18nService pour éviter plusieurs instances
		// @ts-ignore
		this.i18nService = new I18nService();

		this.appendChild(tmplSpacingText.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setSpacingText((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setSpacingText = (value: string): void => {
		const bodyElt: HTMLElement = document.body;
		const spacingTextValues = [
			{ name: 'small', wordSpacing: '.10em', lineHeight: '2em', letterSpacing: '.0625em' },
			{ name: 'big', wordSpacing: '.25em', lineHeight: '3em', letterSpacing: '.25em' },
			{ name: 'huge', wordSpacing: '.5em', lineHeight: '4em', letterSpacing: '.5em' }
		];
		let label = value;

		if (value === 'default') {
			document.querySelector('#cplus-styles-spacing-text')?.remove();
		} else {
			label = this.i18nService.getMessage(`spacingTextLabel${value}`);

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
		this.modalBtn.setAttribute('data-value', label);
	}
}

customElements.define('app-spacing-text', TextSpacingComponent);
