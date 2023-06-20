"use strict";
const btnSettingLayout = document.createElement('template');
btnSettingLayout.innerHTML = `
	<button type="button" class="sc-btn-setting btn btn-primary border-0 flex-column align-items-start justify-content-between w-100 h-100 px-2 position-relative overflow-hidden">
		<span class="d-flex align-items-start gap-1">
			<app-icon data-size="1.5em"></app-icon>
			<span class="sc-btn-setting__name text-start lh-base"></span>
		</span>
		<span class="sc-btn-setting__values d-flex gap-1 align-items-center justify-content-center mt-2 mb-0 w-100"></span>
		<span class="sc-btn-setting__selected-value btn btn-primary border-0 position-absolute d-none w-100 h-100"></span>
		<span class="sc-btn-setting__label visually-hidden"></span>
	</button>
	<div class="tooltip bs-tooltip-top sc-btn-setting__tooltip d-none mt-2" role="tooltip">
		<div class="tooltip-inner text-bg-secondary fw-normal">
			<p class="sc-btn-setting__tooltip-instruction mb-2"></p>
			<p class="sc-btn-setting__tooltip-value"></p>
  	</div>
	</div>
`;
class BtnSettingComponent extends HTMLElement {
    static observedAttributes = ['data-values', 'data-active-value', 'data-name', 'data-disabled'];
    settingBtn = null;
    btnContentSlots = null;
    btnLabel = null;
    index = 0;
    value;
    name;
    slot = '';
    separator = ',';
    settingsList = [];
    disabled = false;
    tooltip = null;
    selectedValue = null;
    timeoutTooltip;
    timeoutSelectedValue;
    handler;
    constructor() {
        super();
        this.disabled = (this.dataset?.disabled === 'true') || this.disabled;
        this.appendChild(btnSettingLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.settingBtn = this.querySelector('button');
        this.tooltip = this.querySelector('.tooltip');
        this.selectedValue = this.querySelector('.sc-btn-setting__selected-value');
        this.btnContentSlots = this.querySelector('.sc-btn-setting__values');
        this.btnLabel = this.querySelector('.sc-btn-setting__label');
        this.settingBtn.addEventListener('click', this.handler);
        this.settingBtn.addEventListener('focusin', this.handler);
        this.settingBtn.addEventListener('focusout', this.handler);
        this.settingBtn.addEventListener('mouseover', this.handler);
        this.settingBtn.addEventListener('mouseout', this.handler);
        this.setDisabledState();
    }
    disconnectedCallback() {
        this.settingBtn?.removeEventListener('click', this.handler);
        this.settingBtn?.removeEventListener('focusin', this.handler);
        this.settingBtn?.removeEventListener('focusout', this.handler);
        this.settingBtn?.removeEventListener('mouseover', this.handler);
        this.settingBtn?.removeEventListener('mouseout', this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ('data-values' === name) {
            this.settingsList = newValue.split(this.separator);
        }
        if ('data-active-value' === name) {
            this.setIndex(Number(newValue));
        }
        if ('data-name' === name) {
            const settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
            this.name = settingName;
            const buttonName = this.querySelector('.sc-btn-setting__name');
            const tooltipInstruction = this.querySelector('.sc-btn-setting__tooltip-instruction');
            const icon = this.querySelector('app-icon');
            buttonName.innerText = i18nServiceInstance.getMessage(`setting_${this.name}`);
            tooltipInstruction.innerText = i18nServiceInstance.getMessage(`setting_${this.name}_instruction`);
            icon?.setAttribute('data-name', this.name);
            this.setTitle();
        }
        if ('data-disabled' === name) {
            this.disabled = newValue === 'true';
            this.setDisabledState();
        }
    }
    getValueLabel = (value) => {
        if (value?.includes('_')) {
            let arrayValues = [];
            value.split('_').forEach((item) => {
                const value = i18nServiceInstance.getMessage(item);
                if (value)
                    arrayValues.push(value);
            });
            return i18nServiceInstance.getMessage(`${this.name}_values`, arrayValues);
        }
        else {
            return i18nServiceInstance.getMessage(`${this.name}_${value}`);
        }
    };
    setTitle = () => {
        const settingsNumber = this.settingsList.length;
        if (settingsNumber > 0 && this.value) {
            const currentValueLabel = this.getValueLabel(this.value);
            const nextValueIndex = settingsNumber === (this.index + 1) ? 0 : this.index + 1;
            const nextValueLabel = this.getValueLabel(this.settingsList[nextValueIndex]);
            let content = '';
            if (currentValueLabel === 'active') {
                content = i18nServiceInstance.getMessage('multiclicToggleOn');
            }
            else if (nextValueLabel === 'active') {
                content = i18nServiceInstance.getMessage('multiclicToggleOff');
            }
            else {
                const currentIndex = this.index + 1;
                content = i18nServiceInstance.getMessage('multiclic', [
                    currentValueLabel,
                    String(currentIndex),
                    String(settingsNumber),
                    nextValueLabel,
                    String(nextValueIndex + 1)
                ]);
            }
            const labelParts = content.split(' — ');
            const tooltipValue = this.querySelector('.sc-btn-setting__tooltip-value');
            tooltipValue.innerHTML = labelParts && labelParts.length > 1 ? `<span class="fw-bold">${labelParts[0]}</span>` : content;
            this.btnLabel.innerHTML = content;
        }
    };
    setIndex = (index) => {
        if (index?.toString()) {
            this.index = index;
        }
        else {
            let i = this.index + 1;
            this.index = i >= this.settingsList.length ? 0 : i;
            // If value is null, increment to the next value
            // It's for the case where setting has only 2 values but can add custom value
            if (!this.settingsList[this.index]) {
                let i = this.index + 1;
                this.index = i >= this.settingsList.length ? 0 : i;
            }
        }
        if (this.index === 0) {
            this.settingBtn?.classList.add('sc-btn-setting--default');
        }
        else {
            this.settingBtn?.classList.remove('sc-btn-setting--default');
        }
        this.calculateList();
    };
    setDisabledState = () => {
        if (this.settingBtn) {
            this.settingBtn.disabled = this.disabled;
        }
    };
    calculateList = () => {
        this.slot = '';
        this.settingsList.forEach((value, index) => {
            /* Display the point only if value */
            if (value) {
                let point = '<span class="sc-btn-setting__value rounded-circle"></span>';
                if (index === this.index) {
                    point = '<span class="sc-btn-setting__value sc-btn-setting__current-value rounded-circle"></span>';
                    this.value = value;
                }
                this.slot = `${this.slot}${point}`;
            }
        });
        this.btnContentSlots.innerHTML = this.slot;
        this.setTitle();
    };
    showTooltip = () => {
        this.hideTooltip();
        this.timeoutTooltip = setTimeout(() => {
            this.tooltip?.classList.remove('d-none');
            this.settingBtn.classList.add('sc-btn-setting--show-tooltip');
        }, 3000);
    };
    hideTooltip = () => {
        clearTimeout(this.timeoutTooltip);
        this.tooltip?.classList.add('d-none');
        this.settingBtn.classList.remove('sc-btn-setting--show-tooltip');
    };
    showSelectedValue = () => {
        this.selectedValue.innerText = this.getValueLabel(this.value);
        clearTimeout(this.timeoutSelectedValue);
        this.selectedValue?.classList.remove('d-none');
        this.timeoutSelectedValue = setTimeout(() => {
            this.selectedValue?.classList.add('d-none');
        }, 3000);
    };
    createHandler = () => {
        return (event) => {
            switch (event.type) {
                case 'click':
                    this.setIndex();
                    this.showSelectedValue();
                    let clickEvent = new CustomEvent('changeSettingEvent', {
                        bubbles: true,
                        detail: {
                            value: this.value,
                            index: this.index
                        }
                    });
                    this.settingBtn?.dispatchEvent(clickEvent);
                    setTimeout(() => {
                        this.settingBtn?.focus();
                    }, 300);
                    break;
                case 'focusin':
                case 'mouseover':
                    this.showTooltip();
                    break;
                case 'focusout':
                case 'mouseout':
                    this.hideTooltip();
                    break;
            }
        };
    };
}
customElements.define('app-btn-setting', BtnSettingComponent);
