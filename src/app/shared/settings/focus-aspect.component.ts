const tmplFocusAspect: HTMLTemplateElement = document.createElement('template');
tmplFocusAspect.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="focusAspect" data-icon="Focus"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class FocusAspectComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,big+blue,veryBig+red",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setFocus.bind(this));

		this.appendChild(tmplFocusAspect.content.cloneNode(true));
	}

	setFocus = (value: string): void => {
		if (value === 'noModifications') {
			stylesServiceInstance.removeStyle(this.name);
		} else {
			let size = value.split('+')[0] === 'big' ? '4px' : '10px';
			let color = value.split('+')[1];

			let styleFocus = `
				*:focus, *:focus-visible {
					outline: ${color} solid ${size} !important;
				}
			`;

			stylesServiceInstance.setStyle(this.name, styleFocus);
		}
	}
}

customElements.define('app-focus-aspect', FocusAspectComponent);
