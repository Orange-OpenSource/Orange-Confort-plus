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

	/* @todo: faire un service? qui retourne tous les éléments focusable à partir de :
	 * https://github.com/KittyGiraudel/focusable-selectors	*/
	focusElement = (direction: 'previous' | 'next'): void => {
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
