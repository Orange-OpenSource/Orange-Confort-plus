abstract class BodySelectorService {
	getBodyElements(): NodeListOf<Element> {
		return document.body.querySelectorAll(`:not(${APP_NAME},${BODY_ELEMENTS_FILTER})`);
	}

	getTextNodes(element: Node): Node[] {
		const textNodes: Node[] = [];
		const walker = document.createTreeWalker(
			element,
			NodeFilter.SHOW_TEXT,
			{
				acceptNode: (node) => {
					return (node.nodeValue.trim() !== '')
						? NodeFilter.FILTER_ACCEPT
						: NodeFilter.FILTER_REJECT;
				},
			}
		);

		while (walker.nextNode()) {
			textNodes.push(walker.currentNode);
		}

		return textNodes;
	}

	isAlreadyEdited(node: Node, className: string): boolean {
		return node.parentNode instanceof HTMLElement && node.parentNode.classList.contains(className);
	}

	resetToDefaultBody = (classToDelete: string[]): void => {
		const spans = document.querySelectorAll(classToDelete.map(c => `.${c}`).join(', '));

		spans.forEach(span => {
			const textNode = document.createTextNode(span.textContent);
			span.replaceWith(textNode);
		});

		const body = document.body;
		this.concatTextNodes(body);
	}

	concatTextNodes = (element: any): void => {
		let child = element.firstChild;
		while (child) {
			if (child.nodeType === Node.ELEMENT_NODE) {
				this.concatTextNodes(child);
			}

			if (child.nodeType === Node.TEXT_NODE) {
				while (child.nextSibling && child.nextSibling.nodeType === Node.TEXT_NODE) {
					child.textContent += child.nextSibling.textContent;
					child.parentNode.removeChild(child.nextSibling);
				}
			}

			child = child.nextSibling;
		}
	}
}
