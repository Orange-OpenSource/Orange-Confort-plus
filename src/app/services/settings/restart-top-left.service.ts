let restartTopLeftServiceIsInstantiated: boolean;

class RestartTopLeftService {
	constructor() {
		if (restartTopLeftServiceIsInstantiated) {
			throw new Error('RestartTopLeftService is already instantiated.');
		}

		restartTopLeftServiceIsInstantiated = true;
	}

	setRestartTopLeft = (value: string): void => {
		if (value !== DEFAULT_VALUE) {
			this.moveScrollAndCursorTopLeft();
		}
	}

	moveScrollAndCursorTopLeft = (): void => {
		window.scrollTo(0, 0);
	}
}
