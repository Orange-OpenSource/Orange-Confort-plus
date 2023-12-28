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

<section class="sc-home__settings gap-3 p-3">
	<app-mode></app-mode>
	<div class="d-grid">
		<button id="change-mode-btn" class="btn btn-secondary" type="button" data-i18n="otherModes"></button>
	</div>
</section>
`;

class HomeComponent extends HTMLElement {
	static observedAttributes = ['data-mode', 'data-custom'];
	changeModeBtn: HTMLElement | null = null;
	settingsBtn: HTMLElement | null = null;
	modeName: HTMLElement | null = null;
	modeIcon: HTMLElement | null = null;
	currentMode: HTMLElement | null = null;
	i18nService: any;
	routeService: any;
	settings: any[] = [];

	constructor() {
		super();

		// @ts-ignore
		this.i18nService = new I18nService();
		// @todo Utiliser singleton pour RouteService pour éviter plusieurs instances
		// @ts-ignore
		this.routeService = new RouteService();

		this.appendChild(homeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.changeModeBtn = this.querySelector('#change-mode-btn');
		this.settingsBtn = this.querySelector('#settings-btn');
		this.modeName = this.querySelector('#mode-name');
		this.modeIcon = this.querySelector('app-icon');
		this.currentMode = this.querySelector('app-mode');

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
			this.modeName.innerText = this.i18nService.getMessage(`${Object.entries(JSON.parse(newValue))[0][0]}Name`);
			this.currentMode.setAttribute('data-settings', JSON.stringify(Object.entries(JSON.parse(newValue))[0][1]));
			this.modeIcon?.setAttribute('data-name', Object.entries(JSON.parse(newValue))[0][0]);
		}
		if ('data-custom' === name) {
			const modeName = this.modeName.innerText;
			this.modeName.innerText = newValue === 'true' ? `${modeName}*` : `${modeName}`;
		}
	}
}

customElements.define('app-home', HomeComponent);
