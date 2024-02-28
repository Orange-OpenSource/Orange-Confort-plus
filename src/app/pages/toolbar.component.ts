const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header id="header"></app-header>
`;

class ToolbarComponent extends HTMLElement {
	header: HTMLElement | null = null;
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

		/* JSON retrieval and initialisation */
		filesServiceInstance.getJSONFile('modes-of-use').then((result: any) => {
			this.defaultJson = result;

			localStorageServiceInstance.getItem(jsonName).then((result: any) => {
				if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
					this.json = result;
				} else {
					this.json = this.defaultJson;
					localStorageServiceInstance.setItem(jsonName, this.defaultJson);
				}

				this.initCurrentMode();
			});
		});

		window.addEventListener(`storage-${jsonName}`, this.handler);

		this.addEventListener('changeRoute', this.handler);
	}

	initCurrentMode = (): void => {
		if (this.json.selectedMode) {
			routeServiceInstance.initPages(this);
			this.setNewPage(PAGE_HOME);
			this.setCustomState();
		} else {
			routeServiceInstance.navigate(PAGE_MODES);
			this.setNewPage(PAGE_MODES);
		}
	}

	setCurrentPage = (page: string): void => {
		let currentPage = this.querySelector(`app-${page}`);
		currentPage?.setAttribute('data-modes', JSON.stringify(this.json));
		i18nServiceInstance.translate(currentPage);
	}

	setNewPage = (page: string): void => {
		switch (page) {
			case PAGE_HOME: {
				this.setCurrentPage(PAGE_HOME);
				this.header?.setAttribute('data-display', 'primary');
				this.header?.setAttribute('data-page-title', '');
				break;
			}
			case PAGE_MODES: {
				this.setCurrentPage(PAGE_MODES);
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-page-title', 'pageTitleModes');
				this.header?.setAttribute('data-page-icon', '');
				break;
			}
			case PAGE_SETTINGS: {
				this.setCurrentPage(PAGE_SETTINGS);
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-page-title', 'pageTitleSettings');
				this.header?.setAttribute('data-page-icon', 'Settings');
				break;
			}
			case PAGE_EDIT_SETTING: {
				this.header?.setAttribute('data-display', 'secondary');
				this.header?.setAttribute('data-page-title', 'pageTitleEditSetting');
				this.header?.setAttribute('data-page-icon', 'Settings');
				break;
			}
		}
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
		this.querySelector(`app-${PAGE_HOME}`)?.setAttribute('data-custom', isCustomMode.toString());
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
		let newRoute = (event as CustomEvent).detail.route;

		/* Creating a tree structure to get the previous route */
		if ((event as CustomEvent).detail.isPrev) {
			this.historyRoute.pop();
		} else {
			this.historyRoute.push(routeServiceInstance.currentRoute);
		}
		this.header?.focus();
		this.header?.setAttribute('data-prev-route', this.historyRoute[this.historyRoute.length - 1]);

		/* If mode is changed */
		if ((event as CustomEvent).detail.setting) {
			this.json.selectedMode = (event as CustomEvent).detail.mode;
			(this.querySelector(`app-${PAGE_HOME}`) as HTMLElement)?.focus();
		}

		routeServiceInstance.navigate(newRoute);
		this.setNewPage(newRoute);
	}

	private storageEvent = (): void => {
		localStorageServiceInstance.getItem(jsonName).then((result: any) => {
			this.json = result;
			this.setCurrentPage(routeServiceInstance.currentRoute);
			this.setCustomState();
		});
	}
}

customElements.define('app-toolbar', ToolbarComponent);
