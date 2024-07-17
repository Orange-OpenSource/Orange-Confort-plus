const editColourThemeLayout: HTMLTemplateElement = document.createElement('template');
editColourThemeLayout.innerHTML = `
	<form class="d-flex flex-column gap-3">
		<app-select-edit-value data-name="ColourTheme"></app-select-edit-value>
		<output id="colourThemeValues" class="d-flex flex-column">
		</output>
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
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('colourTheme', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('colourTheme', 3, value);
		}

		colourThemeServiceInstance.setColourTheme(value);
	}

	displayValuesSelected = (value: string): void => {
		this.querySelector('#colourThemeValues').innerHTML = "";
		let colourThemeValuesSelected: ColourThemeValues = colourThemeServiceInstance.colourThemeDictionnary.find(o => o.name === value);
		let arrayValuesSelected = [
			`cursor${stringServiceInstance.capitalizeFirstLetter(colourThemeValuesSelected.cursor)}`,
			`focus${stringServiceInstance.capitalizeFirstLetter(colourThemeValuesSelected.focus)}`,
			`scroll${stringServiceInstance.capitalizeFirstLetter(colourThemeValuesSelected.scroll)}`
		];

		let linkColors = colourThemeValuesSelected.link.split('_');
		if (linkColors[0] === DEFAULT_VALUE) {
			linkColors = [
				`link${stringServiceInstance.capitalizeFirstLetter(DEFAULT_VALUE)}`,
				`linkPointed${stringServiceInstance.capitalizeFirstLetter(DEFAULT_VALUE)}`,
				`linkVisited${stringServiceInstance.capitalizeFirstLetter(DEFAULT_VALUE)}`
			];
		} else {
			linkColors = [
				`link${stringServiceInstance.capitalizeFirstLetter(colourThemeValuesSelected.link.split('_')[0])}`,
				`linkPointed${stringServiceInstance.capitalizeFirstLetter(colourThemeValuesSelected.link.split('_')[1])}`,
				`linkVisited${stringServiceInstance.capitalizeFirstLetter(colourThemeValuesSelected.link.split('_')[2])}`
			];
		}

		arrayValuesSelected.concat(linkColors).forEach((value: string) => {
			let span = document.createElement('span');
			span.innerText = i18nServiceInstance.getMessage(value);
			this.querySelector('#colourThemeValues').appendChild(span);
		});
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingColourTheme':
					this.setColourTheme(event.detail.newValue);
					this.displayValuesSelected(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-colour-theme', EditColourThemeComponent);
