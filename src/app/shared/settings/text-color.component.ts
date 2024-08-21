const tmplDyslexia: HTMLTemplateElement = document.createElement('template');
tmplDyslexia.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class TextColorComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.setCallback(textColorServiceInstance.setDyslexia.bind(this));

		this.appendChild(tmplDyslexia.content.cloneNode(true));
	}
}
customElements.define('app-text-color', TextColorComponent);
