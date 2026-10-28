const colorProfileRuleLayout = document.createElement('template');
colorProfileRuleLayout.innerHTML = `
<button
	type="button"
	id="${PREFIX}color-read-profile-rule-card"
	class="${PREFIX}color-read-profile-rule-card btn btn-outline-secondary card border-black flex-row align-items-center justify-content-between w-100 text-start py-0 pe-0 ps-2"
	aria-haspopup="dialog"
	aria-expanded="false"
>
	<span class="d-flex flex-column w-75 fs-7">
		<span id="${PREFIX}color-read-profile-rule-phonetics"></span>
		<span id="${PREFIX}color-read-profile-rule-example"></span>
	</span>
	<span
		id="${PREFIX}color-read-profile-rule-color"
		class="${PREFIX}color-read-profile-rule-swatch d-block flex-shrink-0"
		aria-hidden="true"
		style="width: 3.5em; aspect-ratio: 1"
	></span>
</button>
`;

class ColorProfileRuleComponent extends HTMLElement {
	static observedAttributes = ['data-rule', 'data-background'];

	rule: ProcessFormatRule;
	handler: any;

	private cardBtn: HTMLButtonElement | null = null;
	private swatch: HTMLElement | null = null;

	constructor() {
		super();

		this.appendChild(colorProfileRuleLayout.content.cloneNode(true));

		this.cardBtn = this.querySelector(`#${PREFIX}color-read-profile-rule-card`);
		this.swatch = this.querySelector(`#${PREFIX}color-read-profile-rule-color`);

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.cardBtn?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.cardBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string
	): void {
		if (name === 'data-rule' && newValue) {
			this.rule = JSON.parse(newValue) as ProcessFormatRule;
		}
		this.renderRule();
	}

	/** Applique une nouvelle couleur à la règle affichée, sans recréer l'élément ; vide = règle sans couleur. */
	setColor = (color: string): void => {
		if (!this.rule) {
			return;
		}
		this.rule.color = color || '';
		this.setAttribute('data-rule', JSON.stringify(this.rule));
	};

	/** Reflète l'état d'ouverture du sélecteur de couleur associé à cette tuile. */
	setPickerExpanded = (expanded: boolean): void => {
		this.cardBtn?.setAttribute('aria-expanded', String(expanded));
	};

	focusCard = (): void => {
		this.cardBtn?.focus();
	};

	private renderRule(): void {
		/* Fond sombre : variante inversée du bouton Boosted */
		this.cardBtn?.classList.toggle('btn-inverse', this.dataset.background === 'black');

		this.querySelector(`#${PREFIX}color-read-profile-rule-phonetics`).textContent = this.rule.phonetics;
		this.querySelector(`#${PREFIX}color-read-profile-rule-example`).textContent =
			Array.isArray(this.rule.example) ? this.rule.example.join(', ') : this.rule.example;

		const phoneticEl = this.querySelector(`#${PREFIX}color-read-profile-rule-phonetics`) as HTMLElement;
		const exampleEl = this.querySelector(`#${PREFIX}color-read-profile-rule-example`) as HTMLElement;
		phoneticEl.style.color = this.rule.color;
		exampleEl.style.color = this.rule.color;

		if (this.swatch) {
			this.swatch.style.backgroundColor = this.rule.color;
			this.swatch.classList.toggle(`${PREFIX}color-read-profile-rule-swatch-empty`, !this.rule.color);
		}
		this.cardBtn?.setAttribute(
			'aria-label',
			i18nServiceInstance.getMessage('colorProfileRule_editColor', [this.rule.phonetics])
		);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'click':
					event.preventDefault();
					this.dispatchEvent(new CustomEvent('colorRuleClick', {
						bubbles: true,
						composed: true,
						detail: {
							rule: this.rule,
							ruleKey: colorReadServiceInstance.getRuleKey(this.rule)
						}
					}));
					break;
			}
		}
	}

}

customElements.define('app-color-profile-rule', ColorProfileRuleComponent);
