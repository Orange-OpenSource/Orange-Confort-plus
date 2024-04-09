let readAloudServiceIsInstantiated: boolean;

class ReadAloudService {

	constructor() {
		if (readAloudServiceIsInstantiated) {
			throw new Error('ReadAloudService is already instantiated.');
		}

		readAloudServiceIsInstantiated = true;
	}
}
