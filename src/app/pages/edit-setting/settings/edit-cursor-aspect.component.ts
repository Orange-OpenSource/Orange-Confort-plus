const editCursorAspectLayout: HTMLTemplateElement = document.createElement('template');
editCursorAspectLayout.innerHTML = `
	<form class="d-flex flex-column gap-4">
		<app-select-edit-value id="${PREFIX}select-cursor-size" data-name="CursorSize" data-label="true"></app-select-edit-value>
		<app-select-edit-value id="${PREFIX}select-cursor-color" data-name="CursorColor" data-label="true"></app-select-edit-value>

		<div class="d-flex flex-wrap gap-2 bg-light p-3" id="${PREFIX}example-cursor"></div>
	</form>
`;

class EditCursorAspectComponent extends HTMLElement {
	selectCursorSizeElement: HTMLElement | null = null;
	selectCursorColorElement: HTMLElement | null = null;

	settingValues: string[] = null;
	cursorSizeValue = '';
	cursorColorValue = '';
	cursorSizeValues = [DEFAULT_VALUE, 'big', 'huge'];
	cursorColorValues = [DEFAULT_VALUE, 'white', 'blue', 'red', 'yellow', 'green', 'black'];

	handler: any;

	constructor() {
		super();

		this.appendChild(editCursorAspectLayout.content.cloneNode(true));

		this.handler = this.createHandler();
	}

	connectedCallback(): void {
		this.selectCursorSizeElement = this.querySelector(`#${PREFIX}select-cursor-size`);
		this.selectCursorColorElement = this.querySelector(`#${PREFIX}select-cursor-color`);

		this.selectCursorSizeElement.addEventListener('editSettingCursorSize', this.handler);
		this.selectCursorColorElement.addEventListener('editSettingCursorColor', this.handler);

		this.selectCursorSizeElement.setAttribute('data-setting-values', this.cursorSizeValues.join(','));
		this.selectCursorColorElement.setAttribute('data-setting-values', this.cursorColorValues.join(','));

		modeOfUseServiceInstance.getSetting('cursorAspect').then((result: SettingModel) => {
			this.settingValues = result.values.split(',');
			this.cursorSizeValue = this.settingValues[result.valueSelected].split('_')[0];
			this.cursorColorValue = this.settingValues[result.valueSelected].split('_')[1];

			const currentIndexCursorSize = this.cursorSizeValues.findIndex(i => i === this.cursorSizeValue);
			const currentIndexCursorColor = this.cursorColorValues.findIndex(i => i === this.cursorColorValue);

			this.selectCursorSizeElement.setAttribute('data-index', currentIndexCursorSize.toString());
			this.selectCursorColorElement.setAttribute('data-index', currentIndexCursorColor.toString());
		});
	}

	setCursorAspect = (): void => {
		let value = '';
		if (this.cursorSizeValue === DEFAULT_VALUE) {
			value = DEFAULT_VALUE;
			this.setExampleCursor(true);
		} else {
			value = `${this.cursorSizeValue}_${this.cursorColorValue}`;
			this.setExampleCursor();
		}

		let newSettingIndex = this.settingValues.indexOf(value);

		if (newSettingIndex !== -1) {
			modeOfUseServiceInstance.setSettingValue('cursorAspect', newSettingIndex, true);
		} else {
			modeOfUseServiceInstance.addSettingCustomValue('cursorAspect', 3, value);
		}

		cursorAspectServiceInstance.setCursor(value);
	}

	setExampleCursor = (deleteExample = false): void => {
		let containerExample: HTMLElement = this.querySelector(`#${PREFIX}example-cursor`);
		containerExample.innerHTML = '';

		if (deleteExample) {
			containerExample.innerText = i18nServiceInstance.getMessage('labelCursorEmpty');
		} else {
			let size = this.cursorSizeValue.split('_')[0] === 'big' ? CURSOR_SIZE_BIG : CURSOR_SIZE_HUGE;

			const cursorArray = [
				{ name: 'default', strokeWidth: 6 },
				{ name: 'pointer', strokeWidth: 6 },
				{ name: 'text', strokeWidth: 4 },
			];

			cursorArray.forEach((cursor: any) => {
				const cursorSvg = cursorAspectServiceInstance.drawCursor(cursor.name, Number(size), this.cursorColorValue, cursor.strokeWidth);
				let cursorElt = new DOMParser().parseFromString(cursorSvg, "text/html");
				containerExample.appendChild(cursorElt.documentElement.querySelector('svg'));
			});
		}
	}

	private createHandler = () => {
		return (event: any) => {
			switch (event.type) {
				case 'editSettingCursorSize':
					this.cursorSizeValue = event.detail.newValue;
					this.setCursorAspect();
					break;
				case 'editSettingCursorColor':
					this.cursorColorValue = event.detail.newValue;
					this.setCursorAspect();
					break;
			}
		}
	}
}

customElements.define('app-edit-cursor-aspect', EditCursorAspectComponent);
