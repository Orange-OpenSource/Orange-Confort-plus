class i18nService {
	constructor(path) {
		// path is only needed server-side.
	}

	get locale() {
		return chrome.i18n.getUILanguage();
	}

	getMessage = (message) => {
		return chrome.i18n.getMessage(message);
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
