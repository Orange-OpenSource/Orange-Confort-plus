"use strict";
const tmplToolbar = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header id="header"></app-header>
`;
class ToolbarComponent extends HTMLElement {
    header = null;
    json;
    defaultJson;
    handler;
    state;
    constructor() {
        super();
        this.appendChild(tmplToolbar.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.header = this.querySelector('#header');
        this.state = this.parentNode.parentNode.host.getAttribute('data-state');
        /* JSON retrieval and initialisation */
        filesServiceInstance.getJSONFile('modes-of-use').then((result) => {
            this.defaultJson = result;
            localStorageServiceInstance.getItem(JSON_NAME).then((result) => {
                if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
                    this.json = result;
                }
                else {
                    this.json = this.defaultJson;
                    localStorageServiceInstance.setItem(JSON_NAME, this.defaultJson);
                }
                this.initCurrentMode(this.state === 'restored');
            });
        });
        window.addEventListener(`storage-${JSON_NAME}`, this.handler);
        this.addEventListener('changeRoute', this.handler);
    }
    initCurrentMode = (shouldLoad = false) => {
        if (this.json.selectedMode) {
            routeServiceInstance.initPages(this, shouldLoad).then((result) => {
                if (result) {
                    this.setCurrentPage(result);
                }
            });
        }
        else {
            routeServiceInstance.navigate(PAGE_MODES, false, this);
            setTimeout(() => {
                this.querySelector('app-modes')?.setAttribute('data-modes', JSON.stringify(this.json));
            });
        }
    };
    setCurrentPage = (page) => {
        setTimeout(() => {
            let currentPage = this.querySelector(`app-${page}`);
            if (currentPage) {
                currentPage?.setAttribute('data-modes', JSON.stringify(this.json));
                if (page === PAGE_EDIT_SETTING) {
                    localStorageServiceInstance.getItem('current-setting').then((result) => {
                        if (result) {
                            const editSettingElement = this.querySelector(`app-${PAGE_EDIT_SETTING}`);
                            editSettingElement?.setAttribute('data-setting', result);
                        }
                    });
                }
            }
        });
    };
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'changeRoute':
                    this.changeRouteEvent(event);
                    break;
                case `storage-${JSON_NAME}`:
                    this.storageEvent();
                    break;
            }
        };
    };
    changeRouteEvent = (event) => {
        let newRoute = event.detail.route;
        this.header?.focus();
        if (event.detail.mode) {
            this.json.selectedMode = event.detail.mode;
            this.querySelector(`app-${PAGE_HOME}`)?.focus();
        }
        routeServiceInstance.navigate(newRoute, false, this);
        this.setCurrentPage(newRoute);
        if (event.detail.setting) {
            const editSettingElement = this.querySelector(`app-${PAGE_EDIT_SETTING}`);
            editSettingElement?.setAttribute('data-setting', event.detail.setting);
        }
    };
    storageEvent = () => {
        localStorageServiceInstance.getItem(JSON_NAME).then((result) => {
            this.json = result;
            this.setCurrentPage(routeServiceInstance.currentRoute);
        });
    };
}
customElements.define('app-toolbar', ToolbarComponent);
