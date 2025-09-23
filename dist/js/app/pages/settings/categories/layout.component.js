"use strict";
const tmplLayout = document.createElement('template');
tmplLayout.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">
			<app-icon data-name="Affichage" data-size="2em"></app-icon>
			<span data-i18n="layout"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-layout">
		<div class="accordion-body px-3">
			<div class="d-flex flex-column gap-2">
				<app-magnifier class="c-category__setting" data-can-edit="true"></app-magnifier>
				<app-cursor-aspect class="c-category__setting" data-can-edit="true"></app-cursor-aspect>
				<app-focus-aspect class="c-category__setting" data-can-edit="true"></app-focus-aspect>
				<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>
				<app-link-style class="c-category__setting" data-can-edit="true"></app-link-style>
				<app-clearly-links class="c-category__setting" data-can-edit="true"></app-clearly-links>
				<app-zoom class="c-category__setting" data-can-edit="true"></app-zoom>
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
