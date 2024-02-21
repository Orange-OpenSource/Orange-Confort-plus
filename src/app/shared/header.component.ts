const headerLayout: HTMLTemplateElement = document.createElement('template');
headerLayout.innerHTML = `
	<header class="d-flex justify-content-between bg-secondary px-3 py-2">
		<div class="d-flex align-items-center">
			<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="previous">
				<span class="visually-hidden" data-i18n="previous"></span>
				<app-icon data-name="Form_Chevron_left"></app-icon>
			</button>

			<span id="title-page-block" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">
				<app-icon id="title-page-icon" data-name="Eye" class="border-end border-white pe-1"></app-icon>
				<app-icon data-name="Settings"></app-icon>
				<span id="title-page"></span>
			</span>

			<span id="title-app" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">
				<app-icon data-name="Accessibility"></app-icon>
				<span data-i18n="mainTitle"></span>
				<span class="text-primary">+</span>
			</span>
		</div>
		<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">
				<span class="visually-hidden" data-i18n="close"></span>
				<app-icon data-name="Reduire_C+"></app-icon>
		</button>
	</header>
`;

class HeaderComponent extends HTMLElement {
	static observedAttributes = ['data-display', 'data-title-page', 'data-prev-route', 'data-selected-mode'];
	closeBtn: HTMLElement | null = null;
	prevBtn: HTMLElement | null = null;
	titleApp: HTMLElement | null = null;
	titlePageBlock: HTMLElement | null = null;
	titlePage: HTMLElement | null = null;
	titlePageIcon: HTMLElement | null = null;
	display = 'primary';
	prevRoute: string = '';

	handler: any;

	constructor() {
		super();
		this.appendChild(headerLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.closeBtn = this.querySelector('#close-toolbar');
		this.prevBtn = this.querySelector('#prev-toolbar');
		this.titleApp = this.querySelector('#title-app');
		this.titlePageBlock = this.querySelector('#title-page-block');
		this.titlePage = this.querySelector('#title-page');
		this.titlePageIcon = this.querySelector('#title-page-icon');

		this.displayMode(this.display);

		this.closeBtn.addEventListener('click', this.handler);
		this.prevBtn?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.closeBtn?.removeEventListener('click', this.handler);
		this.prevBtn?.removeEventListener('click', this.handler);
	}

	private createHandler = () => {
		return (event: any) => {
			if (event.type === 'click') {
				switch (event.target) {
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

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-display' === name) {
			this.displayMode(newValue);
		}
		if ('data-title-page' === name) {
			this.titlePage!.innerText = i18nServiceInstance.getMessage(newValue);
		}
		if ('data-prev-route' === name) {
			this.prevRoute = newValue;
		}
		if ('data-selected-mode' === name) {
			this.titlePageIcon?.setAttribute('data-name', `${newValue}_border`);
		}
	}

	displayMode = (mode: string): void => {
		this.prevBtn?.classList.toggle('d-none', mode === 'primary');
		this.titlePageBlock?.classList.toggle('d-none', mode === 'primary');
		this.titleApp?.classList.toggle('d-none', mode === 'secondary');
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
					route: this.prevRoute,
					isPrev: true
				}
			});
		this.prevBtn?.dispatchEvent(clickEvent);
	}
}

customElements.define('app-header', HeaderComponent);
