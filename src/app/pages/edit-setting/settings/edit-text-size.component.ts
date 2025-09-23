const editTextSizeLayout: HTMLTemplateElement = document.createElement('template');
editTextSizeLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="textSize"></app-select-edit-value>
	</form>
`;

class EditTextSizeComponent extends HTMLElement {
	selectTextSizeElement: HTMLElement | null = null;
	settingValues: string[] = null;
	textSizeValues = [DEFAULT_VALUE, '110', '130', '160', '200', '350', '500'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editTextSizeLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectTextSizeElement = this.querySelector('app-select-edit-value');
		this.selectTextSizeElement.addEventListener('editSettingTextSize', this.handler);
		this.selectTextSizeElement.setAttribute('data-setting-values', this.textSizeValues.join(','));

		modeOfUseServiceInstance.getSetting('textSize').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.textSizeValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectTextSizeElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setTextSize = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('textSize', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('textSize', 3, value);
		}

		textSizeServiceInstance.setFontSize(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingTextSize':
					this.setTextSize(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-text-size', EditTextSizeComponent);
