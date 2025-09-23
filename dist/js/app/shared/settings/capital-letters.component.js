"use strict";
const tmplCapitalLetters = document.createElement('template');
tmplCapitalLetters.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;
class CapitalLettersComponent extends AbstractSetting {
    activesValues = { values: "noModifications,uppercase,capitalize", valueSelected: 0 };
    constructor() {
        super();
        this.setCallback(capitalLettersServiceInstance.setCapitalLetters.bind(this));
        this.appendChild(tmplCapitalLetters.content.cloneNode(true));
    }
}
customElements.define('app-capital-letters', CapitalLettersComponent);
