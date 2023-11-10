const headerLayout: HTMLTemplateElement = document.createElement('template');
headerLayout.innerHTML = `
	<style>
	</style>
`;

class HeaderComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(headerLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
	}
}

customElements.define('app-header', HeaderComponent);
