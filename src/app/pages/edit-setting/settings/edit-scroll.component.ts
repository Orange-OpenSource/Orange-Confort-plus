const editScrollLayout: HTMLTemplateElement = document.createElement('template');
editScrollLayout.innerHTML = `
	<p>Edit scroll works !</p>
`;

class EditScrollComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editScrollLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-scroll', EditScrollComponent);
