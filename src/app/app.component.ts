const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
<div data-bs-theme="light">
	<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">
		<span class="visually-hidden" data-i18n="mainButton"></span>
		<app-icon data-size="3rem" data-name="Accessibility"></app-icon>
	</button>
	<app-toolbar class="bg-body position-fixed top-0 end-0" id="toolbar"></app-toolbar>
</div>
`;

class AppComponent extends HTMLElement {
	private openConfortPlus: boolean = false;
	confortPlusBtn: HTMLElement | undefined = null;
	confortPlusToolbar: HTMLElement | undefined = null;
	i18nService: any;
	pathService: any;
	iconsService: any;
	path: string | undefined;
	link: HTMLLinkElement;

	constructor() {
		super();

		// @ts-ignore
		this.pathService = new PathService();
		this.path = this.pathService.path;
		// @todo Utiliser singleton pour I18nService pour éviter plusieurs instances
		// @ts-ignore
		this.i18nService = new I18nService();
		// @ts-ignore
		this.iconsService = new iconsService();

		this.attachShadow({ mode: 'open' });
		this?.shadowRoot?.appendChild(template.content.cloneNode(true));

		this.link = document.createElement('link');
		this.link.rel = 'stylesheet';
		this.link.href = `${this.path}css/styles.min.css`;
		this.shadowRoot?.appendChild(this.link);
	}

	connectedCallback(): void {
		customElements.upgrade(this);

		this.iconsService.loadSprite(this.shadowRoot);
		// @note Tick until everything loaded
		setTimeout(() => {
			this.i18nService.translate(this.shadowRoot);
		});

		this.confortPlusBtn = this?.shadowRoot?.getElementById('confort');
		this.confortPlusToolbar = this?.shadowRoot?.getElementById('toolbar');
		this.confortPlusToolbar.style.transform = 'translateX(100%)';
		if (!this.confortPlusBtn || !this.confortPlusToolbar) {
			return;
		}

		this.confortPlusToolbar.addEventListener('closeEvent', this.toggleToolbar);
		this.confortPlusBtn.addEventListener('click', this.toggleToolbar);
	}

	disconnectedCallback(): void {
		this.confortPlusToolbar?.removeEventListener('closeEvent', this.toggleToolbar);
		this.confortPlusBtn?.removeEventListener('click', this.toggleToolbar);
	}

	toggleToolbar = (): void => {
		this.openConfortPlus = !this.openConfortPlus;
		// @todo Voir pour utiliser Web Animation API avec la méthode animate()
		if (this.openConfortPlus) {
			this.confortPlusToolbar.style.removeProperty('transform');
		} else {
			this.confortPlusToolbar.style.transform = 'translateX(100%)';
		}
	}
}

customElements.define('app-root', AppComponent);
