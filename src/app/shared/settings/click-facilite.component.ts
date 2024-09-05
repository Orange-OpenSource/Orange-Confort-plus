const tmplClickFacilite: HTMLTemplateElement = document.createElement('template');
tmplClickFacilite.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ClickFaciliteComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(clickFaciliteServiceInstance.setClickFacilite.bind(this));

		this.appendChild(tmplClickFacilite.content.cloneNode(true));
	}
}

customElements.define('app-click-facilite', ClickFaciliteComponent);
