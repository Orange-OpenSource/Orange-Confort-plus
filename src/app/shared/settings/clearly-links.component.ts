const tmplClearlyLinks: HTMLTemplateElement = document.createElement('template');
tmplClearlyLinks.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-disabled="true"></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class ClearlyLinksComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.appendChild(tmplClearlyLinks.content.cloneNode(true));
	}
}

customElements.define('app-clearly-links', ClearlyLinksComponent);
