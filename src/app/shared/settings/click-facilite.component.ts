const tmplClickFacilite: HTMLTemplateElement = document.createElement('template');
tmplClickFacilite.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting data-label="clicFacilte" data-icon="ClicFacile"></app-btn-setting>
	<app-btn-modal class="d-none"></app-btn-modal>
</div>
`;

class ClickFaciliteComponent extends AbstractSetting {
	selectedElt: any;
	delay: number;
	isClicking = false;
	clickableElements = ['A', 'INPUT', 'SELECT', 'OPTION', 'TEXTAREA', 'LABEL', 'BUTTON'];

	activesValues = {
		"values": "noModifications,longClick+2,autoClick+2",
		"activeValue": 0
	};

	constructor() {
		super();

		this.setCallback(this.setClickFacilite.bind(this));

		this.appendChild(tmplClickFacilite.content.cloneNode(true));
	}

	setClickFacilite = (value: string): void => {
		let paramName = value.split('+')[0];
		this.delay = Number(value.split('+')[1]) * 1000;

		switch (paramName) {
			case 'bigZone': {
				this.resetEventClick();
				scrollServiceInstance.setScroll({ name: this.name, btnState: '', bigScrollActivated: true });
				break;
			}
			case 'longClick': {
				this.resetEventClick();
				scrollServiceInstance.setScroll({ name: this.name, btnState: 'click', bigScrollActivated: true });
				this.longClick();
				break;
			}
			case 'autoClick': {
				this.resetEventClick();
				scrollServiceInstance.setScroll({ name: this.name, btnState: 'click', bigScrollActivated: true });
				this.autoClick();
				break;
			}
			default: {
				this.resetEventClick();
				scrollServiceInstance.setScroll({ name: this.name, btnState: '', bigScrollActivated: false });
				break;
			}
		}
	}

	getClickableElt = (event: MouseEvent): any => {
		let pointedElt: any = event.target;
		let closestPointedElt: any = pointedElt.closest(this.clickableElements.join(','))
		return this.clickableElements.includes(pointedElt.nodeName) ? pointedElt :
			closestPointedElt ? closestPointedElt : pointedElt;
	}

	longClick = (): void => {
		document.addEventListener('click', (event: Event) => {
			event.preventDefault();
		});

		document.addEventListener('mousedown', (event: MouseEvent) => {
			this.isClicking = true;

			setTimeout(() => {
				if (this.isClicking) {
					this.doClick(this.getClickableElt(event));
				}
			}, this.delay);
		});

		document.addEventListener('mouseup', () => {
			this.isClicking = false;
		});
	}

	autoClick = (): void => {
		let timer: ReturnType<typeof setTimeout> | null = null;

		document.addEventListener('mouseover', (event: MouseEvent) => {
			timer = setTimeout(() => {
				this.doClick(this.getClickableElt(event));
			}, this.delay);
		});

		document.addEventListener('mouseout', () => {
			if (timer !== null) {
				clearTimeout(timer);
			}
		});
	}

	resetEventClick = (): void => {
		document.removeEventListener('click', () => { });
		document.removeEventListener('mouseover', () => { });
		document.removeEventListener('mouseout', () => { });
		document.removeEventListener('mousedown', () => { });
		document.removeEventListener('mouseup', () => { });
	}

	doClick = (elt: any): void => {
		if (this.clickableElements.includes(elt.nodeName)) {
			switch (elt.nodeName) {
				case 'A':
				case 'AREA':
					this.clickLink(elt);
					break;
				case 'INPUT':
					this.clickInput(elt);
					break;
				case 'SELECT':
				case 'TEXTAREA':
					elt.focus();
					break;
				case 'OPTION':
					this.selectOption(elt);
					break;
				case 'LABEL':
					document.getElementById(elt.htmlFor).click();
					break;
				default:
					elt.click();
					break;
			}
		} else if (elt.onclick && elt.onclick !== null) {
			elt.onclick();
		} else {
			elt.click();
		}
	};

	clickLink = (elt: any): void => {
		if (elt.href && elt.href !== "") {
			window.location = elt.href;
		}
	}

	clickInput = (elt: any): void => {
		elt.focus();
		switch (elt.type) {
			case 'radio':
				elt.checked = true;
				break;
			case 'checkbox':
				elt.checked = !elt.checked;
				break;
		}
	}

	selectOption = (elt: any): void => {
		let options = elt.closest('SELECT')?.options;
		for (var i = 0; i < options.length; i++) {
			if (options[i].text === elt.text) {
				options[i].selected = true;
				elt.focus();
			} else {
				options[i].selected = false;
			}
		}
	}
}

customElements.define('app-click-facilite', ClickFaciliteComponent);
