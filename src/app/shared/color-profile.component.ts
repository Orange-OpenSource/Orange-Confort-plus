const colorProfileLayout: HTMLTemplateElement = document.createElement('template');
colorProfileLayout.innerHTML = `
	<section class="text-start position-relative">
		<h3 class="fs-6">Profil de couleurs</h3>
		<div class="accordion">
			<div class="accordion-item">
				<h4 class="accordion-header m-0">
					<button
						type="button"
						class="${PREFIX}color-profile-accordion-btn accordion-button fs-6 px-2"
						aria-expanded="true"
						aria-controls="${PREFIX}color-profile-default-panel"
						data-i18n="colorProfile_defaultTitle"
					></button>
				</h4>
				<div id="${PREFIX}color-profile-default-panel" class="accordion-collapse collapse show">
					<div class="accordion-body px-2 py-2">
						<p class="fs-7 mb-2" data-i18n="colorProfile_defaultSubtitle"></p>
						<div class="${PREFIX}color-profile-default-rules d-flex flex-column gap-2"></div>
					</div>
				</div>
			</div>
			<div class="accordion-item">
				<h4 class="accordion-header m-0">
					<button
						type="button"
						class="${PREFIX}color-profile-accordion-btn accordion-button collapsed fs-6 px-2"
						aria-expanded="false"
						aria-controls="${PREFIX}color-profile-other-panel"
						data-i18n="colorProfile_otherTitle"
					></button>
				</h4>
				<div id="${PREFIX}color-profile-other-panel" class="accordion-collapse collapse">
					<div class="accordion-body px-2 py-2">
						<p class="fs-7 mb-2" data-i18n="colorProfile_otherSubtitle"></p>
						<div class="${PREFIX}color-profile-other-rules d-flex flex-column gap-2"></div>
						<button
							type="button"
							class="${PREFIX}color-profile-add card border-black flex-row align-items-center gap-2 w-100 mt-2 ps-2 py-2 fs-7"
							aria-haspopup="dialog"
							aria-expanded="false"
						>
							<span class="d-inline-flex" aria-hidden="true">
								<app-icon data-name="Plus_small" data-size="1.5em"></app-icon>
							</span>
							<span class="${PREFIX}color-profile-add-label"></span>
						</button>
					</div>
				</div>
			</div>
		</div>
		<app-color-picker class="sc-color-picker d-none"></app-color-picker>
		<app-phoneme-picker class="sc-color-picker d-none"></app-phoneme-picker>
	</section>
`;

class ColorProfileComponent extends HTMLElement {
	static observedAttributes = ['data-profile', 'data-background', 'data-profile-key'];

	handler: any;

	private picker: ColorPickerComponent | null = null;
	private phonemePicker: PhonemePickerComponent | null = null;
	private addBtn: HTMLButtonElement | null = null;
	private accordionBtns: HTMLButtonElement[] = [];
	private defaultRulesList: HTMLElement | null = null;
	private otherRulesList: HTMLElement | null = null;
	private activeRule: ColorProfileRuleComponent | null = null;
	private activeRuleKey: string = null;
	/** Règle ajoutée dont la couleur n'a pas encore été validée. */
	private pendingRule: ColorProfileRuleComponent | null = null;

	constructor() {
		super();

		this.appendChild(colorProfileLayout.content.cloneNode(true));

		this.picker = this.querySelector('app-color-picker') as ColorPickerComponent;
		this.phonemePicker = this.querySelector('app-phoneme-picker') as PhonemePickerComponent;
		this.addBtn = this.querySelector(`.${PREFIX}color-profile-add`);
		this.accordionBtns = Array.from(this.querySelectorAll<HTMLButtonElement>(`.${PREFIX}color-profile-accordion-btn`));
		this.defaultRulesList = this.querySelector(`.${PREFIX}color-profile-default-rules`);
		this.otherRulesList = this.querySelector(`.${PREFIX}color-profile-other-rules`);

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.addEventListener('colorRuleClick', this.handler);
		this.addEventListener('colorPickerBack', this.handler);
		this.addEventListener('phonemePickerSelect', this.handler);
		this.addEventListener('phonemePickerBack', this.handler);
		this.addEventListener('keydown', this.handler);
		this.addBtn?.addEventListener('click', this.handler);
		this.accordionBtns.forEach((btn) => btn.addEventListener('click', this.handler));
		document.addEventListener('click', this.handler, true);

		this.querySelectorAll<HTMLElement>('[data-i18n]').forEach((element) => {
			element.textContent = i18nServiceInstance.getMessage(element.dataset.i18n);
		});

		const addLabel = this.querySelector(`.${PREFIX}color-profile-add-label`);
		if (addLabel) {
			addLabel.textContent = i18nServiceInstance.getMessage('colorProfile_addPhoneme');
		}

		if (this.dataset.profile) {
			this.renderProfile(this.dataset.profile);
		}
	}

	disconnectedCallback(): void {
		this.removeEventListener('colorRuleClick', this.handler);
		this.removeEventListener('colorPickerBack', this.handler);
		this.removeEventListener('phonemePickerSelect', this.handler);
		this.removeEventListener('phonemePickerBack', this.handler);
		this.removeEventListener('keydown', this.handler);
		this.addBtn?.removeEventListener('click', this.handler);
		this.accordionBtns.forEach((btn) => btn.removeEventListener('click', this.handler));
		document.removeEventListener('click', this.handler, true);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ((name === 'data-profile' || name === 'data-background') && newValue && this.dataset.profile) {
			this.closePicker(false, false);
			this.closePhonemePicker(false);
			this.renderProfile(this.dataset.profile);
		}
	}

	private get profileKey(): ColorProfileKey {
		return (this.dataset.profileKey as ColorProfileKey) || 'lightBgColor';
	}

	private renderProfile = (profileJson: string): void => {
		let profile = JsonProfile.from(JSON.parse(profileJson));
		let rules: ProcessFormatRule[] = profile.process?.flatMap(
			(step: ProcessStep) => step.format ?? []
		) ?? [];

		if (this.defaultRulesList) {
			this.defaultRulesList.innerHTML = '';
		}
		if (this.otherRulesList) {
			this.otherRulesList.innerHTML = '';
		}

		rules.forEach((rule) => {
			const ruleElement = new ColorProfileRuleComponent();
			ruleElement.setAttribute('data-rule', JSON.stringify(rule));
			ruleElement.setAttribute('data-background', this.dataset.background || 'white');
			const isDefault = colorReadServiceInstance.isDefaultRule(this.profileKey, colorReadServiceInstance.getRuleKey(rule));
			(isDefault ? this.defaultRulesList : this.otherRulesList)?.appendChild(ruleElement);
		});

		this.resetAccordions();
		this.updateAddButton();
	};

	/** État initial des accordéons : phonèmes par défaut dépliés, autres phonèmes repliés. */
	private resetAccordions = (): void => {
		this.accordionBtns.forEach((btn: HTMLButtonElement, index: number) => {
			this.setAccordionOpen(btn, index === 0);
		});
	};

	private setAccordionOpen = (btn: HTMLButtonElement, open: boolean): void => {
		btn.classList.toggle('collapsed', !open);
		btn.setAttribute('aria-expanded', String(open));
		this.querySelector(`#${btn.getAttribute('aria-controls')}`)?.classList.toggle('show', open);
	};

	private toggleAccordion = (btn: HTMLButtonElement): void => {
		this.closePicker(false);
		this.closePhonemePicker(false);
		this.setAccordionOpen(btn, btn.getAttribute('aria-expanded') !== 'true');
	};

	private get isDark(): boolean {
		return this.dataset.background === 'black';
	}

	/** Adapte le bouton d'ajout au fond du profil ; il est désactivé quand il ne reste aucun phonème à ajouter. */
	private updateAddButton = (): void => {
		if (!this.addBtn) {
			return;
		}
		this.addBtn.classList.toggle('bg-black', this.isDark);
		this.addBtn.classList.toggle('text-white', this.isDark);
		this.addBtn.classList.toggle('bg-white', !this.isDark);
		this.addBtn.disabled = colorReadServiceInstance.getAvailablePhonemes(this.profileKey).length === 0;
	};

	private openPhonemePicker = (): void => {
		if (!this.phonemePicker || !this.addBtn) {
			return;
		}

		this.closePicker(false);

		this.phonemePicker.dataset.palette = this.isDark ? 'dark' : 'light';
		this.phonemePicker.setPhonemes(colorReadServiceInstance.getAvailablePhonemes(this.profileKey));

		this.phonemePicker.classList.remove('d-none');
		this.positionPopover(this.phonemePicker, this.addBtn);

		this.addBtn.setAttribute('aria-expanded', 'true');
		this.phonemePicker.focusFirstAvailable();
	};

	private closePhonemePicker = (restoreFocus = true): void => {
		if (!this.phonemePicker || this.phonemePicker.classList.contains('d-none')) {
			return;
		}

		this.phonemePicker.classList.add('d-none');
		this.addBtn?.setAttribute('aria-expanded', 'false');
		if (restoreFocus) {
			this.addBtn?.focus();
		}
	};

	/** Ajoute aux autres phonèmes une règle sans couleur pour le phonème choisi, puis ouvre le sélecteur de couleur. */
	private addRule = (rule: ProcessFormatRule): void => {
		const rulesContainer = this.otherRulesList;
		if (!rulesContainer || !rule) {
			return;
		}

		this.closePhonemePicker(false);

		const ruleElement = new ColorProfileRuleComponent();
		ruleElement.setAttribute('data-rule', JSON.stringify({ ...rule, color: '' }));
		ruleElement.setAttribute('data-background', this.dataset.background || 'white');
		rulesContainer.appendChild(ruleElement);

		this.pendingRule = ruleElement;
		this.openPicker(ruleElement, colorReadServiceInstance.getRuleKey(rule));
	};

	private openPicker = (ruleElement: ColorProfileRuleComponent, ruleKey: string): void => {
		if (!this.picker) {
			return;
		}

		const rule = ruleElement.rule;
		if (this.activeRule === ruleElement && !this.picker.classList.contains('d-none')) {
			this.picker.focusSelectedSwatch();
			return;
		}
		if (this.activeRule && this.activeRule !== ruleElement) {
			/* Ouvrir une autre règle valide d'abord la sélection en cours */
			this.closePicker(false);
		}
		this.activeRule = ruleElement;
		this.activeRuleKey = ruleKey;

		this.closePhonemePicker(false);

		this.picker.dataset.palette = this.isDark ? 'dark' : 'light';
		this.picker.dataset.label = i18nServiceInstance.getMessage('colorPicker_label', [rule.phonetics || '∅']);
		this.picker.dataset.value = rule.color || '';
		this.picker.setPalette(colorReadServiceInstance.getColorPalette(this.profileKey));
		this.picker.setUsedColors(this.getOtherRulesColors(ruleElement));

		this.picker.classList.remove('d-none');
		this.positionPopover(this.picker, ruleElement);

		ruleElement.setPickerExpanded(true);
		this.picker.focusSelectedSwatch();
	};

	/**
	 * Place la carte juste sous l'élément déclencheur, alignée sur le bord droit du panneau,
	 * puis s'assure qu'elle est visible dans la zone défilante de la palette.
	 */
	private positionPopover = (popover: HTMLElement, anchor: HTMLElement): void => {
		const section = this.querySelector('section') as HTMLElement;
		if (!popover || !section) {
			return;
		}

		const sectionBox = section.getBoundingClientRect();
		const anchorBox = anchor.getBoundingClientRect();
		const popoverBox = popover.getBoundingClientRect();

		popover.style.top = `${anchorBox.bottom - sectionBox.top + 4}px`;
		popover.style.left = `${Math.max(0, sectionBox.width - popoverBox.width)}px`;

		popover.scrollIntoView({ block: 'nearest' });
	};

	/** Couleurs des règles affichées, hormis celle en cours d'édition. */
	private getOtherRulesColors = (ruleElement: ColorProfileRuleComponent): string[] => {
		return Array.from(this.querySelectorAll<ColorProfileRuleComponent>('app-color-profile-rule'))
			.filter((element: ColorProfileRuleComponent) => element !== ruleElement)
			.map((element: ColorProfileRuleComponent) => element.rule?.color)
			.filter(Boolean);
	};

	/**
	 * Ferme le sélecteur de couleur. Par défaut la sélection courante est validée
	 * (bouton retour, Échap, clic extérieur, ouverture d'une autre règle).
	 */
	private closePicker = (restoreFocus = true, commit = true): void => {
		if (!this.picker || this.picker.classList.contains('d-none')) {
			return;
		}

		this.picker.classList.add('d-none');
		this.activeRule?.setPickerExpanded(false);

		if (commit) {
			this.applyColor(this.picker.value ?? '');
		}

		if (this.pendingRule) {
			/* Aucune couleur validée pour le phonème ajouté : la règle est abandonnée */
			this.pendingRule.remove();
			this.pendingRule = null;
			if (restoreFocus) {
				this.addBtn?.focus();
			}
		} else if (restoreFocus) {
			this.activeRule?.focusSwatch();
		}
		this.activeRule = null;
		this.activeRuleKey = null;
	};

	/** Enregistre la couleur choisie ; une couleur vide retire la coloration de la règle. */
	private applyColor = (color: string): void => {
		const ruleElement = this.activeRule;
		const ruleKey = this.activeRuleKey;
		if (!ruleElement || !ruleKey) {
			return;
		}

		if (ruleElement === this.pendingRule) {
			if (!color) {
				return;
			}
			this.pendingRule = null;
			ruleElement.setColor(color);
			colorReadServiceInstance.setRuleColor(this.profileKey, ruleKey, color).then(this.updateAddButton);
			return;
		}

		if ((ruleElement.rule?.color || '') === color) {
			return;
		}
		ruleElement.setColor(color);
		colorReadServiceInstance.setRuleColor(this.profileKey, ruleKey, color);
	};

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'colorRuleClick':
					this.openPicker(event.target as ColorProfileRuleComponent, event.detail.ruleKey);
					break;
				case 'colorPickerBack':
					this.closePicker();
					break;
				case 'phonemePickerSelect':
					this.addRule(event.detail.rule);
					break;
				case 'phonemePickerBack':
					this.closePhonemePicker();
					break;
				case 'keydown':
					if (event.key !== 'Escape') {
						return;
					}
					if (this.picker && !this.picker.classList.contains('d-none')) {
						event.stopPropagation();
						this.closePicker();
					} else if (this.phonemePicker && !this.phonemePicker.classList.contains('d-none')) {
						event.stopPropagation();
						this.closePhonemePicker();
					}
					break;
				case 'click':
					if (this.accordionBtns.includes(event.currentTarget)) {
						this.toggleAccordion(event.currentTarget);
						return;
					}
					if (event.currentTarget === this.addBtn) {
						if (this.phonemePicker?.classList.contains('d-none')) {
							this.openPhonemePicker();
						} else {
							this.closePhonemePicker();
						}
						return;
					}
					if (!event.composedPath().includes(this)) {
						this.closePicker(false);
						this.closePhonemePicker(false);
					}
					break;
			}
		}
	}
}

customElements.define('app-color-profile', ColorProfileComponent);
