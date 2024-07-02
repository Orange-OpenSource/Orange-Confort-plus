let domServiceIsInstantiated: boolean;

class DomService {
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
}

