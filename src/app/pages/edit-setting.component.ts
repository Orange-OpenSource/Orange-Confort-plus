const editSettingLayout: HTMLTemplateElement = document.createElement('template');
editSettingLayout.innerHTML = `
	<p>Zone d'affichage du réglage</p>
`;

class EditSettingComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editSettingLayout.content.cloneNode(true));
	}
}

customElements.define('app-edit-setting', EditSettingComponent);
