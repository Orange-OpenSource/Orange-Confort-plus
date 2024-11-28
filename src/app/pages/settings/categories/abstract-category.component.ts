abstract class AbstractCategory extends HTMLElement {
	static observedAttributes = ['data-settings', 'data-open'];
	btnAccordion: HTMLElement = null;
	accordionContainer: HTMLElement = null;
	settingsContainer: HTMLElement = null;
	btnMoreSettings: HTMLElement = null;
	settingsDictionnary: SettingsDictionnary[] = [];
	settingsElements: any[] = [];
	displayAllSettings = false;

	private CLASS_NAME_SHOW = 'show';
	private CLASS_NAME_COLLAPSED = 'collapsed';
	private _triggerArray: any[] = [];

	handler: any;

	constructor() {
		super();

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.btnAccordion = this.querySelector('button.accordion-button');
		this.accordionContainer = this.querySelector('div.accordion-collapse');
		this.settingsContainer = this.querySelector('.c-category__settings-container');
		this.btnMoreSettings = this.querySelector('.c-category__btn-more');

		this.querySelectorAll('.c-category__setting').forEach((element: Element) => {
			this.settingsDictionnary.push({ name: stringServiceInstance.normalizeSettingName(element.tagName), element: element.tagName });
			this.settingsElements.push(this.querySelector(element.tagName));
		});

		this._triggerArray.push(this.btnAccordion);

		this.btnAccordion?.addEventListener('click', this.handler);
		this.btnMoreSettings?.addEventListener('click', this.handler);
	}

	disconnectedCallback(): void {
		this.btnAccordion?.removeEventListener('click', this.handler);
		this.btnMoreSettings?.removeEventListener('click', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings' === name) {
			this.displaySettings(JSON.parse(newValue));
		}
		if ('data-open' === name) {
			this.addAriaAndCollapsedClass(this._triggerArray, JSON.parse(newValue));
		}
	}

	addAriaAndCollapsedClass = (triggerArray: any, isOpen: boolean): void => {
		if (!triggerArray.length) {
			return;
		}
		for (const element of triggerArray) {
			this.accordionContainer?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
			element?.classList.toggle(this.CLASS_NAME_COLLAPSED, isOpen);
			element?.setAttribute('aria-expanded', String(isOpen));
		}
	}

	displaySettings = (settings: any[]): void => {
		this.btnMoreSettings?.classList.add('d-none');
		if (!this.displayAllSettings) {
			this.settingsElements.forEach((element) => {
				element.removeAttribute('data-default-setting');
				element.classList.add('d-none');
			});
		}

		let nbActifSetting = 0;
		settings.forEach((setting: string) => {
			let settingObj = this.settingsDictionnary.find((o: SettingsDictionnary) => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0]));
			let settingElement: HTMLElement = this.querySelector(settingObj?.element);
			settingElement?.setAttribute('data-values', JSON.stringify(Object.entries(setting)[0][1]));
			settingElement?.setAttribute('data-default-setting', 'true');
			settingElement?.classList.remove('d-none');

			if (settingObj) {
				nbActifSetting++;
			}
		});

		if (nbActifSetting !== this.settingsDictionnary.length) {
			this.btnMoreSettings?.classList.remove('d-none');
		}
	}

	displayOrHideOthersSettings = (): void => {
		this.displayAllSettings = !this.displayAllSettings;
		this.settingsElements.forEach((element) => {
			if (!element.hasAttribute('data-default-setting')) {
				if (element.classList.contains('d-none')) {
					this.btnMoreSettings.innerText = i18nServiceInstance.getMessage('lessSettings');
				} else {
					this.btnMoreSettings.innerText = i18nServiceInstance.getMessage('moreSettings');
				}
				element.classList.toggle('d-none');
			}
		});
	}

	private createHandler = () => {
		return (event: Event) => {
			if (event.type === 'click') {
				if (event.currentTarget === this.btnAccordion || this.btnAccordion.contains(event.currentTarget as Element)) {
					categoriesServiceInstance.openCategory(this.tagName);
					let clickCollapsedEvent = new CustomEvent('collapsedCategory', { bubbles: true });
					this.btnAccordion?.dispatchEvent(clickCollapsedEvent);
				} else if (event.currentTarget === this.btnMoreSettings) {
					this.displayOrHideOthersSettings();
				}
			}
		}
	}
}
