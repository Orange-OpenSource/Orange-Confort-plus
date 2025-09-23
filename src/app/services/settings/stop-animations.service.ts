let stopAnimationsServiceIsInstantiated: boolean;

class StopAnimationsService {
	imgClass = `${PREFIX}stop-animations--img`;
	canvasClass = `${PREFIX}stop-animations--canvas`;
	mediaClass = `${PREFIX}stop-animations--media`;

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
		this.unFreezeAllAnimations();
		stylesServiceInstance.removeStyle('stop-animations');
		if (value !== DEFAULT_VALUE) {
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
		canvas.classList.add(this.canvasClass);
		canvas.setAttribute('aria-hidden', 'true');
		img.classList.add(this.imgClass);

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
		document.querySelectorAll('audio, video').forEach((media: any) => {
			if (!media.paused) {
				media.classList.add(this.mediaClass);
				media.pause();
			}
		});
	}

	unFreezeAllAnimations = (): any => {
		document.querySelectorAll(`.${this.canvasClass}`).forEach((canvas: any) => {
			canvas.remove();
		});
		document.querySelectorAll(`.${this.imgClass}`).forEach((img: any) => {
			img.style.opacity = 1;
		});
		document.querySelectorAll(`.${this.mediaClass}`).forEach((media: any) => {
			media.classList.remove(this.mediaClass);
			media.play();
		});
	}
}
