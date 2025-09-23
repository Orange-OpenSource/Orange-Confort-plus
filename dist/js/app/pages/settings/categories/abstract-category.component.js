"use strict";
class AbstractCategory extends HTMLElement {
    static observedAttributes = ['data-settings', 'data-open'];
    btnAccordion = null;
    accordionContainer = null;
    settingsContainer = null;
    btnMoreSettings = null;
    settingsDictionnary = [];
    settingsElements = [];
    displayAllSettings = false;
    CLASS_NAME_SHOW = 'show';
    CLASS_NAME_COLLAPSED = 'collapsed';
    _triggerArray = [];
    handler;
    constructor() {
        super();
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.btnAccordion = this.querySelector('button.accordion-button');
        this.accordionContainer = this.querySelector('div.accordion-collapse');
        this.settingsContainer = this.querySelector('.c-category__settings-container');
        this.btnMoreSettings = this.querySelector('.c-category__btn-more');
        this.querySelectorAll('.c-category__setting').forEach((element) => {
            this.settingsDictionnary.push({ name: stringServiceInstance.normalizeSettingName(element.tagName), element: element.tagName });
            this.settingsElements.push(this.querySelector(element.tagName));
        });
        this._triggerArray.push(this.btnAccordion);
        this.btnAccordion?.addEventListener('click', this.handler);
        this.btnMoreSettings?.addEventListener('click', this.handler);
    }
    disconnectedCallback() {
        this.btnAccordion?.removeEventListener('click', this.handler);
        this.btnMoreSettings?.removeEventListener('click', this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ('data-settings' === name) {
            this.displaySettings(JSON.parse(newValue));
        }
        if ('data-open' === name) {
            this.addAriaAndCollapsedClass(this._triggerArray, JSON.parse(newValue));
        }
    }
    addAriaAndCollapsedClass = (triggerArray, isOpen) => {
        if (!triggerArray.length) {
            return;
        }
        for (const element of triggerArray) {
            this.accordionContainer?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
            element?.classList.toggle(this.CLASS_NAME_COLLAPSED, isOpen);
            element?.setAttribute('aria-expanded', String(isOpen));
        }
    };
    displaySettings = (settings) => {
        if (!this.displayAllSettings) {
            this.settingsElements.forEach((element) => {
                element.removeAttribute('data-default-setting');
                element.classList.add('d-none');
            });
        }
        let nbActifSetting = 0;
        settings.forEach((setting) => {
            let settingObj = this.settingsDictionnary.find((o) => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0]));
            if (settingObj) {
                nbActifSetting++;
                let settingElement = this.querySelector(settingObj?.element);
                settingElement?.setAttribute('data-values', JSON.stringify(Object.entries(setting)[0][1]));
                settingElement?.setAttribute('data-default-setting', 'true');
                settingElement?.classList.remove('d-none');
            }
        });
        if (nbActifSetting === 0 || nbActifSetting === this.settingsDictionnary.length) {
            this.settingsElements.forEach((element) => {
                element.classList.remove('d-none');
            });
            this.btnMoreSettings?.classList.add('d-none');
        }
    };
    displayOrHideOthersSettings = () => {
        this.displayAllSettings = !this.displayAllSettings;
        this.settingsElements.forEach((element) => {
            if (!element.hasAttribute('data-default-setting')) {
                element.classList.toggle('d-none');
            }
        });
        if (this.displayAllSettings) {
            this.btnMoreSettings.innerText = i18nServiceInstance.getMessage('lessSettings');
        }
        else {
            this.btnMoreSettings.innerText = i18nServiceInstance.getMessage('moreSettings');
        }
    };
    createHandler = () => {
        return (event) => {
            if (event.type === 'click') {
                if (event.currentTarget === this.btnAccordion || this.btnAccordion.contains(event.currentTarget)) {
                    categoriesServiceInstance.openCategory(this.tagName);
                    let clickCollapsedEvent = new CustomEvent('collapsedCategory', { bubbles: true });
                    this.btnAccordion?.dispatchEvent(clickCollapsedEvent);
                }
                else if (event.currentTarget === this.btnMoreSettings) {
                    this.displayOrHideOthersSettings();
                }
            }
        };
    };
}
