const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<style>
    #toolbar {
        box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
        display: grid;
        grid-template-rows: auto 7rem 1fr;
        width: 19.5vw;
        height: 100vh;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999;
    }
</style>
<app-header></app-header>
<section class="bg-dark p-3 d-flex align-items-center justify-content-between">
    <div class="d-flex gap-3">
        <div class="bg-body rounded-circle">
						<app-icon data-size="5rem" data-name="Eye"></app-icon>
        </div>
        <div class="d-flex justify-content-center flex-column">
            <span class="text-white" data-i18n="profile"></span>
            <span class="fs-4 fw-bold text-primary">Vision +</span>
        </div>
    </div>
    <div class="d-grid gap-3 d-md-block">
        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="openSettingsMode">
            <span class="visually-hidden" data-i18n="openSettingsMode"></span>
						<app-icon data-name="Settings"></app-icon>
        </button>
        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">
            <span class="visually-hidden" data-i18n="pause"></span>
						<app-icon data-name="Pause"></app-icon>
        </button>
    </div>
</section>

<section class="d-flex gap-3 flex-column p-3 mb-2">
		<section>
			Componsant accordion avec collapse :
			<div class="accordion" id="settingsAccordion">
				<app-collapse data-id="settingOne" data-accordion="settingsAccordion" data-icon="Text" data-title="Texte">
				</app-collapse>

				<app-collapse data-id="settingTwo" data-accordion="settingsAccordion" data-icon="Agencement" data-title="Affichage de la page">
				</app-collapse>
			</div>
		</section>

		<section>
			Componsant bouton réglage :
			<div class="d-flex gap-2 align-items-center">
				<app-btn-setting id="btnSettingOne" data-label="Taille du texte">
				</app-btn-setting>
				<app-btn-modal id="btnModal-btnSettingOne" data-id="btnModalOne" data-value="16" data-label="Valeur taille du texte"></app-btn-modal>
			</div>
		</section>

		<section>
			Componsant sélection du mode :
			<form>
				<app-select-mode data-id="id1" data-name="name" data-label="Label 1" data-description="Ceci est une description" data-icon="Eye">
				</app-select-mode>
				<app-select-mode data-id="id2" data-name="name" data-label="Label 2" data-description="Ceci est une description 2" data-icon="Loupe">
				</app-select-mode>
				<app-select-mode data-id="id3" data-name="name" data-label="Label 3" data-description="Ceci est une description 3" data-icon="Audio">
				</app-select-mode>
			</form>
		</section>

		<section>
			<app-text></app-text>
			<app-layout></app-layout>
			<app-picture-video></app-picture-video>
			<app-sound></app-sound>
			<app-pointer></app-pointer
		</section>
</section>
`;

class ToolbarComponent extends HTMLElement {
	btnModal: HTMLElement | null = null;
	settings = '18,20,24,32';
	settingValue: any = null;

	constructor() {
		super();

		this.appendChild(tmplToolbar.content.cloneNode(true));
	}

	connectedCallback(): void {
		const btnSettingOne: HTMLElement | null = this.querySelector('#btnSettingOne');

		btnSettingOne!.dataset.settingsList = this.settings;

		this.settingValue =
			/* Exemple pour récupérer la valeur du btn-settings */
			template.addEventListener('changeSettingEvent', (event) => {
				this.setSettingsValue(event as CustomEvent);
			});

		/* Exemple pour récupérer la valeur du btn-modal */
		template.addEventListener(`clickModalEventbtnModalOne`, (event) => {
			/* Code pour ouvrir la page des rélages du app-btn-modal ici */
			console.log(event)
		});
	}

	setSettingsValue(event: CustomEvent): void {
		this.btnModal = this.querySelector(`#btnModal-${event.detail.id}`);
		this.btnModal!.dataset.value = event.detail.value;
	}
}

customElements.define('app-toolbar', ToolbarComponent);
