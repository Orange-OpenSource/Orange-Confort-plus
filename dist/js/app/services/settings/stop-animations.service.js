"use strict";
let stopAnimationsServiceIsInstantiated;
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
    setStopAnimations = (value) => {
        this.unFreezeAllAnimations();
        stylesServiceInstance.removeStyle('stop-animations');
        if (value !== DEFAULT_VALUE) {
            stylesServiceInstance.setStyle('stop-animations', this.styleStopAnimations);
            this.freezeAllAnimations();
        }
    };
    freezeAnimation = (img) => {
        const width = img.width;
        const height = img.height;
        const alt = img.alt;
        let canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.title = alt;
        canvas.classList.add(this.canvasClass);
        canvas.setAttribute('aria-hidden', 'true');
        img.classList.add(this.imgClass);
        let freeze = () => {
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            canvas.style.position = 'absolute';
            img.parentNode.insertBefore(canvas, img);
            img.style.opacity = 0;
        };
        if (img.complete) {
            freeze();
        }
        else {
            img.addEventListener('load', freeze, true);
        }
    };
    freezeAllAnimations = () => {
        document.querySelectorAll('img:is([src$=".gif"], [src$=".png"], [src$=".webp"], [src$=".avif"])').forEach((img) => {
            this.freezeAnimation(img);
        });
        document.querySelectorAll('audio, video').forEach((media) => {
            if (!media.paused) {
                media.classList.add(this.mediaClass);
                media.pause();
            }
        });
    };
    unFreezeAllAnimations = () => {
        document.querySelectorAll(`.${this.canvasClass}`).forEach((canvas) => {
            canvas.remove();
        });
        document.querySelectorAll(`.${this.imgClass}`).forEach((img) => {
            img.style.opacity = 1;
        });
        document.querySelectorAll(`.${this.mediaClass}`).forEach((media) => {
            media.classList.remove(this.mediaClass);
            media.play();
        });
    };
}
