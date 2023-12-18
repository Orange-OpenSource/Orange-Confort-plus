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
	routeService: any;

	constructor() {
		super();

		// @todo Utiliser singleton pour routeService pour éviter plusieurs instances
		// @ts-ignore
		this.routeService = new routeService();

		this.appendChild(modesLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.selectModeBtn = this.querySelector('#select-mode-btn');

		this.selectModeBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('changeRoute',
				{
					bubbles: true,
					detail: {
						route: this.routeService.PAGE_HOME,
						isPrev: true
					}
				});
			this.selectModeBtn?.dispatchEvent(clickEvent);
		});
	}

	disconnectedCallback(): void {
		this.selectModeBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-modes', ModesComponent);
