abstract class AbstractSetting extends HTMLElement {
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

		this.localStorageService.getItem(key).then((result: any) => {
			if (!result) {
				this.localStorageService.setItem(key, this.activesValues);
				this.setSettingBtn(this.activesValues);
			} else {
				this.setSettingBtn(result);
			}
		});

		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			let newIndex = (event as CustomEvent).detail.index;
			let newValue = (event as CustomEvent).detail.index;
			this.activesValues.activeValue = newIndex;
			this.localStorageService.setItem(key, this.activesValues);

			this.localStorageService.getItem('modeOfUse').then((result: any) => {
				if (!result) {
					console.log('Error');
					return;
				} else {
					let jsonToEdit = result;
					let valuesToEdit = this.activesValues;
					console.log(valuesToEdit);
					console.log(valuesToEdit.values);
					console.log(valuesToEdit.values[newIndex]);
					valuesToEdit.values[newIndex] = newValue;
					jsonToEdit.modes.facilePlus.fontSize = valuesToEdit;
					this.localStorageService.setItem('modeOfUse', jsonToEdit);
				}
			});
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

	setSettingBtn = (activesValues: any) => {
		this.settingBtn.setAttribute('data-values', activesValues.values);
		this.settingBtn.setAttribute('data-active-value', activesValues.activeValue);
	}
}
