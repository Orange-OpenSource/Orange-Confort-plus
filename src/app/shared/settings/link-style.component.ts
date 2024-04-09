const tmplLinkStyle: HTMLTemplateElement = document.createElement('template');
tmplLinkStyle.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class LinkStyleComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,lightblue_orange_lightgreen,yellow_orange_lightgreen",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.setCallback(linkStyleServiceInstance.setLinkStyle.bind(this));

		this.appendChild(tmplLinkStyle.content.cloneNode(true));
	}
}

customElements.define('app-link-style', LinkStyleComponent);
