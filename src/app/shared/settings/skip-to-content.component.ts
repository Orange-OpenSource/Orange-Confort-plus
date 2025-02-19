const tmplSkipToContent: HTMLTemplateElement = document.createElement('template');
tmplSkipToContent.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class SkipToContentComponent extends AbstractSetting {
	activesValues = { values: "noModifications,active", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(skipToContentServiceInstance.setSkipToContent.bind(this));

		this.appendChild(tmplSkipToContent.content.cloneNode(true));
	}
}

customElements.define('app-skip-to-content', SkipToContentComponent);
