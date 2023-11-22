const modesLayout: HTMLTemplateElement = document.createElement('template');
modesLayout.innerHTML = `
<p>Choisissez un mode d'usage et validez :</p>

<button id="select-mode-btn" class="btn btn-primary" type="button">Valider ce mode</button>`;

class ModesComponent extends HTMLElement {
	selectModeBtn: HTMLElement | null = null;

	constructor() {
		super();

		this.appendChild(modesLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.selectModeBtn = this.querySelector('#select-mode-btn');

		this.selectModeBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('selectModeEvent');
			template.dispatchEvent(clickEvent);
		});
	}
}

customElements.define('app-modes', ModesComponent);
