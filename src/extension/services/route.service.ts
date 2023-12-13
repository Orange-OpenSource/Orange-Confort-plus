class routeService {
	_currentRoute = '';

	// @todo A-t-on besoin de ces constantes ?
	// LEs composants sont passés en dur, eux :)
	PAGE_HOME = 'home';
	PAGE_MODES = 'modes';
	PAGE_SETTINGS = 'settings';
	PAGE_EDIT_SETTING = 'edit-setting';

	routes: Route = new Route(this.PAGE_HOME, 'app-home',
		[
			new Route(this.PAGE_MODES, 'app-modes'),
			new Route(this.PAGE_SETTINGS, 'app-settings',
				[
					new Route(this.PAGE_EDIT_SETTING, 'app-edit-setting',
						[
							new Route(this.PAGE_MODES, 'app-modes'),
							new Route(this.PAGE_SETTINGS, 'app-settings',
								[
									new Route(this.PAGE_EDIT_SETTING, 'app-edit-setting')
								]
							)
						]
					)
				]
			)
		]
	);

	constructor() {
		this._currentRoute = this.PAGE_HOME;
	}

	get currentRoute(): string {
		return this._currentRoute;
	}

	set currentRoute(value: string) {
		if (value !== this.currentRoute) {
			this._currentRoute = value;
			this.emitChangeEvent(value);
		}
	}

	// @todo ça fait vraiment quelque chose, ça ?
	// Si non, les getter / setter au-dessus ne servent à rien non plus
	emitChangeEvent(value: string): string {
		return value;
	}

	/* Initialize components */
	initPages(root: ShadowRoot): void {
		const initializePage = (route: Route): void => {
			// @note : ça m’intrigue, est-ce vraiment nécessaire ?
			route.element = root.querySelector(route.component);
		};

		const initializeChildPages = (parentRoute: Route): void => {
			// @note Ça me paraît bien compliqué
			if (parentRoute?.children && parentRoute?.children.length > 0) {
				parentRoute?.children.forEach(childRoute => {
					initializePage(childRoute);
					initializeChildPages(childRoute);
				});
			}
		};

		initializePage(this.routes);
		initializeChildPages(this.routes);
		this.toggle(null, this.currentRoute);
	}

	/* Show the current component and hide other components */
	toggle(oldRoute: string = '', newRoute: string = this.currentRoute): void {
		const displayPage = (route: Route): void => {
			if (route.path === newRoute) {
				(route.element as HTMLElement).classList.remove('d-none');
			} else if (route.path === oldRoute) {
				(route.element as HTMLElement).classList.add('d-none');
			}
		};

		// @note Même chose sur la complexité
		const displayChildPages = (parentRoute: Route): void => {
			if (parentRoute?.children && parentRoute?.children.length > 0) {
				parentRoute?.children.forEach((childRoute: Route): void => {
					displayPage(childRoute);
					displayChildPages(childRoute);
				});
			}
		};

		displayPage(this.routes);
		displayChildPages(this.routes);
		this.currentRoute = newRoute;
	}

	/* Navigate to the defined route in parameter */
	navigate(newRoute: string): void {
		this.toggle(this.currentRoute, newRoute);
	}

	/* Navigate to the parent route of the current route */
	previous(route: string = this.currentRoute, object: Route = this.routes): any {
		// @todo On a un vrai problème ici : selon le cas, la méthode renvoie un résultat différent :/
		if (!object?.children || object?.children.length === 0 || object?.path === route) { return null; }
		if (object?.children?.some((child) => child?.path === route)) {
			this.toggle(this.currentRoute, object.path);
			return;
		}

		return object.children.map((child: any) => this.previous(route, child)).reduce((a: any, b: any) => a || b);
	}
}

// @todo La classe n’apporte pas grand chose, finalement…
class Route {
	path: string;
	component: string;
	children: Route[];
	element: HTMLElement;

	constructor(path: string, component: string, children: Route[] = []) {
		this.path = path;
		this.component = component;
		this.children = children;
	}
}
