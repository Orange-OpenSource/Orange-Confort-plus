const colorProfileLayout: HTMLTemplateElement = document.createElement('template');
colorProfileLayout.innerHTML = `
	<section class="text-start">
		<h3 class="fs-6">Profil de couleurs</h3>
		<pre class="bg-light border rounded p-3 overflow-auto"><code></code></pre>
	</section>
`;

class ColorProfileComponent extends HTMLElement {
	static observedAttributes = ['data-profile'];

	codeElement: HTMLElement | null = null;
	profile: JsonProfile = null;

	constructor() {
		super();

		this.appendChild(colorProfileLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.codeElement = this.querySelector('code');
		this.renderProfile();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (name === 'data-profile') {
			this.profile = JsonProfile.from(JSON.parse(newValue));
			console.log('Profile.process[0].format[0].phonemes', this.profile.process[0].format[0].phonemes);
			this.renderProfile();
		}
	}

	renderProfile = (): void => {
		if (!this.codeElement || (!this.profile && this.profile.process.length === 0)) {
			return;
		}

		this.profile.process.forEach(process => {
			process.format.forEach(format => {
				this.codeElement.innerText += JSON.stringify(format, null, 2) + '\n';
				});
		});
	}
}

customElements.define('app-color-profile', ColorProfileComponent);
