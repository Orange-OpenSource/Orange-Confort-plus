const tmplColorContrast: HTMLTemplateElement = document.createElement('template');
tmplColorContrast.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="colorsContrasts" data-icon="Contrast"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ColorContrastComponent extends AbstractSetting {
	i18nService: any;

	constructor() {
		super();

		// @ts-ignore
		this.i18nService = new I18nService();

		this.appendChild(tmplColorContrast.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setColorsContrasts((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setColorsContrasts = (value: string): void => {
		let label = value;
		if (value === 'default') {
			document.querySelector('#cplus-styles-contrast')?.remove();
		} else {
			let color = '';
			let backgroundColor = '';

			if (value === 'reinforced') {
				color = '#000';
				backgroundColor = '#fff';
				label = this.i18nService.getMessage('reinforcedContrasts');
			} else if (value === 'daltonism') {
				// @todo Revoir les couleurs pour le daltonisme car pas clair
				color = '#000';
				backgroundColor = '#fff';
				label = this.i18nService.getMessage('daltonism');
			} else {
				color = value.split('+')[0];
				backgroundColor = value.split('+')[1];
				label = `${color} / ${backgroundColor}`;
			}

			let classContrast = `
							* {
								color: ${color} !important;
								background-color: ${backgroundColor} !important;
							}

							li a {
								color: ${color} !important;
							}

							fieldset,
							button,
						  input {
								border-color: ${color} !important;
							}

							input {
								border-width: 2px !important;
								border-style: solid !important;
							}

							td, th {
								border: 2px solid ${color} !important;
								padding: .2em !important;
							}

							table {
								border-collapse: collapse !important;
							}

							*:link,
							*:visited,
							*:hover {
								color: ${color} !important;
							}
						`;

			if (document.querySelectorAll('#cplus-styles-contrast').length === 0) {
				let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
				let stylesContrast: HTMLStyleElement = document.createElement('style');
				stylesContrast.setAttribute('id', 'cplus-styles-contrast');
				stylesContrast.innerHTML = classContrast;
				head.appendChild(stylesContrast);
			} else {
				document.querySelector('#cplus-styles-contrast').innerHTML = classContrast;
			}
		}
		this.modalBtn.setAttribute('data-value', label);
	}
}

customElements.define('app-color-contrast', ColorContrastComponent);
