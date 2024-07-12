const tmplClearlyLinks: HTMLTemplateElement = document.createElement('template');
tmplClearlyLinks.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ClearlyLinksComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(clearlyLinksServiceInstance.setClearlyLinks.bind(this));

		this.appendChild(tmplClearlyLinks.content.cloneNode(true));
	}
}

customElements.define('app-clearly-links', ClearlyLinksComponent);
