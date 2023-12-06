const headerLayout: HTMLTemplateElement = document.createElement('template');
headerLayout.innerHTML = `
	<header class="d-flex justify-content-between bg-secondary px-3 py-2">
		<div class="d-flex align-items-center">
			<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="previous">
				<span class="visually-hidden" data-i18n="previous"></span>
				<app-icon data-name="Form_Chevron_left"></app-icon>
			</button>

			<span id="title-page-block" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">
				<app-icon data-size="1.5rem" data-name="Eye" class="border-end border-white"></app-icon>
				<app-icon data-size="1.5rem" data-name="Settings"></app-icon>
				<span id="title-page"></span>
			</span>

			<span id="title-app" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">
				<app-icon data-size="2rem" data-name="Accessibility"></app-icon>
				<span data-i18n="mainTitle"></span>
				<span class="text-primary">+</span>
			</span>
		</div>
		<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">
				<span class="visually-hidden" data-i18n="close"></span>
				<app-icon data-name="Form_Chevron_right"></app-icon>
		</button>
	</header>
`;

class HeaderComponent extends HTMLElement {
	static observedAttributes = ['data-mode', 'data-title-page'];
	closeBtn: HTMLElement | null = null;
	prevBtn: HTMLElement | null = null;
	titleApp: HTMLElement | null = null;
	titlePageBlock: HTMLElement | null = null;
	titlePage: HTMLElement | null = null;
	mode = 'primary';
	i18nService: any;

	constructor() {
		super();

		this.mode = this.dataset.mode || this.mode;
		this.i18nService = new i18nService();

		this.appendChild(headerLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.closeBtn = this.querySelector('#close-toolbar');
		this.prevBtn = this.querySelector('#prev-toolbar');
		this.titleApp = this.querySelector('#title-app');
		this.titlePageBlock = this.querySelector('#title-page-block');
		this.titlePage = this.querySelector('#title-page');

		this.displayMode(this.mode);

		this.closeBtn?.addEventListener('click', () => {
			console.log('click')
			let clickCloseEvent = new CustomEvent('closeEvent', { bubbles: true });
			this.closeBtn?.dispatchEvent(clickCloseEvent);
		});

		this.prevBtn?.addEventListener('click', () => {
			let clickPrevEvent = new CustomEvent('prevEvent', { bubbles: true });
			this.prevBtn?.dispatchEvent(clickPrevEvent);
		});
	}

	disconnectedCallback(): void {
		this.closeBtn?.removeEventListener('click', () => {
		});
		this.prevBtn?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-mode' === name) {
			this.displayMode(newValue)
		}
		if ('data-title-page' === name) {
			this.titlePage!.innerText = this.i18nService.getMessage(newValue);
		}
	}

	displayMode(mode: string): void {
		this.prevBtn?.classList.toggle('d-none', mode === 'primary');
		this.titlePageBlock?.classList.toggle('d-none', mode === 'primary');
		this.titleApp?.classList.toggle('d-none', mode === 'secondary');
	}
}

customElements.define('app-header', HeaderComponent);
