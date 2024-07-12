const tmplReadingGuide: HTMLTemplateElement = document.createElement('template');
tmplReadingGuide.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ReadingGuideComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(readingGuideServiceInstance.setReadingMaskGuide.bind(this));

		this.appendChild(tmplReadingGuide.content.cloneNode(true));
	}
}

customElements.define('app-reading-guide', ReadingGuideComponent);
