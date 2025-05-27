const homeLayout: HTMLTemplateElement = document.createElement('template');
homeLayout.innerHTML = `
<section class="bg-dark p-3 d-flex align-items-center justify-content-between">
	<h2 class="fs-6 m-0"><button id="change-mode-btn" type="button" class="btn btn-secondary bg-dark gap-2 p-0 border-0" data-i18n-title="otherUsagesModes">
		<span class="visually-hidden" data-i18n="otherUsagesModes"></span>
		<div class="sc-home__icon-mode bg-body rounded-circle text-body">
			<app-icon data-size="2.5em"></app-icon>
		</div>
		<div class="d-flex flex-column align-items-start">
			<span class="text-white" data-i18n="profile"></span>
			<span id="mode-name" class="fs-4 fw-bold text-primary"></span>
		</div>
	</button></h2>
	<div class="d-grid gap-3 d-md-block">
		<button id="pause-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">
			<span id="pause-label" class="visually-hidden" data-i18n="pause"></span>
			<app-icon id="pause-icon" data-name="Pause"></app-icon>
		</button>
	</div>
</section>

<section class="gap-3 p-3">
	<p id="pause-info" class="d-none" data-i18n="pauseInfo"></p>
	<div class="sc-home__settings gap-3">
		<app-mode></app-mode>
		<button id="settings-btn" type="button" class="btn btn-secondary">
			<app-icon class="me-1" data-name="Settings"></app-icon>
			<span data-i18n="othersSettings"></span>
		</button>
	</div>
</section>
`;

class HomeComponent extends HTMLElement {
	static observedAttributes = ['data-modes', 'data-custom'];
	changeModeBtn: HTMLButtonElement | null = null;
	settingsBtn: HTMLButtonElement | null = null;
	pauseBtn: HTMLButtonElement | null = null;
	modeName: HTMLElement | null = null;
	modeIcon: HTMLElement | null = null;
	currentMode: HTMLElement | null = null;
	currentModeSettings: string;
	pauseState = false;
	handler: any;

	constructor() {
		super();
		this.appendChild(homeLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.changeModeBtn = this.querySelector('#change-mode-btn');
		this.settingsBtn = this.querySelector('#settings-btn');
		this.pauseBtn = this.querySelector('#pause-btn');
		this.modeName = this.querySelector('#mode-name');
		this.modeIcon = this.querySelector('app-icon');
		this.currentMode = this.querySelector('app-mode');

		this.changeModeBtn?.addEventListener('click', this.handler);
		this.settingsBtn?.addEventListener('click', this.handler);
		this.pauseBtn?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.changeModeBtn?.removeEventListener('click', this.handler);
		this.settingsBtn?.removeEventListener('click', this.handler);
		this.pauseBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-modes' === name) {
			let selectedMode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
			let selectedModeName = Object.entries(JSON.parse(selectedMode))[0][0];
			this.modeName.innerText = i18nServiceInstance.getMessage(`${selectedModeName}Name`);
			this.modeIcon?.setAttribute('data-name', selectedModeName);
			this.currentModeSettings = JSON.stringify(Object.entries(JSON.parse(selectedMode))[0][1]);
			this.currentMode.setAttribute('data-settings', this.currentModeSettings);

			// When restoring from extension
			localStorageServiceInstance.getItem('is-paused').then((isPaused: any) => {
				if (isPaused) {
					this.setPauseState();
				}
			});
		}
	}

	private createHandler = () => {
		return (event: any) => {
			if (event.type === 'click') {
				switch (event.currentTarget) {
					case this.changeModeBtn:
						this.changeModeButtonEvent();
						break;
					case this.settingsBtn:
						this.settingsButtonEvent();
						break;
					case this.pauseBtn:
						this.setPauseState();
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
					route: PAGE_MODES
				}
			});
		this.changeModeBtn?.dispatchEvent(clickEvent);
	}

	private settingsButtonEvent = (): void => {
		let clickEvent = new CustomEvent('changeRoute',
			{
				bubbles: true,
				detail: {
					route: PAGE_SETTINGS
				}
			});
		this.settingsBtn?.dispatchEvent(clickEvent);
	}

	private setPauseState = (): void => {
		this.pauseState = !this.pauseState;
		this.querySelector('#pause-icon').setAttribute('data-name', this.pauseState ? 'Play' : 'Pause');
		localStorageServiceInstance.setItem('is-paused', this.pauseState);
		if (this.pauseState) {
			pauseServiceInstance.pauseSettings(this.currentModeSettings);
			this.settingsBtn.disabled = true;
			this.changeModeBtn.disabled = true;
			this.pauseBtn.setAttribute('title', i18nServiceInstance.getMessage('play'));
			(this.pauseBtn.querySelector('#pause-label') as HTMLSpanElement).innerText = i18nServiceInstance.getMessage('play');
			this.querySelector('#pause-info').classList.remove('d-none');
			this.currentMode.setAttribute('data-pause', 'true');
		} else {
			pauseServiceInstance.playSettings();
			this.settingsBtn.disabled = false;
			this.changeModeBtn.disabled = false;
			this.pauseBtn.setAttribute('title', i18nServiceInstance.getMessage('pause'));
			(this.pauseBtn.querySelector('#pause-label') as HTMLSpanElement).innerText = i18nServiceInstance.getMessage('pause');
			this.querySelector('#pause-info').classList.add('d-none');
			this.currentMode.setAttribute('data-pause', 'false');
		}
	}
}

customElements.define('app-home', HomeComponent);
