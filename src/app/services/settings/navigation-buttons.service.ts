let navigationButtonsServiceIsInstantiated: boolean;

class NavigationButtonsService {
	currentFocusElt: any;
	handlerNavigationButtons: any;
	navigationButtonSet: string = DEFAULT_VALUE;
	delay: number = 0;
	constructor() {
		if (navigationButtonsServiceIsInstantiated) {
			throw new Error('NavigationButtonsService is already instantiated.');
		}

		navigationButtonsServiceIsInstantiated = true;

		this.handlerNavigationButtons = this.createHandlerNavigationButtons();
	}

	buttonsList: string[] = ['escape', 'start', 'previous', 'next', 'click'];

	setNavigationButtons = (value: string): void => {
		// TODO : get params from value
		this.navigationButtonSet = value.split("_")[0];
		this.delay = parseInt(value.split('_')[1]?.replace(/\D/g, ''), 10) * 1000;

		this.resetNavigationButtons();

		// TODO : switchcase for buttonsList
		switch (this.navigationButtonSet) {
			case 'navigationSet' :
				this.getFocusedElement();
				this.addNavigationButtons();
				break;
			case 'fullset':
				this.getFocusedElement();
				this.addNavigationButtons();
				scrollTypeServiceInstance.setScrollType('scrollOnClick');
				break;
			default:
				break;
		}
	}

	resetNavigationButtons = (): void => {
		scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
		this.buttonsList.forEach((navigationButton: string) => {
			domServiceInstance.removeButtonsInDom(navigationButton);
		});
		document.removeEventListener('click', this.handlerNavigationButtons);
		document.removeEventListener('focusout', this.handlerNavigationButtons);
	}

	addNavigationButtons = (): void => {
		this.buttonsList.forEach((navigationButton: string) => {
			domServiceInstance.addButtonsInDom(navigationButton);

			let btnNav = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${navigationButton}`);
			btnNav.addEventListener('mousedown', (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.simulateKeyEvent(navigationButton);
			});
		});
	}

	simulateKeyEvent = (name: string): void => {
		switch (name) {
			case 'next':
				this.focusElement('next');
				break;
			case 'previous':
				this.focusElement('previous');
				break;
			case 'click':
				this.currentFocusElt?.click();
				break;
			case 'escape':
				this.simulateKeydownEscape();
				break;
			case 'start':
				restartTopLeftServiceInstance.setRestartTopLeft('');
				break;
			default:
				break;
		}
	}

	focusElement = (direction: 'previous' | 'next'): void => {
		const focusableElements = domServiceInstance.getFocusableElements();

		let newIndex: number = 0;
		if (this.currentFocusElt) {
			const currentIndex = focusableElements.indexOf(this.currentFocusElt);
			newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
			newIndex = newIndex > focusableElements.length - 1 ? 0 : newIndex < 0 ? focusableElements.length - 1 : newIndex;
		}

		const newFocusElt = focusableElements[newIndex];
		(newFocusElt as HTMLElement)?.focus();
		this.currentFocusElt = newFocusElt;
	}

	getFocusedElement = (): void => {
		document.addEventListener('focus', this.handlerNavigationButtons);
	}

	simulateKeydownEscape = (): void => {
		var event = new KeyboardEvent('keydown', {
			key: 'Escape',
			keyCode: 27,
			code: 'Escape',
			which: 27,
			bubbles: true,
			cancelable: true
		});
		document.dispatchEvent(event);
	}

	createHandlerNavigationButtons = () => {
		return (event: any) => {
			if (event.type === 'focusout') {
				this.currentFocusElt = event.currentTarget;
			}
		}
	}
}
