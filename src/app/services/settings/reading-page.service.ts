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
		{ name: 'onlyContent110IvoryBlack', fontSize: '110%', backgroundColor: '#fffff0', textColor: '#000000' }
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

			// @ts-ignore - Readability est chargé globalement
			const reader = new Readability(document.cloneNode(true));
			const article = reader.parse();

			if (!article) {
				console.warn('ReadingPage: Impossible d\'extraire le contenu de la page');
				return;
			}

			this.createReadingPageContainer(article, config);
		} catch (error) {
			console.error('ReadingPage: Erreur lors de l\'extraction du contenu:', error);
		}
	}

	createReadingPageContainer = (article: any, config: ReadingPageValues): void => {
		// Masquer tout le contenu existant sauf l'extension Confort+
		const bodyChildren = Array.from(document.body.children);
		bodyChildren.forEach((child: Element) => {
			if (!child.tagName.toLowerCase().includes('app-') && !child.id.includes('cplus-')) {
				(child as HTMLElement).style.display = 'none';
			}
		});

		// Créer le conteneur pour le contenu extrait
		this.readingPageContainer = document.createElement('div');
		this.readingPageContainer.id = `${PREFIX}reading-page-container`;
		this.readingPageContainer.innerHTML = `
			<div class="${PREFIX}reading-page-content">
				<h1>${article.title || ''}</h1>
				<div class="${PREFIX}reading-page-article">${article.content || ''}</div>
			</div>
		`;

		document.body.appendChild(this.readingPageContainer);

		// Appliquer les styles
		this.applyReadingPageStyles(config);
	}

	applyReadingPageStyles = (config: ReadingPageValues): void => {
		const styles = `
			#${PREFIX}reading-page-container {
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background-color: ${config.backgroundColor} !important;
				color: ${config.textColor} !important;
				font-size: ${config.fontSize} !important;
				overflow-y: auto;
				z-index: 999999;
				padding: 2rem;
				box-sizing: border-box;
			}

			.${PREFIX}reading-page-content {
				max-width: 800px;
				margin: 0 auto;
				line-height: 1.6;
			}

			.${PREFIX}reading-page-content h1 {
				color: ${config.textColor} !important;
				font-size: 2em !important;
				margin-bottom: 1em !important;
				font-weight: bold !important;
			}

			.${PREFIX}reading-page-content h2,
			.${PREFIX}reading-page-content h3,
			.${PREFIX}reading-page-content h4,
			.${PREFIX}reading-page-content h5,
			.${PREFIX}reading-page-content h6 {
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

			.${PREFIX}reading-page-content ul,
			.${PREFIX}reading-page-content ol {
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

			/* S'assurer que l'extension Confort+ reste visible */
			${APP_NAME} {
				z-index: 1000000 !important;
			}
		`;

		stylesServiceInstance.setStyle('reading-page', styles);
	}

	restoreOriginalContent = (): void => {
		// Supprimer le conteneur de lecture si il existe
		if (this.readingPageContainer) {
			this.readingPageContainer.remove();
			this.readingPageContainer = null;
		}

		// Restaurer l'affichage des éléments masqués
		const bodyChildren = Array.from(document.body.children);
		bodyChildren.forEach((child: Element) => {
			if (!child.tagName.toLowerCase().includes('app-') && !child.id.includes('cplus-')) {
				(child as HTMLElement).style.display = '';
			}
		});
	}
}
