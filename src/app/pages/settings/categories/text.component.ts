const tmplText: HTMLTemplateElement = document.createElement('template');
tmplText.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">
			<app-icon data-name="Text" data-size="2em"></app-icon>
			<span data-i18n="text"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-text">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container d-flex flex-column gap-2">
				<app-font-family class="c-category__setting" data-name="textFont" data-can-edit="true"></app-font-family>
				<app-increase-text-size class="c-category__setting" data-name="textSize" data-can-edit="true"></app-increase-text-size>
				<app-color-contrast class="c-category__setting" data-name="colorContrast" data-can-edit="true"></app-color-contrast>
				<app-reading-guide class="c-category__setting" data-name="readingGuide" data-can-edit="true"></app-reading-guide>
				<app-spacing-text class="c-category__setting" data-name="spacingText" data-can-edit="true"></app-spacing-text>
			</div>
			<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>
		</div>
	</div>
`;

class TextComponent extends AbstractCategory {
	constructor() {
		super();

		this.appendChild(tmplText.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
	}
}

customElements.define('app-text', TextComponent);
