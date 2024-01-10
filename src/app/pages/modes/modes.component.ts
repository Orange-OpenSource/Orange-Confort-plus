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
	localStorageService: any;
	selectModeZone: HTMLElement | null = null;

	constructor() {
		super();

		// @todo Utiliser singleton pour RouteService pour éviter plusieurs instances
		// @ts-ignore
		this.routeService = new RouteService();
		// @ts-ignore
		this.localStorageService = new LocalStorageService();

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
						route: this.routeService.PAGE_HOME,
						isPrev: true
					}
				});

			this.localStorageService.getItem('modeOfUse').then((result: any) => {
				let json = result;
				json.selectedMode = this.getSelectedMode();
				this.localStorageService.setItem('modeOfUse', json);
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

	displayListMode = (json: any): void => {
		const listMode = json.modes;
		const selectedMode = json.selectedMode;
		let radioModeList = '';
		listMode.forEach((mode: any) => {
			let isChecked = Object.entries(mode)[0][0] === selectedMode ? true : false;
			let radioMode = `<app-select-mode data-label="${Object.entries(mode)[0][0]}" data-checked="${isChecked}"></app-select-mode>`;
			radioModeList = radioModeList + radioMode;
		});
		this.selectModeZone!.innerHTML = radioModeList;
	}

	getSelectedMode = (): string => {
		return (this.querySelector('input:checked') as HTMLInputElement).value;
	}
}

customElements.define('app-modes', ModesComponent);
