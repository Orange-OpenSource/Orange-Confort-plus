const tmplColourTheme: HTMLTemplateElement = document.createElement('template');
tmplColourTheme.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-disabled="true"></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class ColourThemeComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.appendChild(tmplColourTheme.content.cloneNode(true));
	}
}

customElements.define('app-colour-theme', ColourThemeComponent);
