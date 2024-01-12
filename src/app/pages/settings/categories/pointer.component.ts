const tmplPointer: HTMLTemplateElement = document.createElement('template');
tmplPointer.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-pointer">
			<app-icon data-name="Pointeur" data-size="2rem"></app-icon>
			<span data-i18n="pointer"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-pointer">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container d-flex flex-column gap-2 mb-3">
				<app-cursor-aspect class="c-pointer__setting" data-can-edit="true"></app-cursor-aspect>
			</div>
		</div>
	</div>
`;

class PointerComponent extends AbstractCategory {
	constructor() {
		const settingsDictionnary: any[] = [
			{ name: 'cursorAspect', element: 'app-cursor-aspect' },
		];

		super(settingsDictionnary);

		this.appendChild(tmplPointer.content.cloneNode(true));
	}

	connectedCallback(): void {
		let settingsElements = [...this.querySelectorAll('.c-pointer__setting')];
		super.connectedCallback(settingsElements);
	}
}

customElements.define('app-pointer', PointerComponent);
