let pathServiceIsInstantiated: boolean;

class PathService {
	path: string = '';

	constructor() {
		if (pathServiceIsInstantiated) {
			throw new Error('PathService is already instantiated.');
		}

		pathServiceIsInstantiated = true;

		this.path = chrome.runtime.getURL('/');
	}
}

