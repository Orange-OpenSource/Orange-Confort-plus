const tmplTextColor: HTMLTemplateElement = document.createElement('template');
tmplTextColor.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
</div>
`;

class TextColorComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(textColorServiceInstance.setTextColor.bind(this));

		this.appendChild(tmplTextColor.content.cloneNode(true));
	}
}
customElements.define('app-text-color', TextColorComponent);
