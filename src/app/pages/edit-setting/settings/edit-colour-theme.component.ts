const editColourThemeLayout: HTMLTemplateElement = document.createElement('template');
editColourThemeLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="ColourTheme"></app-select-edit-value>

		// Ajouter la liste des valeurs modifiés par le theme
	</form>
`;

class EditColourThemeComponent extends HTMLElement {
	selectColourThemeElement: HTMLElement | null = null;
	settingValues: string[] = null;
	colourThemeValues = [DEFAULT_VALUE, 'reinforcedContrasts', 'white_black'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editColourThemeLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectColourThemeElement = this.querySelector('app-select-edit-value');
		this.selectColourThemeElement.addEventListener('editSettingColourTheme', this.handler);
		this.selectColourThemeElement.setAttribute('data-setting-values', this.colourThemeValues.join(','));

		modeOfUseServiceInstance.getSetting('colourTheme').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.colourThemeValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectColourThemeElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setColourTheme = (value: string): void => {
		let valueExist = this.settingValues.includes(value);
		let newSettingIndex = this.settingValues.indexOf(value);

		if (valueExist) {
			modeOfUseServiceInstance.setSettingValue('colourTheme', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('colourTheme', 3, value);
		}

		colourThemeServiceInstance.setColourTheme(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingColourTheme':
					this.setColourTheme(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-colour-theme', EditColourThemeComponent);
