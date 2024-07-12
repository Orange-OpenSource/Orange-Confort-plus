const tmplCursorAspect: HTMLTemplateElement = document.createElement('template');
tmplCursorAspect.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class CursorAspectComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(cursorAspectServiceInstance.setCursor.bind(this));

		this.appendChild(tmplCursorAspect.content.cloneNode(true));
	}
}

customElements.define('app-cursor-aspect', CursorAspectComponent);
