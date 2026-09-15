const colorPickerLayout: HTMLTemplateElement = document.createElement('template');
colorPickerLayout.innerHTML = `
<div class="${PREFIX}color-picker-card card border-black">
	<div class="${PREFIX}color-picker-header card-header d-flex align-items-center gap-2">
		<button type="button" class="${PREFIX}color-picker-back align-self-stretch d-inline-flex align-items-center gap-1 border-0 border-end rounded-0 bg-transparent text-reset px-2">
			<span class="d-inline-flex" aria-hidden="true">
				<app-icon data-name="Form_Chevron_left" data-size="1em"></app-icon>
			</span>
			<span class="${PREFIX}color-picker-preview d-inline-block border" aria-hidden="true"></span>
		</button>
		<span class="${PREFIX}color-picker-title fs-7"></span>
	</div>
	<div class="${PREFIX}color-picker-grid d-grid gap-2 p-2" role="radiogroup"></div>
</div>
`;

class ColorPickerComponent extends HTMLElement {
	static observedAttributes = ['data-palette', 'data-label', 'data-value'];

	private card: HTMLElement | null = null;
	private header: HTMLElement | null = null;
	private titleEl: HTMLElement | null = null;
	private preview: HTMLElement | null = null;
	private backBtn: HTMLButtonElement | null = null;
	private grid: HTMLElement | null = null;

	private colors: string[] = [];
	private readonly groupName = `${PREFIX}color-picker`;
	private skipRender = false;

	handler: any;
	private pointerSelection = false;

	constructor() {
		super();

		this.appendChild(colorPickerLayout.content.cloneNode(true));

		this.card = this.querySelector(`.${PREFIX}color-picker-card`);
		this.header = this.querySelector(`.${PREFIX}color-picker-header`);
		this.titleEl = this.querySelector(`.${PREFIX}color-picker-title`);
		this.preview = this.querySelector(`.${PREFIX}color-picker-preview`);
		this.backBtn = this.querySelector(`.${PREFIX}color-picker-back`);
		this.grid = this.querySelector(`.${PREFIX}color-picker-grid`);

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.backBtn?.addEventListener('click', this.handler);
		this.grid?.addEventListener('change', this.handler);
		this.grid?.addEventListener('pointerdown', this.handler);
		this.grid?.addEventListener('keyup', this.handler);

		this.backBtn?.setAttribute('aria-label', i18nServiceInstance.getMessage('colorPicker_back'));
		this.render();
	}

	disconnectedCallback(): void {
		this.backBtn?.removeEventListener('click', this.handler);
		this.grid?.removeEventListener('change', this.handler);
		this.grid?.removeEventListener('pointerdown', this.handler);
		this.grid?.removeEventListener('keyup', this.handler);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if (oldValue === newValue || this.skipRender) {
			return;
		}
		this.render();
	}

	get palette(): string[] {
		return this.colors;
	}

	/** Couleur sélectionnée, ou `null` si elle n'appartient pas à la palette courante. */
	get value(): string | null {
		const selected = this.grid?.querySelector<HTMLInputElement>('input:checked');
		return selected?.value ?? null;
	}

	/** Palette proposée à l'utilisateur ; la sélection courante est conservée si possible. */
	setPalette = (colors: string[]): void => {
		this.colors = Array.isArray(colors) ? colors : [];
		this.render();
	};

	/** Donne le focus à la pastille sélectionnée, sinon à la première de la grille. */
	focusSelectedSwatch = (): void => {
		const selected = this.grid?.querySelector<HTMLInputElement>('input:checked');
		const target = selected ?? this.grid?.querySelector<HTMLInputElement>('input');
		target?.focus();
	};

	private isDark = (): boolean => this.dataset.palette === 'dark';

	private normalizeColor = (color: string): string => (color || '').trim().toLowerCase();

	private render = (): void => {
		if (!this.card) {
			return;
		}

		const dark = this.isDark();
		this.card.classList.toggle('bg-black', dark);
		this.header?.classList.toggle('bg-white', dark);
		this.header?.classList.toggle('text-dark', dark);

		const label = this.dataset.label || '';
		if (this.titleEl) {
			this.titleEl.textContent = label;
		}
		this.grid?.setAttribute('aria-label', label);

		const value = this.normalizeColor(this.dataset.value);
		if (this.preview) {
			this.preview.style.backgroundColor = value || 'transparent';
		}

		this.renderSwatches(value);
	};

	private renderSwatches = (value: string): void => {
		if (!this.grid) {
			return;
		}

		this.grid.innerHTML = '';

		this.colors.forEach((color: string, index: number) => {
			const hex = this.normalizeColor(color);
			const id = `${this.groupName}-${index}`;

			const input = document.createElement('input');
			input.type = 'radio';
			input.classList.add('btn-check', `${PREFIX}color-picker-swatch-input`);
			input.name = this.groupName;
			input.id = id;
			input.value = hex;
			input.autocomplete = 'off';
			input.checked = hex === value;

			const swatch = document.createElement('label');
			swatch.classList.add(`${PREFIX}color-picker-swatch`, 'border');
			swatch.htmlFor = id;
			swatch.style.backgroundColor = hex;

			const name = document.createElement('span');
			name.classList.add('visually-hidden');
			name.textContent = i18nServiceInstance.getMessage('colorPicker_swatch', [hex]);
			swatch.appendChild(name);

			this.grid.appendChild(input);
			this.grid.appendChild(swatch);
		});
	};

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'click':
					this.dispatchEvent(new CustomEvent('colorPickerBack', {
						bubbles: true,
						composed: true,
						detail: {}
					}));
					break;
				case 'pointerdown':
					this.pointerSelection = true;
					break;
				case 'keyup':
					if (event.key === 'Enter' || event.key === ' ') {
						const checked = this.grid?.querySelector('input:checked') as HTMLInputElement;
						if (checked) {
							this.emitSelect(checked, true);
						}
					}
					break;
				case 'change': {
					const input = event.target as HTMLInputElement;
					if (!input?.checked) {
						return;
					}
					const commit = this.pointerSelection;
					this.pointerSelection = false;
					this.emitSelect(input, commit);
					break;
				}
			}
		}
	}

	private emitSelect = (input: HTMLInputElement, commit: boolean): void => {
		this.skipRender = true;
		this.dataset.value = input.value;
		this.skipRender = false;
		if (this.preview) {
			this.preview.style.backgroundColor = input.value;
		}
		this.dispatchEvent(new CustomEvent('colorPickerSelect', {
			bubbles: true,
			composed: true,
			detail: {
				value: input.value,
				index: this.colors.findIndex((color: string) => this.normalizeColor(color) === input.value),
				palette: this.dataset.palette || 'light',
				commit: commit
			}
		}));
	}
}

customElements.define('app-color-picker', ColorPickerComponent);
