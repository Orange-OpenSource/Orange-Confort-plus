let messageServiceIsInstantiated: boolean;

class MessageService {

	constructor() {
		if (messageServiceIsInstantiated) {
			throw new Error('MessageService is already instantiated.');
		}

		messageServiceIsInstantiated = true;
	}
}

