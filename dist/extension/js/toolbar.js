/*
 * orange-confort-plus - version 5.0.0-alpha.4 - 25/04/2024
 * Enhance user experience on web sites
 * © 2014 - 2024 Orange SA
 */
"use strict";

const prefix = "cplus-";

const jsonName = "modeOfUse";

const PAGE_HOME = "home";

const PAGE_MODES = "modes";

const PAGE_SETTINGS = "settings";

const PAGE_EDIT_SETTING = "edit-setting";

"use strict";

let filesServiceIsInstantiated;

class FilesService {
    constructor() {
        if (filesServiceIsInstantiated) {
            throw new Error("FilesService is already instantiated.");
        }
        filesServiceIsInstantiated = true;
    }
    getJSONFile(file) {
        return fetch(chrome.runtime.getURL(`assets/json/${file}.json`)).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving ${file}.json: ${error}.`);
            return error;
        }));
    }
}

"use strict";

let i18nServiceIsInstantiated;

class I18nService {
    locale="en";
    constructor() {
        if (i18nServiceIsInstantiated) {
            throw new Error("I18nService is already instantiated.");
        }
        i18nServiceIsInstantiated = true;
        this.locale = chrome.i18n.getUILanguage();
    }
    getMessage=message => chrome.i18n.getMessage(message);
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

let pathServiceIsInstantiated;

class PathService {
    path="";
    constructor() {
        if (pathServiceIsInstantiated) {
            throw new Error("PathService is already instantiated.");
        }
        pathServiceIsInstantiated = true;
        this.path = chrome.runtime.getURL("/");
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
        return "";
    }
    loadSprite(root) {
        fetch(chrome.runtime.getURL("assets/icons/orange-icons-sprite.svg")).then((response => response.text())).then((svg => {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = svg;
            wrapper.hidden = true;
            root.insertBefore(wrapper, root.firstChild);
        }));
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
        chrome.storage.local.set({
            [`${prefix}${key}`]: value
        });
        let storeEvent = new CustomEvent(`storage-${key}`, {
            bubbles: true
        });
        window.dispatchEvent(storeEvent);
    }
    getItem(key) {
        return chrome.storage.local.get([ `${prefix}${key}` ]).then((datas => new Promise(((resolve, reject) => {
            resolve(datas[`${prefix}${key}`]);
            reject(new Error("KO"));
        }))));
    }
    removeItem(key) {
        chrome.storage.local.remove([ `${prefix}${key}` ]);
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
        this.settingAccordions[mainIndex].open = open;
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
            this.settingAccordions = this.settingAccordions.map((accordion => ({
                ...accordion,
                open: accordion.name === mainAccordion
            })));
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
        localStorageServiceInstance.getItem(jsonName).then((result => {
            let json = result;
            json.selectedMode = newSelectedMode;
            localStorageServiceInstance.setItem(jsonName, json);
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
    setSettingValue(key, newIndex, newValue) {
        let jsonIsEdited = false;
        return localStorageServiceInstance.getItem(jsonName).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(key)));
                    if (setting) {
                        let settingValues = Object.entries(setting)[0][1];
                        if (newValue) {
                            let newValues = settingValues.values.split(",");
                            newValues.length === 4 ? newValues[3] = newValue : newValues.push(newValue);
                            settingValues.values = newValues.toString();
                        }
                        settingValues.valueSelected = newIndex;
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
    getCustomValue(settingName) {
        let customValue = "";
        return localStorageServiceInstance.getItem(jsonName).then((result => {
            let json = result;
            json.modes.forEach((mode => {
                if (Object.keys(mode)[0] === json.selectedMode) {
                    let modeSettings = Object.entries(mode)[0][1];
                    let setting = modeSettings.find((o => stringServiceInstance.normalizeSettingName(Object.keys(o)[0]) === stringServiceInstance.normalizeSettingName(settingName)));
                    customValue = Object.entries(setting)[0][1].values.split(",")[3];
                }
            }));
            return customValue;
        })).catch((error => {
            console.error("The custom value of this setting could not be return.");
            return customValue;
        }));
    }
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
            name: "clickFacilite",
            instanceService: clickFaciliteServiceInstance.setClickFacilite.bind(this),
            value: ""
        }, {
            name: "colorContrast",
            instanceService: colorContrastServiceInstance.setColorsContrasts.bind(this),
            value: ""
        }, {
            name: "cursorAspect",
            instanceService: cursorAspectServiceInstance.setCursor.bind(this),
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
            name: "marginAlign",
            instanceService: marginAlignServiceInstance.setMargin.bind(this),
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
                settingsService.instanceService("noModifications");
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
    initPages=root => {
        this.toolbar = root;
        return localStorageServiceInstance.getItem("current-route").then((result => {
            if (this.routes.some((route => result === route))) {
                this.navigate(result);
                return result;
            } else {
                this.navigate(PAGE_HOME);
                return PAGE_HOME;
            }
        }));
    };
    navigate=newRoute => {
        if (newRoute !== this.currentRoute) {
            this.routes.forEach((route => {
                if (route === newRoute) {
                    const element = `<app-${route}></app-${route}>`;
                    this.toolbar.insertAdjacentHTML("beforeend", element);
                    const page = this.toolbar.querySelector(`app-${route}`);
                    i18nServiceInstance.translate(page);
                } else if (route === this.currentRoute) {
                    this.toolbar.querySelector(`app-${route}`)?.remove();
                }
            }));
            this.setHistoryAndHeader(newRoute);
            this.currentRoute = newRoute;
            localStorageServiceInstance.setItem("current-route", newRoute);
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
}

"use strict";

let capitalsServiceIsInstantiated;

class CapitalsService {
    constructor() {
        if (capitalsServiceIsInstantiated) {
            throw new Error("CapitalsService is already instantiated.");
        }
        capitalsServiceIsInstantiated = true;
    }
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
        this.delay = Number(value.split("_")[1]) * 1e3;
        switch (paramName) {
          case "bigZone":
            {
                this.resetEventClick();
                scrollServiceInstance.setScrollParams({
                    name: "clickFacilite",
                    btnState: "",
                    bigScrollActivated: true
                });
                break;
            }

          case "longClick":
            {
                this.resetEventClick();
                scrollServiceInstance.setScrollParams({
                    name: "clickFacilite",
                    btnState: "scrollOnClick",
                    bigScrollActivated: true
                });
                this.longClick();
                break;
            }

          case "autoClick":
            {
                this.resetEventClick();
                scrollServiceInstance.setScrollParams({
                    name: "clickFacilite",
                    btnState: "scrollOnClick",
                    bigScrollActivated: true
                });
                this.autoClick();
                break;
            }

          default:
            {
                this.resetEventClick();
                scrollServiceInstance.setScrollParams({
                    name: "clickFacilite",
                    btnState: "",
                    bigScrollActivated: false
                });
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
    constructor() {
        if (colorContrastServiceIsInstantiated) {
            throw new Error("ColorContrastService is already instantiated.");
        }
        colorContrastServiceIsInstantiated = true;
    }
    setColorsContrasts=value => {
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle("color-contrast");
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
            stylesServiceInstance.setStyle("color-contrast", styleColorContrast);
        }
    };
}

"use strict";

let colourThemeServiceIsInstantiated;

class ColourThemeService {
    constructor() {
        if (colourThemeServiceIsInstantiated) {
            throw new Error("ColourThemeService is already instantiated.");
        }
        colourThemeServiceIsInstantiated = true;
    }
}

"use strict";

let cursorAspectServiceIsInstantiated;

class CursorAspectService {
    constructor() {
        if (cursorAspectServiceIsInstantiated) {
            throw new Error("CursorAspectService is already instantiated.");
        }
        cursorAspectServiceIsInstantiated = true;
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
            stylesServiceInstance.removeStyle("cursor-aspect");
        } else {
            let color = value.split("_")[1];
            let size = value.split("_")[0] === "big" ? 56 : 128;
            let styleCursor = `\n\t\t\t\t* {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("default", size, color, 10)}') 0 0, default !important;\n\t\t\t\t}\n\n\t\t\t\ta:link,\n\t\t\t\ta:visited,\n\t\t\t\tbutton {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("pointer", size, color, 10)}') ${size / 3} 0, pointer !important;\n\t\t\t\t}\n\n\t\t\t\th1, h2, h3, h4, h5, h6,\n\t\t\t\tp, ul, ol, dl, blockquote,\n\t\t\t\tpre, td, th,\n\t\t\t\tinput, textarea, legend {\n\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${this.drawCursor("text", size, color, 4)}') ${size / 4} ${size / 4}, text !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("cursor-aspect", styleCursor);
        }
    };
}

"use strict";

let deleteBackgroundImagesServiceIsInstantiated;

class DeleteBackgroundImagesService {
    constructor() {
        if (deleteBackgroundImagesServiceIsInstantiated) {
            throw new Error("DeleteBackgroundImagesService is already instantiated.");
        }
        deleteBackgroundImagesServiceIsInstantiated = true;
    }
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
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle("focus-aspect");
        } else {
            let size = value.split("_")[0] === "big" ? "4px" : "10px";
            let color = value.split("_")[1];
            let styleFocus = `\n\t\t\t\t*:focus, *:focus-visible {\n\t\t\t\t\toutline: ${color} solid ${size} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("focus-aspect", styleFocus);
        }
    };
}

"use strict";

let fontFamilyServiceIsInstantiated;

class FontFamilyService {
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
        if (value === "noModifications") {
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
        if (value === "noModifications") {
            stylesServiceInstance.removeStyle("link");
        } else {
            let linkColor = value.split("_")[0];
            let linkPointedColor = value.split("_")[1];
            let linkVisitedColor = value.split("_")[2];
            let styleLink = `\n\t\t\t\ta:link {\n\t\t\t\t\tcolor: ${linkColor} !important;\n\t\t\t\t}\n\t\t\t\ta:visited {\n\t\t\t\t\tcolor: ${linkVisitedColor} !important;\n\t\t\t\t}\n\t\t\t\ta:active, a:hover, a:focus {\n\t\t\t\t\tcolor: ${linkPointedColor} !important;\n\t\t\t\t}\n\t\t\t`;
            stylesServiceInstance.setStyle("link", styleLink);
        }
    };
}

"use strict";

let loupeServiceIsInstantiated;

class LoupeService {
    constructor() {
        if (loupeServiceIsInstantiated) {
            throw new Error("LoupeService is already instantiated.");
        }
        loupeServiceIsInstantiated = true;
    }
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
    constructor() {
        if (navigationAutoServiceIsInstantiated) {
            throw new Error("NavigationAutoService is already instantiated.");
        }
        navigationAutoServiceIsInstantiated = true;
    }
}

"use strict";

let navigationButtonsServiceIsInstantiated;

class NavigationButtonsService {
    constructor() {
        if (navigationButtonsServiceIsInstantiated) {
            throw new Error("NavigationButtonsService is already instantiated.");
        }
        navigationButtonsServiceIsInstantiated = true;
    }
}

"use strict";

let readAloudServiceIsInstantiated;

class ReadAloudService {
    constructor() {
        if (readAloudServiceIsInstantiated) {
            throw new Error("ReadAloudService is already instantiated.");
        }
        readAloudServiceIsInstantiated = true;
    }
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
    classRuleGuide=`\n\t\t#cplus-vertical-guide-elt {\n\t\t\tborder-left: 4px solid black;\n\t\t\tbackground: white;\n\t\t\theight: 100%;\n\t\t\twidth: 6px;\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t\tz-index: 2147483645;\n\t\t}\n\t`;
    classMaskGuide=`\n\t\t#cplus-mask-guide--top-elt,\n\t\t#cplus-mask-guide--bottom-elt {\n\t\t\tbackground: rgba(0, 0, 0, 0.5);\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tz-index: 2147483645;\n\t\t}\n\t\t#cplus-mask-guide--top-elt {\n\t\t\ttop: 0;\n\t\t}\n\t\t#cplus-mask-guide--bottom-elt {\n\t\t\tbottom: 0;\n\t\t}\n\t`;
    constructor() {
        if (readingGuideServiceIsInstantiated) {
            throw new Error("ReadingGuideService is already instantiated.");
        }
        readingGuideServiceIsInstantiated = true;
        this.readingGuideElt = document.querySelector("#cplus-vertical-guide-elt");
        this.topGuideElt = document.querySelector("#cplus-top-guide-elt");
        this.bottomGuideElt = document.querySelector("#cplus-bottom-guide-elt");
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
        document.addEventListener("mousemove", this.handlerReadingGuide);
    };
    resetGuide=() => {
        this.guideType = "";
        stylesServiceInstance.removeStyle("reading-guide");
        document.querySelector("#cplus-vertical-guide-elt")?.remove();
        document.querySelector("#cplus-mask-guide--top-elt")?.remove();
        document.querySelector("#cplus-mask-guide--bottom-elt")?.remove();
    };
    createHandlerReadingGuide=() => event => {
        if (event.type === "mousemove") {
            if (this.guideType === "rule") {
                document.querySelector("#cplus-vertical-guide-elt").style.left = `${event.x + 2}px`;
            } else if (this.guideType === "mask") {
                document.querySelector("#cplus-mask-guide--top-elt").style.height = `${event.y - this.sizeGuide}px`;
                document.querySelector("#cplus-mask-guide--bottom-elt").style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
            }
            event.stopPropagation();
        }
    };
}

"use strict";

let scrollServiceIsInstantiated;

class ScrollService {
    btnScrollUp=null;
    btnScrollDown=null;
    btnState="";
    bigScrollActivated=false;
    scrollSteps=10;
    scrollTimer=50;
    settingsValues=[];
    constructor() {
        if (scrollServiceIsInstantiated) {
            throw new Error("ScrollService is already instantiated.");
        }
        scrollServiceIsInstantiated = true;
        this.setScrollClass();
    }
    setScrollClass=() => {
        let styleScroll = `\n\t\t\t.cplus-big-scroll::-webkit-scrollbar, .cplus-big-scroll *::-webkit-scrollbar {\n\t\t\t\t\twidth: 2rem;\n\t\t\t}\n\t\t\t.cplus-big-scroll::-webkit-scrollbar-thumb, .cplus-big-scroll *::-webkit-scrollbar-thumb {\n\t\t\t\tbackground-color: lightgrey;\n\t\t\t\tborder-radius: 1.75rem\n\t\t\t\twidth: 2rem;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.cplus-big-scroll::-webkit-scrollbar-thumb:hover, .cplus-big-scroll *::-webkit-scrollbar-thumb:hover {\n\t\t\t\tbackground-color: grey;\n\t\t\t}\n\n\t\t\t#cplus-container-scroll-buttons {\n\t\t\t\tdisplay: flex;\n\t\t\t\tgap: 1rem;\n\t\t\t\tposition: fixed;\n\t\t\t\tbottom: 1rem;\n\t\t\t\tright: 1rem;\n\t\t\t\tz-index: 2147483647;\n\t\t\t}\n\n\t\t\t#cplus-container-scroll-buttons button {\n\t\t\t\tbackground: #f16e00;\n\t\t\t\tcolor: #000;\n\t\t\t\tborder: none;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tpadding: 1rem 2rem;\n\t\t\t}\n\t\t\t.d-none {\n\t\t\t\tdisplay: none;\n\t\t\t}\n\t\t`;
        stylesServiceInstance.setStyle("scroll", styleScroll);
    };
    setScroll=value => {
        let bigScroll;
        let btnState;
        if (value === "noModifications") {
            bigScroll = false;
            btnState = "";
        } else if (value === "bigScroll") {
            bigScroll = true;
            btnState = "";
        } else {
            bigScroll = false;
            btnState = value;
        }
        const scrollSettingValues = {
            name: "scroll",
            btnState: btnState,
            bigScrollActivated: bigScroll
        };
        this.setScrollParams(scrollSettingValues);
    };
    setScrollParams=values => {
        const existingIndex = this.settingsValues.findIndex((item => item.name === values.name));
        if (existingIndex >= 0) {
            this.settingsValues[existingIndex] = values;
        } else {
            this.settingsValues.push(values);
        }
        this.calculatePriority(values);
        this.setBigScroll();
        this.setBtnScroll();
    };
    calculatePriority=values => {
        let tmpBigScroll = false;
        let tmpBtnState = "";
        for (let setting of this.settingsValues) {
            tmpBigScroll = Boolean(tmpBigScroll || setting.bigScrollActivated);
            tmpBtnState = setting.btnState ? setting.btnState : tmpBtnState;
        }
        this.bigScrollActivated = tmpBigScroll;
        this.btnState = tmpBtnState;
    };
    setBigScroll=() => {
        if (this.bigScrollActivated) {
            document.body.classList.add("cplus-big-scroll");
        } else {
            document.body.classList.remove("cplus-big-scroll");
        }
    };
    setBtnScroll=() => {
        document.querySelector("#cplus-container-scroll-buttons")?.remove();
        if (this.btnState) {
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
            let fragment = document.createDocumentFragment();
            const container = document.createElement("div");
            container.setAttribute("id", "cplus-container-scroll-buttons");
            btnArray.forEach((button => {
                let btn = document.createElement("button");
                btn.setAttribute("id", button.id);
                btn.type = "button";
                btn.innerHTML = button.label;
                container.appendChild(btn);
                fragment.appendChild(container);
                document.body.appendChild(fragment);
                button.element = document.querySelector(`#${button.id}`);
                let scrollDir = button.id.includes("up") ? -1 : button.id.includes("down") ? 1 : 0;
                let scrollBy = scrollDir * this.scrollSteps;
                if (this.btnState === "scrollOnMouseover") {
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
        }
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
        if (value === "noModifications") {
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
        if (value === "noModifications") {
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

const categoriesServiceInstance = new CategoriesService;

Object.seal(categoriesServiceInstance);

const routeServiceInstance = new RouteService;

Object.seal(routeServiceInstance);

const capitalsServiceInstance = new CapitalsService;

Object.seal(capitalsServiceInstance);

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

const loupeServiceInstance = new LoupeService;

Object.seal(loupeServiceInstance);

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
        localStorageServiceInstance.getItem("is-opened").then((result => {
            if (result === "true") {
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
        this.settingBtn.setAttribute("data-name", this.name);
        this.modalBtn.setAttribute("data-name", this.name);
        if (this.canEdit) {
            this.modalBtn.classList.remove("d-none");
            this.settingBtn.classList.add("sc-btn-setting--with-btn-modal");
        }
        this.setSettingBtn(this.activesValues);
        this.settingBtn.addEventListener("changeSettingEvent", this.handler);
    }
    disconnectedCallback() {
        this.modalBtn.removeEventListener("clickModalEvent", this.handler);
        this.settingBtn.removeEventListener("changeSettingEvent", this.handler);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-values" === name) {
            this.activesValues = JSON.parse(newValue);
            this.setSettingBtn(this.activesValues);
            if (this.callback) {
                this.callback(this.activesValues.values.split(",")[this.activesValues.valueSelected]);
            }
        }
    }
    setSettingBtn=activesValues => {
        this.settingBtn.setAttribute("data-values", activesValues.values);
        this.settingBtn.setAttribute("data-active-value", activesValues.valueSelected.toString());
        this.modalBtn.setAttribute("data-value", i18nServiceInstance.getMessage(activesValues.values.split(",")[activesValues.valueSelected]));
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
                this.modalBtn.setAttribute("data-value", i18nServiceInstance.getMessage(newValue));
            }
        }));
    };
}

"use strict";

const tmplCapitals = document.createElement("template");

tmplCapitals.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class CapitalsComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplCapitals.content.cloneNode(true));
    }
}

customElements.define("app-capitals", CapitalsComponent);

"use strict";

const tmplClearlyLinks = document.createElement("template");

tmplClearlyLinks.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class ClearlyLinksComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplClearlyLinks.content.cloneNode(true));
    }
}

customElements.define("app-clearly-links", ClearlyLinksComponent);

"use strict";

const tmplClickFacilite = document.createElement("template");

tmplClickFacilite.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ClickFaciliteComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,longClick_2,autoClick_2",
        valueSelected: 0
    };
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
    activesValues={
        values: "noModifications,reinforcedContrasts,white_black",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(colorContrastServiceInstance.setColorsContrasts.bind(this));
        this.appendChild(tmplColorContrast.content.cloneNode(true));
    }
}

customElements.define("app-color-contrast", ColorContrastComponent);

"use strict";

const tmplColourTheme = document.createElement("template");

tmplColourTheme.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class ColourThemeComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplColourTheme.content.cloneNode(true));
    }
}

customElements.define("app-colour-theme", ColourThemeComponent);

"use strict";

const tmplCursorAspect = document.createElement("template");

tmplCursorAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class CursorAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big_black,huge_green",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(cursorAspectServiceInstance.setCursor.bind(this));
        this.appendChild(tmplCursorAspect.content.cloneNode(true));
    }
}

customElements.define("app-cursor-aspect", CursorAspectComponent);

"use strict";

const tmplDeleteBackgroundImages = document.createElement("template");

tmplDeleteBackgroundImages.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class DeleteBackgroundImagesComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplDeleteBackgroundImages.content.cloneNode(true));
    }
}

customElements.define("app-delete-background-images", DeleteBackgroundImagesComponent);

"use strict";

const tmplFocusAspect = document.createElement("template");

tmplFocusAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FocusAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big_blue,veryBig_red",
        valueSelected: 0
    };
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
    activesValues={
        values: "noModifications,Accessible_DfA,Luciole",
        valueSelected: 0
    };
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
    activesValues={
        values: "noModifications,lightblue_orange_lightgreen,yellow_orange_lightgreen",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(linkStyleServiceInstance.setLinkStyle.bind(this));
        this.appendChild(tmplLinkStyle.content.cloneNode(true));
    }
}

customElements.define("app-link-style", LinkStyleComponent);

"use strict";

const tmplLoupe = document.createElement("template");

tmplLoupe.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="loupe" data-icon="Loupe" data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class LoupeComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplLoupe.content.cloneNode(true));
    }
}

customElements.define("app-loupe", LoupeComponent);

"use strict";

const tmplMarginAlign = document.createElement("template");

tmplMarginAlign.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class MarginAlignComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,alignLeft,margeList",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(marginAlignServiceInstance.setMargin.bind(this));
        this.appendChild(tmplMarginAlign.content.cloneNode(true));
    }
}

customElements.define("app-margin-align", MarginAlignComponent);

"use strict";

const tmplNavigationAuto = document.createElement("template");

tmplNavigationAuto.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class NavigationAutoComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplNavigationAuto.content.cloneNode(true));
    }
}

customElements.define("app-navigation-auto", NavigationAutoComponent);

"use strict";

const tmplNavigationButtons = document.createElement("template");

tmplNavigationButtons.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class NavigationButtonsComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplNavigationButtons.content.cloneNode(true));
    }
}

customElements.define("app-navigation-buttons", NavigationButtonsComponent);

"use strict";

const tmplReadAloud = document.createElement("template");

tmplReadAloud.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="readAloud" data-icon="ReadAloud" data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ReadAloudComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplReadAloud.content.cloneNode(true));
    }
}

customElements.define("app-read-aloud", ReadAloudComponent);

"use strict";

const tmplReadingGuide = document.createElement("template");

tmplReadingGuide.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ReadingGuideComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,ruleGuide,maskGuide",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(readingGuideServiceInstance.setReadingMaskGuide.bind(this));
        this.appendChild(tmplReadingGuide.content.cloneNode(true));
    }
}

customElements.define("app-reading-guide", ReadingGuideComponent);

"use strict";

const tmplScroll = document.createElement("template");

tmplScroll.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class ScrollComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,bigScroll,scrollOnMouseover",
        valueSelected: 0
    };
    constructor() {
        super();
        this.setCallback(scrollServiceInstance.setScroll.bind(this));
        this.appendChild(tmplScroll.content.cloneNode(true));
    }
}

customElements.define("app-scroll", ScrollComponent);

"use strict";

const tmplSkipToContent = document.createElement("template");

tmplSkipToContent.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class SkipToContentComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplSkipToContent.content.cloneNode(true));
    }
}

customElements.define("app-skip-to-content", SkipToContentComponent);

"use strict";

const tmplSkipToContent = document.createElement("template");

tmplSkipToContent.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none" data-disabled="true"></app-btn-modal>\n</div>\n`;

class SkipToContentComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplSkipToContent.content.cloneNode(true));
    }
}

customElements.define("app-skip-to-content", SkipToContentComponent);

"use strict";

const tmplStopAnimations = document.createElement("template");

tmplStopAnimations.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="loupe" data-icon="Animation_Hide" data-disabled="true"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class StopAnimationsComponent extends AbstractSetting {
    activesValues={
        values: "",
        valueSelected: 0
    };
    constructor() {
        super();
        this.appendChild(tmplStopAnimations.content.cloneNode(true));
    }
}

customElements.define("app-stop-animations", StopAnimationsComponent);

"use strict";

const tmplIncreaseTextSize = document.createElement("template");

tmplIncreaseTextSize.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class IncreaseTextSizeComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,110,130",
        valueSelected: 0
    };
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
    activesValues={
        values: "noModifications,spacingTextLabelSmall,spacingTextLabelBig",
        valueSelected: 0
    };
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
            switch (event.target) {
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
            switch (event.target) {
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

btnSettingLayout.innerHTML = `\n\t<button type="button" class="sc-btn-setting btn btn-primary flex-column justify-content-between w-100 px-1">\n\t\t<div class="d-flex flex-column">\n\t\t\t<span></span>\n\t\t\t<app-icon data-size="1.5em"></app-icon>\n\t\t</div>\n\t\t<ul class="d-flex gap-1 align-items-center mt-2 mb-0 list-unstyled"></ul>\n\t</button>\n`;

class BtnSettingComponent extends HTMLElement {
    static observedAttributes=[ "data-values", "data-active-value", "data-name", "data-disabled" ];
    settingBtn=null;
    btnContentSlots=null;
    index;
    value;
    label="";
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
        this.btnContentSlots = this.querySelector("ul");
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
            this.label = settingName;
            const span = this.querySelector("span");
            const icon = this.querySelector("app-icon");
            span.innerText = i18nServiceInstance.getMessage(settingName);
            icon?.setAttribute("data-name", settingName);
        }
        if ("data-disabled" === name) {
            this.disabled = newValue === "true";
            this.setDisabledState();
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
    setDisabledState=() => {
        console.log(this.settingBtn);
        this.settingBtn.disabled = this.disabled;
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
        if ("data-page-title" === name) {
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
            switch (event.target) {
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
        this.labelElement = this.querySelector("label");
        this.iconElement = this.querySelector("app-icon");
        this.textElement = this.querySelector("div span");
        this.descriptionElement = this.querySelector("label > span");
        this.inputElement.id = stringServiceInstance.normalizeID(this.label);
        this.inputElement.value = this.label;
        this.inputElement.checked = this.checked;
        this.inputElement.disabled = this.disabled;
        this.labelElement?.setAttribute("for", stringServiceInstance.normalizeID(this.label));
        this.iconElement?.setAttribute("data-name", `${this.label}_border`);
        this.textElement.innerText = i18nServiceInstance.getMessage(`${this.label}Name`);
        this.descriptionElement.innerText = i18nServiceInstance.getMessage(`${this.label}Description`);
    }
}

customElements.define("app-select-mode", SelectModeComponent);

"use strict";

const editSettingLayout = document.createElement("template");

editSettingLayout.innerHTML = `\n\t<div class="gap-1 p-3 text-body">\n\t\t<div class="d-flex align-items-center gap-2 mb-2">\n\t\t\t<app-icon id="edit-setting-icon" data-size="2rem"></app-icon>\n\t\t\t<p id="edit-setting-title" class="fs-4 fw-bold mb-0"></p>\n\t\t</div>\n\n\t\t<p id="edit-setting-instruction"></p>\n\n\t\t<app-edit-font-family class="sc-edit-setting__setting"></app-edit-font-family>\n\t\t<app-edit-text-size class="sc-edit-setting__setting"></app-edit-text-size>\n\t\t<app-edit-reading-guide class="sc-edit-setting__setting"></app-edit-reading-guide>\n\t\t<app-edit-margin-align class="sc-edit-setting__setting"></app-edit-margin-align>\n\t\t<app-edit-loupe class="sc-edit-setting__setting"></app-edit-loupe>\n\t\t<app-edit-read-aloud class="sc-edit-setting__setting"></app-edit-read-aloud>\n\t\t<app-edit-text-spacing class="sc-edit-setting__setting"></app-edit-text-spacing>\n\t\t<app-edit-focus-aspect class="sc-edit-setting__setting"></app-edit-focus-aspect>\n\t\t<app-edit-click-facilite class="sc-edit-setting__setting"></app-edit-click-facilite>\n\t\t<app-edit-cursor-aspect class="sc-edit-setting__setting"></app-edit-cursor-aspect>\n\t\t<app-edit-color-contrast class="sc-edit-setting__setting"></app-edit-color-contrast>\n\t\t<app-edit-link-style class="sc-edit-setting__setting"></app-edit-link-style>\n\t\t<app-edit-stop-animations class="sc-edit-setting__setting"></app-edit-stop-animations>\n\t\t<app-edit-scroll class="sc-edit-setting__setting"></app-edit-scroll>\n\t</div>\n`;

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
            this.settingTitle.innerText = i18nServiceInstance.getMessage(this.settingName);
            this.settingInstruction.innerText = i18nServiceInstance.getMessage(`${this.settingName}Instruction`);
            this.displaySetting(`edit-${newValue}`);
        }
    }
    displaySetting=settingName => {
        this.settingsDictionnary.forEach((setting => {
            if (settingName !== setting.name) {
                this.querySelector(setting.element).classList.add("d-none");
            }
        }));
    };
}

customElements.define("app-edit-setting", EditSettingComponent);

"use strict";

const editClickFaciliteLayout = document.createElement("template");

editClickFaciliteLayout.innerHTML = `\n\t<p>Edit click facilite works !</p>\n`;

class EditClickFaciliteComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editClickFaciliteLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-click-facilite", EditClickFaciliteComponent);

"use strict";

const editColorContrastLayout = document.createElement("template");

editColorContrastLayout.innerHTML = `\n\t<p>Edit color contrast works !</p>\n`;

class EditColorContrastComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editColorContrastLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-color-contrast", EditColorContrastComponent);

"use strict";

const editCursorAspectLayout = document.createElement("template");

editCursorAspectLayout.innerHTML = `\n\t<p>Edit cursor aspect works !</p>\n`;

class EditCursorAspectComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editCursorAspectLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-cursor-aspect", EditCursorAspectComponent);

"use strict";

const editFocusAspectLayout = document.createElement("template");

editFocusAspectLayout.innerHTML = `\n\t<p>Edit focus aspect works !</p>\n`;

class EditFocusAspectComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editFocusAspectLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-focus-aspect", EditFocusAspectComponent);

"use strict";

const editFontFamilyLayout = document.createElement("template");

editFontFamilyLayout.innerHTML = `\n\t<p>Edit font family works !</p>\n`;

class EditFontFamilyComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editFontFamilyLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-font-family", EditFontFamilyComponent);

"use strict";

const editLinkStyleLayout = document.createElement("template");

editLinkStyleLayout.innerHTML = `\n\t<p>Edit link style works !</p>\n`;

class EditLinkStyleComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editLinkStyleLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-link-style", EditLinkStyleComponent);

"use strict";

const editLoupeLayout = document.createElement("template");

editLoupeLayout.innerHTML = `\n\t<p>Edit loupe works !</p>\n`;

class EditLoupeComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editLoupeLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-loupe", EditLoupeComponent);

"use strict";

const editMarginAlignLayout = document.createElement("template");

editMarginAlignLayout.innerHTML = `\n\t<p>Edit margin align works !</p>\n`;

class EditMarginAlignComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editMarginAlignLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-margin-align", EditMarginAlignComponent);

"use strict";

const editReadAloudLayout = document.createElement("template");

editReadAloudLayout.innerHTML = `\n\t<p>Edit read aloud works !</p>\n`;

class EditReadAloudComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editReadAloudLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-read-aloud", EditReadAloudComponent);

"use strict";

const editReadingGuideLayout = document.createElement("template");

editReadingGuideLayout.innerHTML = `\n\t<p>Edit reading guide works !</p>\n`;

class EditReadingGuideComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editReadingGuideLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-reading-guide", EditReadingGuideComponent);

"use strict";

const editScrollLayout = document.createElement("template");

editScrollLayout.innerHTML = `\n\t<p>Edit scroll works !</p>\n`;

class EditScrollComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editScrollLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-scroll", EditScrollComponent);

"use strict";

const editStopAnimationsLayout = document.createElement("template");

editStopAnimationsLayout.innerHTML = `\n\t<p>Edit stop animations works !</p>\n`;

class EditStopAnimationsComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editStopAnimationsLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-stop-animations", EditStopAnimationsComponent);

"use strict";

const editTextSizeLayout = document.createElement("template");

editTextSizeLayout.innerHTML = `\n\t<form class="d-flex align-items-center justify-content-between gap-2">\n\t\t<button id="edit-btn-prev" type="button" class="btn btn-icon btn-primary">\n\t\t\t<span class="visually-hidden" data-i18n="increaseTextSize"></span>\n\t\t\t<app-icon data-name="Minus_small"></app-icon>\n\t\t</button>\n\t\t<output id="selected-value"></output>\n\t\t<button id="edit-btn-next" type="button" class="btn btn-icon btn-primary">\n\t\t\t<span class="visually-hidden" data-i18n="reduceTextSize"></span>\n\t\t\t<app-icon data-name="Plus_small"></app-icon>\n\t\t</button>\n\t</form>\n`;

class EditTextSizeComponent extends HTMLElement {
    selectedValue=null;
    btnPrevValue=null;
    btnNextValue=null;
    currentIndex=null;
    currentValue=null;
    textSizeValues=[ "110", "130", "160", "200", "350", "500" ];
    handler;
    constructor() {
        super();
        this.appendChild(editTextSizeLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectedValue = this.querySelector("#selected-value");
        this.btnPrevValue = this.querySelector("#edit-btn-prev");
        this.btnNextValue = this.querySelector("#edit-btn-next");
        this.btnPrevValue?.addEventListener("click", this.handler);
        this.btnNextValue?.addEventListener("click", this.handler);
        modeOfUseServiceInstance.getCustomValue("textSize").then((result => {
            if (result) {
                this.currentIndex = this.textSizeValues.findIndex((i => i === result));
                this.moveTextSize(this.currentIndex);
            } else {
                this.moveTextSize(0);
            }
        }));
    }
    moveTextSize=index => {
        this.currentIndex = index;
        this.btnPrevValue.disabled = false;
        this.btnNextValue.disabled = false;
        if (this.currentIndex <= 0) {
            this.currentIndex = 0;
            this.btnPrevValue.disabled = true;
            this.btnNextValue.disabled = false;
        } else if (this.currentIndex >= this.textSizeValues.length - 1) {
            this.currentIndex = this.textSizeValues.length - 1;
            this.btnPrevValue.disabled = false;
            this.btnNextValue.disabled = true;
        }
        this.currentValue = this.textSizeValues[this.currentIndex];
        this.selectedValue.innerText = this.currentValue;
        modeOfUseServiceInstance.setSettingValue("textSize", 3, this.currentValue);
        textSizeServiceInstance.setFontSize(this.currentValue);
    };
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.target) {
              case this.btnPrevValue:
                this.moveTextSize(this.currentIndex - 1);
                break;

              case this.btnNextValue:
                this.moveTextSize(this.currentIndex + 1);
                break;
            }
        }
    };
}

customElements.define("app-edit-text-size", EditTextSizeComponent);

"use strict";

const editTextSpacingLayout = document.createElement("template");

editTextSpacingLayout.innerHTML = `\n\t<p>Edit text spacing works !</p>\n`;

class EditTextSpacingComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editTextSpacingLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-edit-text-spacing", EditTextSpacingComponent);

"use strict";

const homeLayout = document.createElement("template");

homeLayout.innerHTML = `\n<section class="bg-dark p-3 d-flex align-items-center justify-content-between">\n\t\t<div class="d-flex gap-2">\n\t\t\t\t<div class="sc-home__icon-mode bg-body rounded-circle text-body">\n\t\t\t\t\t\t<app-icon data-size="5em"></app-icon>\n\t\t\t\t</div>\n\t\t\t\t<div class="d-flex justify-content-center flex-column">\n\t\t\t\t\t\t<span class="text-white" data-i18n="profile"></span>\n\t\t\t\t\t\t<span id="mode-name" class="fs-4 fw-bold text-primary"></span>\n\t\t\t\t</div>\n\t\t</div>\n\t\t<div class="d-grid gap-3 d-md-block">\n\t\t\t\t<button id="settings-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="openSettingsMode">\n\t\t\t\t\t\t<span class="visually-hidden" data-i18n="openSettingsMode"></span>\n\t\t\t\t\t\t<app-icon data-name="Settings"></app-icon>\n        </button>\n\t\t\t\t<button id="pause-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">\n            <span id="pause-label" class="visually-hidden" data-i18n="pause"></span>\n\t\t\t\t\t\t<app-icon id="pause-icon" data-name="Pause"></app-icon>\n        </button>\n    </div>\n</section>\n\n<section class="gap-3 p-3">\n\t<p id="pause-info" class="d-none" data-i18n="pauseInfo"></p>\n\t<div class="sc-home__settings gap-3">\n\t\t<app-mode></app-mode>\n\t\t<div class="d-flex">\n\t\t\t<button id="change-mode-btn" class="btn btn-link" type="button" data-i18n="otherModes"></button>\n\t\t</div>\n\t</div>\n</section>\n`;

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
        }
    }
    createHandler=() => event => {
        if (event.type === "click") {
            switch (event.target) {
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

tmplMode.innerHTML = `\n<div id="mode-content" class="sc-mode__setting-grid gap-2">\n\t<app-font-family class="sc-mode__setting"></app-font-family>\n\t<app-text-size class="sc-mode__setting"></app-text-size>\n\t<app-capitals class="sc-mode__setting"></app-capitals>\n\t<app-text-spacing class="sc-mode__setting"></app-text-spacing>\n\t<app-reading-guide class="sc-mode__setting"></app-reading-guide>\n\t<app-margin-align class="sc-mode__setting"></app-margin-align>\n\t<app-loupe class="sc-mode__setting"></app-loupe>\n\t<app-read-aloud class="sc-mode__setting"></app-read-aloud>\n\t<app-colour-theme class="sc-mode__setting"></app-colour-theme>\n\t<app-cursor-aspect class="sc-mode__setting"></app-cursor-aspect>\n\t<app-focus-aspect class="sc-mode__setting"></app-focus-aspect>\n\t<app-color-contrast class="sc-mode__setting"></app-color-contrast>\n\t<app-link-style class="sc-mode__setting"></app-link-style>\n\t<app-clearly-links class="sc-mode__setting"></app-clearly-links>\n\t<app-stop-animations class="sc-mode__setting"></app-stop-animations>\n\t<app-delete-background-images class="sc-mode__setting"></app-delete-background-images>\n\t<app-scroll class="sc-mode__setting"></app-scroll>\n\t<app-skip-to-content class="sc-mode__setting"></app-skip-to-content>\n\t<app-navigation-buttons class="sc-mode__setting"></app-navigation-buttons>\n\t<app-scroll class="sc-mode__setting"></app-scroll>\n\t<app-click-facilite class="sc-mode__setting"></app-click-facilite>\n\t<app-navigation-auto class="sc-mode__setting"></app-navigation-auto>\n</div>\n`;

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

modesLayout.innerHTML = `\n<form class="p-3">\n\t<fieldset class="d-grid gap-2 mb-4 text-body">\n\t\t<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>\n\t\t<div id="select-mode-zone" class="d-grid gap-1">\n\t\t</div>\n\t</fieldset>\n\n\t<div class="d-grid">\n\t\t<button id="select-mode-btn" class="btn btn-primary" type="submit" data-i18n="validateThisMode"></button>\n\t</div>\n</form>\n`;

class ModesComponent extends HTMLElement {
    static observedAttributes=[ "data-modes" ];
    selectModeForm=null;
    selectModeBtn=null;
    selectModeZone=null;
    handler;
    constructor() {
        super();
        this.appendChild(modesLayout.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.selectModeForm = this.querySelector("form");
        this.selectModeBtn = this.querySelector("#select-mode-btn");
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
        let clickEvent = new CustomEvent("changeRoute", {
            bubbles: true,
            detail: {
                route: PAGE_HOME
            }
        });
        modeOfUseServiceInstance.setSelectedMode(this.getSelectedMode());
        this.selectModeBtn?.dispatchEvent(clickEvent);
    };
}

customElements.define("app-modes", ModesComponent);

"use strict";

const settingsLayout = document.createElement("template");

settingsLayout.innerHTML = `\n<section class="accordion mb-2">\n\t<app-text class="c-settings__category accordion-item"></app-text>\n\t<app-layout class="c-settings__category accordion-item"></app-layout>\n\t<app-picture-video class="c-settings__category accordion-item"></app-picture-video>\n\t<app-sound class="c-settings__category accordion-item"></app-sound>\n\t<app-navigation class="c-settings__category accordion-item"></app-navigation>\n</section>\n`;

class SettingsComponent extends HTMLElement {
    static observedAttributes=[ "data-modes" ];
    constructor() {
        super();
        this.appendChild(settingsLayout.content.cloneNode(true));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-modes" === name) {
            this.openOrHideCategories(newValue);
            let selectedMode = modeOfUseServiceInstance.getSelectedMode(JSON.parse(newValue));
            this.openMainCategory(JSON.parse(newValue));
            let elements = this.querySelectorAll(".c-settings__category");
            const settings = Object.entries(JSON.parse(selectedMode))[0][1];
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
    isMainCategory=false;
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
            categoriesServiceInstance.openCategory(this.tagName, !isOpen);
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
            switch (event.target) {
              case this.btnAccordion:
                this.addAriaAndCollapsedClass(this._triggerArray, this.isShown());
                break;

              case this.btnMoreSettings:
                this.displayOrHideOthersSettings();
                break;
            }
        }
    };
}

"use strict";

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">\n\t\t\t<app-icon data-name="Agencement" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="layout"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-layout">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-loupe class="c-category__setting" data-can-edit="true"></app-loupe>\n\t\t\t\t<app-colour-theme class="c-category__setting" data-can-edit="true"></app-colour-theme>\n\t\t\t\t<app-cursor-aspect class="c-category__setting" data-can-edit="true"></app-cursor-aspect>\n\t\t\t\t<app-focus-aspect class="c-category__setting" data-can-edit="true"></app-focus-aspect>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-link-style class="c-category__setting" data-can-edit="true"></app-link-style>\n\t\t\t\t<app-clearly-links class="c-category__setting" data-can-edit="true"></app-clearly-links>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class LayoutComponent extends AbstractCategory {
    constructor() {
        super();
        this.appendChild(tmplLayout.content.cloneNode(true));
    }
}

customElements.define("app-layout", LayoutComponent);

"use strict";

const tmplNavigation = document.createElement("template");

tmplNavigation.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">\n\t\t\t<app-icon data-name="Nav" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="navigation"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-navigation">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-click-facilite class="c-category__setting" data-can-edit="true"></app-click-facilite>\n\t\t\t\t<app-scroll class="c-category__setting" data-can-edit="true"></app-scroll>\n\t\t\t\t<app-navigation-buttons class="c-category__setting" data-can-edit="true"></app-navigation-buttons>\n\t\t\t\t<app-navigation-auto class="c-category__setting" data-can-edit="true"></app-navigation-auto>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

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

tmplText.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button collapsed gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">\n\t\t\t<app-icon data-name="Text" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="text"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-text">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container gap-2">\n\t\t\t\t<app-text-size class="c-category__setting" data-can-edit="true"></app-text-size>\n\t\t\t\t<app-font-family class="c-category__setting" data-can-edit="true"></app-font-family>\n\t\t\t\t<app-capitals class="c-category__setting" data-can-edit="true"></app-capitals>\n\t\t\t\t<app-color-contrast class="c-category__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-text-spacing class="c-category__setting" data-can-edit="true"></app-text-spacing>\n\t\t\t\t<app-reading-guide class="c-category__setting" data-can-edit="true"></app-reading-guide>\n\t\t\t\t<app-margin-align class="c-category__setting" data-can-edit="true"></app-margin-align>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

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
    constructor() {
        super();
        this.appendChild(tmplToolbar.content.cloneNode(true));
        this.handler = this.createHandler();
    }
    connectedCallback() {
        this.header = this.querySelector("#header");
        filesServiceInstance.getJSONFile("modes-of-use").then((result => {
            this.defaultJson = result;
            localStorageServiceInstance.getItem(jsonName).then((result => {
                if (result && Object.keys(result).length !== 0 && result.version === this.defaultJson.version) {
                    this.json = result;
                } else {
                    this.json = this.defaultJson;
                    localStorageServiceInstance.setItem(jsonName, this.defaultJson);
                }
                this.initCurrentMode();
            }));
        }));
        window.addEventListener(`storage-${jsonName}`, this.handler);
        this.addEventListener("changeRoute", this.handler);
    }
    initCurrentMode=() => {
        if (this.json.selectedMode) {
            routeServiceInstance.initPages(this).then((result => {
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
            }
        }));
    };
    createHandler=() => event => {
        switch (event.type) {
          case "changeRoute":
            this.changeRouteEvent(event);
            break;

          case `storage-${jsonName}`:
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
        localStorageServiceInstance.getItem(jsonName).then((result => {
            this.json = result;
            this.setCurrentPage(routeServiceInstance.currentRoute);
        }));
    };
}

customElements.define("app-toolbar", ToolbarComponent);

"use strict";

const appRootElt = document.createElement("app-root");

document.body.prepend(appRootElt);
