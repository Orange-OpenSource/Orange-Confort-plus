const tmplNavigation: HTMLTemplateElement = document.createElement('template');
tmplNavigation.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button gap-2 fs-4 px-3" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="category-navigation">
				<app-icon data-name="Nav" data-size="2rem"></app-icon>
				<span data-i18n="navigation"></span>
			</button>
		</div>
		<div class="accordion-collapse collapse" data-bs-parent="#categories">
			<div class="accordion-body px-3">
				<div class="c-category__settings-container d-flex flex-column gap-2 mb-3">
					<app-focus-aspect class="c-navigation__setting" data-can-edit="true"></app-focus-aspect>
				</div>
				<button class="c-category__btn-more btn btn-tertiary" type="button" data-i18n="moreSettings"></button>
			</div>
		</div>
	</div>
`;

class NavigationComponent extends AbstractCategory {
	constructor() {
		const settingsDictionnary: any[] = [
			{ name: 'focusAspect', element: 'app-focus-aspect' },
		];

		super(settingsDictionnary);

		this.appendChild(tmplNavigation.content.cloneNode(true));
	}

	connectedCallback(): void {
		let settingsElements = [...this.querySelectorAll('.c-navigation__setting')];
		super.connectedCallback(settingsElements);
	}
}

customElements.define('app-navigation', NavigationComponent);
