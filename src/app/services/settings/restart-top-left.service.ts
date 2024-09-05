let restartTopLeftServiceIsInstantiated: boolean;

class RestartTopLeftService {
	firstElement: HTMLAnchorElement;

	constructor() {
		if (restartTopLeftServiceIsInstantiated) {
			throw new Error('RestartTopLeftService is already instantiated.');
		}

		restartTopLeftServiceIsInstantiated = true;
	}

	setRestartTopLeft = (value: string): void => {
		this.firstElement?.remove();
		if (value !== DEFAULT_VALUE) {
			this.addAndFocusFirstElement();
		}
	}

	addAndFocusFirstElement = (): void => {
		this.firstElement = document.createElement('a');
		document.body.insertBefore(this.firstElement, document.querySelector(APP_NAME));
		this.firstElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}
