const tmplReadAloud: HTMLTemplateElement = document.createElement('template');
tmplReadAloud.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="readAloud" data-icon="ReadAloud" data-disabled="true"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ReadAloudComponent extends AbstractSetting {
	constructor() {
		super();

		this.appendChild(tmplReadAloud.content.cloneNode(true));
	}
}

customElements.define('app-read-aloud', ReadAloudComponent);