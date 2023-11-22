const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
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

<section class="d-flex flex-column p-3 mb-2">
		<app-text></app-text>
		<app-layout></app-layout>
		<app-picture-video></app-picture-video>
		<app-sound></app-sound>
		<app-pointer></app-pointer
</section>
`;

class ToolbarComponent extends HTMLElement {

	constructor() {
		super();

		this.appendChild(tmplToolbar.content.cloneNode(true));
	}
}

customElements.define('app-toolbar', ToolbarComponent);
