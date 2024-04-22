let messageServiceIsInstantiated: boolean;

class MessageService {

	constructor() {
		if (messageServiceIsInstantiated) {
			throw new Error('MessageService is already instantiated.');
		}

		messageServiceIsInstantiated = true;

		// @note Listen to whatever the background script sends
		this.listen();
		// @todo Listen to events in toolbar: with handleEvents maybe?
		// @todo Then `this.speak()` ?
	}

	listen = ():void => {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			// @todo Play with message
			// @todo Dispatch custom event (?)
			// @todo Then send response (?)
		});
	}

	speak = (): void => {
		// @todo sendMessage to background script
	}
}

