const editReadAloudLayout: HTMLTemplateElement = document.createElement('template');
editReadAloudLayout.innerHTML = `
	<p>Edit read aloud works !</p>
`;

class EditReadAloudComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editReadAloudLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-read-aloud', EditReadAloudComponent);
