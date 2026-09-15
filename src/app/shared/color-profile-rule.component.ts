const colorProfileRuleLayout = document.createElement('template');
colorProfileRuleLayout.innerHTML = `
<div id="${PREFIX}color-read-profile-rule-card" class="card border-black flex-row align-items-center justify-content-between w-100 ps-2">
  <div class="d-flex flex-column w-75 fs-7">
  	<span id="${PREFIX}color-read-profile-rule-phonetics"></span>
		<span id="${PREFIX}color-read-profile-rule-example"></span>
  </div>
  <button
  	type="button"
  	id="${PREFIX}color-read-profile-rule-color"
  	class="${PREFIX}color-read-profile-rule-swatch border-0 p-0 flex-shrink-0"
  	aria-haspopup="dialog"
  	aria-expanded="false"
  	style="width: 3.5em; aspect-ratio: 1"
	></button>
</div>

`;

class ColorProfileRuleComponent extends HTMLElement {
	static observedAttributes = ['data-rule', 'data-background'];

	rule: ProcessFormatRule;
	handler: any;

	private swatchBtn: HTMLButtonElement | null = null;

	constructor() {
		super();

		this.appendChild(colorProfileRuleLayout.content.cloneNode(true));

		this.swatchBtn = this.querySelector(`#${PREFIX}color-read-profile-rule-color`);

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.swatchBtn?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.swatchBtn?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string
	): void {
		if (name === 'data-rule' && newValue) {
			this.rule = JSON.parse(newValue) as ProcessFormatRule;
		}
		this.renderRule();
	}

	/** Applique une nouvelle couleur à la règle affichée, sans recréer l'élément. */
	setColor = (color: string): void => {
		if (!this.rule || !color) {
			return;
		}
		this.rule.color = color;
		this.setAttribute('data-rule', JSON.stringify(this.rule));
	};

	/** Reflète l'état d'ouverture du sélecteur de couleur associé à cette pastille. */
	setPickerExpanded = (expanded: boolean): void => {
		this.swatchBtn?.setAttribute('aria-expanded', String(expanded));
	};

	focusSwatch = (): void => {
		this.swatchBtn?.focus();
	};

	private renderRule(): void {
		const bgColor = this.dataset.background || 'white';
		const card = this.querySelector(`#${PREFIX}color-read-profile-rule-card`);
		if (card) {
			card.classList.remove('bg-white', 'bg-black');
			card.classList.add(`bg-${bgColor}`);
		}

		this.querySelector(`#${PREFIX}color-read-profile-rule-phonetics`).textContent = this.rule.phonetics;
		this.querySelector(`#${PREFIX}color-read-profile-rule-example`).textContent =
			Array.isArray(this.rule.example) ? this.rule.example.join(', ') : this.rule.example;

		const phoneticEl = this.querySelector(`#${PREFIX}color-read-profile-rule-phonetics`) as HTMLElement;
		const exampleEl = this.querySelector(`#${PREFIX}color-read-profile-rule-example`) as HTMLElement;
		phoneticEl.style.color = this.rule.color;
		exampleEl.style.color = this.rule.color;

		(this.querySelector(`#${PREFIX}color-read-profile-rule-color`) as HTMLElement).style.backgroundColor =
			this.rule.color;
		this.swatchBtn?.setAttribute(
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
