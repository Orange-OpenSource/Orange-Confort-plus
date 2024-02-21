const tmplLayout: HTMLTemplateElement = document.createElement('template');
tmplLayout.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">
			<app-icon data-name="Agencement" data-size="2em"></app-icon>
			<span data-i18n="layout"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-layout">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container gap-2">
				<app-margin-align class="c-category__setting" data-can-edit="true"></app-margin-align>
			</div>
			<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>
		</div>
	</div>
`;

class LayoutComponent extends AbstractCategory {
	constructor() {
		super();

		this.appendChild(tmplLayout.content.cloneNode(true));
	}
}

customElements.define('app-layout', LayoutComponent);
