// @ts-ignore
let textColorServiceIsInstantiated: boolean;

class TextColorService extends BodySelectorService {
	groupsToColorize = ['an', 'ou', 'us'];

	constructor() {
		super();
		if (textColorServiceIsInstantiated) {
			throw new Error('TextColorService is already instantiated.');
		}
		textColorServiceIsInstantiated = true;
	}

	setTextColor = (value: string): void => {
		if (value !== DEFAULT_VALUE) {
			this.colorizeTextNodesForTextColor();
		}
	}

	private colorizeTextNodesForTextColor(): void {
		const bodyChildren = this.getBodyElements();

		bodyChildren.forEach((child) => {
			const textNodes = this.getTextNodes(child);

			textNodes.forEach((node) => {
				const text = node.nodeValue?.trim();
				if (text) {
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

	private getTextNodes(element: Node): Node[] {
		const textNodes: Node[] = [];
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

		while (walker.nextNode()) {
			textNodes.push(walker.currentNode);
		}

		return textNodes;
	}

	private createFragmentForText(text: string): DocumentFragment {
		const fragment = document.createDocumentFragment();
		let lastIndex = 0;

		this.groupsToColorize.forEach((group) => {
			let index;
			while ((index = text.indexOf(group, lastIndex)) !== -1) {
				// Ajout du texte avant la syllabe à coloriser
				if (index > lastIndex) {
					fragment.appendChild(document.createTextNode(text.slice(lastIndex, index)));
				}

				// Ajout de la syllabe avec style
				const span = document.createElement('span');
				span.style.color = 'red';
				span.textContent = group;
				fragment.appendChild(span);

				lastIndex = index + group.length;
			}
		});

		// Ajout du texte restant après la dernière syllabe colorisée
		if (lastIndex < text.length) {
			fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
		}

		return fragment;
	}
}
