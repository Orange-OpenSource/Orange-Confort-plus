"use strict";
const editFontFamilyLayout = document.createElement('template');
editFontFamilyLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="fontFamily"></app-select-edit-value>
	</form>
`;
class EditFontFamilyComponent extends HTMLElement {
    selectFontFamilyElement = null;
    settingValues = null;
    fontFamilyValues = fontFamilyServiceInstance.getFontList();
    handler;
    constructor() {
        super();
        this.appendChild(editFontFamilyLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectFontFamilyElement = this.querySelector('app-select-edit-value');
        this.selectFontFamilyElement.addEventListener('editSettingFontFamily', this.handler);
        this.selectFontFamilyElement.setAttribute('data-setting-values', this.fontFamilyValues.join(','));
        modeOfUseServiceInstance.getSetting('fontFamily').then((result) => {
            this.settingValues = result.values.split(',');
            const currentIndex = this.fontFamilyValues.findIndex(i => i === this.settingValues[result.valueSelected]);
            this.selectFontFamilyElement.setAttribute('data-index', currentIndex.toString());
            this.applyFontPreview(this.settingValues[result.valueSelected]);
        });
    }
    setFontFamily = (value) => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue('fontFamily', newSettingIndex, true);
        }
        else {
            modeOfUseServiceInstance.addSettingCustomValue('fontFamily', 3, value);
        }
        this.applyFontPreview(value);
        fontFamilyServiceInstance.setFontFamily(value);
    };
    applyFontPreview = (fontValue) => {
        if (!this.selectFontFamilyElement)
            return;
        this.selectFontFamilyElement.style.fontFamily = '';
        if (fontValue === DEFAULT_VALUE) {
            return;
        }
        const fontInfo = fontFamilyServiceInstance.getFontInfo(fontValue);
        if (fontInfo) {
            this.selectFontFamilyElement.querySelector('output').setAttribute('style', `font-family: ${fontValue}, ${fontInfo.generic} !important`);
        }
    };
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'editSettingFontFamily':
                    this.setFontFamily(event.detail.newValue);
                    break;
            }
        };
    };
}
customElements.define('app-edit-font-family', EditFontFamilyComponent);
