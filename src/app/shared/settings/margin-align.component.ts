const tmplMarginAlign: HTMLTemplateElement = document.createElement('template');
tmplMarginAlign.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class MarginAlignComponent extends AbstractSetting {
	activesValues = { values: "noModifications,alignLeft,marginLeft", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(marginAlignServiceInstance.setMargin.bind(this));

		this.appendChild(tmplMarginAlign.content.cloneNode(true));
	}
}

customElements.define('app-margin-align', MarginAlignComponent);
