const homeLayout: HTMLTemplateElement = document.createElement('template');
homeLayout.innerHTML = `
<section class="bg-dark p-3 d-flex align-items-center justify-content-between">
    <div class="d-flex gap-2">
        <div class="bg-body rounded-circle">
						<app-icon data-size="5rem"></app-icon>
        </div>
        <div class="d-flex justify-content-center flex-column">
            <span class="text-white" data-i18n="profile"></span>
            <span id="mode-name" class="fs-4 fw-bold text-primary"></span>
        </div>
    </div>
    <div class="d-grid gap-3 d-md-block">
        <button id="settings-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="openSettingsMode">
            <span class="visually-hidden" data-i18n="openSettingsMode"></span>
						<app-icon data-name="Settings"></app-icon>
        </button>
        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">
            <span class="visually-hidden" data-i18n="pause"></span>
						<app-icon data-name="Pause"></app-icon>
        </button>
    </div>
</section>

<section class="p-3">
	<p>Zone d'affichage des réglages du mode en cours</p>

	<div class="d-grid">
		<button id="change-mode-btn" class="btn btn-secondary" type="button" data-i18n="otherModes"></button>
	</div>
</section>
`;

class HomeComponent extends HTMLElement {
	static observedAttributes = ['data-mode'];
	changeModeBtn: HTMLElement | null = null;
	settingsBtn: HTMLElement | null = null;
	routeService: any;
	modeName: HTMLElement | null = null;
	modeIcon: HTMLElement | null = null;
	i18nService: any;

	constructor() {
		super();

		// @ts-ignore
		this.i18nService = new i18nService();
		// @todo Utiliser singleton pour routeService pour éviter plusieurs instances
		// @ts-ignore
		this.routeService = new routeService();

		this.appendChild(homeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.changeModeBtn = this.querySelector('#change-mode-btn');
		this.settingsBtn = this.querySelector('#settings-btn');
		this.modeName = this.querySelector('#mode-name');
		this.modeIcon = this.querySelector('app-icon');

		this.changeModeBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('changeRoute',
				{
					bubbles: true,
					detail: {
						route: this.routeService.PAGE_MODES
					}
				});
			this.changeModeBtn?.dispatchEvent(clickEvent);
		});

		this.settingsBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('changeRoute',
				{
					bubbles: true,
					detail: {
						route: this.routeService.PAGE_SETTINGS
					}
				});
			this.settingsBtn?.dispatchEvent(clickEvent);
		});
	}

	disconnectedCallback(): void {
		this.changeModeBtn?.removeEventListener('click', () => {
		});
		this.settingsBtn?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-mode' === name) {
			this.modeName!.innerText = this.i18nService.getMessage(`${JSON.parse(newValue)[0]}Name`);
			this.modeIcon!.dataset.name = JSON.parse(newValue)[0];
		}
	}
}

customElements.define('app-home', HomeComponent);