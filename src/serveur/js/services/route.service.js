class routeService {
	_currentRoute = '';

	PAGE_HOME = 'home';
	PAGE_MODES = 'modes';
	PAGE_SETTINGS = 'settings';
	PAGE_EDIT_SETTING = 'edit-setting';

	pageHome = null;
	pageModes = null;
	pageSettings = null;
	pageEditSetting = null;

	routes = new Route(
		this.PAGE_HOME,
		'app-home',
		this.pageHome,
		[
			new Route(this.PAGE_MODES, 'app-modes', this.pageModes),
			new Route(
				this.PAGE_SETTINGS,
				'app-settings',
				this.pageSettings,
				[
					new Route(
						this.PAGE_EDIT_SETTING,
						'app-edit-setting',
						this.pageEditSetting,
						[
							new Route(this.PAGE_MODES, 'app-modes', this.pageModes),
							new Route(
								this.PAGE_SETTINGS,
								'app-settings',
								this.pageSettings,
								[
									new Route(
										this.PAGE_EDIT_SETTING,
										'app-edit-setting',
										this.pageEditSetting
									)
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

	get currentRoute() {
		return this._currentRoute;
	}

	set currentRoute(value) {
		if (value !== this.currentRoute) {
			this._currentRoute = value;
			this.emitChangeEvent(value);
		}
  }

	emitChangeEvent(value) {
    return value;
  }

	/* Initialize components */
	initPages(root) {
    const initializePage = (route) => {
      route['element'] = root.querySelector(route.component);
    };

		const initializeChildPages = (parentRoute) => {
      if (parentRoute?.children && parentRoute?.children.length > 0) {
        parentRoute?.children.forEach((childRoute) => {
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
	toggle(oldRoute, newRoute) {
		oldRoute = oldRoute ? oldRoute : '';
		newRoute = newRoute ? newRoute : this.currentRoute;

    const displayPage = (route) => {
			if (route.path === newRoute) {
				route['element'].classList.remove('d-none');
			} else if (route.path === oldRoute) {
				route['element'].classList.add('d-none');
			}
    };

		const displayChildPages = (parentRoute) => {
      if (parentRoute?.children && parentRoute?.children.length > 0) {
        parentRoute?.children.forEach((childRoute) => {
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
	navigate(newRoute) {
		this.toggle(this.currentRoute, newRoute);
	}

	/* Navigate to the parent route of the current route */
	previous(route, object) {
		route = route ? route : this.currentRoute;
		object = object ? object : this.routes;

		if (!object?.children || object?.children.length === 0 || object?.path === route) { return null;}
		if (object?.children?.some((child) => child?.path === route)) {
			this.toggle(this.currentRoute, object.path);
			return;
		}

    return object.children.map((child) => this.previous(route, child)).reduce((a, b) => a || b);
  }
}

class Route {
		constructor(path, component, pageElement, children = []) {
    this._path = path;
    this._component = component;
    this._pageElement = pageElement;
    this._children = children;
  }

	get path() {
    return this._path;
  }

  get component() {
    return this._component;
  }

  get element() {
    return this._pageElement;
  }

  set element(newElement) {
    this._pageElement = newElement;
  }

  get children() {
    return this._children;
  }

  set children(newChildren) {
    this._children = newChildren;
  }
}
