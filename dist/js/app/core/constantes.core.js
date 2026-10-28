"use strict";
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
/** Gabarit du profil fonds foncés ; les règles sont construites à partir de `PHONEMES`. */
const DARK_BG_COLOR_PROFILE = {
    name: 'Palette fonds foncés',
    params: { novice_reader: true },
    format: { line_spacing: 150, page_width: 70 },
    process: [
        {
            function: 'phonemes',
            format: [],
        },
    ],
};
const DARK_BG_COLOR_PALETTE = {
    "colors": [
        "#00ffcc", "#12B5AF", "#a0ffe2", "#80aaff", "#c7daff", "#ddddff",
        "#ff00bd", "#ff47c2", "#c34dd4", "#ff00ed", "#ff99ff", "#e482f4",
        "#f4acff", "#fcd0ff", "#ff0000", "#ff5353", "#ff8a8a", "#ffbcbc",
        "#b58e6b", "#cfc3b4", "#ff7900", "#f88e55", "#ffb100", "#ffd200",
        "#fee347", "#ffff66", "#16b84e", "#66ff33", "#bef574", "#ececec"
    ]
};
/** Gabarit du profil fonds clairs ; les règles sont construites à partir de `PHONEMES`. */
const LIGHT_BG_COLOR_PROFILE = {
    name: 'Palette fonds clairs',
    params: { novice_reader: true },
    format: { line_spacing: 150, page_width: 70 },
    process: [
        {
            function: 'phonemes',
            format: [],
        },
    ],
};
const LIGHT_BG_COLOR_PALETTE = {
    "colors": [
        "#001e8e", "#454a8e", "#085ebe", "#4574bd", "#6c0277", "#754977",
        "#81329a", "#a00e77", "#ae45bd", "#c40083", "#bf3030", "#7f3c00",
        "#b0543f", "#b15b1f", "#6a5500", "#095228", "#1b6300", "#008000",
        "#333333"
    ]
};
/**
 * Liste complète des phonèmes colorables. Ceux portant `defaultColors` sont colorés
 * par défaut dans le profil correspondant ; ils figurent en tête, dans leur ordre d'affichage.
 */
const PHONEMES = [
    {
        phonemes: ['e^', 'e^_comp'],
        phonetics: 'ɛ',
        example: ['ai, è'],
        defaultColors: {
            darkBgColor: '#16b84e',
            lightBgColor: '#095228'
        }
    },
    {
        phonemes: ['e~'],
        phonetics: 'ɛ̃',
        example: ['ain, in'],
        defaultColors: {
            darkBgColor: '#cfc3b4',
            lightBgColor: '#b15b1f'
        }
    },
    {
        phonemes: ['a~'],
        phonetics: 'ɑ̃',
        example: ['an, en'],
        defaultColors: {
            darkBgColor: '#ff00bd',
            lightBgColor: '#008000'
        }
    },
    {
        phonemes: ['o', 'o_comp', 'o_ouvert'],
        phonetics: 'o',
        example: ['o, au'],
        defaultColors: {
            darkBgColor: '#ff99ff',
            lightBgColor: '#c40083'
        }
    },
    {
        phonemes: ['k', 'k_qu'],
        phonetics: 'k',
        example: ['qu, k'],
        defaultColors: {
            darkBgColor: '#00ffcc',
            lightBgColor: '#085ebe'
        }
    },
    {
        phonemes: ['s^'],
        phonetics: 'ʃ',
        example: ['ch, sh'],
        defaultColors: {
            darkBgColor: '#ff5353',
            lightBgColor: '#1b6300'
        }
    },
    {
        phonemes: ['e', 'e_comp'],
        phonetics: 'e',
        example: ['é'],
        defaultColors: {
            darkBgColor: '#ff7900',
            lightBgColor: '#6a5500'
        }
    },
    {
        phonemes: ['g', 'g_u'],
        phonetics: 'g',
        example: ['gue'],
        defaultColors: {
            darkBgColor: '#66ff33',
            lightBgColor: '#754977'
        }
    },
    {
        phonemes: ['z^', 'z^_g'],
        phonetics: 'ʒ',
        example: ['j, ge'],
        defaultColors: {
            darkBgColor: '#ffff66',
            lightBgColor: '#7f3c00'
        }
    },
    {
        phonemes: ['wa'],
        phonetics: 'wa',
        example: ['oi, oua'],
        defaultColors: {
            darkBgColor: '#b58e6b',
            lightBgColor: '#b0543f'
        }
    },
    {
        phonemes: ['s', 's_c', 's_t'],
        phonetics: 's',
        example: ['ss, ce'],
        defaultColors: {
            darkBgColor: '#f4acff',
            lightBgColor: '#bf3030'
        }
    },
    {
        phonemes: ['x~'],
        phonetics: 'œ̃',
        example: ['un, ein'],
        defaultColors: {
            darkBgColor: '#f88e55',
            lightBgColor: '#81329a'
        }
    },
    {
        phonemes: ['z', 'z_s'],
        phonetics: 'z',
        example: ['z'],
        defaultColors: {
            darkBgColor: '#ddddff',
            lightBgColor: '#6c0277'
        }
    },
    {
        phonemes: ['#', 'verb_3p', '#_amb'],
        phonetics: '',
        example: ['lettre muette']
    },
    {
        phonemes: ['a'],
        phonetics: 'a',
        example: ['a, â']
    },
    {
        phonemes: ['q', 'q_caduc', 'x', 'x^'],
        phonetics: 'ø, ə, œ',
        example: ['e, eu, œ']
    },
    {
        phonemes: ['i'],
        phonetics: 'i',
        example: ['i, y']
    },
    {
        phonemes: ['j'],
        phonetics: 'j',
        example: ['ill, y']
    },
    {
        phonemes: ['u'],
        phonetics: 'u',
        example: ['ou']
    },
    {
        phonemes: ['y'],
        phonetics: 'y',
        example: ['u']
    },
    {
        phonemes: ['o~'],
        phonetics: 'ɔ̃',
        example: ['on, om']
    },
    {
        phonemes: ['f', 'f_ph'],
        phonetics: 'f',
        example: ['f, ph']
    },
    {
        phonemes: ['p'],
        phonetics: 'p',
        example: ['p']
    },
    {
        phonemes: ['b'],
        phonetics: 'b',
        example: ['b']
    },
    {
        phonemes: ['t'],
        phonetics: 't',
        example: ['t']
    },
    {
        phonemes: ['d'],
        phonetics: 'd',
        example: ['d']
    },
    {
        phonemes: ['v'],
        phonetics: 'v',
        example: ['v']
    },
    {
        phonemes: ['m'],
        phonetics: 'm',
        example: ['m']
    },
    {
        phonemes: ['n'],
        phonetics: 'n',
        example: ['n']
    },
    {
        phonemes: ['n~'],
        phonetics: 'ɲ',
        example: ['gn']
    },
    {
        phonemes: ['g~'],
        phonetics: 'ŋ',
        example: ['ng']
    },
    {
        phonemes: ['l'],
        phonetics: 'l',
        example: ['l']
    },
    {
        phonemes: ['r'],
        phonetics: 'ʁ',
        example: ['r']
    },
];
