let domServiceIsInstantiated: boolean;
let customBarInstanciated : boolean = false ;

class DomService {
	excludedElements = `${APP_NAME}, script`;

	constructor() {
		if (domServiceIsInstantiated) {
			throw new Error('DomService is already instantiated.');
		}

		domServiceIsInstantiated = true;
		
	}

	/* https://github.com/KittyGiraudel/focusable-selectors	*/
	getFocusableElements = (): any[] => {
		const not = {
			inert: '[inert],[inert] *',
			negTabIndex: '[tabindex^="-"]',
			disabled: ':disabled',
		};

		const focusableElt = [
			`a[href]:not(${not.inert},${not.negTabIndex}`,
			`area[href]:not(${not.inert},${not.negTabIndex}`,
			`input:not([type="hidden"],[type="radio"],${not.inert},${not.negTabIndex},${not.disabled}`,
			`input[type="radio"]:not(${not.inert},${not.negTabIndex},${not.disabled}`,
			`select:not(${not.inert},${not.negTabIndex},${not.disabled}`,
			`textarea:not(${not.inert},${not.negTabIndex},${not.disabled}`,
			`button:not(${not.inert},${not.negTabIndex},${not.disabled}`,
			`details:not(${not.inert} > summary:first-of-type,${not.negTabIndex}`,
			// Discard until Firefox supports `:has()`, i.e. when Firefox has its ESR version in 128.
			// See: https://github.com/KittyGiraudel/focusable-selectors/issues/12
			// `details:not(:has(> summary),${not.inert},${not.negTabIndex})`,
			`iframe:not(${not.inert},${not.negTabIndex}`,
			`audio[controls]:not(${not.inert},${not.negTabIndex}`,
			`video[controls]:not(${not.inert},${not.negTabIndex}`,
			`[contenteditable]:not(${not.inert},${not.negTabIndex}`,
			`[tabindex]:not(${not.inert},${not.negTabIndex}`
		];

		return Array.from(document.querySelectorAll(focusableElt.join(',')))
			.filter((el: any) => !el.disabled && el.tabIndex >= 0);
	}

	addCustomScroolBar = (): void => {
		
		if ( customBarInstanciated) { return; }
		const updownArrowSize = 0 ; // TO DEFINE SIZE OF UP DOWN ARROWS IF NEEDED
		customBarInstanciated = true ;
		let scrollContainer: HTMLElement;
		let thumb: HTMLElement;
		let fragment = document.createDocumentFragment();
		let isDragging = false;
		let totalHeight = document.body.scrollHeight;
		let windowHeight = document.documentElement.clientHeight;
		windowHeight -= updownArrowSize * 2 ; // to take into account the scroll buttons height
		let thumbClickOffset = 0;
		thumb  = document.createElement('div');
		thumb.setAttribute('id', 'cf-custom-scrollbar-thumb');
		let scrollUpTriangle = document.createElement('div');
		scrollUpTriangle.className = 'cf-scroll-up-arrow';
		let scrollUp = document.createElement('div');
		scrollUp.className = 'cf-scroll-up';
		let scrollDownTriangle = document.createElement('div');
		scrollDownTriangle.className = 'cf-scroll-down-arrow';
		let scrollDown = document.createElement('div');
		scrollDown.className = 'cf-scroll-down';
		scrollUp.appendChild(scrollUpTriangle);
		scrollDown.appendChild(scrollDownTriangle);
		scrollUp.addEventListener('click', function() {
			window.scrollBy(0, -100);
		});
		scrollDown.addEventListener('click', function() {
			window.scrollBy(0, 100);
		});
		let thumbContainer = document.createElement('div');
		thumbContainer.className = 'cf-scroll-thumb-container';
		scrollContainer = document.createElement('div');
		thumbContainer.appendChild(thumb);
		scrollContainer.appendChild(scrollUp);
		scrollContainer.appendChild(thumbContainer);
		scrollContainer.appendChild(scrollDown);
		scrollContainer.setAttribute('id', 'cf-custom-scrollbar');

		// set thumb height
		let thumbHeight = (windowHeight / totalHeight) * ( windowHeight - updownArrowSize * 2 ) ;
		if ( thumbHeight < 50 ) { thumbHeight = 50; }
		thumb.style.height = `${thumbHeight}px`;

		document.addEventListener('scroll', function() {		
		
			let scrollTop = window.scrollY;
			let thumbTop = (scrollTop / (totalHeight - windowHeight)) * (windowHeight - thumb.offsetHeight);
			thumb.style.top = `${thumbTop}px`;
		})

		
			
		window.addEventListener('resize', function() {	
			if (document.body.scrollHeight <= window.innerHeight) {
				document.body.classList.add(`hide-scrollbar`);
			} else {
				document.body.classList.remove(`hide-scrollbar`);
			}	
			// recalculate thumb height
			windowHeight = document.documentElement.clientHeight;
			windowHeight -= updownArrowSize * 2 
			thumbHeight = (windowHeight / totalHeight) * ( windowHeight - updownArrowSize * 2 ) ;
			if ( thumbHeight < 50 ) { thumbHeight = 50; }
			thumb.style.height = `${thumbHeight}px`;
			// update thumb position
			let scrollTop = window.scrollY;
			let thumbTop = (scrollTop / (totalHeight - windowHeight)) * (windowHeight - thumb.offsetHeight); //TO CHECK 
			thumb.style.top = `${thumbTop}px`;	
		})

		function onPointerMove(e :any) {
			if (!isDragging) return;
			window.getSelection().removeAllRanges()
			window.scrollTo(0, (  ( e.clientY - updownArrowSize - thumbClickOffset) / ( window.innerHeight - updownArrowSize * 2 )) * totalHeight);
		}

		function onPointerUp() {
			isDragging = false;
			document.removeEventListener('pointermove', onPointerMove);
			document.removeEventListener('pointerup', onPointerUp);
		}


		 thumb.addEventListener('pointerdown', function(e) {
		
			totalHeight = document.body.scrollHeight;
			thumbClickOffset = e.clientY - thumb.offsetTop - updownArrowSize ;
			isDragging = true;
			
			document.addEventListener('pointermove', onPointerMove);
			document.addEventListener('pointerup', onPointerUp);
		});

		thumbContainer.addEventListener('click', function(e) {
			if ( e.target !== thumb ) {
				if ( e.clientY < thumb.offsetTop ) {
					window.scrollBy(0, -(windowHeight ));
				}
				else{
					window.scrollBy(0, (windowHeight ));
				}
			}
		});

		let styleContainerButtons = `
			#cf-custom-scrollbar {
				display: none;
			}

			.cf-scroll-thumb-container {
				position: relative;
				height: 100%;
				width:100%;
				}

			.${PREFIX}big-scroll #cf-custom-scrollbar {
				display: block;
				position: fixed;
				top:0;
				background-color:#e0e0e0 !important ;
				right: 0;
				z-index: calc(infinity);
				width:${SCROLL_SIZE_BIG};
				height:100%;
				box-shadow: -2px 0 5px rgba(0,0,0,0.4) inset;
			}

		

			#cf-custom-scrollbar-thumb:hover {
				background-color:#555 !important;	
			}

			/* hugeScroll Bar  */
			
			.${PREFIX}huge-scroll #cf-custom-scrollbar {
				width:${SCROLL_SIZE_HUGE};
			}

			#cf-custom-scrollbar.hide-scrollbar {
				display: none !important;
			}
		`;

		stylesServiceInstance.setStyle('customscrollbar-buttons', styleContainerButtons);

		fragment.appendChild(scrollContainer);
		document.body.appendChild(fragment);
	}

	addButtonsInDom = (button: string, start: boolean = false): void => {
		let container: HTMLElement;
		let fragment = document.createDocumentFragment();
		let rightPosition = document.querySelector(APP_NAME)?.shadowRoot?.querySelector('app-toolbar')?.classList.contains('close') ?
			BTN_RIGHT_POS_DEFAULT : BTN_RIGHT_POS_OPEN;

		if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)) {
			container = document.querySelector(`#${CONTAINER_BUTTONS_ID}`);
		} else {
			container = document.createElement('div');
			container.setAttribute('id', CONTAINER_BUTTONS_ID);

			let styleContainerButtons = `
				#${CONTAINER_BUTTONS_ID} {
					font-size: 16px;
					display: flex;
					flex-direction: column;
					gap: 1em;
					position: fixed;
					bottom: 1em;
					right: ${rightPosition};
					z-index: calc(infinity);
				}

				#${CONTAINER_BUTTONS_ID} .button-row {
					display: flex;
					gap: 1em;
					justify-content: flex-end;
				}

				#${CONTAINER_BUTTONS_ID} button {
					background: #f16e00;
					color: #000;
					border: 2px solid currentColor;
					font-weight: bold;
					padding: 1em 2em;
					outline: 2px solid #fff;
					box-shadow: 0 0 6px 3px #bbb;
				}

				#${CONTAINER_BUTTONS_ID} button:hover {
					background: #000;
					color: #fff;
				}

				#${CONTAINER_BUTTONS_ID} button:active {
					background: #fff;
					color: #000;
				}

				#${CONTAINER_BUTTONS_ID} button:focus {
					outline: 3px solid #000;
    			outline-offset: 2px;
				}
			`;

			stylesServiceInstance.setStyle('container-buttons', styleContainerButtons);
		}

		const isScrollButton = this.isScrollButton(button);
		const rowClass = isScrollButton ? 'scroll-row' : 'navigation-row';

		let targetRow = container.querySelector(`.${rowClass}`);
		if (!targetRow) {
			targetRow = document.createElement('div');
			targetRow.className = `button-row ${rowClass}`;

			if (isScrollButton) {
				container.appendChild(targetRow);
			} else {
				const scrollRow = container.querySelector('.scroll-row');
				if (scrollRow) {
					container.insertBefore(targetRow, scrollRow);
				} else {
					container.appendChild(targetRow);
				}
			}
		}

		let btn = document.createElement('button');
		btn.setAttribute('id', `${CONTAINER_BUTTONS_ID}__${button}`);
		btn.type = 'button';
		btn.tabIndex = -1;
		btn.innerText = i18nServiceInstance.getMessage(button);

		if (start) {
			targetRow.prepend(btn);
		} else {
			targetRow.appendChild(btn);
		}

		fragment.appendChild(container);
		document.body.appendChild(fragment);
	}

	isScrollButton = (button: string): boolean => {
		return button.includes( 'scroll_');
	}

	removeButtonsInDom = (button: string): void => {
		const buttonElement = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${button}`);
		const parentRow = buttonElement?.parentElement;

		buttonElement?.remove();

		if (parentRow && parentRow.children.length === 0) {
			parentRow.remove();
		}

		if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)?.children.length === 0) {
			document.querySelector(`#${CONTAINER_BUTTONS_ID}`)?.remove();
			stylesServiceInstance.removeStyle('container-buttons');
		}
	}
}

