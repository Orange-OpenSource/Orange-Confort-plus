"use strict";
const tmplClickFacilite = document.createElement('template');
tmplClickFacilite.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;
class ClickFaciliteComponent extends AbstractSetting {
    activesValues = { values: "noModifications,bigZone,longClick_delay2", valueSelected: 0 };
    constructor() {
        super();
        this.setCallback(clickFaciliteServiceInstance.setClickFacilite.bind(this));
        this.appendChild(tmplClickFacilite.content.cloneNode(true));
    }
}
customElements.define('app-click-facilite', ClickFaciliteComponent);
