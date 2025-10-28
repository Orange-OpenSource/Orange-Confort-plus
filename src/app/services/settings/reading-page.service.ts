let readingPageServiceIsInstantiated: boolean;

interface ReadingPageValues {
	name: string;
	fontSize: string;
	backgroundColor: string;
	textColor: string;
}

class ReadingPageService {
	readingPageDictionary: ReadingPageValues[] = [
		{ name: DEFAULT_VALUE, fontSize: DEFAULT_VALUE, backgroundColor: DEFAULT_VALUE, textColor: DEFAULT_VALUE },
		{ name: 'onlyContent110IvoryBlack', fontSize: '110%', backgroundColor: 'ivory', textColor: 'black' }
	];

	originalContent: Element | null = null;
	readingPageContainer: HTMLElement | null = null;

	constructor() {
		if (readingPageServiceIsInstantiated) {
			throw new Error('ReadingPageService is already instantiated.');
		}

		readingPageServiceIsInstantiated = true;
	}

	setReadingPage = (value: string): void => {
		this.restoreOriginalContent();
		stylesServiceInstance.removeStyle('reading-page');

		if (value === DEFAULT_VALUE) {
			return;
		}

		const readingPageConfig = this.readingPageDictionary.find((config: ReadingPageValues) => config.name === value);

		if (!readingPageConfig) {
			return;
		}

		this.extractAndDisplayContent(readingPageConfig);
	}

	extractAndDisplayContent = (config: ReadingPageValues): void => {
		try {
			// Sauvegarder le contenu original si ce n'est pas déjà fait
			if (!this.originalContent) {
				this.originalContent = document.body.cloneNode(true) as Element;
			}

			// Créer une copie sécurisée du document pour Readability
			let documentClone: Document;
			try {
				documentClone = document.cloneNode(true) as Document;
			} catch (error) {
				documentClone = document.implementation.createHTMLDocument(document.title);
				const htmlElement = document.documentElement.cloneNode(false) as HTMLElement;
				const headClone = document.head.cloneNode(true) as HTMLHeadElement;
				const bodyClone = this.createSafeBodyClone();

				htmlElement.appendChild(headClone);
				htmlElement.appendChild(bodyClone);
				documentClone.replaceChild(htmlElement, documentClone.documentElement);
			}

			// @ts-ignore - Readability est chargé globalement
			const reader = new Readability(documentClone);

			const article = reader.parse();

			if (!article) {
				console.warn("[ReadingPage]: Unable to extract the page content");
				return;
			}

			this.createReadingPageContainer(article, config);
		} catch (error) {
			console.error("[ReadingPage]: Error while extracting content:", error);
		}
	}

	createReadingPageContainer = (article: any, config: ReadingPageValues): void => {
		const bodyChildren = Array.from(document.body.children);
		bodyChildren.forEach((child: Element) => {
			if (!child.tagName.toLowerCase().includes('app-') && !child.id.includes('cplus-')) {
				(child as HTMLElement).style.display = 'none';
			}
		});

		// Créer le conteneur pour le contenu extrait
		this.readingPageContainer = document.createElement('main');
		this.readingPageContainer.id = `${PREFIX}reading-page-container`;
		this.readingPageContainer.innerHTML = `
			<div class="${PREFIX}reading-page-content">
				<h1>${article.title || ''}</h1>
				<div class="${PREFIX}reading-page-article">${article.content || ''}</div>
			</div>
		`;

		document.body.appendChild(this.readingPageContainer);

		this.applyReadingPageStyles(config);
	}

	applyReadingPageStyles = (config: ReadingPageValues): void => {
		const styles = `
			#${PREFIX}reading-page-container {
				position: fixed;
				inset: 0;
				background-color: ${config.backgroundColor} !important;
				color: ${config.textColor} !important;
				font-size: ${config.fontSize} !important;
				overflow-y: auto;
				padding: 2rem;
				box-sizing: border-box;
			}

			.${PREFIX}reading-page-content {
				max-width: 50rem;
				margin: 0 auto;
				line-height: 1.6;
			}

			.${PREFIX}reading-page-content h1 {
				color: ${config.textColor} !important;
				font-size: 2em !important;
				margin-bottom: 1em !important;
				font-weight: bold !important;
			}

			.${PREFIX}reading-page-content :is(h2, h3, h4, h5, h6) {
				color: ${config.textColor} !important;
				margin: 1em 0 0.5em 0 !important;
				font-weight: bold !important;
			}

			.${PREFIX}reading-page-content p {
				color: ${config.textColor} !important;
				margin: 1em 0 !important;
				line-height: 1.6 !important;
			}

			.${PREFIX}reading-page-content a {
				color: ${config.textColor} !important;
				text-decoration: underline !important;
			}

			.${PREFIX}reading-page-content is(ol,ul) {
				color: ${config.textColor} !important;
				margin: 1em 0 !important;
				padding-left: 2em !important;
			}

			.${PREFIX}reading-page-content li {
				color: ${config.textColor} !important;
				margin: 0.5em 0 !important;
			}

			.${PREFIX}reading-page-content img {
				max-width: 100% !important;
				height: auto !important;
				margin: 1em 0 !important;
			}

			.${PREFIX}reading-page-content blockquote {
				color: ${config.textColor} !important;
				border-left: 4px solid ${config.textColor} !important;
				padding-left: 1em !important;
				margin: 1em 0 !important;
				font-style: italic !important;
			}
		`;

		stylesServiceInstance.setStyle('reading-page', styles);
	}

	private createSafeBodyClone(): HTMLBodyElement {
		const bodyClone = document.createElement('body');

		// Copier les attributs du body original
		Array.from(document.body.attributes).forEach(attr => {
			bodyClone.setAttribute(attr.name, attr.value);
		});

		// Cloner le contenu en évitant les Custom Elements
		this.cloneChildrenSafely(document.body, bodyClone);

		return bodyClone;
	}

	private cloneChildrenSafely(source: Element, target: Element): void {
		Array.from(source.childNodes).forEach(child => {
			try {
				if (child.nodeType === Node.ELEMENT_NODE) {
					const element = child as Element;
					if (element.tagName.includes('-') || element.tagName.toLowerCase().includes('app-')) {
						return;
					}
				}

				const clonedChild = child.cloneNode(false);
				target.appendChild(clonedChild);

				if (child.nodeType === Node.ELEMENT_NODE && child.hasChildNodes()) {
					this.cloneChildrenSafely(child as Element, clonedChild as Element);
				}
			} catch (error) {
				console.debug('Élément ignoré lors du clonage:', child);
			}
		});
	}

	restoreOriginalContent = (): void => {
		if (this.readingPageContainer) {
			this.readingPageContainer.remove();
			this.readingPageContainer = null;
		}
		const bodyChildren = Array.from(document.body.children);
		bodyChildren.forEach((child: Element) => {
			if (!child.tagName.toLowerCase().includes('app-') && !child.id.includes('cplus-')) {
				(child as HTMLElement).style.display = '';
			}
		});
	}
}
