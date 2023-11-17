const modesLayout: HTMLTemplateElement = document.createElement('template');
modesLayout.innerHTML = `<p>Sélectionner un mode d'usage :</p>`;

class ModesComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(modesLayout.content.cloneNode(true));
	}
}

customElements.define('app-modes', ModesComponent);
