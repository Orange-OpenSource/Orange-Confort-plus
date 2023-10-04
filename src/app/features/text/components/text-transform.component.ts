const tmplTextTransform: HTMLTemplateElement = document.createElement('template');
tmplTextTransform.innerHTML = `
<style>
    app-text-transform {
        margin-bottom: 1rem;
    }
</style>
<button id="normal-btn">Normal</button>
<button id="first-letter-btn">Première lettre</button>
<button id="lowercase-btn">Minuscule</button>
<button id="uppercase-btn">Majuscule</button>
`;

class TextTransformComponent extends HTMLElement {
	normalBtn: HTMLElement | null = null;
	firstLetterBtn: HTMLElement | null = null;
	lowercaseBtn: HTMLElement | null = null;
	uppercaseBtn: HTMLElement | null = null;

	constructor() {
		super();
		this.appendChild(tmplTextTransform.content.cloneNode(true));

		this.normalBtn = this.querySelector('#normal-btn');
		this.firstLetterBtn = this.querySelector('#first-letter-btn');
		this.lowercaseBtn = this.querySelector('#lowercase-btn');
		this.uppercaseBtn = this.querySelector('#uppercase-btn');
	}

	connectedCallback(): void {
		const bodyElt = document.getElementsByTagName('body')[0];

		this.normalBtn?.addEventListener('click', () => {
			bodyElt.style.textTransform = ``;
		});

		this.firstLetterBtn?.addEventListener('click', () => {
			bodyElt.style.textTransform = `capitalize`;
		});

		this.lowercaseBtn?.addEventListener('click', () => {
			bodyElt.style.textTransform = `lowercase`;
		});

		this.uppercaseBtn?.addEventListener('click', () => {
			bodyElt.style.textTransform = `uppercase`;
		});
	}

	disconnectedCallback(): void {
		this.normalBtn?.removeEventListener('click', () => {
		});
		this.firstLetterBtn?.removeEventListener('click', () => {
		});
		this.lowercaseBtn?.removeEventListener('click', () => {
		});
		this.uppercaseBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-text-transform', TextTransformComponent);
