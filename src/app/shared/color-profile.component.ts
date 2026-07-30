const colorProfileLayout: HTMLTemplateElement = document.createElement('template');
colorProfileLayout.innerHTML = `
	<section class="text-start">
		<h3 class="fs-6">Profil de couleurs</h3>
		<div class="${PREFIX}color-profile-rules-list d-flex flex-column gap-2"></div>
	</section>
`;

class ColorProfileComponent extends HTMLElement {
	static observedAttributes = ['data-profile', 'data-background'];
	constructor() {
		super();

		this.appendChild(colorProfileLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		if (this.dataset.profile) {
			this.renderProfile(this.dataset.profile);
		}
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ((name === 'data-profile' || name === 'data-background') && newValue) {
			this.renderProfile(this.dataset.profile);
		}
	}

	private renderProfile = (profileJson: string): void => {
		let profile = JsonProfile.from(JSON.parse(profileJson));
		let rules: ProcessFormatRule[] = profile.process?.flatMap(
			(step: ProcessStep) => step.format ?? []
		) ?? [];

		const rulesContainer = this.querySelector(`.${PREFIX}color-profile-rules-list`);
		if (rulesContainer) {
			rulesContainer.innerHTML = '';
		}

		rules.forEach((rule) => {
			const ruleElement = new ColorProfileRuleComponent();
			ruleElement.setAttribute('data-rule', JSON.stringify(rule));
			ruleElement.setAttribute('data-background', this.dataset.background || 'white');
			rulesContainer?.appendChild(ruleElement);
		});
	};
}

customElements.define('app-color-profile', ColorProfileComponent);
