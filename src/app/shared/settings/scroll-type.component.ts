const tmplScrollType: HTMLTemplateElement = document.createElement('template');
tmplScrollType.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ScrollTypeComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(scrollTypeServiceInstance.setScrollType.bind(this));

		this.appendChild(tmplScrollType.content.cloneNode(true));
	}
}

customElements.define('app-scroll-type', ScrollTypeComponent);
