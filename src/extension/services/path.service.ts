class pathService {
	path: string = '';

	constructor() {
		this.path = chrome.runtime.getURL('/');
	}
}

