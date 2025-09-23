"use strict";
const iconLayout = document.createElement('template');
iconLayout.innerHTML = `<svg fill="currentColor" aria-hidden="true" focusable="false"><use/></svg>`;
class IconComponent extends HTMLElement {
    static observedAttributes = ['data-name'];
    sprite = '';
    icon = '';
    size = '1.5em';
    constructor() {
        super();
        this.appendChild(iconLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.sprite = iconsServiceInstance.path;
        this.icon = this.dataset?.name || this.icon;
        this.size = this.dataset?.size || this.size;
        let svg = this.querySelector('svg');
        svg?.setAttribute('width', this.size);
        svg?.setAttribute('height', this.size);
        let use = this.querySelector('use');
        use?.setAttribute('href', `${this.sprite}#ic_${this.icon}`);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        let use = this.querySelector('use');
        if ('data-name' === name && newValue) {
            use?.setAttribute('href', `${this.sprite}#ic_${newValue}`);
        }
    }
}
customElements.define('app-icon', IconComponent);
