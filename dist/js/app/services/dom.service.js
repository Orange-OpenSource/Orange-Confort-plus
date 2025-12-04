"use strict";
let domServiceIsInstantiated;
let customBarInstanciated = false;
class DomService {
    excludedElements = `${APP_NAME}, script`;
    constructor() {
        if (domServiceIsInstantiated) {
            throw new Error('DomService is already instantiated.');
        }
        domServiceIsInstantiated = true;
    }
    /* https://github.com/KittyGiraudel/focusable-selectors	*/
    getFocusableElements = () => {
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
            .filter((el) => !el.disabled && el.tabIndex >= 0);
    };
    addCustomScroolBar = () => {
        if (customBarInstanciated) {
            return;
        }
        const updownArrowSize = 0; // TO DEFINE SIZE OF UP DOWN ARROWS IF NEEDED
        customBarInstanciated = true;
        let scrollContainer;
        let navette;
        let fragment = document.createDocumentFragment();
        let isDragging = false;
        let totalHeight = document.body.scrollHeight;
        let windowHeight = document.documentElement.clientHeight;
        windowHeight -= updownArrowSize * 2; // to take into account the scroll buttons height
        let navetteClickOffset = 0;
        navette = document.createElement('div');
        navette.setAttribute('id', 'cf-custom-scrollbar-navette');
        let scrollUpTriangle = document.createElement('div');
        scrollUpTriangle.className = 'cf-scroll-up-triangle';
        let scrollUp = document.createElement('div');
        scrollUp.className = 'cf-scroll-up';
        let scrollDownTriangle = document.createElement('div');
        scrollDownTriangle.className = 'cf-scroll-down-triangle';
        let scrollDown = document.createElement('div');
        scrollDown.className = 'cf-scroll-down';
        scrollUp.appendChild(scrollUpTriangle);
        scrollDown.appendChild(scrollDownTriangle);
        scrollUp.addEventListener('click', function () {
            window.scrollBy(0, -100);
        });
        scrollDown.addEventListener('click', function () {
            window.scrollBy(0, 100);
        });
        let navetteContainer = document.createElement('div');
        navetteContainer.className = 'cf-scroll-navette-container';
        scrollContainer = document.createElement('div');
        navetteContainer.appendChild(navette);
        scrollContainer.appendChild(scrollUp);
        scrollContainer.appendChild(navetteContainer);
        scrollContainer.appendChild(scrollDown);
        scrollContainer.setAttribute('id', 'cf-custom-scrollbar');
        // set navette height
        let navetteHeight = (windowHeight / totalHeight) * (windowHeight - updownArrowSize * 2);
        if (navetteHeight < 50) {
            navetteHeight = 50;
        }
        navette.style.height = `${navetteHeight}px`;
        document.addEventListener('scroll', function () {
            console.log('scroll event !');
            let scrollTop = window.scrollY;
            let navetteTop = (scrollTop / (totalHeight - windowHeight)) * (windowHeight - navette.offsetHeight);
            navette.style.top = `${navetteTop}px`;
        });
        window.addEventListener('resize', function () {
            // recalculate navette height
            windowHeight = document.documentElement.clientHeight;
            windowHeight -= updownArrowSize * 2;
            navetteHeight = (windowHeight / totalHeight) * (windowHeight - updownArrowSize * 2);
            if (navetteHeight < 50) {
                navetteHeight = 50;
            }
            navette.style.height = `${navetteHeight}px`;
            // update navette position
            let scrollTop = window.scrollY;
            let navetteTop = (scrollTop / (totalHeight - windowHeight)) * (windowHeight - navette.offsetHeight); //TO CHECK 
            navette.style.top = `${navetteTop}px`;
        });
        function onMouseMove(e) {
            if (!isDragging)
                return;
            window.getSelection().removeAllRanges();
            window.scrollTo(0, ((e.clientY - updownArrowSize - navetteClickOffset) / (window.innerHeight - updownArrowSize * 2)) * totalHeight);
        }
        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        navette.addEventListener('mousedown', function (e) {
            totalHeight = document.body.scrollHeight;
            navetteClickOffset = e.clientY - navette.offsetTop - updownArrowSize;
            isDragging = true;
            console.log('mousedown navette ! totalHeight ', totalHeight);
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
        navetteContainer.addEventListener('click', function (e) {
            if (e.target !== navette) {
                if (e.clientY < navette.offsetTop) {
                    window.scrollBy(0, -(windowHeight));
                }
                else {
                    window.scrollBy(0, (windowHeight));
                }
            }
        });
        let styleContainerButtons = `
			#cf-custom-scrollbar {
				display: none;
			}

			
			/*
			.cf-scroll-down-triangle {
				border-left: 12px solid transparent;
				border-right: 12px solid transparent;
				border-top: 15px solid #000;
		
			}

			.cf-scroll-up-triangle {
				border-left: 12px solid transparent;
				border-right: 12px solid transparent;
				border-bottom: 15px solid #000;
			}

			.cf-scroll-up{
				height: 21px;
				cursor: pointer;
				width:100%;
				background-color: #555;
				padding:3px;
			}

			.cf-scroll-down{
				height: 21px;
				cursor: pointer;
				width:100%;
				background-color: #555;
				padding:3px;
			}
			*/
			.cf-scroll-navette-container {
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
				width:30px;
				height:100%;
				box-shadow: -2px 0 5px rgba(0,0,0,0.4) inset;
			}

			#cf-custom-scrollbar-navette {
				position: relative;
				top:0;
				background-color:#ff0000 !important;
				right: 0;
				border-radius: 5px;
				border: 1px solid #000;
				box-sizing: border-box;
				cursor: pointer;
				width:100%;
				height:10%;
			}

			#cf-custom-scrollbar-navette:hover {
				background-color:#555 !important;	
			}

			/* hugeScroll Bar  */
			/*
			.${PREFIX}huge-scroll .cf-scroll-up{
				26px
			}

			.${PREFIX}huge-scroll .cf-scroll-navette-container {
				height: calc(100% - 52px);
				}
		
			.${PREFIX}huge-scroll .cf-scroll-down-triangle {
				border-left: 16px solid transparent;
				border-right: 16px solid transparent;
				border-top: 22px solid #000;
		
			}

			.${PREFIX}huge-scroll .cf-scroll-up-triangle {
				border-left: 16px solid transparent;
				border-right: 16px solid transparent;
				border-bottom: 22px solid #000;
			}
			*/
			.${PREFIX}huge-scroll #cf-custom-scrollbar {
				width:42px;
			}
		`;
        stylesServiceInstance.setStyle('customscrollbar-buttons', styleContainerButtons);
        fragment.appendChild(scrollContainer);
        document.body.appendChild(fragment);
    };
    addButtonsInDom = (button, start = false) => {
        let container;
        let fragment = document.createDocumentFragment();
        let rightPosition = document.querySelector(APP_NAME)?.shadowRoot?.querySelector('app-toolbar')?.classList.contains('close') ?
            BTN_RIGHT_POS_DEFAULT : BTN_RIGHT_POS_OPEN;
        if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)) {
            container = document.querySelector(`#${CONTAINER_BUTTONS_ID}`);
        }
        else {
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
            }
            else {
                const scrollRow = container.querySelector('.scroll-row');
                if (scrollRow) {
                    container.insertBefore(targetRow, scrollRow);
                }
                else {
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
        }
        else {
            targetRow.appendChild(btn);
        }
        fragment.appendChild(container);
        document.body.appendChild(fragment);
    };
    isScrollButton = (button) => {
        return button.includes('scroll_');
    };
    removeButtonsInDom = (button) => {
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
    };
}
