const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header id="header"></app-header>
`;

class ToolbarComponent extends HTMLElement {
	header: HTMLElement | null = null;
	json: ModeOfUseModel;
	defaultJson: ModeOfUseModel;
	handler: any;
	state: string;

	constructor() {
		super();
		this.appendChild(tmplToolbar.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.header = this.querySelector('#header');
		this.state = (this.parentNode.parentNode as ShadowRoot).host.getAttribute('data-state');

		/* JSON retrieval and initialisation */
		filesServiceInstance.getJSONFile('modes-of-use').then((result: any) => {
			this.defaultJson = result;

			localStorageServiceInstance.getItem(JSON_NAME).then((result: any) => {
				if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
					this.json = result;
				} else {
					this.json = this.defaultJson;
					localStorageServiceInstance.setItem(JSON_NAME, this.defaultJson);
				}

				this.initCurrentMode(this.state === 'restored');
			});
		});

		window.addEventListener(`storage-${JSON_NAME}`, this.handler);

		this.addEventListener('changeRoute', this.handler);
	}

	initCurrentMode = (shouldLoad = false): void => {
		if (this.json.selectedMode) {
			routeServiceInstance.initPages(this, shouldLoad).then((result: string) => {
				if (result) {
					this.setCurrentPage(result);
				}
			});
			// this.setCustomState();
		} else {
			routeServiceInstance.navigate(PAGE_MODES);
		}
	}

	setCurrentPage = (page: string): void => {
		this.header?.setAttribute('data-selected-mode', this.json.selectedMode);
		setTimeout(() => {
			let currentPage = this.querySelector(`app-${page}`);
			if (currentPage) {
				currentPage?.setAttribute('data-modes', JSON.stringify(this.json));
			}
		})
	}

	/* setCustomState = (): void => {
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
	} */

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'changeRoute':
					this.changeRouteEvent(event);
					break;
				case `storage-${JSON_NAME}`:
					this.storageEvent();
					break;
			}
		}
	}

	private changeRouteEvent = (event: Event): void => {
		let newRoute = (event as CustomEvent).detail.route;
		this.header?.focus();

		/* If mode is changed */
		if ((event as CustomEvent).detail.mode) {
			this.json.selectedMode = (event as CustomEvent).detail.mode;
			(this.querySelector(`app-${PAGE_HOME}`) as HTMLElement)?.focus();
		}

		routeServiceInstance.navigate(newRoute);
		this.setCurrentPage(newRoute);

		if ((event as CustomEvent).detail.setting) {
			const editSettingElement: HTMLElement = (this.querySelector(`app-${PAGE_EDIT_SETTING}`) as HTMLElement);
			editSettingElement?.setAttribute('data-setting', (event as CustomEvent).detail.setting);
		}
	}

	private storageEvent = (): void => {
		localStorageServiceInstance.getItem(JSON_NAME).then((result: any) => {
			this.json = result;
			this.setCurrentPage(routeServiceInstance.currentRoute);
			// this.setCustomState();
		});
	}
}

customElements.define('app-toolbar', ToolbarComponent);
