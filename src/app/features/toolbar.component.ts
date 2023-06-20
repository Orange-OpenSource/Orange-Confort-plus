const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<style>
    :host {
        color: white;
        background: black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: calc(20vw - 2rem);
        height: calc(100vh - 2rem);
        padding: 1rem;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999;
    }
</style>
    <button id="close-toolbar" class="c-btn">Fermer</button>
<app-increase-text-size></app-increase-text-size>
<app-text-transform></app-text-transform>
<app-font-family></app-font-family>
<app-reading-guide></app-reading-guide>
<app-reset-parameters></app-reset-parameters>
`;

class ToolbarComponent extends HTMLElement {
    shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
    closeBtn: HTMLElement | null = null;

    constructor() {
        super();
        this.shadow.appendChild(tmplToolbar.content.cloneNode(true));

        // const styles: CSSStyleSheet = new CSSStyleSheet();
        // styles.replaceSync('button { color: red; }');
        // // styles.replaceSync('@import url("../dist/css/styles.css")');
        // console.log(styles);
        // this.shadow.adoptedStyleSheets = [styles];
        // console.log(this.shadow.styleSheets);
        // console.log(this.shadow.styleSheets.length);
    }

    connectedCallback(): void {
        this.closeBtn = this.shadow.getElementById('close-toolbar');

        this.closeBtn?.addEventListener('click', () => {
            let clickEvent = new CustomEvent('closeEvent', { detail: true });
            tmplToolbar.dispatchEvent(clickEvent);
        });
    }

    disconnectedCallback(): void {
        this.closeBtn?.removeEventListener('click', () => {});
    }
}
customElements.define('app-toolbar', ToolbarComponent);
