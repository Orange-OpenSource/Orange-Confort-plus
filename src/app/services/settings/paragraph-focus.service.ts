let paragraphFocusServiceIsInstantiated: boolean;

class ParagraphFocusService {
	paragraphClass = `${PREFIX}paragraph-focus`;
	observer: MutationObserver | null = null;
	isActive = false;

	constructor() {
		if (paragraphFocusServiceIsInstantiated) {
			throw new Error('ParagraphFocusService is already instantiated.');
		}

		paragraphFocusServiceIsInstantiated = true;
	}

	styleParagraphFocus = `
		.${PREFIX}paragraph-focus:focus, .${PREFIX}paragraph-focus:focus-visible {
			outline: 2px solid currentColor !important;
			outline-offset: 2px !important;
		}
	`;

	setParagraphFocus = (value: string): void => {
		this.removeParagraphFocus();

		if (value !== DEFAULT_VALUE) {
			this.isActive = true;
			stylesServiceInstance.setStyle('paragraph-focus', this.styleParagraphFocus);
			this.addParagraphFocus();
			this.observeDOM();
		}
	}

	addParagraphFocus = (): void => {
		// @ts-ignore
		document.querySelectorAll(PAGE_P_MARKUP_SELECTOR).forEach((p: Element) => {
			if (!p.classList.contains(this.paragraphClass)) {
				p.setAttribute('tabindex', '0');
				p.classList.add(this.paragraphClass);
			}
		});
	}

	removeParagraphFocus = (): void => {
		this.isActive = false;
		this.disconnectObserver();
		document.querySelectorAll(`.${this.paragraphClass}`).forEach((p: Element) => {
			p.removeAttribute('tabindex');
			p.classList.remove(this.paragraphClass);
		});
		stylesServiceInstance.removeStyle('paragraph-focus');
	}

	observeDOM = (): void => {
		this.disconnectObserver();

		this.observer = new MutationObserver((mutations: MutationRecord[]) => {
			if (!this.isActive) return;

			let shouldUpdate = false;
			mutations.forEach((mutation: MutationRecord) => {
				mutation.addedNodes.forEach((node: Node) => {
					if (node.nodeType === Node.ELEMENT_NODE) {
						const element = node as HTMLElement;
						if (element.tagName === 'P' || element.querySelectorAll('p').length > 0) {
							shouldUpdate = true;
						}
					}
				});
			});

			if (shouldUpdate) {
				this.addParagraphFocus();
			}
		});

		this.observer.observe(document.body, {
			childList: true,
			subtree: true
		});
	}

	disconnectObserver = (): void => {
		if (this.observer) {
			this.observer.disconnect();
			this.observer = null;
		}
	}
}
