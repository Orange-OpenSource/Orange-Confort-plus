let skipToContentServiceIsInstantiated: boolean;

class SkipToContentService {

	mainId = `${PREFIX}main-id`;

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
		if (document.getElementsByTagName('main') && document.getElementsByTagName('main').length > 0) {
			mainElement = document.getElementsByTagName('main')[0];
		} else {
			mainElement =
				document.querySelector('[role="main"]') ||
				document.querySelector('[id="main"]') ||
				document.querySelector('[class="main"]') ||
				document.querySelector('[id="content"]') ||
				document.querySelector('[class="content"]');
		}

		if (mainElement) {
			mainElement.setAttribute('id', this.mainId);
			document.location.href = '#' + this.mainId;
		}
	}
}
