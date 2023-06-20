const tmplTextTransform: HTMLTemplateElement = document.createElement('template');
tmplTextTransform.innerHTML = `
<button id="normal-btn">Normal</button>
<button id="first-letter-btn">Première lettre</button>
<button id="lowercase-btn">Minuscule</button>
<button id="uppercase-btn">Majuscule</button>
`;

class TextTransformComponent extends HTMLElement {
    shadow: ShadowRoot = this.attachShadow({ mode: 'open' });

    constructor() {
        super();
        this.shadow.appendChild(tmplTextTransform.content.cloneNode(true));

        const normalBtn = this.shadow.getElementById('normal-btn');
        const firstLetterBtn = this.shadow.getElementById('first-letter-btn');
        const lowercaseBtn = this.shadow.getElementById('lowercase-btn');
        const uppercaseBtn = this.shadow.getElementById('uppercase-btn');
        const bodyElt = document.getElementsByTagName('body')[0];

        normalBtn?.addEventListener('click', () => {
            bodyElt.style.textTransform = ``;
        });

        firstLetterBtn?.addEventListener('click', () => {
            bodyElt.style.textTransform = `capitalize`;
        });

        lowercaseBtn?.addEventListener('click', () => {
            bodyElt.style.textTransform = `lowercase`;
        });

        uppercaseBtn?.addEventListener('click', () => {
            bodyElt.style.textTransform = `uppercase`;
        });
    }
}
customElements.define('app-text-transform', TextTransformComponent);
