const tmplLayout: HTMLTemplateElement = document.createElement('template');
tmplLayout.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button gap-2 fs-4 px-3" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="category-layout">
				<app-icon data-name="Agencement" data-size="2rem"></app-icon>
				<span data-i18n="layout"></span>
			</button>
		</div>
		<div id="category-layout" class="accordion-collapse collapse" data-bs-parent="#categories">
			<div class="accordion-body px-3">
			</div>
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
