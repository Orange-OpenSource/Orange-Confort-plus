const tmplSpacingText: HTMLTemplateElement = document.createElement('template');
tmplSpacingText.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class TextSpacingComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(textSpacingServiceInstance.setSpacingText.bind(this));

		this.appendChild(tmplSpacingText.content.cloneNode(true));
	}
}

customElements.define('app-text-spacing', TextSpacingComponent);
