"use strict";
let routeServiceIsInstantiated;
class RouteService {
    currentRoute;
    historyRoute = [];
    toolbar = null;
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
    initPages = (root, shouldLoad = false) => {
        this.toolbar = root;
        return localStorageServiceInstance.getItem('current-route').then((result) => {
            if (this.routes.some(route => result === route)) {
                this.navigate(result, shouldLoad, this.toolbar);
                return result;
            }
            else {
                this.navigate(PAGE_HOME, false, this.toolbar);
                return PAGE_HOME;
            }
        });
    };
    /* Navigate to the defined route in parameter */
    navigate = (newRoute, shouldLoad = false, root) => {
        this.toolbar = root;
        if (shouldLoad) {
            this.loadRoute(newRoute, this.toolbar);
            this.setCurrentRoute(newRoute, this.toolbar);
        }
        else if (newRoute !== this.currentRoute) {
            this.routes.forEach((route) => {
                if (route === newRoute) {
                    this.loadRoute(route, this.toolbar);
                }
                else if (route === this.currentRoute) {
                    this.toolbar.querySelector(`app-${route}`)?.remove();
                }
            });
            this.setCurrentRoute(newRoute, this.toolbar);
        }
    };
    setHistoryAndHeader = (newRoute, root) => {
        this.toolbar = root;
        const header = this.toolbar.querySelector('#header');
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
    };
    loadRoute = (route, root) => {
        this.toolbar = root;
        const element = `<app-${route}></app-${route}>`;
        this.toolbar.insertAdjacentHTML('beforeend', element);
        const page = this.toolbar.querySelector(`app-${route}`);
        i18nServiceInstance.translate(page);
    };
    setCurrentRoute = (route, root) => {
        this.setHistoryAndHeader(route, root);
        this.currentRoute = route;
        localStorageServiceInstance.setItem('current-route', route);
    };
}
