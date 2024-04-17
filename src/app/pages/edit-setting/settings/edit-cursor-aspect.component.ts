const editCursorAspectLayout: HTMLTemplateElement = document.createElement('template');
editCursorAspectLayout.innerHTML = `
	<p>Edit cursor aspect works !</p>
`;

class EditCursorAspectComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editCursorAspectLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-cursor-aspect', EditCursorAspectComponent);
