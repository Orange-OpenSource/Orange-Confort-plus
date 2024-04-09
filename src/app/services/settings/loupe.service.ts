let loupeServiceIsInstantiated: boolean;

class LoupeService {

	constructor() {
		if (loupeServiceIsInstantiated) {
			throw new Error('LoupeService is already instantiated.');
		}

		loupeServiceIsInstantiated = true;
	}
}
