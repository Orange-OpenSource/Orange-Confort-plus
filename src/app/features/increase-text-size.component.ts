const tmplIncreaseTextSize: HTMLTemplateElement = document.createElement('template');
tmplIncreaseTextSize.innerHTML = `
<button id="reduce-btn">Réduire</button>
<button id="grow-btn">Agrandir</button>
`;

class IncreaseTextSizeComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    fontSize = 16;

    constructor() {
        super();
        this.shadow.appendChild(tmplIncreaseTextSize.content.cloneNode(true));

        const reduceBtn = this.shadow.getElementById('reduce-btn');
        const growBtn = this.shadow.getElementById('grow-btn');
        const bodyElt = document.getElementsByTagName('body')[0];

        reduceBtn?.addEventListener('click', () => {
            this.fontSize--;
            if (this.fontSize <= 10) {
                this.fontSize = 10;
            }
            bodyElt.style.fontSize = `${ this.fontSize }px`;
        });

        growBtn?.addEventListener('click', () => {
            this.fontSize++;
            bodyElt.style.fontSize = `${ this.fontSize }px`;
        });
    }
}
customElements.define('app-increase-text-size', IncreaseTextSizeComponent);
