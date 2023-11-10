const btnSettingLayout: HTMLTemplateElement = document.createElement('template');
btnSettingLayout.innerHTML = `
	<style>
	</style>
`;

class BtnSettingComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(btnSettingLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
	}
}

customElements.define('app-btn-setting', BtnSettingComponent);
