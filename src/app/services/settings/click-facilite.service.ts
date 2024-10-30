let clickFaciliteServiceIsInstantiated: boolean;

class ClickFaciliteService {
	selectedElt: any;
	delay: number;
	isClicking = false;
	clickableElements = ['A', 'INPUT', 'SELECT', 'OPTION', 'TEXTAREA', 'LABEL', 'BUTTON'];
	timer: ReturnType<typeof setTimeout> | null = null;
	handlerClickFacilite: any;

	constructor() {
		if (clickFaciliteServiceIsInstantiated) {
			throw new Error('ClickFaciliteService is already instantiated.');
		}

		clickFaciliteServiceIsInstantiated = true;

		this.handlerClickFacilite = this.createHandlerClickFacilite();
	}

	setClickFacilite = (value: string): void => {
		let paramName = value.split('_')[0];
		this.delay = parseInt(value.split('_')[1]?.replace(/\D/g, ''), 10) * 1000;

		switch (paramName) {
			case CLICK_FACILITE_BIG_ZONE: {
				this.resetEventClick();
				scrollAspectServiceInstance.setScrollAspect('bigScroll');
				scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
				break;
			}
			case CLICK_FACILITE_LONG_CLICK: {
				this.resetEventClick();
				scrollAspectServiceInstance.setScrollAspect('bigScroll');
				scrollTypeServiceInstance.setScrollType('scrollOnClick');
				this.longClick();
				break;
			}
			case CLICK_FACILITE_AUTO_CLICK: {
				this.resetEventClick();
				scrollAspectServiceInstance.setScrollAspect('bigScroll');
				scrollTypeServiceInstance.setScrollType('scrollOnMouseover');
				this.autoClick();
				break;
			}
			default: {
				scrollAspectServiceInstance.setScrollAspect(DEFAULT_VALUE);
				scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
				this.resetEventClick();
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
