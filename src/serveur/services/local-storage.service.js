class LocalStorageService {
	prefix = 'cplus-';

	constructor() {
	}

	setItem(key, value) {
		localStorage.setItem(`${ this.prefix }${ key }`, JSON.stringify(value));
	}

	getItem(key) {
		return JSON.parse(localStorage.getItem(`${ this.prefix }${ key }`));
	}

	removeItem(key) {
		localStorage.removeItem(`${ this.prefix }${ key }`);
	}
}
