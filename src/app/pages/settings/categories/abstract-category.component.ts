abstract class AbstractCategory extends HTMLElement {
	static observedAttributes = ['data-settings'];
	btnAccordion: HTMLElement = null;
	accordionContainer: HTMLElement = null;
	settingsContainer: HTMLElement = null;
	btnMoreSettings: HTMLElement = null;
	settingsDictionnary: any[] = []
	settingsElements: any[] = []
	i18nService: any;
	displayAllSettings = false;

	private CLASS_NAME_SHOW = 'show';
	private CLASS_NAME_COLLAPSED = 'collapsed';
	private _triggerArray: any[] = [];

	constructor(dictionnary: any[]) {
		super();

		// @ts-ignore
		this.i18nService = new I18nService();

		this.settingsDictionnary = dictionnary;
	}

	connectedCallback(): void {
		this.btnAccordion = this.querySelector('button.accordion-button');
		this.accordionContainer = this.querySelector('div.accordion-collapse');
		this.settingsContainer = this.querySelector('.c-category__settings-container');
		this.btnMoreSettings = this.querySelector('.c-category__btn-more');

		this._triggerArray.push(this.btnAccordion);
		this.btnAccordion?.addEventListener('click', () => {
			this.addAriaAndCollapsedClass(this._triggerArray, this.isShown());
		});

		this.btnMoreSettings?.addEventListener('click', () => {
			this.displayOrHideOthersSettings();
		});
	}

	disconnectedCallback(): void {
		this.btnAccordion?.removeEventListener('click', () => {
		});
		this.btnMoreSettings?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings' === name) {
			this.displaySettings(JSON.parse(newValue));
		}
	}

	isShown = (element = this.accordionContainer): boolean => {
		return element!.classList.contains(this.CLASS_NAME_SHOW);
	}

	addAriaAndCollapsedClass = (triggerArray: any, isOpen: boolean): void => {
		if (!triggerArray.length) {
			return;
		}
		for (const element of triggerArray) {
			this.accordionContainer?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
			element?.classList.toggle(this.CLASS_NAME_COLLAPSED, !isOpen);
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
			let settingObj = this.settingsDictionnary.find(o => o.name === Object.keys(setting)[0]);
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
					this.btnMoreSettings.innerText = this.i18nService.getMessage('lessSettings');
				} else {
					this.btnMoreSettings.innerText = this.i18nService.getMessage('moreSettings');
				}
				element.classList.toggle('d-none');
			}
		});
	}
}
