"use strict";
const editNavigationButtonsComponent = document.createElement('template');
editNavigationButtonsComponent.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-button-preset" data-name="buttonSet" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-pointing-delay" data-name="pointingDelay" data-label="true"></app-select-edit-value>
	</form>
`;
class EditNavigationButtonsComponent extends HTMLElement {
    selectButtonPresetElement = null;
    selectPointingDelayElement = null;
    settingValues = null;
    buttonSetValue = '';
    pointingDelayValue = '';
    buttonSetValues = [`buttonSet_${DEFAULT_VALUE}`, 'buttonSet_scrollSet', 'buttonSet_navigationSet', 'buttonSet_fullSet'];
    pointingDelayValues = [`pointingDelay_clicAction`, 'pointingDelay_delay1', 'pointingDelay_delay2', 'pointingDelay_delay3', 'pointingDelay_delay6'];
    handler;
    constructor() {
        super();
        this.appendChild(editNavigationButtonsComponent.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectButtonPresetElement = this.querySelector(`#${PREFIX}select-button-preset`);
        this.selectPointingDelayElement = this.querySelector(`#${PREFIX}select-pointing-delay`);
        this.selectButtonPresetElement.addEventListener('editSettingButtonSet', this.handler);
        this.selectPointingDelayElement.addEventListener('editSettingPointingDelay', this.handler);
        this.selectButtonPresetElement.setAttribute('data-setting-values', this.buttonSetValues.join(','));
        this.selectPointingDelayElement.setAttribute('data-setting-values', this.pointingDelayValues.join(','));
        modeOfUseServiceInstance.getSetting('navigationButtons').then((result) => {
            this.settingValues = result.values?.split(',');
            this.buttonSetValue = this.settingValues[result.valueSelected]?.split('_')[0];
            this.pointingDelayValue = this.settingValues[result.valueSelected]?.split('_')[1];
            const currentIndexButtonPreset = this.buttonSetValues.findIndex(i => i === `buttonSet_${this.buttonSetValue}`);
            const currentIndexPointingDelay = this.pointingDelayValues.findIndex(i => i === `pointingDelay_${this.pointingDelayValue}`);
            this.selectButtonPresetElement.setAttribute('data-index', currentIndexButtonPreset.toString());
            this.selectPointingDelayElement.setAttribute('data-index', currentIndexPointingDelay.toString());
            // Contrôler la visibilité du sélecteur de délai lors de l'initialisation
            this.togglePointingDelayVisibility();
        });
    }
    setNavigationButtons = () => {
        let value = `${this.buttonSetValue}_${this.pointingDelayValue}`;
        if (value === `${DEFAULT_VALUE}_clicAction`) {
            value = DEFAULT_VALUE;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue('navigationButtons', newSettingIndex, true);
        }
        else {
            modeOfUseServiceInstance.addSettingCustomValue('navigationButtons', 3, value);
        }
        navigationButtonsServiceInstance.setNavigationButtons(value);
    };
    togglePointingDelayVisibility = () => {
        if (this.buttonSetValue === DEFAULT_VALUE) {
            this.selectPointingDelayElement.style.display = 'none';
        }
        else {
            this.selectPointingDelayElement.style.display = '';
        }
    };
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'editSettingButtonSet':
                    if (event.detail.newValue === DEFAULT_VALUE) {
                        this.buttonSetValue = DEFAULT_VALUE;
                    }
                    else {
                        this.buttonSetValue = event.detail.newValue.split('_')[1];
                    }
                    this.togglePointingDelayVisibility();
                    this.setNavigationButtons();
                    break;
                case 'editSettingPointingDelay':
                    if (event.detail.newValue === DEFAULT_VALUE) {
                        this.pointingDelayValue = DEFAULT_VALUE;
                    }
                    else {
                        this.pointingDelayValue = event.detail.newValue.split('_')[1];
                    }
                    this.setNavigationButtons();
                    break;
            }
        };
    };
}
customElements.define('app-edit-navigation-buttons', EditNavigationButtonsComponent);
