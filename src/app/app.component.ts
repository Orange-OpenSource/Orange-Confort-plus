const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
<div data-bs-theme="light" style="display:none">
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
	closeBtn: HTMLElement | undefined = null;
	link: HTMLLinkElement;

	handler: any;

	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
		this?.shadowRoot?.appendChild(template.content.cloneNode(true));

		this.link = document.createElement('link');
		this.link.rel = 'stylesheet';
		this.link.href = `${appPath}css/styles.min.css`;
		this.link.onload = () => {
			this?.shadowRoot?.querySelector('[data-bs-theme]').removeAttribute('style');
		};
		this.shadowRoot?.appendChild(this.link);

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		customElements.upgrade(this);

		iconsServiceInstance.loadSprite(this.shadowRoot);
		// @note Tick until everything loaded
		setTimeout(() => {
			i18nServiceInstance.translate(this.shadowRoot);
		});

		this.confortPlusBtn = this?.shadowRoot?.getElementById('confort');
		this.closeBtn = this?.shadowRoot?.getElementById('close-toolbar');
		this.confortPlusToolbar = this?.shadowRoot?.getElementById('toolbar');
		if (!this.confortPlusBtn || !this.confortPlusToolbar) {
			return;
		}

		localStorageServiceInstance.getItem('is-opened')
			.then((result: any) => {
					if (result === 'true') {
						this.showToolbar();
					} else {
						this.hideToolbar();
					}
				}
			);

		this.confortPlusToolbar.addEventListener('closeEvent', this.handler);
		this.confortPlusBtn.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.confortPlusToolbar?.removeEventListener('closeEvent', this.handler);
		this.confortPlusBtn?.removeEventListener('click', this.handler);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'closeEvent':
					this.hideToolbar();
					break;
				case 'click':
					this.showToolbar();
					break;
				default:
					break;
			}
		}
	}

	private showToolbar = (): void => {
		this.confortPlusToolbar.removeAttribute('style');
		this.closeBtn?.focus();
		this.confortPlusBtn.classList.add('d-none');
		localStorageServiceInstance.setItem('is-opened', 'true');
	}

	private hideToolbar = (): void => {
		this.confortPlusToolbar.style.transform = 'translateX(100%)';
		this.confortPlusToolbar.style.visibility = 'hidden';
		this.confortPlusBtn.classList.remove('d-none');
		this.confortPlusBtn?.focus();
		localStorageServiceInstance.setItem('is-opened', 'false');
	}
}

customElements.define('app-root', AppComponent);
