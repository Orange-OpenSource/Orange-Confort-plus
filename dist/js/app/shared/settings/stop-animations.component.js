"use strict";
const tmplStopAnimations = document.createElement('template');
tmplStopAnimations.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
</div>
`;
class StopAnimationsComponent extends AbstractSetting {
    activesValues = { values: "noModifications,active", valueSelected: 0 };
    constructor() {
        super();
        this.setCallback(stopAnimationsServiceInstance.setStopAnimations.bind(this));
        this.appendChild(tmplStopAnimations.content.cloneNode(true));
    }
}
customElements.define('app-stop-animations', StopAnimationsComponent);
