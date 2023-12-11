const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header id="header"></app-header>

<app-home class="d-none"></app-home>
<app-modes class="d-none"></app-modes>
<app-settings class="d-none"></app-settings>
<app-edit-setting class="d-none"></app-edit-setting>
`;

class ToolbarComponent extends HTMLElement {
	header: HTMLElement | null = null;
	routeService: any;

	constructor() {
		super();

		this.routeService = new routeService;

		this.appendChild(tmplToolbar.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.header = this.querySelector('#header');
		this.routeService.initPages(this);
		this.routeService.emitChangeEvent = (value: string) => {
			this.setHeaderDisplay(value);
			this.header?.focus();
		}

		this.addEventListener('changeModeEvent', (event) => {
			this.routeService.navigate(this.routeService.PAGE_MODES);
		});
		this.addEventListener('selectModeEvent', (event) => {
			this.routeService.navigate(this.routeService.PAGE_HOME);
		});
		this.addEventListener('settingsEvent', (event) => {
			this.routeService.navigate(this.routeService.PAGE_SETTINGS);
		});
		this.addEventListener('prevEvent', (event) => {
			this.routeService.previous();
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
}

customElements.define('app-toolbar', ToolbarComponent);
