"use strict";
const template = document.createElement('template');
template.innerHTML = `
<div data-bs-theme="light" style="display:none">
	<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">
		<span class="visually-hidden" data-i18n="mainButton"></span>
		<app-icon data-size="3em" data-name="Accessibility"></app-icon>
		<span id="pause-indicator" class="sc-confort-plus-pause-icon">
			<app-icon data-size="2em" data-name="Pause"></app-icon>
		</span>
	</button>
	<app-toolbar class="bg-body position-fixed top-0 end-0" id="${PREFIX}toolbar"></app-toolbar>
</div>
`;
class AppComponent extends HTMLElement {
    confortPlusBtn = null;
    confortPlusToolbar = null;
    closeBtn = null;
    pauseIndicator = null;
    link;
    handler;
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this?.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.link = document.createElement('link');
        this.link.rel = 'stylesheet';
        this.link.href = `${appPath}css/styles.min.css`;
        this.link.onload = () => {
            this?.shadowRoot?.querySelector('[data-bs-theme]').removeAttribute('style');
        };
        this.shadowRoot?.appendChild(this.link);
        this.handler = this.createHandler();
    }
    connectedCallback() {
        iconsServiceInstance.loadSprite(this.shadowRoot);
        // @note Tick until everything loaded
        setTimeout(() => {
            i18nServiceInstance.translate(this.shadowRoot);
        });
        this.confortPlusBtn = this?.shadowRoot?.getElementById('confort');
        this.closeBtn = this?.shadowRoot?.getElementById('close-toolbar');
        this.pauseIndicator = this?.shadowRoot?.getElementById('pause-indicator');
        this.confortPlusToolbar = this?.shadowRoot?.getElementById(`${PREFIX}toolbar`);
        if (!this.confortPlusBtn || !this.confortPlusToolbar) {
            return;
        }
        localStorageServiceInstance.getItem('is-opened')
            .then((isOpened) => {
            if (isOpened === 'true') {
                this.showToolbar();
            }
            else {
                this.hideToolbar();
            }
        });
        this.setPauseIndicator();
        dragDropServiceInstance.init(this.confortPlusBtn);
        dragDropServiceInstance.enable();
        this.confortPlusToolbar.addEventListener('closeEvent', this.handler);
        this.confortPlusBtn.addEventListener('click', this.handler);
    }
    disconnectedCallback() {
        this.confortPlusToolbar?.removeEventListener('closeEvent', this.handler);
        this.confortPlusBtn?.removeEventListener('click', this.handler);
    }
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'closeEvent':
                    this.hideToolbar();
                    break;
                case 'click':
                    this.showToolbar();
                    break;
                default:
                    break;
            }
        };
    };
    showToolbar = () => {
        dragDropServiceInstance.disable();
        this.setContainerButtonsPosition(BTN_RIGHT_POS_OPEN);
        this.confortPlusToolbar.classList.remove('close');
        this.confortPlusBtn.classList.add('d-none');
        this.closeBtn?.focus();
        localStorageServiceInstance.setItem('is-opened', 'true');
    };
    hideToolbar = () => {
        this.setContainerButtonsPosition(BTN_RIGHT_POS_DEFAULT);
        this.confortPlusToolbar.classList.add('close');
        this.confortPlusBtn.classList.remove('d-none');
        this.confortPlusBtn?.focus();
        localStorageServiceInstance.setItem('is-opened', 'false');
        this.setPauseIndicator();
        dragDropServiceInstance.enable();
    };
    setContainerButtonsPosition = (position) => {
        if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)) {
            document.querySelector(`#${CONTAINER_BUTTONS_ID}`).style.right = position;
        }
    };
    setPauseIndicator = () => {
        localStorageServiceInstance.getItem('is-paused')
            .then((isPaused) => {
            this.pauseIndicator.hidden = !isPaused;
            this.confortPlusBtn.classList.toggle('sc-confort-plus--paused', isPaused ?? false);
        });
    };
}
customElements.define(APP_NAME, AppComponent);
