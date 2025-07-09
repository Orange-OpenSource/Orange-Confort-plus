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
			border: 1px solid currentColor;
			width: fit-content;
			padding: 1em;
			pointer-events: none;
			z-index: calc(infinity);
			transform: translate(75px, 50%);
		}

		h1, h2, h3, h4, h5, h6,
		p, ul, ol, dl, blockquote,
		pre, td, th,
		input, textarea, legend {
			cursor: url('data:image/svg+xml;utf8,<svg width="24" height="24" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="black" d="M114.821 60.554c0 33.882-26.402 56.278-56.846 56.278-6.216 0-21.82-2.872-25.265-5.743C26.394 117.406 9.168 122 9.168 122c-.374-.298.176-1.564 1.067-3.613 1.913-4.401 5.396-12.415 4.675-22.229C6.87 85.822 4 74.911 4 60.554 4 30.108 28.105 6 58.55 6c32.73 0 56.271 24.693 56.271 54.554Zm-28.55 4.38a3.532 3.532 0 1 1 0-7.064 3.532 3.532 0 0 1 0 7.063Zm-27.075 0a3.532 3.532 0 1 1 0-7.064 3.532 3.532 0 0 1 0 7.063Zm-30.607-3.532a3.532 3.532 0 1 0 7.063 0 3.532 3.532 0 0 0-7.063 0Z" stroke="white" stroke-width="6"/></svg>') 24 24, text !important;
		}
	`;

	constructor() {
		super();
		if (readAloudServiceIsInstantiated) {
			throw new Error('ReadAloudService is already instantiated.');
		}

		readAloudServiceIsInstantiated = true;

		this.handler = this.createHandler();
	}

	setReadAloud = (value: string): void => {
		if (speechSynthesis.speaking) speechSynthesis.cancel();
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
	}

	setBodyToSpeech = (regex: RegExp): void => {
		const bodyChildren = this.getBodyElements();

		bodyChildren.forEach((child: any) => {
			const textNodes = this.getTextNodes(child);

			textNodes.forEach((node: any) => {
				const text = node.nodeValue;
				if (text && !this.isAlreadyEdited(node, this.readAloudSpan)) {
					const parent = node.parentNode;

					if (parent && !BODY_ELEMENTS_FILTER.split(',').includes(parent.nodeName.toLowerCase())) {
						const fragment = this.createFragmentForText(text, regex);
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
		return element.classList.contains(`${PREFIX}colored-text`) ? element.parentElement.innerText : element.innerText;
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'pointermove':
					this.tooltipReadAloud.style.left = `${event.pageX! - (window.scrollX || document.documentElement.scrollLeft)}px`;
					this.tooltipReadAloud.style.top = `${event.pageY! - (window.scrollY || document.documentElement.scrollTop)}px`;
					break;
				case 'pointerdown':
					if (speechSynthesis.speaking) speechSynthesis.cancel();
					speechSynthesis.speak(new SpeechSynthesisUtterance(this.getInnerText((event.target as HTMLElement))));
					break;
				case 'keydown':
					if (event.key === 'Escape' || event.key === 'Esc') {
						if (speechSynthesis.speaking) speechSynthesis.cancel();
					}
					break;
				case 'contextmenu':
					if (speechSynthesis.speaking) speechSynthesis.cancel();
					break;
				case 'focusin':
					if (speechSynthesis.speaking) speechSynthesis.cancel();
					speechSynthesis.speak(new SpeechSynthesisUtterance((document.activeElement as HTMLElement).innerText));
					break;
			}
		}
	}
}
