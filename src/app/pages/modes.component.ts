const modesLayout: HTMLTemplateElement = document.createElement('template');
modesLayout.innerHTML = `
<section class="p-3">
	<fieldset class="d-grid gap-2 mb-4">
		<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>
		<div id="select-mode-zone" class="d-grid gap-1">
		</div>
	</fieldset>

	<div class="d-grid">
		<button id="select-mode-btn" class="btn btn-primary" type="button" data-i18n="validateThisMode"></button>
	</div>
</section>
`;

class ModesComponent extends HTMLElement {
	static observedAttributes = ['data-list-mode'];
	selectModeBtn: HTMLElement | null = null;
	routeService: any;
	selectModeZone: HTMLElement | null = null;

	constructor() {
		super();

		// @todo Utiliser singleton pour routeService pour éviter plusieurs instances
		// @ts-ignore
		this.routeService = new routeService();

		this.appendChild(modesLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.selectModeBtn = this.querySelector('#select-mode-btn');
		this.selectModeZone = this.querySelector('#select-mode-zone');

		this.selectModeBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('changeRoute',
				{
					bubbles: true,
					detail: {
						mode: this.getSelectedMode(),
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

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-list-mode' === name) {
			this.displayListMode(JSON.parse(newValue));
		}
	}

	displayListMode = (list: []): void => {
		let radioModeList = '';
		list.forEach(mode => {
			let radioMode = `<app-select-mode data-label="${Object.entries(mode)[0][0]}" data-settings-list="Description blabla"></app-select-mode>`;
			radioModeList = radioModeList + radioMode;
		});
		this.selectModeZone!.innerHTML = radioModeList;
	}

	getSelectedMode = (): string => {
		let selectedMode = '';
		let inputs = this.querySelectorAll<HTMLInputElement>('input[name="modes"]');
		inputs.forEach((input: HTMLInputElement) => {
			if (input.checked) {
				selectedMode = input.value;
			}
		});
		return selectedMode;
	}
}

customElements.define('app-modes', ModesComponent);
