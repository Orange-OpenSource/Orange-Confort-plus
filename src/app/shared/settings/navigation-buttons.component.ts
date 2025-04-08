const tmplNavigationButtons: HTMLTemplateElement = document.createElement('template');
tmplNavigationButtons.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class NavigationButtonsComponent extends AbstractSetting {
	activesValues = { values: "noModifications,active", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(navigationButtonsServiceInstance.setNavigationButtons.bind(this));

		this.appendChild(tmplNavigationButtons.content.cloneNode(true));
	}
}

customElements.define('app-navigation-buttons', NavigationButtonsComponent);
