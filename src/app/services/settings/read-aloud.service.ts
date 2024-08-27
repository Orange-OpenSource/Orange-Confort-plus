let readAloudServiceIsInstantiated: boolean;

class ReadAloudService extends BodySelectorService {
	handler: any;
	tooltipReadAloud: HTMLElement;
	readAloudTooltipId = `${PREFIX}read-aloud-tooltip`;
	readAloudSpan = `${PREFIX}read-aloud-span`;

	/* @todo: vérifier si ces REGEX correspondent aux autres langues que le français. */
	regexWord = /\S+\s*[.,!?]*/g;
	regexSentence = /[^\.!\?]+[\.!\?]+["']?|.+$/g;

	classReadAloud = `
	#${this.readAloudTooltipId} {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		width: fit-content;
		padding: 1rem;
		pointer-events: none;
		z-index: calc(infinity)
		transform: translate(75px, 50%);
	}`;

	constructor() {
		super();
		if (readAloudServiceIsInstantiated) {
			throw new Error('ReadAloudService is already instantiated.');
		}

		readAloudServiceIsInstantiated = true;

		this.handler = this.createHandler();
	}

	setReadAloud = (value: string): void => {
		this.resetBody();
		if (value === DEFAULT_VALUE) {
			this.resetReadAloud();
		} else {
			switch (value) {
				case 'word':
					this.setBodyToSpeech(this.regexWord);
					break;
				case 'sentence':
					this.setBodyToSpeech(this.regexSentence);
					break;
				case 'all':
					document.addEventListener('focusin', this.handler);
					break;
				default:
					break
			}
			this.setTooltip();
			document.addEventListener('pointerdown', this.handler);
			document.addEventListener('keydown', this.handler);
			document.addEventListener('contextmenu', this.handler);
		}

		if (textColorServiceInstance.textColorIsActive) {
			textColorServiceInstance.setTextColor('active');
		}
	}

	setBodyToSpeech = (regex: RegExp): void => {
		const bodyChildren = this.getBodyElements();

		bodyChildren.forEach((child: any) => {
			const textNodes = this.getTextNodes(child);

			textNodes.forEach((node: any) => {
				const text = node.nodeValue;
				if (text && !this.isAlreadyEdited(node, this.readAloudSpan)) {
					const parent = node.parentNode;
					const fragment = this.createFragmentForText(text, regex);

					if (parent) {
						parent.insertBefore(fragment, node);
						parent.removeChild(node);
					}
				}
			});
		});
	}

	private createFragmentForText(text: string, regex: RegExp): DocumentFragment {
		const fragment = document.createDocumentFragment();
		const items = text.match(regex);

		if (items?.length > 0) {
			items?.forEach((item: string, index: number) => {
				const span = document.createElement('span');
				span.classList.add(this.readAloudSpan);
				span.textContent = item;
				fragment.appendChild(span);

				if (index < items.length - 1) {
					fragment.appendChild(document.createTextNode(' '));
				}
			});
		}

		return fragment;
	}

	private resetBody = (): void => {
		this.tooltipReadAloud?.remove();
		this.resetToDefaultBody([this.readAloudSpan, TEXT_COLOR_SPAN_CLASS]);
	}

	resetReadAloud = (): void => {
		stylesServiceInstance.removeStyle('read-aloud');
		document.removeEventListener('pointermove', this.handler);
		document.removeEventListener('pointerdown', this.handler);
		document.removeEventListener('keydown', this.handler);
		document.removeEventListener('contextmenu', this.handler);
		document.removeEventListener('focusin', this.handler);
	}

	setTooltip = (): void => {
		const fragment = document.createDocumentFragment();
		const tooltip = document.createElement('div');
		tooltip.setAttribute('id', this.readAloudTooltipId);
		tooltip.textContent = i18nServiceInstance.getMessage('readAloud_tooltip');
		fragment.appendChild(tooltip);
		document.body.insertBefore(fragment, document.body.firstChild);
		stylesServiceInstance.setStyle('read-aloud', this.classReadAloud);
		this.tooltipReadAloud = document.querySelector(`#${this.readAloudTooltipId}`);
		document.addEventListener('pointermove', this.handler);
	}

	getInnerText = (element: HTMLElement): string => {
		return element.classList.contains('cplus-colored-text') ? element.parentElement.innerText : element.innerText;
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'pointermove':
					this.tooltipReadAloud.style.left = `${event.pageX! - (window.scrollX || document.documentElement.scrollLeft)}px`;
					this.tooltipReadAloud.style.top = `${event.pageY! - (window.scrollY || document.documentElement.scrollTop)}px`;
					break;
				case 'pointerdown':
					speechSynthesis.speak(new SpeechSynthesisUtterance(this.getInnerText((event.target as HTMLElement))));
					break;
				case 'keydown':
					if (event.key === 'Escape' || event.key === 'Esc') {
						speechSynthesis.cancel();
					}
					break;
				case 'contextmenu':
					speechSynthesis.cancel();
					break;
				case 'focusin':
					speechSynthesis.speak(new SpeechSynthesisUtterance((document.activeElement as HTMLElement).innerText));
					break;
			}
		}
	}
}
