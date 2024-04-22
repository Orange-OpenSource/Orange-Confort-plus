const tmplFontFamily: HTMLTemplateElement = document.createElement('template');
tmplFontFamily.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class FontFamilyComponent extends AbstractSetting {
	activesValues = {
		"values": `${DEFAULT_VALUE},Accessible_DfA,Luciole`,
		"valueSelected": 0
	};

	constructor() {
		super();

		this.setCallback(fontFamilyServiceInstance.setFontFamily.bind(this));

		this.appendChild(tmplFontFamily.content.cloneNode(true));
	}
}

customElements.define('app-font-family', FontFamilyComponent);
