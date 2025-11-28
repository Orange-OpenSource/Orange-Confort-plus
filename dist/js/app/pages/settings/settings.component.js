"use strict";
const settingsLayout = document.createElement('template');
settingsLayout.innerHTML = `
	<section class="accordion mb-2">
		<app-text class="c-settings__category accordion-item"></app-text>
		<app-layout class="c-settings__category accordion-item"></app-layout>
		<app-sound class="c-settings__category accordion-item"></app-sound>
		<app-navigation class="c-settings__category accordion-item"></app-navigation>
		<div class="border-top border-light border-1"></div>
	</section>

	<div class="p-3">
		<button id="${PREFIX}reset-mode" type="button" class="btn btn-secondary w-100" data-i18n="resetThisMode" data-i18n-title="resetThisModeTitle"></button>
	</div>
	<p class="px-3 small text-muted">
		<a href="https://confort-plus.orange.com/#footer" id="${PREFIX}about-link"></a>.
	</p>
`;
class SettingsComponent extends HTMLElement {
    static observedAttributes = ['data-modes'];
    resetModeElement = null;
    aboutLinkElement = null;
    selectedMode = '';
    handler;
    constructor() {
        super();
        this.appendChild(settingsLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.aboutLinkElement = this.querySelector(`#${PREFIX}about-link`);
        this.aboutLinkElement.innerText = i18nServiceInstance.getMessage('aboutLink', [VERSION]);
        this.resetModeElement = this.querySelector(`#${PREFIX}reset-mode`);
        this.resetModeElement.addEventListener('click', this.handler);
        this.addEventListener('collapsedCategory', this.handler);
    }
    disconnectedCallback() {
        this.removeEventListener('collapsedCategory', this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ('data-modes' === name) {
            this.openOrHideCategories(newValue);
            this.selectedMode = JSON.parse(newValue).selectedMode;
            let mode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
            let elements = this.querySelectorAll('.c-settings__category');
            const settings = Object.entries(JSON.parse(mode))[0][1];
            elements.forEach((element) => {
                element.setAttribute('data-settings', JSON.stringify(settings));
            });
        }
    }
    openOrHideCategories = (mode) => {
        categoriesServiceInstance.openMainCategory(JSON.parse(mode).selectedMode).then((result) => {
            result.forEach((accordion) => {
                this.querySelector(accordion.name).setAttribute('data-open', (!accordion.open).toString());
            });
        });
    };
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'collapsedCategory':
                    categoriesServiceInstance.settingAccordions.forEach((accordion) => {
                        this.querySelector(accordion.name).setAttribute('data-open', (!accordion.open).toString());
                    });
                    break;
                case 'click':
                    modeOfUseServiceInstance.setSelectedMode(this.selectedMode);
                    break;
            }
        };
    };
}
customElements.define('app-settings', SettingsComponent);
