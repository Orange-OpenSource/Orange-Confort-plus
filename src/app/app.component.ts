const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
<div data-bs-theme="light">
	<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">
		<span class="visually-hidden" data-i18n="mainButton"></span>
		<app-icon data-size="3em" data-name="Accessibility"></app-icon>
	</button>
	<app-toolbar class="bg-body position-fixed top-0 end-0" id="toolbar"></app-toolbar>
</div>
`;

class AppComponent extends HTMLElement {
	confortPlusBtn: HTMLElement | undefined = null;
	confortPlusToolbar: HTMLElement | undefined = null;
	i18nService: any;
	iconsService: any;
	link: HTMLLinkElement;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this?.shadowRoot?.appendChild(template.content.cloneNode(true));

		this.link = document.createElement('link');
		this.link.rel = 'stylesheet';
		this.link.href = `${appPath}css/styles.min.css`;
		this.shadowRoot?.appendChild(this.link);
	}

	connectedCallback(): void {
		customElements.upgrade(this);

		iconsServiceInstance.loadSprite(this.shadowRoot);
		// @note Tick until everything loaded
		setTimeout(() => {
			i18nServiceInstance.translate(this.shadowRoot);
		});

		this.confortPlusBtn = this?.shadowRoot?.getElementById('confort');
		this.confortPlusToolbar = this?.shadowRoot?.getElementById('toolbar');
		if (!this.confortPlusBtn || !this.confortPlusToolbar) {
			return;
		}

		this.hideToolbar();

		this.confortPlusToolbar.addEventListener('closeEvent', this.hideToolbar);
		this.confortPlusBtn.addEventListener('click', this.showToolbar);
	}

	disconnectedCallback(): void {
		this.confortPlusToolbar?.removeEventListener('closeEvent', this.hideToolbar);
		this.confortPlusBtn?.removeEventListener('click', this.showToolbar);
	}

	showToolbar = (): void => {
		this.confortPlusToolbar.removeAttribute('style');
	}

	hideToolbar = (): void => {
		this.confortPlusToolbar.style.transform = 'translateX(100%)';
		this.confortPlusToolbar.style.visibility = 'hidden';
	}
}

customElements.define('app-root', AppComponent);
