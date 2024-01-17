let pathServiceIsInstantiated: boolean;

class PathService {
	path: string = '';

	constructor() {
		if (pathServiceIsInstantiated) {
			throw new Error('Le pathService est déjà instancié.');
		}

		pathServiceIsInstantiated = true;

		this.path = chrome.runtime.getURL('/');
	}
}

