const tmplCursorAspect: HTMLTemplateElement = document.createElement('template');
tmplCursorAspect.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class CursorAspectComponent extends AbstractSetting {
	activesValues = { values: "noModifications,big_black,huge_black", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(cursorAspectServiceInstance.setCursor.bind(this));

		this.appendChild(tmplCursorAspect.content.cloneNode(true));
	}
}

customElements.define('app-cursor-aspect', CursorAspectComponent);
