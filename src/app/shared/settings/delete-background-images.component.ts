const tmplDeleteBackgroundImages: HTMLTemplateElement = document.createElement('template');
tmplDeleteBackgroundImages.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class DeleteBackgroundImagesComponent extends AbstractSetting {
	activesValues = { values: "noModifications,backgroundTransparent,backgroundForegroundTransparent", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this));

		this.appendChild(tmplDeleteBackgroundImages.content.cloneNode(true));
	}
}

customElements.define('app-delete-background-images', DeleteBackgroundImagesComponent);
