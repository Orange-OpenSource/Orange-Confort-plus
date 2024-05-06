let messageServiceIsInstantiated: boolean;

class MessageService {

	constructor() {
		if (messageServiceIsInstantiated) {
			throw new Error('MessageService is already instantiated.');
		}

		// @note This is a dead-end, only extension needs messaging.
		messageServiceIsInstantiated = true;
	}
}

