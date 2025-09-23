"use strict";
const tmplFocusAspect = document.createElement('template');
tmplFocusAspect.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;
class FocusAspectComponent extends AbstractSetting {
    activesValues = { values: "noModifications,big_black,huge_black", valueSelected: 0 };
    constructor() {
        super();
        this.setCallback(focusAspectServiceInstance.setFocus.bind(this));
        this.appendChild(tmplFocusAspect.content.cloneNode(true));
    }
}
customElements.define('app-focus-aspect', FocusAspectComponent);
