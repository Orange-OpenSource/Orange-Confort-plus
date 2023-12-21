const tmplMode: HTMLTemplateElement = document.createElement('template');
tmplMode.innerHTML = `
<div id="mode-content" class="sc-mode__setting-grid gap-2 mb-2">
	<app-font-family></app-font-family>
	<app-increase-text-size></app-increase-text-size>
	<app-text-transform></app-text-transform>
	<app-reading-guide></app-reading-guide>
</div>
`;

class ModeComponent extends HTMLElement {
	static observedAttributes = ['data-settings'];
	modeContent: HTMLElement | null = null;

	settingsDictionnary: any[] = [
		{ name: 'fontSize', element: 'app-font-family' },
		{ name: 'textFont', element: 'app-increase-text-size' },
		{ name: 'textTransform', element: 'app-text-transform' },
		{ name: 'readingGuide', element: 'app-reading-guide' },
	];

	constructor() {
		super();

		this.appendChild(tmplMode.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.modeContent = this.querySelector('#mode-content');
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings' === name) {
			this.setSettings(JSON.parse(newValue));
		}
	}

	setSettings = (mode: []): void => {
		let allElement = this.querySelectorAll("#mode-content > *");
		allElement.forEach((element) => {
			element.classList.add('d-none');
		});

		mode.forEach((setting) => {
			let settingObj = this.settingsDictionnary.find(o => o.name === Object.entries(setting)[0][0]);
			let settingElement: HTMLElement = this.querySelector(settingObj.element);

			settingElement.classList.remove('d-none');
			settingElement.setAttribute('data-values', JSON.stringify(Object.entries(setting)[0][1]));
		});
	}
}

customElements.define('app-mode', ModeComponent);
