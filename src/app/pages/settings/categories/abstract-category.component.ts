abstract class AbstractCategory extends HTMLElement {
	button: HTMLElement = null;
	container: HTMLElement = null;

	private CLASS_NAME_SHOW = 'show';
	private CLASS_NAME_COLLAPSED = 'collapsed';
	private _triggerArray: any[] = [];

	constructor() {
		super();
	}

	connectedCallback(): void {
		this.button = this.querySelector('button.accordion-button');
		this.container = this.querySelector('div.accordion-collapse');

		this._triggerArray.push(this.button);
		this.button?.addEventListener('click', () => {
			this.addAriaAndCollapsedClass(this._triggerArray, this.isShown());
		});
	}

	disconnectedCallback(): void {
		this.button?.removeEventListener('click', () => {
		});
	}

	isShown = (element = this.container): boolean => {
		return element!.classList.contains(this.CLASS_NAME_SHOW);
	}

	addAriaAndCollapsedClass = (triggerArray: any, isOpen: boolean): void => {
		if (!triggerArray.length) {
			return;
		}
		for (const element of triggerArray) {
			this.container?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
			element.classList.toggle(this.CLASS_NAME_COLLAPSED, !isOpen);
			element.setAttribute('aria-expanded', String(isOpen));
		}
	}
}
