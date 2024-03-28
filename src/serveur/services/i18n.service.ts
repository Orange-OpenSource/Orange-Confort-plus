let i18nServiceIsInstantiated: boolean;

class I18nService {
	locale: string = 'en';
	path: string = '';

	constructor() {
		if (i18nServiceIsInstantiated) {
			throw new Error('I18nService is already instantiated.');
		}

		i18nServiceIsInstantiated = true;

		this.path = `${window.location.origin}/`;

		if (['en', 'fr'].some(language => navigator.language.startsWith(language))) {
			this.locale = navigator.language.slice(0, 2);
		}

		this.getJSON().then((result: string) => {
			// @ts-ignore
			localStorage.setItem(`${prefix}i18n`, JSON.stringify(result));
		});
	}

	getJSON(): Promise<string> {
		return fetch(`${this.path}_locales/${this.locale}/messages.json`)
			.then(response => {
				return response.json();
			})
			.catch(error => {
				console.error(`Error when retrieving 'messages.json' file : ${error}.`);
				return error;
			});
	}

	getMessages(): string {
		// @ts-ignore
		return localStorage.getItem(`${prefix}i18n`) as string;
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
