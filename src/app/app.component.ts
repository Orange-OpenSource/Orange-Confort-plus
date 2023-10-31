const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
<style>
    .sc-confort-plus {
        border: none;
        background-color: #ff7900;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        position: fixed;
        top: 50%;
        right: 1rem;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }

		[hidden] {
			display: none !important;
		}
</style>
<button class="sc-confort-plus" id="confort" data-i18n="mainTitle"></button>
<!-- @todo rename mycustomevent -->
<app-toolbar hidden id="toolbar" onmycustomevent="{handleCustomEvent}"></app-toolbar>
`

class AppComponent extends HTMLElement {
	private openConfortPlus: boolean = false;
	confortPlusBtn: HTMLElement | null = null;
	confortPlusToolbar: HTMLElement | null = null;
	i18nService: any;
	pathService: any;
	path: string | undefined;

	constructor() {
		super();

		// @ts-ignore
		this.pathService = new pathService();
		this.path = this.pathService.path;

		// @ts-ignore
		this.i18nService = new i18nService(this.path);

		this.attachShadow({ mode: 'open' });

		// @ts-ignore
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		template.addEventListener('closeEvent', (event: any) => {
			if (event.detail) {
				this.toggleToolbar();
			}
		});
	}

	connectedCallback(): void {
		customElements.upgrade(this);

		// @note Tick until everything loaded
		setTimeout(() => {
			this.i18nService.translate(this.shadowRoot);
		});

		// @ts-ignore
		this.confortPlusBtn = this.shadowRoot.getElementById('confort');
		// @ts-ignore
		this.confortPlusToolbar = this.shadowRoot.getElementById('toolbar');

		if (!this.confortPlusBtn || !this.confortPlusToolbar) {
			return;
		}

		this.confortPlusBtn.addEventListener('click', () => {
			this.toggleToolbar();
		});
	}

	disconnectedCallback(): void {
		this.confortPlusBtn?.removeEventListener('click', () => {
		});
		this.confortPlusToolbar?.removeEventListener('click', () => {
		});
	}

	toggleToolbar(): void {
		this.openConfortPlus = !this.openConfortPlus;
		// @ts-ignore
		this.confortPlusToolbar.hidden = !this.openConfortPlus;
		// @ts-ignore
		this.confortPlusBtn.hidden = this.openConfortPlus;
	}
}

customElements.define('app-root', AppComponent);

const appRootElt = document.createElement('app-root');
document.body.prepend(appRootElt);

