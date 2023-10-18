class i18nService {
	constructor() {}

	getMessage = (message) => {
		return chrome.i18n.getMessage(message);
	}
}
