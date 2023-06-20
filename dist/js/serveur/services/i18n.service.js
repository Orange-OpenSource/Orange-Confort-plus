"use strict";
let i18nServiceIsInstantiated;
class I18nService {
    locale = 'en';
    path = '';
    constructor() {
        if (i18nServiceIsInstantiated) {
            throw new Error('I18nService is already instantiated.');
        }
        i18nServiceIsInstantiated = true;
        this.path = `${window.location.origin}/`;
        if (['en', 'fr', 'pl', 'es'].some(language => navigator.language.startsWith(language))) {
            this.locale = navigator.language.slice(0, 2);
        }
        this.getJSON().then((result) => {
            // @ts-ignore
            localStorage.setItem(`${PREFIX}i18n`, JSON.stringify(result));
        });
    }
    getJSON() {
        return fetch(`${this.path}_locales/${this.locale}/messages.json`)
            .then(response => {
            return response.json();
        })
            .catch(error => {
            console.error(`Error when retrieving 'messages.json' file : ${error}.`);
            return error;
        });
    }
    getMessages() {
        // @ts-ignore
        return localStorage.getItem(`${PREFIX}i18n`);
    }
    getMessage(message, substitutions = []) {
        if (!message || message.includes('undefined')) {
            console.warn(`Part of argument for I18nService getMessage() is undefined. Message: "${message}".`);
            return;
        }
        const translations = JSON.parse(this.getMessages());
        let content = translations[message]?.message || '';
        if (substitutions.length > 0) {
            if (substitutions.some(str => str?.includes('undefined'))) {
                console.warn(`At least one substitution string for I18nService getMessage() is undefined. Message: "${message}". Substitutions: "${substitutions}".`);
                return;
            }
            const placeholders = translations[message]?.placeholders;
            const matches = [...content.matchAll(/(\$.*?\$)/g)];
            for (const match of matches) {
                const key = match[0].replaceAll('$', '').toLowerCase();
                const index = Number(placeholders[key]?.content.replace('$', ''));
                content = content.replaceAll(match[0], substitutions[index - 1]);
            }
        }
        return content.trim();
    }
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
