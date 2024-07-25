let magnifierServiceIsInstantiated: boolean;

class MagnifierService {
	zoom: number;
	handler: any;
	magnifierWidth = 300;
	magnifierHeight = 300;
	ofs_x: number;
	ofs_y: number;
	pos_x: number;
	pos_y: number;

	magnifier: HTMLElement;
	magnifierContent: HTMLElement;
	magnifierBody: HTMLElement;
	observerObj: MutationObserver | null;
	syncTimeout: number | undefined;

	styleMagnifier = `
		#${PREFIX}magnifier {
			background-color: white;
			border: 1px solid black;
			border-radius: 0.5rem;
			width: ${this.magnifierWidth}px;
			height: ${this.magnifierHeight}px;
			position: fixed;
			overflow: hidden;
			z-index: 2147483645;
		}

		#${PREFIX}magnifier-content {
			display: block;
			margin-left: 0;
			margin-top: 0;
			padding-top: 0;
			position: absolute;
			top: 0;
			left: 0;
			overflow: visible;
			transform-origin: left top;
			user-select: none;
		}

		#${PREFIX}magnifier-glass {
			background-color: white;
			opacity: 0;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			cursor: move;
		}
	`;

	constructor() {
		if (magnifierServiceIsInstantiated) {
			throw new Error('MagnifierService is already instantiated.');
		}

		magnifierServiceIsInstantiated = true;

		this.handler = this.createHandler();
	}

	setMagnifier = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			stylesServiceInstance.removeStyle('magnifier');
			document.querySelector(`#${PREFIX}magnifier`)?.remove();
			this.unBindDOMObserver();
		} else {
			stylesServiceInstance.setStyle('magnifier', this.styleMagnifier);
			this.zoom = Number(value.split('-')[1]);
			this.initMagnifier();
		}
	}

	/* The code below uses the code from this repository. Simplified for our use. */
	/* https://github.com/jagermesh/html-magnifier */
	initMagnifier = (): void => {
		if (!document.querySelector(`#${PREFIX}magnifier`)) {
			this.setMagnifierElements();
		}

		this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
		this.magnifierContent = document.querySelector(`#${PREFIX}magnifier-content`);
		window.addEventListener('resize', this.handler, false);
		window.addEventListener('scroll', this.handler, true);
		window.addEventListener('scrollend', this.handler, true);

		this.magnifierContent.style.transform = `scale(${this.zoom})`;
		this.makeDraggable();
		this.setPosition(this.magnifier, 250, 250);
		this.syncContent();
		this.bindDOMObserver();
	}

	setMagnifierElements = (): void => {
		let fragment = document.createDocumentFragment();
		const magnifier = document.createElement('div');
		const magnifierContent = document.createElement('div');
		const magnifierGlass = document.createElement('div');
		magnifier.setAttribute('id', `${PREFIX}magnifier`);
		magnifierContent.setAttribute('id', `${PREFIX}magnifier-content`);
		magnifierGlass.setAttribute('id', `${PREFIX}magnifier-glass`);

		magnifier.appendChild(magnifierContent);
		magnifier.appendChild(magnifierGlass);
		fragment.appendChild(magnifier);
		document.body.appendChild(fragment);
	}

	setPosition = (element: HTMLElement, left: number, top: number): void => {
		element.style.left = `${left}px`;
		element.style.top = `${top}px`;
	}

	syncContent = (): void => {
		this.prepareContent();
		this.syncViewport();
		this.syncScrollBars();
	}

	prepareContent = (): void => {
		this.magnifierContent.innerHTML = '';
		const bodyOriginal = document.body;
		const bodyCopy = bodyOriginal.cloneNode(true) as HTMLElement;
		const color = bodyOriginal.style.backgroundColor;
		if (color) {
			this.magnifier.style.backgroundColor = color;
		}
		bodyCopy.style.cursor = 'auto';
		bodyCopy.style.paddingTop = '0px';
		bodyCopy.style.position = 'relative';
		bodyCopy.setAttribute('unselectable', 'on');
		const canvasOriginal = bodyOriginal.querySelectorAll('canvas');
		const canvasCopy = bodyCopy.querySelectorAll('canvas');
		if (canvasOriginal.length > 0 && canvasOriginal.length === canvasCopy.length) {
			for (let i = 0; i < canvasOriginal.length; i++) {
				let ctx = (canvasCopy[i] as HTMLCanvasElement).getContext('2d');
				try {
					ctx?.drawImage(canvasOriginal[i] as HTMLCanvasElement, 0, 0);
				} catch (error) {
					console.error(error);
				}
			}
		}
		this.removeSelectors(bodyCopy, 'script');
		this.removeSelectors(bodyCopy, 'audio');
		this.removeSelectors(bodyCopy, 'video');
		this.removeSelectors(bodyCopy, `app-root`);
		this.removeSelectors(bodyCopy, `#${PREFIX}magnifier`);
		this.magnifierContent.appendChild(bodyCopy);
		this.magnifierContent.style.width = `${document.body.clientWidth}px`;
		this.magnifierContent.style.height = `${document.body.clientHeight}px`;
		this.magnifierBody = this.magnifierContent.querySelector('body');

		// Identifies the magnifying glass and its contents so that it can be ignored by MutationObserver
		this.magnifier?.classList.add(`${PREFIX}magnifier-ignore-class`);
		this.magnifierContent?.classList.add(`${PREFIX}magnifier-ignore-class`);
		this.magnifierBody?.classList.add(`${PREFIX}magnifier-ignore-class`);
		const bodyCopyElements = this.magnifierBody.querySelectorAll('*');
		bodyCopyElements.forEach((element: Element) => {
			element.classList.add(`${PREFIX}magnifier-ignore-class`);
		});
	}

	syncViewport = (): void => {
		const x1 = this.magnifier?.offsetLeft;
		const y1 = this.magnifier?.offsetTop;
		const x2 = document.body.scrollLeft;
		const y2 = document.body.scrollTop;
		const left = (-x1 * this.zoom - x2 * this.zoom) - ((this.zoom - 1) * (this.magnifierWidth / 2));
		const top = (-y1 * this.zoom - y2 * this.zoom) - ((this.zoom - 1) * (this.magnifierHeight / 2));
		this.setPosition(this.magnifierContent, left, top);
	}

	syncScrollBars = (): void => {
		if (this.magnifierBody !== null) {
			const x2 = window.scrollX || document.documentElement.scrollLeft;
			const y2 = window.scrollY || document.documentElement.scrollTop;
			this.setPosition(this.magnifierBody, -x2, -y2);
		}
	}

	stopSyncScrollBars = (): void => {
		if (this.magnifierBody !== null) {
			this.magnifierBody = null;
		}
		if (this.magnifier !== null) {
			this.magnifier = null;
		}
	}

	removeSelectors = (container: HTMLElement, selector: string): void => {
		const elements = container.querySelectorAll(selector);
		if (elements.length > 0) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].parentNode?.removeChild(elements[i]);
			}
		}
	}

	/* Set of methods for detecting DOM changes */
	syncContentQueued = (): void => {
		window.clearTimeout(this.syncTimeout);
		this.syncTimeout = window.setTimeout(this.syncContent.bind(this), 100);
	}

	domChanged = (): void => {
		this.syncContentQueued();
	}

	unBindDOMObserver = (): void => {
		if (this.observerObj) {
			this.observerObj.disconnect();
			this.observerObj = null;
		}
	}

	bindDOMObserver = (): void => {
		this.observerObj = new MutationObserver((mutations) => {
			for (let i = 0; i < mutations.length; i++) {
				this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
				if (!mutations[i].target?.parentElement?.classList?.contains(`${PREFIX}magnifier-ignore-class`) && !mutations[i].target?.firstChild?.parentElement?.classList?.contains(`${PREFIX}magnifier-ignore-class`)) {
					this.domChanged();
				}
			}
		});
		this.observerObj.observe(document, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: [
				'class',
				'width',
				'height',
				'style'
			],
			attributeOldValue: true,
			characterDataOldValue: true
		});
	}

	/* Makes the magnifier draggable and adds events linked to magnifier movements */
	makeDraggable = (): void => {
		this.magnifier.style.cursor = 'move';

		this.magnifier.addEventListener('pointerdown', this.handler);
		this.magnifier.addEventListener('pointermove', this.handler);
		this.magnifier.addEventListener('pointerup', this.handler);
	}

	downHandler = (event: any): void => {
		this.magnifier = document.querySelector(`#${PREFIX}magnifier`);

		const pageX = event.pageX || (event.touches && event.touches[0].pageX);
		const pageY = event.pageY || (event.touches && event.touches[0].pageY);

		this.ofs_x = this.magnifier.getBoundingClientRect().left - this.magnifier.offsetLeft;
		this.ofs_y = this.magnifier.getBoundingClientRect().top - this.magnifier.offsetTop;
		this.pos_x = pageX! - (this.magnifier.getBoundingClientRect().left + window.scrollX || document.documentElement.scrollLeft);
		this.pos_y = pageY! - (this.magnifier.getBoundingClientRect().top + window.scrollY || document.documentElement.scrollTop);

		event.preventDefault();
	}

	moveHandler = (event: any): void => {
		if (this.magnifier !== null) {
			const pageX = event.pageX || (event.touches && event.touches[0].pageX);
			const pageY = event.pageY || (event.touches && event.touches[0].pageY);
			const left = pageX! - this.pos_x - this.ofs_x - (window.scrollX || document.documentElement.scrollLeft);
			const top = pageY! - this.pos_y - this.ofs_y - (window.scrollY || document.documentElement.scrollTop);

			this.setPosition(this.magnifier, left, top);
			this.syncViewport();
		}
	}

	upHandler = (): void => {
		if (this.magnifier !== null) {
			this.magnifier = null;
		}
	}

	resizeWindow = (): void => {
		// Synchronises content while the window is being resized.
		let timer: any;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			this.stopSyncScrollBars();
			return;
		}, 100);
		this.syncContent();
	}

	private createHandler = () => {
		return (event: Event) => {
			switch (event.type) {
				case 'resize':
					this.magnifierBody = this.magnifierContent.querySelector('body');
					this.resizeWindow();
					break;
				case 'scroll':
					this.magnifierBody = this.magnifierContent.querySelector('body');
					this.syncScrollBars();
					break;
				case 'scrollend':
					this.stopSyncScrollBars();
					break;
				case 'pointerdown':
					this.downHandler(event);
					break;
				case 'pointermove':
					this.moveHandler(event);
					break;
				case 'pointerup':
					this.upHandler();
					break;
			}
		}
	}
}
