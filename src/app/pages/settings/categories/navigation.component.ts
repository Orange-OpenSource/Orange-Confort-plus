const tmplNavigation: HTMLTemplateElement = document.createElement('template');
tmplNavigation.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">
			<app-icon data-name="Nav" data-size="2rem"></app-icon>
			<span data-i18n="navigation"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-navigation">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container d-flex flex-column gap-2 mb-3">
				<app-focus-aspect class="c-navigation__setting" data-can-edit="true"></app-focus-aspect>
				<app-scroll class="c-navigation__setting" data-can-edit="true"></app-scroll>
				<app-link-style class="c-navigation__setting" data-can-edit="true"></app-link-style>
			</div>
			<button class="c-category__btn-more btn btn-tertiary" type="button" data-i18n="moreSettings"></button>
		</div>
	</div>
`;

class NavigationComponent extends AbstractCategory {
	constructor() {
		const settingsDictionnary: any[] = [
			{ name: 'focusAspect', element: 'app-focus-aspect' },
			{ name: 'scroll', element: 'app-scroll' },
			{ name: 'linkStyle', element: 'app-link-style' }
		];

		super(settingsDictionnary);

		this.appendChild(tmplNavigation.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.settingsElements = [...this.querySelectorAll('.c-navigation__setting')];
		super.connectedCallback();
	}
}

customElements.define('app-navigation', NavigationComponent);
