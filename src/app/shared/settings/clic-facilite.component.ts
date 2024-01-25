const tmplClicFacilte: HTMLTemplateElement = document.createElement('template');
tmplClicFacilte.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="clicFacilte" data-icon="ClicFacile"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ClicFaciliteComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,longClic,autoClic+2",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setClicFacilite.bind(this));

		this.appendChild(tmplClicFacilte.content.cloneNode(true));
	}

	setClicFacilite = (value: string): void => {
		if (value === 'longClic') {

		} else if (value.includes('autoClic')) {

		}
	}
}

customElements.define('app-clic-facilite', ClicFaciliteComponent);
