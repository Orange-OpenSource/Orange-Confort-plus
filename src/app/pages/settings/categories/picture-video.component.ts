const tmplPictureVideo: HTMLTemplateElement = document.createElement('template');
tmplPictureVideo.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-picture-video">
			<app-icon data-name="Photo_Video" data-size="2em"></app-icon>
			<span data-i18n="medias"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-picture-video">
		<div class="accordion-body px-3">
			<div class="c-category__settings-container gap-2">
				<app-stop-animations class="c-category__setting" data-can-edit="true"></app-stop-animations>
			</div>
			<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>
		</div>
	</div>
`;

class PictureVideoComponent extends AbstractCategory {
	constructor() {
		super();

		this.appendChild(tmplPictureVideo.content.cloneNode(true));
	}
}

customElements.define('app-picture-video', PictureVideoComponent);
