const editSettingLayout: HTMLTemplateElement = document.createElement('template');
editSettingLayout.innerHTML = `
	<div class="gap-2">
		<app-icon id="edit-setting-icon"></app-icon>
		<span id="edit-setting-title"></span>
		<span id="edit-setting-instruction"></span>
	</div>

	<form id="edit-setting-content" class="gap-2">
		<button id="edit-btn-prev" type="button" class="btn btn-icon btn-primary">
			<span class="visually-hidden" data-i18n="close"></span>
			<app-icon data-name="Minus_small"></app-icon>
		</button>
		<span id="selected-value">Valeur sélectionnée</span>
		<button id="edit-btn-next" type="button" class="btn btn-icon btn-primary">
			<span class="visually-hidden" data-i18n="close"></span>
			<app-icon data-name="Plus_small"></app-icon>
		</button>
	</form>
`;

class EditSettingComponent extends HTMLElement {
	static observedAttributes = ['data-setting'];
	settingIcon: HTMLElement | null = null;
	settingTitle: HTMLElement | null = null;
	settingInstruction: HTMLElement | null = null;
	selectedValue: HTMLElement | null = null;
	btnPrevValue: HTMLButtonElement | null = null;
	btnNextValue: HTMLButtonElement | null = null;

	settingName: string = null;
	currentIndex: number = 0;
	currentValue: string = null;
	textSizeValues = ["110", "130", "160", "200", "350", "500"];

	handler: any;

	constructor() {
		super();

		this.appendChild(editSettingLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.settingIcon = this.querySelector('#edit-setting-icon');
		this.settingTitle = this.querySelector('#edit-setting-title');
		this.settingInstruction = this.querySelector('#edit-setting-instruction');
		this.selectedValue = this.querySelector('#selected-value');
		this.btnPrevValue = this.querySelector('#edit-btn-prev');
		this.btnNextValue = this.querySelector('#edit-btn-next');

		this.btnPrevValue?.addEventListener('click', this.handler);
		this.btnNextValue?.addEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-setting' === name) {
			this.settingName = newValue;
			this.settingIcon?.setAttribute('data-name', newValue);
			this.settingTitle!.innerText = i18nServiceInstance.getMessage(newValue);
			this.settingInstruction!.innerText = i18nServiceInstance.getMessage(`${newValue}Instruction`);
		}
	}

	moveTextSize = (step: number): void => {
		this.currentIndex = this.textSizeValues.findIndex(i => i === this.currentValue);
		this.currentIndex += step;
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
		this.selectedValue!.innerText = this.currentValue;
		modeOfUseServiceInstance.setSettingValue(this.settingName, 3, this.currentValue);
	}

	private createHandler = () => {
		return (event: any) => {
			if (event.type === 'click') {
				switch (event.target) {
					case this.btnPrevValue:
						this.moveTextSize(-1);
						break;
					case this.btnNextValue:
						this.moveTextSize(1);
						break;
				}
			}
		}
	}
}

customElements.define('app-edit-setting', EditSettingComponent);
