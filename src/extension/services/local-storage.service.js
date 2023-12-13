class LocalStorageService {
	prefix = 'cplus-';

	constructor() {
	}

	setItem(key, value) {
		chrome.storage.local.set({ [`${ this.prefix }${ key }`]: value });
	}

	getItem(key) {
		return JSON.parse(chrome.storage.local.get([`${ this.prefix }${ key }`]));
	}

	removeItem(key) {
		chrome.storage.local.remove([`${ this.prefix }${ key }`]);
	}
}
