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
	button: HTMLButtonElement | null = null;
	container: HTMLElement | null = null;

	id = '';
	accordion = '';
	icon = '';
	title = '';

	private CLASS_NAME_SHOW = 'show';
	private CLASS_NAME_COLLAPSED = 'collapsed';

	private _triggerArray: any[] = [];

	constructor() {
		super();

		this.id = this.dataset?.id || this.id;
		this.accordion = this.dataset?.idAccordion || this.accordion;
		this.icon = this.dataset?.icon || this.icon;
		this.title = this.dataset?.title || this.title;

		this.appendChild(collapseLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.button = this.querySelector('button.accordion-button');
		this.container = this.querySelector('div.accordion-collapse');
		this._triggerArray.push(this.button);

		// @ts-ignore
		const iconElement: HTMLElement = this.querySelector('app-icon');
		iconElement.dataset.name = this.icon;
		// @ts-ignore
		const titleElement: HTMLElement = this.button.querySelector('span');
		titleElement.innerHTML = this.title;

		this.button?.setAttribute('aria-controls', this.id);
		this.button?.setAttribute('data-bs-target', `#${this.id}`);
		this.container?.setAttribute('id', this.id);
		this.container?.setAttribute('data-bs-parent', `#${this.accordion}`);

		this.button?.addEventListener('click', () => {
			this.toggle();
		});
	}

	toggle(): void {
		if (this._isShown()) {
			this.hide();
		} else {
			this.show();
		}
	}
	show(): void {
		this.container?.classList.add(this.CLASS_NAME_SHOW);
		this._addAriaAndCollapsedClass(this._triggerArray, true);
	}

	hide(): void {
		this.container?.classList.remove(this.CLASS_NAME_SHOW);
		this._addAriaAndCollapsedClass(this._triggerArray, false);
	}

	_isShown(element = this.container): boolean {
		return element!.classList.contains(this.CLASS_NAME_SHOW);
	}

	_addAriaAndCollapsedClass(triggerArray: any, isOpen: boolean): void {
		if (!triggerArray.length) {
			return;
		}

		for (const element of triggerArray) {
			element.classList.toggle(this.CLASS_NAME_COLLAPSED, !isOpen);
			element.setAttribute('aria-expanded', isOpen);
		}
	}
}

customElements.define('app-collapse', CollapseComponent);
