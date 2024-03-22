const tmplSound: HTMLTemplateElement = document.createElement('template');
tmplSound.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-sound">
			<app-icon data-name="Audio" data-size="2em"></app-icon>
			<span data-i18n="audio"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-sound">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container gap-2">
				<app-read-aloud class="c-category__setting" data-can-edit="true"></app-read-aloud>
			</div>
			<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>
		</div>
	</div>
`;

class SoundComponent extends AbstractCategory {
	constructor() {
		super();

		this.appendChild(tmplSound.content.cloneNode(true));
	}
}

customElements.define('app-sound', SoundComponent);
