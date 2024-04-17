const editStopAnimationsLayout: HTMLTemplateElement = document.createElement('template');
editStopAnimationsLayout.innerHTML = `
	<p>Edit stop animations works !</p>
`;

class EditStopAnimationsComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editStopAnimationsLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-stop-animations', EditStopAnimationsComponent);
