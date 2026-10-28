const colorPickerLayout: HTMLTemplateElement = document.createElement('template');
colorPickerLayout.innerHTML = `
<div class="${PREFIX}color-picker-card card border-black">
	<div class="${PREFIX}color-picker-header card-header d-flex align-items-center gap-2">
		<button type="button" class="${PREFIX}color-picker-back align-self-stretch d-inline-flex align-items-center gap-1 border-0 border-end rounded-0 bg-transparent text-reset px-2">
			<span class="d-inline-flex" aria-hidden="true">
				<app-icon data-name="Form_Chevron_left" data-size="1em"></app-icon>
			</span>
			<app-icon class="${PREFIX}color-picker-mode-icon d-none" data-size="1.25rem"></app-icon>
		</button>
		<span class="${PREFIX}color-picker-title fs-7"></span>
	</div>
	<div class="${PREFIX}color-picker-grid d-grid gap-2 p-2" role="group"></div>
</div>
`;

class ColorPickerComponent extends HTMLElement {
	static observedAttributes = ['data-palette', 'data-label', 'data-value'];

	private card: HTMLElement | null = null;
	private header: HTMLElement | null = null;
	private titleEl: HTMLElement | null = null;
	private modeIcon: HTMLElement | null = null;
	private backBtn: HTMLButtonElement | null = null;
	private grid: HTMLElement | null = null;

	private colors: string[] = [];
	private usedColors = new Set<string>();
	private selected: string | null = null;
	private skipRender = false;

	handler: any;

	constructor() {
		super();

		this.appendChild(colorPickerLayout.content.cloneNode(true));

		this.card = this.querySelector(`.${PREFIX}color-picker-card`);
		this.header = this.querySelector(`.${PREFIX}color-picker-header`);
		this.titleEl = this.querySelector(`.${PREFIX}color-picker-title`);
		this.modeIcon = this.querySelector(`.${PREFIX}color-picker-mode-icon`);
		this.backBtn = this.querySelector(`.${PREFIX}color-picker-back`);
		this.grid = this.querySelector(`.${PREFIX}color-picker-grid`);

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.backBtn?.addEventListener('click', this.handler);
		this.grid?.addEventListener('click', this.handler);
		this.grid?.addEventListener('keydown', this.handler);

		this.backBtn?.setAttribute('aria-label', i18nServiceInstance.getMessage('colorPicker_back'));
		this.render();
	}

	disconnectedCallback(): void {
		this.backBtn?.removeEventListener('click', this.handler);
		this.grid?.removeEventListener('click', this.handler);
		this.grid?.removeEventListener('keydown', this.handler);
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

	/** Couleur sélectionnée, ou `null` si aucune pastille n'est cochée. */
	get value(): string | null {
		return this.selected;
	}

	/** Palette proposée à l'utilisateur ; la sélection courante est conservée si possible. */
	setPalette = (colors: string[]): void => {
		this.colors = Array.isArray(colors) ? colors : [];
		this.render();
	};

	/** Couleurs déjà associées à d'autres règles : signalées par une coche, sans empêcher leur sélection. */
	setUsedColors = (colors: string[]): void => {
		this.usedColors = new Set((colors ?? []).map(this.normalizeColor).filter(Boolean));
		this.render();
	};

	/** Donne le focus à la pastille sélectionnée, sinon à la première de la grille. */
	focusSelectedSwatch = (): void => {
		(this.grid?.querySelector<HTMLButtonElement>('button[tabindex="0"]'))?.focus();
	};

	private isDark = (): boolean => this.dataset.palette === 'dark';

	private normalizeColor = (color: string): string => (color || '').trim().toLowerCase();

	private get swatches(): HTMLButtonElement[] {
		return Array.from(this.grid?.querySelectorAll<HTMLButtonElement>(`.${PREFIX}color-picker-swatch`) ?? []);
	}

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
		this.selected = this.colors.some((color: string) => this.normalizeColor(color) === value) ? value : null;

		this.renderModeIcon();
		this.renderSwatches();
	};

	/** Affiche l'icône du mode d'usage courant ; masquée tant qu'aucun mode n'est sélectionné. */
	private renderModeIcon = (): void => {
		if (!this.modeIcon) {
			return;
		}

		localStorageServiceInstance.getItem('selectedModeName')
			.then((selectedMode: any) => {
				if (!selectedMode) {
					this.modeIcon?.classList.add('d-none');
				} else {
					this.modeIcon?.classList.remove('d-none');
					this.modeIcon?.setAttribute('data-name', `${selectedMode}_border`);
				}
			});
	};

	private renderSwatches = (): void => {
		if (!this.grid) {
			return;
		}

		this.grid.innerHTML = '';

		this.colors.forEach((color: string) => {
			const hex = this.normalizeColor(color);
			const used = this.usedColors.has(hex);

			const swatch = document.createElement('button');
			swatch.type = 'button';
			swatch.classList.add(`${PREFIX}color-picker-swatch`, 'border', 'p-0');
			swatch.classList.toggle(`${PREFIX}color-picker-swatch-used`, used);
			swatch.dataset.color = hex;
			swatch.style.backgroundColor = hex;

			swatch.innerHTML = `<app-icon class="${PREFIX}color-picker-tick" data-name="tick" data-size="100%"></app-icon><span class="visually-hidden"></span>`;
			swatch.querySelector('.visually-hidden').textContent =
				i18nServiceInstance.getMessage(used ? 'colorPicker_swatchUsed' : 'colorPicker_swatch', [hex]);

			this.grid.appendChild(swatch);
		});

		this.updateSelection();
	};

	/** Reflète la sélection sur les pastilles ; une seule est focalisable au clavier (roving tabindex). */
	private updateSelection = (focused?: HTMLButtonElement): void => {
		const swatches = this.swatches;
		const tabbable = focused
			?? swatches.find((swatch: HTMLButtonElement) => swatch.dataset.color === this.selected)
			?? swatches[0];
		swatches.forEach((swatch: HTMLButtonElement) => {
			swatch.setAttribute('aria-pressed', String(swatch.dataset.color === this.selected));
			swatch.tabIndex = swatch === tabbable ? 0 : -1;
		});
	};

	/** Coche la pastille, ou la décoche si elle l'était déjà : une seule couleur au plus est sélectionnée. */
	private toggle = (swatch: HTMLButtonElement): void => {
		const color = swatch.dataset.color;
		this.selected = this.selected === color ? null : color;
		this.skipRender = true;
		this.dataset.value = this.selected ?? '';
		this.skipRender = false;
		this.updateSelection(swatch);
	};

	private moveFocus = (current: HTMLButtonElement, key: string): void => {
		const swatches = this.swatches;
		const index = swatches.indexOf(current);
		if (index < 0) {
			return;
		}
		const columns = Math.max(1, getComputedStyle(this.grid).gridTemplateColumns.split(' ').length);
		let next = index;
		switch (key) {
			case 'ArrowRight': next = index + 1; break;
			case 'ArrowLeft': next = index - 1; break;
			case 'ArrowDown': next = index + columns; break;
			case 'ArrowUp': next = index - columns; break;
			case 'Home': next = 0; break;
			case 'End': next = swatches.length - 1; break;
		}
		const target = swatches[Math.min(Math.max(next, 0), swatches.length - 1)];
		swatches.forEach((swatch: HTMLButtonElement) => swatch.tabIndex = swatch === target ? 0 : -1);
		target.focus();
	};

	private createHandler = () => {
		return (event: any) => {
			if (event.currentTarget === this.backBtn) {
				this.dispatchEvent(new CustomEvent('colorPickerBack', {
					bubbles: true,
					composed: true,
					detail: {}
				}));
				return;
			}

			const swatch = (event.target as HTMLElement)?.closest?.(`.${PREFIX}color-picker-swatch`) as HTMLButtonElement;
			if (!swatch) {
				return;
			}
			switch (event.type) {
				case 'click':
					this.toggle(swatch);
					break;
				case 'keydown':
					if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
						event.preventDefault();
						this.moveFocus(swatch, event.key);
					}
					break;
			}
		}
	}
}

customElements.define('app-color-picker', ColorPickerComponent);
