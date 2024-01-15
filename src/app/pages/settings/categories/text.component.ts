const tmplText: HTMLTemplateElement = document.createElement('template');
tmplText.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">
			<app-icon data-name="Text" data-size="2rem"></app-icon>
			<span data-i18n="text"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-text">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container d-flex flex-column gap-2 mb-3">
				<app-font-family class="c-text__setting" data-can-edit="true"></app-font-family>
				<app-increase-text-size class="c-text__setting" data-can-edit="true"></app-increase-text-size>
				<app-color-contrast class="c-text__setting" data-can-edit="true"></app-color-contrast>
				<app-reading-guide class="c-text__setting" data-can-edit="true"></app-reading-guide>
				<app-spacing-text class="c-text__setting" data-can-edit="true"></app-spacing-text>
			</div>
			<button class="c-category__btn-more btn btn-tertiary" type="button" data-i18n="moreSettings"></button>
		</div>
	</div>
`;

class TextComponent extends AbstractCategory {
	settingsElements: any[] = []

	constructor() {
		const settingsDictionnary: any[] = [
			{ name: 'textSize', element: 'app-increase-text-size' },
			{ name: 'textFont', element: 'app-font-family' },
			{ name: 'colorContrast', element: 'app-color-contrast' },
			{ name: 'readingGuide', element: 'app-reading-guide' },
			{ name: 'spacingText', element: 'app-spacing-text' },
		];

		super(settingsDictionnary);

		this.appendChild(tmplText.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.settingsElements = [...this.querySelectorAll('.c-text__setting')];
		super.connectedCallback();
	}
}

customElements.define('app-text', TextComponent);
