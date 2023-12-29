const tmplMarginAlign: HTMLTemplateElement = document.createElement('template');
tmplMarginAlign.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="margin" data-icon="Text_Marge"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class MarginAlignComponent extends AbstractSetting {
	constructor() {
		super();

		this.appendChild(tmplMarginAlign.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setMargin((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setMargin = (value: string): void => {
		const elements = value === 'list' ?
			document.querySelectorAll('ul, ol') :
			document.getElementsByTagName('body')[0].querySelectorAll('*');

		elements.forEach((elt) => {
			const element = elt as HTMLElement;
			if (value === 'align') {
				element.style.textAlign = 'left';
			} else if (value === 'margin') {
				element.style.textAlign = 'left';
				element.style.marginLeft = '40px';
			} else if (value === 'list') {
				element.style.listStylePosition = 'initial';
				element.style.listStyleImage = 'none';
				element.style.listStyleType = 'decimal';
			} else {
				element.style.textAlign = null;
				element.style.marginLeft = null;
				element.style.listStylePosition = null;
				element.style.listStyleImage = null;
				element.style.listStyleType = null;
			}
		});
	}
}

customElements.define('app-margin-align', MarginAlignComponent);
