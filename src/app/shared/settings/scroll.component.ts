const tmplScroll: HTMLTemplateElement = document.createElement('template');
tmplScroll.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ScrollComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(scrollServiceInstance.setScroll.bind(this));

		this.appendChild(tmplScroll.content.cloneNode(true));
	}
}

customElements.define('app-scroll', ScrollComponent);
