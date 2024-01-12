const tmplPictureVideo: HTMLTemplateElement = document.createElement('template');
tmplPictureVideo.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-picture-video">
			<app-icon data-name="Photo_Video" data-size="2rem"></app-icon>
			<span data-i18n="medias"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-picture-video">
		<div class="accordion-body px-3">
		</div>
	</div>
`;

class PictureVideoComponent extends AbstractCategory {

	constructor() {
		let settingsDictionnary: any[] = [
		];

		super(settingsDictionnary);

		this.appendChild(tmplPictureVideo.content.cloneNode(true));
	}
}

customElements.define('app-picture-video', PictureVideoComponent);
