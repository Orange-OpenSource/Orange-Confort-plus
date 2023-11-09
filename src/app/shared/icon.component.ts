const iconLayout: HTMLTemplateElement = document.createElement('template');
iconLayout.innerHTML = `<svg fill="currentColor" aria-hidden="true" focusable="false"><use/></svg>`;

class IconComponent extends HTMLElement {
	private sprite = 'assets/icons/orange-icons-sprite.svg';
	icon = '';
	size = '1.25rem';
	pathService: any;
	path: string;

	constructor() {
		super();

		// @ts-ignore
		this.pathService = new pathService();
		this.path = this.pathService.path;

		this.icon = this.dataset?.name || this.icon;
		this.size = this.dataset?.size || this.size;

		this.appendChild(iconLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		let svg = this.querySelector('svg');
		svg?.setAttribute('width', this.size);
		svg?.setAttribute('height', this.size);

		let use = svg?.querySelector('use');
		use?.setAttribute('href', `${this.path}${this.sprite}#ic_${this.icon}`);
	}
}

customElements.define('app-icon', IconComponent);
