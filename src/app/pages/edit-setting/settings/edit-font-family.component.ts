const editFontFamilyLayout: HTMLTemplateElement = document.createElement('template');
editFontFamilyLayout.innerHTML = `
	<p>Edit font family works !</p>
`;

class EditFontFamilyComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editFontFamilyLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-font-family', EditFontFamilyComponent);
