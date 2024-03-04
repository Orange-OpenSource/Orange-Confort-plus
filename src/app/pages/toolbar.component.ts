const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header id="header"></app-header>

<app-home class="d-none"></app-home>
<app-modes class="d-none"></app-modes>
<app-settings class="d-none"></app-settings>
<app-edit-setting class="d-none"></app-edit-setting>
`;

class ToolbarComponent extends HTMLElement {
	header: HTMLElement | null = null;
	home: HTMLElement | null = null;
	modes: HTMLElement | null = null;
	settings: HTMLElement | null = null;
	historyRoute: string[] = [];
	json: ModeOfUseModel;
	defaultJson: ModeOfUseModel;

	handler: any;

	constructor() {
		super();
		this.appendChild(tmplToolbar.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.header = this.querySelector('#header');
		this.home = this.querySelector('app-home');
		this.modes = this.querySelector('app-modes');
		this.settings = this.querySelector('app-settings');

		filesServiceInstance.getModesOfUse().then((result: any) => {
			this.defaultJson = result;

			localStorageServiceInstance.getItem(jsonName).then((result: any) => {
				if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
					this.json = result;
				} else {
					this.json = this.defaultJson;
					localStorageServiceInstance.setItem(jsonName, this.defaultJson);
				}
				this.setCurrentMode();
			});
		});

		window.addEventListener(`storage-${jsonName}`, this.handler);

		routeServiceInstance.initPages(this);

		this.addEventListener('changeRoute', this.handler);
	}

	setHeaderDisplay = (page: string): void => {
		switch (page) {
			case routeServiceInstance.PAGE_HOME: {
				this.header?.setAttribute('data-display', 'primary');
				this.header?.setAttribute('data-page-title', '');
				break;
			}
			case routeServiceInstance.PAGE_MODES: {
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-page-title', 'pageTitleModes');
				this.header?.setAttribute('data-page-icon', '');
				break;
			}
			case routeServiceInstance.PAGE_SETTINGS: {
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-page-title', 'pageTitleSettings');
				this.header?.setAttribute('data-page-icon', 'Settings');
				break;
			}
			case routeServiceInstance.PAGE_EDIT_SETTING: {
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-page-title', 'pageTitleEditSetting');
				this.header?.setAttribute('data-page-icon', 'Settings');
				break;
			}
		}
	}

	setCurrentMode = (): void => {
		if (this.json.selectedMode) {
			this.json.modes.forEach((mode: any) => {
				if (Object.entries(mode)[0][0] === this.json.selectedMode) {
					this.header?.setAttribute('data-selected-mode', this.json.selectedMode);
					this.home?.setAttribute('data-mode', JSON.stringify(mode));
					this.settings?.setAttribute('data-mode', JSON.stringify(mode));
					this.modes?.setAttribute('data-list-mode', JSON.stringify(this.json));
				}
			});
		} else {
			routeServiceInstance.navigate(routeServiceInstance.PAGE_MODES);
		}

		this.setCustomState();
	}

	setCustomState = (): void => {
		let defaultMode: any;
		let currentMode: any;
		this.defaultJson.modes.forEach((mode: any) => {
			if (Object.keys(mode)[0] === this.json.selectedMode) {
				defaultMode = JSON.stringify(mode);
			}
		});
		this.json.modes.forEach((mode: any) => {
			if (Object.keys(mode)[0] === this.json.selectedMode) {
				currentMode = JSON.stringify(mode);
			}
		});
		const isCustomMode = !(currentMode === defaultMode);
		this.home?.setAttribute('data-custom', isCustomMode.toString());
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'changeRoute':
					this.changeRouteEvent(event);
					break;
				case `storage-${jsonName}`:
					this.storageEvent();
					break;
			}
		}
	}

	private changeRouteEvent = (event: Event): void => {
		if ((event as CustomEvent).detail.isPrev) {
			this.historyRoute.pop();
		} else {
			this.historyRoute.push(routeServiceInstance.currentRoute);
		}

		/* If editing setting */
		if ((event as CustomEvent).detail.setting) {
			this.json.selectedMode = (event as CustomEvent).detail.mode;
			this.setCurrentMode();
		}

		routeServiceInstance.navigate((event as CustomEvent).detail.route);
		this.setHeaderDisplay((event as CustomEvent).detail.route);
		this.header?.focus();
		this.header?.setAttribute('data-prev-route', this.historyRoute[this.historyRoute.length - 1]);
	}

	private storageEvent = (): void => {
		localStorageServiceInstance.getItem(jsonName).then((result: any) => {
			this.json = result;
			this.setCurrentMode();
		});
	}
}

customElements.define('app-toolbar', ToolbarComponent);
