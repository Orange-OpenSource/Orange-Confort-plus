const editColorContrastLayout: HTMLTemplateElement = document.createElement('template');
editColorContrastLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="ColorContrast"></app-select-edit-value>
	</form>
`;

class EditColorContrastComponent extends HTMLElement {
	selectColorContrastElement: HTMLElement | null = null;
	settingValues: string[] = null;
	colorContrastValues = [DEFAULT_VALUE, 'reinforcedContrasts', 'white_black', 'black_ivory', 'white_red', 'black_yellow', 'white_blue', 'yellow_blue', 'black_green'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editColorContrastLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectColorContrastElement = this.querySelector('app-select-edit-value');
		this.selectColorContrastElement.addEventListener('editSettingColorContrast', this.handler);
		this.selectColorContrastElement.setAttribute('data-setting-values', this.colorContrastValues.join(','));

		modeOfUseServiceInstance.getSetting('colorContrast').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.colorContrastValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectColorContrastElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setColorContrast = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('colorContrast', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('colorContrast', 3, value);
		}

		colorContrastServiceInstance.setColorsContrasts(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingColorContrast':
					this.setColorContrast(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-color-contrast', EditColorContrastComponent);
