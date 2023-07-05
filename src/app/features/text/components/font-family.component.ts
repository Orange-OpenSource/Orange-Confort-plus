const tmplFontFamily: HTMLTemplateElement = document.createElement('template');
tmplFontFamily.innerHTML = `
<style>
    :host {
        margin-bottom: 1rem;
    }
</style>
<button id="normal-font">Normal</button>
<button id="arial-font">Arial</button>
<button id="open-font-font">Open Sans</button>
<button id="accessible-dfa-font">Accessible-DFA</button>
<button id="open-dyslexic-font">Open Dyslexic</button>
`;

class FontFamilyComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });

    normalBtn: HTMLElement | null = null;
    arialBtn: HTMLElement | null = null;
    openSansBtn: HTMLElement | null = null;
    accessibleDFABtn: HTMLElement | null = null;
    openDyslexicBtn: HTMLElement | null = null;

    constructor() {
        super();
        this.shadow.appendChild(tmplFontFamily.content.cloneNode(true));

        let head: HTMLHeadElement = document.head || document.getElementsByTagName('head')[0];
        let styles: HTMLStyleElement = document.createElement('style');
        head.appendChild(styles);
        styles.innerHTML = '@font-face{font-family:"Accessible-DFA";src:url("./assets/fonts/AccessibleDfA-Regular.woff2");font-display:swap}@font-face{font-family:"Open-Dyslexic";src:url("./assets/fonts/OpenDyslexic-Regular.woff2");font-display:swap}@font-face{font-family:"Open-Sans";src:url("./assets/fonts/OpenSans-Regular.woff2");font-display:swap}';

        this.normalBtn = this.shadow.getElementById('normal-font');
        this.arialBtn = this.shadow.getElementById('arial-font');
        this.openSansBtn = this.shadow.getElementById('open-font-font');
        this.accessibleDFABtn = this.shadow.getElementById('accessible-dfa-font');
        this.openDyslexicBtn = this.shadow.getElementById('open-dyslexic-font');
    }

    connectedCallback(): void {
        const bodyElt = document.getElementsByTagName('body')[0];

        this.normalBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = ``;
        });

        this.arialBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `arial`;
        });

        this.openSansBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Open-Sans`;
        });

        this.accessibleDFABtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Accessible-DFA`;
        });

        this.openDyslexicBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Open-Dyslexic`;
        });
    }

    disconnectedCallback(): void {
        this.normalBtn?.removeEventListener('click', () => {});
        this.arialBtn?.removeEventListener('click', () => {});
        this.openSansBtn?.removeEventListener('click', () => {});
        this.accessibleDFABtn?.removeEventListener('click', () => {});
        this.openDyslexicBtn?.removeEventListener('click', () => {});
    }
}
customElements.define('app-font-family', FontFamilyComponent);
