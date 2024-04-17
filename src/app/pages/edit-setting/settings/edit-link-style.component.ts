const editLinkStyleLayout: HTMLTemplateElement = document.createElement('template');
editLinkStyleLayout.innerHTML = `
	<p>Edit link style works !</p>
`;

class EditLinkStyleComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editLinkStyleLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-link-style', EditLinkStyleComponent);
