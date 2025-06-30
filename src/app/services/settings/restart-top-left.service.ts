let restartTopLeftServiceIsInstantiated: boolean;

class RestartTopLeftService {
	firstElement: HTMLAnchorElement;

	constructor() {
		if (restartTopLeftServiceIsInstantiated) {
			throw new Error('RestartTopLeftService is already instantiated.');
		}

		restartTopLeftServiceIsInstantiated = true;
	}

	setRestartTopLeft = (): void => {
		this.firstElement?.remove();
		this.addAndFocusFirstElement();
	}

	addAndFocusFirstElement = (): void => {
		this.firstElement = document.createElement('a');
		document.body.insertBefore(this.firstElement, document.querySelector(APP_NAME));
		this.firstElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}
