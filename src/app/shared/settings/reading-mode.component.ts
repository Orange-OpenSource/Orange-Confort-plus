const tmplReadingMode: HTMLTemplateElement = document.createElement('template');
tmplReadingMode.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ReadingModeComponent extends AbstractSetting {
	activesValues = { values: "noModifications,contentAndBigger,black_ivory", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(readingModeServiceInstance.setReadingMode.bind(this));

		this.appendChild(tmplReadingMode.content.cloneNode(true));
	}
}

customElements.define('app-reading-mode', ReadingModeComponent);
