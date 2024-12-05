const tmplScrollType: HTMLTemplateElement = document.createElement('template');
tmplScrollType.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class ScrollTypeComponent extends AbstractSetting {
	activesValues = { values: "noModifications,scrollOnMouseover", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(scrollTypeServiceInstance.setScrollType.bind(this));

		this.appendChild(tmplScrollType.content.cloneNode(true));
	}
}

customElements.define('app-scroll-type', ScrollTypeComponent);
