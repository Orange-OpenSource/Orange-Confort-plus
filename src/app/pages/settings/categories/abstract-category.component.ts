abstract class AbstractCategory extends HTMLElement {
	static observedAttributes = ['data-settings'];
	btnAccordion: HTMLElement = null;
	accordionContainer: HTMLElement = null;
	settingsContainer: HTMLElement = null;
	btnMoreSettings: HTMLElement = null;

	settingsDictionnary: any[] = []

	private CLASS_NAME_SHOW = 'show';
	private CLASS_NAME_COLLAPSED = 'collapsed';
	private _triggerArray: any[] = [];

	constructor(dictionnary: any[]) {
		super();

		this.settingsDictionnary = dictionnary;
	}

	connectedCallback(settingsElements: any): void {
		this.btnAccordion = this.querySelector('button.accordion-button');
		this.accordionContainer = this.querySelector('div.accordion-collapse');
		this.settingsContainer = this.querySelector('.c-category__settings-container');
		this.btnMoreSettings = this.querySelector('.c-category__btn-more');

		this._triggerArray.push(this.btnAccordion);
		this.btnAccordion?.addEventListener('click', () => {
			this.addAriaAndCollapsedClass(this._triggerArray, this.isShown());
		});

		this.btnMoreSettings?.addEventListener('click', () => {
			this.displayAllSettings(settingsElements);
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
			this.displaySettings(this.settingsDictionnary, JSON.parse(newValue));
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

	displaySettings = (settingsDictionnary: any[], settings: any[]): void => {
		let tmpDictionnary: any[] = [];
		tmpDictionnary = [...settingsDictionnary];

		/* First, add and display the active mode settings */
		settings?.forEach((setting: JSON) => {
			let settingObj = tmpDictionnary?.find(o => o.name === Object.entries(setting)[0][0]);
			let index = tmpDictionnary?.findIndex(o => o.name === Object.entries(setting)[0][0]);
			tmpDictionnary?.splice(index, 1);

			let element = this.querySelector(settingObj?.element);
			element?.setAttribute('data-setting', JSON.stringify(Object.entries(setting)[0][1]));
		});

		/* Secondly, add and hide other inactives settings */
		tmpDictionnary?.forEach((key) => {
			let element = this.querySelector(key?.element);
			element?.classList.add('d-none');
		});

		this.btnMoreSettings?.classList.remove('d-none');
	}

	displayAllSettings = (settingsElements: Element[]): void => {
		settingsElements.forEach((element) => {
			element.classList.remove('d-none');
		});
		this.btnMoreSettings.classList.add('d-none');
	}
}
