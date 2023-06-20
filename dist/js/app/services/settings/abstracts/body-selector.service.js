"use strict";
class BodySelectorService {
    getBodyElements() {
        return document.body.querySelectorAll(`:not(${APP_NAME},${BODY_ELEMENTS_FILTER})`);
    }
    getTextNodes(element) {
        const textNodes = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
            acceptNode: (node) => {
                return (node.nodeValue.trim() !== '')
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT;
            },
        });
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }
        return textNodes;
    }
    isAlreadyEdited(node, className) {
        return node.parentNode instanceof HTMLElement && node.parentNode.classList.contains(className);
    }
    resetToDefaultBody = (classToDelete) => {
        const spans = document.querySelectorAll(classToDelete.map(c => `.${c}`).join(', '));
        spans.forEach(span => {
            const textNode = document.createTextNode(span.textContent);
            span.replaceWith(textNode);
        });
        const body = document.body;
        this.concatTextNodes(body);
    };
    concatTextNodes = (element) => {
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
    };
}
