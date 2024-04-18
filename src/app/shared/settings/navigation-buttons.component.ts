const tmplNavigationButtons: HTMLTemplateElement = document.createElement('template');
tmplNavigationButtons.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-disabled="true"></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class NavigationButtonsComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.appendChild(tmplNavigationButtons.content.cloneNode(true));
	}
}

customElements.define('app-navigation-buttons', NavigationButtonsComponent);
