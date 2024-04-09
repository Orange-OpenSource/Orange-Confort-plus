let stopAnimationsServiceIsInstantiated: boolean;

class StopAnimationsService {

	constructor() {
		if (stopAnimationsServiceIsInstantiated) {
			throw new Error('StopAnimationsService is already instantiated.');
		}

		stopAnimationsServiceIsInstantiated = true;
	}
}
