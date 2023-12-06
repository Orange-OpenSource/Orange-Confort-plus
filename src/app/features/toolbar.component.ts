const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header></app-header>

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
		this.header = this.querySelector('app-header');
		this.routeService.initPages(this);
		this.routeService.emitChangeEvent = (value: string) => {
			this.setHeaderDisplay(value);
			this.header?.focus();
		}

		template.addEventListener('changeModeEvent', (event) => {
			this.routeService.navigate(this.routeService.PAGE_MODES);
		});
		template.addEventListener('selectModeEvent', (event) => {
			this.routeService.navigate(this.routeService.PAGE_HOME);
		});
		template.addEventListener('settingsEvent', (event) => {
			this.routeService.navigate(this.routeService.PAGE_SETTINGS);
		});
		template.addEventListener('prevEvent', (event) => {
			this.routeService.previous();
		});
	}

	setHeaderDisplay(page: string): void {
		switch (page) {
			case this.routeService.PAGE_HOME: {
				this.header!.dataset.mode = 'primary';
				this.header!.dataset.titlePage = ``;
				break;
			}
			case this.routeService.PAGE_MODES: {
				this.header!.dataset.mode = 'secondary';
				this.header!.dataset.titlePage = `pageTitleModes`;
				break;
			}
			case this.routeService.PAGE_SETTINGS: {
				this.header!.dataset.mode = 'secondary';
				this.header!.dataset.titlePage = `pageTitleSettings`;
				break;
			}
			case this.routeService.PAGE_EDIT_SETTING: {
				this.header!.dataset.mode = 'secondary';
				this.header!.dataset.titlePage = `pageTitleEditSetting`;
				break;
			}
		}
	}
}

customElements.define('app-toolbar', ToolbarComponent);
