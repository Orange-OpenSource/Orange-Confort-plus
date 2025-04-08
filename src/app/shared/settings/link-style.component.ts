const tmplLinkStyle: HTMLTemplateElement = document.createElement('template');
tmplLinkStyle.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class LinkStyleComponent extends AbstractSetting {
	activesValues = { values: "noModifications,darkblue_orange_brown,lightblue_orange_lightgreen", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(linkStyleServiceInstance.setLinkStyle.bind(this));

		this.appendChild(tmplLinkStyle.content.cloneNode(true));
	}
}

customElements.define('app-link-style', LinkStyleComponent);
