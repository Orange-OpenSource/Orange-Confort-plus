const tmplToolbar: HTMLTemplateElement = document.createElement('template');
tmplToolbar.innerHTML = `
<style>
    #toolbar {
        color: black;
        background: white;
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
    .sc-toolbar__header,
    .sc-toolbar__header-infos {
        color: white;
        background: black;
        display: flex;
        align-items: center;
        padding: 1rem;
    }
    .sc-toolbar__header-infos {
    	padding-top: 0;
    }

    .sc-toolbar__logo {
        margin-right: 1rem;
    }
    .sc-toolbar__title {
        font-size: 1.5rem;
        font-weight: 700;
        flex: 1;
    }
    .sc-toolbar__btn {
        color: white;
        font-weight: 700;
        background: black;
        border: 1px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        margin-left: 1rem;
        cursor: pointer;
    }
    .sc-toolbar__btn:hover {
        color: black;
        background: #ff7900;
        border: 1px solid #ff7900;
    }

    .sc-toolbar__close {
        color: black;
        background: #ff7900;
        border: 1px solid #ff7900;
    }

    .sc-toolbar__infos-picto {
        background: white;
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        margin-right: 1rem;
    }
    .sc-toolbar__infos-libelles {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .sc-toolbar__infos-mode {
        color: #ff7900;
        font-weight: 700;
        font-size: 1.25rem;
    }
    .sc-toolbar__infos-tools {
        display: flex;
    }

    .sc-toolbar__content {
        display: flex;
        flex-direction: column;
        margin-bottom: .5rem;
        padding: 1rem;
    }
</style>
<section class="sc-toolbar__header">
    <span class="sc-toolbar__title" data-i18n="mainTitle"></span>
    <button class="sc-toolbar__btn"> -> </button>
    <button id="close-toolbar" class="sc-toolbar__btn sc-toolbar__close"> >> </button>
</section>
<section class="sc-toolbar__header-infos">
    <div class="sc-toolbar__infos-picto"></div>
    <div class="sc-toolbar__infos-libelles">
        <span data-i18n="profile"></span>
        <!-- @todo Mise à jour / traudction de cette donnée ? -->
        <span class="sc-toolbar__infos-mode">Vision+</span>
    </div>
    <div class="sc-toolbar__infos-tools">
        <button class="sc-toolbar__btn"> O </button>
        <button class="sc-toolbar__btn"> [] </button>
    </div>
</section>

<section class="sc-toolbar__content">
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
			let clickEvent = new CustomEvent('closeEvent', {detail: true});
			template.dispatchEvent(clickEvent);
		});
	}

	disconnectedCallback(): void {
		this.closeBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-toolbar', ToolbarComponent);
