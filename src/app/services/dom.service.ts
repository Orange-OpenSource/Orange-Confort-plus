let domServiceIsInstantiated: boolean;

class DomService {
	excludedElements = `${APP_NAME}, script`;

	constructor() {
		if (domServiceIsInstantiated) {
			throw new Error('DomService is already instantiated.');
		}

		domServiceIsInstantiated = true;
	}

	/* https://github.com/KittyGiraudel/focusable-selectors	*/
	getFocusableElements = (): any[] => {
		const not = {
			inert: '[inert],[inert] *',
			negTabIndex: '[tabindex^="-"]',
			disabled: ':disabled',
		};

		const focusableElt = [
			`a[href]:not(${not.inert},${not.negTabIndex}`,
			`area[href]:not(${not.inert},${not.negTabIndex}`,
			`input:not([type="hidden"],[type="radio"],${not.inert},${not.negTabIndex},${not.disabled}`,
			`input[type="radio"]:not(${not.inert},${not.negTabIndex},${not.disabled}`,
			`select:not(${not.inert},${not.negTabIndex},${not.disabled}`,
			`textarea:not(${not.inert},${not.negTabIndex},${not.disabled}`,
			`button:not(${not.inert},${not.negTabIndex},${not.disabled}`,
			`details:not(${not.inert} > summary:first-of-type,${not.negTabIndex}`,
			// Discard until Firefox supports `:has()`, i.e. when Firefox has its ESR version in 128.
			// See: https://github.com/KittyGiraudel/focusable-selectors/issues/12
			// `details:not(:has(> summary),${not.inert},${not.negTabIndex})`,
			`iframe:not(${not.inert},${not.negTabIndex}`,
			`audio[controls]:not(${not.inert},${not.negTabIndex}`,
			`video[controls]:not(${not.inert},${not.negTabIndex}`,
			`[contenteditable]:not(${not.inert},${not.negTabIndex}`,
			`[tabindex]:not(${not.inert},${not.negTabIndex}`
		];

		return Array.from(document.querySelectorAll(focusableElt.join(',')))
			.filter((el: any) => !el.disabled && el.tabIndex >= 0);
	}

	addButtonsInDom = (button: string): void => {
		let container: HTMLElement;
		let fragment = document.createDocumentFragment();
		let rightPosition = document.querySelector(APP_NAME)?.shadowRoot?.querySelector('app-toolbar')?.classList.contains('close') ?
			'2em' : '26em';

		if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)) {
			container = document.querySelector(`#${CONTAINER_BUTTONS_ID}`);
		} else {
			container = document.createElement('div');
			container.setAttribute('id', CONTAINER_BUTTONS_ID);

			let styleContainerButtons = `
				#${CONTAINER_BUTTONS_ID} {
					font-size: 16px;
					display: flex;
					gap: 1em;
					position: fixed;
					bottom: 1em;
					right: ${rightPosition};
					z-index: calc(infinity);
				}

				#${CONTAINER_BUTTONS_ID} button {
					background: #f16e00;
					color: #000;
					border: none;
					font-weight: bold;
					padding: 1em 2em;
				}

				#${CONTAINER_BUTTONS_ID} button:hover {
					background: #000;
					color: #fff;
				}

				#${CONTAINER_BUTTONS_ID} button:active {
					background: #fff;
					color: #000;
				}

				#${CONTAINER_BUTTONS_ID} button:focus {
					outline: 3px solid #000;
    			outline-offset: 2px;
				}
			`;

			stylesServiceInstance.setStyle('container-buttons', styleContainerButtons);
		}

		let btn = document.createElement('button');
		btn.setAttribute('id', `${CONTAINER_BUTTONS_ID}__${button}`);
		btn.type = 'button';
		btn.tabIndex = -1;
		btn.innerText = i18nServiceInstance.getMessage(button);
		container.appendChild(btn);
		fragment.appendChild(container);
		document.body.appendChild(fragment);
	}

	removeButtonsInDom = (button: string): void => {
		document.querySelector(`#${CONTAINER_BUTTONS_ID}__${button}`)?.remove();

		if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)?.children.length === 0) {
			document.querySelector(`#${CONTAINER_BUTTONS_ID}`)?.remove();
			stylesServiceInstance.removeStyle('container-buttons');
		}
	}
}

