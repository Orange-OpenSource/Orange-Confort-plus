// @ts-nocheck
// @todo trouver comment éviter les erreurs à la compilation causé par la différence de répertoire
// Exemple: erreur si un service utilise une constante de ce fichier
const PREFIX = 'cplus-';
const JSON_NAME = 'modeOfUse';
const DEFAULT_VALUE = 'noModifications';
const DEFAULT_MODE = 'facilePlus';
const APP_NAME = `${PREFIX}app-root`;
const VERSION = '5.2.0';

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

const BTN_RIGHT_POS_DEFAULT = '2em';
const BTN_RIGHT_POS_OPEN = '26em';

const CLICK_FACILITE_BIG_ZONE = 'bigZone';
const CLICK_FACILITE_LONG_CLICK = 'longClick';
const CLICK_FACILITE_AUTO_CLICK = 'autoClick';

const CONTAINER_BUTTONS_ID = `${PREFIX}container-buttons`;

const TEXT_COLOR_SPAN_CLASS = `${PREFIX}colored-text`;

const TEXT_ALTERNATE_LINES = `${PREFIX}alternateLines`;

const BODY_ELEMENTS_FILTER = 'script,style,link,meta';
