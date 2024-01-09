const settingsLayout: HTMLTemplateElement = document.createElement('template');
settingsLayout.innerHTML = `
<section class="accordion mb-2">
	<app-text class="c-settings__category"></app-text>
	<app-layout class="c-settings__category"></app-layout>
	<app-picture-video class="c-settings__category"></app-picture-video>
	<app-sound class="c-settings__category"></app-sound>
	<app-pointer class="c-settings__category"></app-pointer>
	<app-navigation class="c-settings__category"></app-navigation>
</section>
`;

class SettingsComponent extends HTMLElement {
	static observedAttributes = ['data-mode'];

	constructor() {
		super();

		this.appendChild(settingsLayout.content.cloneNode(true));
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-mode' === name) {
			let elements = this.querySelectorAll(".c-settings__category");
			const settings: string[] = Object.entries(JSON.parse(newValue))[0][1] as string[];
			elements.forEach((element) => {
				element.setAttribute('data-settings', JSON.stringify(settings));
			});
		}
	}
}

customElements.define('app-settings', SettingsComponent);
