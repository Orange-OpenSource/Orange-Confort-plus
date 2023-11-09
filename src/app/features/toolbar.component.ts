const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<style>
    #toolbar {
        box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
        display: grid;
        grid-template-rows: 4rem 7rem 1fr;
        width: 19.5vw;
        height: 100vh;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999;
    }
</style>
<section class="bg-secondary p-3 d-flex align-items-center justify-content-between">
	<span class="fs-3 fw-bold text-white">
		<span data-i18n="mainTitle"></span>
		<span class="text-primary">+</span>
	</span>
	<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-title-i18n="close">
			<span class="visually-hidden" data-i18n="close"></span>
			<app-icon data-name="Form_Chevron_right"></app-icon>
	</button>
</section>
<section class="bg-dark p-3 d-flex align-items-center justify-content-between">
    <div class="d-flex gap-3">
        <div class="bg-body rounded-circle">
						<app-icon data-size="5rem" data-name="Eye"></app-icon>
        </div>
        <div class="d-flex justify-content-center flex-column">
            <span data-i18n="profile"></span>
            <span class="fs-4 fw-bold text-primary">Vision +</span>
        </div>
    </div>
    <div class="d-grid gap-3 d-md-block">
        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-title-i18n="openSettingsMode">
            <span class="visually-hidden" data-i18n="openSettingsMode"></span>
						<app-icon data-name="Settings"></app-icon>
        </button>
        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-title-i18n="pause">
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
    <app-pointer></app-pointer>
</section>
`;

class ToolbarComponent extends HTMLElement {
	closeBtn: HTMLElement | null = null;

	constructor() {
		super();

		this.appendChild(tmplToolbar.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.closeBtn = this.querySelector('#close-toolbar');

		this.closeBtn?.addEventListener('click', () => {
			let clickEvent = new CustomEvent('closeEvent');
			template.dispatchEvent(clickEvent);
		});
	}

	disconnectedCallback(): void {
		this.closeBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-toolbar', ToolbarComponent);
