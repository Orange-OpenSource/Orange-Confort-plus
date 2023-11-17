const headerLayout: HTMLTemplateElement = document.createElement('template');
headerLayout.innerHTML = `
	<header class="d-flex justify-content-between bg-secondary px-3 py-2">
		<div class="d-flex align-items-center">
			<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-title-i18n="previous">
				<span class="visually-hidden" data-i18n="previous"></span>
				<app-icon data-name="Form_Chevron_left"></app-icon>
			</button>
			<span id="title-app" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">
				<app-icon data-size="2rem" data-name="Accessibility"></app-icon>
				<span data-i18n="mainTitle"></span>
				<span class="text-primary">+</span>
			</span>
		</div>
		<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-title-i18n="close">
				<span class="visually-hidden" data-i18n="close"></span>
				<app-icon data-name="Form_Chevron_right"></app-icon>
		</button>
	</header>
`;

class HeaderComponent extends HTMLElement {
	closeBtn: HTMLElement | null = null;
	prevBtn: HTMLElement | null = null;
	titleApp: HTMLElement | null = null;
	mode = 'primary';

	constructor() {
		super();

		this.mode = this.dataset.mode || this.mode;

		this.appendChild(headerLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.closeBtn = this.querySelector('#close-toolbar');
		this.prevBtn = this.querySelector('#prev-toolbar');
		this.titleApp = this.querySelector('#title-app');

		this.displayMode();

		this.closeBtn?.addEventListener('click', () => {
			let clickCloseEvent = new CustomEvent('closeEvent');
			template.dispatchEvent(clickCloseEvent);
		});

		this.prevBtn?.addEventListener('click', () => {
			let clickPrevEvent = new CustomEvent('prevEvent');
			template.dispatchEvent(clickPrevEvent);
		});
	}

	disconnectedCallback(): void {
		this.closeBtn?.removeEventListener('click', () => {
		});
		this.prevBtn?.removeEventListener('click', () => {
		});
	}

	displayMode(): void {
		if (this.mode === 'primary') {
			this.prevBtn?.classList.remove('d-none');
			this.titleApp?.classList.add('d-none');
		} else {
			this.prevBtn?.classList.add('d-none');
			this.titleApp?.classList.remove('d-none');
		}
	}
}

customElements.define('app-header', HeaderComponent);
