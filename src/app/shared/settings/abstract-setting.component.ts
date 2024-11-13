abstract class AbstractSetting extends HTMLElement {
	static observedAttributes = ['data-values'];
	settingBtn: HTMLElement | null = null;
	modalBtn: HTMLElement | null = null;
	canEdit = false;
	activesValues: SettingModel;
	separator = ',';
	name = '';

	handler: any;

	private callback: (value: string) => void;

	constructor() {
		super();
		this.canEdit = (this.dataset?.canEdit === 'true') || this.canEdit;
		this.name = stringServiceInstance.normalizeSettingName(this.tagName);

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.settingBtn = this.querySelector('app-btn-setting');
		this.modalBtn = this.querySelector('app-btn-modal');

		this.settingBtn?.setAttribute('data-name', this.name);
		this.modalBtn?.setAttribute('data-name', this.name);

		this.setSettingBtn(this.activesValues);

		if (this.canEdit) {
			this.modalBtn?.classList.remove('d-none');
			this.settingBtn?.classList.add('sc-btn-setting--with-btn-modal');
		}

		this.settingBtn?.addEventListener('changeSettingEvent', this.handler);
	}

	disconnectedCallback(): void {
		this.modalBtn?.removeEventListener('clickModalEvent', this.handler);
		this.settingBtn?.removeEventListener('changeSettingEvent', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-values' === name) {
			this.activesValues = JSON.parse(newValue);
			this.setSettingBtn(this.activesValues);
			if (this.callback) {
				this.callback(this.activesValues?.values.split(',')[this.activesValues?.valueSelected]);
			}
		}
	}

	setSettingBtn = (activesValues: SettingModel) => {
		this.settingBtn?.setAttribute('data-values', activesValues?.values);
		this.settingBtn?.setAttribute('data-active-value', activesValues?.valueSelected.toString());
		this.modalBtn?.setAttribute('data-value', i18nServiceInstance.getMessage(activesValues?.values?.split(',')[activesValues?.valueSelected]));
	}

	setCallback = (callback: (value: string) => void) => {
		this.callback = callback;
	}

	createHandler = () => {
		return (event: Event) => {
			switch (event.type) {
				case 'changeSettingEvent':
					this.changeSettingEvent(event);
					break;
			}
		}
	}

	private changeSettingEvent = (event: Event): void => {
		let newIndex = (event as CustomEvent).detail.index;
		let newValue = (event as CustomEvent).detail.value;

		modeOfUseServiceInstance.setSettingValue(this.name, newIndex).then((success: boolean) => {
			if (!success) {
				this.callback(newValue);
				this.modalBtn?.setAttribute('data-value', i18nServiceInstance.getMessage(newValue));
			}
		});
	}
}
