abstract class AbstractSetting extends HTMLElement {
	static observedAttributes = ['data-setting'];
	settingBtn: HTMLElement | null = null;
	modalBtn: HTMLElement | null = null;
	canEdit = false;

	constructor() {
		super();

		this.canEdit = (this.dataset?.canEdit === 'true') || this.canEdit;
	}

	connectedCallback(): void {
		this.settingBtn = this.querySelector('app-btn-setting');
		this.modalBtn = this.querySelector('app-btn-modal');
		if (this.canEdit) {
			this.modalBtn.classList.remove('d-none');
		}
	}

	disconnectedCallback(): void {
		this.modalBtn.removeEventListener('clickModalEvent', () => { });
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-setting' === name) {
			let jsonSetting = JSON.parse(newValue);
			this.settingBtn.setAttribute('data-values', jsonSetting.values);
			this.settingBtn.setAttribute('data-active-value', jsonSetting.activeValue);
			this.modalBtn.setAttribute('data-value', newValue[0]);
		}
	}
}
