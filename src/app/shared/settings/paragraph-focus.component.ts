const tmplParagraphFocus: HTMLTemplateElement = document.createElement('template');
tmplParagraphFocus.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class ParagraphFocusComponent extends AbstractSetting {
	activesValues = { values: "noModifications,active", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(paragraphFocusServiceInstance.setParagraphFocus.bind(this));

		this.appendChild(tmplParagraphFocus.content.cloneNode(true));
	}
}

customElements.define('app-paragraph-focus', ParagraphFocusComponent);
