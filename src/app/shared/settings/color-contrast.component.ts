const tmplColorContrast: HTMLTemplateElement = document.createElement('template');
tmplColorContrast.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="colorsContrasts" data-icon="Contrast"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ColorContrastComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,reinforcedContrasts,white_black",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setColorsContrasts.bind(this));

		this.appendChild(tmplColorContrast.content.cloneNode(true));
	}

	setColorsContrasts = (value: string): void => {
		if (value === 'noModifications') {
			stylesServiceInstance.removeStyle(this.name);
		} else {
			let color = '';
			let backgroundColor = '';

			if (value === 'reinforcedContrasts') {
				color = '#000';
				backgroundColor = '#fff';
			} else if (value === 'daltonism') {
				// @todo Revoir les couleurs pour le daltonisme car pas clair
				color = '#000';
				backgroundColor = '#fff';
			} else {
				color = value.split('_')[0];
				backgroundColor = value.split('_')[1];
			}

			let styleColorContrast = `
							* {
								color: ${color} !important;
								background-color: ${backgroundColor} !important;
							}

							li a {
								color: ${color} !important;
							}

							fieldset,
							button {
								border-color: ${color} !important;
							}

							input, td, th {
								border: 2px solid ${color} !important;
							}

							td, th {
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

			stylesServiceInstance.setStyle(this.name, styleColorContrast);
		}
	}
}

customElements.define('app-color-contrast', ColorContrastComponent);
