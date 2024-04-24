const editMagnifierLayout: HTMLTemplateElement = document.createElement('template');
editMagnifierLayout.innerHTML = `
	<p>Edit magnifier works !</p>
`;

class EditMagnifierComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editMagnifierLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-magnifier', EditMagnifierComponent);
