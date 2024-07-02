let navigationButtonsServiceIsInstantiated: boolean;

class NavigationButtonsService {
	navigationButtonsId = `${PREFIX}navigation-buttons`;
	currentFocusElt: any;
	handlerNavigationButtons: any;

	constructor() {
		if (navigationButtonsServiceIsInstantiated) {
			throw new Error('NavigationButtonsService is already instantiated.');
		}

		navigationButtonsServiceIsInstantiated = true;

		this.handlerNavigationButtons = this.createHandlerNavigationButtons();
	}

	styleNavigationsButtons = `
		#${this.navigationButtonsId} {
			display: flex;
			gap: 1rem;
			position: fixed;
			bottom: 1rem;
			right: 1rem;
			z-index: calc(infinity);
		}

		#${this.navigationButtonsId} button {
			background: #f16e00;
			color: #000;
			border: none;
			font-weight: bold;
			padding: 1rem 2rem;
		}
	`;

	buttonsList: string[] = ['tab', 'shiftTab', 'click', 'escape'];

	setNavigationButtons = (value: string): void => {
		this.resetNavigationButtons();
		if (value !== DEFAULT_VALUE) {
			stylesServiceInstance.setStyle('navigation-buttons', this.styleNavigationsButtons);
			this.getFocusedElement();
			this.addNavigationButtons();
		}
	}

	resetNavigationButtons = (): void => {
		stylesServiceInstance.removeStyle('navigation-buttons');
		document.querySelector(`#${this.navigationButtonsId}`)?.remove();
		document.removeEventListener('click', this.handlerNavigationButtons);
		document.removeEventListener('focusout', this.handlerNavigationButtons);
	}

	addNavigationButtons = (): void => {
		let fragment = document.createDocumentFragment();
		const container = document.createElement('div');
		container.setAttribute('id', this.navigationButtonsId);

		this.buttonsList.forEach((navigationButton: string) => {
			let btn = document.createElement('button');
			btn.setAttribute('id', `${this.navigationButtonsId}__${navigationButton}`);
			btn.type = 'button';
			btn.tabIndex = -1;
			btn.innerHTML = i18nServiceInstance.getMessage(navigationButton);
			container.appendChild(btn);
			fragment.appendChild(container);
			document.body.appendChild(fragment);

			let btnNav = document.querySelector(`#${this.navigationButtonsId}__${navigationButton}`);

			btnNav.addEventListener('mousedown', (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.simulateKeyEvent(navigationButton);
			});
		});
	}

	simulateKeyEvent = (name: string): void => {
		switch (name) {
			case 'tab':
				this.focusElement('next');
				break;
			case 'shiftTab':
				this.focusElement('previous');
				break;
			case 'click':
				this.currentFocusElt?.click();
				break;
			case 'escape':
				this.simulateKeydownEscape();
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
				this.currentFocusElt = event.target;
			}
		}
	}
}
