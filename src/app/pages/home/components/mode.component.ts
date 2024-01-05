const tmplMode: HTMLTemplateElement = document.createElement('template');
tmplMode.innerHTML = `
<div id="mode-content" class="sc-mode__setting-grid gap-2">
	<app-font-family class="sc-mode__setting"></app-font-family>
	<app-increase-text-size class="sc-mode__setting"></app-increase-text-size>
	<app-spacing-text class="sc-mode__setting"></app-spacing-text>
	<app-reading-guide class="sc-mode__setting"></app-reading-guide>
	<app-margin-align class="sc-mode__setting"></app-margin-align>
	<app-focus-aspect class="sc-mode__setting"></app-focus-aspect>
	<app-color-contrast class="sc-mode__setting"></app-color-contrast>
	<app-cursor-aspect class="sc-mode__setting"></app-cursor-aspect>
	<app-scroll class="sc-mode__setting"></app-scroll>
	<app-link-style class="sc-mode__setting"></app-link-style>
</div>
`;

class ModeComponent extends HTMLElement {
	static observedAttributes = ['data-settings'];
	modeContent: HTMLElement | null = null;

	settingsDictionnary: any[] = [
		{ name: 'textSize', element: 'app-increase-text-size' },
		{ name: 'textFont', element: 'app-font-family' },
		{ name: 'spacingText', element: 'app-spacing-text' },
		{ name: 'readingGuide', element: 'app-reading-guide' },
		{ name: 'marginAlign', element: 'app-margin-align' },
		{ name: 'focusAspect', element: 'app-focus-aspect' },
		{ name: 'colorContrast', element: 'app-color-contrast' },
		{ name: 'cursorAspect', element: 'app-cursor-aspect' },
		{ name: 'scroll', element: 'app-scroll' },
		{ name: 'linkStyle', element: 'app-link-style' },
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
			this.displaySettings(JSON.parse(newValue));
		}
	}

	displaySettings = (settings: any[]): void => {
		let elements = this.querySelectorAll(".sc-mode__setting");
		elements.forEach((element) => {
			element.classList.add('d-none');
		});

		settings.forEach((setting: any) => {
			let settingObj = this.settingsDictionnary.find(o => o.name === Object.keys(setting)[0]);
			let settingElement: HTMLElement = this.querySelector(settingObj?.element);
			settingElement.setAttribute('data-values', JSON.stringify(Object.entries(setting)[0][1]));

			settingElement?.classList.remove('d-none');
		});
	}
}

customElements.define('app-mode', ModeComponent);
