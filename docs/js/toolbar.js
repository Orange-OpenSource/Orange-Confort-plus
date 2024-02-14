/*
 * orange-confort-plus - version 5.0.0-alpha.0 - 14/02/2024
 * Enhance user experience on web sites
 * © 2014 - 2024 Orange SA
 */
"use strict";

const prefix = "cplus-";

const jsonName = "modeOfUse";

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
    getModesOfUse() {
        return fetch(`${this.path}assets/json/modes-of-use.json`).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving JSON file : ${error}.`);
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
            localStorage.setItem("orange-i18n", JSON.stringify(result));
        }));
    }
    getJSON() {
        return fetch(`${this.path}_locales/${this.locale}/messages.json`).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving JSON file : ${error}.`);
            return error;
        }));
    }
    getMessages() {
        return localStorage.getItem("orange-i18n");
    }
    getMessage(message) {
        const translations = JSON.parse(this.getMessages());
        return translations[message]?.message;
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
        localStorage.setItem(`${prefix}${key}`, JSON.stringify(value));
        let storeEvent = new CustomEvent(`storage-${key}`, {
            bubbles: true
        });
        window.dispatchEvent(storeEvent);
    }
    getItem(key) {
        return new Promise(((resolve, reject) => {
            resolve(JSON.parse(localStorage.getItem(`${prefix}${key}`)));
            reject(new Error("KO"));
        }));
    }
    removeItem(key) {
        localStorage.removeItem(`${prefix}${key}`);
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

let modeOfUseServiceIsInstantiated;

class ModeOfUseService {
    constructor() {
        if (modeOfUseServiceIsInstantiated) {
            throw new Error("ModeOfUseService is already instantiated.");
        }
        modeOfUseServiceIsInstantiated = true;
    }
    setSelectedMode(newSelectedMode) {
        localStorageServiceInstance.getItem(jsonName).then((result => {
            let json = result;
            json.selectedMode = newSelectedMode;
            localStorageServiceInstance.setItem(jsonName, json);
        }));
    }
    setSettingValue(key, newIndex) {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(jsonName).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === key));
                    if (setting) {
                        let settingValues = Object.entries(setting)[0][1];
                        settingValues.activeValue = newIndex;
                        localStorageServiceInstance.setItem(jsonName, json);
                        jsonIsEdited = true;
                    }
                }
            }));
            return jsonIsEdited;
        })).catch((error => {
            console.error("Your settings could not be saved.");
            return jsonIsEdited;
        }));
    }
}

"use strict";

let routeServiceIsInstantiated;

class RouteService {
    currentRoute;
    PAGE_HOME="home";
    PAGE_MODES="modes";
    PAGE_SETTINGS="settings";
    PAGE_EDIT_SETTING="edit-setting";
    homeElement=null;
    modeElement=null;
    settingsElement=null;
    editSettingElement=null;
    routes=[ {
        path: this.PAGE_HOME,
        selector: "app-home",
        element: this.homeElement
    }, {
        path: this.PAGE_MODES,
        selector: "app-modes",
        element: this.modeElement
    }, {
        path: this.PAGE_SETTINGS,
        selector: "app-settings",
        element: this.settingsElement
    }, {
        path: this.PAGE_EDIT_SETTING,
        selector: "app-edit-setting",
        element: this.editSettingElement
    } ];
    constructor() {
        if (routeServiceIsInstantiated) {
            throw new Error("RouteService is already instantiated.");
        }
        routeServiceIsInstantiated = true;
    }
    initPages(root) {
        this.routes.forEach((route => {
            route.element = root.querySelector(route.selector);
        }));
        this.navigate(this.PAGE_HOME);
    }
    navigate(newRoute) {
        this.routes.forEach((route => {
            if (route.path === this.currentRoute) {
                route.element.classList.add("d-none");
            } else if (route.path === newRoute) {
                route.element.classList.remove("d-none");
            }
        }));
        this.currentRoute = newRoute;
    }
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
}

"use strict";

let stylesServiceIsInstantiated;

class StylesService {
    prefixStyle=`${prefix}style-`;
    constructor() {
        if (stylesServiceIsInstantiated) {
            throw new Error("StylesService is already instantiated.");
        }
        stylesServiceIsInstantiated = true;
    }
    setStyle(name, style) {
        if (document.querySelectorAll(`#${this.prefixStyle}${name}`).length === 0) {
            let styleElement = document.createElement("style");
            styleElement.setAttribute("id", `${this.prefixStyle}${name}`);
            styleElement.innerHTML = style;
            document.head.appendChild(styleElement);
        } else {
            document.querySelector(`#${this.prefixStyle}${name}`).innerHTML = style;
        }
    }
    removeStyle(name) {
        document.querySelector(`#${this.prefixStyle}${name}`)?.remove();
    }
}

"use strict";

"use strict";

const pathServiceInstance = new PathService;

Object.freeze(pathServiceInstance);

const i18nServiceInstance = new I18nService;

Object.freeze(i18nServiceInstance);

const iconsServiceInstance = new IconsService;

Object.freeze(iconsServiceInstance);

const filesServiceInstance = new FilesService;

Object.freeze(filesServiceInstance);

const localStorageServiceInstance = new LocalStorageService;

Object.freeze(localStorageServiceInstance);

const modeOfUseServiceInstance = new ModeOfUseService;

Object.freeze(modeOfUseServiceInstance);

const stylesServiceInstance = new StylesService;

Object.freeze(stylesServiceInstance);

const stringServiceInstance = new StringService;

Object.freeze(stringServiceInstance);

const routeServiceInstance = new RouteService;

Object.seal(routeServiceInstance);

const appPath = pathServiceInstance.path;

"use strict";

const template = document.createElement("template");

template.innerHTML = `\n<div data-bs-theme="light" style="display:none">\n\t<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">\n\t\t<span class="visually-hidden" data-i18n="mainButton"></span>\n\t\t<app-icon data-size="3em" data-name="Accessibility"></app-icon>\n\t</button>\n\t<app-toolbar class="bg-body position-fixed top-0 end-0" id="toolbar"></app-toolbar>\n</div>\n`;

class AppComponent extends HTMLElement {
    confortPlusBtn=null;
    confortPlusToolbar=null;
    closeBtn=null;
    i18nService;
    link;
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
    }
    connectedCallback() {
        customElements.upgrade(this);
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
        this.hideToolbar();
        this.confortPlusToolbar.addEventListener("closeEvent", this.hideToolbar);
        this.confortPlusBtn.addEventListener("click", this.showToolbar);
    }
    disconnectedCallback() {
        this.confortPlusToolbar?.removeEventListener("closeEvent", this.hideToolbar);
        this.confortPlusBtn?.removeEventListener("click", this.showToolbar);
    }
    showToolbar=() => {
        this.confortPlusToolbar.removeAttribute("style");
        this.closeBtn?.focus();
        this.confortPlusBtn.classList.add("d-none");
    };
    hideToolbar=() => {
        this.confortPlusToolbar.style.transform = "translateX(100%)";
        this.confortPlusToolbar.style.visibility = "hidden";
        this.confortPlusBtn.classList.remove("d-none");
        this.confortPlusBtn?.focus();
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
    callback;
    constructor() {
        super();
        this.canEdit = this.dataset?.canEdit === "true" || this.canEdit;
        this.name = stringServiceInstance.normalizeSettingName(this.tagName);
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("app-btn-setting");
        this.modalBtn = this.querySelector("app-btn-modal");
        if (this.canEdit) {
            this.modalBtn.classList.remove("d-none");
            this.settingBtn.classList.add("sc-btn-setting--with-btn-modal");
        }
        this.setSettingBtn(this.activesValues);
        this.settingBtn.addEventListener("changeSettingEvent", (event => {
            let newIndex = event.detail.index;
            let newValue = event.detail.value;
            modeOfUseServiceInstance.setSettingValue(this.name, newIndex).then((success => {
                if (!success) {
                    this.callback(newValue);
                    this.modalBtn.setAttribute("data-value", i18nServiceInstance.getMessage(newValue));
                }
            }));
        }));
    }
    disconnectedCallback() {
        this.modalBtn.removeEventListener("clickModalEvent", (() => {}));
        this.settingBtn.removeEventListener("changeSettingEvent", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-values" === name) {
            this.activesValues = JSON.parse(newValue);
            this.setSettingBtn(this.activesValues);
            if (this.callback) {
                this.callback(this.activesValues.values.split(",")[this.activesValues.activeValue]);
            }
        }
    }
    setSettingBtn=activesValues => {
        this.settingBtn.setAttribute("data-values", activesValues.values);
        this.settingBtn.setAttribute("data-active-value", activesValues.activeValue.toString());
        this.modalBtn.setAttribute("data-value", i18nServiceInstance.getMessage(activesValues.values.split(",")[activesValues.activeValue]));
    };
    setCallback=callback => {
        this.callback = callback;
    };
}

"use strict";

const tmplColorContrast = document.createElement("template");

tmplColorContrast.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="colorsContrasts" data-icon="Contrast"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ColorContrastComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,reinforcedContrasts,white_black",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setColorsContrasts.bind(this));
        this.appendChild(tmplColorContrast.content.cloneNode(true));
    }
    setColorsContrasts=value => {
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle(this.name);
        } else {
            let color = "";
            let backgroundColor = "";
            if (value === "reinforcedContrasts") {
                color = "#000";
                backgroundColor = "#fff";
            } else if (value === "daltonism") {
                color = "#000";
                backgroundColor = "#fff";
            } else {
                color = value.split("_")[0];
                backgroundColor = value.split("_")[1];
            }
            let styleColorContrast = `\n\t\t\t\t\t\t\t* {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t\tbackground-color: ${backgroundColor} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tli a {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tfieldset,\n\t\t\t\t\t\t\tbutton {\n\t\t\t\t\t\t\t\tborder-color: ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tinput, td, th {\n\t\t\t\t\t\t\t\tborder: 2px solid ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\ttd, th {\n\t\t\t\t\t\t\t\tpadding: .2em !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\ttable {\n\t\t\t\t\t\t\t\tborder-collapse: collapse !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t*:link,\n\t\t\t\t\t\t\t*:visited,\n\t\t\t\t\t\t\t*:hover {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t`;
            stylesServiceInstance.setStyle(this.name, styleColorContrast);
        }
    };
}

customElements.define("app-color-contrast", ColorContrastComponent);

"use strict";

const tmplCursorAspect = document.createElement("template");

tmplCursorAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="cursorAspect" data-icon="CursorSetting"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class CursorAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big_black,huge_green",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setCursor.bind(this));
        this.appendChild(tmplCursorAspect.content.cloneNode(true));
    }
    drawCursor=(type, size, color, strokeWidth) => {
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
        return `<svg width="${size}" height="${size}" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path fill="${color}" d="${path}" stroke="black" stroke-width="${strokeWidth}"/></svg>`;
    };
    setCursor=value => {
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle(this.name);
        } else {
            let color = value.split("_")[1];
            let size = value.split("_")[0] === "big" ? 56 : 128;
            let styleCursor = `\n\t\t\t\t* {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("default", size, color, 10)}') 0 0, default !important;\n\t\t\t\t}\n\n\t\t\t\ta:link,\n\t\t\t\ta:visited,\n\t\t\t\tbutton {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("pointer", size, color, 10)}') ${size / 3} 0, pointer !important;\n\t\t\t\t}\n\n\t\t\t\th1, h2, h3, h4, h5, h6,\n\t\t\t\tp, ul, ol, dl, blockquote,\n\t\t\t\tpre, td, th,\n\t\t\t\tinput, textarea, legend {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("text", size, color, 4)}') ${size / 4} ${size / 4}, text !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle(this.name, styleCursor);
        }
    };
}

customElements.define("app-cursor-aspect", CursorAspectComponent);

"use strict";

const tmplFocusAspect = document.createElement("template");

tmplFocusAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="focusAspect" data-icon="Focus"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FocusAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big_blue,veryBig_red",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setFocus.bind(this));
        this.appendChild(tmplFocusAspect.content.cloneNode(true));
    }
    setFocus=value => {
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle(this.name);
        } else {
            let size = value.split("_")[0] === "big" ? "4px" : "10px";
            let color = value.split("_")[1];
            let styleFocus = `\n\t\t\t\t*:focus, *:focus-visible {\n\t\t\t\t\toutline: ${color} solid ${size} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle(this.name, styleFocus);
        }
    };
}

customElements.define("app-focus-aspect", FocusAspectComponent);

"use strict";

const tmplFontFamily = document.createElement("template");

tmplFontFamily.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="textFont" data-icon="Police"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FontFamilyComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,Accessible_DfA,Luciole",
        activeValue: 0
    };
    fontDictionnary=[ {
        name: "Accessible_DfA",
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
        name: "B612_Mono",
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
        name: "Comic Sans MS",
        size: "100%",
        folder: "comic",
        files: [ {
            name: "comic-Sans-MS.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "Lexand Deca",
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
        name: "Sylexiad Sans",
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
        super();
        this.setCallback(this.setFontFamily.bind(this));
        this.appendChild(tmplFontFamily.content.cloneNode(true));
        const fontFaceList = [];
        this.fontDictionnary.forEach((font => {
            for (const file of font.files) {
                fontFaceList.push(`\n\t\t\t\t\t@font-face {\n\t\t\t\t\t\tfont-family:"${font.name}";\n\t\t\t\t\t\tsrc: local("${font.name}"), url("${appPath}assets/fonts/${font.folder}/${file.name}");\n\t\t\t\t\t\tfont-style: ${file.style};\n\t\t\t\t\t\tfont-weight: ${file.weight};\n\t\t\t\t\t\tfont-display: swap;\n\t\t\t\t\t\tsize-adjust: ${font.size};\n\t\t\t\t\t}`);
            }
        }));
        stylesServiceInstance.setStyle(this.name, fontFaceList.join(""));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        stylesServiceInstance.removeStyle(this.name);
    }
    setFontFamily=value => {
        if (value === "noModifications") {
            document.body.style.fontFamily = null;
        } else {
            document.body.style.fontFamily = value;
        }
    };
}

customElements.define("app-font-family", FontFamilyComponent);

"use strict";

const tmplIncreaseTextSize = document.createElement("template");

tmplIncreaseTextSize.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="textSize" data-icon="Text_Size"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class IncreaseTextSizeComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,110,130",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setFontSize.bind(this));
        this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
    }
    setFontSize=value => {
        if (value === "noModifications") {
            document.documentElement.style.fontSize = null;
        } else {
            document.documentElement.style.fontSize = value;
        }
    };
}

customElements.define("app-text-size", IncreaseTextSizeComponent);

"use strict";

const tmplLinkStyle = document.createElement("template");

tmplLinkStyle.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="linksStyle" data-icon="Links"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class LinkStyleComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,lightblue_orange_lightgreen,yellow_orange_lightgreen",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setLinkStyle.bind(this));
        this.appendChild(tmplLinkStyle.content.cloneNode(true));
    }
    setLinkStyle=value => {
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle(this.name);
        } else {
            let linkColor = value.split("_")[0];
            let linkPointedColor = value.split("_")[1];
            let linkVisitedColor = value.split("_")[2];
            let styleLink = `\n\t\t\t\ta:link {\n\t\t\t\t\tcolor: ${linkColor} !important;\n\t\t\t\t}\n\t\t\t\ta:visited {\n\t\t\t\t\tcolor: ${linkVisitedColor} !important;\n\t\t\t\t}\n\t\t\t\ta:active, a:hover, a:focus {\n\t\t\t\t\tcolor: ${linkPointedColor} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle(this.name, styleLink);
        }
    };
}

customElements.define("app-link-style", LinkStyleComponent);

"use strict";

const tmplMarginAlign = document.createElement("template");

tmplMarginAlign.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="margin" data-icon="Text_Marge"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class MarginAlignComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,alignLeft,margeList",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setMargin.bind(this));
        this.appendChild(tmplMarginAlign.content.cloneNode(true));
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

customElements.define("app-margin-align", MarginAlignComponent);

"use strict";

const tmplReadingGuide = document.createElement("template");

tmplReadingGuide.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="readingMask" data-icon="Reading_Ruler"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ReadingGuideComponent extends AbstractSetting {
    topGuideElt=null;
    bottomGuideElt=null;
    readingGuideElt=null;
    guideType="";
    sizeGuide=40;
    activesValues={
        values: "noModifications,readingGuide,maskGuide",
        activeValue: 0
    };
    classReadingGuide=`\n\t\t#cplus-vertical-guide-elt {\n\t\t\tborder-left: 4px solid black;\n\t\t\tbackground: white;\n\t\t\theight: 100%;\n\t\t\twidth: 6px;\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t\tz-index: 2147483645;\n\t\t}\n\t`;
    classMaskGuide=`\n\t\t#cplus-mask-guide--top-elt,\n\t\t#cplus-mask-guide--bottom-elt {\n\t\t\tbackground: rgba(0, 0, 0, 0.5);\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tz-index: 2147483645;\n\t\t}\n\t\t#cplus-mask-guide--top-elt {\n\t\t\ttop: 0;\n\t\t}\n\t\t#cplus-mask-guide--bottom-elt {\n\t\t\tbottom: 0;\n\t\t}\n\t`;
    constructor() {
        super();
        this.setCallback(this.setReadingMaskGuide.bind(this));
        this.appendChild(tmplReadingGuide.content.cloneNode(true));
        this.readingGuideElt = this.querySelector("#cplus-vertical-guide-elt");
        this.topGuideElt = this.querySelector("#cplus-top-guide-elt");
        this.bottomGuideElt = this.querySelector("#cplus-bottom-guide-elt");
    }
    setReadingMaskGuide=value => {
        switch (value) {
          case "readingGuide":
            {
                this.resetGuide();
                this.guideType = "reading";
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
        if (this.guideType === "reading") {
            styleGuide = this.classReadingGuide;
        } else if (this.guideType === "mask") {
            styleGuide = this.classMaskGuide;
        }
        stylesServiceInstance.setStyle(this.name, styleGuide);
        if (this.guideType === "reading") {
            const readingElt = document.createElement("div");
            readingElt.setAttribute("id", "cplus-vertical-guide-elt");
            document.body.appendChild(readingElt);
        } else if (this.guideType === "mask") {
            const maskTopElt = document.createElement("div");
            const maskBottomElt = document.createElement("div");
            maskTopElt.setAttribute("id", "cplus-mask-guide--top-elt");
            maskBottomElt.setAttribute("id", "cplus-mask-guide--bottom-elt");
            document.body.appendChild(maskTopElt);
            document.body.appendChild(maskBottomElt);
        }
        document.addEventListener("mousemove", (event => {
            if (this.guideType === "reading") {
                document.querySelector("#cplus-vertical-guide-elt").style.left = `${event.x + 2}px`;
            } else if (this.guideType === "mask") {
                document.querySelector("#cplus-mask-guide--top-elt").style.height = `${event.y - this.sizeGuide}px`;
                document.querySelector("#cplus-mask-guide--bottom-elt").style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
            }
            event.stopPropagation();
        }));
    };
    resetGuide=() => {
        this.guideType = "";
        stylesServiceInstance.removeStyle(this.name);
        document.querySelector("#cplus-vertical-guide-elt")?.remove();
        document.querySelector("#cplus-mask-guide--top-elt")?.remove();
        document.querySelector("#cplus-mask-guide--bottom-elt")?.remove();
    };
}

customElements.define("app-reading-guide", ReadingGuideComponent);

"use strict";

const tmplScroll = document.createElement("template");

tmplScroll.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="lift" data-icon="Scroll"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ScrollComponent extends AbstractSetting {
    btnScrollUp=null;
    btnScrollDown=null;
    btnState="";
    scrollSteps=10;
    scrollTimer=50;
    activesValues={
        values: "noModifications,bigScroll,scrollOnMouseover",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setScroll.bind(this));
        this.appendChild(tmplScroll.content.cloneNode(true));
    }
    connectedCallback() {
        super.connectedCallback();
        this.setScrollClass();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.btnScrollUp?.removeEventListener("click", (() => {}));
        this.btnScrollUp?.removeEventListener("mouseover", (() => {}));
        this.btnScrollUp?.removeEventListener("mouseleave", (() => {}));
        this.btnScrollDown?.removeEventListener("click", (() => {}));
        this.btnScrollDown?.removeEventListener("mouseover", (() => {}));
        this.btnScrollDown?.removeEventListener("mouseleave", (() => {}));
        stylesServiceInstance.removeStyle(this.name);
    }
    setScroll=value => {
        switch (value) {
          case "bigScroll":
            {
                this.resetScroll();
                this.setBigScroll();
                break;
            }

          case "scrollOnClick":
            {
                this.resetScroll();
                this.btnState = "click";
                this.setBtnScroll();
                break;
            }

          case "scrollOnMouseover":
            {
                this.resetScroll();
                this.btnState = "mouseover";
                this.setBtnScroll();
                break;
            }

          default:
            {
                this.resetScroll();
            }
        }
    };
    setScrollClass=() => {
        let styleScroll = `\n\t\t\t.cplus-big-scroll::-webkit-scrollbar, .cplus-big-scroll *::-webkit-scrollbar {\n\t\t\t\t\twidth: 2rem;\n\t\t\t}\n\t\t\t.cplus-big-scroll::-webkit-scrollbar-thumb, .cplus-big-scroll *::-webkit-scrollbar-thumb {\n\t\t\t\tbackground-color: lightgrey;\n\t\t\t\tborder-radius: 1.75rem\n\t\t\t\twidth: 2rem;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.cplus-big-scroll::-webkit-scrollbar-thumb:hover, .cplus-big-scroll *::-webkit-scrollbar-thumb:hover {\n\t\t\t\tbackground-color: grey;\n\t\t\t}\n\n\t\t\t#cplus-container-scroll-buttons {\n\t\t\t\tdisplay: flex;\n\t\t\t\tgap: 1rem;\n\t\t\t\tposition: fixed;\n\t\t\t\tbottom: 1rem;\n\t\t\t\tright: 1rem;\n\t\t\t\tz-index: 2147483647;\n\t\t\t}\n\n\t\t\t#cplus-container-scroll-buttons button {\n\t\t\t\tbackground: #f16e00;\n\t\t\t\tcolor: #000;\n\t\t\t\tborder: none;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tpadding: 1rem 2rem;\n\t\t\t}\n\t\t`;
        stylesServiceInstance.setStyle(this.name, styleScroll);
    };
    setBigScroll=() => {
        document.body.classList.add("cplus-big-scroll");
    };
    setBtnScroll=() => {
        let intervalUp;
        let intervalDown;
        const btnArray = [ {
            id: "cplus-scroll-up",
            label: i18nServiceInstance.getMessage("scrollUp"),
            element: this.btnScrollUp,
            interval: intervalUp
        }, {
            id: "cplus-scroll-down",
            label: i18nServiceInstance.getMessage("scrollDown"),
            element: this.btnScrollDown,
            interval: intervalDown
        } ];
        const container = document.createElement("div");
        container.setAttribute("id", "cplus-container-scroll-buttons");
        let fragment = document.createDocumentFragment();
        btnArray.forEach((button => {
            let btn = document.createElement("button");
            btn.setAttribute("id", button.id);
            btn.type = "button";
            btn.innerHTML = button.label;
            fragment.appendChild(btn);
            container.appendChild(fragment);
            document.body.appendChild(container);
            button.element = document.querySelector(`#${button.id}`);
            let scrollDir = button.id.includes("up") ? -1 : button.id.includes("down") ? 1 : 0;
            let scrollBy = scrollDir * this.scrollSteps;
            button.element?.addEventListener(this.btnState, (event => {
                button.interval = setInterval((function() {
                    window.scrollBy(0, scrollBy);
                }), this.scrollTimer);
            }));
            if (this.btnState === "mouseover") {
                button.element?.addEventListener("mouseover", (event => {
                    button.interval = setInterval((function() {
                        window.scrollBy(0, scrollBy);
                    }), this.scrollTimer);
                }));
                button.element?.addEventListener("mouseleave", (event => {
                    clearInterval(button.interval);
                }));
            } else {
                button.element?.addEventListener("click", (event => {
                    window.scrollBy(0, scrollBy);
                }));
            }
        }));
    };
    resetScroll=() => {
        this.btnState = "";
        document.body.classList.remove("cplus-big-scroll");
        document.querySelector("#cplus-container-scroll-buttons")?.remove();
    };
}

customElements.define("app-scroll", ScrollComponent);

"use strict";

const tmplSpacingText = document.createElement("template");

tmplSpacingText.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="spacingText" data-icon="Text_Espacement_Ligne"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class TextSpacingComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,spacingTextLabelSmall,spacingTextLabelBig",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setSpacingText.bind(this));
        this.appendChild(tmplSpacingText.content.cloneNode(true));
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
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle(this.name);
        } else {
            let objSpacingText = spacingTextValues?.find((o => o.name === value));
            let styleSpacingText = `\n\t\t\t\t* {\n\t\t\t\t\tword-spacing: ${objSpacingText.wordSpacing} !important;\n\t\t\t\t\tline-height: ${objSpacingText.lineHeight} !important;\n\t\t\t\t\tletter-spacing: ${objSpacingText.letterSpacing} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle(this.name, styleSpacingText);
        }
    };
}

customElements.define("app-text-spacing", TextSpacingComponent);

"use strict";

const tmplTextTransform = document.createElement("template");

tmplTextTransform.innerHTML = `\n<style>\n\t\tapp-text-transform {\n\t\t\t\tmargin-bottom: 1rem;\n\t\t}\n</style>\n<button type="button" id="normal-btn" data-i18n="default"></button>\n<button type="button" id="first-letter-btn" data-i18n="firstLetter"></button>\n<button type="button" id="lowercase-btn" data-i18n="lowercase"></button>\n<button type="button" id="uppercase-btn" data-i18n="uppercase"></button>\n`;

class TextTransformComponent extends HTMLElement {
    normalBtn=null;
    firstLetterBtn=null;
    lowercaseBtn=null;
    uppercaseBtn=null;
    constructor() {
        super();
        this.appendChild(tmplTextTransform.content.cloneNode(true));
        this.normalBtn = this.querySelector("#normal-btn");
        this.firstLetterBtn = this.querySelector("#first-letter-btn");
        this.lowercaseBtn = this.querySelector("#lowercase-btn");
        this.uppercaseBtn = this.querySelector("#uppercase-btn");
    }
    connectedCallback() {
        const bodyElt = document.body;
        this.normalBtn?.addEventListener("click", (() => {
            bodyElt.style.textTransform = ``;
        }));
        this.firstLetterBtn?.addEventListener("click", (() => {
            bodyElt.style.textTransform = `capitalize`;
        }));
        this.lowercaseBtn?.addEventListener("click", (() => {
            bodyElt.style.textTransform = `lowercase`;
        }));
        this.uppercaseBtn?.addEventListener("click", (() => {
            bodyElt.style.textTransform = `uppercase`;
        }));
    }
    disconnectedCallback() {
        this.normalBtn?.removeEventListener("click", (() => {}));
        this.firstLetterBtn?.removeEventListener("click", (() => {}));
        this.lowercaseBtn?.removeEventListener("click", (() => {}));
        this.uppercaseBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-text-transform", TextTransformComponent);

"use strict";

const btnModalLayout = document.createElement("template");

btnModalLayout.innerHTML = `<button type="button" class="btn btn-primary pe-4 sc-btn-modal"></button>`;

class BtnModalComponent extends HTMLElement {
    static observedAttributes=[ "data-value", "data-label" ];
    modalBtn=null;
    value=null;
    constructor() {
        super();
        this.value = this.dataset?.value || this.value;
        this.appendChild(btnModalLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.modalBtn = this.querySelector("button");
        this.modalBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent("clickModalEvent", {
                bubbles: true
            });
            this.modalBtn?.dispatchEvent(clickEvent);
        }));
    }
    disconnectedCallback() {
        this.modalBtn?.removeEventListener("click", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-value" === name) {
            this.modalBtn.innerText = newValue;
        }
        if ("data-label" === name) {
            this.setA11yName(newValue);
        }
    }
    setA11yName=label => {
        let span = document.createElement("span");
        span.classList.add("visually-hidden");
        span.innerText = label;
        this.modalBtn?.appendChild(span);
        this.modalBtn.setAttribute("title", label);
    };
}

customElements.define("app-btn-modal", BtnModalComponent);

"use strict";

const btnSettingLayout = document.createElement("template");

btnSettingLayout.innerHTML = `\n\t<button type="button" class="sc-btn-setting btn btn-primary flex-column justify-content-between w-100 px-1">\n\t\t<div class="d-flex flex-column">\n\t\t\t<span></span>\n\t\t\t<app-icon data-size="1.5em"></app-icon>\n\t\t</div>\n\t\t<ul class="d-flex gap-1 align-items-center mt-2 mb-0 list-unstyled"></ul>\n\t</button>\n`;

class BtnSettingComponent extends HTMLElement {
    static observedAttributes=[ "data-values", "data-active-value", "data-label", "data-icon" ];
    settingBtn=null;
    btnContentSlots=null;
    icon=null;
    index;
    value;
    label="";
    slot="";
    separator=",";
    settingsList=[];
    constructor() {
        super();
        this.appendChild(btnSettingLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("button");
        this.btnContentSlots = this.querySelector("ul");
        this.settingBtn?.addEventListener("click", (() => {
            this.setIndex();
            let clickEvent = new CustomEvent("changeSettingEvent", {
                bubbles: true,
                detail: {
                    value: this.value,
                    index: this.index
                }
            });
            this.settingBtn?.dispatchEvent(clickEvent);
        }));
    }
    disconnectedCallback() {
        this.settingBtn?.removeEventListener("click", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-values" === name) {
            this.settingsList = newValue.split(this.separator);
        }
        if ("data-active-value" === name) {
            this.setIndex(Number(newValue));
        }
        if ("data-label" === name) {
            this.label = newValue;
            const span = this.querySelector("span");
            span.innerText = i18nServiceInstance.getMessage(newValue);
        }
        if ("data-icon" === name) {
            this.icon = this.querySelector("app-icon");
            this.icon?.setAttribute("data-name", newValue);
        }
    }
    setIndex=index => {
        if (index?.toString()) {
            this.index = index;
        } else {
            let i = this.index + 1;
            this.index = i >= this.settingsList.length ? 0 : i;
        }
        if (this.index === 0) {
            this.settingBtn?.classList.add("sc-btn-setting--default");
        } else {
            this.settingBtn?.classList.remove("sc-btn-setting--default");
        }
        this.calculateList();
    };
    calculateList=() => {
        this.slot = "";
        this.settingsList.forEach(((value, index) => {
            let point = '<li class="bg-white rounded-circle sc-btn-setting__btn-slot"></li>';
            if (index === this.index) {
                point = '<li class="border border-4 border-black rounded-circle"></li>';
                this.value = value;
            }
            this.slot = `${this.slot}${point}`;
        }));
        this.btnContentSlots.innerHTML = this.slot;
    };
}

customElements.define("app-btn-setting", BtnSettingComponent);

"use strict";

const headerLayout = document.createElement("template");

headerLayout.innerHTML = `\n\t<header class="d-flex justify-content-between bg-secondary px-3 py-2">\n\t\t<div class="d-flex align-items-center">\n\t\t\t<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="previous">\n\t\t\t\t<span class="visually-hidden" data-i18n="previous"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\n\t\t\t<span id="title-page-block" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">\n\t\t\t\t<app-icon id="title-page-icon" data-name="Eye" class="border-end border-white pe-1"></app-icon>\n\t\t\t\t<app-icon data-name="Settings"></app-icon>\n\t\t\t\t<span id="title-page"></span>\n\t\t\t</span>\n\n\t\t\t<span id="title-app" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">\n\t\t\t\t<app-icon data-name="Accessibility"></app-icon>\n\t\t\t\t<span data-i18n="mainTitle"></span>\n\t\t\t\t<span class="text-primary">+</span>\n\t\t\t</span>\n\t\t</div>\n\t\t<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">\n\t\t\t\t<span class="visually-hidden" data-i18n="close"></span>\n\t\t\t\t<app-icon data-name="Reduire_C+"></app-icon>\n\t\t</button>\n\t</header>\n`;

class HeaderComponent extends HTMLElement {
    static observedAttributes=[ "data-display", "data-title-page", "data-prev-route", "data-selected-mode" ];
    closeBtn=null;
    prevBtn=null;
    titleApp=null;
    titlePageBlock=null;
    titlePage=null;
    titlePageIcon=null;
    display="primary";
    prevRoute="";
    constructor() {
        super();
        this.appendChild(headerLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.closeBtn = this.querySelector("#close-toolbar");
        this.prevBtn = this.querySelector("#prev-toolbar");
        this.titleApp = this.querySelector("#title-app");
        this.titlePageBlock = this.querySelector("#title-page-block");
        this.titlePage = this.querySelector("#title-page");
        this.titlePageIcon = this.querySelector("#title-page-icon");
        this.displayMode(this.display);
        this.closeBtn?.addEventListener("click", (() => {
            let clickCloseEvent = new CustomEvent("closeEvent", {
                bubbles: true
            });
            this.closeBtn?.dispatchEvent(clickCloseEvent);
        }));
        this.prevBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent("changeRoute", {
                bubbles: true,
                detail: {
                    route: this.prevRoute,
                    isPrev: true
                }
            });
            this.prevBtn?.dispatchEvent(clickEvent);
        }));
    }
    disconnectedCallback() {
        this.closeBtn?.removeEventListener("click", (() => {}));
        this.prevBtn?.removeEventListener("click", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-display" === name) {
            this.displayMode(newValue);
        }
        if ("data-title-page" === name) {
            this.titlePage.innerText = i18nServiceInstance.getMessage(newValue);
        }
        if ("data-prev-route" === name) {
            this.prevRoute = newValue;
        }
        if ("data-selected-mode" === name) {
            this.titlePageIcon?.setAttribute("data-name", `${newValue}_border`);
        }
    }
    displayMode=mode => {
        this.prevBtn?.classList.toggle("d-none", mode === "primary");
        this.titlePageBlock?.classList.toggle("d-none", mode === "primary");
        this.titleApp?.classList.toggle("d-none", mode === "secondary");
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

const selectModeLayout = document.createElement("template");

selectModeLayout.innerHTML = `\n\t<input type="radio" name="modes" class="sc-select-mode__input">\n\t<label class="d-flex flex-column align-items-start gap-1 p-1 sc-select-mode__label btn btn-tertiary">\n\t\t<div class="d-flex align-items-center gap-2">\n\t\t\t<app-icon data-size="2em"></app-icon>\n\t\t\t<span class="fs-5 text"></span>\n\t\t</div>\n\t\t<span class="fs-6 fw-normal m-0"></span>\n\t</label>\n`;

class SelectModeComponent extends HTMLElement {
    inputElement=null;
    iconElement=null;
    labelElement=null;
    textElement=null;
    descriptionElement=null;
    label="";
    checked=false;
    constructor() {
        super();
        this.label = this.dataset?.label || this.label;
        this.checked = this.dataset?.checked === "true" || this.checked;
        this.appendChild(selectModeLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.inputElement = this.querySelector("input");
        this.labelElement = this.querySelector("label");
        this.iconElement = this.querySelector("app-icon");
        this.textElement = this.querySelector("div span");
        this.descriptionElement = this.querySelector("label > span");
        this.inputElement.id = stringServiceInstance.normalizeID(this.label);
        this.inputElement.value = this.label;
        this.inputElement.checked = this.checked;
        this.labelElement?.setAttribute("for", stringServiceInstance.normalizeID(this.label));
        this.iconElement?.setAttribute("data-name", `${this.label}_border`);
        this.textElement.innerText = i18nServiceInstance.getMessage(`${this.label}Name`);
        this.descriptionElement.innerText = i18nServiceInstance.getMessage(`${this.label}Description`);
    }
}

customElements.define("app-select-mode", SelectModeComponent);

"use strict";

const editSettingLayout = document.createElement("template");

editSettingLayout.innerHTML = ``;

class EditSettingComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editSettingLayout.content.cloneNode(true));
    }
}

customElements.define("app-edit-setting", EditSettingComponent);

"use strict";

const homeLayout = document.createElement("template");

homeLayout.innerHTML = `\n<section class="bg-dark p-3 d-flex align-items-center justify-content-between">\n    <div class="d-flex gap-2">\n        <div class="sc-home__icon-mode bg-body rounded-circle">\n\t\t\t\t\t\t<app-icon data-size="5em"></app-icon>\n        </div>\n        <div class="d-flex justify-content-center flex-column">\n            <span class="text-white" data-i18n="profile"></span>\n            <span id="mode-name" class="fs-4 fw-bold text-primary"></span>\n        </div>\n    </div>\n    <div class="d-grid gap-3 d-md-block">\n        <button id="settings-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="openSettingsMode">\n            <span class="visually-hidden" data-i18n="openSettingsMode"></span>\n\t\t\t\t\t\t<app-icon data-name="Settings"></app-icon>\n        </button>\n    </div>\n</section>\n\n<section class="sc-home__settings gap-3 p-3">\n\t<app-mode></app-mode>\n\t<div class="d-grid">\n\t\t<button id="change-mode-btn" class="btn btn-secondary" type="button" data-i18n="otherModes"></button>\n\t</div>\n</section>\n`;

class HomeComponent extends HTMLElement {
    static observedAttributes=[ "data-mode", "data-custom" ];
    changeModeBtn=null;
    settingsBtn=null;
    modeName=null;
    modeIcon=null;
    currentMode=null;
    i18nService;
    routeService;
    constructor() {
        super();
        this.appendChild(homeLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.changeModeBtn = this.querySelector("#change-mode-btn");
        this.settingsBtn = this.querySelector("#settings-btn");
        this.modeName = this.querySelector("#mode-name");
        this.modeIcon = this.querySelector("app-icon");
        this.currentMode = this.querySelector("app-mode");
        this.changeModeBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent("changeRoute", {
                bubbles: true,
                detail: {
                    route: routeServiceInstance.PAGE_MODES
                }
            });
            this.changeModeBtn?.dispatchEvent(clickEvent);
        }));
        this.settingsBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent("changeRoute", {
                bubbles: true,
                detail: {
                    route: routeServiceInstance.PAGE_SETTINGS
                }
            });
            this.settingsBtn?.dispatchEvent(clickEvent);
        }));
    }
    disconnectedCallback() {
        this.changeModeBtn?.removeEventListener("click", (() => {}));
        this.settingsBtn?.removeEventListener("click", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-mode" === name) {
            this.modeName.innerText = i18nServiceInstance.getMessage(`${Object.entries(JSON.parse(newValue))[0][0]}Name`);
            this.currentMode.setAttribute("data-settings", JSON.stringify(Object.entries(JSON.parse(newValue))[0][1]));
            this.modeIcon?.setAttribute("data-name", Object.entries(JSON.parse(newValue))[0][0]);
        }
        if ("data-custom" === name) {
            const modeName = this.modeName.textContent;
            this.modeName.innerText = newValue === "true" ? `${modeName}*` : `${modeName}`;
        }
    }
}

customElements.define("app-home", HomeComponent);

"use strict";

const tmplMode = document.createElement("template");

tmplMode.innerHTML = `\n<div id="mode-content" class="sc-mode__setting-grid gap-2">\n\t<app-font-family class="sc-mode__setting"></app-font-family>\n\t<app-text-size class="sc-mode__setting"></app-text-size>\n\t<app-text-spacing class="sc-mode__setting"></app-text-spacing>\n\t<app-reading-guide class="sc-mode__setting"></app-reading-guide>\n\t<app-margin-align class="sc-mode__setting"></app-margin-align>\n\t<app-focus-aspect class="sc-mode__setting"></app-focus-aspect>\n\t<app-color-contrast class="sc-mode__setting"></app-color-contrast>\n\t<app-cursor-aspect class="sc-mode__setting"></app-cursor-aspect>\n\t<app-scroll class="sc-mode__setting"></app-scroll>\n\t<app-link-style class="sc-mode__setting"></app-link-style>\n</div>\n`;

class ModeComponent extends HTMLElement {
    static observedAttributes=[ "data-settings" ];
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
            settingElement?.classList.remove("d-none");
        }));
    };
}

customElements.define("app-mode", ModeComponent);

"use strict";

const modesLayout = document.createElement("template");

modesLayout.innerHTML = `\n<form class="p-3">\n\t<fieldset class="d-grid gap-2 mb-4">\n\t\t<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>\n\t\t<div id="select-mode-zone" class="d-grid gap-1">\n\t\t</div>\n\t</fieldset>\n\n\t<div class="d-grid">\n\t\t<button id="select-mode-btn" class="btn btn-primary" type="submit" data-i18n="validateThisMode"></button>\n\t</div>\n</form>\n`;

class ModesComponent extends HTMLElement {
    static observedAttributes=[ "data-list-mode" ];
    selectModeForm=null;
    selectModeBtn=null;
    selectModeZone=null;
    constructor() {
        super();
        this.appendChild(modesLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.selectModeForm = this.querySelector("form");
        this.selectModeBtn = this.querySelector("#select-mode-btn");
        this.selectModeZone = this.querySelector("#select-mode-zone");
        this.selectModeForm?.addEventListener("submit", (event => {
            event.preventDefault();
            (this.shadowRoot?.querySelector("app-home")).focus();
        }));
        this.selectModeBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent("changeRoute", {
                bubbles: true,
                detail: {
                    route: routeServiceInstance.PAGE_HOME,
                    isPrev: true
                }
            });
            modeOfUseServiceInstance.setSelectedMode(this.getSelectedMode());
            this.selectModeBtn?.dispatchEvent(clickEvent);
        }));
    }
    disconnectedCallback() {
        this.selectModeBtn?.removeEventListener("click", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-list-mode" === name) {
            this.displayListMode(JSON.parse(newValue));
        }
    }
    displayListMode=json => {
        const listMode = json.modes;
        const selectedMode = json.selectedMode;
        let radioModeList = "";
        listMode.forEach((mode => {
            let isChecked = Object.keys(mode)[0] === selectedMode ? true : false;
            let radioMode = `<app-select-mode data-label="${Object.keys(mode)[0]}" data-checked="${isChecked}"></app-select-mode>`;
            radioModeList = radioModeList + radioMode;
        }));
        this.selectModeZone.innerHTML = radioModeList;
    };
    getSelectedMode=() => this.querySelector("input:checked").value;
}

customElements.define("app-modes", ModesComponent);

"use strict";

const settingsLayout = document.createElement("template");

settingsLayout.innerHTML = `\n<section class="accordion mb-2">\n\t<app-text class="c-settings__category accordion-item"></app-text>\n\t<app-layout class="c-settings__category accordion-item"></app-layout>\n\t<app-pointer class="c-settings__category accordion-item"></app-pointer>\n\t<app-navigation class="c-settings__category accordion-item"></app-navigation>\n</section>\n`;

class SettingsComponent extends HTMLElement {
    static observedAttributes=[ "data-mode" ];
    constructor() {
        super();
        this.appendChild(settingsLayout.content.cloneNode(true));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-mode" === name) {
            let elements = this.querySelectorAll(".c-settings__category");
            const settings = Object.entries(JSON.parse(newValue))[0][1];
            elements.forEach((element => {
                element.setAttribute("data-settings", JSON.stringify(settings));
            }));
        }
    }
}

customElements.define("app-settings", SettingsComponent);

"use strict";

class AbstractCategory extends HTMLElement {
    static observedAttributes=[ "data-settings" ];
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
    constructor() {
        super();
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
        this.btnAccordion?.addEventListener("click", (() => {
            this.addAriaAndCollapsedClass(this._triggerArray, this.isShown());
        }));
        this.btnMoreSettings?.addEventListener("click", (() => {
            this.displayOrHideOthersSettings();
        }));
    }
    disconnectedCallback() {
        this.btnAccordion?.removeEventListener("click", (() => {}));
        this.btnMoreSettings?.removeEventListener("click", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-settings" === name) {
            this.displaySettings(JSON.parse(newValue));
        }
    }
    isShown=(element = this.accordionContainer) => element.classList.contains(this.CLASS_NAME_SHOW);
    addAriaAndCollapsedClass=(triggerArray, isOpen) => {
        if (!triggerArray.length) {
            return;
        }
        for (const element of triggerArray) {
            this.accordionContainer?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
            element?.classList.toggle(this.CLASS_NAME_COLLAPSED, !isOpen);
            element?.setAttribute("aria-expanded", String(isOpen));
        }
    };
    displaySettings=settings => {
        if (!this.displayAllSettings) {
            this.settingsElements.forEach((element => {
                element.removeAttribute("data-default-setting");
                element.classList.add("d-none");
            }));
        }
        let nbActifSetting = 0;
        settings.forEach((setting => {
            let settingObj = this.settingsDictionnary.find((o => o.name === stringServiceInstance.normalizeSettingName(Object.keys(setting)[0])));
            if (settingObj) {
                nbActifSetting++;
                let settingElement = this.querySelector(settingObj?.element);
                settingElement?.setAttribute("data-values", JSON.stringify(Object.entries(setting)[0][1]));
                settingElement?.setAttribute("data-default-setting", "true");
                settingElement?.classList.remove("d-none");
            }
        }));
        if (nbActifSetting === 0 || nbActifSetting === this.settingsDictionnary.length) {
            this.settingsElements.forEach((element => {
                element.classList.remove("d-none");
            }));
            this.btnMoreSettings?.classList.add("d-none");
        }
    };
    displayOrHideOthersSettings=() => {
        this.displayAllSettings = !this.displayAllSettings;
        this.settingsElements.forEach((element => {
            if (!element.hasAttribute("data-default-setting")) {
                element.classList.toggle("d-none");
            }
        }));
        if (this.displayAllSettings) {
            this.btnMoreSettings.innerText = i18nServiceInstance.getMessage("lessSettings");
        } else {
            this.btnMoreSettings.innerText = i18nServiceInstance.getMessage("moreSettings");
        }
    };
}

"use strict";

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">\n\t\t\t<app-icon data-name="Agencement" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="layout"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-layout">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container d-flex flex-column gap-2">\n\t\t\t\t<app-margin-align class="c-category__setting" data-can-edit="true"></app-margin-align>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class LayoutComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplLayout.content.cloneNode(true));
    }
}

customElements.define("app-layout", LayoutComponent);

"use strict";

const tmplNavigation = document.createElement("template");

tmplNavigation.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">\n\t\t\t<app-icon data-name="Nav" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="navigation"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-navigation">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container d-flex flex-column gap-2">\n\t\t\t\t<app-focus-aspect class="c-category__setting" data-can-edit="true"></app-focus-aspect>\n\t\t\t\t<app-scroll class="c-category__setting" data-can-edit="true"></app-scroll>\n\t\t\t\t<app-link-style class="c-category__setting" data-can-edit="true"></app-link-style>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class NavigationComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplNavigation.content.cloneNode(true));
    }
}

customElements.define("app-navigation", NavigationComponent);

"use strict";

const tmplPictureVideo = document.createElement("template");

tmplPictureVideo.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-picture-video">\n\t\t\t<app-icon data-name="Photo_Video" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="medias"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-picture-video">\n\t\t<div class="accordion-body px-3">\n\t\t</div>\n\t</div>\n`;

class PictureVideoComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplPictureVideo.content.cloneNode(true));
    }
}

customElements.define("app-picture-video", PictureVideoComponent);

"use strict";

const tmplPointer = document.createElement("template");

tmplPointer.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-pointer">\n\t\t\t<app-icon data-name="Pointeur" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="pointer"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-pointer">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container d-flex flex-column gap-2">\n\t\t\t\t<app-cursor-aspect class="c-category__setting" data-can-edit="true"></app-cursor-aspect>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class PointerComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplPointer.content.cloneNode(true));
    }
}

customElements.define("app-pointer", PointerComponent);

"use strict";

const tmplSound = document.createElement("template");

tmplSound.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-sound">\n\t\t\t<app-icon data-name="Audio" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="audio"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-sound">\n\t\t<div class="accordion-body px-3">\n\t\t</div>\n\t</div>\n`;

class SoundComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplSound.content.cloneNode(true));
    }
}

customElements.define("app-sound", SoundComponent);

"use strict";

const tmplText = document.createElement("template");

tmplText.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">\n\t\t\t<app-icon data-name="Text" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="text"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-text">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container d-flex flex-column gap-2">\n\t\t\t\t<app-font-family class="c-category__setting" data-can-edit="true"></app-font-family>\n\t\t\t\t<app-text-size class="c-category__setting" data-can-edit="true"></app-text-size>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-reading-guide class="c-category__setting" data-can-edit="true"></app-reading-guide>\n\t\t\t\t<app-text-spacing class="c-category__setting" data-can-edit="true"></app-text-spacing>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class TextComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplText.content.cloneNode(true));
    }
}

customElements.define("app-text", TextComponent);

"use strict";

const tmplToolbar = document.createElement("template");

tmplToolbar.innerHTML = `\n<app-header id="header"></app-header>\n\n<app-home class="d-none"></app-home>\n<app-modes class="d-none"></app-modes>\n<app-settings class="d-none"></app-settings>\n<app-edit-setting class="d-none"></app-edit-setting>\n`;

class ToolbarComponent extends HTMLElement {
    header=null;
    home=null;
    modes=null;
    settings=null;
    historyRoute=[];
    json;
    defaultJson;
    constructor() {
        super();
        this.appendChild(tmplToolbar.content.cloneNode(true));
    }
    connectedCallback() {
        this.header = this.querySelector("#header");
        this.home = this.querySelector("app-home");
        this.modes = this.querySelector("app-modes");
        this.settings = this.querySelector("app-settings");
        filesServiceInstance.getModesOfUse().then((result => {
            this.defaultJson = result;
            localStorageServiceInstance.getItem(jsonName).then((result => {
                if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
                    this.json = result;
                } else {
                    this.json = this.defaultJson;
                    localStorageServiceInstance.setItem(jsonName, this.defaultJson);
                }
                this.setCurrentMode();
            }));
        }));
        window.addEventListener(`storage-${jsonName}`, (event => {
            localStorageServiceInstance.getItem(jsonName).then((result => {
                this.json = result;
                this.setCurrentMode();
            }));
        }));
        routeServiceInstance.initPages(this);
        this.addEventListener("changeRoute", (event => {
            if (event.detail.isPrev) {
                this.historyRoute.pop();
            } else {
                this.historyRoute.push(routeServiceInstance.currentRoute);
            }
            if (event.detail.setting) {
                this.json.selectedMode = event.detail.mode;
                this.setCurrentMode();
            }
            routeServiceInstance.navigate(event.detail.route);
            this.setHeaderDisplay(event.detail.route);
            this.header?.focus();
            this.header?.setAttribute("data-prev-route", this.historyRoute[this.historyRoute.length - 1]);
        }));
    }
    setHeaderDisplay=page => {
        switch (page) {
          case routeServiceInstance.PAGE_HOME:
            {
                this.header?.setAttribute("data-display", "primary");
                this.header?.setAttribute("data-title-page", "");
                break;
            }

          case routeServiceInstance.PAGE_MODES:
            {
                this.header?.setAttribute("data-display", "secondary");
                this.header?.setAttribute("data-title-page", "pageTitleModes");
                break;
            }

          case routeServiceInstance.PAGE_SETTINGS:
            {
                this.header?.setAttribute("data-display", "secondary");
                this.header?.setAttribute("data-title-page", "pageTitleSettings");
                break;
            }

          case routeServiceInstance.PAGE_EDIT_SETTING:
            {
                this.header?.setAttribute("data-display", "secondary");
                this.header?.setAttribute("data-title-page", "pageTitleEditSetting");
                break;
            }
        }
    };
    setCurrentMode=() => {
        if (this.json.selectedMode) {
            this.json.modes.forEach((mode => {
                if (Object.entries(mode)[0][0] === this.json.selectedMode) {
                    this.header?.setAttribute("data-selected-mode", this.json.selectedMode);
                    this.home?.setAttribute("data-mode", JSON.stringify(mode));
                    this.settings?.setAttribute("data-mode", JSON.stringify(mode));
                    this.modes?.setAttribute("data-list-mode", JSON.stringify(this.json));
                }
            }));
        } else {
            routeServiceInstance.navigate(routeServiceInstance.PAGE_MODES);
        }
        this.setCustomState();
    };
    setCustomState=() => {
        let defaultMode;
        let currentMode;
        this.defaultJson.modes.forEach((mode => {
            if (Object.keys(mode)[0] === this.json.selectedMode) {
                defaultMode = JSON.stringify(mode);
            }
        }));
        this.json.modes.forEach((mode => {
            if (Object.keys(mode)[0] === this.json.selectedMode) {
                currentMode = JSON.stringify(mode);
            }
        }));
        const isCustomMode = !(currentMode === defaultMode);
        this.home?.setAttribute("data-custom", isCustomMode.toString());
    };
}

customElements.define("app-toolbar", ToolbarComponent);

"use strict";

const appRootElt = document.createElement("app-root");

document.body.prepend(appRootElt);