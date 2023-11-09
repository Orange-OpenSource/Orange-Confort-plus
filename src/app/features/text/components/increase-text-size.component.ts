const tmplIncreaseTextSize: HTMLTemplateElement = document.createElement('template');
tmplIncreaseTextSize.innerHTML = `
    <style>
        app-increase-text-size {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
        .sc-increase-text-size__content {
        	display: flex;
        }

        .sc-increase-text-size__btn-size {
            background: #ff7900;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 5rem;
            height: 5rem;
            margin-right: 1rem;
        }

        .sc-increase-text-size__btn-slots {
            display: flex;
            margin-top: 1rem;
        }
        .sc-increase-text-size__btn-slot {
            background: #FFBE85;
            border-radius: 50%;
            width: .5rem;
            height: .5rem;
            margin-right: .25rem;
        }
        .sc-increase-text-size__btn-slot:last-child {
            margin-right: 0;
        }
        .selected {
            background: black;
        }

        .sc-increase-text-size__size-info {
            font-weight: 700;
            background: #ff7900;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5rem;
            padding: 1rem 2rem 1rem 1rem;
            clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
        }
    </style>
    <div class="sc-increase-text-size__content">
			<button class="sc-increase-text-size__btn-size" id="btn-size">
					<span data-i18n="textSize"></span>
					<div class="sc-increase-text-size__btn-slots" id="btn-content-slots"></div>
			</button>
			<div class="sc-increase-text-size__size-info" id="content-size-info"></div>
		</div>
`;

class IncreaseTextSizeComponent extends HTMLElement {
	toolBtn: HTMLElement | null = null;
	sizeBtn: HTMLElement | null = null;

	index: number = 0;
	fontSizes: number[] = [16, 18, 20, 22, 24];

	constructor() {
		super();
		this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
	}

	connectedCallback(): void {
		const bodyElt = document.getElementsByTagName('body')[0];
		const sizeInfoElt = this.querySelector('#content-size-info');
		this.sizeBtn = this.querySelector('#btn-size');

		if (!sizeInfoElt) {
			return;
		}

		// @ts-ignore
		const btnContentSlots: HTMLElement = this.querySelector('#btn-content-slots');
		let slot = '';
		this.fontSizes.forEach((size, index) => {
			let div = '<div class="sc-increase-text-size__btn-slot"></div>';
			if (index === this.index) {
				div = '<div class="sc-increase-text-size__btn-slot selected"></div>';
			}
			slot = `${slot}${div}`;
		});
		btnContentSlots.innerHTML = slot;
		sizeInfoElt.innerHTML = `${this.fontSizes[this.index]}`;

		this.sizeBtn?.addEventListener('click', () => {
			this.index++;
			if (this.index >= this.fontSizes.length) {
				this.index = 0;
			}

			slot = '';
			this.fontSizes.forEach((size, index) => {
				let div = '<div class="sc-increase-text-size__btn-slot"></div>';
				if (index === this.index) {
					div = '<div class="sc-increase-text-size__btn-slot selected"></div>';
				}
				slot = `${slot}${div}`;
			});
			btnContentSlots.innerHTML = slot;

			bodyElt.style.fontSize = `${this.fontSizes[this.index]}px`;
			sizeInfoElt.innerHTML = `${this.fontSizes[this.index]}`;
		});
	}

	disconnectedCallback(): void {
		this.toolBtn?.removeEventListener('click', () => {
		});
		this.sizeBtn?.removeEventListener('click', () => {
		});
	}
}

customElements.define('app-increase-text-size', IncreaseTextSizeComponent);
