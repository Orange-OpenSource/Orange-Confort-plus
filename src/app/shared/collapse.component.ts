const collapseLayout: HTMLTemplateElement = document.createElement('template');
collapseLayout.innerHTML = `
	<style>
	</style>
`;

class CollapseComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(collapseLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
	}
}

customElements.define('app-collapse', CollapseComponent);
