const editClickFaciliteLayout: HTMLTemplateElement = document.createElement('template');
editClickFaciliteLayout.innerHTML = `
	<p>Edit click facilite works !</p>
`;

class EditClickFaciliteComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editClickFaciliteLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-click-facilite', EditClickFaciliteComponent);
