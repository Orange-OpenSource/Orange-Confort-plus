"use strict";
const tmplNavigationButtons = document.createElement('template');
tmplNavigationButtons.innerHTML = `
<div class="d-flex align-items-center gap-2 h-100">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;
class NavigationButtonsComponent extends AbstractSetting {
    activesValues = { values: "noModifications,scrollSet_clicAction,navigationSet_clicAction,fullSet_clicAction", valueSelected: 0 };
    constructor() {
        super();
        this.setCallback(navigationButtonsServiceInstance.setNavigationButtons.bind(this));
        this.appendChild(tmplNavigationButtons.content.cloneNode(true));
    }
}
customElements.define('app-navigation-buttons', NavigationButtonsComponent);
