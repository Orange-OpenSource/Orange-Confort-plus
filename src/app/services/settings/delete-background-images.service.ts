let deleteBackgroundImagesServiceIsInstantiated: boolean;

class DeleteBackgroundImagesService {
	listImgElements: any[];
	classDeleteForegroundImg = `${PREFIX}delete-foreground-img`;
	classSpanImage = `${PREFIX}delete-background-images__span`;

	styleDeleteBackgroundImages = `
		*, *::before, *::after {
			background-image: none !important;
		}
	`;

	styleDeleteTransparencyEffects = `
		*, *::before, *::after {
			opacity: 1 !important;
			filter: none !important
		}
	`;

	styleDeleteForegroundImages = `
		.${this.classSpanImage} {
			font-size: 1rem;
		}

		.${this.classDeleteForegroundImg} {
			visibility: hidden !important;
		}
	`;

	constructor() {
		if (deleteBackgroundImagesServiceIsInstantiated) {
			throw new Error('DeleteBackgroundImagesService is already instantiated.');
		}

		deleteBackgroundImagesServiceIsInstantiated = true;
	}

	setDeleteBackgroundImages = (value: string): void => {
		this.resetStyleDeleteBackground();
		if (value !== DEFAULT_VALUE) {
			this.setStyleDeleteBackground(value);
		}
	}

	setStyleDeleteBackground = (value: string): void => {
		let styleToDelete: string = '';

		if (value.includes('background')) {
			styleToDelete += this.styleDeleteBackgroundImages;
		} else if (value.includes('foreground')) {
			styleToDelete += this.styleDeleteForegroundImages;

			let listeImg = document.querySelectorAll('img, svg, canvas, area');
			listeImg.forEach((element: any) => {
				element.classList.add(this.classDeleteForegroundImg);
				let imageAlt = this.getAccessibleLabel(element);
				if (imageAlt !== '') {
					let spanImage: HTMLSpanElement = document.createElement('span');
					spanImage.classList.add(this.classSpanImage);
					spanImage.textContent = `${i18nServiceInstance.getMessage('textContentImageHidden')} ${imageAlt}`;
					element.parentNode.insertBefore(spanImage, element);
				}
			});
		} else if (value.includes('transparent')) {
			styleToDelete += this.styleDeleteTransparencyEffects;
		}

		stylesServiceInstance.setStyle('delete-background-images', styleToDelete);
	}

	getAccessibleLabel = (element: any): string => {
		if (element.alt || element.ariaLabel || document.querySelector(`#${element.getAttribute('aria-labelledby')}`)?.textContent) {
			return element.alt || element.ariaLabel || document.querySelector(`#${element.getAttribute('aria-labelledby')}`)?.textContent;
		} else {
			let a11yLabel = [];
			if (element.querySelector('title')) {
				a11yLabel.push(element.querySelector('title').textContent);
			} else if (element.querySelector('desc')) {
				a11yLabel.push(element.querySelector('desc').textContent);
			} else if (element.querySelector('text')) {
				a11yLabel.push(element.querySelector('text').textContent);
			}
			return a11yLabel.join(' ');
		}
	}

	resetStyleDeleteBackground = (): void => {
		stylesServiceInstance.removeStyle('delete-background-images');
		document.querySelectorAll(`.${this.classSpanImage}`).forEach((element: Element) => {
			element.remove()
		});

		document.querySelectorAll(`.${this.classDeleteForegroundImg}`).forEach((element: Element) => {
			element.classList.remove(this.classDeleteForegroundImg);
		});
	}
}
