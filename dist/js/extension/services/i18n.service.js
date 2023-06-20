"use strict";
let i18nServiceIsInstantiated;
class I18nService {
    locale = 'en';
    constructor() {
        if (i18nServiceIsInstantiated) {
            throw new Error('I18nService is already instantiated.');
        }
        i18nServiceIsInstantiated = true;
        this.locale = chrome.i18n.getUILanguage();
    }
    getMessage = (message, substitutions = []) => {
        if (!message || message.includes('undefined')) {
            console.warn(`Part of argument for I18nService getMessage() is undefined. Message: "${message}".`);
            return;
        }
        if (substitutions.length > 0 && substitutions.some(str => str?.includes('undefined'))) {
            console.warn(`At least one substitution string for I18nService getMessage() is undefined. Message: "${message}". Substitutions: "${substitutions}".`);
            return;
        }
        return chrome.i18n.getMessage(message, substitutions).trim();
    };
    translate(root) {
        const elements = root.querySelectorAll('[data-i18n]');
        for (const element of elements) {
            element.innerHTML = this.getMessage(element.dataset?.i18n);
        }
        const elementsTitle = root.querySelectorAll('[data-i18n-title]');
        for (const element of elementsTitle) {
            element.title = this.getMessage(element.dataset?.i18nTitle);
        }
    }
}
