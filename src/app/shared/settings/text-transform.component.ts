const tmplTextTransform: HTMLTemplateElement = document.createElement('template');
tmplTextTransform.innerHTML = `
<style>
		app-text-transform {
				margin-bottom: 1rem;
		}
</style>
<button type="button" id="normal-btn" data-i18n="default"></button>
<button type="button" id="first-letter-btn" data-i18n="firstLetter"></button>
<button type="button" id="lowercase-btn" data-i18n="lowercase"></button>
<button type="button" id="uppercase-btn" data-i18n="uppercase"></button>
`;

class TextTransformComponent extends HTMLElement {
	bodyElt: HTMLElement | null = null;

	normalBtn: HTMLElement = null;
	firstLetterBtn: HTMLElement = null;
	lowercaseBtn: HTMLElement = null;
	uppercaseBtn: HTMLElement = null;

	handler: any;

	constructor() {
		super();
		this.appendChild(tmplTextTransform.content.cloneNode(true));

		this.normalBtn = this.querySelector('#normal-btn');
		this.firstLetterBtn = this.querySelector('#first-letter-btn');
		this.lowercaseBtn = this.querySelector('#lowercase-btn');
		this.uppercaseBtn = this.querySelector('#uppercase-btn');

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.bodyElt = document.body;

		this.normalBtn?.addEventListener('click', this.handler);
		this.firstLetterBtn?.addEventListener('click', this.handler);
		this.lowercaseBtn?.addEventListener('click', this.handler);
		this.uppercaseBtn?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.normalBtn?.removeEventListener('click', this.handler);
		this.firstLetterBtn?.removeEventListener('click', this.handler);
		this.lowercaseBtn?.removeEventListener('click', this.handler);
		this.uppercaseBtn?.removeEventListener('click', this.handler);
	}

	private createHandler = () => {
		return (event: Event) => {
			if (event.type === 'click') {
				switch (event.currentTarget) {
					case this.normalBtn:
						this.bodyElt.style.textTransform = ``;
						break;
					case this.firstLetterBtn:
						this.bodyElt.style.textTransform = `capitalize`;
						break;
					case this.lowercaseBtn:
						this.bodyElt.style.textTransform = `lowercase`;
						break;
					case this.uppercaseBtn:
						this.bodyElt.style.textTransform = `uppercase`;
						break;
				}
			}
		}
	}
}

customElements.define('app-text-transform', TextTransformComponent);
