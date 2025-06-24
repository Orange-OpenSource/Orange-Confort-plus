const tmplMode: HTMLTemplateElement = document.createElement('template');
tmplMode.innerHTML = `
<div id="mode-content" class="sc-mode__setting-grid gap-2">
	<app-font-family class="sc-mode__setting d-none"></app-font-family>
	<app-text-size class="sc-mode__setting d-none"></app-text-size>
	<app-capital-letters class="sc-mode__setting d-none"></app-capital-letters>
	<app-text-spacing class="sc-mode__setting d-none"></app-text-spacing>
	<app-reading-guide class="sc-mode__setting d-none"></app-reading-guide>
	<app-margin-align class="sc-mode__setting d-none"></app-margin-align>
	<app-magnifier class="sc-mode__setting d-none"></app-magnifier>
	<app-read-aloud class="sc-mode__setting d-none"></app-read-aloud>
	<app-cursor-aspect class="sc-mode__setting d-none"></app-cursor-aspect>
	<app-focus-aspect class="sc-mode__setting d-none"></app-focus-aspect>
	<app-color-contrast class="sc-mode__setting d-none"></app-color-contrast>
	<app-link-style class="sc-mode__setting d-none"></app-link-style>
	<app-clearly-links class="sc-mode__setting d-none"></app-clearly-links>
	<app-stop-animations class="sc-mode__setting d-none"></app-stop-animations>
	<app-delete-background-images class="sc-mode__setting d-none"></app-delete-background-images>
	<app-scroll-aspect class="sc-mode__setting d-none"></app-scroll-aspect>
	<app-navigation-buttons class="sc-mode__setting d-none"></app-navigation-buttons>
	<app-click-facilite class="sc-mode__setting d-none"></app-click-facilite>
	<app-navigation-auto class="sc-mode__setting d-none"></app-navigation-auto>
	<app-zoom class="sc-mode__setting d-none"></app-zoom>
</div>
`;

class ModeComponent extends HTMLElement {
	static observedAttributes = ['data-settings', 'data-pause'];
	modeContent: HTMLElement | null = null;
	settingsDictionnary: SettingsDictionnary[] = [];

	constructor() {
		super();

		this.appendChild(tmplMode.content.cloneNode(true));

		this.querySelectorAll('.sc-mode__setting').forEach((element: Element) => {
			this.settingsDictionnary.push({ name: stringServiceInstance.normalizeSettingName(element.tagName), element: element.tagName });
		});
	}

	connectedCallback(): void {
		this.modeContent = this.querySelector('#mode-content');
	}

	disconnectedCallback(): void {
		this.modeContent.innerHTML = '';
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings' === name && newValue) {
			this.displaySettings(JSON.parse(newValue));
		}
		if ('data-pause' === name) {
			this.disableSettings(newValue === 'true');
		}
	}

	displaySettings = (settings: any[]): void => {
		let orderedElements: Element[] = [];
		let othersElements: Element[] = [];

		settings.forEach((setting: any) => {
			const settingObj: SettingModel = Object.values(setting)[0] as SettingModel;
			let settingName = Object.keys(setting)[0];
			let settingRef = this.settingsDictionnary.find((o: SettingsDictionnary) => o.name === stringServiceInstance.normalizeSettingName(settingName));
			let settingElement: HTMLElement = this.querySelector(settingRef?.element);

			if (settingElement) {
				settingElement.setAttribute('data-values', JSON.stringify(settingObj));
				settingElement.classList.toggle('d-none', !settingObj.isTool);
				settingObj.order ? orderedElements[settingObj.order - 1] = settingElement : othersElements.push(settingElement);
				settingElement.remove();
			}
		});

		const elementsToDisplay = orderedElements.filter(el => el).concat(othersElements);
		elementsToDisplay.forEach((element: Element) => {
			this.modeContent.appendChild(element);
		});
	}

	disableSettings = (disabled: boolean): void => {
		let elements = this.querySelectorAll('.sc-mode__setting');
		elements.forEach((element) => {
			element.querySelector('app-btn-setting').setAttribute('data-disabled', String(disabled));
		});
	}
}

customElements.define('app-mode', ModeComponent);
