const tmplPointer: HTMLTemplateElement = document.createElement('template');
tmplPointer.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-pointer">
			<app-icon data-name="Pointeur" data-size="2em"></app-icon>
			<span data-i18n="pointer"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-pointer">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container d-flex flex-column gap-2">
				<app-cursor-aspect class="c-category__setting" data-name="cursorAspect" data-can-edit="true"></app-cursor-aspect>
			</div>
			<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>
		</div>
	</div>
`;

class PointerComponent extends AbstractCategory {
	constructor() {
		super();

		this.appendChild(tmplPointer.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
	}
}

customElements.define('app-pointer', PointerComponent);
