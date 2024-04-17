const editColorContrastLayout: HTMLTemplateElement = document.createElement('template');
editColorContrastLayout.innerHTML = `
	<p>Edit color contrast works !</p>
`;

class EditColorContrastComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editColorContrastLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-color-contrast', EditColorContrastComponent);
