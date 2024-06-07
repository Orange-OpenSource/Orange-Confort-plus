const editTextSizeLayout: HTMLTemplateElement = document.createElement('template');
editTextSizeLayout.innerHTML = `
	<form class="d-flex align-items-center justify-content-between gap-2">
		<button id="edit-btn-prev" type="button" class="btn btn-icon btn-primary">
			<span class="visually-hidden" data-i18n="increaseTextSize"></span>
			<app-icon data-name="Minus_small"></app-icon>
		</button>
		<output id="selected-value"></output>
		<button id="edit-btn-next" type="button" class="btn btn-icon btn-primary">
			<span class="visually-hidden" data-i18n="reduceTextSize"></span>
			<app-icon data-name="Plus_small"></app-icon>
		</button>
	</form>
`;

class EditTextSizeComponent extends HTMLElement {
	selectedValue: HTMLParagraphElement | null = null;
	btnPrevValue: HTMLButtonElement | null = null;
	btnNextValue: HTMLButtonElement | null = null;

	currentIndex: number = null;
	currentValue: string = null;
	settingValues: string[] = null;
	textSizeValues = [DEFAULT_VALUE, '110', '130', '160', '200', '350', '500'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editTextSizeLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectedValue = this.querySelector('#selected-value');
		this.btnPrevValue = this.querySelector('#edit-btn-prev');
		this.btnNextValue = this.querySelector('#edit-btn-next');

		this.btnPrevValue?.addEventListener('click', this.handler);
		this.btnNextValue?.addEventListener('click', this.handler);

		modeOfUseServiceInstance.getSetting('textSize').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			this.currentIndex = this.textSizeValues.findIndex(i => i === this.settingValues[result.valueSelected]);
			this.moveTextSize(this.currentIndex);
		});
	}

	moveTextSize = (index: number): void => {
		this.currentIndex = index;
		this.btnPrevValue!.disabled = false;
		this.btnNextValue!.disabled = false;

		if (this.currentIndex <= 0) {
			this.currentIndex = 0;
			this.btnPrevValue!.disabled = true;
			this.btnNextValue!.disabled = false;
		} else if (this.currentIndex >= this.textSizeValues.length - 1) {
			this.currentIndex = this.textSizeValues.length - 1;
			this.btnPrevValue!.disabled = false;
			this.btnNextValue!.disabled = true;
		}

		this.currentValue = this.textSizeValues[this.currentIndex];
		this.selectedValue!.innerText = i18nServiceInstance.getMessage(this.currentValue);
		let valueExist = this.settingValues.includes(this.currentValue);
		let newSettingIndex = this.settingValues.findIndex(i => i === this.textSizeValues[this.currentIndex]);

		if (valueExist) {
			modeOfUseServiceInstance.setSettingValue('textSize', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('textSize', 3, this.currentValue);
		}

		textSizeServiceInstance.setFontSize(this.currentValue);
	}

	private createHandler = () => {
		return (event: any) => {
			if (event.type === 'click') {
				switch (event.target) {
					case this.btnPrevValue:
						this.moveTextSize(this.currentIndex - 1);
						break;
					case this.btnNextValue:
						this.moveTextSize(this.currentIndex + 1);
						break;
				}
			}
		}
	}
}

customElements.define('app-edit-text-size', EditTextSizeComponent);
