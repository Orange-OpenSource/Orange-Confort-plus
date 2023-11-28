const settingsLayout: HTMLTemplateElement = document.createElement('template');
settingsLayout.innerHTML = `
<section class="d-flex flex-column p-3 mb-2">
	<app-text></app-text>
	<app-layout></app-layout>
	<app-picture-video></app-picture-video>
	<app-sound></app-sound>
	<app-pointer></app-pointer>
</section>
`;

class SettingsComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(settingsLayout.content.cloneNode(true));
	}
}

customElements.define('app-settings', SettingsComponent);
