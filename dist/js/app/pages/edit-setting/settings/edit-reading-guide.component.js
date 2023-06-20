"use strict";
const editReadingGuideLayout = document.createElement('template');
editReadingGuideLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="readingGuide"></app-select-edit-value>
	</form>
`;
class EditReadingGuideComponent extends HTMLElement {
    selectReadingGuideElement = null;
    settingValues = null;
    readingGuideValues = [DEFAULT_VALUE, 'ruleGuide', 'maskGuide', 'alternatingLines'];
    handler;
    constructor() {
        super();
        this.appendChild(editReadingGuideLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectReadingGuideElement = this.querySelector('app-select-edit-value');
        this.selectReadingGuideElement.addEventListener('editSettingReadingGuide', this.handler);
        this.selectReadingGuideElement.setAttribute('data-setting-values', this.readingGuideValues.join(','));
        modeOfUseServiceInstance.getSetting('readingGuide').then((result) => {
            this.settingValues = result.values.split(',');
            const currentIndex = this.readingGuideValues.findIndex(i => i === this.settingValues[result.valueSelected]);
            this.selectReadingGuideElement.setAttribute('data-index', currentIndex.toString());
        });
    }
    setReadingGuide = (value) => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue('readingGuide', newSettingIndex, true);
        }
        else {
            modeOfUseServiceInstance.addSettingCustomValue('readingGuide', 3, value);
        }
        readingGuideServiceInstance.setReadingMaskGuide(value);
    };
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'editSettingReadingGuide':
                    this.setReadingGuide(event.detail.newValue);
                    break;
            }
        };
    };
}
customElements.define('app-edit-reading-guide', EditReadingGuideComponent);
