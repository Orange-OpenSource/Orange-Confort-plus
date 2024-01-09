const editSettingLayout: HTMLTemplateElement = document.createElement('template');
editSettingLayout.innerHTML = ``;

class EditSettingComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editSettingLayout.content.cloneNode(true));
	}
}

customElements.define('app-edit-setting', EditSettingComponent);
