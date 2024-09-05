const tmplLinkStyle: HTMLTemplateElement = document.createElement('template');
tmplLinkStyle.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class LinkStyleComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(linkStyleServiceInstance.setLinkStyle.bind(this));

		this.appendChild(tmplLinkStyle.content.cloneNode(true));
	}
}

customElements.define('app-link-style', LinkStyleComponent);
