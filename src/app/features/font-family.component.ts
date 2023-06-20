const tmplFontFamily: HTMLTemplateElement = document.createElement('template');
tmplFontFamily.innerHTML = `
<button id="normal-font">Normal</button>
<button id="arial-font">Arial</button>
<button id="open-font-font">Open Sans</button>
<button id="accessible-dfa-font">Accessible-DFA</button>
<button id="open-dyslexic-font">Open Dyslexic</button>
`;

class FontFamilyComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });

    constructor() {
        super();
        this.shadow.appendChild(tmplFontFamily.content.cloneNode(true));

        const normalBtn = this.shadow.getElementById('normal-font');
        const arialBtn = this.shadow.getElementById('arial-font');
        const openSansBtn = this.shadow.getElementById('open-font-font');
        const accessibleDFABtn = this.shadow.getElementById('accessible-dfa-font');
        const openDyslexicBtn = this.shadow.getElementById('open-dyslexic-font');

        const bodyElt = document.getElementsByTagName('body')[0];

        normalBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = ``;
        });

        arialBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `arial`;
        });

        openSansBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Open-Sans`;
        });

        accessibleDFABtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Accessible-DFA`;
        });

        openDyslexicBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Open-Dyslexic`;
        });
    }
}
customElements.define('app-font-family', FontFamilyComponent);
