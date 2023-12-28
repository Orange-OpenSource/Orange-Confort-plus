const tmplText: HTMLTemplateElement = document.createElement('template');
tmplText.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button gap-2 fs-4 px-3" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="category-text">
				<app-icon data-name="Text" data-size="2rem"></app-icon>
				<span data-i18n="text"></span>
			</button>
		</div>
		<div class="accordion-collapse collapse" data-bs-parent="#categories">
			<div class="accordion-body px-3">
				<div class="c-category__settings-container d-flex flex-column">
					<app-font-family class="c-text__setting" data-can-edit="true"></app-font-family>
					<app-increase-text-size class="c-text__setting" data-can-edit="true"></app-increase-text-size>
					<app-text-transform class="c-text__setting"></app-text-transform>
					<app-reading-guide class="c-text__setting"></app-reading-guide>
				</div>
				<button class="c-category__btn-more btn btn-tertiary" type="button" data-i18n="moreSettings"></button>
			</div>
		</div>
	</div>
`;

class TextComponent extends AbstractCategory {
	constructor() {
		const settingsDictionnary: any[] = [
			{ name: 'fontSize', element: 'app-increase-text-size' },
			{ name: 'textFont', element: 'app-font-family' },
			{ name: 'textTransform', element: 'app-text-transform' },
			{ name: 'readingGuide', element: 'app-reading-guide' },
		];

		super(settingsDictionnary);

		this.appendChild(tmplText.content.cloneNode(true));
	}

	connectedCallback(): void {
		let settingsElements = [...this.querySelectorAll('.c-text__setting')];
		super.connectedCallback(settingsElements);
	}
}

customElements.define('app-text', TextComponent);
