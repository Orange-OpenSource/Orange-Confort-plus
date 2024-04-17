const editMarginAlignLayout: HTMLTemplateElement = document.createElement('template');
editMarginAlignLayout.innerHTML = `
	<p>Edit margin align works !</p>
`;

class EditMarginAlignComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editMarginAlignLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-margin-align', EditMarginAlignComponent);
