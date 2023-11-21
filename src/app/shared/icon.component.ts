const iconLayout: HTMLTemplateElement = document.createElement('template');
iconLayout.innerHTML = `<svg fill="currentColor" aria-hidden="true" focusable="false"><use/></svg>`;

class IconComponent extends HTMLElement {
	static observedAttributes = ['data-name'];
	sprite = '';
	iconService: any;
	icon = '';
	size = '1.25rem';

	constructor() {
		super();

		// @ts-ignore
		this.iconService = new iconsService();
		this.sprite = this.iconService.path;

		this.icon = this.dataset?.name || this.icon;
		this.size = this.dataset?.size || this.size;

		this.appendChild(iconLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		let svg = this.querySelector('svg');
		svg?.setAttribute('width', this.size);
		svg?.setAttribute('height', this.size);

		let use = this.querySelector('use');
		use?.setAttribute('href', `${this.sprite}#ic_${this.icon}`);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		let use = this.querySelector('use');
		if ('data-name' === name) {
			use?.setAttribute('href', `${this.sprite}#ic_${newValue}`);
		}
	}
}

customElements.define('app-icon', IconComponent);
