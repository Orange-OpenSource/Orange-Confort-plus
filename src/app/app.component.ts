const template: HTMLTemplateElement = document.createElement('template');
template.innerHTML = `
<style>
    .sc-confort-plus {
        border: none;
        background-color: #ff7900;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        position: fixed;
        top: 50%;
        right: 1rem;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
    .hidden {
        display: none;
        visibility: hidden;
    }
</style>
<button class="sc-confort-plus" id="confort"></button>
<app-toolbar class="hidden" id="toolbar" onmycustomevent="{handleCustomEvent}"></app-toolbar>
`

class AppComponent extends HTMLElement {
	shadow: ShadowRoot = this.attachShadow({mode: 'open'});
	private openConfortPlus: boolean = false;
	confortPlusBtn: HTMLElement | null = null;
	confortPlusToolbar: HTMLElement | null = null;

	constructor() {
		super();
		this.shadow.appendChild(template.content.cloneNode(true));
		template.addEventListener('closeEvent', (event: any) => {
			if (event.detail) {
				this.openConfortPlus = !this.openConfortPlus;

				this.openConfortPlus ?
					this.confortPlusToolbar?.classList.remove('hidden') :
					this.confortPlusToolbar?.classList.add('hidden');

				this.openConfortPlus ?
					this.confortPlusBtn?.classList.add('hidden') :
					this.confortPlusBtn?.classList.remove('hidden');
			}
		});
	}

	connectedCallback(): void {
		this.confortPlusBtn = this.shadow.getElementById('confort');
		this.confortPlusToolbar = this.shadow.getElementById('toolbar');

		if (!this.confortPlusBtn || !this.confortPlusToolbar) {
			return;
		}
		this.confortPlusBtn.addEventListener('click', () => {
			this.openConfortPlus = !this.openConfortPlus;

			this.openConfortPlus ?
				this.confortPlusToolbar?.classList.remove('hidden') :
				this.confortPlusToolbar?.classList.add('hidden');

			this.openConfortPlus ?
				this.confortPlusBtn?.classList.add('hidden') :
				this.confortPlusBtn?.classList.remove('hidden');
		});
	}

	disconnectedCallback(): void {
		this.confortPlusBtn?.removeEventListener('click', () => {
		});
		this.confortPlusToolbar?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-root', AppComponent);

const appRootElt: HTMLElement = document.createElement('app-root');
document.body.prepend(appRootElt);
