const tmplText: HTMLTemplateElement = document.createElement('template');
tmplText.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button gap-2 fs-4 px-3" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="category-text">
				<app-icon data-name="Text" data-size="2rem"></app-icon>
				<span data-i18n="text"></span>
			</button>
		</div>
		<div id="category-text" class="accordion-collapse collapse" data-bs-parent="#categories">
			<div class="accordion-body px-3">
				<div id="category-text-settings" class="d-flex flex-column">
				</div>
				<button id="category-text-more" class="btn btn-tertiary" data-i18n="moreSettings"></button>
			</div>
		</div>
	</div>
`;

class TextComponent extends AbstractCategory {
	static observedAttributes = ['data-settings'];
	btnMoreSettings: HTMLElement = null;
	settingsContainer: HTMLElement = null;
	settings: any[] = [];

	settingsDictionnary: any[] = [
		{ name: 'fontSize', element: 'app-font-family' },
		{ name: 'textFont', element: 'app-increase-text-size' },
		{ name: 'textTransform', element: 'app-text-transform' },
		{ name: 'readingGuide', element: 'app-reading-guide' },
	];

	constructor() {
		super();

		this.appendChild(tmplText.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.btnMoreSettings = this.querySelector('#category-text-more');
		this.settingsContainer = this.querySelector('#category-text-settings');

		this.btnMoreSettings?.addEventListener('click', () => {
			this.displayAllSettings();
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.btnMoreSettings?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings' === name) {
			this.settings = JSON.parse(newValue);
			this.displaySettings();
		}
	}

	displaySettings = (): void => {
		let settingsElements = '';
		let tmpDictionnary = this.settingsDictionnary;

		/* First, add and display the active mode settings first */
		this.settings?.forEach((setting) => {
			let settingObj = this.settingsDictionnary.find(o => o.name === Object.entries(setting)[0][0]);
			let index = this.settingsDictionnary.findIndex(o => o.name === Object.entries(setting)[0][0]);
			tmpDictionnary.splice(index, 1);

			let settingElement = `<${settingObj.element} data-values="${JSON.stringify(Object.entries(setting)[0][1])}"></${settingObj.element}>`;
			settingsElements = settingsElements + settingElement;
		});

		/* Secondly, add and hide other inactives settings */
		tmpDictionnary.forEach((setting) => {
			let settingElement = `<${setting.element} class="d-none"></${setting.element}>`;
			settingsElements = settingsElements + settingElement;
		});

		this.settingsContainer.innerHTML = settingsElements;
	}

	displayAllSettings = (): void => {
		let settingsElements = this.querySelectorAll('#category-text-settings > *');
		settingsElements.forEach((element) => {
			element.classList.remove('d-none');
		});
		this.btnMoreSettings.classList.add('d-none');
	}
}

customElements.define('app-text', TextComponent);
