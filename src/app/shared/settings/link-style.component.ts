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

	setLinkStyle = (value: string): void => {
		if (value === 'noModifications') {
			stylesServiceInstance.removeStyle(this.name);
		} else {
			let linkColor = value.split('+')[0];
			let linkPointedColor = value.split('+')[1];
			let linkVisitedColor = value.split('+')[2];

			let styleLink = `
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

			stylesServiceInstance.setStyle(this.name, styleLink);
		}
	}
}

customElements.define('app-link-style', LinkStyleComponent);
