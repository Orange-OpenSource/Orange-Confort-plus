let scrollTypeServiceIsInstantiated: boolean;

class ScrollTypeService {
	btnState = '';
	scrollSteps = 10;
	scrollTimer = 50;

	constructor() {
		if (scrollTypeServiceIsInstantiated) {
			throw new Error('ScrollTypeService is already instantiated.');
		}

		scrollTypeServiceIsInstantiated = true;
	}

	setScrollType = (value: string): void => {
		this.btnState = value;
		this.setBtnScroll();
	}

	setBtnScroll = (): void => {
		let intervalUp: any;
		let intervalDown: any;
		const buttonsList = [
			{ name: 'scroll-up', interval: intervalUp },
			{ name: 'scroll-down', interval: intervalDown }
		];

		buttonsList.forEach((scrollButton: any) => {
			domServiceInstance.removeButtonsInDom(scrollButton.name);
		});

		if (this.btnState !== DEFAULT_VALUE) {
			buttonsList.forEach((button) => {
				domServiceInstance.addButtonsInDom(button.name);

				let btnScroll = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${button.name}`);
				let scrollDir = button.name.includes('up') ? -1 : button.name.includes('down') ? 1 : 0;
				let scrollBy = scrollDir * this.scrollSteps;

				if (this.btnState === 'scrollOnMouseover') {
					btnScroll?.addEventListener('mouseover', (event: any) => {
						button.interval = setInterval(function () { window.scrollBy(0, scrollBy) }, this.scrollTimer)
					});
					btnScroll?.addEventListener('mouseleave', (event: any) => {
						clearInterval(button.interval);
					});
				} else {
					btnScroll?.addEventListener('click', (event: any) => {
						window.scrollBy(0, scrollBy);
					});
				}
			});
		}
	}
}
