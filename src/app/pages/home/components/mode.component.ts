const tmplMode: HTMLTemplateElement = document.createElement('template');
tmplMode.innerHTML = `
<div id="mode-content" class="sc-mode__setting-grid gap-2">
	<app-font-family class="sc-mode__setting"></app-font-family>
	<app-text-size class="sc-mode__setting"></app-text-size>
	<app-capital-letters class="sc-mode__setting"></app-capital-letters>
	<app-text-spacing class="sc-mode__setting"></app-text-spacing>
	<app-reading-guide class="sc-mode__setting"></app-reading-guide>
	<app-margin-align class="sc-mode__setting"></app-margin-align>
	<app-magnifier class="sc-mode__setting"></app-magnifier>
	<app-read-aloud class="sc-mode__setting"></app-read-aloud>
	<app-text-color class="sc-mode__setting"></app-text-color>
	<app-colour-theme class="sc-mode__setting"></app-colour-theme>
	<app-cursor-aspect class="sc-mode__setting"></app-cursor-aspect>
	<app-focus-aspect class="sc-mode__setting"></app-focus-aspect>
	<app-color-contrast class="sc-mode__setting"></app-color-contrast>
	<app-link-style class="sc-mode__setting"></app-link-style>
	<app-clearly-links class="sc-mode__setting"></app-clearly-links>
	<app-stop-animations class="sc-mode__setting"></app-stop-animations>
	<app-delete-background-images class="sc-mode__setting"></app-delete-background-images>
	<app-scroll class="sc-mode__setting"></app-scroll>
	<app-skip-to-content class="sc-mode__setting"></app-skip-to-content>
	<app-navigation-buttons class="sc-mode__setting"></app-navigation-buttons>
	<app-scroll-type class="sc-mode__setting"></app-scroll-type>
	<app-click-facilite class="sc-mode__setting"></app-click-facilite>
	<app-navigation-auto class="sc-mode__setting"></app-navigation-auto>
</div>
`;

class ModeComponent extends HTMLElement {
	static observedAttributes = ['data-settings', 'data-pause'];
	modeContent: HTMLElement | null = null;
	settingsDictionnary: SettingsDictionnary[] = [];

	constructor() {
		super();

		this.appendChild(tmplMode.content.cloneNode(true));

		this.querySelectorAll(".sc-mode__setting").forEach((element: Element) => {
			this.settingsDictionnary.push({ name: stringServiceInstance.normalizeSettingName(element.tagName), element: element.tagName });
		});
	}

	connectedCallback(): void {
		this.modeContent = this.querySelector('#mode-content');
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings' === name) {
			this.displaySettings(JSON.parse(newValue));
		}
		if ('data-pause' === name) {
			this.disableSettings(newValue === 'true');
		}
	}

	displaySettings = (settings: any[]): void => {
		let elements = this.querySelectorAll('.sc-mode__setting');
		elements.forEach((element) => {
			element.classList.add('d-none');
		});

		settings.forEach((setting: any) => {
			let settingObj = this.settingsDictionnary.find((o: SettingsDictionnary) => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0]));
			let settingElement: HTMLElement = this.querySelector(settingObj?.element);
			settingElement?.setAttribute('data-values', JSON.stringify(Object.entries(setting)[0][1]));
			if ((Object.entries(setting)[0][1] as SettingModel).isTool) {
				settingElement?.classList.remove('d-none');
			}
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
