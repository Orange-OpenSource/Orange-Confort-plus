const tmplLoupe: HTMLTemplateElement = document.createElement('template');
tmplLoupe.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="loupe" data-icon="Loupe" data-disabled="true"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class LoupeComponent extends AbstractSetting {
	constructor() {
		super();

		this.appendChild(tmplLoupe.content.cloneNode(true));
	}
}

customElements.define('app-loupe', LoupeComponent);
