const tmplNavigation: HTMLTemplateElement = document.createElement('template');
tmplNavigation.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">
				<app-icon data-name="Nav" data-size="2rem"></app-icon>
				<span data-i18n="navigation"></span>
			</button>
		</div>
		<div class="accordion-collapse collapse" id="category-navigation">
			<div class="accordion-body px-3">
			</div>
		</div>
	</div>
`;

class NavigationComponent extends AbstractCategory {

	constructor() {
		let settingsDictionnary: any[] = [
		];

		super(settingsDictionnary);

		this.appendChild(tmplNavigation.content.cloneNode(true));
	}
}

customElements.define('app-navigation', NavigationComponent);
