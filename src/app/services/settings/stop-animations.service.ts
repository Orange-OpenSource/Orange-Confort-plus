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
		this.unFreezeAllAnimations();
		stylesServiceInstance.removeStyle('stop-animations');
		if (value !== DEFAULT_VALUE) {
			stylesServiceInstance.setStyle('stop-animations', this.styleStopAnimations);
			this.freezeAllAnimations();
		}
	}

	freezeAnimation = (media: any) => {
		const width = media.width;
		const height = media.height;
		const alt = media.alt;

		let canvas: HTMLCanvasElement = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		canvas.title = alt;
		canvas.classList.add(`${PREFIX}freeze-animation--canvas`);
		canvas.setAttribute('aria-hidden', 'true');
		media.classList.add(`${PREFIX}freeze-animation--media`);

		let freeze = (): void => {
			canvas.getContext('2d').drawImage(media, 0, 0, width, height);
			canvas.style.position = 'absolute';
			media.parentNode.insertBefore(canvas, media);
			media.style.opacity = 0;
		}

		if (media.complete) {
			freeze();
		} else {
			media.addEventListener('load', freeze, true);
		}
	}

	freezeAllAnimations = (): any => {
		document.querySelectorAll('img:is([src$=".gif"], [src$=".png"], [src$=".webp"], [src$=".avif"])').forEach((img) => {
			this.freezeAnimation(img);
		});
		document.querySelectorAll('video').forEach((video) => {
			video.pause();
		});
	}

	unFreezeAllAnimations = (): any => {
		document.querySelectorAll(`.${PREFIX}freeze-animation--canvas`).forEach((canvas: any) => {
			canvas.remove();
		});

		document.querySelectorAll(`.${PREFIX}freeze-animation--media`).forEach((media: any) => {
			media.style.opacity = 1;
		});
	}
}
