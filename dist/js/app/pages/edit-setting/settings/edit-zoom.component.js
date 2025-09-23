"use strict";
const editZoomLayout = document.createElement('template');
editZoomLayout.innerHTML = `
	<form>
		<app-select-edit-value data-name="zoom"></app-select-edit-value>
	</form>
`;
class EditZoomComponent extends HTMLElement {
    selectZoomElement = null;
    settingValues = null;
    zoomValues = [DEFAULT_VALUE, '110', '130', '160', '200', '350', '500'];
    handler;
    constructor() {
        super();
        this.appendChild(editZoomLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectZoomElement = this.querySelector('app-select-edit-value');
        this.selectZoomElement.addEventListener('editSettingZoom', this.handler);
        this.selectZoomElement.setAttribute('data-setting-values', this.zoomValues.join(','));
        modeOfUseServiceInstance.getSetting('zoom').then((result) => {
            this.settingValues = result.values.split(',');
            const currentIndex = this.zoomValues.findIndex(i => i === this.settingValues[result.valueSelected]);
            this.selectZoomElement.setAttribute('data-index', currentIndex.toString());
        });
    }
    setZoom(value) {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex === -1) {
            modeOfUseServiceInstance.addSettingCustomValue('zoom', 3, value);
        }
        else {
            modeOfUseServiceInstance.setSettingValue('zoom', newSettingIndex, true);
        }
        zoomServiceInstance.setZoom(value);
    }
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'editSettingZoom':
                    this.setZoom(event.detail.newValue);
                    break;
            }
        };
    };
}
customElements.define('app-edit-zoom', EditZoomComponent);
