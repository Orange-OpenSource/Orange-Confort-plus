const tmplColorContrast: HTMLTemplateElement = document.createElement('template');
tmplColorContrast.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class ColorContrastComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,reinforcedContrasts,white_black",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.setCallback(colorContrastServiceInstance.setColorsContrasts.bind(this));

		this.appendChild(tmplColorContrast.content.cloneNode(true));
	}
}

customElements.define('app-color-contrast', ColorContrastComponent);
