const editFocusAspectLayout: HTMLTemplateElement = document.createElement('template');
editFocusAspectLayout.innerHTML = `
	<p>Edit focus aspect works !</p>
`;

class EditFocusAspectComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editFocusAspectLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-focus-aspect', EditFocusAspectComponent);
