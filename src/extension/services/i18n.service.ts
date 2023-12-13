class i18nService {
	locale: string = 'en';

	constructor() {
		this.locale = chrome.i18n.getUILanguage();
	}

	getMessage = (message: string): string => {
		return chrome.i18n.getMessage(message);
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
