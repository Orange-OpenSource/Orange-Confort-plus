"use strict";
const btnModalLayout = document.createElement('template');
btnModalLayout.innerHTML = `
	<button type="button" class="btn btn-primary pe-4" data-i18n="moreChoice">
	</button>`;
class BtnModalComponent extends HTMLElement {
    static observedAttributes = ['data-name', 'data-disabled'];
    modalBtn = null;
    settingName = null;
    indexValue = null;
    disabled = false;
    handler;
    constructor() {
        super();
        this.disabled = (this.dataset?.disabled === 'true') || this.disabled;
        this.appendChild(btnModalLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.modalBtn = this.querySelector('button');
        this.modalBtn?.addEventListener('click', this.handler);
        this.modalBtn.disabled = this.disabled;
    }
    disconnectedCallback() {
        this.modalBtn?.removeEventListener('click', this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ('data-name' === name) {
            this.settingName = newValue;
        }
    }
    setA11yName = (label) => {
        let span = document.createElement('span');
        span.classList.add('visually-hidden');
        span.innerText = label;
        this.modalBtn?.appendChild(span);
        this.modalBtn.setAttribute('title', label);
    };
    createHandler = () => {
        return (event) => {
            if (event.type === 'click') {
                switch (event.currentTarget) {
                    case this.modalBtn:
                        let clickEvent = new CustomEvent('changeRoute', {
                            bubbles: true,
                            detail: {
                                route: PAGE_EDIT_SETTING,
                                setting: this.settingName
                            }
                        });
                        this.modalBtn?.dispatchEvent(clickEvent);
                        break;
                }
            }
        };
    };
}
customElements.define('app-btn-modal', BtnModalComponent);
