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
	home: HTMLElement | null = null;
	modes: HTMLElement | null = null;
	routeService: any;
	historyRoute: Array<string> = [];
	json = {
		"selectedMode": "",
		"modes": [
			{
				"visionPlus": [
					{
						"Taille de texte":
						{
							"value1": "16",
							"value2": "18",
							"value3": "20",
							"value4": "22",
							"value5": "24"
						},
						"Police": {
							"value1": "null",
							"value2": "Arial",
							"value3": "Open Sans",
							"value4": "Accessible-DFA",
							"value5": "Open Dyslexic",
							"value6": "Luciole"
						}
					}
				]
			},
			{
				"facilePlus": [
					{
						"Taille de texte": {
							"value1": "20",
							"value2": "21",
							"value3": "22",
							"value4": "23"
						}
					},
					{
						"Police": {
							"value1": "null",
							"value2": "Arial",
							"value3": "Open Sans",
							"value4": "Accessible-DFA",
							"value5": "Open Dyslexic",
							"value6": "Luciole"
						}
					}
				]
			}
		]
	};

	constructor() {
		super();

		// @todo Utiliser singleton pour routeService pour éviter plusieurs instances
		// @ts-ignore
		this.routeService = new routeService();

		this.appendChild(tmplToolbar.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.home = this.querySelector('app-home');
		this.modes = this.querySelector('app-modes');
		this.modes!.dataset.listMode = JSON.stringify(this.json.modes);
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
				break;
			}
		}
	}

	setCurrentMode(): void {
		if (this.json.selectedMode) {
			this.json.modes.forEach(mode => {
				if (Object.entries(mode)[0][0] === this.json.selectedMode) {
					let currentMode = Object.entries(mode)[0];
					this.home!.dataset.mode = JSON.stringify(currentMode);
				}
			});
		} else {
			this.routeService.navigate(this.routeService.PAGE_MODES);
		}
	}

	setConfig(event?: CustomEvent): void {
		// Méthode à utiliser pour impacter le fichier json
		this.json.selectedMode = event?.detail.mode;
	}
}

customElements.define('app-toolbar', ToolbarComponent);
