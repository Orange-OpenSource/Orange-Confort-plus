const editLoupeLayout: HTMLTemplateElement = document.createElement('template');
editLoupeLayout.innerHTML = `
	<p>Edit loupe works !</p>
`;

class EditLoupeComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editLoupeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-loupe', EditLoupeComponent);
