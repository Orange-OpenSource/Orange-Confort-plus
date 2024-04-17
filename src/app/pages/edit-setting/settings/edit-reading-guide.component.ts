const editReadingGuideLayout: HTMLTemplateElement = document.createElement('template');
editReadingGuideLayout.innerHTML = `
	<p>Edit reading guide works !</p>
`;

class EditReadingGuideComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(editReadingGuideLayout.content.cloneNode(true));
	}

	connectedCallback(): void {

	}
}

customElements.define('app-edit-reading-guide', EditReadingGuideComponent);
