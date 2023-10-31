class pathService {
	path = '';

	constructor() {
		this.path = chrome.runtime.getURL('/');
	}

	get path() {
		return this.path;
	}
}

