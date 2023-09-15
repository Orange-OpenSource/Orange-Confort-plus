const tmplLayout: HTMLTemplateElement = document.createElement('template');
tmplLayout.innerHTML = `
    <style>
        :host {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
        .c-btn-tool {
            display: flex;
            align-items: center;
            width: 100%;
            padding: .5rem;
        }
        .c-btn-tool__picto {
            background: #ff7900;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1rem;
            height: 1rem;
            margin-right: .75rem;
        }
        .c-btn-tool:first-child {
            margin-right: .75rem;
        }
        .c-btn-tool__label {
            text-align: left;
            flex: 1;
        }

        .c-tool__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: .5rem;
        }

        button {
            border-radius: .5rem;
            border: none;
            cursor: pointer;
        }
        .hidden {
            display: flex;
            visibility: hidden;
            height: 0;
            margin-right: 0;
            padding: 0;
        }
    </style>
    <button class="c-btn-tool" id="sc-layout__tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label">Agencement</span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="sc-layout__tool-content">
        En cours ...
    </div>
`;

class LayoutComponent extends HTMLElement {
	toolBtn: HTMLElement | null = null;

	open: boolean = false;

	constructor() {
		super();

		this.appendChild(tmplLayout.content.cloneNode(true));
	}

	connectedCallback(): void {
		this.toolBtn = this.querySelector('#sc-layout__tool-btn');
		const contentElt = this.querySelector('#sc-layout__tool-content');

		this.toolBtn?.addEventListener('click', () => {
			this.open = !this.open;

			if (this.open) {
				contentElt?.classList.remove('hidden');
			} else {
				contentElt?.classList.add('hidden');
			}
		});
	}

	disconnectedCallback(): void {
		this.toolBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-layout', LayoutComponent);
