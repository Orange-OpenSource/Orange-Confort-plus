/*
 * orange-confort-plus - version 5.0.0-alpha.7 - 29/08/2024
 * Enhance user experience on web sites
 * © 2014 - 2024 Orange SA
 */
"use strict";

const PREFIX = "cplus-";

const JSON_NAME = "modeOfUse";

const DEFAULT_VALUE = "noModifications";

const PAGE_HOME = "home";

const PAGE_MODES = "modes";

const PAGE_SETTINGS = "settings";

const PAGE_EDIT_SETTING = "edit-setting";

const FOCUS_SIZE_BIG = "4px";

const FOCUS_SIZE_HUGE = "10px";

const CURSOR_SIZE_BIG = 56;

const CURSOR_SIZE_HUGE = 128;

const SCROLL_SIZE_BIG = "2rem";

const SCROLL_SIZE_HUGE = "3rem";

const CLICK_FACILITE_BIG_ZONE = "bigZone";

const CLICK_FACILITE_LONG_CLICK = "longClick";

const CLICK_FACILITE_AUTO_CLICK = "autoClick";

const CONTAINER_BUTTONS_ID = `${PREFIX}container-buttons`;

"use strict";

let filesServiceIsInstantiated;

class FilesService {
    path="";
    constructor() {
        if (filesServiceIsInstantiated) {
            throw new Error("FilesService is already instantiated.");
        }
        filesServiceIsInstantiated = true;
        this.path = `${window.location.origin}/`;
    }
    getJSONFile(file) {
        return fetch(`${this.path}assets/json/${file}.json`).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving ${file}.json: ${error}.`);
            return error;
        }));
    }
}

"use strict";

let i18nServiceIsInstantiated;

class I18nService {
    locale="en";
    path="";
    constructor() {
        if (i18nServiceIsInstantiated) {
            throw new Error("I18nService is already instantiated.");
        }
        i18nServiceIsInstantiated = true;
        this.path = `${window.location.origin}/`;
        if ([ "en", "fr" ].some((language => navigator.language.startsWith(language)))) {
            this.locale = navigator.language.slice(0, 2);
        }
        this.getJSON().then((result => {
            localStorage.setItem(`${PREFIX}i18n`, JSON.stringify(result));
        }));
    }
    getJSON() {
        return fetch(`${this.path}_locales/${this.locale}/messages.json`).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving 'messages.json' file : ${error}.`);
            return error;
        }));
    }
    getMessages() {
        return localStorage.getItem(`${PREFIX}i18n`);
    }
    getMessage(message, substitutions = []) {
        if (!message || message.includes("undefined")) {
            console.warn(`Part of argument for I18nService getMessage() is undefined. Message: "${message}".`);
            return;
        }
        const translations = JSON.parse(this.getMessages());
        let content = translations[message]?.message;
        if (substitutions.length > 0) {
            if (substitutions.some((str => str?.includes("undefined")))) {
                console.warn(`At least one substitution string for I18nService getMessage() is undefined. Message: "${message}". Substitutions: "${substitutions}".`);
                return;
            }
            const placeholders = translations[message]?.placeholders;
            const matches = [ ...content.matchAll(/(\$.*?\$)/g) ];
            for (const match of matches) {
                const key = match[0].replaceAll("$", "").toLowerCase();
                const index = Number(placeholders[key]?.content.replace("$", ""));
                content = content.replaceAll(match[0], substitutions[index - 1]);
            }
        }
        return content;
    }
    translate(root) {
        const elements = root.querySelectorAll("[data-i18n]");
        for (const element of elements) {
            element.innerHTML = this.getMessage(element.dataset?.i18n);
        }
        const elementsTitle = root.querySelectorAll("[data-i18n-title]");
        for (const element of elementsTitle) {
            element.title = this.getMessage(element.dataset?.i18nTitle);
        }
    }
}

"use strict";

let iconsServiceIsInstantiated;

class IconsService {
    constructor() {
        if (iconsServiceIsInstantiated) {
            throw new Error("IconsService is already instantiated.");
        }
        iconsServiceIsInstantiated = true;
    }
    get path() {
        return `${window.location.origin}/assets/icons/orange-icons-sprite.svg`;
    }
    loadSprite(root) {
        return;
    }
}

"use strict";

let localStorageServiceIsInstantiated;

class LocalStorageService {
    constructor() {
        if (localStorageServiceIsInstantiated) {
            throw new Error("LocalStorageService is already instantiated.");
        }
        localStorageServiceIsInstantiated = true;
    }
    setItem(key, value) {
        localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
        let storeEvent = new CustomEvent(`storage-${key}`, {
            bubbles: true
        });
        window.dispatchEvent(storeEvent);
    }
    getItem(key) {
        return new Promise(((resolve, reject) => {
            resolve(JSON.parse(localStorage.getItem(`${PREFIX}${key}`)));
            reject(new Error("KO"));
        }));
    }
    removeItem(key) {
        localStorage.removeItem(`${PREFIX}${key}`);
    }
}

"use strict";

let pathServiceIsInstantiated;

class PathService {
    path="";
    constructor() {
        if (pathServiceIsInstantiated) {
            throw new Error("PathService is already instantiated.");
        }
        pathServiceIsInstantiated = true;
        this.path = `${window.location.origin}/`;
    }
}

"use strict";

let categoriesServiceIsInstantiated;

class CategoriesService {
    selectedMode;
    settingAccordions=[ {
        name: "app-text",
        open: false
    }, {
        name: "app-layout",
        open: false
    }, {
        name: "app-picture-video",
        open: false
    }, {
        name: "app-sound",
        open: false
    }, {
        name: "app-navigation",
        open: false
    } ];
    constructor() {
        if (categoriesServiceIsInstantiated) {
            throw new Error("CategoriesService is already instantiated.");
        }
        categoriesServiceIsInstantiated = true;
    }
    openCategory=(category, open) => {
        const mainIndex = this.settingAccordions.findIndex((o => o.name === category.toLowerCase()));
        this.settingAccordions.forEach(((accordion, index) => {
            accordion.open = index === mainIndex ? !accordion.open : false;
        }));
    };
    openMainCategory=selectedMode => {
        let mainAccordion;
        if (this.selectedMode !== selectedMode) {
            this.selectedMode = selectedMode;
            switch (selectedMode) {
              case "visionPlus":
                mainAccordion = "app-layout";
                break;

              case "facilePlus":
              default:
                mainAccordion = "app-text";
                break;
            }
            this.settingAccordions.forEach(((accordion, index) => {
                accordion.open = accordion.name === mainAccordion ? true : false;
            }));
        }
    };
}

"use strict";

let domServiceIsInstantiated;

class DomService {
    constructor() {
        if (domServiceIsInstantiated) {
            throw new Error("DomService is already instantiated.");
        }
        domServiceIsInstantiated = true;
    }
    getFocusableElements=() => {
        const not = {
            inert: "[inert],[inert] *",
            negTabIndex: '[tabindex^="-"]',
            disabled: ":disabled"
        };
        const focusableElt = [ `a[href]:not(${not.inert},${not.negTabIndex}`, `area[href]:not(${not.inert},${not.negTabIndex}`, `input:not([type="hidden"],[type="radio"],${not.inert},${not.negTabIndex},${not.disabled}`, `input[type="radio"]:not(${not.inert},${not.negTabIndex},${not.disabled}`, `select:not(${not.inert},${not.negTabIndex},${not.disabled}`, `textarea:not(${not.inert},${not.negTabIndex},${not.disabled}`, `button:not(${not.inert},${not.negTabIndex},${not.disabled}`, `details:not(${not.inert} > summary:first-of-type,${not.negTabIndex}`, `iframe:not(${not.inert},${not.negTabIndex}`, `audio[controls]:not(${not.inert},${not.negTabIndex}`, `video[controls]:not(${not.inert},${not.negTabIndex}`, `[contenteditable]:not(${not.inert},${not.negTabIndex}`, `[tabindex]:not(${not.inert},${not.negTabIndex}` ];
        return Array.from(document.querySelectorAll(focusableElt.join(","))).filter((el => !el.disabled && el.tabIndex >= 0));
    };
    addButtonsInDom=button => {
        let container;
        let fragment = document.createDocumentFragment();
        if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)) {
            container = document.querySelector(`#${CONTAINER_BUTTONS_ID}`);
        } else {
            container = document.createElement("div");
            container.setAttribute("id", CONTAINER_BUTTONS_ID);
            let styleContainerButtons = `\n\t\t\t\t#${CONTAINER_BUTTONS_ID} {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tgap: 1rem;\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\tbottom: 1rem;\n\t\t\t\t\tright: 1rem;\n\t\t\t\t\tz-index: calc(infinity);\n\t\t\t\t}\n\n\t\t\t\t#${CONTAINER_BUTTONS_ID} button {\n\t\t\t\t\tbackground: #f16e00;\n\t\t\t\t\tcolor: #000;\n\t\t\t\t\tborder: none;\n\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\tpadding: 1rem 2rem;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("container-buttons", styleContainerButtons);
        }
        let btn = document.createElement("button");
        btn.setAttribute("id", `${CONTAINER_BUTTONS_ID}__${button}`);
        btn.type = "button";
        btn.tabIndex = -1;
        btn.innerText = i18nServiceInstance.getMessage(button);
        container.appendChild(btn);
        fragment.appendChild(container);
        document.body.appendChild(fragment);
    };
    removeButtonsInDom=button => {
        document.querySelector(`#${CONTAINER_BUTTONS_ID}__${button}`)?.remove();
        if (document.querySelector(`#${CONTAINER_BUTTONS_ID}`)?.children.length === 0) {
            document.querySelector(`#${CONTAINER_BUTTONS_ID}`)?.remove();
            stylesServiceInstance.removeStyle("container-buttons");
        }
    };
}

"use strict";

let modeOfUseServiceIsInstantiated;

class ModeOfUseService {
    constructor() {
        if (modeOfUseServiceIsInstantiated) {
            throw new Error("ModeOfUseService is already instantiated.");
        }
        modeOfUseServiceIsInstantiated = true;
    }
    setSelectedMode=newSelectedMode => {
        localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            if (json.selectedMode === newSelectedMode) {
                filesServiceInstance.getJSONFile("modes-of-use").then((result => {
                    const defaultJson = result;
                    let resetMode;
                    defaultJson.modes.forEach((mode => {
                        if (Object.keys(mode)[0] === json.selectedMode) {
                            resetMode = mode;
                        }
                    }));
                    json.modes.forEach(((mode, index) => {
                        if (Object.keys(mode)[0] === json.selectedMode) {
                            json.modes[index] = resetMode;
                        }
                    }));
                    json.selectedMode = newSelectedMode;
                    localStorageServiceInstance.setItem(JSON_NAME, json);
                }));
            } else {
                json.selectedMode = newSelectedMode;
                localStorageServiceInstance.setItem(JSON_NAME, json);
            }
        }));
    };
    getSelectedMode(json) {
        let selectedMode;
        json.modes.forEach((mode => {
            if (Object.entries(mode)[0][0] === json.selectedMode) {
                selectedMode = mode;
            }
        }));
        return JSON.stringify(selectedMode);
    }
    setSettingValue=(settingName, newIndex, removeCustom = false) => {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)));
                    let settingValues = Object.entries(setting)[0][1];
                    let values = settingValues.values.split(",");
                    let indexSetting = modeSettings.indexOf(setting);
                    modeSettings.splice(indexSetting, 1);
                    if (removeCustom && values[3]) {
                        values.pop();
                        settingValues.values = values.toString();
                    }
                    settingValues.valueSelected = newIndex;
                    modeSettings.push(setting);
                    localStorageServiceInstance.setItem(JSON_NAME, json);
                    jsonIsEdited = true;
                }
            }));
            return jsonIsEdited;
        })).catch((error => {
            console.error("Your setting could not be saved.");
            return jsonIsEdited;
        }));
    };
    getSetting(settingName) {
        let setting;
        return localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    setting = Object.entries(modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName))))[0][1];
                }
            }));
            return setting;
        })).catch((error => {
            console.error("Values of this setting could not be return.");
            return setting;
        }));
    }
    addSettingCustomValue=(settingName, newIndex, newValue) => {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = Object.entries(modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName))))[0][1];
                    let values = setting.values.split(",");
                    if (setting) {
                        values[3] = newValue;
                        setting.valueSelected = newIndex;
                        setting.values = values.toString();
                        localStorageServiceInstance.setItem(JSON_NAME, json);
                        jsonIsEdited = true;
                    }
                }
            }));
            return jsonIsEdited;
        })).catch((error => {
            console.error("The custom value of this setting could not be saved.");
            return jsonIsEdited;
        }));
    };
}

"use strict";

let pauseServiceIsInstantiated;

class PauseService {
    settingsServices=[];
    constructor() {
        if (pauseServiceIsInstantiated) {
            throw new Error("PauseService is already instantiated.");
        }
        pauseServiceIsInstantiated = true;
        this.settingsServices = [ {
            name: "capitalLetters",
            instanceService: capitalLettersServiceInstance.setCapitalLetters.bind(this),
            value: ""
        }, {
            name: "clearlyLinks",
            instanceService: clearlyLinksServiceInstance.setClearlyLinks.bind(this),
            value: ""
        }, {
            name: "clickFacilite",
            instanceService: clickFaciliteServiceInstance.setClickFacilite.bind(this),
            value: ""
        }, {
            name: "colorContrast",
            instanceService: colorContrastServiceInstance.setColorsContrasts.bind(this),
            value: ""
        }, {
            name: "colourTheme",
            instanceService: colourThemeServiceInstance.setColourTheme.bind(this),
            value: ""
        }, {
            name: "cursorAspect",
            instanceService: cursorAspectServiceInstance.setCursor.bind(this),
            value: ""
        }, {
            name: "deleteBackgroundImages",
            instanceService: deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this),
            value: ""
        }, {
            name: "focusAspect",
            instanceService: focusAspectServiceInstance.setFocus.bind(this),
            value: ""
        }, {
            name: "fontFamily",
            instanceService: fontFamilyServiceInstance.setFontFamily.bind(this),
            value: ""
        }, {
            name: "linkStyle",
            instanceService: linkStyleServiceInstance.setLinkStyle.bind(this),
            value: ""
        }, {
            name: "magnifier",
            instanceService: magnifierServiceInstance.setMagnifier.bind(this),
            value: ""
        }, {
            name: "marginAlign",
            instanceService: marginAlignServiceInstance.setMargin.bind(this),
            value: ""
        }, {
            name: "navigationAuto",
            instanceService: navigationAutoServiceInstance.setNavigationAuto.bind(this),
            value: ""
        }, {
            name: "navigationButtons",
            instanceService: navigationButtonsServiceInstance.setNavigationButtons.bind(this),
            value: ""
        }, {
            name: "readAloud",
            instanceService: readAloudServiceInstance.setReadAloud.bind(this),
            value: ""
        }, {
            name: "readingGuide",
            instanceService: readingGuideServiceInstance.setReadingMaskGuide.bind(this),
            value: ""
        }, {
            name: "scroll",
            instanceService: scrollServiceInstance.setScroll.bind(this),
            value: ""
        }, {
            name: "skipToContent",
            instanceService: skipToContentServiceInstance.setSkipToContent.bind(this),
            value: ""
        }, {
            name: "stopAnimations",
            instanceService: stopAnimationsServiceInstance.setStopAnimations.bind(this),
            value: ""
        }, {
            name: "textSize",
            instanceService: textSizeServiceInstance.setFontSize.bind(this),
            value: ""
        }, {
            name: "textSpacing",
            instanceService: textSpacingServiceInstance.setSpacingText.bind(this),
            value: ""
        } ];
    }
    pauseSettings=currentSettings => {
        const settings = JSON.parse(currentSettings);
        settings.forEach((setting => {
            let settingValues = Object.values(setting)[0];
            this.settingsServices.forEach((settingsService => {
                if (settingsService.name === Object.keys(setting)[0]) {
                    settingsService.value = this.getSelectedValue(settingValues);
                }
                settingsService.instanceService(DEFAULT_VALUE);
            }));
        }));
    };
    getSelectedValue=setting => setting.values.split(",")[setting.valueSelected];
    playSettings=() => {
        this.settingsServices.forEach((settingsService => {
            settingsService.instanceService(settingsService.value);
        }));
    };
}

"use strict";

let routeServiceIsInstantiated;

class RouteService {
    currentRoute;
    historyRoute=[];
    toolbar=null;
    routes=[ PAGE_HOME, PAGE_MODES, PAGE_SETTINGS, PAGE_EDIT_SETTING ];
    constructor() {
        if (routeServiceIsInstantiated) {
            throw new Error("RouteService is already instantiated.");
        }
        routeServiceIsInstantiated = true;
    }
    initPages=(root, shouldLoad = false) => {
        this.toolbar = root;
        return localStorageServiceInstance.getItem("current-route").then((result => {
            if (this.routes.some((route => result === route))) {
                this.navigate(result, shouldLoad);
                return result;
            } else {
                this.navigate(PAGE_HOME);
                return PAGE_HOME;
            }
        }));
    };
    navigate=(newRoute, shouldLoad = false) => {
        if (shouldLoad) {
            this.loadRoute(newRoute);
            this.setCurrentRoute(newRoute);
        } else if (newRoute !== this.currentRoute) {
            this.routes.forEach((route => {
                if (route === newRoute) {
                    this.loadRoute(route);
                } else if (route === this.currentRoute) {
                    this.toolbar.querySelector(`app-${route}`)?.remove();
                }
            }));
            this.setCurrentRoute(newRoute);
        }
    };
    setHistoryAndHeader=newRoute => {
        const header = this.toolbar.querySelector("#header");
        switch (newRoute) {
          case PAGE_HOME:
            {
                routeServiceInstance.historyRoute = [];
                header?.setAttribute("data-display", "primary");
                header?.setAttribute("data-page-title", "");
                break;
            }

          case PAGE_SETTINGS:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleSettings");
                header?.setAttribute("data-page-icon", "Settings");
                break;
            }

          case PAGE_EDIT_SETTING:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME, PAGE_SETTINGS ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleEditSetting");
                header?.setAttribute("data-page-icon", "Settings");
                break;
            }

          case PAGE_MODES:
            {
                routeServiceInstance.historyRoute = [ PAGE_HOME ];
                header?.setAttribute("data-display", "secondary");
                header?.setAttribute("data-page-title", "pageTitleModes");
                header?.setAttribute("data-page-icon", "");
                break;
            }
        }
    };
    loadRoute=route => {
        const element = `<app-${route}></app-${route}>`;
        this.toolbar.insertAdjacentHTML("beforeend", element);
        const page = this.toolbar.querySelector(`app-${route}`);
        i18nServiceInstance.translate(page);
    };
    setCurrentRoute=route => {
        this.setHistoryAndHeader(route);
        this.currentRoute = route;
        localStorageServiceInstance.setItem("current-route", route);
    };
}

"use strict";

let capitalLettersServiceIsInstantiated;

class CapitalLettersService {
    constructor() {
        if (capitalLettersServiceIsInstantiated) {
            throw new Error("CapitalLettersService is already instantiated.");
        }
        capitalLettersServiceIsInstantiated = true;
    }
    setCapitalLetters=value => {
        let styleCapitalLetters = "";
        switch (value) {
          case "uppercase":
            styleCapitalLetters = `\n\t\t\t\t*, *::before, *::after {\n\t\t\t\t\ttext-transform: uppercase !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("capital-letters", styleCapitalLetters);
            break;

          case "capitalize":
            styleCapitalLetters = `\n\t\t\t\t*, *::before, *::after {\n\t\t\t\t\ttext-transform: capitalize !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("capital-letters", styleCapitalLetters);
            break;

          default:
            stylesServiceInstance.removeStyle("capital-letters");
            break;
        }
    };
}

"use strict";

let clearlyLinksServiceIsInstantiated;

class ClearlyLinksService {
    constructor() {
        if (clearlyLinksServiceIsInstantiated) {
            throw new Error("ClearlyLinksService is already instantiated.");
        }
        clearlyLinksServiceIsInstantiated = true;
    }
    setClearlyLinks=value => {
        let styleClearlyLinks = "";
        switch (value) {
          case "bold_underline":
            styleClearlyLinks = `\n\t\t\t\t\ta:any-link {\n\t\t\t\t\t\tfont-weight: bold !important;\n\t\t\t\t\t\ttext-decoration: underline !important;\n\t\t\t\t\t}`;
            stylesServiceInstance.setStyle("clearly-links", styleClearlyLinks);
            this.resetInverseBorder();
            break;

          case "bold_boxed":
            styleClearlyLinks = `\n\t\t\t\t\ta:any-link {\n\t\t\t\t\t\tfont-weight: bold !important;\n\t\t\t\t\t\tborder: 2px solid black !important;\n\t\t\t\t\t}`;
            stylesServiceInstance.setStyle("clearly-links", styleClearlyLinks);
            this.applyInverseBorder();
            break;

          default:
            stylesServiceInstance.removeStyle("clearly-links");
            this.resetInverseBorder();
            break;
        }
    };
    applyInverseBorder=() => {
        const elements = document.querySelectorAll("a");
        elements.forEach((element => {
            const bgColor = this.getEffectiveBackgroundColor(element);
            const rgb = bgColor.match(/\d+/g);
            if (rgb) {
                const hex = rgb.map((x => ("0" + parseInt(x).toString(16)).slice(-2))).join("");
                const invertedColor = this.invertedColor(hex);
                element.style.setProperty("border-color", invertedColor, "important");
            }
        }));
    };
    getEffectiveBackgroundColor=element => {
        let currentElement = element;
        while (currentElement) {
            const bgColor = window.getComputedStyle(currentElement).backgroundColor;
            const rgba = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*(\d*\.?\d+)?\)/);
            if (rgba) {
                const alpha = rgba[4] ? parseFloat(rgba[4]) : 1;
                if (alpha !== 0) {
                    return bgColor;
                }
            }
            currentElement = currentElement.parentElement;
        }
        return "rgb(255, 255, 255)";
    };
    invertedColor=hex => {
        hex = hex.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const invertedR = 255 - r;
        const invertedG = 255 - g;
        const invertedB = 255 - b;
        const invertedHex = ((1 << 24) + (invertedR << 16) + (invertedG << 8) + invertedB).toString(16).slice(1).toUpperCase();
        return `#${invertedHex}`;
    };
    resetInverseBorder=() => {
        const elements = document.querySelectorAll("a");
        elements.forEach((element => {
            element.style.removeProperty("borderColor");
        }));
    };
}

"use strict";

let clickFaciliteServiceIsInstantiated;

class ClickFaciliteService {
    selectedElt;
    delay;
    isClicking=false;
    clickableElements=[ "A", "INPUT", "SELECT", "OPTION", "TEXTAREA", "LABEL", "BUTTON" ];
    timer=null;
    handlerClickFacilite;
    constructor() {
        if (clickFaciliteServiceIsInstantiated) {
            throw new Error("ClickFaciliteService is already instantiated.");
        }
        clickFaciliteServiceIsInstantiated = true;
        this.handlerClickFacilite = this.createHandlerClickFacilite();
    }
    setClickFacilite=value => {
        let paramName = value.split("_")[0];
        this.delay = parseInt(value.split("_")[1]?.replace(/\D/g, ""), 10) * 1e3;
        switch (paramName) {
          case CLICK_FACILITE_BIG_ZONE:
            {
                this.resetEventClick();
                scrollServiceInstance.setScroll("bigScroll");
                scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
                break;
            }

          case CLICK_FACILITE_LONG_CLICK:
            {
                this.resetEventClick();
                scrollServiceInstance.setScroll("bigScroll");
                scrollTypeServiceInstance.setScrollType("scrollOnClick");
                this.longClick();
                break;
            }

          case CLICK_FACILITE_AUTO_CLICK:
            {
                this.resetEventClick();
                scrollServiceInstance.setScroll("bigScroll");
                scrollTypeServiceInstance.setScrollType("scrollOnMouseover");
                this.autoClick();
                break;
            }

          default:
            {
                scrollServiceInstance.setScroll(DEFAULT_VALUE);
                scrollTypeServiceInstance.setScrollType(DEFAULT_VALUE);
                this.resetEventClick();
                break;
            }
        }
    };
    getClickableElt=event => {
        let pointedElt = event.target;
        let closestPointedElt = pointedElt.closest(this.clickableElements.join(","));
        return this.clickableElements.includes(pointedElt.nodeName) ? pointedElt : closestPointedElt ? closestPointedElt : pointedElt;
    };
    longClick=() => {
        document.addEventListener("click", this.handlerClickFacilite);
        document.addEventListener("mousedown", this.handlerClickFacilite);
        document.addEventListener("mouseup", this.handlerClickFacilite);
    };
    autoClick=() => {
        document.addEventListener("mouseover", this.handlerClickFacilite);
        document.addEventListener("mouseout", this.handlerClickFacilite);
    };
    resetEventClick=() => {
        document.removeEventListener("click", this.handlerClickFacilite);
        document.removeEventListener("mouseover", this.handlerClickFacilite);
        document.removeEventListener("mouseout", this.handlerClickFacilite);
        document.removeEventListener("mousedown", this.handlerClickFacilite);
        document.removeEventListener("mouseup", this.handlerClickFacilite);
    };
    doClick=elt => {
        if (this.clickableElements.includes(elt.nodeName)) {
            switch (elt.nodeName) {
              case "A":
              case "AREA":
                this.clickLink(elt);
                break;

              case "INPUT":
                this.clickInput(elt);
                break;

              case "SELECT":
              case "TEXTAREA":
                elt.focus();
                break;

              case "OPTION":
                this.selectOption(elt);
                break;

              case "LABEL":
                document.getElementById(elt.htmlFor).click();
                break;

              default:
                elt.click();
                break;
            }
        } else if (elt.onclick && elt.onclick !== null) {
            elt.onclick();
        } else {
            elt.click();
        }
    };
    clickLink=elt => {
        if (elt.href && elt.href !== "") {
            window.location = elt.href;
        }
    };
    clickInput=elt => {
        elt.focus();
        switch (elt.type) {
          case "radio":
            elt.checked = true;
            break;

          case "checkbox":
            elt.checked = !elt.checked;
            break;
        }
    };
    selectOption=elt => {
        let options = elt.closest("SELECT")?.options;
        for (var i = 0; i < options.length; i++) {
            if (options[i].text === elt.text) {
                options[i].selected = true;
                elt.focus();
            } else {
                options[i].selected = false;
            }
        }
    };
    createHandlerClickFacilite=() => event => {
        switch (event.type) {
          case "click":
            event.preventDefault();
            break;

          case "mousedown":
          case "mouseover":
            this.setTimeoutClick(event);
            break;

          case "mouseup":
          case "mouseout":
            this.clearTimeout();
            break;
        }
    };
    setTimeoutClick=event => {
        this.timer = setTimeout((() => {
            this.doClick(this.getClickableElt(event));
        }), this.delay);
    };
    clearTimeout=() => {
        if (this.timer !== null) {
            clearTimeout(this.timer);
        }
    };
}

"use strict";

let colorContrastServiceIsInstantiated;

class ColorContrastService {
    colorContrastDictionnary=[ {
        name: "reinforcedContrasts",
        cursor: "big_black",
        focus: "big_black",
        scroll: "big_black",
        link: "darkblue_orange_brown"
    }, {
        name: "white_black",
        cursor: "big_ivory",
        focus: "big_ivory",
        scroll: "big_ivory",
        link: "lightblue_orange_lightgreen"
    }, {
        name: "black_ivory",
        cursor: "big_black",
        focus: "big_black",
        scroll: "big_black",
        link: "darkblue_orange_brown"
    }, {
        name: "white_red",
        cursor: "big_white",
        focus: "big_white",
        scroll: "big_white",
        link: "yellow_darkblue_lightgreen"
    }, {
        name: "black_yellow",
        cursor: "big_black",
        focus: "big_black",
        scroll: "big_black",
        link: "darkblue_purple_darkgreen"
    }, {
        name: "white_blue",
        cursor: "big_white",
        focus: "big_white",
        scroll: "big_white",
        link: "yellow_orange_lightgreen"
    }, {
        name: "yellow_blue",
        cursor: "big_yellow",
        focus: "big_yellow",
        scroll: "big_yellow",
        link: "white_darkgreen_lightgreen"
    }, {
        name: "black_green",
        cursor: "big_black",
        focus: "big_black",
        scroll: "big_black",
        link: "yellow_orange_blue"
    } ];
    matrixFilter=`\n\t\t0.8,   0.2,   0,     0, 0\n    0.258, 0.742, 0,     0, 0\n    0,     0.142, 0.858, 0, 0\n    0,     0,     0,     1, 0`;
    svgFilterDaltonism=`<svg xmlns="http://www.w3.org/2000/svg"><filter id="daltonism"><feColorMatrix in="SourceGraphic" type="matrix" values="${this.matrixFilter.replace(/\s+/g, " ").trim()}"/></filter></svg>`;
    styleFilterDaltonism=`\n\t\thtml body > *:not(app-root) {\n\t\t\tfilter: url('data:image/svg+xml;utf8,${this.svgFilterDaltonism}#daltonism');\n\t\t}\n\t`;
    constructor() {
        if (colorContrastServiceIsInstantiated) {
            throw new Error("ColorContrastService is already instantiated.");
        }
        colorContrastServiceIsInstantiated = true;
    }
    setColorsContrasts=value => {
        stylesServiceInstance.removeStyle("color-contrast");
        stylesServiceInstance.removeStyle("filter-daltonism");
        colourThemeServiceInstance.setColourTheme(DEFAULT_VALUE);
        switch (value) {
          case DEFAULT_VALUE:
            break;

          case "daltonism":
            stylesServiceInstance.setStyle("filter-daltonism", this.styleFilterDaltonism);
            break;

          case "reinforcedContrasts":
          default:
            let color;
            let backgroundColor;
            if (value === "reinforcedContrasts") {
                color = "#000";
                backgroundColor = "#fff";
            } else {
                color = value?.split("_")[0];
                backgroundColor = value?.split("_")[1];
                const colorParams = this.colorContrastDictionnary.find((o => o.name === value));
                colourThemeServiceInstance.setServices(colorParams);
            }
            this.setColorContrastStyle(color, backgroundColor);
            break;
        }
    };
    setColorContrastStyle=(color, backgroundColor) => {
        let styleColorContrast = `\n\t\t* {\n\t\t\tcolor: ${color} !important;\n\t\t\tbackground-color: ${backgroundColor} !important;\n\t\t}\n\n\t\tli a {\n\t\t\tcolor: ${color} !important;\n\t\t}\n\n\t\tfieldset,\n\t\tbutton {\n\t\t\tborder-color: ${color} !important;\n\t\t}\n\n\t\tinput, td, th {\n\t\t\tborder: 2px solid ${color} !important;\n\t\t}\n\n\t\ttd, th {\n\t\t\tpadding: .2em !important;\n\t\t}\n\n\t\ttable {\n\t\t\tborder-collapse: collapse !important;\n\t\t}\n\t`;
        stylesServiceInstance.setStyle("color-contrast", styleColorContrast);
    };
}

"use strict";

let colourThemeServiceIsInstantiated;

class ColourThemeService {
    colourThemeDictionnary=[ {
        name: DEFAULT_VALUE,
        cursor: DEFAULT_VALUE,
        focus: DEFAULT_VALUE,
        scroll: DEFAULT_VALUE,
        link: DEFAULT_VALUE
    }, {
        name: "reinforcedContrasts",
        cursor: "big_black",
        focus: "big_black",
        scroll: "big_black",
        link: "darkblue_orange_darkgreen"
    }, {
        name: "white_black",
        cursor: "big_white",
        focus: "big_white",
        scroll: "big_white",
        link: "yellow_orange_lightgreen"
    } ];
    constructor() {
        if (colourThemeServiceIsInstantiated) {
            throw new Error("ColourThemeService is already instantiated.");
        }
        colourThemeServiceIsInstantiated = true;
    }
    setColourTheme=value => {
        const colourThemeValues = this.colourThemeDictionnary.find((o => o.name === value));
        this.setServices(colourThemeValues);
    };
    setServices=colourThemeValues => {
        cursorAspectServiceInstance.setCursor(colourThemeValues?.cursor);
        focusAspectServiceInstance.setFocus(colourThemeValues?.focus);
        scrollServiceInstance.setScroll(colourThemeValues?.scroll);
        linkStyleServiceInstance.setLinkStyle(colourThemeValues?.link);
    };
}

"use strict";

let cursorAspectServiceIsInstantiated;

class CursorAspectService {
    colorCursorValues=[ {
        fill: "white",
        stroke: "black"
    }, {
        fill: "ivory",
        stroke: "black"
    }, {
        fill: "blue",
        stroke: "white"
    }, {
        fill: "red",
        stroke: "black"
    }, {
        fill: "yellow",
        stroke: "black"
    }, {
        fill: "green",
        stroke: "white"
    }, {
        fill: "black",
        stroke: "white"
    } ];
    constructor() {
        if (cursorAspectServiceIsInstantiated) {
            throw new Error("CursorAspectService is already instantiated.");
        }
        cursorAspectServiceIsInstantiated = true;
    }
    drawCursor=(type, size, color, strokeWidth) => {
        let stroke = this.colorCursorValues.find((o => o.fill === color))?.stroke;
        let path = "";
        switch (type) {
          case "pointer":
            path = "M43.074 4C52.2 4 52.2 13.064 52.2 13.064v52.368-21.653s1.014-9.063 10.14-9.063c9.127 0 10.141 8.56 10.141 8.56v23.666-15.106s2.535-8.056 9.633-8.056c7.099 0 9.126 8.056 9.126 8.056v19.638-9.064s2.029-8.56 10.141-8.56S110 62.41 110 62.41V99.17c-1.014 9.567-11.661 19.806-21.802 23.162-6.084 2.015-31.434 2.015-39.547 1.008-8.112-1.008-19.342-9.463-24.843-20.142C13.967 84.095 6.779 70.803 4.54 64.425c-2.12-6.043 2.535-10.575 4.563-11.582 2.028-1.007 7.099-2.743 13.69 4.028 5.152 5.293 10.647 17.12 10.647 17.12V13.065S33.948 4 43.074 4Z";
            break;

          case "text":
            path = "M14.857 69.158h7.857v39.053c0 4.053-3.442 7.473-7.857 7.473H8.286c-2.844 0-5.286 2.235-5.286 5.158C3 123.765 5.442 126 8.286 126h6.571c5.134 0 9.793-2.029 13.143-5.319 3.35 3.29 8.009 5.319 13.143 5.319h6.571c2.844 0 5.286-2.235 5.286-5.158 0-2.923-2.442-5.158-5.286-5.158h-6.571c-4.415 0-7.857-3.42-7.857-7.473V69.158h7.857c2.843 0 5.286-2.235 5.286-5.158 0-2.923-2.443-5.158-5.286-5.158h-7.857V19.79c0-4.054 3.442-7.474 7.857-7.474h6.571c2.844 0 5.286-2.235 5.286-5.158C53 4.235 50.558 2 47.714 2h-6.571C36.009 2 31.35 4.03 28 7.319 24.65 4.029 19.991 2 14.857 2H8.286C5.442 2 3 4.235 3 7.158c0 2.923 2.442 5.158 5.286 5.158h6.571c4.415 0 7.857 3.42 7.857 7.473v39.053h-7.857c-2.843 0-5.286 2.235-5.286 5.158 0 2.923 2.443 5.158 5.286 5.158Z";
            break;

          case "default":
          default:
            path = "M5 6.2a1 1 0 0 1 1.7-.8l76.5 66a1 1 0 0 1-.6 1.8l-32.1 2.5a1 1 0 0 0-.8 1.4l17.8 36.8a1 1 0 0 1-.5 1.3l-17 7.4c-.5.2-1 0-1.3-.5l-17-36.8a1 1 0 0 0-1.6-.4L6.6 103.5a1 1 0 0 1-1.6-.7V6.2Z";
            break;
        }
        return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="${color}" d="${path}" stroke="${stroke}" stroke-width="${strokeWidth}"/></svg>`;
    };
    setCursor=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("cursor-aspect");
        } else if (value) {
            let color = value.split("_")[1];
            let size = value.split("_")[0] === "bigCursor" ? CURSOR_SIZE_BIG : CURSOR_SIZE_HUGE;
            let styleCursor = `\n\t\t\t\t* {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("default", size, color, 6)}') 0 0, default !important;\n\t\t\t\t}\n\n\t\t\t\ta:link,\n\t\t\t\ta:visited,\n\t\t\t\tbutton {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("pointer", size, color, 6)}') ${size / 3} 0, pointer !important;\n\t\t\t\t}\n\n\t\t\t\th1, h2, h3, h4, h5, h6,\n\t\t\t\tp, ul, ol, dl, blockquote,\n\t\t\t\tpre, td, th,\n\t\t\t\tinput, textarea, legend {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("text", size, color, 4)}') ${size / 4} ${size / 4}, text !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("cursor-aspect", styleCursor);
        }
    };
}

"use strict";

let deleteBackgroundImagesServiceIsInstantiated;

class DeleteBackgroundImagesService {
    listImgElements;
    classDeleteForegroundImg=`${PREFIX}delete-foreground-img`;
    classSpanImage=`${PREFIX}delete-background-images__span`;
    styleDeleteBackgroundImages=`\n\t\t*, *::before, *::after {\n\t\t\tbackground-image: none !important;\n\t\t}\n\t`;
    styleDeleteTransparencyEffects=`\n\t\t*, *::before, *::after {\n\t\t\topacity: 1 !important;\n\t\t\tfilter: none !important\n\t\t}\n\t`;
    styleDeleteForegroundImages=`\n\t\t.${this.classSpanImage} {\n\t\t\tfont-size: 1rem;\n\t\t}\n\n\t\t.${this.classDeleteForegroundImg} {\n\t\t\tvisibility: hidden !important;\n\t\t}\n\t`;
    constructor() {
        if (deleteBackgroundImagesServiceIsInstantiated) {
            throw new Error("DeleteBackgroundImagesService is already instantiated.");
        }
        deleteBackgroundImagesServiceIsInstantiated = true;
    }
    setDeleteBackgroundImages=value => {
        this.resetStyleDeleteBackground();
        if (value !== DEFAULT_VALUE) {
            this.setStyleDeleteBackground(value);
        }
    };
    setStyleDeleteBackground=value => {
        let styleToDelete = "";
        if (value.includes("background")) {
            styleToDelete += this.styleDeleteBackgroundImages;
        } else if (value.includes("foreground")) {
            styleToDelete += this.styleDeleteForegroundImages;
            let listeImg = document.querySelectorAll("img, svg, canvas, area");
            listeImg.forEach((element => {
                element.classList.add(this.classDeleteForegroundImg);
                let imageAlt = this.getAccessibleLabel(element);
                if (imageAlt !== "") {
                    let spanImage = document.createElement("span");
                    spanImage.classList.add(this.classSpanImage);
                    spanImage.textContent = `${i18nServiceInstance.getMessage("textContentImageHidden")} ${imageAlt}`;
                    element.parentNode.insertBefore(spanImage, element);
                }
            }));
        } else if (value.includes("transparent")) {
            styleToDelete += this.styleDeleteTransparencyEffects;
        }
        stylesServiceInstance.setStyle("delete-background-images", styleToDelete);
    };
    getAccessibleLabel=element => {
        if (element.alt || element.ariaLabel || document.querySelector(`#${element.getAttribute("aria-labelledby")}`)?.textContent) {
            return element.alt || element.ariaLabel || document.querySelector(`#${element.getAttribute("aria-labelledby")}`)?.textContent;
        } else {
            let a11yLabel = [];
            if (element.querySelector("title")) {
                a11yLabel.push(element.querySelector("title").textContent);
            } else if (element.querySelector("desc")) {
                a11yLabel.push(element.querySelector("desc").textContent);
            } else if (element.querySelector("text")) {
                a11yLabel.push(element.querySelector("text").textContent);
            }
            return a11yLabel.join(" ");
        }
    };
    resetStyleDeleteBackground=() => {
        stylesServiceInstance.removeStyle("delete-background-images");
        document.querySelectorAll(`.${this.classSpanImage}`).forEach((element => {
            element.remove();
        }));
        document.querySelectorAll(`.${this.classDeleteForegroundImg}`).forEach((element => {
            element.classList.remove(this.classDeleteForegroundImg);
        }));
    };
}

"use strict";

let focusAspectServiceIsInstantiated;

class FocusAspectService {
    constructor() {
        if (focusAspectServiceIsInstantiated) {
            throw new Error("FocusAspectService is already instantiated.");
        }
        focusAspectServiceIsInstantiated = true;
    }
    setFocus=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("focus-aspect");
        } else if (value) {
            const [size, color] = value.split("_");
            const styleFocusSize = size !== DEFAULT_VALUE ? `outline-width: ${size === "big" ? FOCUS_SIZE_BIG : FOCUS_SIZE_HUGE} !important;` : "";
            const styleFocusColor = color !== DEFAULT_VALUE ? `outline-color: ${color} !important;` : "";
            let styleFocus = `\n\t\t\t\t*:focus, *:focus-visible {\n\t\t\t\t\toutline-style: solid !important;\n\t\t\t\t\t${styleFocusSize}\n\t\t\t\t\t${styleFocusColor}\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("focus-aspect", styleFocus);
        }
    };
}

"use strict";

let fontFamilyServiceIsInstantiated;

class FontFamilyService {
    fontDictionnary=[ {
        name: "AccessibleDfA",
        size: "91.125%",
        folder: "accessibleDfA",
        files: [ {
            name: "AccessibleDfA-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "AccessibleDfA-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "AccessibleDfA-Regular.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "B612Mono",
        size: "75%",
        folder: "B612",
        files: [ {
            name: "B612Mono-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "B612Mono-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "B612Mono-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "B612Mono-Regular.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "Airbus",
        size: "100%",
        folder: "airbus",
        files: [ {
            name: "Airbus-Special.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "ComicSansMS",
        size: "100%",
        folder: "comic",
        files: [ {
            name: "comic-Sans-MS.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "LexandDeca",
        size: "92%",
        folder: "lexendDeca",
        files: [ {
            name: "LexendDeca-Black.woff2",
            style: "normal",
            weight: "900"
        }, {
            name: "LexendDeca-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "LexendDeca-ExtraBold.woff2",
            style: "normal",
            weight: "800"
        }, {
            name: "LexendDeca-ExtraLight.woff2",
            style: "normal",
            weight: "200"
        }, {
            name: "LexendDeca-Light.woff2",
            style: "normal",
            weight: "300"
        }, {
            name: "LexendDeca-Medium.woff2",
            style: "normal",
            weight: "500"
        }, {
            name: "LexendDeca-Regular.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "LexendDeca-SemiBold.woff2",
            style: "normal",
            weight: "600"
        }, {
            name: "LexendDeca-Thin.woff2",
            style: "normal",
            weight: "100"
        } ]
    }, {
        name: "Luciole",
        size: "87.5%",
        folder: "luciole",
        files: [ {
            name: "Luciole-Bold-Italic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "Luciole-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "Luciole-Regular-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "Luciole-Regular.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "SylexiadSans",
        size: "125%",
        folder: "sylexiadSans",
        files: [ {
            name: "SylexiadSansMedium-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "SylexiadSansMedium-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "SylexiadSansMedium-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "SylexiadSansMedium.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "SylexiadSansSpacedMed-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "SylexiadSansSpacedMed-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "SylexiadSansSpacedMed-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "SylexiadSansSpacedMed.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "SylexiadSansSpacedThin-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "SylexiadSansSpacedThin-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "SylexiadSansSpacedThin-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "SylexiadSansSpacedThin.woff2",
            style: "normal",
            weight: "400"
        }, {
            name: "SylexiadSansThin-BoldItalic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "SylexiadSansThin-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "SylexiadSansThin-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "SylexiadSansThin.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "Verdana",
        size: "87.5%",
        folder: "verdana",
        files: [ {
            name: "Verdana-Bold-Italic.woff2",
            style: "italic",
            weight: "700"
        }, {
            name: "Verdana-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "Verdana-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "Verdana.woff2",
            style: "normal",
            weight: "400"
        } ]
    } ];
    constructor() {
        if (fontFamilyServiceIsInstantiated) {
            throw new Error("FontFamilyService is already instantiated.");
        }
        fontFamilyServiceIsInstantiated = true;
        const fontFaceList = [];
        this.fontDictionnary.forEach((font => {
            for (const file of font.files) {
                fontFaceList.push(`\n\t\t\t\t\t@font-face {\n\t\t\t\t\t\tfont-family:"${font.name}";\n\t\t\t\t\t\tsrc: local("${font.name}"), url("${appPath}assets/fonts/${font.folder}/${file.name}");\n\t\t\t\t\t\tfont-style: ${file.style};\n\t\t\t\t\t\tfont-weight: ${file.weight};\n\t\t\t\t\t\tfont-display: swap;\n\t\t\t\t\t\tsize-adjust: ${font.size};\n\t\t\t\t\t}`);
            }
        }));
        stylesServiceInstance.setStyle("font-family", fontFaceList.join(""));
    }
    setFontFamily=value => {
        if (value === DEFAULT_VALUE) {
            document.body.style.fontFamily = null;
        } else {
            document.body.style.fontFamily = value;
        }
    };
}

"use strict";

let linkStyleServiceIsInstantiated;

class LinkStyleService {
    constructor() {
        if (linkStyleServiceIsInstantiated) {
            throw new Error("LinkStyleService is already instantiated.");
        }
        linkStyleServiceIsInstantiated = true;
    }
    setLinkStyle=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("link");
        } else if (value) {
            const [linkColor, linkPointedColor, linkVisitedColor] = value.split("_");
            const styleColorLink = linkColor !== DEFAULT_VALUE ? `a:link { color: ${linkColor} !important; }` : "";
            const styleColorActiveLink = linkPointedColor !== DEFAULT_VALUE ? `a:active, a:hover, a:focus { color: ${linkPointedColor} !important; }` : "";
            const styleColorVisitedLink = linkVisitedColor !== DEFAULT_VALUE ? `a:visited { color: ${linkVisitedColor} !important; }` : "";
            let styleLink = `${styleColorLink} ${styleColorVisitedLink} ${styleColorActiveLink}`;
            stylesServiceInstance.setStyle("link", styleLink);
        }
    };
}

"use strict";

let magnifierServiceIsInstantiated;

class MagnifierService {
    zoom;
    handler;
    magnifierWidth=300;
    magnifierHeight=300;
    ofs_x;
    ofs_y;
    pos_x;
    pos_y;
    magnifier;
    magnifierContent;
    magnifierBody;
    observerObj;
    syncTimeout;
    styleMagnifier=`\n\t\t#${PREFIX}magnifier {\n\t\t\tbackground-color: white;\n\t\t\tborder: 1px solid black;\n\t\t\tborder-radius: 0.5rem;\n\t\t\twidth: ${this.magnifierWidth}px;\n\t\t\theight: ${this.magnifierHeight}px;\n\t\t\tposition: fixed;\n\t\t\toverflow: hidden;\n\t\t\tz-index: 2147483645;\n\t\t}\n\n\t\t#${PREFIX}magnifier-content {\n\t\t\tdisplay: block;\n\t\t\tmargin-left: 0;\n\t\t\tmargin-top: 0;\n\t\t\tpadding-top: 0;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\toverflow: visible;\n\t\t\ttransform-origin: left top;\n\t\t\tuser-select: none;\n\t\t}\n\n\t\t#${PREFIX}magnifier-glass {\n\t\t\tbackground-color: white;\n\t\t\topacity: 0;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition: absolute;\n\t\t\ttop: 0;\n\t\t\tleft: 0;\n\t\t\tcursor: move;\n\t\t}\n\t`;
    constructor() {
        if (magnifierServiceIsInstantiated) {
            throw new Error("MagnifierService is already instantiated.");
        }
        magnifierServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setMagnifier=value => {
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("magnifier");
            document.querySelector(`#${PREFIX}magnifier`)?.remove();
            this.unBindDOMObserver();
        } else {
            stylesServiceInstance.setStyle("magnifier", this.styleMagnifier);
            this.zoom = parseInt(value.replace(/\D/g, ""), 10);
            this.initMagnifier();
        }
    };
    initMagnifier=() => {
        if (!document.querySelector(`#${PREFIX}magnifier`)) {
            this.setMagnifierElements();
        }
        this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
        this.magnifierContent = document.querySelector(`#${PREFIX}magnifier-content`);
        window.addEventListener("resize", this.handler, false);
        window.addEventListener("scroll", this.handler, true);
        window.addEventListener("scrollend", this.handler, true);
        this.magnifierContent.style.transform = `scale(${this.zoom})`;
        this.makeDraggable();
        this.setPosition(this.magnifier, 250, 250);
        this.syncContent();
        this.bindDOMObserver();
    };
    setMagnifierElements=() => {
        let fragment = document.createDocumentFragment();
        const magnifier = document.createElement("div");
        const magnifierContent = document.createElement("div");
        const magnifierGlass = document.createElement("div");
        magnifier.setAttribute("id", `${PREFIX}magnifier`);
        magnifierContent.setAttribute("id", `${PREFIX}magnifier-content`);
        magnifierGlass.setAttribute("id", `${PREFIX}magnifier-glass`);
        magnifier.appendChild(magnifierContent);
        magnifier.appendChild(magnifierGlass);
        fragment.appendChild(magnifier);
        document.body.appendChild(fragment);
    };
    setPosition=(element, left, top) => {
        element.style.left = `${left}px`;
        element.style.top = `${top}px`;
    };
    syncContent=() => {
        this.prepareContent();
        this.syncViewport();
        this.syncScrollBars();
    };
    prepareContent=() => {
        this.magnifierContent.innerHTML = "";
        const bodyOriginal = document.body;
        const bodyCopy = bodyOriginal.cloneNode(true);
        const color = bodyOriginal.style.backgroundColor;
        if (color) {
            this.magnifier.style.backgroundColor = color;
        }
        bodyCopy.style.cursor = "auto";
        bodyCopy.style.paddingTop = "0px";
        bodyCopy.style.position = "relative";
        bodyCopy.setAttribute("unselectable", "on");
        const canvasOriginal = bodyOriginal.querySelectorAll("canvas");
        const canvasCopy = bodyCopy.querySelectorAll("canvas");
        if (canvasOriginal.length > 0 && canvasOriginal.length === canvasCopy.length) {
            for (let i = 0; i < canvasOriginal.length; i++) {
                let ctx = canvasCopy[i].getContext("2d");
                try {
                    ctx?.drawImage(canvasOriginal[i], 0, 0);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        this.removeSelectors(bodyCopy, "script");
        this.removeSelectors(bodyCopy, "audio");
        this.removeSelectors(bodyCopy, "video");
        this.removeSelectors(bodyCopy, `app-root`);
        this.removeSelectors(bodyCopy, `#${PREFIX}magnifier`);
        this.magnifierContent.appendChild(bodyCopy);
        this.magnifierContent.style.width = `${document.body.clientWidth}px`;
        this.magnifierContent.style.height = `${document.body.clientHeight}px`;
        this.magnifierBody = this.magnifierContent.querySelector("body");
        this.magnifier?.classList.add(`${PREFIX}magnifier-ignore-class`);
        this.magnifierContent?.classList.add(`${PREFIX}magnifier-ignore-class`);
        this.magnifierBody?.classList.add(`${PREFIX}magnifier-ignore-class`);
        const bodyCopyElements = this.magnifierBody.querySelectorAll("*");
        bodyCopyElements.forEach((element => {
            element.classList.add(`${PREFIX}magnifier-ignore-class`);
        }));
    };
    syncViewport=() => {
        const x1 = this.magnifier?.offsetLeft;
        const y1 = this.magnifier?.offsetTop;
        const x2 = document.body.scrollLeft;
        const y2 = document.body.scrollTop;
        const left = -x1 * this.zoom - x2 * this.zoom - (this.zoom - 1) * (this.magnifierWidth / 2);
        const top = -y1 * this.zoom - y2 * this.zoom - (this.zoom - 1) * (this.magnifierHeight / 2);
        this.setPosition(this.magnifierContent, left, top);
    };
    syncScrollBars=() => {
        if (this.magnifierBody !== null) {
            const x2 = window.scrollX || document.documentElement.scrollLeft;
            const y2 = window.scrollY || document.documentElement.scrollTop;
            this.setPosition(this.magnifierBody, -x2, -y2);
        }
    };
    stopSyncScrollBars=() => {
        if (this.magnifierBody !== null) {
            this.magnifierBody = null;
        }
        if (this.magnifier !== null) {
            this.magnifier = null;
        }
    };
    removeSelectors=(container, selector) => {
        const elements = container.querySelectorAll(selector);
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].parentNode?.removeChild(elements[i]);
            }
        }
    };
    syncContentQueued=() => {
        window.clearTimeout(this.syncTimeout);
        this.syncTimeout = window.setTimeout(this.syncContent.bind(this), 100);
    };
    domChanged=() => {
        this.syncContentQueued();
    };
    unBindDOMObserver=() => {
        if (this.observerObj) {
            this.observerObj.disconnect();
            this.observerObj = null;
        }
    };
    bindDOMObserver=() => {
        this.observerObj = new MutationObserver((mutations => {
            for (let i = 0; i < mutations.length; i++) {
                this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
                if (!mutations[i].target?.parentElement?.classList?.contains(`${PREFIX}magnifier-ignore-class`) && !mutations[i].target?.firstChild?.parentElement?.classList?.contains(`${PREFIX}magnifier-ignore-class`)) {
                    this.domChanged();
                }
            }
        }));
        this.observerObj.observe(document, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [ "class", "width", "height", "style" ],
            attributeOldValue: true,
            characterDataOldValue: true
        });
    };
    makeDraggable=() => {
        this.magnifier.style.cursor = "move";
        this.magnifier.addEventListener("pointerdown", this.handler);
        this.magnifier.addEventListener("pointermove", this.handler);
        this.magnifier.addEventListener("pointerup", this.handler);
    };
    downHandler=event => {
        this.magnifier = document.querySelector(`#${PREFIX}magnifier`);
        const pageX = event.pageX || event.touches && event.touches[0].pageX;
        const pageY = event.pageY || event.touches && event.touches[0].pageY;
        this.ofs_x = this.magnifier.getBoundingClientRect().left - this.magnifier.offsetLeft;
        this.ofs_y = this.magnifier.getBoundingClientRect().top - this.magnifier.offsetTop;
        this.pos_x = pageX - (this.magnifier.getBoundingClientRect().left + window.scrollX || document.documentElement.scrollLeft);
        this.pos_y = pageY - (this.magnifier.getBoundingClientRect().top + window.scrollY || document.documentElement.scrollTop);
        event.preventDefault();
    };
    moveHandler=event => {
        if (this.magnifier !== null) {
            const pageX = event.pageX || event.touches && event.touches[0].pageX;
            const pageY = event.pageY || event.touches && event.touches[0].pageY;
            const left = pageX - this.pos_x - this.ofs_x - (window.scrollX || document.documentElement.scrollLeft);
            const top = pageY - this.pos_y - this.ofs_y - (window.scrollY || document.documentElement.scrollTop);
            this.setPosition(this.magnifier, left, top);
            this.syncViewport();
        }
    };
    upHandler=() => {
        if (this.magnifier !== null) {
            this.magnifier = null;
        }
    };
    resizeWindow=() => {
        let timer;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout((() => {
            this.stopSyncScrollBars();
            return;
        }), 100);
        this.syncContent();
    };
    createHandler=() => event => {
        switch (event.type) {
          case "resize":
            this.magnifierBody = this.magnifierContent.querySelector("body");
            this.resizeWindow();
            break;

          case "scroll":
            this.magnifierBody = this.magnifierContent.querySelector("body");
            this.syncScrollBars();
            break;

          case "scrollend":
            this.stopSyncScrollBars();
            break;

          case "pointerdown":
            this.downHandler(event);
            break;

          case "pointermove":
            this.moveHandler(event);
            break;

          case "pointerup":
            this.upHandler();
            break;
        }
    };
}

"use strict";

let marginAlignServiceIsInstantiated;

class MarginAlignService {
    constructor() {
        if (marginAlignServiceIsInstantiated) {
            throw new Error("MarginAlignService is already instantiated.");
        }
        marginAlignServiceIsInstantiated = true;
    }
    setMargin=value => {
        const elements = value === "margeList" ? document.querySelectorAll("ul, ol") : document.body.querySelectorAll("*");
        elements.forEach((elt => {
            const element = elt;
            switch (value) {
              case "alignLeft":
                {
                    element.style.textAlign = "left";
                    break;
                }

              case "marginLeft":
                {
                    element.style.textAlign = "left";
                    element.style.marginLeft = "40px";
                    break;
                }

              case "margeList":
                {
                    element.style.listStylePosition = "initial";
                    element.style.listStyleImage = "none";
                    element.style.listStyleType = "decimal";
                    break;
                }

              default:
                {
                    element.style.textAlign = null;
                    element.style.marginLeft = null;
                    element.style.listStylePosition = null;
                    element.style.listStyleImage = null;
                    element.style.listStyleType = null;
                    break;
                }
            }
        }));
    };
}

"use strict";

let navigationAutoServiceIsInstantiated;

class NavigationAutoService {
    currentFocusElt;
    currentIndex;
    handler;
    timer=null;
    constructor() {
        if (navigationAutoServiceIsInstantiated) {
            throw new Error("NavigationAutoService is already instantiated.");
        }
        navigationAutoServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setNavigationAuto=value => {
        window.removeEventListener("focus", this.handler);
        this.clearIntervalFocus();
        if (value !== DEFAULT_VALUE) {
            window.addEventListener("focus", this.handler, true);
            let delay = parseInt(value.split("_")[1]?.replace(/\D/g, ""), 10) * 1e3;
            this.setIntervalFocus(delay);
        }
    };
    focusElement=() => {
        const focusableElements = domServiceInstance.getFocusableElements();
        let newIndex = 0;
        if (this.currentFocusElt) {
            const currentIndex = focusableElements.indexOf(this.currentFocusElt);
            newIndex = (currentIndex + 1) % focusableElements.length;
        }
        const newFocusElt = focusableElements[newIndex];
        newFocusElt?.focus();
        this.currentFocusElt = newFocusElt;
    };
    setIntervalFocus=delay => {
        this.timer = setInterval((() => {
            this.focusElement();
        }), delay);
    };
    clearIntervalFocus=() => {
        if (this.timer !== null) {
            clearInterval(this.timer);
            this.timer = null;
        }
    };
    createHandler() {
        return event => {
            if (event.currentTarget) {
                this.currentFocusElt = event.currentTarget;
            }
        };
    }
}

"use strict";

let navigationButtonsServiceIsInstantiated;

class NavigationButtonsService {
    currentFocusElt;
    handlerNavigationButtons;
    constructor() {
        if (navigationButtonsServiceIsInstantiated) {
            throw new Error("NavigationButtonsService is already instantiated.");
        }
        navigationButtonsServiceIsInstantiated = true;
        this.handlerNavigationButtons = this.createHandlerNavigationButtons();
    }
    buttonsList=[ "tab", "shiftTab", "click", "escape" ];
    setNavigationButtons=value => {
        this.resetNavigationButtons();
        if (value !== DEFAULT_VALUE) {
            this.getFocusedElement();
            this.addNavigationButtons();
        }
    };
    resetNavigationButtons=() => {
        this.buttonsList.forEach((navigationButton => {
            domServiceInstance.removeButtonsInDom(navigationButton);
        }));
        document.removeEventListener("click", this.handlerNavigationButtons);
        document.removeEventListener("focusout", this.handlerNavigationButtons);
    };
    addNavigationButtons=() => {
        this.buttonsList.forEach((navigationButton => {
            domServiceInstance.addButtonsInDom(navigationButton);
            let btnNav = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${navigationButton}`);
            btnNav.addEventListener("mousedown", (event => {
                event.preventDefault();
                event.stopPropagation();
                this.simulateKeyEvent(navigationButton);
            }));
        }));
    };
    simulateKeyEvent=name => {
        switch (name) {
          case "tab":
            this.focusElement("next");
            break;

          case "shiftTab":
            this.focusElement("previous");
            break;

          case "click":
            this.currentFocusElt?.click();
            break;

          case "escape":
            this.simulateKeydownEscape();
            break;

          default:
            break;
        }
    };
    focusElement=direction => {
        const focusableElements = domServiceInstance.getFocusableElements();
        let newIndex = 0;
        if (this.currentFocusElt) {
            const currentIndex = focusableElements.indexOf(this.currentFocusElt);
            newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
            newIndex = newIndex > focusableElements.length - 1 ? 0 : newIndex < 0 ? focusableElements.length - 1 : newIndex;
        }
        const newFocusElt = focusableElements[newIndex];
        newFocusElt?.focus();
        this.currentFocusElt = newFocusElt;
    };
    getFocusedElement=() => {
        document.addEventListener("focus", this.handlerNavigationButtons);
    };
    simulateKeydownEscape=() => {
        var event = new KeyboardEvent("keydown", {
            key: "Escape",
            keyCode: 27,
            code: "Escape",
            which: 27,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    };
    createHandlerNavigationButtons=() => event => {
        if (event.type === "focusout") {
            this.currentFocusElt = event.currentTarget;
        }
    };
}

"use strict";

let readAloudServiceIsInstantiated;

class ReadAloudService {
    handler;
    tooltipReadAloud;
    scriptsElements;
    confortPlusElement;
    readAloudTooltipId=`${PREFIX}read-aloud-tooltip`;
    readAloudSpan=`${PREFIX}read-aloud-span`;
    readAloudPreventFlexbox=`${PREFIX}read-aloud-prevent-flexbox`;
    regexWord=/\S+\s*[.,!?]*/g;
    regexSentence=/[^\.!\?]+[\.!\?]+["']?|.+$/g;
    classReadAloud=`\n\t#${this.readAloudTooltipId} {\n\t\tposition: fixed;\n\t\tbackground-color: rgba(0, 0, 0, 0.7);\n\t\tcolor: white;\n\t\twidth: fit-content;\n\t\tpadding: 1rem;\n\t\tpointer-events: none;\n\t\ttransform: translate(0%, 75%);\n\t\tz-index: 2147483645;\n\t}\n\n\t.${this.readAloudPreventFlexbox} {\n\t\twhite-space: pre-wrap;\n\t}`;
    constructor() {
        if (readAloudServiceIsInstantiated) {
            throw new Error("ReadAloudService is already instantiated.");
        }
        readAloudServiceIsInstantiated = true;
        this.handler = this.createHandler();
    }
    setReadAloud=value => {
        this.resetBody();
        if (value === DEFAULT_VALUE) {
            this.resetReadAloud();
        } else {
            switch (value) {
              case "word":
                this.setBodyToSpeech(this.regexWord);
                break;

              case "sentence":
                this.setBodyToSpeech(this.regexSentence);
                break;

              case "all":
                document.addEventListener("focusin", this.handler);
                break;

              default:
                break;
            }
            this.setTooltip();
            document.addEventListener("pointerdown", this.handler);
            document.addEventListener("keydown", this.handler);
            document.addEventListener("contextmenu", this.handler);
        }
    };
    setTooltip=() => {
        const fragment = document.createDocumentFragment();
        const tooltip = document.createElement("div");
        tooltip.setAttribute("id", this.readAloudTooltipId);
        tooltip.textContent = i18nServiceInstance.getMessage("readAloud-tooltip");
        fragment.appendChild(tooltip);
        document.body.insertBefore(fragment, document.body.firstChild);
        stylesServiceInstance.setStyle("read-aloud", this.classReadAloud);
        this.tooltipReadAloud = document.querySelector(`#${this.readAloudTooltipId}`);
        document.addEventListener("pointermove", this.handler);
    };
    setBodyToSpeech=regex => {
        const elements = document.body.querySelectorAll(":not(script):not(app-root)");
        elements.forEach((element => {
            let newNodes = [];
            element.childNodes.forEach((node => {
                if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length > 0) {
                    const items = node.textContent.trim().match(regex);
                    if (items?.length > 0) {
                        const template = document.createElement("template");
                        items?.forEach((item => {
                            const span = document.createElement("span");
                            span.classList.add(this.readAloudSpan);
                            span.innerText = item.trim() + " ";
                            template.content.appendChild(span);
                        }));
                        newNodes.push(...template.content.childNodes);
                    } else {
                        newNodes.push(node);
                    }
                } else if (node.nodeType !== Node.TEXT_NODE) {
                    newNodes.push(node);
                }
            }));
            element.innerHTML = "";
            newNodes.forEach((node => {
                element.appendChild(node);
            }));
            this.addClassForSpecificCase(element);
        }));
    };
    addClassForSpecificCase=element => {
        const style = window.getComputedStyle(element);
        if (style.display === "flex" || style.display === "inline-flex") {
            element.classList.add(this.readAloudPreventFlexbox);
        }
    };
    resetBody=() => {
        this.tooltipReadAloud?.remove();
        const elements = Array.from(document.body.querySelectorAll(":not(script):not(app-root)"));
        const parser = new DOMParser;
        elements.forEach((element => {
            element.classList.remove(this.readAloudPreventFlexbox);
            let newChilds = document.createDocumentFragment();
            let textChilds = "";
            Array.from(element.childNodes).forEach((child => {
                if (child.nodeType === Node.ELEMENT_NODE && child.classList.contains(this.readAloudSpan)) {
                    textChilds += child.innerHTML.trim() + " ";
                    if (!(child.nextSibling && child.nextSibling.nodeType === Node.ELEMENT_NODE && child.nextSibling.classList.contains(this.readAloudSpan))) {
                        let decodedText = parser.parseFromString(textChilds, "text/html").documentElement.textContent;
                        let textNode = document.createTextNode(decodedText);
                        newChilds.appendChild(textNode);
                        textChilds = "";
                    }
                } else if (!(child.nodeType === Node.TEXT_NODE && child.textContent.trim().length < 1)) {
                    newChilds.appendChild(child);
                }
            }));
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            element.appendChild(newChilds);
        }));
    };
    resetReadAloud=() => {
        stylesServiceInstance.removeStyle("read-aloud");
        document.removeEventListener("pointermove", this.handler);
        document.removeEventListener("pointerdown", this.handler);
        document.removeEventListener("keydown", this.handler);
        document.removeEventListener("contextmenu", this.handler);
        document.removeEventListener("focusin", this.handler);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "pointermove":
            this.tooltipReadAloud.style.left = `${event.pageX}px`;
            this.tooltipReadAloud.style.top = `${event.pageY}px`;
            break;

          case "pointerdown":
            speechSynthesis.speak(new SpeechSynthesisUtterance(event.target.innerText));
            break;

          case "keydown":
            if (event.key === "Escape" || event.key === "Esc") {
                speechSynthesis.cancel();
            }
            break;

          case "contextmenu":
            speechSynthesis.cancel();
            break;

          case "focusin":
            speechSynthesis.speak(new SpeechSynthesisUtterance(document.activeElement.innerText));
            break;
        }
    };
}

"use strict";

let readingGuideServiceIsInstantiated;

class ReadingGuideService {
    topGuideElt=null;
    bottomGuideElt=null;
    readingGuideElt=null;
    guideType="";
    sizeGuide=40;
    handlerReadingGuide;
    classRuleGuide=`\n\t\t#${PREFIX}vertical-guide-elt {\n\t\t\tborder-left: 4px solid black;\n\t\t\tbackground: white;\n\t\t\theight: 100%;\n\t\t\twidth: 6px;\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t\tz-index: 2147483645;\n\t\t}\n\t`;
    classMaskGuide=`\n\t\t#${PREFIX}mask-guide--top-elt,\n\t\t#${PREFIX}mask-guide--bottom-elt {\n\t\t\tbackground: rgba(0, 0, 0, 0.5);\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tz-index: 2147483645;\n\t\t}\n\t\t#${PREFIX}mask-guide--top-elt {\n\t\t\ttop: 0;\n\t\t}\n\t\t#${PREFIX}mask-guide--bottom-elt {\n\t\t\tbottom: 0;\n\t\t}\n\t`;
    constructor() {
        if (readingGuideServiceIsInstantiated) {
            throw new Error("ReadingGuideService is already instantiated.");
        }
        readingGuideServiceIsInstantiated = true;
        this.readingGuideElt = document.querySelector(`#${PREFIX}vertical-guide-elt`);
        this.topGuideElt = document.querySelector(`#${PREFIX}top-guide-elt`);
        this.bottomGuideElt = document.querySelector(`#${PREFIX}bottom-guide-elt`);
        this.handlerReadingGuide = this.createHandlerReadingGuide();
    }
    setReadingMaskGuide=value => {
        switch (value) {
          case "ruleGuide":
            {
                this.resetGuide();
                this.guideType = "rule";
                this.setGuide();
                break;
            }

          case "maskGuide":
            {
                this.resetGuide();
                this.guideType = "mask";
                this.setGuide();
                break;
            }

          default:
            {
                this.resetGuide();
            }
        }
    };
    setGuide=() => {
        let styleGuide = "";
        if (this.guideType === "rule") {
            styleGuide = this.classRuleGuide;
        } else if (this.guideType === "mask") {
            styleGuide = this.classMaskGuide;
        }
        stylesServiceInstance.setStyle("reading-guide", styleGuide);
        if (this.guideType === "rule") {
            const readingElt = document.createElement("div");
            readingElt.setAttribute("id", `${PREFIX}vertical-guide-elt`);
            document.body.appendChild(readingElt);
        } else if (this.guideType === "mask") {
            const maskTopElt = document.createElement("div");
            const maskBottomElt = document.createElement("div");
            maskTopElt.setAttribute("id", `${PREFIX}mask-guide--top-elt`);
            maskBottomElt.setAttribute("id", `${PREFIX}mask-guide--bottom-elt`);
            document.body.appendChild(maskTopElt);
            document.body.appendChild(maskBottomElt);
        }
        document.addEventListener("mousemove", this.handlerReadingGuide);
    };
    resetGuide=() => {
        this.guideType = "";
        stylesServiceInstance.removeStyle("reading-guide");
        document.querySelector(`#${PREFIX}vertical-guide-elt`)?.remove();
        document.querySelector(`#${PREFIX}mask-guide--top-elt`)?.remove();
        document.querySelector(`#${PREFIX}mask-guide--bottom-elt`)?.remove();
    };
    createHandlerReadingGuide=() => event => {
        if (event.type === "mousemove") {
            if (this.guideType === "rule") {
                document.querySelector(`#${PREFIX}vertical-guide-elt`).style.left = `${event.x + 2}px`;
            } else if (this.guideType === "mask") {
                document.querySelector(`#${PREFIX}mask-guide--top-elt`).style.height = `${event.y - this.sizeGuide}px`;
                document.querySelector(`#${PREFIX}mask-guide--bottom-elt`).style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
            }
            event.stopPropagation();
        }
    };
}

"use strict";

let scrollTypeServiceIsInstantiated;

class ScrollTypeService {
    btnState="";
    scrollSteps=10;
    scrollTimer=50;
    constructor() {
        if (scrollTypeServiceIsInstantiated) {
            throw new Error("ScrollTypeService is already instantiated.");
        }
        scrollTypeServiceIsInstantiated = true;
    }
    setScrollType=value => {
        this.btnState = value;
        this.setBtnScroll();
    };
    setBtnScroll=() => {
        let intervalUp;
        let intervalDown;
        const buttonsList = [ {
            name: "scroll_up",
            interval: intervalUp
        }, {
            name: "scroll_down",
            interval: intervalDown
        } ];
        buttonsList.forEach((scrollButton => {
            domServiceInstance.removeButtonsInDom(scrollButton.name);
        }));
        if (this.btnState !== DEFAULT_VALUE) {
            buttonsList.forEach((button => {
                domServiceInstance.addButtonsInDom(button.name);
                let btnScroll = document.querySelector(`#${CONTAINER_BUTTONS_ID}__${button.name}`);
                let scrollDir = button.name.includes("up") ? -1 : button.name.includes("down") ? 1 : 0;
                let scrollBy = scrollDir * this.scrollSteps;
                if (this.btnState === "scrollOnMouseover") {
                    btnScroll?.addEventListener("mouseover", (event => {
                        button.interval = setInterval((function() {
                            window.scrollBy(0, scrollBy);
                        }), this.scrollTimer);
                    }));
                    btnScroll?.addEventListener("mouseleave", (event => {
                        clearInterval(button.interval);
                    }));
                } else {
                    btnScroll?.addEventListener("click", (event => {
                        window.scrollBy(0, scrollBy);
                    }));
                }
            }));
        }
    };
}

"use strict";

let scrollServiceIsInstantiated;

class ScrollService {
    scrollColor="";
    scrollColorHover="";
    scrollWidth="";
    scrollColorValues=[ {
        color: "white",
        hover: "lightgrey"
    }, {
        color: "blue",
        hover: "darkblue"
    }, {
        color: "red",
        hover: "darkred"
    }, {
        color: "yellow",
        hover: "gold"
    }, {
        color: "green",
        hover: "darkgreen"
    }, {
        color: "black",
        hover: "darkgrey"
    } ];
    constructor() {
        if (scrollServiceIsInstantiated) {
            throw new Error("ScrollService is already instantiated.");
        }
        scrollServiceIsInstantiated = true;
    }
    setScroll=value => {
        stylesServiceInstance.removeStyle("scroll");
        document.body.classList.remove(`${PREFIX}big-scroll`);
        if (value !== DEFAULT_VALUE) {
            document.body.classList.add(`${PREFIX}big-scroll`);
            switch (value?.split("_")[0]) {
              case "big":
                this.scrollWidth = SCROLL_SIZE_BIG;
                break;

              case "huge":
                this.scrollWidth = SCROLL_SIZE_HUGE;
                break;

              default:
                this.scrollWidth = "inherit";
                break;
            }
            this.scrollColor = value?.split("_")[1] ? value?.split("_")[1] : "lightgrey";
            let colorHover = this.scrollColorValues.find((o => o.color === this.scrollColor))?.hover;
            this.scrollColorHover = colorHover ? colorHover : "grey";
            this.setScrollClass();
        }
    };
    setScrollClass=() => {
        let styleScroll = `\n\t\t\t\t.d-none {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\n\t\t\t\t/* WebKit (Chrome, Safari) */\n\t\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar,\n\t\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar {\n\t\t\t\t\t\twidth: ${this.scrollWidth};\n\t\t\t\t}\n\t\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-thumb,\n\t\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-thumb {\n\t\t\t\t\tbackground-color: ${this.scrollColor};\n\t\t\t\t\tborder-radius: 1rem;\n\t\t\t\t\twidth: ${this.scrollWidth};\n\t\t\t\t\tcursor: pointer;\n\t\t\t\t}\n\t\t\t\t.${PREFIX}big-scroll::-webkit-scrollbar-thumb:hover,\n\t\t\t\t.${PREFIX}big-scroll *::-webkit-scrollbar-thumb:hover {\n\t\t\t\t\tbackground-color: ${this.scrollColorHover};\n\t\t\t\t}\n\n\t\t\t\t/* Firefox */\n\t\t\t\t@-moz-document url-prefix() {\n\t\t\t\t\t.${PREFIX}big-scroll,\n\t\t\t\t\t.${PREFIX}big-scroll * {\n\t\t\t\t\t\tscrollbar-width: auto;\n\t\t\t\t\t\tscrollbar-color: ${this.scrollColor} transparent;\n\t\t\t\t\t}\n\t\t\t\t\t.${PREFIX}big-scroll:hover,\n\t\t\t\t\t.${PREFIX}big-scroll *:hover {\n\t\t\t\t\t\tscrollbar-color: ${this.scrollColorHover} transparent;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t`;
        stylesServiceInstance.setStyle("scroll", styleScroll);
    };
}

"use strict";

let skipToContentServiceIsInstantiated;

class SkipToContentService {
    constructor() {
        if (skipToContentServiceIsInstantiated) {
            throw new Error("SkipToContentService is already instantiated.");
        }
        skipToContentServiceIsInstantiated = true;
    }
    setSkipToContent=value => {
        if (value !== DEFAULT_VALUE) {
            this.goToMain();
        }
    };
    goToMain=() => {
        let mainElement;
        mainElement = document.querySelector("main") || document.querySelector('[role="main"]') || document.querySelector('[id="main"]') || document.querySelector('[class="main"]') || document.querySelector('[id="content"]') || document.querySelector('[class="content"]');
        if (mainElement) {
            mainElement.tabIndex = -1;
            mainElement.focus();
        }
    };
}

"use strict";

let stopAnimationsServiceIsInstantiated;

class StopAnimationsService {
    constructor() {
        if (stopAnimationsServiceIsInstantiated) {
            throw new Error("StopAnimationsService is already instantiated.");
        }
        stopAnimationsServiceIsInstantiated = true;
    }
    styleStopAnimations=`\n\t\t*, *::before, *::after {\n\t\t\tanimation: none !important;\n\t\t\tanimation-fill-mode: forwards !important;\n\t\t\ttransition: none !important;\n\t\t\ttransition-duration: 0.00001s !important;\n\t\t}\n\t`;
    setStopAnimations=value => {
        this.unFreezeAllAnimations();
        stylesServiceInstance.removeStyle("stop-animations");
        if (value !== DEFAULT_VALUE) {
            stylesServiceInstance.setStyle("stop-animations", this.styleStopAnimations);
            this.freezeAllAnimations();
        }
    };
    freezeAnimation=img => {
        const width = img.width;
        const height = img.height;
        const alt = img.alt;
        let canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        canvas.title = alt;
        canvas.classList.add(`${PREFIX}freeze-animation--canvas`);
        canvas.setAttribute("aria-hidden", "true");
        img.classList.add(`${PREFIX}freeze-animation--img`);
        let freeze = () => {
            canvas.getContext("2d").drawImage(img, 0, 0, width, height);
            canvas.style.position = "absolute";
            img.parentNode.insertBefore(canvas, img);
            img.style.opacity = 0;
        };
        if (img.complete) {
            freeze();
        } else {
            img.addEventListener("load", freeze, true);
        }
    };
    freezeAllAnimations=() => {
        document.querySelectorAll('img:is([src$=".gif"], [src$=".png"], [src$=".webp"], [src$=".avif"])').forEach((img => {
            this.freezeAnimation(img);
        }));
    };
    unFreezeAllAnimations=() => {
        document.querySelectorAll(`.${PREFIX}freeze-animation--canvas`).forEach((canvas => {
            canvas.remove();
        }));
        document.querySelectorAll(`.${PREFIX}freeze-animation--img`).forEach((img => {
            img.style.opacity = 1;
        }));
    };
}

"use strict";

let textSizeServiceIsInstantiated;

class TextSizeService {
    constructor() {
        if (textSizeServiceIsInstantiated) {
            throw new Error("TextSizeService is already instantiated.");
        }
        textSizeServiceIsInstantiated = true;
    }
    setFontSize=value => {
        if (value === DEFAULT_VALUE) {
            document.documentElement.style.fontSize = null;
        } else {
            document.documentElement.style.fontSize = `${value}%`;
        }
    };
}

"use strict";

let textSpacingServiceIsInstantiated;

class TextSpacingService {
    constructor() {
        if (textSpacingServiceIsInstantiated) {
            throw new Error("TextSpacingService is already instantiated.");
        }
        textSpacingServiceIsInstantiated = true;
    }
    setSpacingText=value => {
        const spacingTextValues = [ {
            name: "spacingTextLabelSmall",
            wordSpacing: ".10em",
            lineHeight: "2em",
            letterSpacing: ".0625em"
        }, {
            name: "spacingTextLabelBig",
            wordSpacing: ".25em",
            lineHeight: "2.5em",
            letterSpacing: ".25em"
        }, {
            name: "spacingTextLabelHuge",
            wordSpacing: ".5em",
            lineHeight: "3em",
            letterSpacing: ".5em"
        } ];
        if (value === DEFAULT_VALUE) {
            stylesServiceInstance.removeStyle("text-spacing");
        } else {
            let objSpacingText = spacingTextValues?.find((o => o.name === value));
            let styleSpacingText = `\n\t\t\t\t* {\n\t\t\t\t\tword-spacing: ${objSpacingText.wordSpacing} !important;\n\t\t\t\t\tline-height: ${objSpacingText.lineHeight} !important;\n\t\t\t\t\tletter-spacing: ${objSpacingText.letterSpacing} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("text-spacing", styleSpacingText);
        }
    };
}

"use strict";

let stringServiceIsInstantiated;

class StringService {
    constructor() {
        if (stringServiceIsInstantiated) {
            throw new Error("StringService is already instantiated.");
        }
        stringServiceIsInstantiated = true;
    }
    normalizeID(string) {
        return string?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s]/g, "").split("-").join("");
    }
    normalizeSettingName(string) {
        return string?.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase().replace("app-", "").normalize("NFD").replace(/[\u0300-\u036f\s]/g, "");
    }
    normalizeSettingCamelCase(string) {
        return string?.replace("app-", "").normalize("NFD").replace(/[\u0300-\u036f\s]/g, "").replace(/-./g, (x => x[1].toUpperCase()));
    }
    capitalizeFirstLetter=string => string.charAt(0).toUpperCase() + string.slice(1);
}

"use strict";

let stylesServiceIsInstantiated;

class StylesService {
    prefixStyle=`${PREFIX}style-`;
    constructor() {
        if (stylesServiceIsInstantiated) {
            throw new Error("StylesService is already instantiated.");
        }
        stylesServiceIsInstantiated = true;
    }
    setStyle=(name, style) => {
        if (document.querySelectorAll(`#${this.prefixStyle}${name}`).length === 0) {
            let styleElement = document.createElement("style");
            styleElement.setAttribute("id", `${this.prefixStyle}${name}`);
            styleElement.innerHTML = style;
            document.head.appendChild(styleElement);
        } else {
            document.querySelector(`#${this.prefixStyle}${name}`).innerHTML = style;
        }
    };
    removeStyle=name => {
        document.querySelector(`#${this.prefixStyle}${name}`)?.remove();
    };
}

"use strict";

"use strict";

const pathServiceInstance = new PathService;

Object.freeze(pathServiceInstance);

const appPath = pathServiceInstance.path;

const domServiceInstance = new DomService;

Object.freeze(domServiceInstance);

const i18nServiceInstance = new I18nService;

Object.freeze(i18nServiceInstance);

const iconsServiceInstance = new IconsService;

Object.freeze(iconsServiceInstance);

const filesServiceInstance = new FilesService;

Object.freeze(filesServiceInstance);

const modeOfUseServiceInstance = new ModeOfUseService;

Object.freeze(modeOfUseServiceInstance);

const stylesServiceInstance = new StylesService;

Object.freeze(stylesServiceInstance);

const stringServiceInstance = new StringService;

Object.freeze(stringServiceInstance);

const categoriesServiceInstance = new CategoriesService;

Object.seal(categoriesServiceInstance);

const localStorageServiceInstance = new LocalStorageService;

Object.seal(localStorageServiceInstance);

const routeServiceInstance = new RouteService;

Object.seal(routeServiceInstance);

const capitalLettersServiceInstance = new CapitalLettersService;

Object.seal(capitalLettersServiceInstance);

const clearlyLinksServiceInstance = new ClearlyLinksService;

Object.seal(clearlyLinksServiceInstance);

const clickFaciliteServiceInstance = new ClickFaciliteService;

Object.seal(clickFaciliteServiceInstance);

const colorContrastServiceInstance = new ColorContrastService;

Object.seal(colorContrastServiceInstance);

const colourThemeServiceInstance = new ColourThemeService;

Object.seal(colourThemeServiceInstance);

const cursorAspectServiceInstance = new CursorAspectService;

Object.seal(cursorAspectServiceInstance);

const deleteBackgroundImagesServiceInstance = new DeleteBackgroundImagesService;

Object.seal(deleteBackgroundImagesServiceInstance);

const focusAspectServiceInstance = new FocusAspectService;

Object.seal(focusAspectServiceInstance);

const fontFamilyServiceInstance = new FontFamilyService;

Object.seal(fontFamilyServiceInstance);

const linkStyleServiceInstance = new LinkStyleService;

Object.seal(linkStyleServiceInstance);

const magnifierServiceInstance = new MagnifierService;

Object.seal(magnifierServiceInstance);

const marginAlignServiceInstance = new MarginAlignService;

Object.seal(marginAlignServiceInstance);

const navigationAutoServiceInstance = new NavigationAutoService;

Object.seal(navigationAutoServiceInstance);

const navigationButtonsServiceInstance = new NavigationButtonsService;

Object.seal(navigationButtonsServiceInstance);

const readAloudServiceInstance = new ReadAloudService;

Object.seal(readAloudServiceInstance);

const readingGuideServiceInstance = new ReadingGuideService;

Object.seal(readingGuideServiceInstance);

const scrollServiceInstance = new ScrollService;

Object.seal(scrollServiceInstance);

const scrollTypeServiceInstance = new ScrollTypeService;

Object.seal(scrollTypeServiceInstance);

const skipToContentServiceInstance = new SkipToContentService;

Object.seal(skipToContentServiceInstance);

const stopAnimationsServiceInstance = new StopAnimationsService;

Object.seal(stopAnimationsServiceInstance);

const textSizeServiceInstance = new TextSizeService;

Object.seal(textSizeServiceInstance);

const textSpacingServiceInstance = new TextSpacingService;

Object.seal(textSpacingServiceInstance);

const pauseServiceInstance = new PauseService;

Object.freeze(pauseServiceInstance);

"use strict";

const template = document.createElement("template");

template.innerHTML = `\n<div data-bs-theme="light" style="display:none">\n\t<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">\n\t\t<span class="visually-hidden" data-i18n="mainButton"></span>\n\t\t<app-icon data-size="3em" data-name="Accessibility"></app-icon>\n\t</button>\n\t<app-toolbar class="bg-body position-fixed top-0 end-0" id="toolbar"></app-toolbar>\n</div>\n`;

class AppComponent extends HTMLElement {
    confortPlusBtn=null;
    confortPlusToolbar=null;
    closeBtn=null;
    link;
    handler;
    constructor() {
        super();
        this.attachShadow({
            mode: "open"
        });
        this?.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.link = document.createElement("link");
        this.link.rel = "stylesheet";
        this.link.href = `${appPath}css/styles.min.css`;
        this.link.onload = () => {
            this?.shadowRoot?.querySelector("[data-bs-theme]").removeAttribute("style");
        };
        this.shadowRoot?.appendChild(this.link);
        this.handler = this.createHandler();
    }
    connectedCallback() {
        iconsServiceInstance.loadSprite(this.shadowRoot);
        setTimeout((() => {
            i18nServiceInstance.translate(this.shadowRoot);
        }));
        this.confortPlusBtn = this?.shadowRoot?.getElementById("confort");
        this.closeBtn = this?.shadowRoot?.getElementById("close-toolbar");
        this.confortPlusToolbar = this?.shadowRoot?.getElementById("toolbar");
        if (!this.confortPlusBtn || !this.confortPlusToolbar) {
            return;
        }
        localStorageServiceInstance.getItem("is-opened").then((isOpened => {
            if (isOpened === "true") {
                this.showToolbar();
            } else {
                this.hideToolbar();
            }
        }));
        this.confortPlusToolbar.addEventListener("closeEvent", this.handler);
        this.confortPlusBtn.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.confortPlusToolbar?.removeEventListener("closeEvent", this.handler);
        this.confortPlusBtn?.removeEventListener("click", this.handler);
    }
    createHandler=() => event => {
        switch (event.type) {
          case "closeEvent":
            this.hideToolbar();
            break;

          case "click":
            this.showToolbar();
            break;

          default:
            break;
        }
    };
    showToolbar=() => {
        this.confortPlusToolbar.removeAttribute("style");
        this.closeBtn?.focus();
        this.confortPlusBtn.classList.add("d-none");
        localStorageServiceInstance.setItem("is-opened", "true");
    };
    hideToolbar=() => {
        this.confortPlusToolbar.style.transform = "translateX(100%)";
        this.confortPlusToolbar.style.visibility = "hidden";
        this.confortPlusBtn.classList.remove("d-none");
        this.confortPlusBtn?.focus();
        localStorageServiceInstance.setItem("is-opened", "false");
    };
}

customElements.define("app-root", AppComponent);

"use strict";

class AbstractSetting extends HTMLElement {
    static observedAttributes=[ "data-values" ];
    settingBtn=null;
    modalBtn=null;
    canEdit=false;
    activesValues;
    separator=",";
    name="";
    handler;
    callback;
    constructor() {
        super();
        this.canEdit = this.dataset?.canEdit === "true" || this.canEdit;
        this.name = stringServiceInstance.normalizeSettingName(this.tagName);
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("app-btn-setting");
        this.modalBtn = this.querySelector("app-btn-modal");
        this.settingBtn?.setAttribute("data-name", this.name);
        this.modalBtn?.setAttribute("data-name", this.name);
        if (this.canEdit) {
            this.modalBtn?.classList.remove("d-none");
            this.settingBtn?.classList.add("sc-btn-setting--with-btn-modal");
        }
        this.settingBtn?.addEventListener("changeSettingEvent", this.handler);
    }
    disconnectedCallback() {
        this.modalBtn?.removeEventListener("clickModalEvent", this.handler);
        this.settingBtn?.removeEventListener("changeSettingEvent", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-values" === name) {
            this.activesValues = JSON.parse(newValue);
            this.setSettingBtn(this.activesValues);
            if (this.callback) {
                this.callback(this.activesValues?.values.split(",")[this.activesValues?.valueSelected]);
            }
        }
    }
    setSettingBtn=activesValues => {
        this.settingBtn?.setAttribute("data-values", activesValues?.values);
        this.settingBtn?.setAttribute("data-active-value", activesValues?.valueSelected.toString());
        this.modalBtn?.setAttribute("data-value", i18nServiceInstance.getMessage(activesValues?.values?.split(",")[activesValues?.valueSelected]));
    };
    setCallback=callback => {
        this.callback = callback;
    };
    createHandler=() => event => {
        switch (event.type) {
          case "changeSettingEvent":
            this.changeSettingEvent(event);
            break;
        }
    };
    changeSettingEvent=event => {
        let newIndex = event.detail.index;
        let newValue = event.detail.value;
        modeOfUseServiceInstance.setSettingValue(this.name, newIndex).then((success => {
            if (!success) {
                this.callback(newValue);
                this.modalBtn?.setAttribute("data-value", i18nServiceInstance.getMessage(newValue));
            }
        }));
    };
}

"use strict";

const tmplCapitalLetters = document.createElement("template");

tmplCapitalLetters.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class CapitalLettersComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(capitalLettersServiceInstance.setCapitalLetters.bind(this));
        this.appendChild(tmplCapitalLetters.content.cloneNode(true));
    }
}

customElements.define("app-capital-letters", CapitalLettersComponent);

"use strict";

const tmplClearlyLinks = document.createElement("template");

tmplClearlyLinks.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ClearlyLinksComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(clearlyLinksServiceInstance.setClearlyLinks.bind(this));
        this.appendChild(tmplClearlyLinks.content.cloneNode(true));
    }
}

customElements.define("app-clearly-links", ClearlyLinksComponent);

"use strict";

const tmplClickFacilite = document.createElement("template");

tmplClickFacilite.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ClickFaciliteComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(clickFaciliteServiceInstance.setClickFacilite.bind(this));
        this.appendChild(tmplClickFacilite.content.cloneNode(true));
    }
}

customElements.define("app-click-facilite", ClickFaciliteComponent);

"use strict";

const tmplColorContrast = document.createElement("template");

tmplColorContrast.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ColorContrastComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(colorContrastServiceInstance.setColorsContrasts.bind(this));
        this.appendChild(tmplColorContrast.content.cloneNode(true));
    }
}

customElements.define("app-color-contrast", ColorContrastComponent);

"use strict";

const tmplColourTheme = document.createElement("template");

tmplColourTheme.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ColourThemeComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(colourThemeServiceInstance.setColourTheme.bind(this));
        this.appendChild(tmplColourTheme.content.cloneNode(true));
    }
}

customElements.define("app-colour-theme", ColourThemeComponent);

"use strict";

const tmplCursorAspect = document.createElement("template");

tmplCursorAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class CursorAspectComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(cursorAspectServiceInstance.setCursor.bind(this));
        this.appendChild(tmplCursorAspect.content.cloneNode(true));
    }
}

customElements.define("app-cursor-aspect", CursorAspectComponent);

"use strict";

const tmplDeleteBackgroundImages = document.createElement("template");

tmplDeleteBackgroundImages.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class DeleteBackgroundImagesComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages.bind(this));
        this.appendChild(tmplDeleteBackgroundImages.content.cloneNode(true));
    }
}

customElements.define("app-delete-background-images", DeleteBackgroundImagesComponent);

"use strict";

const tmplFocusAspect = document.createElement("template");

tmplFocusAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FocusAspectComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(focusAspectServiceInstance.setFocus.bind(this));
        this.appendChild(tmplFocusAspect.content.cloneNode(true));
    }
}

customElements.define("app-focus-aspect", FocusAspectComponent);

"use strict";

const tmplFontFamily = document.createElement("template");

tmplFontFamily.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FontFamilyComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(fontFamilyServiceInstance.setFontFamily.bind(this));
        this.appendChild(tmplFontFamily.content.cloneNode(true));
    }
}

customElements.define("app-font-family", FontFamilyComponent);

"use strict";

const tmplLinkStyle = document.createElement("template");

tmplLinkStyle.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class LinkStyleComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(linkStyleServiceInstance.setLinkStyle.bind(this));
        this.appendChild(tmplLinkStyle.content.cloneNode(true));
    }
}

customElements.define("app-link-style", LinkStyleComponent);

"use strict";

const tmplMagnifier = document.createElement("template");

tmplMagnifier.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class MagnifierComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(magnifierServiceInstance.setMagnifier.bind(this));
        this.appendChild(tmplMagnifier.content.cloneNode(true));
    }
}

customElements.define("app-magnifier", MagnifierComponent);

"use strict";

const tmplMarginAlign = document.createElement("template");

tmplMarginAlign.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class MarginAlignComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(marginAlignServiceInstance.setMargin.bind(this));
        this.appendChild(tmplMarginAlign.content.cloneNode(true));
    }
}

customElements.define("app-margin-align", MarginAlignComponent);

"use strict";

const tmplNavigationAuto = document.createElement("template");

tmplNavigationAuto.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class NavigationAutoComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(navigationAutoServiceInstance.setNavigationAuto.bind(this));
        this.appendChild(tmplNavigationAuto.content.cloneNode(true));
    }
}

customElements.define("app-navigation-auto", NavigationAutoComponent);

"use strict";

const tmplNavigationButtons = document.createElement("template");

tmplNavigationButtons.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class NavigationButtonsComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(navigationButtonsServiceInstance.setNavigationButtons.bind(this));
        this.appendChild(tmplNavigationButtons.content.cloneNode(true));
    }
}

customElements.define("app-navigation-buttons", NavigationButtonsComponent);

"use strict";

const tmplReadAloud = document.createElement("template");

tmplReadAloud.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ReadAloudComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(readAloudServiceInstance.setReadAloud.bind(this));
        this.appendChild(tmplReadAloud.content.cloneNode(true));
    }
}

customElements.define("app-read-aloud", ReadAloudComponent);

"use strict";

const tmplReadingGuide = document.createElement("template");

tmplReadingGuide.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ReadingGuideComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(readingGuideServiceInstance.setReadingMaskGuide.bind(this));
        this.appendChild(tmplReadingGuide.content.cloneNode(true));
    }
}

customElements.define("app-reading-guide", ReadingGuideComponent);

"use strict";

const tmplScrollType = document.createElement("template");

tmplScrollType.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ScrollTypeComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(scrollTypeServiceInstance.setScrollType.bind(this));
        this.appendChild(tmplScrollType.content.cloneNode(true));
    }
}

customElements.define("app-scroll-type", ScrollTypeComponent);

"use strict";

const tmplScroll = document.createElement("template");

tmplScroll.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ScrollComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(scrollServiceInstance.setScroll.bind(this));
        this.appendChild(tmplScroll.content.cloneNode(true));
    }
}

customElements.define("app-scroll", ScrollComponent);

"use strict";

const tmplSkipToContent = document.createElement("template");

tmplSkipToContent.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class SkipToContentComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(skipToContentServiceInstance.setSkipToContent.bind(this));
        this.appendChild(tmplSkipToContent.content.cloneNode(true));
    }
}

customElements.define("app-skip-to-content", SkipToContentComponent);

"use strict";

const tmplStopAnimations = document.createElement("template");

tmplStopAnimations.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n</div>\n`;

class StopAnimationsComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(stopAnimationsServiceInstance.setStopAnimations.bind(this));
        this.appendChild(tmplStopAnimations.content.cloneNode(true));
    }
}

customElements.define("app-stop-animations", StopAnimationsComponent);

"use strict";

const tmplIncreaseTextSize = document.createElement("template");

tmplIncreaseTextSize.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class IncreaseTextSizeComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(textSizeServiceInstance.setFontSize.bind(this));
        this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
    }
}

customElements.define("app-text-size", IncreaseTextSizeComponent);

"use strict";

const tmplSpacingText = document.createElement("template");

tmplSpacingText.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class TextSpacingComponent extends AbstractSetting {
    constructor() {
        super();
        this.setCallback(textSpacingServiceInstance.setSpacingText.bind(this));
        this.appendChild(tmplSpacingText.content.cloneNode(true));
    }
}

customElements.define("app-text-spacing", TextSpacingComponent);

"use strict";

const tmplTextTransform = document.createElement("template");

tmplTextTransform.innerHTML = `\n<style>\n\t\tapp-text-transform {\n\t\t\t\tmargin-bottom: 1rem;\n\t\t}\n</style>\n<button type="button" id="normal-btn" data-i18n="default"></button>\n<button type="button" id="first-letter-btn" data-i18n="firstLetter"></button>\n<button type="button" id="lowercase-btn" data-i18n="lowercase"></button>\n<button type="button" id="uppercase-btn" data-i18n="uppercase"></button>\n`;

class TextTransformComponent extends HTMLElement {
    bodyElt=null;
    normalBtn=null;
    firstLetterBtn=null;
    lowercaseBtn=null;
    uppercaseBtn=null;
    handler;
    constructor() {
        super();
        this.appendChild(tmplTextTransform.content.cloneNode(true));
        this.normalBtn = this.querySelector("#normal-btn");
        this.firstLetterBtn = this.querySelector("#first-letter-btn");
        this.lowercaseBtn = this.querySelector("#lowercase-btn");
        this.uppercaseBtn = this.querySelector("#uppercase-btn");
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.bodyElt = document.body;
        this.normalBtn?.addEventListener("click", this.handler);
        this.firstLetterBtn?.addEventListener("click", this.handler);
        this.lowercaseBtn?.addEventListener("click", this.handler);
        this.uppercaseBtn?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.normalBtn?.removeEventListener("click", this.handler);
        this.firstLetterBtn?.removeEventListener("click", this.handler);
        this.lowercaseBtn?.removeEventListener("click", this.handler);
        this.uppercaseBtn?.removeEventListener("click", this.handler);
    }
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.currentTarget) {
              case this.normalBtn:
                this.bodyElt.style.textTransform = ``;
                break;

              case this.firstLetterBtn:
                this.bodyElt.style.textTransform = `capitalize`;
                break;

              case this.lowercaseBtn:
                this.bodyElt.style.textTransform = `lowercase`;
                break;

              case this.uppercaseBtn:
                this.bodyElt.style.textTransform = `uppercase`;
                break;
            }
        }
    };
}

customElements.define("app-text-transform", TextTransformComponent);

"use strict";

const btnModalLayout = document.createElement("template");

btnModalLayout.innerHTML = `\n\t<button type="button" class="btn btn-primary pe-4 sc-btn-modal">\n\t\t<app-icon data-name="Plus_small"></app-icon>\n\t</button>`;

class BtnModalComponent extends HTMLElement {
    static observedAttributes=[ "data-name", "data-disabled" ];
    modalBtn=null;
    settingName=null;
    indexValue=null;
    disabled=false;
    handler;
    constructor() {
        super();
        this.disabled = this.dataset?.disabled === "true" || this.disabled;
        this.appendChild(btnModalLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.modalBtn = this.querySelector("button");
        this.modalBtn?.addEventListener("click", this.handler);
        this.modalBtn.disabled = this.disabled;
    }
    disconnectedCallback() {
        this.modalBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-name" === name) {
            this.settingName = newValue;
        }
    }
    setA11yName=label => {
        let span = document.createElement("span");
        span.classList.add("visually-hidden");
        span.innerText = label;
        this.modalBtn?.appendChild(span);
        this.modalBtn.setAttribute("title", label);
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.currentTarget) {
              case this.modalBtn:
                let clickEvent = new CustomEvent("changeRoute", {
                    bubbles: true,
                    detail: {
                        route: PAGE_EDIT_SETTING,
                        setting: this.settingName
                    }
                });
                this.modalBtn?.dispatchEvent(clickEvent);
                break;
            }
        }
    };
}

customElements.define("app-btn-modal", BtnModalComponent);

"use strict";

const btnSettingLayout = document.createElement("template");

btnSettingLayout.innerHTML = `\n\t<button type="button" class="sc-btn-setting btn btn-primary flex-column align-items-start justify-content-between w-100 px-2">\n\t\t<span class="d-flex align-items-start gap-1">\n\t\t\t<app-icon data-size="1.5em"></app-icon>\n\t\t\t<span class="sc-btn-setting__name text-start lh-base"></span>\n\t\t</span>\n\t\t<span class="sc-btn-setting__values d-flex gap-1 align-items-center justify-content-center mt-2 mb-0 w-100"></span>\n\t</button>\n`;

class BtnSettingComponent extends HTMLElement {
    static observedAttributes=[ "data-values", "data-active-value", "data-name", "data-disabled" ];
    settingBtn=null;
    btnContentSlots=null;
    index=0;
    value;
    name;
    slot="";
    separator=",";
    settingsList=[];
    disabled=false;
    handler;
    constructor() {
        super();
        this.disabled = this.dataset?.disabled === "true" || this.disabled;
        this.appendChild(btnSettingLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("button");
        this.btnContentSlots = this.querySelector(".sc-btn-setting__values");
        this.settingBtn.addEventListener("click", this.handler);
        this.setDisabledState();
    }
    disconnectedCallback() {
        this.settingBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-values" === name) {
            this.settingsList = newValue.split(this.separator);
        }
        if ("data-active-value" === name) {
            this.setIndex(Number(newValue));
        }
        if ("data-name" === name) {
            const settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
            this.name = settingName;
            const span = this.querySelector(".sc-btn-setting__name");
            const icon = this.querySelector("app-icon");
            span.innerText = i18nServiceInstance.getMessage(`setting_${this.name}`);
            icon?.setAttribute("data-name", this.name);
            this.setTitle();
        }
        if ("data-disabled" === name) {
            this.disabled = newValue === "true";
            this.setDisabledState();
        }
    }
    getValueLabel=value => {
        if (value?.includes("_")) {
            let arrayValues = [];
            value.split("_").forEach((item => {
                arrayValues.push(i18nServiceInstance.getMessage(item));
            }));
            return i18nServiceInstance.getMessage(`${this.name}_values`, arrayValues);
        } else {
            return i18nServiceInstance.getMessage(`${this.name}_${value}`);
        }
    };
    setTitle=() => {
        const settingName = i18nServiceInstance.getMessage(`setting_${this.name}`);
        const settingsNumber = this.settingsList.length;
        if (settingsNumber > 0) {
            const currentValueLabel = this.getValueLabel(this.value);
            const nextValueIndex = settingsNumber === this.index + 1 ? 0 : this.index + 1;
            const nextValueLabel = this.getValueLabel(this.settingsList[nextValueIndex]);
            let content = "";
            if (currentValueLabel === "active") {
                content = i18nServiceInstance.getMessage("multiclicToggleOn");
            } else if (nextValueLabel === "active") {
                content = i18nServiceInstance.getMessage("multiclicToggleOff");
            } else {
                const currentIndex = this.index + 1;
                content = i18nServiceInstance.getMessage("multiclic", [ currentValueLabel, String(currentIndex), String(settingsNumber), nextValueLabel, String(nextValueIndex + 1) ]);
            }
            [ "title", "aria-label" ].forEach((attribute => {
                this.settingBtn.setAttribute(attribute, `${settingName}${content}`);
            }));
        }
    };
    setIndex=index => {
        if (index?.toString()) {
            this.index = index;
        } else {
            let i = this.index + 1;
            this.index = i >= this.settingsList.length ? 0 : i;
            if (!this.settingsList[this.index]) {
                let i = this.index + 1;
                this.index = i >= this.settingsList.length ? 0 : i;
            }
        }
        if (this.index === 0) {
            this.settingBtn?.classList.add("sc-btn-setting--default");
        } else {
            this.settingBtn?.classList.remove("sc-btn-setting--default");
        }
        this.calculateList();
    };
    setDisabledState=() => {
        if (this.settingBtn) {
            this.settingBtn.disabled = this.disabled;
        }
    };
    calculateList=() => {
        this.slot = "";
        this.settingsList.forEach(((value, index) => {
            if (value) {
                let point = '<span class="sc-btn-setting__value rounded-circle"></span>';
                if (index === this.index) {
                    point = '<span class="sc-btn-setting__value sc-btn-setting__current-value rounded-circle"></span>';
                    this.value = value;
                }
                this.slot = `${this.slot}${point}`;
            }
        }));
        this.btnContentSlots.innerHTML = this.slot;
        this.setTitle();
    };
    createHandler=() => event => {
        if (event.type === "click") {
            this.setIndex();
            let clickEvent = new CustomEvent("changeSettingEvent", {
                bubbles: true,
                detail: {
                    value: this.value,
                    index: this.index
                }
            });
            this.settingBtn?.dispatchEvent(clickEvent);
        }
    };
}

customElements.define("app-btn-setting", BtnSettingComponent);

"use strict";

const headerLayout = document.createElement("template");

headerLayout.innerHTML = `\n\t<header class="d-flex justify-content-between bg-secondary px-3 py-2">\n\t\t<div class="d-flex align-items-center">\n\t\t\t<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="previous">\n\t\t\t\t<span class="visually-hidden" data-i18n="previous"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\n\t\t\t<span id="page-block-title" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">\n\t\t\t\t<app-icon id="mode-icon" class="border-end border-white pe-1"></app-icon>\n\t\t\t\t<app-icon id="page-icon" data-name="Settings"></app-icon>\n\t\t\t\t<span id="page-title"></span>\n\t\t\t</span>\n\n\t\t\t<span id="app-title" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">\n\t\t\t\t<app-icon data-name="Accessibility"></app-icon>\n\t\t\t\t<span data-i18n="mainTitle"></span>\n\t\t\t\t<span class="text-primary">+</span>\n\t\t\t</span>\n\t\t</div>\n\t\t<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">\n\t\t\t\t<span class="visually-hidden" data-i18n="close"></span>\n\t\t\t\t<app-icon data-name="Reduire_C+"></app-icon>\n\t\t</button>\n\t</header>\n`;

class HeaderComponent extends HTMLElement {
    static observedAttributes=[ "data-display", "data-page-title", "data-page-icon", "data-selected-mode" ];
    closeBtn=null;
    prevBtn=null;
    appTitle=null;
    pageBlockTitle=null;
    pageTitle=null;
    modeIcon=null;
    pageIcon=null;
    display="primary";
    handler;
    constructor() {
        super();
        this.appendChild(headerLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.closeBtn = this.querySelector("#close-toolbar");
        this.prevBtn = this.querySelector("#prev-toolbar");
        this.appTitle = this.querySelector("#app-title");
        this.pageBlockTitle = this.querySelector("#page-block-title");
        this.pageTitle = this.querySelector("#page-title");
        this.modeIcon = this.querySelector("#mode-icon");
        this.pageIcon = this.querySelector("#page-icon");
        this.displayMode(this.display);
        this.closeBtn.addEventListener("click", this.handler);
        this.prevBtn?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.closeBtn?.removeEventListener("click", this.handler);
        this.prevBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-display" === name) {
            this.displayMode(newValue);
        }
        if ("data-page-title" === name && newValue) {
            this.pageTitle.innerText = i18nServiceInstance.getMessage(newValue);
        }
        if ("data-page-icon" === name) {
            newValue.length === 0 ? this.pageIcon.classList.add("d-none") : this.pageIcon?.setAttribute("data-name", newValue);
        }
        if ("data-selected-mode" === name) {
            this.modeIcon?.setAttribute("data-name", `${newValue}_border`);
        }
    }
    displayMode=mode => {
        this.prevBtn?.classList.toggle("d-none", mode === "primary");
        this.pageBlockTitle?.classList.toggle("d-none", mode === "primary");
        this.appTitle?.classList.toggle("d-none", mode === "secondary");
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.currentTarget) {
              case this.closeBtn:
                this.closeButtonEvent();
                break;

              case this.prevBtn:
                this.prevButtonEvent();
                break;
            }
        }
    };
    closeButtonEvent=() => {
        let clickCloseEvent = new CustomEvent("closeEvent", {
            bubbles: true
        });
        this.closeBtn?.dispatchEvent(clickCloseEvent);
    };
    prevButtonEvent=() => {
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: routeServiceInstance.historyRoute[routeServiceInstance.historyRoute.length - 1]
            }
        });
        this.prevBtn?.dispatchEvent(clickEvent);
    };
}

customElements.define("app-header", HeaderComponent);

"use strict";

const iconLayout = document.createElement("template");

iconLayout.innerHTML = `<svg fill="currentColor" aria-hidden="true" focusable="false"><use/></svg>`;

class IconComponent extends HTMLElement {
    static observedAttributes=[ "data-name" ];
    sprite="";
    icon="";
    size="1.5em";
    constructor() {
        super();
        this.sprite = iconsServiceInstance.path;
        this.icon = this.dataset?.name || this.icon;
        this.size = this.dataset?.size || this.size;
        this.appendChild(iconLayout.content.cloneNode(true));
    }
    connectedCallback() {
        let svg = this.querySelector("svg");
        svg?.setAttribute("width", this.size);
        svg?.setAttribute("height", this.size);
        let use = this.querySelector("use");
        use?.setAttribute("href", `${this.sprite}#ic_${this.icon}`);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        let use = this.querySelector("use");
        if ("data-name" === name) {
            use?.setAttribute("href", `${this.sprite}#ic_${newValue}`);
        }
    }
}

customElements.define("app-icon", IconComponent);

"use strict";

const selectEditValueLayout = document.createElement("template");

selectEditValueLayout.innerHTML = `\n\t<div class="d-flex flex-column" role="group">\n\t\t<div class="d-flex align-items-center justify-content-between gap-2">\n\t\t\t<button type="button" class="btn btn-icon btn-primary">\n\t\t\t\t<span class="visually-hidden" data-i18n="prevValue"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\t\t\t<output></output>\n\t\t\t<button type="button" class="btn btn-icon btn-primary">\n\t\t\t\t<span class="visually-hidden" data-i18n="nextValue"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_right"></app-icon>\n\t\t\t</button>\n\t\t</div>\n\t</div>\n`;

class SelectEditValueComponent extends HTMLElement {
    static observedAttributes=[ "data-name", "data-index", "data-setting-values", "data-label" ];
    selectedValue=null;
    btnPrevValue=null;
    btnNextValue=null;
    name="";
    values=[];
    currentIndex=null;
    currentValue=null;
    handler;
    constructor() {
        super();
        this.name = this.dataset?.name || this.name;
        this.appendChild(selectEditValueLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectedValue = this.querySelector("output");
        this.btnPrevValue = this.querySelector("button:first-of-type");
        this.btnNextValue = this.querySelector("button:last-of-type");
        this.btnPrevValue?.addEventListener("click", this.handler);
        this.btnNextValue?.addEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-index" === name) {
            this.currentIndex = Number(newValue);
            this.moveEditValue(this.currentIndex);
        }
        if ("data-setting-values" === name) {
            this.values = newValue.split(",");
        }
        if ("data-label" === name) {
            let groupElement = this.querySelector('div[role="group"]');
            let selectLabel = document.createElement("label");
            selectLabel.innerText = i18nServiceInstance.getMessage(`${this.name}_label`);
            selectLabel.setAttribute("id", `${PREFIX}${stringServiceInstance.normalizeID(this.name)}`);
            groupElement.insertBefore(selectLabel, groupElement.firstChild);
            groupElement.setAttribute("aria-labelledby", `${PREFIX}${stringServiceInstance.normalizeID(this.name)}`);
        }
    }
    moveEditValue=index => {
        this.currentIndex = index;
        this.btnPrevValue.disabled = false;
        this.btnNextValue.disabled = false;
        if (this.currentIndex <= 0) {
            this.currentIndex = 0;
            this.btnPrevValue.disabled = true;
            this.btnNextValue.disabled = false;
        } else if (this.currentIndex >= this.values.length - 1) {
            this.currentIndex = this.values.length - 1;
            this.btnPrevValue.disabled = false;
            this.btnNextValue.disabled = true;
        }
        this.currentValue = this.values[this.currentIndex];
        if (this.currentValue?.includes("_")) {
            let arrayValues = [];
            this.currentValue.split("_").forEach((item => {
                arrayValues.push(i18nServiceInstance.getMessage(item));
            }));
            this.selectedValue.innerText = i18nServiceInstance.getMessage(`${this.name}_values`, arrayValues);
        } else {
            let message = `${this.name}_${this.currentValue}`;
            this.selectedValue.innerText = i18nServiceInstance.getMessage(message);
        }
        this.changeEditValue();
    };
    createHandler=() => event => {
        if (event.type === "click") {
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
    changeEditValue=() => {
        let editValueEvent = new CustomEvent(`editSetting${stringServiceInstance.capitalizeFirstLetter(this.name)}`, {
            bubbles: true,
            detail: {
                newValue: this.currentValue
            }
        });
        this.dispatchEvent(editValueEvent);
    };
}

customElements.define("app-select-edit-value", SelectEditValueComponent);

"use strict";

const selectModeLayout = document.createElement("template");

selectModeLayout.innerHTML = `\n\t<input type="radio" name="modes" class="sc-select-mode__input">\n\t<label class="d-flex flex-column align-items-start gap-1 p-2 sc-select-mode__label btn btn-tertiary">\n\t\t<div class="d-flex align-items-center gap-2 w-100">\n\t\t\t<app-icon data-size="2em"></app-icon>\n\t\t\t<span class="fs-5 text flex-fill"></span>\n\t\t</div>\n\t\t<span class="fs-6 fw-normal m-0 mb-3"></span>\n\t\t<button class="btn btn-primary" type="submit"></button>\n\t</label>\n`;

class SelectModeComponent extends HTMLElement {
    inputElement=null;
    submitBtnElement=null;
    iconElement=null;
    labelElement=null;
    textElement=null;
    descriptionElement=null;
    label="";
    checked=false;
    disabled=false;
    constructor() {
        super();
        this.label = this.dataset?.label || this.label;
        this.checked = this.dataset?.checked === "true" || this.checked;
        this.disabled = this.dataset?.disabled === "true" || this.disabled;
        this.appendChild(selectModeLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.inputElement = this.querySelector("input");
        this.submitBtnElement = this.querySelector("button");
        this.labelElement = this.querySelector("label");
        this.iconElement = this.querySelector("app-icon");
        this.textElement = this.querySelector("app-icon + span");
        this.descriptionElement = this.querySelector("label > span");
        this.inputElement.id = stringServiceInstance.normalizeID(this.label);
        this.inputElement.value = this.label;
        this.inputElement.checked = this.checked;
        this.inputElement.disabled = this.disabled;
        this.submitBtnElement.innerText = i18nServiceInstance.getMessage(this.checked ? "resetThisMode" : "validateThisMode");
        this.submitBtnElement.title = this.checked ? i18nServiceInstance.getMessage("resetThisModeTitle") : "";
        this.labelElement?.setAttribute("for", stringServiceInstance.normalizeID(this.label));
        this.iconElement?.setAttribute("data-name", `${this.label}_border`);
        this.textElement.innerText = i18nServiceInstance.getMessage(`${this.label}Name`);
        this.descriptionElement.innerText = i18nServiceInstance.getMessage(`${this.label}Description`);
        if (this.checked) {
            this.setActiveState();
        }
    }
    setActiveState=() => {
        let span = document.createElement("span");
        span.classList.add("fs-5", "text");
        span.innerText = i18nServiceInstance.getMessage("activeMode");
        this.querySelector("div").appendChild(span);
    };
}

customElements.define("app-select-mode", SelectModeComponent);

"use strict";

const editSettingLayout = document.createElement("template");

editSettingLayout.innerHTML = `\n\t<div class="gap-1 p-3 text-body">\n\t\t<div class="d-flex align-items-center gap-2 mb-2">\n\t\t\t<app-icon id="edit-setting-icon" data-size="2em"></app-icon>\n\t\t\t<p id="edit-setting-title" class="fs-4 fw-bold mb-0"></p>\n\t\t</div>\n\n\t\t<p id="edit-setting-instruction" class="mb-4"></p>\n\n\t\t<app-edit-capital-letters class="sc-edit-setting__setting"></app-edit-capital-letters>\n\t\t<app-edit-clearly-links class="sc-edit-setting__setting"></app-edit-clearly-links>\n\t\t<app-edit-click-facilite class="sc-edit-setting__setting"></app-edit-click-facilite>\n\t\t<app-edit-color-contrast class="sc-edit-setting__setting"></app-edit-color-contrast>\n\t\t<app-edit-colour-theme class="sc-edit-setting__setting"></app-edit-colour-theme>\n\t\t<app-edit-cursor-aspect class="sc-edit-setting__setting"></app-edit-cursor-aspect>\n\t\t<app-edit-delete-background-images class="sc-edit-setting__setting"></app-edit-delete-background-images>\n\t\t<app-edit-focus-aspect class="sc-edit-setting__setting"></app-edit-focus-aspect>\n\t\t<app-edit-font-family class="sc-edit-setting__setting"></app-edit-font-family>\n\t\t<app-edit-link-style class="sc-edit-setting__setting"></app-edit-link-style>\n\t\t<app-edit-magnifier class="sc-edit-setting__setting"></app-edit-magnifier>\n\t\t<app-edit-margin-align class="sc-edit-setting__setting"></app-edit-margin-align>\n\t\t<app-edit-navigation-auto class="sc-edit-setting__setting"></app-edit-navigation-auto>\n\t\t<app-edit-read-aloud class="sc-edit-setting__setting"></app-edit-read-aloud>\n\t\t<app-edit-reading-guide class="sc-edit-setting__setting"></app-edit-reading-guide>\n\t\t<app-edit-scroll-type class="sc-edit-setting__setting"></app-edit-scroll-type>\n\t\t<app-edit-scroll class="sc-edit-setting__setting"></app-edit-scroll>\n\t\t<app-edit-stop-animations class="sc-edit-setting__setting"></app-edit-stop-animations>\n\t\t<app-edit-text-size class="sc-edit-setting__setting"></app-edit-text-size>\n\t\t<app-edit-text-spacing class="sc-edit-setting__setting"></app-edit-text-spacing>\n\t</div>\n`;

class EditSettingComponent extends HTMLElement {
    static observedAttributes=[ "data-setting" ];
    settingIcon=null;
    settingTitle=null;
    settingInstruction=null;
    settingName=null;
    settingsDictionnary=[];
    constructor() {
        super();
        this.appendChild(editSettingLayout.content.cloneNode(true));
        this.querySelectorAll(".sc-edit-setting__setting").forEach((element => {
            element.classList.add("d-none");
            this.settingsDictionnary.push({
                name: stringServiceInstance.normalizeSettingName(element.tagName),
                element: element.tagName
            });
        }));
    }
    connectedCallback() {
        this.settingIcon = this.querySelector("#edit-setting-icon");
        this.settingTitle = this.querySelector("#edit-setting-title");
        this.settingInstruction = this.querySelector("#edit-setting-instruction");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-setting" === name) {
            this.settingName = stringServiceInstance.normalizeSettingCamelCase(newValue);
            this.settingIcon?.setAttribute("data-name", this.settingName);
            this.settingTitle.innerText = i18nServiceInstance.getMessage(`setting_${this.settingName}`);
            this.settingInstruction.innerText = i18nServiceInstance.getMessage(`setting_${this.settingName}_instruction`);
            this.displaySetting(`edit-${newValue}`);
            localStorageServiceInstance.setItem("current-setting", newValue);
        }
    }
    displaySetting=settingName => {
        this.querySelector(".sc-edit-setting__setting:not(.d-none)")?.classList.add("d-none");
        const setting = this.settingsDictionnary.find((setting => settingName === setting.name));
        this.querySelector(setting.element).classList.remove("d-none");
    };
}

customElements.define("app-edit-setting", EditSettingComponent);

"use strict";

const editCapitalLettersLayout = document.createElement("template");

editCapitalLettersLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="capitalLetters"></app-select-edit-value>\n\t</form>\n`;

class EditCapitalLettersComponent extends HTMLElement {
    selectCapitalLettersElement=null;
    settingValues=null;
    capitalLettersValues=[ DEFAULT_VALUE, "uppercase", "capitalize" ];
    handler;
    constructor() {
        super();
        this.appendChild(editCapitalLettersLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectCapitalLettersElement = this.querySelector("app-select-edit-value");
        this.selectCapitalLettersElement.addEventListener("editSettingCapitalLetters", this.handler);
        this.selectCapitalLettersElement.setAttribute("data-setting-values", this.capitalLettersValues.join(","));
        modeOfUseServiceInstance.getSetting("capitalLetters").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.capitalLettersValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectCapitalLettersElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setCapitalLetters=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("capitalLetters", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("capitalLetters", 3, value);
        }
        capitalLettersServiceInstance.setCapitalLetters(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingCapitalLetters":
            this.setCapitalLetters(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-capital-letters", EditCapitalLettersComponent);

"use strict";

const editClearlyLinksLayout = document.createElement("template");

editClearlyLinksLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="clearlyLinks"></app-select-edit-value>\n\t</form>\n`;

class EditClearlyLinksComponent extends HTMLElement {
    selectClearlyLinksElement=null;
    settingValues=null;
    clearlyLinksValues=[ DEFAULT_VALUE, "bold_underline", "bold_boxed" ];
    handler;
    constructor() {
        super();
        this.appendChild(editClearlyLinksLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectClearlyLinksElement = this.querySelector("app-select-edit-value");
        this.selectClearlyLinksElement.addEventListener("editSettingClearlyLinks", this.handler);
        this.selectClearlyLinksElement.setAttribute("data-setting-values", this.clearlyLinksValues.join(","));
        modeOfUseServiceInstance.getSetting("clearlyLinks").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.clearlyLinksValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectClearlyLinksElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setClearlyLinks=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("clearlyLinks", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("clearlyLinks", 3, value);
        }
        clearlyLinksServiceInstance.setClearlyLinks(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingClearlyLinks":
            this.setClearlyLinks(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-clearly-links", EditClearlyLinksComponent);

"use strict";

const editClickFaciliteLayout = document.createElement("template");

editClickFaciliteLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-click-type" data-name="clickType"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-click-delay" class="d-none" data-name="clickDelay"></app-select-edit-value>\n\t</form>\n`;

class EditClickFaciliteComponent extends HTMLElement {
    selectClickTypeElement=null;
    selectClickDelayElement=null;
    settingValues=null;
    clickTypeValue="";
    clickDelayValue="";
    clickTypeValues=[ `clickType_${DEFAULT_VALUE}`, `clickType_${CLICK_FACILITE_BIG_ZONE}`, `clickType_${CLICK_FACILITE_LONG_CLICK}`, `clickType_${CLICK_FACILITE_AUTO_CLICK}` ];
    clickDelayValues=[ "clickDelay_delay1", "clickDelay_delay2", "clickDelay_delay3", "clickDelay_delay6" ];
    handler;
    constructor() {
        super();
        this.appendChild(editClickFaciliteLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectClickTypeElement = this.querySelector(`#${PREFIX}select-click-type`);
        this.selectClickDelayElement = this.querySelector(`#${PREFIX}select-click-delay`);
        this.selectClickTypeElement.addEventListener("editSettingClickType", this.handler);
        this.selectClickDelayElement.addEventListener("editSettingClickDelay", this.handler);
        this.selectClickTypeElement.setAttribute("data-setting-values", this.clickTypeValues.join(","));
        this.selectClickDelayElement.setAttribute("data-setting-values", this.clickDelayValues.join(","));
        modeOfUseServiceInstance.getSetting("clickFacilite").then((result => {
            this.settingValues = result.values.split(",");
            this.clickTypeValue = this.settingValues[result.valueSelected].split("_")[0];
            this.clickDelayValue = this.settingValues[result.valueSelected].split("_")[1];
            const currentIndexClickType = this.clickTypeValues.findIndex((i => i === `clickType_${this.clickTypeValue}`));
            const currentIndexClickDelay = this.clickDelayValue ? this.clickDelayValues.findIndex((i => i === `clickDelay_${this.clickDelayValue}`)) : 0;
            this.selectClickTypeElement.setAttribute("data-index", currentIndexClickType.toString());
            this.selectClickDelayElement.setAttribute("data-index", currentIndexClickDelay.toString());
        }));
    }
    setClickFacilite=() => {
        let value = "";
        if (this.clickTypeValue === DEFAULT_VALUE || this.clickTypeValue === CLICK_FACILITE_BIG_ZONE) {
            value = this.clickTypeValue;
        } else {
            value = `${this.clickTypeValue}_${this.clickDelayValue}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("clickFacilite", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("clickFacilite", 3, value);
        }
        clickFaciliteServiceInstance.setClickFacilite(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingClickType":
            this.clickTypeValue = event.detail.newValue.split("_")[1];
            this.selectClickDelayElement.classList.toggle("d-none", this.clickTypeValue === DEFAULT_VALUE || this.clickTypeValue === CLICK_FACILITE_BIG_ZONE);
            this.setClickFacilite();
            break;

          case "editSettingClickDelay":
            this.clickDelayValue = event.detail.newValue.split("_")[1];
            this.setClickFacilite();
            break;
        }
    };
}

customElements.define("app-edit-click-facilite", EditClickFaciliteComponent);

"use strict";

const editColorContrastLayout = document.createElement("template");

editColorContrastLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="colorContrast"></app-select-edit-value>\n\t</form>\n`;

class EditColorContrastComponent extends HTMLElement {
    selectColorContrastElement=null;
    settingValues=null;
    colorContrastValues=[ DEFAULT_VALUE, "reinforcedContrasts", "white_black", "black_ivory", "white_red", "black_yellow", "white_blue", "yellow_blue", "black_green" ];
    handler;
    constructor() {
        super();
        this.appendChild(editColorContrastLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectColorContrastElement = this.querySelector("app-select-edit-value");
        this.selectColorContrastElement.addEventListener("editSettingColorContrast", this.handler);
        this.selectColorContrastElement.setAttribute("data-setting-values", this.colorContrastValues.join(","));
        modeOfUseServiceInstance.getSetting("colorContrast").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.colorContrastValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectColorContrastElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setColorContrast=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("colorContrast", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("colorContrast", 3, value);
        }
        colorContrastServiceInstance.setColorsContrasts(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingColorContrast":
            this.setColorContrast(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-color-contrast", EditColorContrastComponent);

"use strict";

const editColourThemeLayout = document.createElement("template");

editColourThemeLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-3">\n\t\t<app-select-edit-value data-name="colourTheme"></app-select-edit-value>\n\t\t<output id="colourThemeValues" class="d-flex flex-column">\n\t\t</output>\n\t</form>\n`;

class EditColourThemeComponent extends HTMLElement {
    selectColourThemeElement=null;
    settingValues=null;
    colourThemeValues=[ DEFAULT_VALUE, "reinforcedContrasts", "white_black" ];
    handler;
    constructor() {
        super();
        this.appendChild(editColourThemeLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectColourThemeElement = this.querySelector("app-select-edit-value");
        this.selectColourThemeElement.addEventListener("editSettingColourTheme", this.handler);
        this.selectColourThemeElement.setAttribute("data-setting-values", this.colourThemeValues.join(","));
        modeOfUseServiceInstance.getSetting("colourTheme").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.colourThemeValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectColourThemeElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setColourTheme=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("colourTheme", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("colourTheme", 3, value);
        }
        colourThemeServiceInstance.setColourTheme(value);
    };
    displayValuesSelected=value => {
        this.querySelector("#colourThemeValues").innerHTML = "";
        let colourThemeValuesSelected = colourThemeServiceInstance.colourThemeDictionnary.find((o => o.name === value));
        let arrayValuesSelected = [ {
            key: "colourTheme_cursor",
            value: this.getValuesMessage(colourThemeValuesSelected.cursor.split("_"))
        }, {
            key: "colourTheme_focus",
            value: this.getValuesMessage(colourThemeValuesSelected.focus.split("_"))
        }, {
            key: "colourTheme_scroll",
            value: this.getValuesMessage(colourThemeValuesSelected.scroll.split("_"))
        } ];
        let linkColors = [];
        if (colourThemeValuesSelected.link.split("_")[0] === DEFAULT_VALUE) {
            linkColors = [ {
                key: "colourTheme_link",
                value: this.getValuesMessage([ DEFAULT_VALUE ])
            }, {
                key: "colourTheme_linkPointed",
                value: this.getValuesMessage([ DEFAULT_VALUE ])
            }, {
                key: "colourTheme_linkVisited",
                value: this.getValuesMessage([ DEFAULT_VALUE ])
            } ];
        } else {
            linkColors = [ {
                key: "colourTheme_link",
                value: this.getValuesMessage([ colourThemeValuesSelected.link.split("_")[0] ])
            }, {
                key: "colourTheme_linkPointed",
                value: this.getValuesMessage([ colourThemeValuesSelected.link.split("_")[1] ])
            }, {
                key: "colourTheme_linkVisited",
                value: this.getValuesMessage([ colourThemeValuesSelected.link.split("_")[2] ])
            } ];
        }
        arrayValuesSelected.concat(linkColors).forEach((message => {
            let span = document.createElement("span");
            if (message.value[0] === i18nServiceInstance.getMessage(DEFAULT_VALUE)) {
                span.innerText = i18nServiceInstance.getMessage(`${message.key}_${DEFAULT_VALUE}`);
            } else {
                span.innerText = i18nServiceInstance.getMessage(message.key, message.value);
            }
            this.querySelector("#colourThemeValues").appendChild(span);
        }));
    };
    getValuesMessage=values => {
        let message = [];
        values.forEach((value => {
            message.push(i18nServiceInstance.getMessage(value));
        }));
        return message;
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingColourTheme":
            this.setColourTheme(event.detail.newValue);
            this.displayValuesSelected(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-colour-theme", EditColourThemeComponent);

"use strict";

const editCursorAspectLayout = document.createElement("template");

editCursorAspectLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-cursor-size" data-name="cursorSize" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-cursor-color" class="d-none" data-name="cursorColor" data-label="true"></app-select-edit-value>\n\n\t\t<div class="d-flex flex-wrap gap-2 bg-light p-3" id="${PREFIX}example-cursor"></div>\n\t</form>\n`;

class EditCursorAspectComponent extends HTMLElement {
    selectCursorSizeElement=null;
    selectCursorColorElement=null;
    settingValues=null;
    cursorSizeValue="";
    cursorColorValue="";
    cursorSizeValues=[ `cursorSize_${DEFAULT_VALUE}`, "cursorSize_bigCursor", "cursorSize_hugeCursor" ];
    cursorColorValues=[ `cursorColor_${DEFAULT_VALUE}`, "cursorColor_white", "cursorColor_blue", "cursorColor_red", "cursorColor_yellow", "cursorColor_green", "cursorColor_black" ];
    handler;
    constructor() {
        super();
        this.appendChild(editCursorAspectLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectCursorSizeElement = this.querySelector(`#${PREFIX}select-cursor-size`);
        this.selectCursorColorElement = this.querySelector(`#${PREFIX}select-cursor-color`);
        this.selectCursorSizeElement.addEventListener("editSettingCursorSize", this.handler);
        this.selectCursorColorElement.addEventListener("editSettingCursorColor", this.handler);
        this.selectCursorSizeElement.setAttribute("data-setting-values", this.cursorSizeValues.join(","));
        this.selectCursorColorElement.setAttribute("data-setting-values", this.cursorColorValues.join(","));
        modeOfUseServiceInstance.getSetting("cursorAspect").then((result => {
            this.settingValues = result.values.split(",");
            this.cursorSizeValue = this.settingValues[result.valueSelected].split("_")[0];
            this.cursorColorValue = this.settingValues[result.valueSelected].split("_")[1];
            const currentIndexCursorSize = this.cursorSizeValues.findIndex((i => i === `cursorSize_${this.cursorSizeValue}`));
            const currentIndexCursorColor = this.cursorColorValues.findIndex((i => i === `cursorColor_${this.cursorColorValue}`));
            this.selectCursorSizeElement.setAttribute("data-index", currentIndexCursorSize.toString());
            this.selectCursorColorElement.setAttribute("data-index", currentIndexCursorColor.toString());
        }));
    }
    setCursorAspect=() => {
        let value = "";
        if (this.cursorSizeValue === DEFAULT_VALUE) {
            value = DEFAULT_VALUE;
            this.setExampleCursor(true);
        } else {
            value = `${this.cursorSizeValue}_${this.cursorColorValue}`;
            this.setExampleCursor();
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("cursorAspect", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("cursorAspect", 3, value);
        }
        cursorAspectServiceInstance.setCursor(value);
    };
    setExampleCursor=(deleteExample = false) => {
        let containerExample = this.querySelector(`#${PREFIX}example-cursor`);
        containerExample.innerHTML = "";
        if (deleteExample) {
            containerExample.innerText = i18nServiceInstance.getMessage("cursorAspect_empty_example");
        } else {
            let size = this.cursorSizeValue === "bigCursor" ? CURSOR_SIZE_BIG : CURSOR_SIZE_HUGE;
            const cursorArray = [ {
                name: "default",
                strokeWidth: 6
            }, {
                name: "pointer",
                strokeWidth: 6
            }, {
                name: "text",
                strokeWidth: 4
            } ];
            cursorArray.forEach((cursor => {
                const cursorSvg = cursorAspectServiceInstance.drawCursor(cursor.name, Number(size), this.cursorColorValue, cursor.strokeWidth);
                let cursorElt = (new DOMParser).parseFromString(cursorSvg, "text/html");
                containerExample.appendChild(cursorElt.documentElement.querySelector("svg"));
            }));
        }
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingCursorSize":
            this.cursorSizeValue = event.detail.newValue.split("_")[1];
            this.selectCursorColorElement.classList.toggle("d-none", this.cursorSizeValue === `cursorSize_${DEFAULT_VALUE}`);
            this.setCursorAspect();
            break;

          case "editSettingCursorColor":
            this.cursorColorValue = event.detail.newValue.split("_")[1];
            this.setCursorAspect();
            break;
        }
    };
}

customElements.define("app-edit-cursor-aspect", EditCursorAspectComponent);

"use strict";

const editDeleteBackgroundImagesLayout = document.createElement("template");

editDeleteBackgroundImagesLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="deleteBackgroundImages"></app-select-edit-value>\n\t</form>\n`;

class EditDeleteBackgroundImagesComponent extends HTMLElement {
    selectDeleteBgImgElement=null;
    settingValues=null;
    deleteBackgroundImagesValues=[ DEFAULT_VALUE, "backgroundTransparent", "backgroundForegroundTransparent" ];
    handler;
    constructor() {
        super();
        this.appendChild(editDeleteBackgroundImagesLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectDeleteBgImgElement = this.querySelector("app-select-edit-value");
        this.selectDeleteBgImgElement.addEventListener("editSettingDeleteBackgroundImages", this.handler);
        this.selectDeleteBgImgElement.setAttribute("data-setting-values", this.deleteBackgroundImagesValues.join(","));
        modeOfUseServiceInstance.getSetting("deleteBackgroundImages").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.deleteBackgroundImagesValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectDeleteBgImgElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setDeleteBackgroundImages=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("deleteBackgroundImages", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("deleteBackgroundImages", 3, value);
        }
        deleteBackgroundImagesServiceInstance.setDeleteBackgroundImages(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingDeleteBackgroundImages":
            this.setDeleteBackgroundImages(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-delete-background-images", EditDeleteBackgroundImagesComponent);

"use strict";

const editFocusAspectLayout = document.createElement("template");

editFocusAspectLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-focus-size" data-name="focusSize" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-focus-color" data-name="focusColor" data-label="true"></app-select-edit-value>\n\n\t\t<p>Exemple de texte avec le <span id="${PREFIX}example-focus">focus</span>.</p>\n\t</form>\n`;

class EditFocusAspectComponent extends HTMLElement {
    selectFocusSizeElement=null;
    selectFocusColorElement=null;
    settingValues=null;
    focusSizeValue="";
    focusColorValue="";
    focusSizeValues=[ `focusSize_${DEFAULT_VALUE}`, "focusSize_big", "focusSize_huge" ];
    focusColorValues=[ `focusColor_${DEFAULT_VALUE}`, "focusColor_white", "focusColor_blue", "focusColor_red", "focusColor_yellow", "focusColor_green", "focusColor_black" ];
    handler;
    constructor() {
        super();
        this.appendChild(editFocusAspectLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectFocusSizeElement = this.querySelector(`#${PREFIX}select-focus-size`);
        this.selectFocusColorElement = this.querySelector(`#${PREFIX}select-focus-color`);
        this.selectFocusSizeElement.addEventListener("editSettingFocusSize", this.handler);
        this.selectFocusColorElement.addEventListener("editSettingFocusColor", this.handler);
        this.selectFocusSizeElement.setAttribute("data-setting-values", this.focusSizeValues.join(","));
        this.selectFocusColorElement.setAttribute("data-setting-values", this.focusColorValues.join(","));
        modeOfUseServiceInstance.getSetting("focusAspect").then((result => {
            this.settingValues = result.values.split(",");
            this.focusSizeValue = this.settingValues[result.valueSelected]?.split("_")[0];
            this.focusColorValue = this.settingValues[result.valueSelected]?.split("_")[1];
            const currentIndexFocusSize = this.focusSizeValues.findIndex((i => i === `focusSize_${this.focusSizeValue}`));
            const currentIndexFocusColor = this.focusColorValues.findIndex((i => i === `focusColor_${this.focusColorValue}`));
            this.selectFocusSizeElement.setAttribute("data-index", currentIndexFocusSize.toString());
            this.selectFocusColorElement.setAttribute("data-index", currentIndexFocusColor.toString());
        }));
    }
    setFocusAspect=() => {
        let value = "";
        if (this.focusSizeValue === DEFAULT_VALUE && this.focusColorValue === DEFAULT_VALUE) {
            value = DEFAULT_VALUE;
        } else {
            value = `${this.focusSizeValue}_${this.focusColorValue}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("focusAspect", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("focusAspect", 3, value);
        }
        this.setExampleFocus();
        focusAspectServiceInstance.setFocus(value);
    };
    setExampleFocus=() => {
        let spanExample = this.querySelector(`#${PREFIX}example-focus`);
        let size = this.focusSizeValue;
        let color = this.focusColorValue;
        const styleFocusSize = size !== DEFAULT_VALUE ? size === "big" ? FOCUS_SIZE_BIG : FOCUS_SIZE_HUGE : "";
        const styleFocusColor = color !== DEFAULT_VALUE ? color : "";
        spanExample.style.outlineStyle = "solid";
        spanExample.style.outlineWidth = styleFocusSize;
        spanExample.style.outlineColor = styleFocusColor;
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingFocusSize":
            this.focusSizeValue = event.detail.newValue.split("_")[1];
            this.setFocusAspect();
            break;

          case "editSettingFocusColor":
            this.focusColorValue = event.detail.newValue.split("_")[1];
            this.setFocusAspect();
            break;
        }
    };
}

customElements.define("app-edit-focus-aspect", EditFocusAspectComponent);

"use strict";

const editFontFamilyLayout = document.createElement("template");

editFontFamilyLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="fontFamily"></app-select-edit-value>\n\t</form>\n`;

class EditFontFamilyComponent extends HTMLElement {
    selectFontFamilyElement=null;
    settingValues=null;
    fontFamilyValues=[ DEFAULT_VALUE, "AccessibleDfA", "B612Mono", "Airbus", "ComicSansMS", "LexandDeca", "Luciole", "SylexiadSans", "Verdana" ];
    handler;
    constructor() {
        super();
        this.appendChild(editFontFamilyLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectFontFamilyElement = this.querySelector("app-select-edit-value");
        this.selectFontFamilyElement.addEventListener("editSettingFontFamily", this.handler);
        this.selectFontFamilyElement.setAttribute("data-setting-values", this.fontFamilyValues.join(","));
        modeOfUseServiceInstance.getSetting("fontFamily").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.fontFamilyValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectFontFamilyElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setFontFamily=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("fontFamily", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("fontFamily", 3, value);
        }
        fontFamilyServiceInstance.setFontFamily(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingFontFamily":
            this.setFontFamily(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-font-family", EditFontFamilyComponent);

"use strict";

const editLinkStyleLayout = document.createElement("template");

editLinkStyleLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-color-link" data-name="linkColor" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-color-active-link" data-name="linkPointedColor" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-color-visited-link" data-name="linkVisitedColor" data-label="true"></app-select-edit-value>\n\t</form>\n`;

class EditLinkStyleComponent extends HTMLElement {
    selectColorLinkElement=null;
    selectColorActiveLinkElement=null;
    selectColorVisitedLinkElement=null;
    settingValues=null;
    colorLinkValue="";
    colorActiveLinkValue="";
    colorVisitedLinkValue="";
    colorLinkValues=[ `linkColor_${DEFAULT_VALUE}`, "linkColor_lightblue", "linkColor_lightgreen", "linkColor_yellow", "linkColor_orange", "linkColor_pink", "linkColor_black", "linkColor_darkblue", "linkColor_darkgreen", "linkColor_red", "linkColor_purple", "linkColor_brown" ];
    handler;
    constructor() {
        super();
        this.appendChild(editLinkStyleLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectColorLinkElement = this.querySelector(`#${PREFIX}select-color-link`);
        this.selectColorActiveLinkElement = this.querySelector(`#${PREFIX}select-color-active-link`);
        this.selectColorVisitedLinkElement = this.querySelector(`#${PREFIX}select-color-visited-link`);
        this.selectColorLinkElement.addEventListener("editSettingLinkColor", this.handler);
        this.selectColorActiveLinkElement.addEventListener("editSettingLinkPointedColor", this.handler);
        this.selectColorVisitedLinkElement.addEventListener("editSettingLinkVisitedColor", this.handler);
        this.selectColorLinkElement.setAttribute("data-setting-values", this.colorLinkValues.join(","));
        this.selectColorActiveLinkElement.setAttribute("data-setting-values", this.colorLinkValues.join(","));
        this.selectColorVisitedLinkElement.setAttribute("data-setting-values", this.colorLinkValues.join(","));
        modeOfUseServiceInstance.getSetting("linkStyle").then((result => {
            this.settingValues = result.values.split(",");
            this.colorLinkValue = this.settingValues[result.valueSelected]?.split("_")[0];
            this.colorActiveLinkValue = this.settingValues[result.valueSelected]?.split("_")[1];
            this.colorVisitedLinkValue = this.settingValues[result.valueSelected]?.split("_")[2];
            const currentIndexColorLink = this.colorLinkValues.findIndex((i => i === `linkColor_${this.colorLinkValue}`));
            const currentIndexColorActiveLink = this.colorLinkValues.findIndex((i => i === `linkColor_${this.colorActiveLinkValue}`));
            const currentIndexColorVisitedLink = this.colorLinkValues.findIndex((i => i === `linkColor_${this.colorVisitedLinkValue}`));
            this.selectColorLinkElement.setAttribute("data-index", currentIndexColorLink.toString());
            this.selectColorActiveLinkElement.setAttribute("data-index", currentIndexColorActiveLink.toString());
            this.selectColorVisitedLinkElement.setAttribute("data-index", currentIndexColorVisitedLink.toString());
        }));
    }
    setLinkStyle=() => {
        let value = "";
        if (this.colorLinkValue === DEFAULT_VALUE && this.colorActiveLinkValue === DEFAULT_VALUE && this.colorVisitedLinkValue === DEFAULT_VALUE) {
            value = DEFAULT_VALUE;
        } else {
            value = `${this.colorLinkValue}_${this.colorActiveLinkValue}_${this.colorVisitedLinkValue}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("linkStyle", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("linkStyle", 3, value);
        }
        linkStyleServiceInstance.setLinkStyle(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingLinkColor":
            this.colorLinkValue = event.detail.newValue.split("_")[1];
            this.setLinkStyle();
            break;

          case "editSettingLinkPointedColor":
            this.colorActiveLinkValue = event.detail.newValue.split("_")[1];
            this.setLinkStyle();
            break;

          case "editSettingLinkVisitedColor":
            this.colorVisitedLinkValue = event.detail.newValue.split("_")[1];
            this.setLinkStyle();
            break;
        }
    };
}

customElements.define("app-edit-link-style", EditLinkStyleComponent);

"use strict";

const editMagnifierLayout = document.createElement("template");

editMagnifierLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="magnifier"></app-select-edit-value>\n\t</form>\n`;

class EditMagnifierComponent extends HTMLElement {
    selectMagnifierElement=null;
    settingValues=null;
    magnifierValues=[ DEFAULT_VALUE, "zoom2", "zoom5", "zoom10", "zoom15" ];
    handler;
    constructor() {
        super();
        this.appendChild(editMagnifierLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectMagnifierElement = this.querySelector("app-select-edit-value");
        this.selectMagnifierElement.addEventListener("editSettingMagnifier", this.handler);
        this.selectMagnifierElement.setAttribute("data-setting-values", this.magnifierValues.join(","));
        this.querySelector("form").addEventListener("change", this.handler);
        modeOfUseServiceInstance.getSetting("magnifier").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.magnifierValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectMagnifierElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setMagnifier=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("magnifier", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("magnifier", 3, value);
        }
        magnifierServiceInstance.setMagnifier(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingMagnifier":
            this.setMagnifier(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-magnifier", EditMagnifierComponent);

"use strict";

const editMarginAlignLayout = document.createElement("template");

editMarginAlignLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="marginAlign"></app-select-edit-value>\n\t</form>\n`;

class EditMarginAlignComponent extends HTMLElement {
    selectMarginAlignElement=null;
    settingValues=null;
    marginAlignValues=[ DEFAULT_VALUE, "alignLeft", "marginLeft", "margeList" ];
    handler;
    constructor() {
        super();
        this.appendChild(editMarginAlignLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectMarginAlignElement = this.querySelector("app-select-edit-value");
        this.selectMarginAlignElement.addEventListener("editSettingMarginAlign", this.handler);
        this.selectMarginAlignElement.setAttribute("data-setting-values", this.marginAlignValues.join(","));
        modeOfUseServiceInstance.getSetting("marginAlign").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.marginAlignValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectMarginAlignElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setMarginAlign=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("marginAlign", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("marginAlign", 3, value);
        }
        marginAlignServiceInstance.setMargin(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingMarginAlign":
            this.setMarginAlign(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-margin-align", EditMarginAlignComponent);

"use strict";

const editNavigationAutoLayout = document.createElement("template");

editNavigationAutoLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<fieldset>\n\t\t\t<legend class="fs-5" data-i18n="navigationAuto_label"></legend>\n\t\t\t<div class="form-check">\n\t\t\t\t<input class="form-check-input" type="radio" name="navigationAuto" id="${PREFIX}${DEFAULT_VALUE}-navigation-auto" value="${DEFAULT_VALUE}">\n\t\t\t\t<label class="form-check-label" for="${PREFIX}${DEFAULT_VALUE}-navigation-auto" data-i18n="navigationAuto_inactive"></label>\n\t\t\t</div>\n\t\t\t<div class="form-check">\n\t\t\t\t<input class="form-check-input" type="radio" name="navigationAuto" id="${PREFIX}autoFocus-navigation-auto" value="autoFocus">\n\t\t\t\t<label class="form-check-label" for="${PREFIX}autoFocus-navigation-auto" data-i18n="navigationAuto_active"></label>\n\t\t\t</div>\n\t\t</fieldset>\n\n\t\t<app-select-edit-value class="d-none" data-name="navigationDelay"></app-select-edit-value>\n\t</form>\n`;

class EditNavigationAutoComponent extends HTMLElement {
    selectNavigationDelayElement=null;
    settingValues=null;
    navigationDelayValues=[ "navigationDelay_delay1", "navigationDelay_delay2", "navigationDelay_delay3", "navigationDelay_delay6" ];
    navigationAuto;
    delay;
    handler;
    constructor() {
        super();
        this.appendChild(editNavigationAutoLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectNavigationDelayElement = this.querySelector("app-select-edit-value");
        this.selectNavigationDelayElement.addEventListener("editSettingNavigationDelay", this.handler);
        this.selectNavigationDelayElement.setAttribute("data-setting-values", this.navigationDelayValues.join(","));
        this.querySelector("form").addEventListener("change", this.handler);
        modeOfUseServiceInstance.getSetting("navigationAuto").then((result => {
            this.settingValues = result.values.split(",");
            this.navigationAuto = this.settingValues[result.valueSelected].split("_")[0];
            this.delay = this.settingValues[result.valueSelected].split("_")[1];
            this.querySelector(`input[name="navigationAuto"][id="${PREFIX}${this.navigationAuto}-navigation-auto"]`).checked = true;
            const currentIndex = this.delay ? this.navigationDelayValues.findIndex((i => i === `navigationDelay_${this.delay}`)) : 0;
            this.selectNavigationDelayElement.classList.toggle("d-none", this.navigationAuto === DEFAULT_VALUE);
            this.selectNavigationDelayElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setNavigationAuto=() => {
        let value = "";
        if (this.navigationAuto === DEFAULT_VALUE) {
            value = DEFAULT_VALUE;
        } else {
            value = `${this.navigationAuto}_${this.delay}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("navigationAuto", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("navigationAuto", 3, value);
        }
        navigationAutoServiceInstance.setNavigationAuto(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "change":
            this.navigationAuto = this.querySelector(`input[name="navigationAuto"]:checked`).value;
            this.selectNavigationDelayElement.classList.toggle("d-none", this.navigationAuto === DEFAULT_VALUE);
            this.setNavigationAuto();
            break;

          case "editSettingNavigationDelay":
            this.delay = event.detail.newValue.split("_")[1];
            this.setNavigationAuto();
            break;
        }
    };
}

customElements.define("app-edit-navigation-auto", EditNavigationAutoComponent);

"use strict";

const editReadAloudLayout = document.createElement("template");

editReadAloudLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="readAloud"></app-select-edit-value>\n\t</form>\n`;

class EditReadAloudComponent extends HTMLElement {
    selectReadAloudElement=null;
    settingValues=null;
    readAloudValues=[ DEFAULT_VALUE, "word", "sentence", "paragraph", "all" ];
    handler;
    constructor() {
        super();
        this.appendChild(editReadAloudLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectReadAloudElement = this.querySelector("app-select-edit-value");
        this.selectReadAloudElement.addEventListener("editSettingReadAloud", this.handler);
        this.selectReadAloudElement.setAttribute("data-setting-values", this.readAloudValues.join(","));
        modeOfUseServiceInstance.getSetting("readAloud").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.readAloudValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectReadAloudElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setReadAloud=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("readAloud", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("readAloud", 3, value);
        }
        readAloudServiceInstance.setReadAloud(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingReadAloud":
            this.setReadAloud(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-read-aloud", EditReadAloudComponent);

"use strict";

const editReadingGuideLayout = document.createElement("template");

editReadingGuideLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="readingGuide"></app-select-edit-value>\n\t</form>\n`;

class EditReadingGuideComponent extends HTMLElement {
    selectReadingGuideElement=null;
    settingValues=null;
    readingGuideValues=[ DEFAULT_VALUE, "ruleGuide", "maskGuide" ];
    handler;
    constructor() {
        super();
        this.appendChild(editReadingGuideLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectReadingGuideElement = this.querySelector("app-select-edit-value");
        this.selectReadingGuideElement.addEventListener("editSettingReadingGuide", this.handler);
        this.selectReadingGuideElement.setAttribute("data-setting-values", this.readingGuideValues.join(","));
        modeOfUseServiceInstance.getSetting("readingGuide").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.readingGuideValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectReadingGuideElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setReadingGuide=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("readingGuide", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("readingGuide", 3, value);
        }
        readingGuideServiceInstance.setReadingMaskGuide(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingReadingGuide":
            this.setReadingGuide(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-reading-guide", EditReadingGuideComponent);

"use strict";

const editScrollTypeLayout = document.createElement("template");

editScrollTypeLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="scrollType"></app-select-edit-value>\n\t</form>\n`;

class EditScrollTypeComponent extends HTMLElement {
    selectScrollTypeElement=null;
    settingValues=null;
    scrollTypeValues=[ DEFAULT_VALUE, "scrollOnClick", "scrollOnMouseover" ];
    handler;
    constructor() {
        super();
        this.appendChild(editScrollTypeLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectScrollTypeElement = this.querySelector("app-select-edit-value");
        this.selectScrollTypeElement.addEventListener("editSettingScrollType", this.handler);
        this.selectScrollTypeElement.setAttribute("data-setting-values", this.scrollTypeValues.join(","));
        modeOfUseServiceInstance.getSetting("scrollType").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.scrollTypeValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectScrollTypeElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setScrollType=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("scrollType", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("scrollType", 3, value);
        }
        scrollTypeServiceInstance.setScrollType(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingScrollType":
            this.setScrollType(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-scroll-type", EditScrollTypeComponent);

"use strict";

const editScrollLayout = document.createElement("template");

editScrollLayout.innerHTML = `\n\t<form class="d-flex flex-column gap-4">\n\t\t<app-select-edit-value id="${PREFIX}select-scroll-size" data-name="scrollSize" data-label="true"></app-select-edit-value>\n\t\t<app-select-edit-value id="${PREFIX}select-scroll-color" data-name="scrollColor" data-label="true"></app-select-edit-value>\n\t</form>\n`;

class EditScrollComponent extends HTMLElement {
    selectScrollSizeElement=null;
    selectScrollColorElement=null;
    settingValues=null;
    scrollSizeValue="";
    scrollColorValue="";
    scrollSizeValues=[ `scrollSize_${DEFAULT_VALUE}`, "scrollSize_big", "scrollSize_huge" ];
    scrollColorValues=[ `scrollColor_${DEFAULT_VALUE}`, "scrollColor_white", "scrollColor_blue", "scrollColor_red", "scrollColor_yellow", "scrollColor_green", "scrollColor_black" ];
    handler;
    constructor() {
        super();
        this.appendChild(editScrollLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectScrollSizeElement = this.querySelector(`#${PREFIX}select-scroll-size`);
        this.selectScrollColorElement = this.querySelector(`#${PREFIX}select-scroll-color`);
        this.selectScrollSizeElement.addEventListener("editSettingScrollSize", this.handler);
        this.selectScrollColorElement.addEventListener("editSettingScrollColor", this.handler);
        this.selectScrollSizeElement.setAttribute("data-setting-values", this.scrollSizeValues.join(","));
        this.selectScrollColorElement.setAttribute("data-setting-values", this.scrollColorValues.join(","));
        modeOfUseServiceInstance.getSetting("scroll").then((result => {
            this.settingValues = result.values?.split(",");
            this.scrollSizeValue = this.settingValues[result.valueSelected]?.split("_")[0];
            this.scrollColorValue = this.settingValues[result.valueSelected]?.split("_")[1];
            const currentIndexScrollSize = this.scrollSizeValues.findIndex((i => i === `scrollSize_${this.scrollSizeValue}`));
            const currentIndexScrollColor = this.scrollColorValues.findIndex((i => i === `scrollColor_${this.scrollColorValue}`));
            this.selectScrollSizeElement.setAttribute("data-index", currentIndexScrollSize.toString());
            this.selectScrollColorElement.setAttribute("data-index", currentIndexScrollColor.toString());
        }));
    }
    setScroll=() => {
        let value = "";
        if (this.scrollColorValue === DEFAULT_VALUE) {
            value = this.scrollSizeValue;
        } else {
            value = `${this.scrollSizeValue}_${this.scrollColorValue}`;
        }
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("scroll", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("scroll", 3, value);
        }
        scrollServiceInstance.setScroll(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingScrollSize":
            this.scrollSizeValue = event.detail.newValue.split("_")[1];
            this.setScroll();
            break;

          case "editSettingScrollColor":
            this.scrollColorValue = event.detail.newValue.split("_")[1];
            this.setScroll();
            break;
        }
    };
}

customElements.define("app-edit-scroll", EditScrollComponent);

"use strict";

const editTextSizeLayout = document.createElement("template");

editTextSizeLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="textSize"></app-select-edit-value>\n\t</form>\n`;

class EditTextSizeComponent extends HTMLElement {
    selectTextSizeElement=null;
    settingValues=null;
    textSizeValues=[ DEFAULT_VALUE, "110", "130", "160", "200", "350", "500" ];
    handler;
    constructor() {
        super();
        this.appendChild(editTextSizeLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectTextSizeElement = this.querySelector("app-select-edit-value");
        this.selectTextSizeElement.addEventListener("editSettingTextSize", this.handler);
        this.selectTextSizeElement.setAttribute("data-setting-values", this.textSizeValues.join(","));
        modeOfUseServiceInstance.getSetting("textSize").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.textSizeValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectTextSizeElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setTextSize=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("textSize", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("textSize", 3, value);
        }
        textSizeServiceInstance.setFontSize(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingTextSize":
            this.setTextSize(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-text-size", EditTextSizeComponent);

"use strict";

const editTextSpacingLayout = document.createElement("template");

editTextSpacingLayout.innerHTML = `\n\t<form>\n\t\t<app-select-edit-value data-name="textSpacing"></app-select-edit-value>\n\t</form>\n`;

class EditTextSpacingComponent extends HTMLElement {
    selectTextSpacingElement=null;
    settingValues=null;
    textSpacingValues=[ DEFAULT_VALUE, "spacingTextLabelSmall", "spacingTextLabelBig", "spacingTextLabelHuge" ];
    handler;
    constructor() {
        super();
        this.appendChild(editTextSpacingLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectTextSpacingElement = this.querySelector("app-select-edit-value");
        this.selectTextSpacingElement.addEventListener("editSettingTextSpacing", this.handler);
        this.selectTextSpacingElement.setAttribute("data-setting-values", this.textSpacingValues.join(","));
        modeOfUseServiceInstance.getSetting("textSpacing").then((result => {
            this.settingValues = result.values.split(",");
            const currentIndex = this.textSpacingValues.findIndex((i => i === this.settingValues[result.valueSelected]));
            this.selectTextSpacingElement.setAttribute("data-index", currentIndex.toString());
        }));
    }
    setSpacingText=value => {
        let newSettingIndex = this.settingValues.indexOf(value);
        if (newSettingIndex !== -1) {
            modeOfUseServiceInstance.setSettingValue("textSpacing", newSettingIndex, true);
        } else {
            modeOfUseServiceInstance.addSettingCustomValue("textSpacing", 3, value);
        }
        textSpacingServiceInstance.setSpacingText(value);
    };
    createHandler=() => event => {
        switch (event.type) {
          case "editSettingTextSpacing":
            this.setSpacingText(event.detail.newValue);
            break;
        }
    };
}

customElements.define("app-edit-text-spacing", EditTextSpacingComponent);

"use strict";

const homeLayout = document.createElement("template");

homeLayout.innerHTML = `\n<section class="bg-dark p-3 d-flex align-items-center justify-content-between">\n\t<button id="change-mode-btn" type="button" class="btn btn-secondary bg-dark gap-2 p-0 border-0">\n\t\t<div class="sc-home__icon-mode bg-body rounded-circle text-body">\n\t\t\t<app-icon data-size="4em"></app-icon>\n\t\t</div>\n\t\t<div class="d-flex flex-column align-items-start">\n\t\t\t<span class="text-white" data-i18n="profile"></span>\n\t\t\t<span id="mode-name" class="fs-4 fw-bold text-primary"></span>\n\t\t</div>\n\t</button>\n\t<div class="d-grid gap-3 d-md-block">\n\t\t<button id="pause-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">\n\t\t\t<span id="pause-label" class="visually-hidden" data-i18n="pause"></span>\n\t\t\t<app-icon id="pause-icon" data-name="Pause"></app-icon>\n\t\t</button>\n\t</div>\n</section>\n\n<section class="gap-3 p-3">\n\t<p id="pause-info" class="d-none" data-i18n="pauseInfo"></p>\n\t<div class="sc-home__settings gap-3">\n\t\t<app-mode></app-mode>\n\t\t<button id="settings-btn" type="button" class="btn btn-secondary">\n\t\t\t<app-icon class="me-1" data-name="Settings"></app-icon>\n\t\t\t<span data-i18n="othersSettings"></span>\n\t\t</button>\n\t</div>\n</section>\n`;

class HomeComponent extends HTMLElement {
    static observedAttributes=[ "data-modes", "data-custom" ];
    changeModeBtn=null;
    settingsBtn=null;
    pauseBtn=null;
    modeName=null;
    modeIcon=null;
    currentMode=null;
    currentModeSettings;
    pauseState=false;
    handler;
    constructor() {
        super();
        this.appendChild(homeLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.changeModeBtn = this.querySelector("#change-mode-btn");
        this.settingsBtn = this.querySelector("#settings-btn");
        this.pauseBtn = this.querySelector("#pause-btn");
        this.modeName = this.querySelector("#mode-name");
        this.modeIcon = this.querySelector("app-icon");
        this.currentMode = this.querySelector("app-mode");
        this.changeModeBtn?.addEventListener("click", this.handler);
        this.settingsBtn?.addEventListener("click", this.handler);
        this.pauseBtn?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.changeModeBtn?.removeEventListener("click", this.handler);
        this.settingsBtn?.removeEventListener("click", this.handler);
        this.pauseBtn?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            let selectedMode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
            let selectedModeName = Object.entries(JSON.parse(selectedMode))[0][0];
            this.modeName.innerText = i18nServiceInstance.getMessage(`${selectedModeName}Name`);
            this.modeIcon?.setAttribute("data-name", selectedModeName);
            this.currentModeSettings = JSON.stringify(Object.entries(JSON.parse(selectedMode))[0][1]);
            this.currentMode.setAttribute("data-settings", this.currentModeSettings);
            localStorageServiceInstance.getItem("is-paused").then((isPaused => {
                if (isPaused) {
                    this.setPauseState();
                }
            }));
        }
    }
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.currentTarget) {
              case this.changeModeBtn:
                this.changeModeButtonEvent();
                break;

              case this.settingsBtn:
                this.settingsButtonEvent();
                break;

              case this.pauseBtn:
                this.setPauseState();
                break;
            }
        }
    };
    changeModeButtonEvent=() => {
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: PAGE_MODES
            }
        });
        this.changeModeBtn?.dispatchEvent(clickEvent);
    };
    settingsButtonEvent=() => {
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: PAGE_SETTINGS
            }
        });
        this.settingsBtn?.dispatchEvent(clickEvent);
    };
    setPauseState=() => {
        this.pauseState = !this.pauseState;
        this.querySelector("#pause-icon").setAttribute("data-name", this.pauseState ? "Play" : "Pause");
        localStorageServiceInstance.setItem("is-paused", this.pauseState);
        if (this.pauseState) {
            pauseServiceInstance.pauseSettings(this.currentModeSettings);
            this.settingsBtn.disabled = true;
            this.changeModeBtn.disabled = true;
            this.pauseBtn.setAttribute("title", i18nServiceInstance.getMessage("play"));
            this.pauseBtn.querySelector("#pause-label").innerText = i18nServiceInstance.getMessage("play");
            this.querySelector("#pause-info").classList.remove("d-none");
            this.currentMode.setAttribute("data-pause", "true");
        } else {
            pauseServiceInstance.playSettings();
            this.settingsBtn.disabled = false;
            this.changeModeBtn.disabled = false;
            this.pauseBtn.setAttribute("title", i18nServiceInstance.getMessage("pause"));
            this.pauseBtn.querySelector("#pause-label").innerText = i18nServiceInstance.getMessage("pause");
            this.querySelector("#pause-info").classList.add("d-none");
            this.currentMode.setAttribute("data-pause", "false");
        }
    };
}

customElements.define("app-home", HomeComponent);

"use strict";

const tmplMode = document.createElement("template");

tmplMode.innerHTML = `\n<div id="mode-content" class="sc-mode__setting-grid gap-2">\n\t<app-font-family class="sc-mode__setting"></app-font-family>\n\t<app-text-size class="sc-mode__setting"></app-text-size>\n\t<app-capital-letters class="sc-mode__setting"></app-capital-letters>\n\t<app-text-spacing class="sc-mode__setting"></app-text-spacing>\n\t<app-reading-guide class="sc-mode__setting"></app-reading-guide>\n\t<app-margin-align class="sc-mode__setting"></app-margin-align>\n\t<app-magnifier class="sc-mode__setting"></app-magnifier>\n\t<app-read-aloud class="sc-mode__setting"></app-read-aloud>\n\t<app-colour-theme class="sc-mode__setting"></app-colour-theme>\n\t<app-cursor-aspect class="sc-mode__setting"></app-cursor-aspect>\n\t<app-focus-aspect class="sc-mode__setting"></app-focus-aspect>\n\t<app-color-contrast class="sc-mode__setting"></app-color-contrast>\n\t<app-link-style class="sc-mode__setting"></app-link-style>\n\t<app-clearly-links class="sc-mode__setting"></app-clearly-links>\n\t<app-stop-animations class="sc-mode__setting"></app-stop-animations>\n\t<app-delete-background-images class="sc-mode__setting"></app-delete-background-images>\n\t<app-scroll class="sc-mode__setting"></app-scroll>\n\t<app-skip-to-content class="sc-mode__setting"></app-skip-to-content>\n\t<app-navigation-buttons class="sc-mode__setting"></app-navigation-buttons>\n\t<app-scroll-type class="sc-mode__setting"></app-scroll-type>\n\t<app-click-facilite class="sc-mode__setting"></app-click-facilite>\n\t<app-navigation-auto class="sc-mode__setting"></app-navigation-auto>\n</div>\n`;

class ModeComponent extends HTMLElement {
    static observedAttributes=[ "data-settings", "data-pause" ];
    modeContent=null;
    settingsDictionnary=[];
    constructor() {
        super();
        this.appendChild(tmplMode.content.cloneNode(true));
        this.querySelectorAll(".sc-mode__setting").forEach((element => {
            this.settingsDictionnary.push({
                name: stringServiceInstance.normalizeSettingName(element.tagName),
                element: element.tagName
            });
        }));
    }
    connectedCallback() {
        this.modeContent = this.querySelector("#mode-content");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-settings" === name) {
            this.displaySettings(JSON.parse(newValue));
        }
        if ("data-pause" === name) {
            this.disableSettings(newValue === "true");
        }
    }
    displaySettings=settings => {
        let elements = this.querySelectorAll(".sc-mode__setting");
        elements.forEach((element => {
            element.classList.add("d-none");
        }));
        settings.forEach((setting => {
            let settingObj = this.settingsDictionnary.find((o => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0])));
            let settingElement = this.querySelector(settingObj?.element);
            settingElement?.setAttribute("data-values", JSON.stringify(Object.entries(setting)[0][1]));
            if (Object.entries(setting)[0][1].isTool) {
                settingElement?.classList.remove("d-none");
            }
        }));
    };
    disableSettings=disabled => {
        let elements = this.querySelectorAll(".sc-mode__setting");
        elements.forEach((element => {
            element.querySelector("app-btn-setting").setAttribute("data-disabled", String(disabled));
        }));
    };
}

customElements.define("app-mode", ModeComponent);

"use strict";

const modesLayout = document.createElement("template");

modesLayout.innerHTML = `\n<form class="p-3">\n\t<fieldset class="d-grid gap-2 mb-4 text-body">\n\t\t<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>\n\t\t<div id="select-mode-zone" class="d-grid gap-1">\n\t\t</div>\n\t</fieldset>\n</form>\n`;

class ModesComponent extends HTMLElement {
    static observedAttributes=[ "data-modes" ];
    selectModeForm=null;
    selectModeZone=null;
    handler;
    constructor() {
        super();
        this.appendChild(modesLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectModeForm = this.querySelector("form");
        this.selectModeZone = this.querySelector("#select-mode-zone");
        this.selectModeForm?.addEventListener("submit", this.handler);
    }
    disconnectedCallback() {
        this.selectModeForm?.removeEventListener("submit", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            this.displayListMode(JSON.parse(newValue));
        }
    }
    displayListMode=json => {
        const listMode = json.modes;
        const selectedMode = json.selectedMode;
        let radioModeList = "";
        listMode.forEach((mode => {
            let settingsList = Object.entries(mode)[0][1];
            let disabled = settingsList.length === 0;
            let isChecked = Object.keys(mode)[0] === selectedMode ? true : false;
            let radioMode = `<app-select-mode data-label="${Object.keys(mode)[0]}" data-checked="${isChecked}" data-disabled="${disabled}"></app-select-mode>`;
            radioModeList = radioModeList + radioMode;
        }));
        this.selectModeZone.innerHTML = radioModeList;
    };
    getSelectedMode=() => this.querySelector("input:checked").value;
    createHandler=() => event => {
        switch (event.type) {
          case "submit":
            this.selectModeFormEvent(event);
            break;
        }
    };
    selectModeFormEvent=event => {
        event.preventDefault();
        modeOfUseServiceInstance.setSelectedMode(this.getSelectedMode());
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: PAGE_HOME
            }
        });
        this.dispatchEvent(clickEvent);
    };
}

customElements.define("app-modes", ModesComponent);

"use strict";

const settingsLayout = document.createElement("template");

settingsLayout.innerHTML = `\n\t<section class="accordion mb-2">\n\t\t<app-text class="c-settings__category accordion-item"></app-text>\n\t\t<app-layout class="c-settings__category accordion-item"></app-layout>\n\t\t<app-picture-video class="c-settings__category accordion-item"></app-picture-video>\n\t\t<app-sound class="c-settings__category accordion-item"></app-sound>\n\t\t<app-navigation class="c-settings__category accordion-item"></app-navigation>\n\t\t<div class="border-top border-light border-1"></div>\n\t</section>\n\n\t<div class="p-3">\n\t\t<button id="${PREFIX}reset-mode" type="button" class="btn btn-secondary w-100" data-i18n="resetThisMode" data-i18n-title="resetThisModeTitle"></button>\n\t</div>\n\n`;

class SettingsComponent extends HTMLElement {
    static observedAttributes=[ "data-modes" ];
    resetModeElement=null;
    selectedMode="";
    handler;
    constructor() {
        super();
        this.appendChild(settingsLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.resetModeElement = this.querySelector(`#${PREFIX}reset-mode`);
        this.resetModeElement.addEventListener("click", this.handler);
        this.addEventListener("collapsedCategory", this.handler);
    }
    disconnectedCallback() {
        this.removeEventListener("collapsedCategory", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            this.openOrHideCategories(newValue);
            this.selectedMode = JSON.parse(newValue).selectedMode;
            let mode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
            let elements = this.querySelectorAll(".c-settings__category");
            const settings = Object.entries(JSON.parse(mode))[0][1];
            elements.forEach((element => {
                element.setAttribute("data-settings", JSON.stringify(settings));
            }));
        }
    }
    openOrHideCategories=mode => {
        categoriesServiceInstance.openMainCategory(JSON.parse(mode).selectedMode);
        categoriesServiceInstance.settingAccordions.forEach((accordion => {
            this.querySelector(accordion.name).setAttribute("data-open", (!accordion.open).toString());
        }));
    };
    createHandler=() => event => {
        switch (event.type) {
          case "collapsedCategory":
            categoriesServiceInstance.settingAccordions.forEach((accordion => {
                this.querySelector(accordion.name).setAttribute("data-open", (!accordion.open).toString());
            }));
            break;

          case "click":
            modeOfUseServiceInstance.setSelectedMode(this.selectedMode);
            break;
        }
    };
}

customElements.define("app-settings", SettingsComponent);

"use strict";

class AbstractCategory extends HTMLElement {
    static observedAttributes=[ "data-settings", "data-open" ];
    btnAccordion=null;
    accordionContainer=null;
    settingsContainer=null;
    btnMoreSettings=null;
    settingsDictionnary=[];
    settingsElements=[];
    displayAllSettings=false;
    CLASS_NAME_SHOW="show";
    CLASS_NAME_COLLAPSED="collapsed";
    _triggerArray=[];
    handler;
    constructor() {
        super();
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.btnAccordion = this.querySelector("button.accordion-button");
        this.accordionContainer = this.querySelector("div.accordion-collapse");
        this.settingsContainer = this.querySelector(".c-category__settings-container");
        this.btnMoreSettings = this.querySelector(".c-category__btn-more");
        this.querySelectorAll(".c-category__setting").forEach((element => {
            this.settingsDictionnary.push({
                name: stringServiceInstance.normalizeSettingName(element.tagName),
                element: element.tagName
            });
            this.settingsElements.push(this.querySelector(element.tagName));
        }));
        this._triggerArray.push(this.btnAccordion);
        this.btnAccordion?.addEventListener("click", this.handler);
        this.btnMoreSettings?.addEventListener("click", this.handler);
    }
    disconnectedCallback() {
        this.btnAccordion?.removeEventListener("click", this.handler);
        this.btnMoreSettings?.removeEventListener("click", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-settings" === name) {
            this.displaySettings(JSON.parse(newValue));
        }
        if ("data-open" === name) {
            this.addAriaAndCollapsedClass(this._triggerArray, JSON.parse(newValue));
        }
    }
    isShown=(element = this.accordionContainer) => element.classList.contains(this.CLASS_NAME_SHOW);
    addAriaAndCollapsedClass=(triggerArray, isOpen) => {
        if (!triggerArray.length) {
            return;
        }
        for (const element of triggerArray) {
            this.accordionContainer?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
            element?.classList.toggle(this.CLASS_NAME_COLLAPSED, isOpen);
            element?.setAttribute("aria-expanded", String(isOpen));
        }
    };
    displaySettings=settings => {
        this.btnMoreSettings?.classList.add("d-none");
        if (!this.displayAllSettings) {
            this.settingsElements.forEach((element => {
                element.removeAttribute("data-default-setting");
                element.classList.add("d-none");
            }));
        }
        let nbActifSetting = 0;
        settings.forEach((setting => {
            let settingObj = this.settingsDictionnary.find((o => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0])));
            let settingElement = this.querySelector(settingObj?.element);
            settingElement?.setAttribute("data-values", JSON.stringify(Object.entries(setting)[0][1]));
            settingElement?.setAttribute("data-default-setting", "true");
            settingElement?.classList.remove("d-none");
            if (settingObj) {
                nbActifSetting++;
            }
        }));
        if (nbActifSetting !== this.settingsDictionnary.length) {
            this.btnMoreSettings?.classList.remove("d-none");
        }
    };
    displayOrHideOthersSettings=() => {
        this.displayAllSettings = !this.displayAllSettings;
        this.settingsElements.forEach((element => {
            if (!element.hasAttribute("data-default-setting")) {
                if (element.classList.contains("d-none")) {
                    this.btnMoreSettings.innerText = i18nServiceInstance.getMessage("lessSettings");
                } else {
                    this.btnMoreSettings.innerText = i18nServiceInstance.getMessage("moreSettings");
                }
                element.classList.toggle("d-none");
            }
        }));
    };
    createHandler=() => event => {
        if (event.type === "click") {
            if (event.currentTarget === this.btnAccordion || this.btnAccordion.contains(event.currentTarget)) {
                categoriesServiceInstance.openCategory(this.tagName, this.isShown());
                let clickCollapsedEvent = new CustomEvent("collapsedCategory", {
                    bubbles: true
                });
                this.btnAccordion?.dispatchEvent(clickCollapsedEvent);
            } else if (event.currentTarget === this.btnMoreSettings) {
                this.displayOrHideOthersSettings();
            }
        }
    };
}

"use strict";

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">\n\t\t\t<app-icon data-name="Affichage" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="layout"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-layout">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-magnifier class="c-category__setting" data-can-edit="true"></app-magnifier>\n\t\t\t\t<app-colour-theme class="c-category__setting" data-can-edit="true"></app-colour-theme>\n\t\t\t\t<app-cursor-aspect class="c-category__setting" data-can-edit="true"></app-cursor-aspect>\n\t\t\t\t<app-focus-aspect class="c-category__setting" data-can-edit="true"></app-focus-aspect>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-link-style class="c-category__setting" data-can-edit="true"></app-link-style>\n\t\t\t\t<app-clearly-links class="c-category__setting" data-can-edit="true"></app-clearly-links>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class LayoutComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplLayout.content.cloneNode(true));
    }
}

customElements.define("app-layout", LayoutComponent);

"use strict";

const tmplNavigation = document.createElement("template");

tmplNavigation.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">\n\t\t\t<app-icon data-name="Nav" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="navigation"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-navigation">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-click-facilite class="c-category__setting" data-can-edit="true"></app-click-facilite>\n\t\t\t\t<app-skip-to-content class="c-category__setting" data-can-edit="true"></app-skip-to-content>\n\t\t\t\t<app-scroll class="c-category__setting" data-can-edit="true"></app-scroll>\n\t\t\t\t<app-scroll-type class="c-category__setting" data-can-edit="true"></app-scroll-type>\n\t\t\t\t<app-navigation-buttons class="c-category__setting" data-can-edit="true"></app-navigation-buttons>\n\t\t\t\t<app-navigation-auto class="c-category__setting" data-can-edit="true"></app-navigation-auto>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class NavigationComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplNavigation.content.cloneNode(true));
    }
}

customElements.define("app-navigation", NavigationComponent);

"use strict";

const tmplPictureVideo = document.createElement("template");

tmplPictureVideo.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-picture-video">\n\t\t\t<app-icon data-name="Photo_Video" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="medias"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-picture-video">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-stop-animations class="c-category__setting" data-can-edit="true"></app-stop-animations>\n\t\t\t\t<app-delete-background-images class="c-category__setting" data-can-edit="true"></app-delete-background-images>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class PictureVideoComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplPictureVideo.content.cloneNode(true));
    }
}

customElements.define("app-picture-video", PictureVideoComponent);

"use strict";

const tmplSound = document.createElement("template");

tmplSound.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-sound">\n\t\t\t<app-icon data-name="Audio" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="audio"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-sound">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-read-aloud class="c-category__setting" data-can-edit="true"></app-read-aloud>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class SoundComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplSound.content.cloneNode(true));
    }
}

customElements.define("app-sound", SoundComponent);

"use strict";

const tmplText = document.createElement("template");

tmplText.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">\n\t\t\t<app-icon data-name="Text" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="text"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-text">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-text-size class="c-category__setting" data-can-edit="true"></app-text-size>\n\t\t\t\t<app-font-family class="c-category__setting" data-can-edit="true"></app-font-family>\n\t\t\t\t<app-capital-letters class="c-category__setting" data-can-edit="true"></app-capital-letters>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-text-spacing class="c-category__setting" data-can-edit="true"></app-text-spacing>\n\t\t\t\t<app-reading-guide class="c-category__setting" data-can-edit="true"></app-reading-guide>\n\t\t\t\t<app-margin-align class="c-category__setting" data-can-edit="true"></app-margin-align>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class TextComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplText.content.cloneNode(true));
    }
}

customElements.define("app-text", TextComponent);

"use strict";

const tmplToolbar = document.createElement("template");

tmplToolbar.innerHTML = `\n<app-header id="header"></app-header>\n`;

class ToolbarComponent extends HTMLElement {
    header=null;
    json;
    defaultJson;
    handler;
    state;
    constructor() {
        super();
        this.appendChild(tmplToolbar.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.header = this.querySelector("#header");
        this.state = this.parentNode.parentNode.host.getAttribute("data-state");
        filesServiceInstance.getJSONFile("modes-of-use").then((result => {
            this.defaultJson = result;
            localStorageServiceInstance.getItem(JSON_NAME).then((result => {
                if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
                    this.json = result;
                } else {
                    this.json = this.defaultJson;
                    localStorageServiceInstance.setItem(JSON_NAME, this.defaultJson);
                }
                this.initCurrentMode(this.state === "restored");
            }));
        }));
        window.addEventListener(`storage-${JSON_NAME}`, this.handler);
        this.addEventListener("changeRoute", this.handler);
    }
    initCurrentMode=(shouldLoad = false) => {
        if (this.json.selectedMode) {
            routeServiceInstance.initPages(this, shouldLoad).then((result => {
                if (result) {
                    this.setCurrentPage(result);
                }
            }));
        } else {
            routeServiceInstance.navigate(PAGE_MODES);
        }
    };
    setCurrentPage=page => {
        this.header?.setAttribute("data-selected-mode", this.json.selectedMode);
        setTimeout((() => {
            let currentPage = this.querySelector(`app-${page}`);
            if (currentPage) {
                currentPage?.setAttribute("data-modes", JSON.stringify(this.json));
                if (page === PAGE_EDIT_SETTING) {
                    localStorageServiceInstance.getItem("current-setting").then((result => {
                        if (result) {
                            const editSettingElement = this.querySelector(`app-${PAGE_EDIT_SETTING}`);
                            editSettingElement?.setAttribute("data-setting", result);
                        }
                    }));
                }
            }
        }));
    };
    createHandler=() => event => {
        switch (event.type) {
          case "changeRoute":
            this.changeRouteEvent(event);
            break;

          case `storage-${JSON_NAME}`:
            this.storageEvent();
            break;
        }
    };
    changeRouteEvent=event => {
        let newRoute = event.detail.route;
        this.header?.focus();
        if (event.detail.mode) {
            this.json.selectedMode = event.detail.mode;
            this.querySelector(`app-${PAGE_HOME}`)?.focus();
        }
        routeServiceInstance.navigate(newRoute);
        this.setCurrentPage(newRoute);
        if (event.detail.setting) {
            const editSettingElement = this.querySelector(`app-${PAGE_EDIT_SETTING}`);
            editSettingElement?.setAttribute("data-setting", event.detail.setting);
        }
    };
    storageEvent=() => {
        localStorageServiceInstance.getItem(JSON_NAME).then((result => {
            this.json = result;
            this.setCurrentPage(routeServiceInstance.currentRoute);
        }));
    };
}

customElements.define("app-toolbar", ToolbarComponent);

"use strict";

const appRootElt = document.createElement("app-root");

document.body.prepend(appRootElt);