const colorProfileRuleLayout = document.createElement('template');
colorProfileRuleLayout.innerHTML = `
<div id="${PREFIX}color-read-profile-rule-card" class="card border-black flex-row align-items-center justify-content-between w-100 ps-2">
  <div class="d-flex flex-column w-75 fs-7">
  	<span id="${PREFIX}color-read-profile-rule-phonetics"></span>
		<span id="${PREFIX}color-read-profile-rule-example"></span>
  </div>
  <div
  	id="${PREFIX}color-read-profile-rule-color"
  	class="ratio ratio-1x1 flex-shrink-0"
  	style="width: 3.5em"
	></div>
</div>

`;

class ColorProfileRuleComponent extends HTMLElement {
	static observedAttributes = ['data-rule', 'data-background'];

	rule: ProcessFormatRule;
	handler: any;
	constructor() {
		super();

		this.appendChild(colorProfileRuleLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string
	): void {
		if (name === 'data-rule' && newValue) {
			this.rule = JSON.parse(newValue) as ProcessFormatRule;
		}
		this.renderRule();
	}

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
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'EVENT1':
					// TODO
					break;
				case 'EVENT2':
					// TODO
					break;
			}
		}
	}

}

customElements.define('app-color-profile-rule', ColorProfileRuleComponent);
