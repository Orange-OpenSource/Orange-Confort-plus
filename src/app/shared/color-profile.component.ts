const colorProfileLayout: HTMLTemplateElement = document.createElement('template');
colorProfileLayout.innerHTML = `
	<section class="text-start position-relative">
		<h3 class="fs-6">Profil de couleurs</h3>
		<div class="${PREFIX}color-profile-rules-list d-flex flex-column gap-2"></div>
		<app-color-picker class="sc-color-picker d-none"></app-color-picker>
	</section>
`;

class ColorProfileComponent extends HTMLElement {
	static observedAttributes = ['data-profile', 'data-background', 'data-profile-key'];

	handler: any;

	private picker: ColorPickerComponent | null = null;
	private activeRule: ColorProfileRuleComponent | null = null;
	private activeRuleKey: string = null;

	constructor() {
		super();

		this.appendChild(colorProfileLayout.content.cloneNode(true));

		this.picker = this.querySelector('app-color-picker') as ColorPickerComponent;

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.addEventListener('colorRuleClick', this.handler);
		this.addEventListener('colorPickerSelect', this.handler);
		this.addEventListener('colorPickerBack', this.handler);
		this.addEventListener('keydown', this.handler);
		document.addEventListener('click', this.handler, true);

		if (this.dataset.profile) {
			this.renderProfile(this.dataset.profile);
		}
	}

	disconnectedCallback(): void {
		this.removeEventListener('colorRuleClick', this.handler);
		this.removeEventListener('colorPickerSelect', this.handler);
		this.removeEventListener('colorPickerBack', this.handler);
		this.removeEventListener('keydown', this.handler);
		document.removeEventListener('click', this.handler, true);
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ((name === 'data-profile' || name === 'data-background') && newValue && this.dataset.profile) {
			this.closePicker(false);
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

		const rulesContainer = this.querySelector(`.${PREFIX}color-profile-rules-list`);
		if (rulesContainer) {
			rulesContainer.innerHTML = '';
		}

		rules.forEach((rule) => {
			const ruleElement = new ColorProfileRuleComponent();
			ruleElement.setAttribute('data-rule', JSON.stringify(rule));
			ruleElement.setAttribute('data-background', this.dataset.background || 'white');
			rulesContainer?.appendChild(ruleElement);
		});
	};

	private openPicker = (ruleElement: ColorProfileRuleComponent, ruleKey: string): void => {
		if (!this.picker) {
			return;
		}

		const rule = ruleElement.rule;
		this.activeRule = ruleElement;
		this.activeRuleKey = ruleKey;

		this.picker.dataset.palette = this.dataset.background === 'black' ? 'dark' : 'light';
		this.picker.dataset.label = i18nServiceInstance.getMessage('colorPicker_label', [rule.phonetics]);
		this.picker.dataset.value = rule.color || '';
		this.picker.setPalette(colorReadServiceInstance.getColorPalette(this.profileKey));

		this.picker.classList.remove('d-none');
		this.positionPicker(ruleElement);

		ruleElement.setPickerExpanded(true);
		this.picker.focusSelectedSwatch();
	};

	/**
	 * Place la carte juste sous la pastille cliquée, alignée sur le bord droit du panneau,
	 * puis s'assure qu'elle est visible dans la zone défilante de la palette.
	 */
	private positionPicker = (ruleElement: HTMLElement): void => {
		const section = this.querySelector('section') as HTMLElement;
		if (!this.picker || !section) {
			return;
		}

		const sectionBox = section.getBoundingClientRect();
		const ruleBox = ruleElement.getBoundingClientRect();
		const pickerBox = this.picker.getBoundingClientRect();

		this.picker.style.top = `${ruleBox.bottom - sectionBox.top + 4}px`;
		this.picker.style.left = `${Math.max(0, sectionBox.width - pickerBox.width)}px`;

		this.picker.scrollIntoView({ block: 'nearest' });
	};

	private closePicker = (restoreFocus = true): void => {
		if (!this.picker || this.picker.classList.contains('d-none')) {
			return;
		}

		this.picker.classList.add('d-none');
		this.activeRule?.setPickerExpanded(false);
		if (restoreFocus) {
			this.activeRule?.focusSwatch();
		}
		this.activeRule = null;
		this.activeRuleKey = null;
	};

	private applyColor = (color: string, commit: boolean): void => {
		const ruleElement = this.activeRule;
		const ruleKey = this.activeRuleKey;
		if (!ruleElement || !ruleKey) {
			return;
		}

		colorReadServiceInstance.setRuleColor(this.profileKey, ruleKey, color);
		ruleElement.setColor(color);
		if (commit) {
			this.closePicker();
		}
	};

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'colorRuleClick':
					this.openPicker(event.target as ColorProfileRuleComponent, event.detail.ruleKey);
					break;
				case 'colorPickerSelect':
					this.applyColor(event.detail.value, event.detail.commit !== false);
					break;
				case 'colorPickerBack':
					this.closePicker();
					break;
				case 'keydown':
					if (event.key === 'Escape' && !this.picker?.classList.contains('d-none')) {
						event.stopPropagation();
						this.closePicker();
					}
					break;
				case 'click':
					if (!this.picker || this.picker.classList.contains('d-none')) {
						return;
					}
					if (!event.composedPath().includes(this)) {
						this.closePicker(false);
					}
					break;
			}
		}
	}
}

customElements.define('app-color-profile', ColorProfileComponent);
