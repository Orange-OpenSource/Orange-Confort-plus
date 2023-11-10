const btnModalLayout: HTMLTemplateElement = document.createElement('template');
btnModalLayout.innerHTML = `
	<style>
	</style>
`;

class BtnModalComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(btnModalLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
	}
}

customElements.define('app-btn-modal', BtnModalComponent);
