const tmplReadAloud: HTMLTemplateElement = document.createElement('template');
tmplReadAloud.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ReadAloudComponent extends AbstractSetting {
	activesValues = { values: "noModifications,sentence,paragraph", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(readAloudServiceInstance.setReadAloud.bind(this));

		this.appendChild(tmplReadAloud.content.cloneNode(true));
	}
}

customElements.define('app-read-aloud', ReadAloudComponent);
