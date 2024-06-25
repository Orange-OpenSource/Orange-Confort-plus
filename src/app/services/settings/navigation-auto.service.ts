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
			let delay = Number(value.split('_')[1]) * 1000;
			this.setIntervalFocus(delay);
		}
	}

	/* @todo: faire un service? qui retourne tous les éléments focusable à partir de :
	 * https://github.com/KittyGiraudel/focusable-selectors	*/
	focusElement = (): void => {
		const not = {
			inert: ':not([inert]):not([inert] *)',
			negTabIndex: ':not([tabindex^="-"])',
			disabled: ':not(:disabled)',
		};

		const focusableElt = [
			`a[href]${not.inert}${not.negTabIndex}`,
			`area[href]${not.inert}${not.negTabIndex}`,
			`input:not([type="hidden"]):not([type="radio"])${not.inert}${not.negTabIndex}${not.disabled}`,
			`input[type="radio"]${not.inert}${not.negTabIndex}${not.disabled}`,
			`select${not.inert}${not.negTabIndex}${not.disabled}`,
			`textarea${not.inert}${not.negTabIndex}${not.disabled}`,
			`button${not.inert}${not.negTabIndex}${not.disabled}`,
			`details${not.inert} > summary:first-of-type${not.negTabIndex}`,
			// Discard until Firefox supports `:has()`
			// See: https://github.com/KittyGiraudel/focusable-selectors/issues/12
			// `details:not(:has(> summary))${not.inert}${not.negTabIndex}`,
			`iframe${not.inert}${not.negTabIndex}`,
			`audio[controls]${not.inert}${not.negTabIndex}`,
			`video[controls]${not.inert}${not.negTabIndex}`,
			`[contenteditable]${not.inert}${not.negTabIndex}`,
			`[tabindex]${not.inert}${not.negTabIndex}`
		];

		const focusableElements = Array.from(document.querySelectorAll(focusableElt.join(',')))
			.filter((el: any) => !el.disabled && el.tabIndex >= 0);

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
			if (event.target) {
				this.currentFocusElt = event.target;
			}
		};
	}
}
