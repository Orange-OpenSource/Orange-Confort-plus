const tmplCapitals: HTMLTemplateElement = document.createElement('template');
tmplCapitals.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-disabled="true"></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class CapitalsComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.appendChild(tmplCapitals.content.cloneNode(true));
	}
}

customElements.define('app-capitals', CapitalsComponent);
