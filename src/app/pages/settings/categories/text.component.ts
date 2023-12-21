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
					<app-font-family></app-font-family>
					<app-increase-text-size></app-increase-text-size>
					<app-text-transform></app-text-transform>
					<app-reading-guide></app-reading-guide>
				</div>

				<button id="category-text-more" class="btn btn-tertiary" data-i18n="moreSettings"></button>
			</div>
		</div>
	</div>
`;

class TextComponent extends Category {
	static observedAttributes = ['data-settings'];
	btnMoreSettings: HTMLElement = null;
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
		this.btnMoreSettings = this.querySelector('#category-text-more');

		this.btnMoreSettings?.addEventListener('click', () => {
			this.displaySettings(true);
		});
	}

	disconnectedCallback(): void {
		this.btnMoreSettings?.removeEventListener('click', () => {
		});
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-settings' === name) {
			this.settings = JSON.parse(newValue);
			this.displaySettings(false);
		}
	}

	displaySettings = (full: boolean): void => {
		let elements = this.querySelectorAll("#category-text-settings > *");

		if (full) {
			elements.forEach((element) => {
				element.classList.remove('d-none');
			});
		} else {
			elements.forEach((element) => {
				element.classList.add('d-none');
			});

			this.settings.forEach((setting) => {
				let settingObj = this.settingsDictionnary.find(o => o.name === Object.entries(setting)[0][0]);
				let settingElement: HTMLElement = this.querySelector(settingObj.element);

				settingElement.classList.remove('d-none');
				settingElement.setAttribute('data-values', JSON.stringify(Object.entries(setting)[0][1]));
			});
		}
	}
}

customElements.define('app-text', TextComponent);
