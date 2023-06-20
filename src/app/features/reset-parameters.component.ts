const tmplResetParameters: HTMLTemplateElement = document.createElement('template');
tmplResetParameters.innerHTML = `
<button id="reset-btn">Réinitialiser</button>
`;

class ResetParametersComponent extends HTMLElement {
    shadow: ShadowRoot = this.attachShadow({mode: 'open'});

    constructor() {
        super();
        this.shadow.appendChild(tmplResetParameters.content.cloneNode(true));

        const resetBtn = this.shadow.getElementById('reset-btn');
        const bodyElt = document.getElementsByTagName('body')[0];

        resetBtn?.addEventListener('click', () => {
            bodyElt.removeAttribute('style');
        });
    }
}
customElements.define('app-reset-parameters', ResetParametersComponent);
