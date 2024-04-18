const tmplSkipToContent: HTMLTemplateElement = document.createElement('template');
tmplSkipToContent.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-disabled="true"></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class SkipToContentComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.appendChild(tmplSkipToContent.content.cloneNode(true));
	}
}

customElements.define('app-skip-to-content', SkipToContentComponent);
