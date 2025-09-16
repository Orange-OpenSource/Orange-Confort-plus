const tmplReadingPage: HTMLTemplateElement = document.createElement('template');
tmplReadingPage.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class ReadingPageComponent extends AbstractSetting {
	activesValues = { values: "noModifications,onlyContent110IvoryBlack", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(readingPageServiceInstance.setReadingPage.bind(this));

		this.appendChild(tmplReadingPage.content.cloneNode(true));
	}
}

customElements.define('app-reading-page', ReadingPageComponent);
