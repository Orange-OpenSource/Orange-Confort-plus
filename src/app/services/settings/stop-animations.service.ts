let stopAnimationsServiceIsInstantiated: boolean;

class StopAnimationsService {

	constructor() {
		if (stopAnimationsServiceIsInstantiated) {
			throw new Error('StopAnimationsService is already instantiated.');
		}

		stopAnimationsServiceIsInstantiated = true;
	}

	styleStopAnimations = `
		*, *::before, *::after {
			animation: none !important;
			animation-fill-mode: forwards !important;
			transition: none !important;
			transition-duration: 0.00001s !important;
		}
	`;

	setStopAnimations = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			stylesServiceInstance.removeStyle('stop-animations');
			this.unFreezeAllAnimations();
		} else {
			stylesServiceInstance.setStyle('stop-animations', this.styleStopAnimations);
			this.freezeAllAnimations();
		}
	}

	freezeAnimation = (img: any) => {
		const width = img.width;
		const height = img.height;
		const alt = img.alt;

		let canvas: HTMLCanvasElement = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		canvas.title = alt;
		canvas.classList.add(`${PREFIX}freeze-animation--canvas`);
		canvas.setAttribute('aria-hidden', 'true');
		img.classList.add(`${PREFIX}freeze-animation--img`);

		let freeze = (): void => {
			canvas.getContext('2d').drawImage(img, 0, 0, width, height);
			canvas.style.position = 'absolute';
			img.parentNode.insertBefore(canvas, img);
			img.style.opacity = 0;
		}

		if (img.complete) {
			freeze();
		} else {
			img.addEventListener('load', freeze, true);
		}
	}

	freezeAllAnimations = (): any => {
		document.querySelectorAll('img:is([src$=".gif"], [src$=".png"], [src$=".webp"], [src$=".avif"])').forEach((img) => {
			this.freezeAnimation(img);
		});
	}

	unFreezeAllAnimations = (): any => {
		document.querySelectorAll(`.${PREFIX}freeze-animation--canvas`).forEach((canvas: any) => {
			canvas.remove();
		});

		document.querySelectorAll(`.${PREFIX}freeze-animation--img`).forEach((img: any) => {
			img.style.opacity = 1;
		});
	}
}
