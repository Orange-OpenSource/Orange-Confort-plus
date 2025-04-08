const tmplScrollAspect: HTMLTemplateElement = document.createElement('template');
tmplScrollAspect.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ScrollAspectComponent extends AbstractSetting {
	activesValues = { values: "noModifications,big_black,huge_black", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(scrollAspectServiceInstance.setScrollAspect.bind(this));

		this.appendChild(tmplScrollAspect.content.cloneNode(true));
	}
}

customElements.define('app-scroll-aspect', ScrollAspectComponent);
