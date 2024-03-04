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
    </div>
</section>

<section class="sc-home__settings gap-3 p-3">
	<app-mode></app-mode>
	<div class="d-flex">
		<button id="change-mode-btn" class="btn btn-link" type="button" data-i18n="otherModes"></button>
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

	handler: any;

	constructor() {
		super();
		this.appendChild(homeLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.changeModeBtn = this.querySelector('#change-mode-btn');
		this.settingsBtn = this.querySelector('#settings-btn');
		this.modeName = this.querySelector('#mode-name');
		this.modeIcon = this.querySelector('app-icon');
		this.currentMode = this.querySelector('app-mode');

		this.changeModeBtn?.addEventListener('click', this.handler);
		this.settingsBtn?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.changeModeBtn?.removeEventListener('click', this.handler);
		this.settingsBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-mode' === name) {
			this.modeName.innerText = i18nServiceInstance.getMessage(`${Object.entries(JSON.parse(newValue))[0][0]}Name`);
			this.currentMode.setAttribute('data-settings', JSON.stringify(Object.entries(JSON.parse(newValue))[0][1]));
			this.modeIcon?.setAttribute('data-name', Object.entries(JSON.parse(newValue))[0][0]);
		}

		/* @todo MVP: ne pas afficher l'astérix si un mode d'usage est personnalisé
		 * À enlever lorsque les tests seront terminés.
		 *
		 * if ('data-custom' === name) {
		 *		const modeName = this.modeName.textContent;
		 * 	  this.modeName.innerText = newValue === 'true' ? `${modeName}*` : `${modeName}`;
		 * }
		 */
	}

	private createHandler = () => {
		return (event: any) => {
			if (event.type === 'click') {
				switch (event.target) {
					case this.changeModeBtn:
						this.changeModeButtonEvent();
						break;
					case this.settingsBtn:
						this.settingsButtonEvent();
						break;
				}
			}
		}
	}

	private changeModeButtonEvent = (): void => {
		let clickEvent = new CustomEvent('changeRoute',
			{
				bubbles: true,
				detail: {
					route: routeServiceInstance.PAGE_MODES
				}
			});
		this.changeModeBtn?.dispatchEvent(clickEvent);
	}

	private settingsButtonEvent = (): void => {
		let clickEvent = new CustomEvent('changeRoute',
			{
				bubbles: true,
				detail: {
					route: routeServiceInstance.PAGE_SETTINGS
				}
			});
		this.settingsBtn?.dispatchEvent(clickEvent);
	}
}

customElements.define('app-home', HomeComponent);
