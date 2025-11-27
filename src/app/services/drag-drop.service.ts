let dragDropServiceIsInstantiated: boolean;

class DragDropService {
	button: HTMLElement | null = null;
	isDragging = false;
	isEnabled = false;
	justDragged = false;
	offsetX = 0;
	offsetY = 0;
	initialMouseX = 0;
	initialMouseY = 0;

	handlerMouseDown: any;
	handlerMouseMove: any;
	handlerMouseUp: any;
	handlerClick: any;

	constructor() {
		if (dragDropServiceIsInstantiated) {
			throw new Error('DragDropService is already instantiated.');
		}

		dragDropServiceIsInstantiated = true;

		this.handlerMouseDown = this.onMouseDown.bind(this);
		this.handlerMouseMove = this.onMouseMove.bind(this);
		this.handlerMouseUp = this.onMouseUp.bind(this);
		this.handlerClick = this.onClickCapture.bind(this);
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
		this.button.addEventListener('pointerdown', this.handlerMouseDown);
		this.button.addEventListener('click', this.handlerClick, true);
	}

	disable = (): void => {
		if (!this.button || !this.isEnabled) {
			return;
		}
		this.isEnabled = false;
		this.button.removeEventListener('pointerdown', this.handlerMouseDown);
		this.button.removeEventListener('click', this.handlerClick, true);
		document.removeEventListener('pointermove', this.handlerMouseMove);
		document.removeEventListener('pointerup', this.handlerMouseUp);
		this.isDragging = false;
		this.justDragged = false;
		if (this.button) {
			this.button.style.cursor = 'grab';
		}
	}

	private onMouseDown = (event: MouseEvent): void => {
		if (!this.button || !this.isEnabled) {
			return;
		}

		this.isDragging = false;
		this.justDragged = false;
		this.initialMouseX = event.clientX;
		this.initialMouseY = event.clientY;

		const rect = this.button.getBoundingClientRect();
		this.offsetX = event.clientX - rect.left;
		this.offsetY = event.clientY - rect.top;

		document.addEventListener('pointermove', this.handlerMouseMove);
		document.addEventListener('pointerup', this.handlerMouseUp);

		this.button.style.cursor = 'grabbing';
		event.preventDefault();
	}

	private onMouseMove = (event: MouseEvent): void => {
		if (!this.button) {
			return;
		}

		const deltaX = Math.abs(event.clientX - this.initialMouseX);
		const deltaY = Math.abs(event.clientY - this.initialMouseY);

		if (deltaX > 5 || deltaY > 5) {
			this.isDragging = true;
		}

		let newX = event.clientX - this.offsetX;
		let newY = event.clientY - this.offsetY;

		const maxX = window.innerWidth - this.button.offsetWidth;
		const maxY = window.innerHeight - this.button.offsetHeight;

		newX = Math.max(0, Math.min(newX, maxX));
		newY = Math.max(0, Math.min(newY, maxY));

		this.button.style.left = `${newX}px`;
		this.button.style.top = `${newY}px`;
		this.button.style.right = 'auto';

		event.preventDefault();
	}

	private onMouseUp = (event: MouseEvent): void => {
		if (!this.button) {
			return;
		}

		document.removeEventListener('pointermove', this.handlerMouseMove);
		document.removeEventListener('pointerup', this.handlerMouseUp);

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

	private onClickCapture = (event: MouseEvent): void => {
		if (this.justDragged) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();
		}
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

				const maxX = window.innerWidth - this.button.offsetWidth;
				const maxY = window.innerHeight - this.button.offsetHeight;

				x = Math.max(0, Math.min(x, maxX));
				y = Math.max(0, Math.min(y, maxY));

				this.button.style.left = `${x}px`;
				this.button.style.top = `${y}px`;
				this.button.style.right = 'auto';
			} else {
				this.button.style.top = BTN_CPLUS_POS_DEFAULT;
				this.button.style.right = BTN_CPLUS_POS_DEFAULT;
			}
		});
	}
}

