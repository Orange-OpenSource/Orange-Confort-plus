const headerLayout: HTMLTemplateElement = document.createElement('template');
headerLayout.innerHTML = `
	<header class="d-flex justify-content-between bg-secondary px-3 py-2">
		<div class="d-flex align-items-center">
			<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary">
				<span class="visually-hidden"></span>
				<app-icon data-name="Form_Chevron_left"></app-icon>
				<app-icon id="mode-icon"></app-icon>
			</button>

			<span id="page-block-title" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">
				<app-icon id="page-icon" data-name="Settings"></app-icon>
				<span id="page-title"></span>
			</span>

			<h1 id="app-title" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white m-0">
				<app-icon data-name="Accessibility"></app-icon>
				<span data-i18n="mainTitle"></span>
				<span class="text-primary">+</span>
			</h1>
		</div>
		<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">
				<span class="visually-hidden" data-i18n="close"></span>
				<app-icon data-name="Reduire_C+"></app-icon>
		</button>
	</header>
`;

class HeaderComponent extends HTMLElement {
	static observedAttributes = ['data-display', 'data-page-title', 'data-page-icon', 'data-selected-mode', 'data-prev-btn'];
	closeBtn: HTMLElement | null = null;
	prevBtn: HTMLElement | null = null;
	appTitle: HTMLElement | null = null;
	pageBlockTitle: HTMLElement | null = null;
	pageTitle: HTMLElement | null = null;
	modeIcon: HTMLElement | null = null;
	pageIcon: HTMLElement | null = null;
	display = 'primary';

	handler: any;

	constructor() {
		super();
		this.appendChild(headerLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.closeBtn = this.querySelector('#close-toolbar');
		this.prevBtn = this.querySelector('#prev-toolbar');
		this.appTitle = this.querySelector('#app-title');
		this.pageBlockTitle = this.querySelector('#page-block-title');
		this.pageTitle = this.querySelector('#page-title');
		this.modeIcon = this.querySelector('#mode-icon');
		this.pageIcon = this.querySelector('#page-icon');

		this.displayMode(this.display);

		this.closeBtn.addEventListener('click', this.handler);
		this.prevBtn?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.closeBtn?.removeEventListener('click', this.handler);
		this.prevBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-display' === name) {
			this.displayMode(newValue);
		}
		if ('data-page-title' === name && newValue) {
			this.pageTitle!.innerText = i18nServiceInstance.getMessage(newValue);
		}
		if ('data-page-icon' === name) {
			newValue.length === 0 ? this.pageIcon.classList.add('d-none') : this.pageIcon?.setAttribute('data-name', newValue);
		}
		if ('data-selected-mode' === name) {
			this.modeIcon?.setAttribute('data-name', `${newValue}_border`);
		}
		if ('data-prev-btn' === name && newValue) {
			if(!this.hasAttribute('data-selected-mode')) {
				this.prevBtn.classList.add('d-none');
				this.pageBlockTitle.classList.remove('ms-2');
			} else {
				this.prevBtn!.title = i18nServiceInstance.getMessage(newValue);
				this.prevBtn!.querySelector('span').innerText = i18nServiceInstance.getMessage(newValue);
				this.prevBtn.classList.remove('d-none');
				this.pageBlockTitle.classList.add('ms-2');
			}
		}
	}

	displayMode = (mode: string): void => {
		this.prevBtn?.classList.toggle('d-none', mode === 'primary');
		this.pageBlockTitle?.classList.toggle('d-none', mode === 'primary');
		this.appTitle?.classList.toggle('d-none', mode === 'secondary');
	}

	private createHandler = () => {
		return (event: any) => {
			if (event.type === 'click') {
				switch (event.currentTarget) {
					case this.closeBtn:
						this.closeButtonEvent();
						break;
					case this.prevBtn:
						this.prevButtonEvent();
						break;
				}
			}
		}
	}

	private closeButtonEvent = (): void => {
		let clickCloseEvent = new CustomEvent('closeEvent', { bubbles: true });
		this.closeBtn?.dispatchEvent(clickCloseEvent);
	}

	private prevButtonEvent = (): void => {
		let clickEvent = new CustomEvent('changeRoute',
			{
				bubbles: true,
				detail: {
					route: routeServiceInstance.historyRoute[routeServiceInstance.historyRoute.length - 1]
				}
			});
		this.prevBtn?.dispatchEvent(clickEvent);
	}
}

customElements.define('app-header', HeaderComponent);
