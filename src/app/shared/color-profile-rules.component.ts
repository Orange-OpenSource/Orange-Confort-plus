const colorProfileRulesLayout: HTMLTemplateElement = document.createElement('template');
colorProfileRulesLayout.innerHTML = `
	<div class="d-flex flex-column gap-1" role="list"></div>
`;

class ColorProfileRulesComponent extends HTMLElement {
	static observedAttributes = ['data-profile'];

	listElement: HTMLElement | null = null;
	profile: JsonProfile | null = null;

	constructor() {
		super();

		this.appendChild(colorProfileRulesLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.listElement = this.querySelector('[role="list"]');
		this.render();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (name === 'data-profile' && newValue) {
			try {
				this.profile = JsonProfile.from(JSON.parse(newValue));
			} catch {
				this.profile = null;
			}
			this.render();
		}
	}

	private formatExample(example: string | string[] | undefined): string | null {
		if (!example) {
			return null;
		}
		return Array.isArray(example) ? example.join(', ') : example;
	}

	private createRuleRow(rule: ProcessFormatRule): HTMLElement {
		const row = document.createElement('div');
		row.className = 'd-flex align-items-start gap-2 py-1 px-2 border rounded';
		row.setAttribute('role', 'listitem');

		const content = document.createElement('div');
		content.className = 'flex-grow-1 small d-flex flex-column';

		const phonemesLine = document.createElement('div');
		rule.phonemes!.forEach((phoneme, index) => {
			if (index > 0) {
				phonemesLine.appendChild(document.createTextNode(', '));
			}
			const code = document.createElement('code');
			code.textContent = phoneme;
			phonemesLine.appendChild(code);
		});
		content.appendChild(phonemesLine);

		const exampleText = this.formatExample(rule.example);
		if (exampleText) {
			const example = document.createElement('div');
			example.className = 'text-muted small mt-1';
			example.textContent = `Ex. : ${exampleText}`;
			content.appendChild(example);
		}

		row.appendChild(content);

		const colorSwatch = document.createElement('div');
		colorSwatch.setAttribute('aria-label', rule.color || '');
		colorSwatch.style.flexShrink = '0';
		colorSwatch.style.width = '2.5rem';
		colorSwatch.style.height = '1.25rem';
		colorSwatch.style.borderRadius = '0.25rem';
		colorSwatch.style.backgroundColor = rule.color || 'transparent';
		if (rule.color) {
			colorSwatch.style.border = '1px solid rgba(0, 0, 0, 0.15)';
		}
		row.appendChild(colorSwatch);

		return row;
	}

	render = (): void => {
		if (!this.listElement) {
			return;
		}

		this.listElement.innerHTML = '';

		if (!this.profile?.process?.length) {
			return;
		}

		this.profile.process.forEach(process => {
			process.format?.forEach(rule => {
				if (!rule.phonemes?.length) {
					return;
				}
				this.listElement!.appendChild(this.createRuleRow(rule));
			});
		});
	};
}

customElements.define('app-color-profile-rules', ColorProfileRulesComponent);
