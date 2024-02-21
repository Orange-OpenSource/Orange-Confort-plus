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
	initPages(root: HTMLElement): void {
		this.toolbar = root;
		this.navigate(PAGE_HOME);
	}

	/* Navigate to the defined route in parameter */
	navigate(newRoute: string): void {
		this.routes.forEach((route: string) => {
			if (route === newRoute) {
				const element = `<app-${route}></app-${route}>`;
				this.toolbar.insertAdjacentHTML("beforeend", element);
			} else if (route === this.currentRoute) {
				this.toolbar.querySelector(`app-${route}`)?.remove();
			}
		});

		this.currentRoute = newRoute;
	}
}
