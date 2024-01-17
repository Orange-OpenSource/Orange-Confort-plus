let routeServiceIsInstantiated: boolean;

class RouteService {
	currentRoute: string;

	PAGE_HOME = 'home';
	PAGE_MODES = 'modes';
	PAGE_SETTINGS = 'settings';
	PAGE_EDIT_SETTING = 'edit-setting';

	homeElement: HTMLElement = null;
	modeElement: HTMLElement = null;
	settingsElement: HTMLElement = null;
	editSettingElement: HTMLElement = null;

	routes = [
		{ path: this.PAGE_HOME, selector: 'app-home', element: this.homeElement },
		{ path: this.PAGE_MODES, selector: 'app-modes', element: this.modeElement },
		{ path: this.PAGE_SETTINGS, selector: 'app-settings', element: this.settingsElement },
		{ path: this.PAGE_EDIT_SETTING, selector: 'app-edit-setting', element: this.editSettingElement },
	];

	constructor() {
		if (routeServiceIsInstantiated) {
			throw new Error('Le routeur est déjà instancié.');
		}

		routeServiceIsInstantiated = true;
	}

	/* Initialize components */
	initPages(root: HTMLElement): void {
		this.routes.forEach((route: any) => {
			route.element = root.querySelector(route.selector);
		});

		this.navigate(this.PAGE_HOME);
	}

	/* Navigate to the defined route in parameter */
	navigate(newRoute: string): void {
		this.routes.forEach((route: any) => {
			if (route.path === this.currentRoute) {
				route.element.classList.add('d-none');
			} else if (route.path === newRoute) {
				route.element.classList.remove('d-none');
			}
		});

		this.currentRoute = newRoute;
	}
}
