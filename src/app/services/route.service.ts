let routeServiceIsInstantiated: boolean;

class RouteService {
	currentRoute: string;
	historyRoute: string[] = [];
	toolbar: HTMLElement = null;

	routes = [
		PAGE_HOME,
		PAGE_MODES,
		PAGE_SETTINGS,
		PAGE_EDIT_SETTING
	];

	constructor() {
		if (routeServiceIsInstantiated) {
			throw new Error('RouteService is already instantiated.');
		}

		routeServiceIsInstantiated = true;
	}

	/* Initialize components */
	initPages = (root: HTMLElement, shouldLoad = false): Promise<string> => {
		this.toolbar = root;
		return localStorageServiceInstance.getItem('current-route').then((result: any) => {
			if (this.routes.some(route => result === route)) {
				this.navigate(result, shouldLoad);
				return result;
			} else {
				this.navigate(PAGE_HOME);
				return PAGE_HOME;
			}
		});
	}

	/* Navigate to the defined route in parameter */
	navigate = (newRoute: string, shouldLoad = false): void => {
		if (shouldLoad) {
			this.loadRoute(newRoute);
			this.setCurrentRoute(newRoute);
		} else if (newRoute !== this.currentRoute) {
			this.routes.forEach((route: string) => {
				if (route === newRoute) {
					this.loadRoute(route);
				} else if (route === this.currentRoute) {
					this.toolbar.querySelector(`app-${route}`)?.remove();
				}
			});

			this.setCurrentRoute(newRoute);
		}
	}

	setHistoryAndHeader = (newRoute: string): void => {
		const header: HTMLElement = this.toolbar.querySelector('#header');

		switch (newRoute) {
			case PAGE_HOME: {
				routeServiceInstance.historyRoute = [];
				header?.setAttribute('data-display', 'primary');
				header?.setAttribute('data-page-title', '');
				header?.setAttribute('data-prev-btn', '');
				break;
			}
			case PAGE_SETTINGS: {
				routeServiceInstance.historyRoute = [PAGE_HOME];
				header?.setAttribute('data-display', 'secondary');
				header?.setAttribute('data-page-title', 'pageTitleSettings');
				header?.setAttribute('data-page-icon', 'Settings');
				header?.setAttribute('data-prev-btn', 'backToHome');
				break;
			}
			case PAGE_EDIT_SETTING: {
				routeServiceInstance.historyRoute = [PAGE_HOME, PAGE_SETTINGS];
				header?.setAttribute('data-display', 'secondary');
				header?.setAttribute('data-page-title', 'pageTitleEditSetting');
				header?.setAttribute('data-page-icon', 'Settings');
				header?.setAttribute('data-prev-btn', 'backToSettings');
				break;
			}
			case PAGE_MODES: {
				routeServiceInstance.historyRoute = [PAGE_HOME];
				header?.setAttribute('data-display', 'secondary');
				header?.setAttribute('data-page-title', 'pageTitleModes');
				header?.setAttribute('data-page-icon', '');
				header?.setAttribute('data-prev-btn', 'backToHome');
				break;
			}
		}
	}

	loadRoute = (route: string) => {
		const element = `<app-${route}></app-${route}>`;
		this.toolbar.insertAdjacentHTML('beforeend', element);
		const page = this.toolbar.querySelector(`app-${route}`);
		i18nServiceInstance.translate(page);
	}

	setCurrentRoute = (route: string) => {
		this.setHistoryAndHeader(route);
		this.currentRoute = route;
		localStorageServiceInstance.setItem('current-route', route);
	}
}
