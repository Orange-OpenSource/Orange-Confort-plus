const tmplIncreaseTextSize: HTMLTemplateElement = document.createElement('template');
tmplIncreaseTextSize.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="textSize" data-icon="Text_Size"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class IncreaseTextSizeComponent extends AbstractSetting {
	activesValues = {
		"values": "noModifications,110%,130%",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setFontSize.bind(this));

		this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
	}

	connectedCallback(): void {
		super.connectedCallback('textSize');
		this.settingBtn.addEventListener('changeSettingEvent', (event: any) => {
			this.setFontSize((event as CustomEvent).detail.value);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this.settingBtn.removeEventListener('changeSettingEvent', () => { });
	}

	setFontSize = (value: string): void => {
		if (value === 'noModifications') {
			document.documentElement.style.fontSize = null;
		} else {
			document.documentElement.style.fontSize = value;
		}
	}
}

customElements.define('app-increase-text-size', IncreaseTextSizeComponent);
