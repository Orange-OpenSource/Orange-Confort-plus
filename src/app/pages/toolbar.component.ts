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
		document.addEventListener('keydown', this.handler);

		this.addEventListener('changeRoute', this.handler);
	}

	disconnectedCallback(): void {
		window.removeEventListener(`storage-${JSON_NAME}`, this.handler);
		document.removeEventListener('keydown', this.handler);
		this.removeEventListener('changeRoute', this.handler);
	}

	initCurrentMode = (shouldLoad = false): void => {
		if (this.json.selectedMode) {
			routeServiceInstance.initPages(this, shouldLoad).then((result: string) => {
				if (result) {
					this.setCurrentPage(result);
				}
			});
		} else {
			routeServiceInstance.navigate(PAGE_MODES, false, this);
			setTimeout(() => {
				this.querySelector('app-modes')?.setAttribute('data-modes', JSON.stringify(this.json));
			});
		}
	}

	setCurrentPage = (page: string): void => {
		setTimeout(() => {
			let currentPage = this.querySelector(`app-${page}`);
			if (currentPage) {
				currentPage?.setAttribute('data-modes', JSON.stringify(this.json));

				if (page === PAGE_EDIT_SETTING) {
					localStorageServiceInstance.getItem('current-setting').then((result: any) => {
						if (result) {
							const editSettingElement: HTMLElement = (this.querySelector(`app-${PAGE_EDIT_SETTING}`) as HTMLElement);
							editSettingElement?.setAttribute('data-setting', result);
						}
					});
				}
			}
		});
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'changeRoute':
					this.changeRouteEvent(event);
					break;
				case `storage-${JSON_NAME}`:
					this.storageEvent();
					break;
				case 'keydown':
					if (event.key === 'Escape' || event.key === 'Esc') {
						ESC_HANDLING_SETTINGS.forEach(setting => {
							const settingElement = this.querySelector(`app-${setting}`);
							this.resetSetting(settingElement, setting);
						});
					}
					break;
			}
		}
	}

	private resetSetting = (settingElement: Element, name: string): void => {
		const values = settingElement?.getAttribute('data-values');

		try {
			let valuesAsJSON = JSON.parse(values);
			valuesAsJSON.valueSelected = 0;
			settingElement?.setAttribute('data-values', JSON.stringify(valuesAsJSON));
			settingElement?.querySelector('app-btn-setting')?.setAttribute('data-active-value', '0');
			settingElement?.querySelector('app-btn-modal')?.setAttribute('data-value', i18nServiceInstance.getMessage(DEFAULT_VALUE));
		} catch (error) {
			console.error(`Impossible de remettre à zéro la valeur sélectionnée : ${error}`);
		}
	}

	private changeRouteEvent = (event: Event): void => {
		let newRoute = (event as CustomEvent).detail.route;
		this.header?.focus();

		if ((event as CustomEvent).detail.mode) {
			this.json.selectedMode = (event as CustomEvent).detail.mode;
			(this.querySelector(`app-${PAGE_HOME}`) as HTMLElement)?.focus();
		}

		routeServiceInstance.navigate(newRoute, false, this);
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
		});
	}
}

customElements.define('app-toolbar', ToolbarComponent);
