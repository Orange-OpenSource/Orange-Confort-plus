const homeLayout: HTMLTemplateElement = document.createElement('template');
homeLayout.innerHTML = `
<section class="bg-dark p-3 d-flex align-items-center justify-content-between">
    <div class="d-flex gap-2">
        <div class="sc-home__icon-mode bg-body rounded-circle">
						<app-icon data-size="5em"></app-icon>
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
				<button id="pause-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">
            <span id="pause-label" class="visually-hidden" data-i18n="pause"></span>
						<app-icon id="pause-icon" data-name="Pause"></app-icon>
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
	pauseBtn: HTMLElement | null = null;
	modeName: HTMLElement | null = null;
	modeIcon: HTMLElement | null = null;
	currentMode: HTMLElement | null = null;
	i18nService: any;
	routeService: any;
	settings: any[] = [];
	pauseState = false;

	constructor() {
		super();
		this.appendChild(homeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.changeModeBtn = this.querySelector('#change-mode-btn');
		this.settingsBtn = this.querySelector('#settings-btn');
		this.pauseBtn = this.querySelector('#pause-btn');
		this.modeName = this.querySelector('#mode-name');
		this.modeIcon = this.querySelector('app-icon');
		this.currentMode = this.querySelector('app-mode');

		this.changeModeBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('changeRoute',
				{
					bubbles: true,
					detail: {
						route: routeServiceInstance.PAGE_MODES
					}
				});
			this.changeModeBtn?.dispatchEvent(clickEvent);
		});

		this.settingsBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('changeRoute',
				{
					bubbles: true,
					detail: {
						route: routeServiceInstance.PAGE_SETTINGS
					}
				});
			this.settingsBtn?.dispatchEvent(clickEvent);
		});

		this.pauseBtn?.addEventListener('click', () => {
			this.pauseState = !this.pauseState;
			let stateName = this.pauseState ? 'Pause' : 'Play';
			this.pauseBtn.setAttribute('data-i18n-title', stateName.toLowerCase());
			this.querySelector('#pause-label').setAttribute('data-i18n', stateName.toLowerCase());
			this.querySelector('#pause-icon').setAttribute('data-icon', stateName);

			let clickEvent = new CustomEvent('pause',
				{
					bubbles: true,
					detail: {
						pause: this.pauseState
					}
				});
			this.pauseBtn?.dispatchEvent(clickEvent);

			// PAUSE
			// Récupère l'actuel JSON et le garde bien au chaud
			// Remplace le JSON actuel pour tout mettre en valeur par défaut
			// Mettre en disabled tous les réglages

			// PLAY
			// Remet en place l'ancien JSON
			// Enlève l'état disabled des réglages

			// Si changement de mode, faire un play
		});
	}

	disconnectedCallback(): void {
		this.changeModeBtn?.removeEventListener('click', () => {
		});
		this.settingsBtn?.removeEventListener('click', () => {
		});
		this.pauseBtn?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-mode' === name) {
			this.modeName.innerText = i18nServiceInstance.getMessage(`${Object.entries(JSON.parse(newValue))[0][0]}Name`);
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
