const editFontFamilyLayout: HTMLTemplateElement = document.createElement('template');
editFontFamilyLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="FontFamily"></app-select-edit-value>
	</form>
`;

class EditFontFamilyComponent extends HTMLElement {
	selectFontFamilyElement: HTMLElement | null = null;
	settingValues: string[] = null;
	fontFamilyValues = [DEFAULT_VALUE, 'Accessible_DfA', 'B612_Mono', 'Comic Sans MS', 'Lexand Deca', 'Luciole', 'Sylexiad Sans', 'Verdana'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editFontFamilyLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectFontFamilyElement = this.querySelector('app-select-edit-value');
		this.selectFontFamilyElement.addEventListener('editSettingFontFamily', this.handler);
		this.selectFontFamilyElement.setAttribute('data-setting-values', this.fontFamilyValues.join(','));

		modeOfUseServiceInstance.getSetting('textSize').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.fontFamilyValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectFontFamilyElement.setAttribute('data-index', currentIndex.toString());
		});
	}

	setFontFamily = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('fontFamily', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('fontFamily', 3, value);
		}

		fontFamilyServiceInstance.setFontFamily(value);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingFontFamily':
					this.setFontFamily(event.detail.newValue);
					break;
			}
		}
	}
}

customElements.define('app-edit-font-family', EditFontFamilyComponent);
