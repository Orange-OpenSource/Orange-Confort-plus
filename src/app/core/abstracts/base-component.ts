export abstract class BaseComponent extends HTMLElement {
    protected shadow: ShadowRoot = this.attachShadow({ mode: 'open' });
}
