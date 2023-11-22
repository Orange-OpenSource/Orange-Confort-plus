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

	routes =
	{
		path: this.PAGE_HOME,
		component: 'app-home',
		element: this.pageHome,
		children: [
			{
				path: this.PAGE_MODES,
				component: 'app-modes',
				element: this.pageModes,
			},
			{
				path: this.PAGE_SETTINGS,
				component: 'app-settings',
				element: this.pageSettings,
				children: [
					{
						path: this.PAGE_EDIT_SETTING,
						component: 'app-edit-setting',
						element: this.pageEditSetting
					}
				]
			}
		]
	};

	constructor() {
		this._currentRoute = this.PAGE_HOME;
	}

	get currentRoute() {
		return this._currentRoute;
	}

	set currentRoute(value) {
    this._currentRoute = value;
    this.emitChangeEvent(value);
  }

	emitChangeEventvalue(value) {
    return value;
  }

	initPages(root) {
		/* @todo utiliser l'objet routes pour initier les components des pages. */
		this.pageHome = root.querySelector('app-home');
		this.pageModes = root.querySelector('app-modes');
		this.pageSettings = root.querySelector('app-settings');
		this.pageEditSetting = root.querySelector('app-edit-settings');
		this.toggle(this.currentRoute);
	}

	/* Show the current component and hide other components */
	toggle(route) {
		/* @todo utiliser l'objet routes pour gérer le toggle. */
		switch (route) {
			case this.PAGE_HOME: {
				this.pageHome?.classList.remove('d-none');
				this.pageModes?.classList.add('d-none');
				this.pageSettings?.classList.add('d-none');
				this.pageEditSetting?.classList.add('d-none');
				break;
			}
			case this.PAGE_MODES: {
				this.pageModes?.classList.remove('d-none');
				this.pageHome?.classList.add('d-none');
				this.pageSettings?.classList.add('d-none');
				this.pageEditSetting?.classList.add('d-none');
				break;
			}
			case this.PAGE_SETTINGS: {
				this.pageSettings?.classList.remove('d-none');
				this.pageHome?.classList.add('d-none');
				this.pageModes?.classList.add('d-none');
				this.pageEditSetting?.classList.add('d-none');
				break;
			}
			case this.PAGE_EDIT_SETTING: {
				this.pageEditSetting?.classList.remove('d-none');
				this.pageHome?.classList.add('d-none');
				this.pageModes?.classList.add('d-none');
				this.pageSettings?.classList.add('d-none');
				break;
			}
		}
	}

	/* Navigate to the defined route in param */
	navigate(newRoute) {
		this.currentRoute = newRoute;
		this.toggle(newRoute);
	}

	/* Return the previous route of the current route */
	previous(route, object) {
		route = route ? route : this.currentRoute;
		object = object ? object : this.routes;

    if (object?.children === undefined || object?.children?.lenght === 0 || object?.path === route) return null;
		if (object?.children?.some((child) => child?.path === route)) {
			this.currentRoute = object.path;
      this.toggle(object.path);
			return;
		}

    return object.children.map((child) => this.previous(route, child)).reduce((a, b) => a || b);
  }
}
