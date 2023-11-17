const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<app-header></app-header>

<app-home class="d-none"></app-home>
<app-modes class="d-none"></app-modes>
<app-settings class="d-none"></app-settings>
<app-edit-setting class="d-none"></app-edit-setting>
`;

class ToolbarComponent extends HTMLElement {
	closeBtn: HTMLElement;
	pageHome: HTMLElement;
	pageModes: HTMLElement;
	pageSettings: HTMLElement;
	pageEditSetting: HTMLElement;

	PAGE_HOME = 'home';
	PAGE_MODES = 'modes';
	PAGE_SETTINGS = 'settings';
	PAGE_EDIT_SETTING = 'edit-setting';
	currentPage = this.PAGE_HOME;

	constructor() {
		super();

		this.appendChild(tmplToolbar.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.pageHome = this.querySelector('app-home');
		this.pageModes = this.querySelector('app-modes');
		this.pageSettings = this.querySelector('app-settings');
		this.pageEditSetting = this.querySelector('app-edit-setting');

		const listPage = [this.PAGE_HOME, this.PAGE_MODES, this.PAGE_SETTINGS, this.PAGE_EDIT_SETTING];
		listPage.forEach((page: string) => {
			if (this.currentPage === page) {
				this.querySelector(`app-${page}`)?.classList.remove('d-none');
			}
		});

		template.addEventListener('prevEvent', (event) => {
			this.prevPage();
		});
		template.addEventListener('changeModeEvent', (event) => {
			this.openPage(this.PAGE_MODES);
		});
		template.addEventListener('settingsEvent', (event) => {
			this.openPage(this.PAGE_SETTINGS);
		});
		//template.addEventListener('editSettingEvent', this.prevPage);
	}

	openPage(direction: string): void {
		switch (direction) {
			case this.PAGE_MODES: {
				this.pageHome?.classList.add('d-none');
				this.pageModes?.classList.remove('d-none');
				this.currentPage = this.PAGE_MODES;
				break;
			}
			case this.PAGE_SETTINGS: {
				this.pageHome?.classList.add('d-none');
				this.pageSettings?.classList.remove('d-none');
				this.currentPage = this.PAGE_SETTINGS;
				break;
			}
		}
	}

	prevPage(): void {
		switch (this.currentPage) {
			case this.PAGE_MODES: {
				this.pageHome?.classList.remove('d-none');
				this.pageModes?.classList.add('d-none');
				this.currentPage = this.PAGE_HOME;
				break;
			}
			case this.PAGE_SETTINGS: {
				this.pageHome?.classList.remove('d-none');
				this.pageSettings?.classList.add('d-none');
				this.currentPage = this.PAGE_HOME;
				break;
			}
			case this.PAGE_EDIT_SETTING: {
				this.pageSettings?.classList.remove('d-none');
				this.pageEditSetting?.classList.add('d-none');
				this.currentPage = this.PAGE_SETTINGS;
				break;
			}
		}
	}
}

customElements.define('app-toolbar', ToolbarComponent);
