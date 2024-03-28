const tmplScroll: HTMLTemplateElement = document.createElement('template');
tmplScroll.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class ScrollComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,bigScroll,scrollOnMouseover",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setScroll.bind(this));

		this.appendChild(tmplScroll.content.cloneNode(true));
	}

	setScroll = (value: string): void => {
		switch (value) {
			case 'bigScroll': {
				scrollServiceInstance.setScroll({ name: this.name, btnState: '', bigScrollActivated: true });
				break;
			}
			case 'scrollOnClick': {
				scrollServiceInstance.setScroll({ name: this.name, btnState: 'click', bigScrollActivated: false });
				break;
			}
			case 'scrollOnMouseover': {
				scrollServiceInstance.setScroll({ name: this.name, btnState: 'mouseover', bigScrollActivated: false });
				break;
			}
			default: {
				scrollServiceInstance.setScroll({ name: this.name, btnState: '', bigScrollActivated: false });
			}
		}
	}
}

customElements.define('app-scroll', ScrollComponent);
