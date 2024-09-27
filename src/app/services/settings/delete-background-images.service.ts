let deleteBackgroundImagesServiceIsInstantiated: boolean;

class DeleteBackgroundImagesService {
	listImgElements: any[];
	classDeleteBackgroundImg = `${PREFIX}delete-background-img`;
	classDeleteForegroundImg = `${PREFIX}delete-foreground-img`;
	classSpanImage = `${PREFIX}delete-background-images__span`;

	styleDeleteBackgroundImages = `
		.${this.classDeleteBackgroundImg},
		.${this.classDeleteBackgroundImg}:before,
		.${this.classDeleteBackgroundImg}:after {
			background-image: none !important;
			background-color: white;
			color: black;
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

	styleDeleteTransparencyEffects = `
		*, *::before, *::after {
			opacity: 1 !important;
			filter: none !important
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
		const arrayValues = value.match(/[A-Z]?[a-z]+/g);

		arrayValues.forEach((value: string) => {
			switch (value.toLowerCase()) {
				case 'background':
					styleToDelete += this.styleDeleteBackgroundImages;

					const allElements = Array.from(document.querySelectorAll(`*:not(${domServiceInstance.excludedElements})`))
					allElements.forEach((element: Element) => {
						if (
							window.getComputedStyle(element).getPropertyValue('background-image') !== 'none' ||
							window.getComputedStyle(element, '::before').getPropertyValue('background-image') !== 'none' ||
							window.getComputedStyle(element, '::after').getPropertyValue('background-image') !== 'none'
						) {
							element.classList.add(this.classDeleteBackgroundImg);
						}
					});
					break;
				case 'foreground':
					styleToDelete += this.styleDeleteForegroundImages;

					const imgElements = document.querySelectorAll('img, svg, canvas, area');
					imgElements.forEach((element: Element) => {
						element.classList.add(this.classDeleteForegroundImg);
						let imageAlt = this.getAccessibleLabel(element);
						if (imageAlt !== '') {
							let spanImage: HTMLSpanElement = document.createElement('span');
							spanImage.classList.add(this.classSpanImage);
							spanImage.textContent = `${i18nServiceInstance.getMessage('textContentImageHidden')} ${imageAlt}`;
							element.parentNode.insertBefore(spanImage, element);
						}
					});
					break;
				case 'transparent':
					styleToDelete += this.styleDeleteTransparencyEffects;
					break;
				default:
					break;
			}
		});

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
		document.querySelectorAll(`.${this.classDeleteBackgroundImg}`).forEach((element: Element) => {
			element.classList.remove(this.classDeleteBackgroundImg);
		});
	}
}
