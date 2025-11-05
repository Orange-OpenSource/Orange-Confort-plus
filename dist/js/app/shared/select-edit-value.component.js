"use strict";
const selectEditValueLayout = document.createElement('template');
selectEditValueLayout.innerHTML = `
	<div class="d-flex flex-column" role="group">
		<div class="d-flex align-items-center justify-content-between mt-2 gap-2">
			<button type="button" class="btn btn-icon btn-primary">
				<span class="visually-hidden" data-i18n="prevValue"></span>
				<app-icon data-name="Form_Chevron_left"></app-icon>
			</button>
			<output></output>
			<button type="button" class="btn btn-icon btn-primary">
				<span class="visually-hidden" data-i18n="nextValue"></span>
				<app-icon data-name="Form_Chevron_right"></app-icon>
			</button>
		</div>
	</div>
`;
class SelectEditValueComponent extends HTMLElement {
    static observedAttributes = ['data-name', 'data-index', 'data-setting-values', 'data-label'];
    selectedValue = null;
    btnPrevValue = null;
    btnNextValue = null;
    name = '';
    values = [];
    currentIndex = null;
    currentValue = null;
    handler;
    constructor() {
        super();
        this.name = this.dataset?.name || this.name;
        this.appendChild(selectEditValueLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectedValue = this.querySelector('output');
        this.btnPrevValue = this.querySelector('button:first-of-type');
        this.btnNextValue = this.querySelector('button:last-of-type');
        this.btnPrevValue?.addEventListener('click', this.handler);
        this.btnNextValue?.addEventListener('click', this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ('data-index' === name) {
            this.currentIndex = Number(newValue);
            this.moveEditValue(this.currentIndex);
        }
        if ('data-setting-values' === name) {
            this.values = newValue.split(',');
        }
        if ('data-label' === name) {
            let groupElement = this.querySelector('div[role="group"]');
            let selectLabel = document.createElement('label');
            selectLabel.innerText = i18nServiceInstance.getMessage(`${this.name}_label`);
            selectLabel.setAttribute('id', `${PREFIX}${stringServiceInstance.normalizeID(this.name)}`);
            groupElement.insertBefore(selectLabel, groupElement.firstChild);
            groupElement.setAttribute('aria-labelledby', `${PREFIX}${stringServiceInstance.normalizeID(this.name)}`);
        }
    }
    moveEditValue = (index) => {
        this.currentIndex = index;
        this.btnPrevValue.disabled = false;
        this.btnNextValue.disabled = false;
        if (this.currentIndex <= 0) {
            this.currentIndex = 0;
            this.btnPrevValue.disabled = true;
            this.btnNextValue.disabled = false;
        }
        else if (this.currentIndex >= this.values.length - 1) {
            this.currentIndex = this.values.length - 1;
            this.btnPrevValue.disabled = false;
            this.btnNextValue.disabled = true;
        }
        this.currentValue = this.values[this.currentIndex];
        if (this.currentValue?.includes('_')) {
            let arrayValues = [];
            this.currentValue.split('_').forEach((item) => {
                arrayValues.push(i18nServiceInstance.getMessage(item));
            });
            this.selectedValue.innerText = i18nServiceInstance.getMessage(`${this.name}_values`, arrayValues);
        }
        else {
            let message = `${this.name}_${this.currentValue}`;
            this.selectedValue.innerText = i18nServiceInstance.getMessage(message);
        }
        this.changeEditValue();
    };
    createHandler = () => {
        return (event) => {
            if (event.type === 'click') {
                switch (event.currentTarget) {
                    case this.btnPrevValue:
                        this.moveEditValue(this.currentIndex - 1);
                        break;
                    case this.btnNextValue:
                        this.moveEditValue(this.currentIndex + 1);
                        break;
                }
            }
        };
    };
    changeEditValue = () => {
        let editValueEvent = new CustomEvent(`editSetting${stringServiceInstance.capitalizeFirstLetter(this.name)}`, {
            bubbles: true,
            detail: {
                newValue: this.currentValue
            }
        });
        this.dispatchEvent(editValueEvent);
    };
}
customElements.define('app-select-edit-value', SelectEditValueComponent);
