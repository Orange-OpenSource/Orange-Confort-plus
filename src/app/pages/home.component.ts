const homeLayout: HTMLTemplateElement = document.createElement('template');
homeLayout.innerHTML = `
<section class="bg-dark p-3 d-flex align-items-center justify-content-between">
    <div class="d-flex gap-3">
        <div class="bg-body rounded-circle">
						<app-icon data-size="5rem" data-name="Eye"></app-icon>
        </div>
        <div class="d-flex justify-content-center flex-column">
            <span data-i18n="profile"></span>
            <span class="fs-4 fw-bold text-primary">Vision +</span>
        </div>
    </div>
    <div class="d-grid gap-3 d-md-block">
        <button id="settingsBtn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="openSettingsMode">
            <span class="visually-hidden" data-i18n="openSettingsMode"></span>
						<app-icon data-name="Settings"></app-icon>
        </button>
        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">
            <span class="visually-hidden" data-i18n="pause"></span>
						<app-icon data-name="Pause"></app-icon>
        </button>
    </div>
</section>

<p>Accueil</p>

<button id="changeModeBtn" class="btn btn-primary" type="button">Changer de mode</button>`;

class HomeComponent extends HTMLElement {
	changeModeBtn: HTMLElement | null = null;
	settingsBtn: HTMLElement | null = null;

	constructor() {
		super();

		this.appendChild(homeLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.changeModeBtn = this.querySelector('#changeModeBtn');
		this.settingsBtn = this.querySelector('#settingsBtn');

		this.changeModeBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('changeModeEvent');
			template.dispatchEvent(clickEvent);
		});

		this.settingsBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('settingsEvent');
			template.dispatchEvent(clickEvent);
		});
	}
}

customElements.define('app-home', HomeComponent);
