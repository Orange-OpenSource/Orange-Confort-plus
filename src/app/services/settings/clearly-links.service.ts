let clearlyLinksServiceIsInstantiated: boolean;

class ClearlyLinksService {

	constructor() {
		if (clearlyLinksServiceIsInstantiated) {
			throw new Error('ClearlyLinksService is already instantiated.');
		}

		clearlyLinksServiceIsInstantiated = true;
	}
}
