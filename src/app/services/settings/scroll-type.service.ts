let scrollTypeServiceIsInstantiated: boolean = false;

class ScrollTypeService {
	btnState = '';
	scrollSteps = 100;
	scrollTimer = 50;
	scrollDelay: number = 0;
	hoverTimeoutIds: { [key: string]: number | null } = {};

	constructor() {
		if (scrollTypeServiceIsInstantiated) {
			throw new Error('ScrollTypeService is already instantiated.');
		}

		scrollTypeServiceIsInstantiated = true;
	}

	setScrollType = (value: string, delay: number = 0): void => {
		this.btnState = value;
		this.scrollDelay = delay;
		this.setBtnScroll();
	}

	setBtnScroll = (): void => {
		let intervalUp: ReturnType<typeof setInterval> | null = null;
		let intervalDown: ReturnType<typeof setInterval> | null = null;
		const buttonsList = [
			{ name: 'scroll_down', intervalRef: intervalDown },
			{ name: 'scroll_up', intervalRef: intervalUp }
		];

		buttonsList.forEach((scrollButton: any) => {
			domServiceInstance.removeButtonsInDom(scrollButton.name);
			if (this.hoverTimeoutIds[scrollButton.name]) {
				clearTimeout(this.hoverTimeoutIds[scrollButton.name]!);
				this.hoverTimeoutIds[scrollButton.name] = null;
			}
			if (scrollButton.intervalRef) {
				clearInterval(scrollButton.intervalRef);
				scrollButton.intervalRef = null;
			}
		});

		if (this.btnState !== DEFAULT_VALUE) {
			buttonsList.forEach((button) => {
				domServiceInstance.addButtonsInDom(button.name, true);

				let btnScroll = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${button.name}`);
				let scrollDir = button.name.includes('up') ? -1 : button.name.includes('down') ? 1 : 0;
				let scrollBy = scrollDir * this.scrollSteps;

				if (this.btnState === 'scrollOnMouseover') {
					btnScroll.addEventListener('mouseenter', () => {
						if (this.scrollDelay > 0) {
							if (this.hoverTimeoutIds[button.name]) {
								clearTimeout(this.hoverTimeoutIds[button.name]!);
							}
							this.hoverTimeoutIds[button.name] = window.setTimeout(() => {
								this.startScrolling(button, scrollBy);
								this.hoverTimeoutIds[button.name] = null;
							}, this.scrollDelay);
						} else {
							this.startScrolling(button, scrollBy);
						}
					});
					btnScroll.addEventListener('mouseleave', () => this.stopScrolling(button));
				} else {
					btnScroll.addEventListener('click', () => {
						window.scrollBy(0, scrollBy);
					});
				}
			});
		}
	}

	startScrolling (button: any, scrollBy: number): void {
		if (button.intervalRef) {
			clearInterval(button.intervalRef);
		}
		button.intervalRef = setInterval(() => { window.scrollBy(0, scrollBy); }, this.scrollTimer);
	}

	stopScrolling(button: any ): void {
		if (this.hoverTimeoutIds[button.name]) {
			clearTimeout(this.hoverTimeoutIds[button.name]!);
			this.hoverTimeoutIds[button.name] = null;
		}
		if (button.intervalRef) {
			clearInterval(button.intervalRef);
			button.intervalRef = null;
		}
	}
}
