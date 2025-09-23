"use strict";
const tmplZoom = document.createElement('template');
tmplZoom.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;
class ZoomComponent extends AbstractSetting {
    activesValues = { values: "noModifications,130,200", valueSelected: 0 };
    constructor() {
        super();
        this.setCallback(zoomServiceInstance.setZoom.bind(this));
        this.appendChild(tmplZoom.content.cloneNode(true));
    }
}
customElements.define('app-zoom', ZoomComponent);
