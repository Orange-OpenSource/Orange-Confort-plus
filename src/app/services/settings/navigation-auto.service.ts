let navigationAutoServiceIsInstantiated: boolean;

class NavigationAutoService {
	currentFocusElt: any;
	currentIndex: number;
	handler: any;
	timer: ReturnType<typeof setInterval> | null = null;

	constructor() {
		if (navigationAutoServiceIsInstantiated) {
			throw new Error('NavigationAutoService is already instantiated.');
		}

		navigationAutoServiceIsInstantiated = true;

		this.handler = this.createHandler();
	}

	setNavigationAuto = (value: string): void => {
		window.removeEventListener('focus', this.handler);
		this.clearIntervalFocus();

		if (value !== DEFAULT_VALUE) {
			window.addEventListener('focus', this.handler, true);
			let delay = Number(value.split('_')[1]?.split('-')[1]) * 1000;
			this.setIntervalFocus(delay);
		}
	}

	focusElement = (): void => {
		const focusableElements = domServiceInstance.getFocusableElements();

		let newIndex: number = 0;
		if (this.currentFocusElt) {
			const currentIndex = focusableElements.indexOf(this.currentFocusElt);
			newIndex = (currentIndex + 1) % focusableElements.length;
		}

		const newFocusElt = focusableElements[newIndex];
		(newFocusElt as HTMLElement)?.focus();
		this.currentFocusElt = newFocusElt;
	}

	private setIntervalFocus = (delay: number): void => {
		this.timer = setInterval(() => {
			this.focusElement();
		}, delay);
	}

	private clearIntervalFocus = (): void => {
		if (this.timer !== null) {
			clearInterval(this.timer);
			this.timer = null;
		}
	}

	private createHandler(): (event: FocusEvent) => void {
		return (event: FocusEvent) => {
			if (event.currentTarget) {
				this.currentFocusElt = event.currentTarget;
			}
		};
	}
}
