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

const DARK_BG_COLOR_PROFILE = {
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

const DARK_BG_COLOR_PALETTE = {
	"colors" : [
		"#00ffcc", "#12B5AF", "#a0ffe2", "#80aaff", "#c7daff", "#ddddff",
		"#ff00bd", "#ff47c2", "#c34dd4", "#ff00ed", "#ff99ff", "#e482f4",
		"#f4acff", "#fcd0ff", "#ff0000", "#ff5353", "#ff8a8a", "#ffbcbc",
		"#b58e6b", "#cfc3b4", "#ff7900", "#f88e55", "#ffb100", "#ffd200",
		"#fee347", "#ffff66", "#16b84e", "#66ff33", "#bef574", "#ececec"
	]
};

const LIGHT_BG_COLOR_PROFILE = {
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

const LIGHT_BG_COLOR_PALETTE = {
	"colors" : [
		"#001e8e", "#454a8e", "#085ebe", "#4574bd", "#6c0277", "#754977",
		"#81329a", "#a00e77", "#ae45bd", "#c40083", "#bf3030", "#7f3c00",
		"#b0543f", "#b15b1f", "#6a5500", "#095228", "#1b6300", "#008000",
		"#333333"
	]
};

const PHONEMES: ProcessFormatRule[] = [
	{"phonemes": ["#", "verb_3p", "#_amb"],		"phonetics": "",        "example": ["lettre muette"]},
	{"phonemes": ["a"],                     	"phonetics": "a",       "example": ["patte", "pâte"]},
	{"phonemes": ["q", "q_caduc", "x", "x^"],	"phonetics": "ø, ə, œ", "example": ["je, une, oeil"]},
	{"phonemes": ["i"],                   		"phonetics": "i",       "example": ["si"]},
	{"phonemes": ["j"],                     	"phonetics": "j",       "example": ["fille"]},
	{"phonemes": ["o", "o_comp", "o_ouvert"],	"phonetics": "o",       "example": ["rose", "taureau"]},
	{"phonemes": ["u"],                     	"phonetics": "u",       "example": ["doux"]},
	{"phonemes": ["y"],                     	"phonetics": "y",       "example": ["tu"]},
	{"phonemes": ["e", "e_comp"],            	"phonetics": "e",       "example": ["blé", "et"]},
	{"phonemes": ["e^", "e^_comp"],          	"phonetics": "ɛ",       "example": ["è, ai"]},
	{"phonemes": ["a~"],                    	"phonetics": "a\u0303", "example": ["enfant"]},
	{"phonemes": ["e~"],                    	"phonetics": "ɛ̃",       "example": ["vin", "main"]},
	{"phonemes": ["x~"],                    	"phonetics": "œ̃",       "example": ["un"]},
	{"phonemes": ["o~"],                    	"phonetics": "ɔ̃",       "example": ["bon"]},
	{"phonemes": ["k", "k_qu"],             	"phonetics": "k",       "example": ["coq", "quai"]},
	{"phonemes": ["s^"],                    	"phonetics": "ʃ",       "example": ["ch", "sh"]},
	{"phonemes": ["f", "f_ph"],             	"phonetics": "f",       "example": ["feu", "phi"]},
	{"phonemes": ["g", "g_u"],              	"phonetics": "g",       "example": ["gars", "gui"]},
	{"phonemes": ["z^", "z^_g"],            	"phonetics": "ʒ",       "example": ["j'ai, geai"]},
	{"phonemes": ["wa"],                    	"phonetics": "wa",      "example": ["oie"]},
	{"phonemes": ["s", "s_c", "s_t"],       	"phonetics": "s",       "example": ["ss", "ç"]},
	{"phonemes": ["z", "z_s"],              	"phonetics": "z",       "example": ["zone"]},
	{"phonemes": ["p"],                     	"phonetics": "p",       "example": ["pont"]},
	{"phonemes": ["b"],                     	"phonetics": "b",       "example": ["bon"]},
	{"phonemes": ["t"],                     	"phonetics": "t",       "example": ["temps"]},
	{"phonemes": ["d"],                     	"phonetics": "d",       "example": ["dans"]},
	{"phonemes": ["v"],                     	"phonetics": "v",       "example": ["vent"]},
	{"phonemes": ["m"],                     	"phonetics": "m",       "example": ["mont"]},
	{"phonemes": ["n"],                     	"phonetics": "n",       "example": ["nom"]},
	{"phonemes": ["n~"],                    	"phonetics": "ɲ",       "example": ["agneau"]},
	{"phonemes": ["g~"],                    	"phonetics": "ŋ",       "example": ["camping"]},
	{"phonemes": ["l"],                     	"phonetics": "l",       "example": ["long"]},
	{"phonemes": ["r"],                     	"phonetics": "ʁ",       "example": ["rond"]}
];
