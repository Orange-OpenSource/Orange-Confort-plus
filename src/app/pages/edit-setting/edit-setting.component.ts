const editSettingLayout: HTMLTemplateElement = document.createElement('template');
editSettingLayout.innerHTML = `
<div class="p-3">
	<app-edit-text-size></app-edit-text-size>
</div>
`;

class EditSettingComponent extends HTMLElement {

	editSettingDictionnary: any[] = [
		{ name: 'textFont', element: 'app-edit-text-size' },
	];

	constructor() {
		super();

		this.appendChild(editSettingLayout.content.cloneNode(true));
	}
}

customElements.define('app-edit-setting', EditSettingComponent);
