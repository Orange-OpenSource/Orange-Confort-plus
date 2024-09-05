const tmplMarginAlign: HTMLTemplateElement = document.createElement('template');
tmplMarginAlign.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class MarginAlignComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(marginAlignServiceInstance.setMargin.bind(this));

		this.appendChild(tmplMarginAlign.content.cloneNode(true));
	}
}

customElements.define('app-margin-align', MarginAlignComponent);
