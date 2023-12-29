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
		const bodyElt = document.getElementsByTagName('body')[0];
		const spacingTextValues = [
			{ name: 'small', wordSpacing: '.10em', lineHeight: '2em', letterSpacing: '.0625em' },
			{ name: 'big', wordSpacing: '.25em', lineHeight: '3em', letterSpacing: '.25em' },
			{ name: 'huge', wordSpacing: '.5em', lineHeight: '4em', letterSpacing: '.5em' }
		];
		let label = value;

		if (value === 'default') {
			bodyElt.classList.remove('cplus-spacing-text');
		} else {
			label = this.i18nService.getMessage(`spacingTextLabel${value}`);

			let objSpacingText = spacingTextValues?.find(o => o.name === value);
			let classSpacingText = `
				.cplus-spacing-text * {
					word-spacing: ${objSpacingText.wordSpacing} !important;
					line-height: ${objSpacingText.lineHeight} !important;
					letter-spacing: ${objSpacingText.letterSpacing} !important;
				}
			`;

			if (document.querySelectorAll('#cplus-styles-spacing-text').length === 0) {
				let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
				let stylesSpacingText: HTMLStyleElement = document.createElement('style');
				stylesSpacingText.setAttribute('id', 'cplus-styles-spacing-text');
				stylesSpacingText.innerHTML = classSpacingText;
				head.appendChild(stylesSpacingText);
			} else {
				document.querySelector('#cplus-styles-spacing-text').innerHTML = classSpacingText;
			}

			bodyElt.classList.add('cplus-spacing-text');
		}
		this.modalBtn.setAttribute('data-value', label);
	}
}

customElements.define('app-spacing-text', TextSpacingComponent);
