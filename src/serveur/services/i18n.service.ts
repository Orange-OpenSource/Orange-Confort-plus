class i18nService {
	locale: string = 'en';
	path: string = '';

	constructor() {
		this.path = window.location.origin + '/';

		if(['en', 'fr'].some(language => navigator.language.startsWith(language))) {
			this.locale = navigator.language.slice(0,2);
		}

		const xhr = new XMLHttpRequest();
		xhr.open('GET', `${this.path}_locales/${this.locale}/messages.json`, false);
		xhr.addEventListener('error', () => {
			throw new Error(`Couldn’t find ${this.locale}.`);
		});
		xhr.send();

		localStorage.setItem('orange-i18n', xhr.responseText);
	}

	getMessages(): string {
		return localStorage.getItem('orange-i18n') as string;
	}

	getMessage(message: string): string {
		const translations = JSON.parse(this.getMessages());

		return translations[message]?.message;
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
