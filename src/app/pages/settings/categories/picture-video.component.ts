const tmplPictureVideo: HTMLTemplateElement = document.createElement('template');
tmplPictureVideo.innerHTML = `
	<div class="accordion-item">
		<div class="accordion-header">
			<button class="accordion-button gap-2 fs-4 px-3" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="category-picture-video">
				<app-icon data-name="Photo_Video" data-size="2rem"></app-icon>
				<span data-i18n="medias"></span>
			</button>
		</div>
		<div id="category-picture-video" class="accordion-collapse collapse" data-bs-parent="#categories">
			<div class="accordion-body px-3">
			</div>
		</div>
	</div>
`;

class PictureVideoComponent extends Category {

	constructor() {
		super();
		this.appendChild(tmplPictureVideo.content.cloneNode(true));
	}
}

customElements.define('app-picture-video', PictureVideoComponent);
