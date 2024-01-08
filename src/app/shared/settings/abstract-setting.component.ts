abstract class AbstractSetting extends HTMLElement {
	static observedAttributes = ['data-setting'];
	settingBtn: HTMLElement | null = null;
	modalBtn: HTMLElement | null = null;
	canEdit = false;
	localStorageService: any;

	activesValues: any;


	testBtn: HTMLElement | null = null;

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
		}

		this.localStorageService.getItem(key).then((result: any) => {
			if (!result) {
				this.localStorageService.setItem(key, this.activesValues);
				this.setSettingBtn(this.activesValues);
			} else {
				this.setSettingBtn(result);
			}
		});

		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.activesValues.activeValue = (event as CustomEvent).detail.index;
			this.localStorageService.setItem(key, this.activesValues);
		});

		this.testBtn = this.querySelector('#testBtn');
		this.testBtn?.addEventListener('click', (event: any) => {
			this.activesValues.activeValue = 0;
			this.localStorageService.setItem(key, this.activesValues);
		});

		window.addEventListener(`storage-${key}`, (event: any) => {
			this.localStorageService.getItem(key).then((result: any) => {
				this.setSettingBtn(result);
			});
		});
	}

	disconnectedCallback(): void {
		this.modalBtn.removeEventListener('clickModalEvent', () => { });
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-setting' === name) {
			/* 			let jsonSetting = JSON.parse(newValue);
						this.settingBtn.setAttribute('data-values', jsonSetting.values);
						this.settingBtn.setAttribute('data-active-value', jsonSetting.activeValue);
						this.modalBtn.setAttribute('data-value', newValue[0]); */
		}
	}

	setSettingBtn = (activesValues: any) => {
		this.settingBtn.setAttribute('data-values', activesValues.values);
		this.settingBtn.setAttribute('data-active-value', activesValues.activeValue);
	}
}
