let i18nServiceIsInstantiated: boolean;

class I18nService {
	locale: string = 'en';

	constructor() {
		if (i18nServiceIsInstantiated) {
			throw new Error('I18nService is already instantiated.');
		}

		i18nServiceIsInstantiated = true;

		this.locale = chrome.i18n.getUILanguage();
	}

	getMessage = (message: string, substitutions: string[] = []): string => {
		if (!message || message.includes('undefined')) {
			console.warn(`Part of argument for I18nService getMessage() is undefined. Message: "${message}".`);
			return;
		}

		if (substitutions.length > 0 && substitutions.some(str => str?.includes('undefined'))) {
			console.warn(`At least one substitution string for I18nService getMessage() is undefined. Message: "${message}". Substitutions: "${substitutions}".`);
			return;
		}

		return chrome.i18n.getMessage(message, substitutions);
	}

	translate(root: ShadowRoot): void {
		const elements = root.querySelectorAll('[data-i18n]') as NodeListOf<HTMLElement>;
		for (const element of elements) {
			element.innerHTML = this.getMessage(element.dataset?.i18n as string);
		}

		const elementsTitle = root.querySelectorAll('[data-i18n-title]') as NodeListOf<HTMLElement>;
		for (const element of elementsTitle) {
			element.title = this.getMessage(element.dataset?.i18nTitle as string);
		}
	}
}
