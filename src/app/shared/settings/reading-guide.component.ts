const tmplReadingGuide: HTMLTemplateElement = document.createElement('template');
tmplReadingGuide.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;

class ReadingGuideComponent extends AbstractSetting {
	activesValues = { values: "noModifications,ruleGuide,maskGuide,alternatingLinesGuide", valueSelected: 0 };

	constructor() {
		super();

		this.setCallback(readingGuideServiceInstance.setReadingMaskGuide.bind(this));

		this.appendChild(tmplReadingGuide.content.cloneNode(true));
	}
}

customElements.define('app-reading-guide', ReadingGuideComponent);
