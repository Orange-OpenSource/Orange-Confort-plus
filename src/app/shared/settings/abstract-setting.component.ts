abstract class AbstractSetting extends HTMLElement {
	static observedAttributes = ['data-values'];
	settingBtn: HTMLElement | null = null;
	modalBtn: HTMLElement | null = null;
	canEdit = false;
	localStorageService: any;
	activesValues: any;
	separator = ',';

	constructor() {
		super();

		// @ts-ignore
		this.localStorageService = new LocalStorageService();

		this.canEdit = (this.dataset?.canEdit === 'true') || this.canEdit;
	}

	connectedCallback(key: string): void {
		this.settingBtn = this.querySelector('app-btn-setting');
		this.modalBtn = this.querySelector('app-btn-modal');
		if (this.canEdit) {
			this.modalBtn.classList.remove('d-none');
			this.settingBtn.classList.add('sc-btn-setting--with-btn-modal');
		}

		this.setSettingBtn(this.activesValues);

		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			let newIndex = (event as CustomEvent).detail.index;

			// @todo - faire un service pour l'édition du JSON modeOfUse
			this.localStorageService.getItem('modeOfUse').then((result: any) => {
				let json = result;
				json.modes.forEach((mode: any) => {
					if (Object.keys(mode)[0] === json.selectedMode) {
						let modeSettings: any[] = Object.entries(mode)[0][1] as [];
						let setting = modeSettings.find(o => Object.keys(o)[0] === key);
						let settingValues: any = Object.entries(setting)[0][1];
						settingValues.activeValue = newIndex;
					}
				});
				this.localStorageService.setItem('modeOfUse', json);
			});
		});
	}

	disconnectedCallback(): void {
		this.modalBtn.removeEventListener('clickModalEvent', () => { });
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-values' === name) {
			this.activesValues = JSON.parse(newValue);
			this.setSettingBtn(this.activesValues);
		}
	}

	setSettingBtn = (activesValues: any) => {
		this.settingBtn.setAttribute('data-values', activesValues.values);
		this.settingBtn.setAttribute('data-active-value', activesValues.activeValue);
	}
}
