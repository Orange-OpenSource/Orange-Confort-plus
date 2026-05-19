const colorProfileLayout: HTMLTemplateElement = document.createElement('template');
colorProfileLayout.innerHTML = `
	<section class="text-start">
		<h3 class="fs-6">Profil de couleurs</h3>
		<app-color-profile-rules></app-color-profile-rules>
	</section>
`;

class ColorProfileComponent extends HTMLElement {
	static observedAttributes = ['data-profile'];

	rulesElement: HTMLElement | null = null;

	constructor() {
		super();

		this.appendChild(colorProfileLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.rulesElement = this.querySelector('app-color-profile-rules');
		if (this.dataset.profile) {
			this.propagateProfile(this.dataset.profile);
		}
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (name === 'data-profile' && newValue) {
			this.propagateProfile(newValue);
		}
	}

	private propagateProfile(profileJson: string): void {
		this.rulesElement?.setAttribute('data-profile', profileJson);
	}
}

customElements.define('app-color-profile', ColorProfileComponent);
