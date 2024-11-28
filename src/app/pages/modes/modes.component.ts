const modesLayout: HTMLTemplateElement = document.createElement('template');
modesLayout.innerHTML = `
<form class="p-3">
	<fieldset class="d-grid gap-2 mb-4 text-body">
		<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>
		<div id="select-mode-zone" class="d-grid gap-1">
		</div>
	</fieldset>
</form>
`;

class ModesComponent extends HTMLElement {
	static observedAttributes = ['data-modes'];
	selectModeForm: HTMLFormElement | null = null;
	selectModeZone: HTMLElement | null = null;

	handler: any;

	constructor() {
		super();
		this.appendChild(modesLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectModeForm = this.querySelector('form');
		this.selectModeZone = this.querySelector('#select-mode-zone');

		this.selectModeForm?.addEventListener('submit', this.handler);
	}

	disconnectedCallback(): void {
		this.selectModeForm?.removeEventListener('submit', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-modes' === name) {
			this.displayListMode(JSON.parse(newValue));
		}
	}

	displayListMode = (json: ModeOfUseModel): void => {
		const listMode = json.modes;
		const selectedMode = json.selectedMode;
		let radioModeList = '';
		listMode.forEach((mode: any) => {
			let settingsList = Object.entries(mode)[0][1] as [];
			let disabled = settingsList.length === 0;
			let isChecked = Object.keys(mode)[0] === selectedMode ? true : false;
			let radioMode = `<app-select-mode data-label="${Object.keys(mode)[0]}" data-checked="${isChecked}" data-disabled="${disabled}"></app-select-mode>`;
			radioModeList = radioModeList + radioMode;
		});
		this.selectModeZone!.innerHTML = radioModeList;
	}

	getSelectedMode = (): string => {
		return (this.querySelector('input:checked') as HTMLInputElement).value;
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'submit':
					this.selectModeFormEvent(event);
					break;
			}
		}
	}

	private selectModeFormEvent = (event: Event): void => {
		event.preventDefault();
		localStorageServiceInstance.setItem('current-category', null);
		modeOfUseServiceInstance.setSelectedMode(this.getSelectedMode());
		let clickEvent = new CustomEvent('changeRoute',
			{
				bubbles: true,
				detail: {
					route: PAGE_HOME
				}
			});
		this.dispatchEvent(clickEvent);

	}
}

customElements.define('app-modes', ModesComponent);
