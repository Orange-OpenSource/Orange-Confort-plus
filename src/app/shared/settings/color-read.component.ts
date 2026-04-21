const tmplColorRead: HTMLTemplateElement = document.createElement('template');
tmplColorRead.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ColorReadComponent extends AbstractSetting {
	activesValues = { values:
			DEFAULT_VALUE +
			"splitSyllables_word," +
			"colorTrickyWords_word",
			valueSelected: 0
		};

	constructor() {
		super();

		this.setCallback(colorReadServiceInstance.setColorRead.bind(this));

		this.appendChild(tmplColorRead.content.cloneNode(true));
	}
}

customElements.define('app-color-read', ColorReadComponent);
