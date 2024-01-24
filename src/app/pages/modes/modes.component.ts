const modesLayout: HTMLTemplateElement = document.createElement('template');
modesLayout.innerHTML = `
<form class="p-3">
	<fieldset class="d-grid gap-2 mb-4">
		<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>
		<div id="select-mode-zone" class="d-grid gap-1">
		</div>
	</fieldset>

	<div class="d-grid">
		<button id="select-mode-btn" class="btn btn-primary" type="submit" data-i18n="validateThisMode"></button>
	</div>
</form>
`;

class ModesComponent extends HTMLElement {
	static observedAttributes = ['data-list-mode'];
	selectModeForm: HTMLFormElement | null = null;
	selectModeBtn: HTMLElement | null = null;
	selectModeZone: HTMLElement | null = null;

	constructor() {
		super();
		this.appendChild(modesLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.selectModeForm = this.querySelector('form');
		this.selectModeBtn = this.querySelector('#select-mode-btn');
		this.selectModeZone = this.querySelector('#select-mode-zone');

		this.selectModeForm?.addEventListener('submit', (event) => {
			event.preventDefault();
			(this.shadowRoot?.querySelector('app-home') as HTMLElement).focus();
		});

		this.selectModeBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('changeRoute',
				{
					bubbles: true,
					detail: {
						route: routeServiceInstance.PAGE_HOME,
						isPrev: true
					}
				});

			modeOfUseServiceInstance.setSelectedMode(this.getSelectedMode());
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

	displayListMode = (json: ModeOfUseModel): void => {
		const listMode = json.modes;
		const selectedMode = json.selectedMode;
		let radioModeList = '';
		listMode.forEach((mode: any) => {
			let isChecked = Object.keys(mode)[0] === selectedMode ? true : false;
			let radioMode = `<app-select-mode data-label="${Object.keys(mode)[0]}" data-checked="${isChecked}"></app-select-mode>`;
			radioModeList = radioModeList + radioMode;
		});
		this.selectModeZone!.innerHTML = radioModeList;
	}

	getSelectedMode = (): string => {
		return (this.querySelector('input:checked') as HTMLInputElement).value;
	}
}

customElements.define('app-modes', ModesComponent);
