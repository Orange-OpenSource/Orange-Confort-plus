"use strict";
const editReadAloudLayout = document.createElement('template');
editReadAloudLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="readAloud"></app-select-edit-value>
	</form>
`;
class EditReadAloudComponent extends HTMLElement {
    selectReadAloudElement = null;
    settingValues = null;
    readAloudValues = [DEFAULT_VALUE, 'word', 'sentence', 'paragraph', 'all'];
    handler;
    constructor() {
        super();
        this.appendChild(editReadAloudLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectReadAloudElement = this.querySelector('app-select-edit-value');
        this.selectReadAloudElement.addEventListener('editSettingReadAloud', this.handler);
        this.selectReadAloudElement.setAttribute('data-setting-values', this.readAloudValues.join(','));
        modeOfUseServiceInstance.getSetting('readAloud').then((result) => {
            this.settingValues = result.values.split(',');
            const currentIndex = this.readAloudValues.findIndex(i => i === this.settingValues[result.valueSelected]);
            this.selectReadAloudElement.setAttribute('data-index', currentIndex.toString());
        });
    }
    setReadAloud = (value) => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue('readAloud', newSettingIndex, true);
        }
        else {
            modeOfUseServiceInstance.addSettingCustomValue('readAloud', 3, value);
        }
        readAloudServiceInstance.setReadAloud(value);
    };
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'editSettingReadAloud':
                    this.setReadAloud(event.detail.newValue);
                    break;
            }
        };
    };
}
customElements.define('app-edit-read-aloud', EditReadAloudComponent);
