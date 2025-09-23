"use strict";
const tmplSpacingText = document.createElement('template');
tmplSpacingText.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;
class TextSpacingComponent extends AbstractSetting {
    activesValues = { values: "noModifications,spacingTextSmall,spacingTextBig", valueSelected: 0 };
    constructor() {
        super();
        this.setCallback(textSpacingServiceInstance.setSpacingText.bind(this));
        this.appendChild(tmplSpacingText.content.cloneNode(true));
    }
}
customElements.define('app-text-spacing', TextSpacingComponent);
