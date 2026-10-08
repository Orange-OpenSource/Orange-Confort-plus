const phonemePickerLayout: HTMLTemplateElement = document.createElement('template');
phonemePickerLayout.innerHTML = `
<div class="${PREFIX}color-picker-card ${PREFIX}phoneme-picker-card card border-black">
	<div class="${PREFIX}color-picker-header card-header d-flex align-items-center gap-2">
		<button type="button" class="${PREFIX}color-picker-back ${PREFIX}phoneme-picker-back align-self-stretch d-inline-flex align-items-center border-0 border-end rounded-0 bg-transparent text-reset px-2">
			<span class="d-inline-flex" aria-hidden="true">
				<app-icon data-name="Form_Chevron_left" data-size="1em"></app-icon>
			</span>
		</button>
		<span class="${PREFIX}phoneme-picker-title fs-7"></span>
	</div>
	<ul class="${PREFIX}phoneme-picker-list list-unstyled m-0 p-1"></ul>
</div>
`;

interface PhonemePickerItem {
	rule: ProcessFormatRule;
	used: boolean;
}

class PhonemePickerComponent extends HTMLElement {
	static observedAttributes = ['data-palette'];

	private card: HTMLElement | null = null;
	private header: HTMLElement | null = null;
	private titleEl: HTMLElement | null = null;
	private backBtn: HTMLButtonElement | null = null;
	private list: HTMLElement | null = null;

	private items: PhonemePickerItem[] = [];

	handler: any;

	constructor() {
		super();

		this.appendChild(phonemePickerLayout.content.cloneNode(true));

		this.card = this.querySelector(`.${PREFIX}phoneme-picker-card`);
		this.header = this.querySelector(`.${PREFIX}color-picker-header`);
		this.titleEl = this.querySelector(`.${PREFIX}phoneme-picker-title`);
		this.backBtn = this.querySelector(`.${PREFIX}phoneme-picker-back`);
		this.list = this.querySelector(`.${PREFIX}phoneme-picker-list`);

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.backBtn?.addEventListener('click', this.handler);
		this.list?.addEventListener('click', this.handler);
		this.list?.addEventListener('keydown', this.handler);

		const title = i18nServiceInstance.getMessage('phonemePicker_title');
		if (this.titleEl) {
			this.titleEl.textContent = title;
		}
		this.list?.setAttribute('aria-label', title);
		this.backBtn?.setAttribute('aria-label', i18nServiceInstance.getMessage('phonemePicker_back'));
		this.render();
	}

	disconnectedCallback(): void {
		this.backBtn?.removeEventListener('click', this.handler);
		this.list?.removeEventListener('click', this.handler);
		this.list?.removeEventListener('keydown', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (oldValue !== newValue) {
			this.render();
		}
	}

	/** Liste des phonèmes proposés ; ceux marqués `used` sont affichés mais non sélectionnables. */
	setPhonemes = (items: PhonemePickerItem[]): void => {
		this.items = Array.isArray(items) ? items : [];
		this.renderList();
	};

	/** Donne le focus au premier phonème sélectionnable. */
	focusFirstAvailable = (): void => {
		this.getEnabledOptions()[0]?.focus();
	};

	private getEnabledOptions = (): HTMLButtonElement[] => {
		return Array.from(this.list?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
	};

	private formatExample = (rule: ProcessFormatRule): string => {
		return Array.isArray(rule.example) ? rule.example.join(', ') : (rule.example ?? '');
	};

	private render = (): void => {
		const dark = this.dataset.palette === 'dark';
		this.card?.classList.toggle('bg-black', dark);
		this.card?.classList.toggle('text-white', dark);
		this.header?.classList.toggle('bg-white', dark);
		this.header?.classList.toggle('text-dark', dark);
	};

	private renderList = (): void => {
		if (!this.list) {
			return;
		}

		this.list.innerHTML = '';

		this.items.forEach((item: PhonemePickerItem, index: number) => {
			const phonetics = item.rule.phonetics || '∅';
			const example = this.formatExample(item.rule);

			const li = document.createElement('li');

			const option = document.createElement('button');
			option.type = 'button';
			option.classList.add(
				`${PREFIX}phoneme-picker-option`,
				'd-flex', 'align-items-center', 'justify-content-between', 'gap-2',
				'w-100', 'border-0', 'bg-transparent', 'text-reset', 'text-start', 'px-2', 'py-1', 'fs-7'
			);
			option.dataset.index = String(index);
			option.disabled = item.used;

			const phoneticsEl = document.createElement('span');
			phoneticsEl.classList.add(`${PREFIX}phoneme-picker-phonetics`, 'fw-bold');
			phoneticsEl.textContent = phonetics;
			phoneticsEl.setAttribute('aria-hidden', 'true');

			const exampleEl = document.createElement('span');
			exampleEl.classList.add(`${PREFIX}phoneme-picker-example`, 'text-end');
			exampleEl.textContent = example;
			exampleEl.setAttribute('aria-hidden', 'true');

			const label = document.createElement('span');
			label.classList.add('visually-hidden');
			label.textContent = i18nServiceInstance.getMessage('phonemePicker_option', [phonetics, example])
				+ (item.used ? `, ${i18nServiceInstance.getMessage('phonemePicker_alreadyColored')}` : '');

			option.append(phoneticsEl, exampleEl, label);
			li.appendChild(option);
			this.list.appendChild(li);
		});
	};

	private moveFocus = (current: HTMLElement, key: string): void => {
		const options = this.getEnabledOptions();
		if (options.length === 0) {
			return;
		}
		const index = options.indexOf(current as HTMLButtonElement);
		let next: number;
		switch (key) {
			case 'ArrowDown':
				next = (index + 1) % options.length;
				break;
			case 'ArrowUp':
				next = (index - 1 + options.length) % options.length;
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = options.length - 1;
				break;
			default:
				return;
		}
		options[next].focus();
	};

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'click': {
					if (event.currentTarget === this.backBtn) {
						this.dispatchEvent(new CustomEvent('phonemePickerBack', {
							bubbles: true,
							composed: true,
							detail: {}
						}));
						return;
					}
					const option = (event.target as HTMLElement).closest<HTMLButtonElement>(`.${PREFIX}phoneme-picker-option`);
					if (!option || option.disabled) {
						return;
					}
					const item = this.items[Number(option.dataset.index)];
					if (!item || item.used) {
						return;
					}
					this.dispatchEvent(new CustomEvent('phonemePickerSelect', {
						bubbles: true,
						composed: true,
						detail: { rule: structuredClone(item.rule) }
					}));
					break;
				}
				case 'keydown':
					if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
						event.preventDefault();
						this.moveFocus(event.target as HTMLElement, event.key);
					}
					break;
			}
		}
	}
}

customElements.define('app-phoneme-picker', PhonemePickerComponent);
