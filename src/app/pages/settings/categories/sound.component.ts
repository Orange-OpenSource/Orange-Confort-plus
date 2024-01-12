const tmplSound: HTMLTemplateElement = document.createElement('template');
tmplSound.innerHTML = `
	<div class="accordion-header">
		<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-sound">
			<app-icon data-name="Audio" data-size="2rem"></app-icon>
			<span data-i18n="audio"></span>
		</button>
	</div>
	<div class="accordion-collapse collapse" id="category-sound">
		<div class="accordion-body px-3">
		</div>
	</div>
`;

class SoundComponent extends AbstractCategory {

	constructor() {
		let settingsDictionnary: any[] = [
		];

		super(settingsDictionnary);

		this.appendChild(tmplSound.content.cloneNode(true));
	}
}

customElements.define('app-sound', SoundComponent);
