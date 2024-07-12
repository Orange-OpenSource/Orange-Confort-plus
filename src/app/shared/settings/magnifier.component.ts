const tmplMagnifier: HTMLTemplateElement = document.createElement('template');
tmplMagnifier.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class MagnifierComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(magnifierServiceInstance.setMagnifier.bind(this));

		this.appendChild(tmplMagnifier.content.cloneNode(true));
	}
}

customElements.define('app-magnifier', MagnifierComponent);
