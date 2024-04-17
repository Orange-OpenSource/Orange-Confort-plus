const editTextSpacingLayout: HTMLTemplateElement = document.createElement('template');
editTextSpacingLayout.innerHTML = `
	<p>Edit text spacing works !</p>
`;

class EditTextSpacingComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editTextSpacingLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-text-spacing', EditTextSpacingComponent);
