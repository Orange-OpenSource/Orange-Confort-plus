let readAloudServiceIsInstantiated: boolean;

type ReadingType = 'word' | 'sentence' | 'paragraph';

class ReadAloudService {
	handler: any;
	tooltipReadAloud: HTMLElement;
	scriptsElements: any[];
	confortPlusElement: any;
	readAloudTooltipId = `${PREFIX}read-aloud-tooltip`;
	readAloudSpan = `${PREFIX}read-aloud-span`;
	readAloudPreventFlexbox = `${PREFIX}read-aloud-prevent-flexbox`;

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
		transform: translate(0%, 75%);
		z-index: 2147483645;
	}

	.${this.readAloudPreventFlexbox} {
		white-space: pre-wrap;
	}`;

	constructor() {
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
	}

	setTooltip = (): void => {
		const fragment = document.createDocumentFragment();
		const tooltip = document.createElement('div');
		tooltip.setAttribute('id', this.readAloudTooltipId);
		tooltip.textContent = i18nServiceInstance.getMessage('readAloud-tooltip');
		fragment.appendChild(tooltip);
		document.body.insertBefore(fragment, document.body.firstChild);
		stylesServiceInstance.setStyle('read-aloud', this.classReadAloud);
		this.tooltipReadAloud = document.querySelector(`#${this.readAloudTooltipId}`);
		document.addEventListener('pointermove', this.handler);
	}

	setBodyToSpeech = (regex: RegExp): void => {
		const elements = document.body.querySelectorAll(':not(script):not(app-root)');

		elements.forEach((element: Element) => {
			let newNodes: Node[] = [];

			element.childNodes.forEach((node: Node) => {
				if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length > 0) {
					const items = node.textContent.trim().match(regex);
					if (items?.length > 0) {
						const template = document.createElement('template');

						items?.forEach((item: string) => {
							const span = document.createElement('span');
							span.classList.add(this.readAloudSpan);
							span.innerText = item.trim() + ' ';
							template.content.appendChild(span);
						});

						newNodes.push(...template.content.childNodes);
					} else {
						newNodes.push(node);
					}
				} else if (node.nodeType !== Node.TEXT_NODE) {
					newNodes.push(node);
				}
			});

			element.innerHTML = '';
			newNodes.forEach((node: Node) => {
				element.appendChild(node);
			});

			this.addClassForSpecificCase(element);
		});
	}

	addClassForSpecificCase = (element: Element): void => {
		const style = window.getComputedStyle(element);

		// Prevents <span> being stuck in flexboxes
		if (style.display === 'flex' || style.display === 'inline-flex') {
			element.classList.add(this.readAloudPreventFlexbox);
		}
	}

	resetBody = (): void => {
		this.tooltipReadAloud?.remove();
		const elements = Array.from(document.body.querySelectorAll(':not(script):not(app-root)'));
		const parser = new DOMParser();

		elements.forEach((element: Element) => {
			element.classList.remove(this.readAloudPreventFlexbox);
			let newChilds = document.createDocumentFragment();
			let textChilds: string = '';
			Array.from(element.childNodes).forEach((child: Node) => {
				if (child.nodeType === Node.ELEMENT_NODE && (child as Element).classList.contains(this.readAloudSpan)) {
					textChilds += (child as HTMLElement).innerHTML.trim() + ' ';
					if (!(child.nextSibling && child.nextSibling.nodeType === Node.ELEMENT_NODE && (child.nextSibling as Element).classList.contains(this.readAloudSpan))) {
						let decodedText = parser.parseFromString(textChilds, "text/html").documentElement.textContent;
						let textNode = document.createTextNode(decodedText);
						newChilds.appendChild(textNode);
						textChilds = '';
					}
				} else if (!(child.nodeType === Node.TEXT_NODE && child.textContent.trim().length < 1)) {
					newChilds.appendChild(child);
				}
			});

			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
			element.appendChild(newChilds);
		});
	}

	resetReadAloud = (): void => {
		stylesServiceInstance.removeStyle('read-aloud');
		document.removeEventListener('pointermove', this.handler);
		document.removeEventListener('pointerdown', this.handler);
		document.removeEventListener('keydown', this.handler);
		document.removeEventListener('contextmenu', this.handler);
		document.removeEventListener('focusin', this.handler);
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'pointermove':
					this.tooltipReadAloud.style.left = `${event.pageX}px`;
					this.tooltipReadAloud.style.top = `${event.pageY}px`;
					break;
				case 'pointerdown':
					speechSynthesis.speak(new SpeechSynthesisUtterance(event.target.innerText));
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
