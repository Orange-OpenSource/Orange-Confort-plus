const tmplMode: HTMLTemplateElement = document.createElement('template');
tmplMode.innerHTML = `
<div id="mode-content" class="sc-mode__setting-grid gap-2">
	<app-font-family class="c-mode__setting"></app-font-family>
	<app-increase-text-size class="c-mode__setting"></app-increase-text-size>
	<app-text-transform class="c-mode__setting"></app-text-transform>
	<app-reading-guide class="c-mode__setting"></app-reading-guide>
	<app-margin-align class="c-mode__setting"></app-margin-align>
</div>
`;

class ModeComponent extends HTMLElement {
	static observedAttributes = ['data-settings'];
	modeContent: HTMLElement | null = null;

	settingsDictionnary: any[] = [
		{ name: 'fontSize', element: 'app-increase-text-size' },
		{ name: 'textFont', element: 'app-font-family' },
		{ name: 'textTransform', element: 'app-text-transform' },
		{ name: 'readingGuide', element: 'app-reading-guide' },
		{ name: 'marginAlign', element: 'app-margin-align' },
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
		let elements = this.querySelectorAll(".c-mode__setting");
		elements.forEach((element) => {
			element.classList.add('d-none');
		});

		mode.forEach((setting: JSON) => {
			let settingObj = this.settingsDictionnary.find(o => o.name === Object.entries(setting)[0][0]);
			let settingElement: HTMLElement = this.querySelector(settingObj.element);

			settingElement.classList.remove('d-none');
			settingElement.setAttribute('data-setting', JSON.stringify(Object.entries(setting)[0][1]));
		});
	}
}

customElements.define('app-mode', ModeComponent);
