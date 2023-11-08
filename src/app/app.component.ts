const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
<!-- @fixme Charger dans le constructor() pour avoir le bon chemin -->
<link rel="stylesheet" href="../css/styles.min.css">

<style>
	.sc-confort-plus {
			border-radius: 50%;
			position: fixed;
			top: 50%;
			right: 1rem;
			transform: translate(-50%, -50%);
	}
</style>
<!-- @todo Récupérer la traduction dans le title -->
<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" title="Ouvrir Confort+">
	<span class="visually-hidden" data-i18n="mainButton"></span>
	<app-icon data-name="Lightbulb"></app-icon>
</button>
<app-toolbar class="d-none bg-body" id="toolbar"></app-toolbar>
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

		template.addEventListener('closeEvent', this.toggleToolbar);
		this.confortPlusBtn.addEventListener('click', this.toggleToolbar);
	}

	disconnectedCallback(): void {
		this.confortPlusBtn?.removeEventListener('click', this.toggleToolbar);
	}

	toggleToolbar = () => {
		this.openConfortPlus = !this.openConfortPlus;
		// @ts-ignore
		this.confortPlusToolbar.classList.toggle('d-none');
		// @ts-ignore
		this.confortPlusBtn.classList.toggle('d-none');
	}
}

customElements.define('app-root', AppComponent);
