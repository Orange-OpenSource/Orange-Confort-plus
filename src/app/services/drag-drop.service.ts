let dragDropServiceIsInstantiated: boolean;

class DragDropService {
	button: HTMLElement | null = null;
	isDragging = false;
	isKeyboardDragging = false;
	isEnabled = false;
	justDragged = false;
	offsetX = 0;
	offsetY = 0;
	initialPointerX = 0;
	initialPointerY = 0;

	handlerPointerDown: any;
	handlerPointerMove: any;
	handlerPointerUp: any;
	handlerClick: any;
	handlerResize: any;

	constructor() {
		if (dragDropServiceIsInstantiated) {
			throw new Error('DragDropService is already instantiated.');
		}

		dragDropServiceIsInstantiated = true;

		this.handlerPointerDown = this.onPointerDown.bind(this);
		this.handlerPointerMove = this.onPointerMove.bind(this);
		this.handlerPointerUp = this.onPointerUp.bind(this);
		this.handlerClick = this.onClickCapture.bind(this);
		this.handlerResize = this.onResize.bind(this);
	}

	init = (button: HTMLElement): void => {
		this.button = button;
		this.restorePosition();
	}

	enable = (): void => {
		if (!this.button || this.isEnabled) {
			return;
		}
		this.isEnabled = true;
		this.button.addEventListener('pointerdown', this.handlerPointerDown);
		this.button.addEventListener('click', this.handlerClick, true);
		window.addEventListener('resize', this.handlerResize);
		this.clampPosition();
	}

	disable = (): void => {
		if (!this.button || !this.isEnabled) {
			return;
		}
		this.isEnabled = false;
		this.button.removeEventListener('pointerdown', this.handlerPointerDown);
		this.button.removeEventListener('click', this.handlerClick, true);
		document.removeEventListener('pointermove', this.handlerPointerMove);
		document.removeEventListener('pointerup', this.handlerPointerUp);
		window.removeEventListener('resize', this.handlerResize);
		this.isDragging = false;
		this.justDragged = false;
		if (this.button) {
			this.button.style.cursor = 'grab';
		}
	}

	startKeyboardDrag = (): void => {
		if (!this.button || !this.isEnabled) {
			return;
		}
		this.isKeyboardDragging = true;
		this.button.style.cursor = 'grabbing';
	}

	stopKeyboardDrag = (): void => {
		if (!this.button) {
			return;
		}
		this.isKeyboardDragging = false;
		this.button.style.cursor = 'grab';
		this.savePosition();
	}

	moveBy = (deltaX: number, deltaY: number): void => {
		if (!this.button) {
			return;
		}

		const rect = this.button.getBoundingClientRect();
		let newX = rect.left + deltaX;
		let newY = rect.top + deltaY;

		const maxX = this.getMaxX();
		const maxY = this.getMaxY();

		newX = this.clamp(newX, maxX);
		newY = this.clamp(newY, maxY);

		this.button.style.left = `${newX}px`;
		this.button.style.top = `${newY}px`;
		this.button.style.right = 'auto';
	}

	private onPointerDown = (event: PointerEvent): void => {
		if (!this.button || !this.isEnabled) {
			return;
		}

		this.isDragging = false;
		this.justDragged = false;
		this.initialPointerX = event.clientX;
		this.initialPointerY = event.clientY;

		const rect = this.button.getBoundingClientRect();
		this.offsetX = event.clientX - rect.left;
		this.offsetY = event.clientY - rect.top;

		document.addEventListener('pointermove', this.handlerPointerMove);
		document.addEventListener('pointerup', this.handlerPointerUp);

		this.button.style.cursor = 'grabbing';
		event.preventDefault();
	}

	private onPointerMove = (event: PointerEvent): void => {
		if (!this.button) {
			return;
		}

		const deltaX = Math.abs(event.clientX - this.initialPointerX);
		const deltaY = Math.abs(event.clientY - this.initialPointerY);

		if (deltaX > BTN_CPLUS_DRAG_TRESHOLD || deltaY > BTN_CPLUS_DRAG_TRESHOLD) {
			this.isDragging = true;
		}

		let newX = event.clientX - this.offsetX;
		let newY = event.clientY - this.offsetY;

		const maxX = this.getMaxX();
		const maxY = this.getMaxY();

		newX = this.clamp(newX, maxX);
		newY = this.clamp(newY, maxY);

		this.button.style.left = `${newX}px`;
		this.button.style.top = `${newY}px`;
		this.button.style.right = 'auto';

		event.preventDefault();
	}

	private onPointerUp = (event: PointerEvent): void => {
		if (!this.button) {
			return;
		}

		document.removeEventListener('pointermove', this.handlerPointerMove);
		document.removeEventListener('pointerup', this.handlerPointerUp);

		this.button.style.cursor = 'grab';

		if (this.isDragging) {
			this.justDragged = true;
			this.savePosition();
			event.preventDefault();
			event.stopPropagation();

			setTimeout(() => {
				this.justDragged = false;
			}, 100);
		}

		this.isDragging = false;
	}

	private onClickCapture = (event: PointerEvent): void => {
		if (this.justDragged) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
		}
	}

	private onResize = (): void => {
		this.clampPosition();
	}

	private clampPosition = (): void => {
		if (!this.button) {
			return;
		}

		const rect = this.button.getBoundingClientRect();

		if (rect.width === 0 && rect.height === 0) {
			return;
		}

		const maxX = this.getMaxX();
		const maxY = this.getMaxY();

		let currentLeft = parseFloat(this.button.style.left) || rect.left;
		let currentTop = parseFloat(this.button.style.top) || rect.top;

		if (this.button.style.left === '' || this.button.style.top === '') {
			currentLeft = rect.left;
			currentTop = rect.top;
		}

		const newX = this.clamp(currentLeft, maxX);
		const newY = this.clamp(currentTop, maxY);

		this.button.style.left = `${newX}px`;
		this.button.style.top = `${newY}px`;
		this.button.style.right = 'auto';

		this.savePosition();
	}

	private savePosition = (): void => {
		if (!this.button) {
			return;
		}
		const rect = this.button.getBoundingClientRect();
		localStorageServiceInstance.setItem('button-position-x', rect.left.toString());
		localStorageServiceInstance.setItem('button-position-y', rect.top.toString());
	}

	private restorePosition = (): void => {
		if (!this.button) {
			return;
		}

		Promise.all([
			localStorageServiceInstance.getItem('button-position-x'),
			localStorageServiceInstance.getItem('button-position-y')
		]).then(([savedX, savedY]) => {
			if (savedX && savedY) {
				let x = parseFloat(savedX as string);
				let y = parseFloat(savedY as string);

				const maxX = this.getMaxX();
				const maxY = this.getMaxY();

				x = this.clamp(x, maxX);
				y = this.clamp(y, maxY);

				this.button.style.left = `${x}px`;
				this.button.style.top = `${y}px`;
				this.button.style.right = 'auto';
			} else {
				this.button.style.left = 'auto';
				this.button.style.top = BTN_CPLUS_POS_DEFAULT;
				this.button.style.right = BTN_CPLUS_POS_DEFAULT;
			}
		});
	}

	private getMaxX = (): number => {
		return window.innerWidth - this.button.offsetWidth - BTN_CPLUS_SCROLLBAR_MARGIN;
	}

	private getMaxY = (): number => {
		return window.innerHeight - this.button.offsetHeight;
	}

	private clamp (value: number, max: number, min = 0) {
		return Math.max(min, Math.min(value, max));
	}
}
