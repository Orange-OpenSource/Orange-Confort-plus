const settingsLayout: HTMLTemplateElement = document.createElement('template');
settingsLayout.innerHTML = `
<section id="categories" class="accordion mb-2">
	<app-text></app-text>
	<app-layout></app-layout>
	<app-picture-video></app-picture-video>
	<app-sound></app-sound>
	<app-pointer></app-pointer>
	<app-navigation></app-navigation>
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
			let elements = this.querySelectorAll("#categories > *");
			elements.forEach((element) => {
				element.setAttribute('data-settings', JSON.stringify(Object.entries(JSON.parse(newValue))[0][1]));
			});
		}
	}
}

customElements.define('app-settings', SettingsComponent);
