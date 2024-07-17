const editSettingLayout: HTMLTemplateElement = document.createElement('template');
editSettingLayout.innerHTML = `
	<div class="gap-1 p-3 text-body">
		<div class="d-flex align-items-center gap-2 mb-2">
			<app-icon id="edit-setting-icon" data-size="2em"></app-icon>
			<p id="edit-setting-title" class="fs-4 fw-bold mb-0"></p>
		</div>

		<p id="edit-setting-instruction" class="mb-4"></p>

		<app-edit-capital-letters class="sc-edit-setting__setting"></app-edit-capital-letters>
		<app-edit-clearly-links class="sc-edit-setting__setting"></app-edit-clearly-links>
		<app-edit-click-facilite class="sc-edit-setting__setting"></app-edit-click-facilite>
		<app-edit-color-contrast class="sc-edit-setting__setting"></app-edit-color-contrast>
		<app-edit-colour-theme class="sc-edit-setting__setting"></app-edit-colour-theme>
		<app-edit-cursor-aspect class="sc-edit-setting__setting"></app-edit-cursor-aspect>
		<app-edit-delete-background-images class="sc-edit-setting__setting"></app-edit-delete-background-images>
		<app-edit-focus-aspect class="sc-edit-setting__setting"></app-edit-focus-aspect>
		<app-edit-font-family class="sc-edit-setting__setting"></app-edit-font-family>
		<app-edit-link-style class="sc-edit-setting__setting"></app-edit-link-style>
		<app-edit-magnifier class="sc-edit-setting__setting"></app-edit-magnifier>
		<app-edit-margin-align class="sc-edit-setting__setting"></app-edit-margin-align>
		<app-edit-navigation-auto class="sc-edit-setting__setting"></app-edit-navigation-auto>
		<app-edit-read-aloud class="sc-edit-setting__setting"></app-edit-read-aloud>
		<app-edit-reading-guide class="sc-edit-setting__setting"></app-edit-reading-guide>
		<app-edit-scroll-type class="sc-edit-setting__setting"></app-edit-scroll-type>
		<app-edit-scroll class="sc-edit-setting__setting"></app-edit-scroll>
		<app-edit-stop-animations class="sc-edit-setting__setting"></app-edit-stop-animations>
		<app-edit-text-size class="sc-edit-setting__setting"></app-edit-text-size>
		<app-edit-text-spacing class="sc-edit-setting__setting"></app-edit-text-spacing>
	</div>
`;

class EditSettingComponent extends HTMLElement {
	static observedAttributes = ['data-setting'];
	settingIcon: HTMLElement | null = null;
	settingTitle: HTMLParagraphElement | null = null;
	settingInstruction: HTMLParagraphElement | null = null;
	settingName: string = null;
	settingsDictionnary: SettingsDictionnary[] = [];

	constructor() {
		super();

		this.appendChild(editSettingLayout.content.cloneNode(true));

		this.querySelectorAll('.sc-edit-setting__setting').forEach((element: Element) => {
			this.settingsDictionnary.push({ name: stringServiceInstance.normalizeSettingName(element.tagName), element: element.tagName });
		});
	}

	connectedCallback(): void {
		this.settingIcon = this.querySelector('#edit-setting-icon');
		this.settingTitle = this.querySelector('#edit-setting-title');
		this.settingInstruction = this.querySelector('#edit-setting-instruction');
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-setting' === name) {
			this.settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
			this.settingIcon?.setAttribute('data-name', this.settingName);
			this.settingTitle!.innerText = i18nServiceInstance.getMessage(this.settingName);
			this.settingInstruction!.innerText = i18nServiceInstance.getMessage(`${this.settingName}Instruction`);
			this.displaySetting(`edit-${newValue}`);
		}
	}

	displaySetting = (settingName: string): void => {
		this.settingsDictionnary.forEach((setting: SettingsDictionnary) => {
			if (settingName !== setting.name) {
				this.querySelector(setting.element).classList.add('d-none');
			}
		});
	}
}

customElements.define('app-edit-setting', EditSettingComponent);
