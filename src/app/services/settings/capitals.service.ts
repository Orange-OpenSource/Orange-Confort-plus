let capitalsServiceIsInstantiated: boolean;

class CapitalsService {

	constructor() {
		if (capitalsServiceIsInstantiated) {
			throw new Error('CapitalsService is already instantiated.');
		}

		capitalsServiceIsInstantiated = true;
	}
}
