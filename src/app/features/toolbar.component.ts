const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header id="header"></app-header>

<app-home></app-home>
<app-modes class="d-none"></app-modes>
<app-settings class="d-none"></app-settings>
<app-edit-setting class="d-none"></app-edit-setting>
`;

class ToolbarComponent extends HTMLElement {
	header: HTMLElement | null = null;
	routeService: any;
	historyRoute: Array<string> = [];

	constructor() {
		super();

		// @todo Utiliser singleton pour routeService pour éviter plusieurs instances
		// @ts-ignore
		this.routeService = new routeService();

		this.appendChild(tmplToolbar.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.header = this.querySelector('#header');
		this.routeService.initPages(this);

		this.addEventListener('changeRoute', (event) => {
			/* Creating a tree structure to get the previous route */
			if ((event as CustomEvent).detail.isPrev) {
				this.historyRoute.pop();
			} else {
				this.historyRoute.push(this.routeService.currentRoute);
			}

			this.routeService.navigate((event as CustomEvent).detail.route);
			this.setHeaderDisplay((event as CustomEvent).detail.route);
			this.header?.focus();
			this.header.setAttribute('data-prev-route', this.historyRoute[this.historyRoute.length - 1]);
		});
	}

	setHeaderDisplay = (page: string): void => {
		switch (page) {
			case this.routeService.PAGE_HOME: {
				this.header?.setAttribute('data-mode', 'primary');
				this.header?.setAttribute('data-title-page', '');
				break;
			}
			case this.routeService.PAGE_MODES: {
				this.header?.setAttribute('data-mode', 'secondary');
				this.header?.setAttribute('data-title-page', 'pageTitleModes');
				break;
			}
			case this.routeService.PAGE_SETTINGS: {
				this.header?.setAttribute('data-mode', 'secondary');
				this.header?.setAttribute('data-title-page', 'pageTitleSettings');
				break;
			}
			case this.routeService.PAGE_EDIT_SETTING: {
				this.header?.setAttribute('data-mode', 'secondary');
				this.header?.setAttribute('data-title-page', 'pageTitleEditSetting');
			}
		}

	}
}

customElements.define('app-toolbar', ToolbarComponent);
