const tmplNavigationAuto: HTMLTemplateElement = document.createElement('template');
tmplNavigationAuto.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class NavigationAutoComponent extends AbstractSetting {
	activesValues = {
		"values": "",
		"valueSelected": 0
	};

	constructor() {
		super();

		this.setCallback(navigationAutoServiceInstance.setNavigationAuto.bind(this));

		this.appendChild(tmplNavigationAuto.content.cloneNode(true));
	}
}

customElements.define('app-navigation-auto', NavigationAutoComponent);
