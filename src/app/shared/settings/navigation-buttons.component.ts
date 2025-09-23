const tmplNavigationButtons: HTMLTemplateElement = document.createElement('template');
tmplNavigationButtons.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class NavigationButtonsComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(navigationButtonsServiceInstance.setNavigationButtons.bind(this));

		this.appendChild(tmplNavigationButtons.content.cloneNode(true));
	}
}

customElements.define('app-navigation-buttons', NavigationButtonsComponent);
