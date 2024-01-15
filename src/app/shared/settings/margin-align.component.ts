const tmplMarginAlign: HTMLTemplateElement = document.createElement('template');
tmplMarginAlign.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="margin" data-icon="Text_Marge"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class MarginAlignComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,alignLeft,margeList",
		"activeValue": 0
	};

	constructor() {
		super();

		this.appendChild(tmplMarginAlign.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback('marginAlign');
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setMargin((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setMargin = (value: string): void => {
		const elements = value === 'margeList' ?
			document.querySelectorAll('ul, ol') :
			document.body.querySelectorAll('*');

		elements.forEach((elt) => {
			const element = elt as HTMLElement;
			switch (value) {
				case 'alignLeft': {
					element.style.textAlign = 'left';
					break;
				}
				case 'marginLeft': {
					element.style.textAlign = 'left';
					element.style.marginLeft = '40px';
					break;
				}
				case 'margeList': {
					element.style.listStylePosition = 'initial';
					element.style.listStyleImage = 'none';
					element.style.listStyleType = 'decimal';
					break;
				}
				default: {
					element.style.textAlign = null;
					element.style.marginLeft = null;
					element.style.listStylePosition = null;
					element.style.listStyleImage = null;
					element.style.listStyleType = null;
					break;
				}
			}
		});
	}
}

customElements.define('app-margin-align', MarginAlignComponent);
