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
			element.innerText = this.getMessage(element.dataset?.i18n);
		}
	}
}
