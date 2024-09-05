const tmplCapitalLetters: HTMLTemplateElement = document.createElement('template');
tmplCapitalLetters.innerHTML = `
<div class="d-flex align-items-center gap-3 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class CapitalLettersComponent extends AbstractSetting {
	constructor() {
		super();

		this.setCallback(capitalLettersServiceInstance.setCapitalLetters.bind(this));

		this.appendChild(tmplCapitalLetters.content.cloneNode(true));
	}
}

customElements.define('app-capital-letters', CapitalLettersComponent);
