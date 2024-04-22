const settingsLayout: HTMLTemplateElement = document.createElement('template');
settingsLayout.innerHTML = `
<section class="accordion mb-2">
	<app-text class="c-settings__category accordion-item"></app-text>
	<app-layout class="c-settings__category accordion-item"></app-layout>
	<app-picture-video class="c-settings__category accordion-item"></app-picture-video>
	<app-sound class="c-settings__category accordion-item"></app-sound>
	<app-navigation class="c-settings__category accordion-item"></app-navigation>
</section>
`;

class SettingsComponent extends HTMLElement {
	static observedAttributes = ['data-modes'];

	constructor() {
		super();

		this.appendChild(settingsLayout.content.cloneNode(true));
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-modes' === name) {
			this.openOrHideCategories(newValue);
			let selectedMode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
			let elements = this.querySelectorAll(".c-settings__category");
			const settings: string[] = Object.entries(JSON.parse(selectedMode))[0][1] as string[];
			elements.forEach((element) => {
				element.setAttribute('data-settings', JSON.stringify(settings));
			});
		}
	}

	openOrHideCategories = (mode: string): void => {
		categoriesServiceInstance.openMainCategory(JSON.parse(mode).selectedMode);
		categoriesServiceInstance.settingAccordions.forEach((accordion: AccordionState) => {
			this.querySelector(accordion.name).setAttribute('data-open', (!accordion.open).toString());
		});
	}
}

customElements.define('app-settings', SettingsComponent);
