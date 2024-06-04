let skipToContentServiceIsInstantiated: boolean;

class SkipToContentService {

	constructor() {
		if (skipToContentServiceIsInstantiated) {
			throw new Error('SkipToContentService is already instantiated.');
		}

		skipToContentServiceIsInstantiated = true;
	}

	setSkipToContent = (value: string): void => {
		if (value !== DEFAULT_VALUE) {
			this.goToMain();
		}
	}

	goToMain = (): void => {
		let mainElement: HTMLElement;

		mainElement =
			document.querySelector('main') ||
			document.querySelector('[role="main"]') ||
			document.querySelector('[id="main"]') ||
			document.querySelector('[class="main"]') ||
			document.querySelector('[id="content"]') ||
			document.querySelector('[class="content"]');

		if (mainElement) {
			mainElement.tabIndex = -1;
			mainElement.focus();
		}
	}
}
