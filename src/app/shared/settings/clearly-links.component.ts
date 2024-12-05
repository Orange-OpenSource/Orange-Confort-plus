const tmplClearlyLinks: HTMLTemplateElement = document.createElement('template');
tmplClearlyLinks.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class ClearlyLinksComponent extends AbstractSetting {
	activesValues = { values: "noModifications,bold_underline,bold_boxed", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(clearlyLinksServiceInstance.setClearlyLinks.bind(this));

		this.appendChild(tmplClearlyLinks.content.cloneNode(true));
	}
}

customElements.define('app-clearly-links', ClearlyLinksComponent);
