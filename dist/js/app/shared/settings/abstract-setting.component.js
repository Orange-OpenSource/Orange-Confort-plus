"use strict";
class AbstractSetting extends HTMLElement {
    static observedAttributes = ['data-values'];
    settingBtn = null;
    modalBtn = null;
    canEdit = false;
    activesValues;
    separator = ',';
    name = '';
    handler;
    callback;
    constructor() {
        super();
        this.canEdit = (this.dataset?.canEdit === 'true') || this.canEdit;
        this.name = stringServiceInstance.normalizeSettingName(this.tagName);
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.settingBtn = this.querySelector('app-btn-setting');
        this.modalBtn = this.querySelector('app-btn-modal');
        this.settingBtn?.setAttribute('data-name', this.name);
        this.modalBtn?.setAttribute('data-name', this.name);
        this.setSettingBtn(this.activesValues);
        if (this.canEdit) {
            this.modalBtn?.classList.remove('d-none');
        }
        this.settingBtn?.addEventListener('changeSettingEvent', this.handler);
    }
    disconnectedCallback() {
        this.modalBtn?.removeEventListener('clickModalEvent', this.handler);
        this.settingBtn?.removeEventListener('changeSettingEvent', this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ('data-values' === name) {
            this.activesValues = JSON.parse(newValue);
            this.setSettingBtn(this.activesValues);
            if (this.callback) {
                this.callback(this.activesValues?.values.split(',')[this.activesValues?.valueSelected]);
            }
        }
    }
    setSettingBtn = (activesValues) => {
        this.settingBtn?.setAttribute('data-values', activesValues?.values);
        this.settingBtn?.setAttribute('data-active-value', activesValues?.valueSelected.toString());
        this.modalBtn?.setAttribute('data-value', i18nServiceInstance.getMessage(activesValues?.values?.split(',')[activesValues?.valueSelected]));
    };
    setCallback = (callback) => {
        this.callback = callback;
    };
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'changeSettingEvent':
                    this.changeSettingEvent(event);
                    break;
            }
        };
    };
    changeSettingEvent = (event) => {
        let newIndex = event.detail.index;
        let newValue = event.detail.value;
        modeOfUseServiceInstance.setSettingValue(this.name, newIndex).then((success) => {
            if (!success) {
                this.callback(newValue);
                this.modalBtn?.setAttribute('data-value', i18nServiceInstance.getMessage(newValue));
            }
        });
    };
}
