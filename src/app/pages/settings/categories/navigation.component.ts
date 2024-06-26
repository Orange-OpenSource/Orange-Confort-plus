const tmplNavigation: HTMLTemplateElement = document.createElement('template');
tmplNavigation.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">
			<app-icon data-name="Nav" data-size="2em"></app-icon>
			<span data-i18n="navigation"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-navigation">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container gap-2">
				<app-click-facilite class="c-category__setting" data-can-edit="true"></app-click-facilite>
				<app-skip-to-content class="c-category__setting" data-can-edit="true"></app-skip-to-content>
				<app-scroll class="c-category__setting" data-can-edit="true"></app-scroll>
				<app-navigation-buttons class="c-category__setting" data-can-edit="true"></app-navigation-buttons>
				<app-navigation-auto class="c-category__setting" data-can-edit="true"></app-navigation-auto>
			</div>
			<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>
		</div>
	</div>
`;

class NavigationComponent extends AbstractCategory {
	constructor() {
		super();

		this.appendChild(tmplNavigation.content.cloneNode(true));
	}
}

customElements.define('app-navigation', NavigationComponent);
