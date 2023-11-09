class i18nService {
	locale = 'en';
	path = '';

	constructor(path) {
		this.path = path;

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

	get locale() {
		return this.locale;
	}

	getMessages() {
		return localStorage.getItem('orange-i18n');
	}

	getMessage(message) {
		const translations = JSON.parse(this.getMessages());

		return translations[message]?.message;
	}

	translate(root) {
		const elements = root.querySelectorAll('[data-i18n]');
		for (const element of elements) {
			element.innerHTML = this.getMessage(element.dataset?.i18n);
		}

		const elementsTitle = root.querySelectorAll('[data-title-i18n]');
		for (const element of elementsTitle) {
			element.title = this.getMessage(element.dataset?.titleI18n);
		}
	}
}
