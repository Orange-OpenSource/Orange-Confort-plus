const tmplLinkStyle: HTMLTemplateElement = document.createElement('template');
tmplLinkStyle.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="linksStyle" data-icon="Links"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class LinkStyleComponent extends AbstractSetting {
	constructor() {
		super();

		this.appendChild(tmplLinkStyle.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();

		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setLinkStyle((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn?.removeEventListener('changeSettingEvent', () => { });
	}

	setLinkStyle = (value: string): void => {
		const bodyElt: HTMLBodyElement = document.getElementsByTagName('body')[0];

		let label = value;

		if (value === 'default') {
			document.querySelector('#cplus-styles-links')?.remove();
		} else {
			//label = this.i18nService.getMessage(`spacingTextLabel${value}`);
			let linkColor = value.split('+')[0];
			let linkPointedColor = value.split('+')[1];
			let linkVisitedColor = value.split('+')[2];

			let classLinkStyle = `
				a {
					color: ${linkColor} !important;
				}
				a:visited {
					color: ${linkVisitedColor} !important;
				}
				a:active, a:hover, a:focus {
					color: ${linkPointedColor} !important;
				}
			`;

			if (document.querySelectorAll('#cplus-styles-links').length === 0) {
				let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
				let stylesLinks: HTMLStyleElement = document.createElement('style');
				stylesLinks.setAttribute('id', 'cplus-styles-links');
				stylesLinks.innerHTML = classLinkStyle;
				head.appendChild(stylesLinks);
			} else {
				document.querySelector('#cplus-styles-links').innerHTML = classLinkStyle;
			}
		}
		this.modalBtn.setAttribute('data-value', label);
	}
}

customElements.define('app-link-style', LinkStyleComponent);
