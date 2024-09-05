const tmplColourTheme: HTMLTemplateElement = document.createElement('template');
tmplColourTheme.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ColourThemeComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(colourThemeServiceInstance.setColourTheme.bind(this));

		this.appendChild(tmplColourTheme.content.cloneNode(true));
	}
}

customElements.define('app-colour-theme', ColourThemeComponent);
