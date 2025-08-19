const editFontFamilyLayout: HTMLTemplateElement = document.createElement('template');
editFontFamilyLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="fontFamily"></app-select-edit-value>
	</form>
`;

class EditFontFamilyComponent extends HTMLElement {
	selectFontFamilyElement: HTMLElement | null = null;
	settingValues: string[] = null;
	fontFamilyValues = fontFamilyServiceInstance.getFontList();

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

		modeOfUseServiceInstance.getSetting('fontFamily').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			const currentIndex = this.fontFamilyValues.findIndex(i => i === this.settingValues[result.valueSelected]);

			this.selectFontFamilyElement.setAttribute('data-index', currentIndex.toString());

			this.applyFontPreview(this.settingValues[result.valueSelected]);
		});
	}

	setFontFamily = (value: string): void => {
		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('fontFamily', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('fontFamily', 3, value);
		}
		this.applyFontPreview(value);

		fontFamilyServiceInstance.setFontFamily(value);
	}

	private applyFontPreview = (fontValue: string): void => {
		if (!this.selectFontFamilyElement) return;

		this.selectFontFamilyElement.style.fontFamily = '';

		if (fontValue === DEFAULT_VALUE) {
			return;
		}

		const fontInfo = fontFamilyServiceInstance.getFontInfo(fontValue);
		if (fontInfo) {
			this.selectFontFamilyElement.querySelector('output').setAttribute('style', `font-family: ${fontValue}, ${fontInfo.type} !important`);
		}
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
