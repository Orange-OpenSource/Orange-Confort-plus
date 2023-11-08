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
<section class="bg-dark p-3 d-flex align-items-center justify-content-between">
	<span class="fs-3 fw-bold">
		<svg width="1.25rem" height="1.25rem" fill="currentColor" aria-hidden="true" focusable="false">
		<!-- @todo Réparer les chemins -->
			<use xlink:href="../assets/icons/orange-icons-sprite.svg#ic_Form_Chevron_right"/>
		</svg>
		<span data-i18n="mainTitle">Confort</span>
		<span class="text-primary">+</span>
	</span>
	<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" aria-label="Fermer Confort+" title="Fermer Confort+">
			<svg width="1.25rem" height="1.25rem" fill="currentColor" aria-hidden="true" focusable="false">
					<use xlink:href="../assets/icons/orange-icons-sprite.svg#ic_Form_Chevron_right"/>
			</svg>
			<span class="visually-hidden" data-i18n="close"></span>
	</button>
</section>
<section class="bg-dark p-3 d-flex align-items-center justify-content-between">
    <div class="d-flex gap-3">
        <div class="bg-body rounded-circle">
            <svg width="5rem" height="5rem" fill="currentColor" aria-hidden="true" focusable="false">
                <use xlink:href="../assets/icons/orange-icons-sprite.svg#ic_Settings"/>
            </svg>
        </div>
        <div class="d-flex justify-content-center flex-column">
            <span data-i18n="profile"></span>
            <span class="fs-4 fw-bold text-primary">Vision +</span>
        </div>
    </div>
    <div class="d-grid gap-3 d-md-block">
    		<!-- @todo Pousser la trad dans title ? -->
        <button type="button" class="btn btn-icon btn-inverse btn-secondary">
            <svg width="1.25rem" height="1.25rem" fill="currentColor" aria-hidden="true" focusable="false">
                <use xlink:href="../assets/icons/orange-icons-sprite.svg#ic_Settings"/>
            </svg>
            <!-- @todo traduire -->
            <span class="visually-hidden">Ouvrir réglages du mode</span>
        </button>
        <button type="button" class="btn btn-icon btn-inverse btn-secondary">
            <svg width="1.25rem" height="1.25rem" fill="currentColor" aria-hidden="true" focusable="false">
                <use xlink:href="../assets/icons/orange-icons-sprite.svg#ic_Pause"/>
            </svg>
            <!-- @todo traduire -->
            <span class="visually-hidden">Mettre en pause</span>
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
