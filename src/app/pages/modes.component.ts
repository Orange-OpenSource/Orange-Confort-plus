const modesLayout: HTMLTemplateElement = document.createElement('template');
modesLayout.innerHTML = `
<section class="p-3">
	<p data-i18n="chooseModeAndValidate"></p>

	<div class="d-grid">
		<button id="select-mode-btn" class="btn btn-primary" type="button" data-i18n="validateThisMode"></button>
	</div>
</section>
`;

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
