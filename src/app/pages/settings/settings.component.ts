const settingsLayout: HTMLTemplateElement = document.createElement('template');
settingsLayout.innerHTML = `
<section class="accordion mb-2">
	<app-text class="c-settings__category accordion-item"></app-text>
	<app-layout class="c-settings__category accordion-item"></app-layout>
	<app-pointer class="c-settings__category accordion-item"></app-pointer>
	<app-navigation class="c-settings__category accordion-item"></app-navigation>
</section>
<div id="test">

</div>
`;

class SettingsComponent extends HTMLElement {
	static observedAttributes = ['data-modes'];

	constructor() {
		super();

		this.appendChild(settingsLayout.content.cloneNode(true));

		this.colorizeTextNodesForDyslexia();
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		if ('data-modes' === name) {
			let selectedMode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
			let elements = this.querySelectorAll(".c-settings__category");
			const settings: string[] = Object.entries(JSON.parse(selectedMode))[0][1] as string[];
			elements.forEach((element) => {
				element.setAttribute('data-settings', JSON.stringify(settings));
			});
		}
	}

	groupsToColorize = ['an', 'ou'];

	private colorizeTextNodesForDyslexia() {
		// Sélectionner tous les enfants du body
		const bodyChildren = document.body.children;

		// Parcourir tous les enfants du body
		for (let i = 0; i < bodyChildren.length; i++) {
			const child = bodyChildren[i];
			const textNodes = this.getTextNodes(child);

			// Parcourir tous les nœuds de texte dans l'enfant
			for (let j = 0; j < textNodes.length; j++) {
				const node = textNodes[j];
				const text = node.nodeValue.trim();

				// Vérifier si le texte n'est pas vide
				if (text !== '') {
					let colorizedText = '';
					let words = text.split(' ');

					// Parcourir tous les mots dans le texte
					for (let k = 0; k < words.length; k++) {
						const word = words[k];
						const syllables = this.segmentWordIntoSyllables(word, this.groupsToColorize);

						// Parcourir toutes les syllabes dans le mot
						for (let l = 0; l < syllables.length; l++) {
							colorizedText += syllables[l];
						}

						// Ajouter un espace entre les mots
						colorizedText += ' ';
					}

					const span = document.createElement('span');
					span.innerHTML = colorizedText.trim();
					node.parentNode.insertBefore(span, node);
					node.parentNode.removeChild(node);
				}
			}
		}
	}

	private getTextNodes(element: HTMLElement | Node): Node[] {
		const textNodes: Node[] = [];
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);

		while (walker.nextNode()) {
			textNodes.push(walker.currentNode);
		}

		return textNodes;
	}

	private segmentWordIntoSyllables(word: string, groups: string[]): string[] {
		const syllables = [];
		let syllable = '';

		for (let i = 0; i < word.length; i++) {
			const char = word[i];

			const isInGroups = groups.some(group => word.slice(i, i + group.length) === group)

			if (isInGroups) {
				syllable += `<span style="color: red;">${ word.slice(i, i + groups[0].length)
													.split('')
													.map(char => `${ char }`)
													.join('')
				}</span>`;

				// Avancer l'index pour sauter les caractères déjà traités
				i += groups[0].length - 1;
			} else {
				// Envelopper chaque caractère dans un span
				syllable += char;
			}

			if (!isInGroups || i === word.length - 1){
				syllables.push(syllable);
				syllable = '';
			}
		}

		return syllables;
	}
}

customElements.define('app-settings', SettingsComponent);
