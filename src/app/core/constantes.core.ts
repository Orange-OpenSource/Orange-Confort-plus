// @ts-nocheck
// @todo trouver comment éviter les erreurs à la compilation causé par la différence de répertoire
// Exemple: erreur si un service utilise une constante de ce fichier
const PREFIX = 'cplus-';
const JSON_NAME = 'modeOfUse';
const DEFAULT_VALUE = 'noModifications';
const DEFAULT_MODE = 'facilePlus';
const APP_NAME = `${PREFIX}app-root`;
const VERSION = '5.4.0';

const PAGE_HOME = 'home';
const PAGE_MODES = 'modes';
const PAGE_SETTINGS = 'settings';
const PAGE_EDIT_SETTING = 'edit-setting';
const PAGE_P_MARKUP_SELECTOR = `body > :not([id^=${PREFIX}]) p, body > p`;

const FOCUS_SIZE_BIG = '4px';
const FOCUS_SIZE_HUGE = '10px';
const CURSOR_SIZE_BIG = 56;
const CURSOR_SIZE_HUGE = 128;
const SCROLL_SIZE_BIG = '32px';
const SCROLL_SIZE_HUGE = '48px';

const BTN_CPLUS_SCROLLBAR_MARGIN = 26;
const BTN_CPLUS_POS_DEFAULT = '1em';
const BTN_CPLUS_DRAG_TRESHOLD = 5;

const BTN_RIGHT_POS_DEFAULT = '2em';
const BTN_RIGHT_POS_OPEN = '26em';

const CLICK_FACILITE_BIG_ZONE = 'bigZone';
const CLICK_FACILITE_LONG_CLICK = 'longClick';
const CLICK_FACILITE_AUTO_CLICK = 'autoClick';

const CONTAINER_BUTTONS_ID = `${PREFIX}container-buttons`;

const TEXT_COLOR_SPAN_CLASS = `${PREFIX}colored-text`;

const TEXT_ALTERNATE_LINES = `${PREFIX}alternateLines`;

const BODY_ELEMENTS_FILTER = 'script,style,link,meta';

const COLOR_DARK_BG_PROFILE = {
	name: 'Palette fonds foncés',
	params: { novice_reader: true },
	format: { line_spacing: 150, page_width: 70 },
	process: [
		{
			function: 'phonemes',
			format: [
				{
					color: '#16b84e',
					phonemes: ['e^', 'e^_comp'],
					phonetics: 'ɛ',
					example: ['ai, è'],
				},
				{
					color: '#cfc3b4',
					phonemes: ['e~'],
					phonetics: 'ɛ̃',
					example: ['ain, in'],
				},
				{
					color: '#ff00bd',
					phonemes: ['a~'],
					phonetics: 'ɑ̃',
					example: ['an, en'],
				},
				{
					color: '#ff99ff',
					phonemes: ['o', 'o_comp', 'o_ouvert'],
					phonetics: 'o',
					example: ['o, au'],
				},
				{
					color: '#00ffcc',
					phonemes: ['k', 'k_qu'],
					phonetics: 'k',
					example: ['qu, k'],
				},
				{
					color: '#ff5353',
					phonemes: ['s^'],
					phonetics: 'ʃ',
					example: ['ch, sh'],
				},
				{
					color: '#ff7900',
					phonemes: ['e', 'e_comp'],
					phonetics: 'e',
					example: ['é'],
				},
				{
					color: '#66ff33',
					phonemes: ['g', 'g_u'],
					phonetics: 'g',
					example: ['gue'],
				},
				{
					color: '#ffff66',
					phonemes: ['z^', 'z^_g'],
					phonetics: 'ʒ',
					example: ['j, ge'],
				},
				{
					color: '#b58e6b',
					phonemes: ['wa'],
					phonetics: 'wa',
					example: ['oi, oua'],
				},
				{
					color: '#f4acff',
					phonemes: ['s', 's_c', 's_t'],
					phonetics: 's',
					example: ['ss, ce'],
				},
				{
					color: '#f88e55',
					phonemes: ['x~'],
					phonetics: 'œ̃',
					example: ['un, ein'],
				},
				{
					color: '#ddddff',
					phonemes: ['z', 'z_s'],
					phonetics: 'z',
					example: ['z'],
				},
			],
		},
	],
};

const COLOR_LIGHT_BG_PROFILE = {
	name: 'Palette fonds clairs',
	params: { novice_reader: true },
	format: { line_spacing: 150, page_width: 70 },
	process: [
		{
			function: 'phonemes',
			format: [
				{
					color: '#095228',
					phonemes: ['e^', 'e^_comp'],
					phonetics: 'ɛ',
					example: ['ai, è'],
				},
				{
					color: '#b15b1f',
					phonemes: ['e~'],
					phonetics: 'ɛ̃',
					example: ['ain, in'],
				},
				{
					color: '#008000',
					phonemes: ['a~'],
					phonetics: 'ɑ̃',
					example: ['an, en'],
				},
				{
					color: '#c40083',
					phonemes: ['o', 'o_comp', 'o_ouvert'],
					phonetics: 'o',
					example: ['o, au'],
				},
				{
					color: '#085ebe',
					phonemes: ['k', 'k_qu'],
					phonetics: 'k',
					example: ['qu, k'],
				},
				{
					color: '#1b6300',
					phonemes: ['s^'],
					phonetics: 'ʃ',
					example: ['ch, sh'],
				},
				{
					color: '#6a5500',
					phonemes: ['e', 'e_comp'],
					phonetics: 'e',
					example: ['é'],
				},
				{
					color: '#754977',
					phonemes: ['g', 'g_u'],
					phonetics: 'g',
					example: ['gue'],
				},
				{
					color: '#7f3c00',
					phonemes: ['z^', 'z^_g'],
					phonetics: 'ʒ',
					example: ['j, ge'],
				},
				{
					color: '#b0543f',
					phonemes: ['wa'],
					phonetics: 'wa',
					example: ['oi, oua'],
				},
				{
					color: '#bf3030',
					phonemes: ['s', 's_c', 's_t'],
					phonetics: 's',
					example: ['ss, ce'],
				},
				{
					color: '#81329a',
					phonemes: ['x~'],
					phonetics: 'œ̃',
					example: ['un, ein'],
				},
				{
					color: '#6c0277',
					phonemes: ['z', 'z_s'],
					phonetics: 'z',
					example: ['z'],
				},
			],
		},
	],
};
