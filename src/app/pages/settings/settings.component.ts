const settingsLayout: HTMLTemplateElement = document.createElement('template');
settingsLayout.innerHTML = `
	<section class="accordion mb-2">
		<app-text class="c-settings__category accordion-item"></app-text>
		<app-layout class="c-settings__category accordion-item"></app-layout>
		<app-picture-video class="c-settings__category accordion-item"></app-picture-video>
		<app-sound class="c-settings__category accordion-item"></app-sound>
		<app-navigation class="c-settings__category accordion-item"></app-navigation>
		<div class="border-top border-light border-1"></div>
	</section>

	<div class="p-3">
		<button id="${PREFIX}reset-mode" type="button" class="btn btn-secondary w-100" data-i18n="resetThisMode" data-i18n-title="resetThisModeTitle"></button>
	</div>

`;

class SettingsComponent extends HTMLElement {
	static observedAttributes = ['data-modes'];
	resetModeElement: HTMLButtonElement | null = null;
	selectedMode = '';
	handler: any;

	constructor() {
		super();

		this.appendChild(settingsLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.resetModeElement = this.querySelector(`#${PREFIX}reset-mode`);
		this.resetModeElement.addEventListener('click', this.handler);
		this.addEventListener('collapsedCategory', this.handler);
	}

	disconnectedCallback(): void {
		this.removeEventListener('collapsedCategory', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-modes' === name) {
			this.openOrHideCategories(newValue);
			this.selectedMode = JSON.parse(newValue).selectedMode;
			let mode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
			let elements = this.querySelectorAll(".c-settings__category");
			const settings: string[] = Object.entries(JSON.parse(mode))[0][1] as string[];
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

	private createHandler = () => {
		return (event: Event) => {
			switch (event.type) {
				case 'collapsedCategory':
					categoriesServiceInstance.settingAccordions.forEach((accordion: AccordionState) => {
						this.querySelector(accordion.name).setAttribute('data-open', (!accordion.open).toString());
					});
					break;
				case 'click':
					modeOfUseServiceInstance.setSelectedMode(this.selectedMode);
					break;
			}
		}
	}
}

customElements.define('app-settings', SettingsComponent);
