const tmplPointer: HTMLTemplateElement = document.createElement('template');
tmplPointer.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-pointer">
				<app-icon data-name="Pointeur" data-size="2rem"></app-icon>
				<span data-i18n="pointer"></span>
			</button>
		</div>
		<div class="accordion-collapse collapse" id="category-pointer">
			<div class="accordion-body px-3">
			</div>
		</div>
	</div>
`;

class PointerComponent extends AbstractCategory {

	constructor() {
		let settingsDictionnary: any[] = [
		];

		super(settingsDictionnary);

		this.appendChild(tmplPointer.content.cloneNode(true));
	}
}

customElements.define('app-pointer', PointerComponent);
