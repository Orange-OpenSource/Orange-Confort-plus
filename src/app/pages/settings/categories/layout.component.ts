const tmplLayout: HTMLTemplateElement = document.createElement('template');
tmplLayout.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button gap-2 fs-4 px-3" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="category-layout">
				<app-icon data-name="Agencement" data-size="2rem"></app-icon>
				<span data-i18n="layout"></span>
			</button>
		</div>
		<div class="accordion-collapse collapse" data-bs-parent="#categories">
			<div class="accordion-body px-3">
				<div class="c-category__settings-container d-flex flex-column gap-2 mb-3">
					<app-margin-align class="c-layout__setting" data-can-edit="true"></app-margin-align>
				</div>
				<button class="c-category__btn-more btn btn-tertiary" type="button" data-i18n="moreSettings"></button>
			</div>
		</div>
	</div>
`;

class LayoutComponent extends AbstractCategory {
	constructor() {
		const settingsDictionnary: any[] = [
			{ name: 'marginAlign', element: 'app-margin-align' },
		];

		super(settingsDictionnary);

		this.appendChild(tmplLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		let settingsElements = [...this.querySelectorAll('.c-layout__setting')];
		super.connectedCallback(settingsElements);
	}
}

customElements.define('app-layout', LayoutComponent);
