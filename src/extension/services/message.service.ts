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
			if (message.should_open) {
				let openEvent = new CustomEvent('openEvent', { bubbles: true });
				document.querySelector('app-root')?.dispatchEvent(openEvent);
				sendResponse({response: 'Dispatched openEvent'});
			}
		});
	}

	speak = (): void => {
		// @todo sendMessage to background script
	}
}

