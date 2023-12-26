class PathService {
	path: string = '';

	constructor() {
		this.path = chrome.runtime.getURL('/');
	}
}

