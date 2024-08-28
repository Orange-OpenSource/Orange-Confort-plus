const editColourThemeLayout: HTMLTemplateElement = document.createElement('template');
editColourThemeLayout.innerHTML = `
	<form class="d-flex flex-column gap-3">
		<app-select-edit-value data-name="colourTheme"></app-select-edit-value>
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
		let arrayValuesSelected: any[] = [
			{ key: 'colourTheme_cursor', value: this.getValuesMessage(colourThemeValuesSelected.cursor.split('_')) },
			{ key: 'colourTheme_focus', value: this.getValuesMessage(colourThemeValuesSelected.focus.split('_')) },
			{ key: 'colourTheme_scroll', value: this.getValuesMessage(colourThemeValuesSelected.scroll.split('_')) }
		];

		let linkColors: any[] = [];
		if (colourThemeValuesSelected.link.split('_')[0] === DEFAULT_VALUE) {
			linkColors = [
				{ key: 'colourTheme_link', value: this.getValuesMessage([DEFAULT_VALUE]) },
				{ key: 'colourTheme_linkPointed', value: this.getValuesMessage([DEFAULT_VALUE]) },
				{ key: 'colourTheme_linkVisited', value: this.getValuesMessage([DEFAULT_VALUE]) }
			];
		} else {
			linkColors = [
				{ key: 'colourTheme_link', value: this.getValuesMessage([colourThemeValuesSelected.link.split('_')[0]]) },
				{ key: 'colourTheme_linkPointed', value: this.getValuesMessage([colourThemeValuesSelected.link.split('_')[1]]) },
				{ key: 'colourTheme_linkVisited', value: this.getValuesMessage([colourThemeValuesSelected.link.split('_')[2]]) }
			];
		}

		arrayValuesSelected.concat(linkColors).forEach((message: any) => {
			let span = document.createElement('span');

			if (message.value[0] === i18nServiceInstance.getMessage(DEFAULT_VALUE)) {
				span.innerText = i18nServiceInstance.getMessage(`${message.key}_${DEFAULT_VALUE}`);
			} else {
				span.innerText = i18nServiceInstance.getMessage(message.key, message.value);
			}

			this.querySelector('#colourThemeValues').appendChild(span);
		});
	}

	getValuesMessage = (values: string[]): string[] => {
		let message: any[] = [];
		values.forEach((value: string) => {
			message.push(i18nServiceInstance.getMessage(value));
		});

		return message;
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
