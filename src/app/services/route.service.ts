let routeServiceIsInstantiated: boolean;

class RouteService {
	currentRoute: string;
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
	initPages = (root: HTMLElement): void => {
		this.toolbar = root;
		localStorageServiceInstance.getItem('current-route').then((result: any) => {
			if (this.routes.some(route => result === route)) {
				this.navigate(result);
			} else {
				this.navigate(PAGE_HOME);
			}
		});
	}

	/* Navigate to the defined route in parameter */
	navigate(newRoute: string): void {
		this.routes.forEach((route: string) => {
			if (route === newRoute) {
				const element = `<app-${route}></app-${route}>`;
				this.toolbar.insertAdjacentHTML('beforeend', element);
				const page = this.toolbar.querySelector(`app-${route}`);
				i18nServiceInstance.translate(page);
			} else if (route === this.currentRoute) {
				this.toolbar.querySelector(`app-${route}`)?.remove();
			}
		});

		this.currentRoute = newRoute;
		localStorageServiceInstance.setItem('current-route', newRoute);
	}
}
