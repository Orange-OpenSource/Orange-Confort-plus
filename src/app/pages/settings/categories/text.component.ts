const tmplText: HTMLTemplateElement = document.createElement('template');
tmplText.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">
			<app-icon data-name="Text" data-size="2em"></app-icon>
			<span data-i18n="text"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-text">
		<div class="accordion-body px-3">
			<div class="d-flex flex-column gap-2">
				<app-text-size class="c-category__setting" data-can-edit="true"></app-text-size>
				<app-font-family class="c-category__setting" data-can-edit="true"></app-font-family>
				<app-capital-letters class="c-category__setting" data-can-edit="true"></app-capital-letters>
				<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>
				<app-text-spacing class="c-category__setting" data-can-edit="true"></app-text-spacing>
				<app-reading-guide class="c-category__setting" data-can-edit="true"></app-reading-guide>
				<app-margin-align class="c-category__setting" data-can-edit="true"></app-margin-align>
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
}

customElements.define('app-text', TextComponent);
