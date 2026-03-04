const tmplColorRead: HTMLTemplateElement = document.createElement('template');
tmplColorRead.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class ColorReadComponent extends AbstractSetting {
	activesValues = { values: "noModifications,active", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(colorReadServiceInstance.setColorRead.bind(this));

		this.appendChild(tmplColorRead.content.cloneNode(true));
	}
}

customElements.define('app-color-read', ColorReadComponent);
