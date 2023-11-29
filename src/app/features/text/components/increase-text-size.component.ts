const tmplIncreaseTextSize: HTMLTemplateElement = document.createElement('template');
tmplIncreaseTextSize.innerHTML = `
    <div>
			<app-btn-setting id="btn-size" data-label="Taille de texte"></app-btn-setting>
			<app-btn-modal id="content-size-info"></app-btn-modal>
		</div>
`;

class IncreaseTextSizeComponent extends HTMLElement {
	settingBtn: HTMLElement | null = null;
	modalBtn: HTMLElement | null = null;

	index: number = 0;
	// @todo à modifier selon l'architecture du json
	fontSizes: string = "16,18,20,22,24";
	defaultSize: string = "18";

	constructor() {
		super();
		this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.modalBtn = this.querySelector('#content-size-info');
		this.modalBtn!.dataset.value = this.defaultSize;
		this.settingBtn = this.querySelector('#btn-size');
		this.settingBtn!.dataset.settingsList = this.fontSizes;

		btnSettingLayout.addEventListener('changeSettingEvent', (event) => {
			this.setFontSize(event as CustomEvent);
		});
	}

	disconnectedCallback(): void {
		btnSettingLayout.removeEventListener('changeSettingEvent', () => { });
	}

	setFontSize(event: CustomEvent): void {
		const bodyElt = document.getElementsByTagName('body')[0];
		bodyElt.style.fontSize = `${event.detail.value}px`;

		this.modalBtn!.dataset.value = `${event.detail.value}`;
		this.modalBtn!.dataset.label = `Taille du texte : ${event.detail.value}`;
	}
}

customElements.define('app-increase-text-size', IncreaseTextSizeComponent);
