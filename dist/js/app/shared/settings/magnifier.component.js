"use strict";
const tmplMagnifier = document.createElement('template');
tmplMagnifier.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;
class MagnifierComponent extends AbstractSetting {
    activesValues = { values: "noModifications,zoom2,zoom5", valueSelected: 0 };
    constructor() {
        super();
        this.setCallback(magnifierServiceInstance.setMagnifier.bind(this));
        this.appendChild(tmplMagnifier.content.cloneNode(true));
    }
}
customElements.define('app-magnifier', MagnifierComponent);
