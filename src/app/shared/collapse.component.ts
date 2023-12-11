const collapseLayout: HTMLTemplateElement = document.createElement('template');
collapseLayout.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button collapsed gap-2 fs-4" type="button" data-bs-toggle="collapse" aria-expanded="false">
				<app-icon data-size="2rem"></app-icon>
				<span></span>
			</button>
		</div>
		<div class="accordion-collapse collapse">
			<div class="accordion-body"></div>
		</div>
	</div>
`;

class CollapseComponent extends HTMLElement {
	button: HTMLElement = null;
	container: HTMLElement = null;
	iconElement: HTMLElement = null;
	titleElement: HTMLElement | undefined = null;

	id = '';
	icon = '';
	title = '';

	private CLASS_NAME_SHOW = 'show';
	private CLASS_NAME_COLLAPSED = 'collapsed';

	private _triggerArray: any[] = [];

	constructor() {
		super();

		this.id = this.dataset?.id || this.id;
		this.icon = this.dataset?.icon || this.icon;
		this.title = this.dataset?.title || this.title;

		this.appendChild(collapseLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.button = this.querySelector('button.accordion-button');
		this.container = this.querySelector('div.accordion-collapse');
		this.iconElement = this.querySelector('app-icon');
		this.titleElement = this.button?.querySelector('span');

		this.iconElement?.setAttribute('data-name', this.icon);
		this.titleElement!.innerText = this.title;
		this._triggerArray.push(this.button);

		this.button?.setAttribute('aria-controls', this.id);
		this.container?.setAttribute('id', this.id);

		this.button?.addEventListener('click', () => {
			this.toggle();
		});
	}

	disconnectedCallback(): void {
		this.button?.removeEventListener('click', () => {
		});
	}

	toggle = (): void => {
		this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
	}

	_isShown = (element = this.container): boolean => {
		return element!.classList.contains(this.CLASS_NAME_SHOW);
	}

	_addAriaAndCollapsedClass = (triggerArray: any, isOpen: boolean): void => {
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
customElements.define('app-collapse', CollapseComponent);

