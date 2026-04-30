let colorReadServiceIsInstantiated: boolean;

/** Blocs de texte éligibles au clic (hors tokenisation préalable). */
const COLOR_READ_BLOCK_SELECTOR =
	'p, li, blockquote, td, th, h1, h2, h3, h4, h5, h6, dd, dt';

const COLOR_READ_SECTION_ATTR = 'data-cplus-cr-section';
const COLOR_READ_ORIGINAL_ATTR = 'data-cplus-cr-original';
const COLOR_READ_ARMED_ATTR = 'data-cplus-cr-armed';
const COLOR_READ_STYLE_ARMED = 'color-read-armed';

const COLOR_READ_ARMED_CSS = `
html[${COLOR_READ_ARMED_ATTR}] :is(${COLOR_READ_BLOCK_SELECTOR}) {
	cursor: pointer;
}
html[${COLOR_READ_ARMED_ATTR}] [${COLOR_READ_SECTION_ATTR}]:hover {
	outline: 2px dashed currentColor;
	outline-offset: 2px;
}
`;

const ColorMode = Object.freeze({
	OFF: 'none',
	SPLIT_SYLLABLES: 'splitSyllables',
	COLOR_SYLLABLES: 'colorSyllables',
} as const);
type ColorModeValue = (typeof ColorMode)[keyof typeof ColorMode];

const ClickScope = Object.freeze({
	WORD: 'word',
	SENTENCE: 'sentence',
	PARAGRAPH: 'paragraph',
	ALL: 'all',
} as const);
type ClickScopeValue = (typeof ClickScope)[keyof typeof ClickScope];

interface SetColorOptions {
	syllableSeparator?: string;
	colors?: string[];
	rootSelector?: string;
}

const MVP_ACTIONS: Record<string, ColorModeValue> = {
	splitSyllables: ColorMode.SPLIT_SYLLABLES,
	colorSyllables: ColorMode.COLOR_SYLLABLES,
};

const SCOPES = new Set<string>(Object.values(ClickScope));

class ColorReadService {
	private mode: ColorModeValue = ColorMode.OFF;
	private scope: ClickScopeValue = ClickScope.WORD;
	private options: SetColorOptions = {};
	private abortCtrl: AbortController | null = null;

	private blockSnapshots = new WeakMap<
		HTMLElement,
		{ innerHTML: string; styleAttr: string | null }
	>();
	private activeBlocks = new Set<HTMLElement>();
	private activeSections = new Set<HTMLElement>();

	private onClickBound = (ev: Event): void => {
		if (ev instanceof MouseEvent) {
			this.onClick(ev);
		}
	};

	constructor() {
		if (colorReadServiceIsInstantiated) {
			throw new Error('ColorReadService is already instantiated.');
		}

		colorReadServiceIsInstantiated = true;
	}

	setColorRead = (value: string): void => {
		if (value === DEFAULT_VALUE) {
			this.restoreAll();
			this.disarm();
			this.mode = ColorMode.OFF;
			this.scope = ClickScope.WORD;
			return;
		}

		const parsed = this.parseSettingValue(value);
		if (!parsed.supported) {
			this.restoreAll();
			this.disarm();
			this.mode = ColorMode.OFF;
			this.scope = ClickScope.WORD;
			return;
		}

		const same =
			this.mode === parsed.mode &&
			this.scope === parsed.scope &&
			this.abortCtrl !== null;
		if (same) {
			return;
		}

		this.restoreAll();
		this.disarm();
		this.mode = parsed.mode;
		this.scope = parsed.scope;
		this.arm();
	};

	private parseSettingValue(value: string): {
		supported: boolean;
		mode: ColorModeValue;
		scope: ClickScopeValue;
	} {
		const parts = value.split('_');
		const action = parts[0];
		const scopeStr = parts.length > 1 ? parts.slice(1).join('_') : ClickScope.WORD;

		const mode = MVP_ACTIONS[action];
		if (!mode || !SCOPES.has(scopeStr)) {
			return {
				supported: false,
				mode: ColorMode.OFF,
				scope: ClickScope.WORD,
			};
		}

		return {
			supported: true,
			mode,
			scope: scopeStr as ClickScopeValue,
		};
	}

	private arm(): void {
		if (this.abortCtrl) {
			return;
		}
		this.abortCtrl = new AbortController();
		document.documentElement.setAttribute(COLOR_READ_ARMED_ATTR, '');
		stylesServiceInstance.setStyle(COLOR_READ_STYLE_ARMED, COLOR_READ_ARMED_CSS);
		document.addEventListener('click', this.onClickBound, {
			capture: true,
			signal: this.abortCtrl.signal,
		});
	}

	private disarm(): void {
		if (this.abortCtrl) {
			this.abortCtrl.abort();
			this.abortCtrl = null;
		}
		document.documentElement.removeAttribute(COLOR_READ_ARMED_ATTR);
		stylesServiceInstance.removeStyle(COLOR_READ_STYLE_ARMED);
	}

	private lcAvailable(): boolean {
		return (
			typeof JsonProfile !== 'undefined' &&
			typeof JsonProfile.from === 'function'
		);
	}

	private rootSelector(): string {
		return this.options.rootSelector ?? COLOR_READ_BLOCK_SELECTOR;
	}

	private onClick(ev: MouseEvent): void {
		const rawTarget = ev.target;
		if (!(rawTarget instanceof Element)) {
			return;
		}
		if (rawTarget.closest(APP_NAME)) {
			return;
		}
		if (
			rawTarget.closest(
				'input, textarea, select, button, option, [contenteditable="true"]',
			)
		) {
			return;
		}

		const sectionSpan = rawTarget.closest(`[${COLOR_READ_SECTION_ATTR}]`);
		if (sectionSpan instanceof HTMLElement) {
			ev.preventDefault();
			ev.stopPropagation();
			this.restoreSection(sectionSpan);
			return;
		}

		const transformedBlock = this.findActiveBlock(rawTarget);
		if (transformedBlock) {
			ev.preventDefault();
			ev.stopPropagation();
			this.restoreElement(transformedBlock);
			return;
		}

		if (!this.lcAvailable()) {
			return;
		}

		if (this.scope === ClickScope.ALL) {
			ev.preventDefault();
			ev.stopPropagation();
			this.transformAllBlocks();
			return;
		}

		if (this.scope === ClickScope.PARAGRAPH) {
			const block = rawTarget.closest(COLOR_READ_BLOCK_SELECTOR);
			if (!(block instanceof HTMLElement)) {
				return;
			}
			if (block.closest(APP_NAME)) {
				return;
			}
			ev.preventDefault();
			ev.stopPropagation();
			this.transformElement(block);
			return;
		}

		if (
			this.scope === ClickScope.WORD ||
			this.scope === ClickScope.SENTENCE
		) {
			const range = this.resolveWordOrSentenceRange(ev);
			if (!range || range.collapsed) {
				return;
			}
			const text = range.toString();
			if (!text.trim()) {
				return;
			}
			ev.preventDefault();
			ev.stopPropagation();
			this.transformRange(range);
		}
	}

	private findActiveBlock(from: Element): HTMLElement | null {
		const block = from.closest(COLOR_READ_BLOCK_SELECTOR);
		if (block instanceof HTMLElement && this.activeBlocks.has(block)) {
			return block;
		}
		return null;
	}

	private getCaretRangeFromPoint(x: number, y: number): Range | null {
		const doc = document as Document & {
			caretRangeFromPoint?: (x: number, y: number) => Range | null;
		};
		if (typeof doc.caretRangeFromPoint === 'function') {
			return doc.caretRangeFromPoint(x, y);
		}
		const caretPos = (
			document as Document & {
				caretPositionFromPoint?: (
					x: number,
					y: number,
				) => { offsetNode: Node; offset: number } | null;
			}
		).caretPositionFromPoint?.(x, y);
		if (caretPos) {
			const r = document.createRange();
			r.setStart(caretPos.offsetNode, caretPos.offset);
			r.collapse(true);
			return r;
		}
		return null;
	}

	private getTextOffsetInRoot(root: HTMLElement, node: Node, offset: number): number {
		const range = document.createRange();
		range.selectNodeContents(root);
		range.setEnd(node, offset);
		return range.toString().length;
	}

	private findSegmentBounds(
		text: string,
		offset: number,
		granularity: 'word' | 'sentence',
	): { start: number; end: number } | null {
		try {
			const lang =
				document.documentElement.lang?.split(/[-_]/)?.[0] || 'fr';
			const segmenter = new Intl.Segmenter(lang, { granularity });
			for (const segment of segmenter.segment(text)) {
				const segEnd = segment.index + segment.segment.length;
				if (offset >= segment.index && offset < segEnd) {
					return { start: segment.index, end: segEnd };
				}
			}
		} catch {
			return null;
		}
		return null;
	}

	private rangeForSubstring(
		root: HTMLElement,
		start: number,
		end: number,
	): Range | null {
		if (start >= end) {
			return null;
		}
		const range = document.createRange();
		let counted = 0;
		let started = false;
		const walker = document.createTreeWalker(
			root,
			NodeFilter.SHOW_TEXT,
			null,
		);
		let n: Text | null = walker.nextNode() as Text | null;
		while (n) {
			const len = n.length;
			const nodeEnd = counted + len;
			if (!started && start < nodeEnd) {
				range.setStart(n, Math.max(0, start - counted));
				started = true;
			}
			if (started && end <= nodeEnd) {
				range.setEnd(n, Math.max(0, end - counted));
				return range;
			}
			counted = nodeEnd;
			n = walker.nextNode() as Text | null;
		}
		return started ? null : null;
	}

	private resolveWordOrSentenceRange(ev: MouseEvent): Range | null {
		const caret = this.getCaretRangeFromPoint(ev.clientX, ev.clientY);
		if (!caret) {
			return null;
		}
		const node = caret.startContainer;
		const block =
			node.nodeType === Node.TEXT_NODE
				? (node.parentElement as HTMLElement | null)?.closest(
						COLOR_READ_BLOCK_SELECTOR,
					)
				: (node as HTMLElement).closest(COLOR_READ_BLOCK_SELECTOR);
		if (!(block instanceof HTMLElement) || block.closest(APP_NAME)) {
			return null;
		}
		const offset = this.getTextOffsetInRoot(
			block,
			caret.startContainer,
			caret.startOffset,
		);
		const text = block.textContent ?? '';
		if (!text.length) {
			return null;
		}
		const safeOffset = Math.min(offset, Math.max(0, text.length - 1));
		const granularity =
			this.scope === ClickScope.WORD ? 'word' : 'sentence';
		const bounds = this.findSegmentBounds(text, safeOffset, granularity);
		if (!bounds) {
			return null;
		}
		return this.rangeForSubstring(block, bounds.start, bounds.end);
	}

	private wrapRange(range: Range, span: HTMLElement): boolean {
		try {
			range.surroundContents(span);
			return true;
		} catch {
			try {
				const contents = range.extractContents();
				span.appendChild(contents);
				range.insertNode(span);
				return true;
			} catch {
				return false;
			}
		}
	}

	private restoreDescendantSections(root: HTMLElement): void {
		const nodes = Array.from(
			root.querySelectorAll(`[${COLOR_READ_SECTION_ATTR}]`),
		);
		for (const el of nodes) {
			if (el instanceof HTMLElement) {
				this.restoreSection(el);
			}
		}
	}

	private transformRange(range: Range): void {
		if (!this.lcAvailable()) {
			return;
		}
		const text = range.toString();
		const span = document.createElement('span');
		span.setAttribute(COLOR_READ_SECTION_ATTR, this.scope);
		span.setAttribute(COLOR_READ_ORIGINAL_ATTR, text);
		if (!this.wrapRange(range, span)) {
			return;
		}
		const profile = this.resolveProfile();
		const user = profile.asUserProfile();
		span.innerHTML = user.toHTML(text, span);
		const sty = user.style || '';
		if (sty) {
			const prev = span.getAttribute('style') || '';
			span.setAttribute('style', prev ? `${prev};${sty}` : sty);
		}
		user.postProcessHTML(span);
		this.activeSections.add(span);
	}

	private transformElement(el: HTMLElement): void {
		if (!this.lcAvailable()) {
			return;
		}
		this.restoreDescendantSections(el);
		if (!this.blockSnapshots.has(el)) {
			this.blockSnapshots.set(el, {
				innerHTML: el.innerHTML,
				styleAttr: el.getAttribute('style'),
			});
		}
		const text = el.textContent ?? '';
		const profile = this.resolveProfile();
		const user = profile.asUserProfile();
		el.innerHTML = user.toHTML(text, el);
		const sty = user.style || '';
		if (sty) {
			const prev = el.getAttribute('style') || '';
			el.setAttribute('style', prev ? `${prev};${sty}` : sty);
		}
		user.postProcessHTML(el);
		this.activeBlocks.add(el);
	}

	private transformAllBlocks(): void {
		if (!this.lcAvailable()) {
			return;
		}
		const selector = this.rootSelector();
		const nodes = document.querySelectorAll(selector);
		const profile = this.resolveProfile();
		const user = profile.asUserProfile();
		for (const node of nodes) {
			if (!(node instanceof HTMLElement)) {
				continue;
			}
			if (node.closest(APP_NAME)) {
				continue;
			}
			this.restoreDescendantSections(node);
			if (!this.blockSnapshots.has(node)) {
				this.blockSnapshots.set(node, {
					innerHTML: node.innerHTML,
					styleAttr: node.getAttribute('style'),
				});
			}
			const text = node.textContent ?? '';
			node.innerHTML = user.toHTML(text, node);
			const sty = user.style || '';
			if (sty) {
				const prev = node.getAttribute('style') || '';
				node.setAttribute('style', prev ? `${prev};${sty}` : sty);
			}
			user.postProcessHTML(node);
			this.activeBlocks.add(node);
		}
	}

	private restoreSection(span: HTMLElement): void {
		const original = span.getAttribute(COLOR_READ_ORIGINAL_ATTR);
		if (original === null) {
			return;
		}
		span.replaceWith(document.createTextNode(original));
		this.activeSections.delete(span);
	}

	private restoreElement(el: HTMLElement): void {
		const snap = this.blockSnapshots.get(el);
		if (!snap) {
			return;
		}
		el.innerHTML = snap.innerHTML;
		if (snap.styleAttr === null) {
			el.removeAttribute('style');
		} else {
			el.setAttribute('style', snap.styleAttr);
		}
		this.blockSnapshots.delete(el);
		this.activeBlocks.delete(el);
	}

	private restoreAll(): void {
		for (const span of Array.from(this.activeSections)) {
			this.restoreSection(span);
		}
		for (const block of Array.from(this.activeBlocks)) {
			this.restoreElement(block);
		}
	}

	private resolveProfile(): JsonProfile {
		const separator = this.options.syllableSeparator ?? '\u00b7';
		if (this.mode === ColorMode.SPLIT_SYLLABLES) {
			return this.buildSeparatedSyllablesProfile(separator);
		}
		return this.buildAlternatingColoredSyllablesProfile(
			this.options.colors ?? ['#ea0000', '#0000e1'],
		);
	}

	/** Séparateur syllabique uniquement (point médian), sans coloration. */
	private buildSeparatedSyllablesProfile(separator: string): JsonProfile {
		return JsonProfile.from({
			name: 'C+ syllabes séparées',
			description: '',
			params: {
				SYLLABES_ECRITES: true,
				novice_reader: false,
				SYLLABES_LC: true,
			},
			format: {
				font: ' ',
				color: '#111111',
				background: '#ffffff',
				line_spacing: 200,
				scale_width: 150,
				height: 20,
			},
			process: [{ separator, function: 'syllabes' }],
		} as Record<string, unknown>);
	}

	/** Alternance bicolore par syllabe, sans séparateur ; muets en gris. */
	private buildAlternatingColoredSyllablesProfile(colors: string[]): JsonProfile {
		const palette =
			colors.length >= 2 ? colors : ['#ea0000', '#0000e1'];
		const formatSyllables = palette.map((color) => ({
			color,
			background: '#ffffff',
		}));
		return JsonProfile.from({
			name: 'C+ syllabes colorées',
			description: '',
			params: {
				SYLLABES_ECRITES: true,
				novice_reader: true,
				SYLLABES_LC: true,
			},
			format: {
				font_name: ' ',
				color: '#111111',
				background: '#ffffff',
				line_spacing: 150,
				scale_width: 150,
				height: 20,
				page_width: 50,
			},
			process: [
				{ function: 'alternsyllabes', format: formatSyllables },
				{
					function: 'phonemes',
					format: [
						{
							selection: ['#', 'verb_3p', '#_amb'],
							color: '#aaaaaa',
							background: '#ffffff',
							phonemes: ['#', 'verb_3p', '#_amb'],
						},
					],
				},
			],
		} as Record<string, unknown>);
	}
}
