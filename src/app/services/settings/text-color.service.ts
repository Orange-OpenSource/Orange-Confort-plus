let textColorServiceIsInstantiated: boolean;

class TextColorService extends BodySelectorService {
	groupsToColorize = ['an', 'ou', 'us'];
	textColorIsActive = false;

	constructor() {
		super();
		if (textColorServiceIsInstantiated) {
			throw new Error('TextColorService is already instantiated.');
		}
		textColorServiceIsInstantiated = true;
	}

	setTextColor = (value: string): void => {
		this.textColorIsActive = false;
		this.resetToDefaultBody([TEXT_COLOR_SPAN_CLASS]);
		if (value !== DEFAULT_VALUE) {
			this.colorizeTextNodesForTextColor();
			this.textColorIsActive = true;
		}
	}

	private colorizeTextNodesForTextColor(): void {
		const bodyChildren = this.getBodyElements();

		bodyChildren.forEach((child: any) => {
			const textNodes = this.getTextNodes(child);

			textNodes.forEach((node: any) => {
				const text = node.nodeValue;
				if (text && !this.isAlreadyEdited(node, TEXT_COLOR_SPAN_CLASS)) {
					const parent = node.parentNode;
					const fragment = this.createFragmentForText(text);

					if (parent) {
						parent.insertBefore(fragment, node);
						parent.removeChild(node);
					}
				}
			});
		});
	}

	private createFragmentForText(text: string): DocumentFragment {
		const fragment = document.createDocumentFragment();
		const regex = new RegExp(`(${this.groupsToColorize.join('|')})`, 'g');
		let lastIndex = 0;
		let match;

		while ((match = regex.exec(text)) !== null) {
			const matchText = match[0];
			const matchIndex = match.index;

			if (matchIndex > lastIndex) {
				fragment.appendChild(document.createTextNode(text.slice(lastIndex, matchIndex)));
			}

			const span = document.createElement('span');
			span.classList.add(TEXT_COLOR_SPAN_CLASS);
			span.style.color = 'red';
			span.textContent = matchText;
			fragment.appendChild(span);

			lastIndex = matchIndex + matchText.length;
		}

		if (lastIndex < text.length) {
			fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
		}

		return fragment;
	}
}
