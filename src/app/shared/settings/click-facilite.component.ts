const tmplClickFacilite: HTMLTemplateElement = document.createElement('template');
tmplClickFacilite.innerHTML = `
<div class="d-flex align-items-center gap-3">
	<app-btn-setting></app-btn-setting>
	<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>
</div>
`;

class ClickFaciliteComponent extends AbstractSetting {
	selectedElt: any;
	delay: number;
	isClicking = false;
	clickableElements = ['A', 'INPUT', 'SELECT', 'OPTION', 'TEXTAREA', 'LABEL', 'BUTTON'];
	timer: ReturnType<typeof setTimeout> | null = null;
	handlerClickFacilite: any;

	activesValues = {
		'values': 'noModifications,longClick_2,autoClick_2',
		'activeValue': 0
	};

	constructor() {
		super();

		this.setCallback(this.setClickFacilite.bind(this));

		this.appendChild(tmplClickFacilite.content.cloneNode(true));

		this.handlerClickFacilite = this.createHandlerClickFacilite();
	}

	setClickFacilite = (value: string): void => {
		let paramName = value.split('_')[0];
		this.delay = Number(value.split('_')[1]) * 1000;

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
		document.addEventListener('click', this.handlerClickFacilite);
		document.addEventListener('mousedown', this.handlerClickFacilite);
		document.addEventListener('mouseup', this.handlerClickFacilite);
	}

	autoClick = (): void => {
		document.addEventListener('mouseover', this.handlerClickFacilite);
		document.addEventListener('mouseout', this.handlerClickFacilite);
	}

	resetEventClick = (): void => {
		document.removeEventListener('click', this.handlerClickFacilite);
		document.removeEventListener('mouseover', this.handlerClickFacilite);
		document.removeEventListener('mouseout', this.handlerClickFacilite);
		document.removeEventListener('mousedown', this.handlerClickFacilite);
		document.removeEventListener('mouseup', this.handlerClickFacilite);
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

	createHandlerClickFacilite = () => {
		return (event: any) => {
			switch (event.type) {
				case 'click':
					event.preventDefault();
					break;
				case 'mousedown':
				case 'mouseover':
					this.setTimeoutClick(event);
					break;
				case 'mouseup':
				case 'mouseout':
					this.clearTimeout();
					break;
			}
		}
	}

	private setTimeoutClick = (event: any): void => {
		this.timer = setTimeout(() => {
			this.doClick(this.getClickableElt(event));
		}, this.delay);
	}

	private clearTimeout = (): void => {
		if (this.timer !== null) {
			clearTimeout(this.timer);
		}
	}
}

customElements.define('app-click-facilite', ClickFaciliteComponent);
