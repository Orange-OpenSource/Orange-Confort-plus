const tmplIncreaseTextSize: HTMLTemplateElement = document.createElement('template');
tmplIncreaseTextSize.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class IncreaseTextSizeComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(textSizeServiceInstance.setFontSize.bind(this));

		this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
	}
}

customElements.define('app-text-size', IncreaseTextSizeComponent);
