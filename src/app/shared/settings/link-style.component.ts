const tmplLinkStyle: HTMLTemplateElement = document.createElement('template');
tmplLinkStyle.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="linksStyle" data-icon="Links"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class LinkStyleComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,lightblue+orange+lightgreen,yellow+orange+lightgreen",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setLinkStyle.bind(this));

		this.appendChild(tmplLinkStyle.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn?.removeEventListener('changeSettingEvent', () => { });
	}

	setLinkStyle = (value: string): void => {
		if (value === 'noModifications') {
			document.querySelector('#cplus-styles-links')?.remove();
		} else {
			let linkColor = value.split('+')[0];
			let linkPointedColor = value.split('+')[1];
			let linkVisitedColor = value.split('+')[2];

			let classLinkStyle = `
				a:link {
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
				// @todo - trouver un moyen de ne pas dupliquer l'ajout de style dans le head dans chaque réglage
				let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
				// @todo - tester si on peut utiliser les adoptedStylesheet
				let stylesLinks: HTMLStyleElement = document.createElement('style');
				stylesLinks.setAttribute('id', 'cplus-styles-links');
				stylesLinks.innerHTML = classLinkStyle;
				head.appendChild(stylesLinks);
			} else {
				document.querySelector('#cplus-styles-links').innerHTML = classLinkStyle;
			}
		}
	}
}

customElements.define('app-link-style', LinkStyleComponent);
