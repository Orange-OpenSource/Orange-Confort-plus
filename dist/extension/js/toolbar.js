/*
 * orange-confort-plus - version 5.0.0-alpha.0 - 17/01/2024
 * Enhance user experience on web sites
 * © 2014 - 2024 Orange SA
 */
"use strict";

class FilesService {
    getModesOfUse() {
        return fetch(chrome.runtime.getURL("assets/json/modes-of-use.json")).then((response => response.json())).catch((error => {
            console.error(`Error when retrieving JSON file : ${error}.`);
            return error;
        }));
    }
}

"use strict";

class I18nService {
    locale="en";
    constructor() {
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

class PathService {
    path="";
    constructor() {
        this.path = chrome.runtime.getURL("/");
    }
}

"use strict";

class iconsService {
    constructor() {}
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

class LocalStorageService {
    prefix="cplus-";
    constructor() {}
    setItem(key, value) {
        chrome.storage.local.set({
            [`${this.prefix}${key}`]: value
        });
        let storeEvent = new CustomEvent(`storage-${key}`, {
            bubbles: true
        });
        window.dispatchEvent(storeEvent);
    }
    getItem(key) {
        return chrome.storage.local.get([ `${this.prefix}${key}` ]).then((datas => new Promise(((resolve, reject) => {
            resolve(datas[`${this.prefix}${key}`]);
            reject(new Error("KO"));
        }))));
    }
    removeItem(key) {
        chrome.storage.local.remove([ `${this.prefix}${key}` ]);
    }
}

"use strict";

const template = document.createElement("template");

template.innerHTML = `\n<div data-bs-theme="light">\n\t<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">\n\t\t<span class="visually-hidden" data-i18n="mainButton"></span>\n\t\t<app-icon data-size="3em" data-name="Accessibility"></app-icon>\n\t</button>\n\t<app-toolbar class="bg-body position-fixed top-0 end-0" id="toolbar"></app-toolbar>\n</div>\n`;

class AppComponent extends HTMLElement {
    openConfortPlus=false;
    confortPlusBtn=null;
    confortPlusToolbar=null;
    i18nService;
    pathService;
    iconsService;
    path;
    link;
    constructor() {
        super();
        this.pathService = new PathService;
        this.path = this.pathService.path;
        this.i18nService = new I18nService;
        this.iconsService = new iconsService;
        this.attachShadow({
            mode: "open"
        });
        this?.shadowRoot?.appendChild(template.content.cloneNode(true));
        this.link = document.createElement("link");
        this.link.rel = "stylesheet";
        this.link.href = `${this.path}css/styles.min.css`;
        this.shadowRoot?.appendChild(this.link);
    }
    connectedCallback() {
        customElements.upgrade(this);
        this.iconsService.loadSprite(this.shadowRoot);
        setTimeout((() => {
            this.i18nService.translate(this.shadowRoot);
        }));
        this.confortPlusBtn = this?.shadowRoot?.getElementById("confort");
        this.confortPlusToolbar = this?.shadowRoot?.getElementById("toolbar");
        this.confortPlusToolbar.style.transform = "translateX(100%)";
        if (!this.confortPlusBtn || !this.confortPlusToolbar) {
            return;
        }
        this.confortPlusToolbar.addEventListener("closeEvent", this.toggleToolbar);
        this.confortPlusBtn.addEventListener("click", this.toggleToolbar);
    }
    disconnectedCallback() {
        this.confortPlusToolbar?.removeEventListener("closeEvent", this.toggleToolbar);
        this.confortPlusBtn?.removeEventListener("click", this.toggleToolbar);
    }
    toggleToolbar=() => {
        this.openConfortPlus = !this.openConfortPlus;
        if (this.openConfortPlus) {
            this.confortPlusToolbar.style.removeProperty("transform");
        } else {
            this.confortPlusToolbar.style.transform = "translateX(100%)";
        }
    };
}

customElements.define("app-root", AppComponent);

"use strict";

class AbstractSetting extends HTMLElement {
    static observedAttributes=[ "data-values" ];
    settingBtn=null;
    modalBtn=null;
    canEdit=false;
    localStorageService;
    i18nService;
    activesValues;
    separator=",";
    callback;
    constructor() {
        super();
        this.i18nService = new I18nService;
        this.localStorageService = new LocalStorageService;
        this.canEdit = this.dataset?.canEdit === "true" || this.canEdit;
    }
    connectedCallback(key) {
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
            this.localStorageService.getItem("modeOfUse").then((result => {
                let json = result;
                json.modes.forEach((mode => {
                    if (Object.keys(mode)[0] === json.selectedMode) {
                        let modeSettings = Object.entries(mode)[0][1];
                        let setting = modeSettings.find((o => Object.keys(o)[0] === key));
                        if (setting) {
                            let settingValues = Object.entries(setting)[0][1];
                            settingValues.activeValue = newIndex;
                        } else {
                            this.callback(newValue);
                            this.modalBtn.setAttribute("data-value", this.i18nService.getMessage(newValue));
                        }
                    }
                }));
                this.localStorageService.setItem("modeOfUse", json);
            }));
        }));
    }
    disconnectedCallback() {
        this.modalBtn.removeEventListener("clickModalEvent", (() => {}));
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
        this.settingBtn.setAttribute("data-active-value", activesValues.activeValue);
        this.modalBtn.setAttribute("data-value", this.i18nService.getMessage(activesValues.values.split(",")[activesValues.activeValue]));
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
        values: "noModifications,reinforcedContrasts,white+black",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setColorsContrasts.bind(this));
        this.appendChild(tmplColorContrast.content.cloneNode(true));
    }
    connectedCallback() {
        super.connectedCallback("colorContrast");
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn.removeEventListener("changeSettingEvent", (() => {}));
    }
    setColorsContrasts=value => {
        if (value === "noModifications") {
            document.querySelector("#cplus-styles-contrast")?.remove();
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
                color = value.split("+")[0];
                backgroundColor = value.split("+")[1];
            }
            let classContrast = `\n\t\t\t\t\t\t\t* {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t\tbackground-color: ${backgroundColor} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tli a {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tfieldset,\n\t\t\t\t\t\t\tbutton {\n\t\t\t\t\t\t\t\tborder-color: ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tinput, td, th {\n\t\t\t\t\t\t\t\tborder: 2px solid ${color} !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\ttd, th {\n\t\t\t\t\t\t\t\tpadding: .2em !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\ttable {\n\t\t\t\t\t\t\t\tborder-collapse: collapse !important;\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t*:link,\n\t\t\t\t\t\t\t*:visited,\n\t\t\t\t\t\t\t*:hover {\n\t\t\t\t\t\t\t\tcolor: ${color} !important;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t`;
            if (document.querySelectorAll("#cplus-styles-contrast").length === 0) {
                let head = document.head || document.getElementsByTagName("head")[0];
                let stylesContrast = document.createElement("style");
                stylesContrast.setAttribute("id", "cplus-styles-contrast");
                stylesContrast.innerHTML = classContrast;
                head.appendChild(stylesContrast);
            } else {
                document.querySelector("#cplus-styles-contrast").innerHTML = classContrast;
            }
        }
    };
}

customElements.define("app-color-contrast", ColorContrastComponent);

"use strict";

const tmplCursorAspect = document.createElement("template");

tmplCursorAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="cursorAspect" data-icon="CursorSetting"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class CursorAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big+black,huge+green",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setCursor.bind(this));
        this.appendChild(tmplCursorAspect.content.cloneNode(true));
    }
    connectedCallback() {
        super.connectedCallback("cursorAspect");
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn.removeEventListener("changeSettingEvent", (() => {}));
    }
    setCursor=value => {
        if (value === "noModifications") {
            document.querySelector("#cplus-styles-cursor")?.remove();
        } else {
            let color = value.split("+")[1];
            let svgFile = value.split("+")[0] === "big" ? `<svg width="56" height="56" viewbox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><path d="M2.1875 3.93386C2.1875 3.07793 3.19283 2.61758 3.84083 3.17679L35.3653 30.3817C36.039 30.9631 35.6748 32.0687 34.7875 32.1359L22.9084 33.0354C22.2046 33.0887 21.776 33.8346 22.0844 34.4695L29.2853 49.2945C29.5344 49.8073 29.3051 50.4242 28.7816 50.6498L22.336 53.4272C21.8383 53.6416 21.2604 53.4206 21.0328 52.9288L14.1035 37.9578C13.8313 37.3697 13.0802 37.1919 12.5732 37.5955L3.81035 44.572C3.15521 45.0936 2.1875 44.6271 2.1875 43.7897V3.93386Z" fill="${color}" stroke="black" stroke-width="5"/></svg>` : `<svg width="128" height="128" viewbox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><path d="M5 6.18386C5 5.32793 6.00533 4.86758 6.65333 5.42679L83.1778 71.4657C83.8515 72.0471 83.4873 73.1527 82.6 73.2199L50.4764 75.6523C49.7726 75.7056 49.344 76.4515 49.6524 77.0864L67.5257 113.883C67.7748 114.396 67.5455 115.013 67.0219 115.238L49.904 122.615C49.4063 122.829 48.8284 122.608 48.6008 122.116L31.5493 85.2757C31.2771 84.6875 30.5259 84.5097 30.0189 84.9134L6.62285 103.54C5.96772 104.062 5 103.595 5 102.758V6.18386Z" fill="${color}" stroke="black" stroke-width="10"/></svg>`;
            let classCursor = `\n\t\t\t\t\t\t\t* {\n\t\t\t\t\t\t\t\tcursor: url('data:image/svg+xml;utf8,${svgFile}') 0 0, auto !important;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t`;
            if (document.querySelectorAll("#cplus-styles-cursor").length === 0) {
                let head = document.head || document.getElementsByTagName("head")[0];
                let stylesCursor = document.createElement("style");
                stylesCursor.setAttribute("id", "cplus-styles-cursor");
                stylesCursor.innerHTML = classCursor;
                head.appendChild(stylesCursor);
            } else {
                document.querySelector("#cplus-styles-cursor").innerHTML = classCursor;
            }
        }
    };
}

customElements.define("app-cursor-aspect", CursorAspectComponent);

"use strict";

const tmplFocusAspect = document.createElement("template");

tmplFocusAspect.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="focusAspect" data-icon="Focus"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FocusAspectComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,big+blue,veryBig+red",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setFocus.bind(this));
        this.appendChild(tmplFocusAspect.content.cloneNode(true));
    }
    connectedCallback() {
        super.connectedCallback("focusAspect");
        this.settingBtn.addEventListener("changeSettingEvent", (event => {
            this.setFocus(event.detail.value);
        }));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn.removeEventListener("changeSettingEvent", (() => {}));
    }
    setFocus=value => {
        if (value === "noModifications") {
            document.querySelector("#cplus-styles-focus")?.remove();
        } else {
            let size = value.split("+")[0] === "big" ? "4px" : "10px";
            let color = value.split("+")[1];
            let classFocus = `\n\t\t\t\t*:focus, *:focus-visible {\n\t\t\t\t\toutline: ${color} solid ${size} !important;\n\t\t\t\t}\n\t\t\t`;
            if (document.querySelectorAll("#cplus-styles-focus").length === 0) {
                let head = document.head || document.getElementsByTagName("head")[0];
                let stylesFocus = document.createElement("style");
                stylesFocus.setAttribute("id", "cplus-styles-focus");
                stylesFocus.innerHTML = classFocus;
                head.appendChild(stylesFocus);
            } else {
                document.querySelector("#cplus-styles-focus").innerHTML = classFocus;
            }
        }
    };
}

customElements.define("app-focus-aspect", FocusAspectComponent);

"use strict";

const tmplFontFamily = document.createElement("template");

tmplFontFamily.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="textFont" data-icon="Police"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class FontFamilyComponent extends AbstractSetting {
    pathService;
    path;
    activesValues={
        values: "noModifications,Accessible-DFA,Luciole",
        activeValue: 0
    };
    fontDictionnary=[ {
        name: "Accessible-DFA",
        folder: "accessibleDFA",
        files: [ {
            name: "AccessibleDFA-Bold.woff2",
            style: "normal",
            weight: "700"
        }, {
            name: "AccessibleDFA-Italic.woff2",
            style: "italic",
            weight: "400"
        }, {
            name: "AccessibleDFA-Regular.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "B612 Mono",
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
        folder: "comic",
        files: [ {
            name: "comic-Sans-MS.woff2",
            style: "normal",
            weight: "400"
        } ]
    }, {
        name: "Lexand Deca",
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
        this.pathService = new PathService;
        this.path = this.pathService.path;
        this.appendChild(tmplFontFamily.content.cloneNode(true));
        let head = document.head || document.getElementsByTagName("head")[0];
        if (document.querySelectorAll("#cplus-styles-fonts").length === 0) {
            let stylesFonts = document.createElement("style");
            stylesFonts.setAttribute("id", "cplus-styles-fonts");
            head.appendChild(stylesFonts);
            const fontFaceList = [];
            this.fontDictionnary.forEach((font => {
                for (const file of font.files) {
                    fontFaceList.push(`\n\t\t\t\t\t\t@font-face {\n\t\t\t\t\t\t\tfont-family:"${font.name}";\n\t\t\t\t\t\t\tsrc: local("${font.name}"), url("${this.path}assets/fonts/${font.folder}/${file.name}");\n\t\t\t\t\t\t\tfont-style: ${file.style}; font-weight: ${file.weight};\n\t\t\t\t\t\t\tfont-display: swap; }`);
                }
            }));
            stylesFonts.innerHTML = fontFaceList.join("");
        }
    }
    connectedCallback() {
        super.connectedCallback("textFont");
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn.removeEventListener("changeSettingEvent", (() => {}));
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
        values: "noModifications,110%,130%",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setFontSize.bind(this));
        this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
    }
    connectedCallback() {
        super.connectedCallback("textSize");
        this.settingBtn.addEventListener("changeSettingEvent", (event => {
            this.setFontSize(event.detail.value);
        }));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn.removeEventListener("changeSettingEvent", (() => {}));
    }
    setFontSize=value => {
        if (value === "noModifications") {
            document.documentElement.style.fontSize = null;
        } else {
            document.documentElement.style.fontSize = value;
        }
    };
}

customElements.define("app-increase-text-size", IncreaseTextSizeComponent);

"use strict";

const tmplLinkStyle = document.createElement("template");

tmplLinkStyle.innerHTML = `\n<div class="d-flex align-items-center gap-3">\n\t<app-btn-setting data-label="linksStyle" data-icon="Links"></app-btn-setting>\n\t<app-btn-modal class="d-none"></app-btn-modal>\n</div>\n`;

class LinkStyleComponent extends AbstractSetting {
    activesValues={
        values: "noModifications,lightblue+orange+lightgreen,yellow+orange+lightgreen",
        activeValue: 0
    };
    constructor() {
        super();
        this.setCallback(this.setLinkStyle.bind(this));
        this.appendChild(tmplLinkStyle.content.cloneNode(true));
    }
    connectedCallback() {
        super.connectedCallback("linkStyle");
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn?.removeEventListener("changeSettingEvent", (() => {}));
    }
    setLinkStyle=value => {
        if (value === "noModifications") {
            document.querySelector("#cplus-styles-links")?.remove();
        } else {
            let linkColor = value.split("+")[0];
            let linkPointedColor = value.split("+")[1];
            let linkVisitedColor = value.split("+")[2];
            let classLinkStyle = `\n\t\t\t\ta:link {\n\t\t\t\t\tcolor: ${linkColor} !important;\n\t\t\t\t}\n\t\t\t\ta:visited {\n\t\t\t\t\tcolor: ${linkVisitedColor} !important;\n\t\t\t\t}\n\t\t\t\ta:active, a:hover, a:focus {\n\t\t\t\t\tcolor: ${linkPointedColor} !important;\n\t\t\t\t}\n\t\t\t`;
            if (document.querySelectorAll("#cplus-styles-links").length === 0) {
                let head = document.head || document.getElementsByTagName("head")[0];
                let stylesLinks = document.createElement("style");
                stylesLinks.setAttribute("id", "cplus-styles-links");
                stylesLinks.innerHTML = classLinkStyle;
                head.appendChild(stylesLinks);
            } else {
                document.querySelector("#cplus-styles-links").innerHTML = classLinkStyle;
            }
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
    connectedCallback() {
        super.connectedCallback("marginAlign");
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn.removeEventListener("changeSettingEvent", (() => {}));
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
    classReadingGuide=`\n\t\t#cplus-vertical-guide-elt {\n\t\t\tborder-left: 1px solid black;\n\t\t\theight: 100%;\n\t\t\tposition: fixed;\n\t\t\ttop: 0;\n\t\t}\n\t`;
    classMaskGuide=`\n\t\t#cplus-mask-guide--top-elt,\n\t\t#cplus-mask-guide--bottom-elt {\n\t\t\tbackground: rgba(0, 0, 0, 0.5);\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t}\n\t\t#cplus-mask-guide--top-elt {\n\t\t\ttop: 0;\n\t\t}\n\t\t#cplus-mask-guide--bottom-elt {\n\t\t\tbottom: 0;\n\t\t}\n\t`;
    constructor() {
        super();
        this.setCallback(this.setReadingMaskGuide.bind(this));
        this.appendChild(tmplReadingGuide.content.cloneNode(true));
        this.readingGuideElt = this.querySelector("#cplus-vertical-guide-elt");
        this.topGuideElt = this.querySelector("#cplus-top-guide-elt");
        this.bottomGuideElt = this.querySelector("#cplus-bottom-guide-elt");
    }
    connectedCallback() {
        super.connectedCallback("readingGuide");
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn?.removeEventListener("changeSettingEvent", (() => {}));
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
        let classGuide = "";
        if (this.guideType === "reading") {
            classGuide = this.classReadingGuide;
        } else if (this.guideType === "mask") {
            classGuide = this.classMaskGuide;
        }
        if (document.querySelectorAll("#cplus-reading-guide").length === 0) {
            let head = document.head || document.getElementsByTagName("head")[0];
            let stylesReadingGuide = document.createElement("style");
            stylesReadingGuide.setAttribute("id", "cplus-reading-guide");
            stylesReadingGuide.innerHTML = classGuide;
            head.appendChild(stylesReadingGuide);
        }
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
        document.querySelector("#cplus-reading-guide")?.remove();
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
    scrollSteps=100;
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
        super.connectedCallback("scroll");
        this.setScrollClass();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn?.removeEventListener("changeSettingEvent", (() => {}));
        this.btnScrollUp?.removeEventListener("click", (() => {}));
        this.btnScrollUp?.removeEventListener("mouseover", (() => {}));
        this.btnScrollDown?.removeEventListener("click", (() => {}));
        this.btnScrollDown?.removeEventListener("mouseover", (() => {}));
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
        let classScroll = `\n\t\t\t.cplus-big-scroll::-webkit-scrollbar, .cplus-big-scroll *::-webkit-scrollbar {\n\t\t\t\t\twidth: 2rem;\n\t\t\t}\n\t\t\t.cplus-big-scroll::-webkit-scrollbar-thumb, .cplus-big-scroll *::-webkit-scrollbar-thumb {\n\t\t\t\tbackground-color: lightgrey;\n\t\t\t\tborder-radius: 1.75rem\n\t\t\t\twidth: 2rem;\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\t\t\t.cplus-big-scroll::-webkit-scrollbar-thumb:hover, .cplus-big-scroll *::-webkit-scrollbar-thumb:hover {\n\t\t\t\tbackground-color: grey;\n\t\t\t}\n\n\t\t\t#cplus-container-scroll-buttons {\n\t\t\t\tdisplay: flex;\n\t\t\t\tgap: 1rem;\n\t\t\t\tposition: fixed;\n\t\t\t\tbottom: 1rem;\n\t\t\t\tright: 1rem;\n\t\t\t\tz-index: 2147483647;\n\t\t\t}\n\n\t\t\t#cplus-container-scroll-buttons button {\n\t\t\t\tbackground: #f16e00;\n\t\t\t\tcolor: #000;\n\t\t\t\tborder: none;\n\t\t\t\tfont-weight: bold;\n\t\t\t\tpadding: 1rem 2rem;\n\t\t\t}\n\t\t`;
        if (document.querySelectorAll("#cplus-scroll").length === 0) {
            let head = document.head || document.getElementsByTagName("head")[0];
            let stylesScroll = document.createElement("style");
            stylesScroll.setAttribute("id", "cplus-scroll");
            stylesScroll.innerHTML = classScroll;
            head.appendChild(stylesScroll);
        }
    };
    setBigScroll=() => {
        document.body.classList.add("cplus-big-scroll");
    };
    setBtnScroll=() => {
        const container = document.createElement("div");
        container.setAttribute("id", "cplus-container-scroll-buttons");
        let btnArray = [];
        let btnUp = `<button id="cplus-scroll-up">${this.i18nService.getMessage("scrollUp")}</button>`;
        let btnDown = `<button id="cplus-scroll-down">${this.i18nService.getMessage("scrollDown")}</button>`;
        btnArray.push(btnUp, btnDown);
        container.innerHTML = btnArray.join("");
        document.body.appendChild(container);
        this.btnScrollUp = document.querySelector("#cplus-scroll-up");
        this.btnScrollDown = document.querySelector("#cplus-scroll-down");
        this.btnScrollUp.addEventListener(this.btnState, (event => {
            window.scrollBy(0, -this.scrollSteps);
        }));
        this.btnScrollDown.addEventListener(this.btnState, (event => {
            window.scrollBy(0, this.scrollSteps);
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
    connectedCallback() {
        super.connectedCallback("spacingText");
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.settingBtn.removeEventListener("changeSettingEvent", (() => {}));
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
            document.querySelector("#cplus-styles-spacing-text")?.remove();
        } else {
            let objSpacingText = spacingTextValues?.find((o => o.name === value));
            let classSpacingText = `\n\t\t\t\t* {\n\t\t\t\t\tword-spacing: ${objSpacingText.wordSpacing} !important;\n\t\t\t\t\tline-height: ${objSpacingText.lineHeight} !important;\n\t\t\t\t\tletter-spacing: ${objSpacingText.letterSpacing} !important;\n\t\t\t\t}\n\t\t\t`;
            if (document.querySelectorAll("#cplus-styles-spacing-text").length === 0) {
                let head = document.head || document.getElementsByTagName("head")[0];
                let stylesSpacingText = document.createElement("style");
                stylesSpacingText.setAttribute("id", "cplus-styles-spacing-text");
                stylesSpacingText.innerHTML = classSpacingText;
                head.appendChild(stylesSpacingText);
            } else {
                document.querySelector("#cplus-styles-spacing-text").innerHTML = classSpacingText;
            }
        }
    };
}

customElements.define("app-spacing-text", TextSpacingComponent);

"use strict";

const tmplTextTransform = document.createElement("template");

tmplTextTransform.innerHTML = `\n<style>\n\t\tapp-text-transform {\n\t\t\t\tmargin-bottom: 1rem;\n\t\t}\n</style>\n<button id="normal-btn" data-i18n="default"></button>\n<button id="first-letter-btn" data-i18n="firstLetter"></button>\n<button id="lowercase-btn" data-i18n="lowercase"></button>\n<button id="uppercase-btn" data-i18n="uppercase"></button>\n`;

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

btnSettingLayout.innerHTML = `\n\t<button class="sc-btn-setting btn btn-primary flex-column justify-content-between w-100 px-1">\n\t\t<div class="d-flex flex-column">\n\t\t\t<span></span>\n\t\t\t<app-icon data-size="1.5em"></app-icon>\n\t\t</div>\n\t\t<ul class="d-flex gap-1 align-items-center mt-2 mb-0 list-unstyled"></ul>\n\t</button>\n`;

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
    i18nService;
    constructor() {
        super();
        this.i18nService = new I18nService;
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
            span.innerText = this.i18nService.getMessage(newValue);
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

headerLayout.innerHTML = `\n\t<header class="d-flex justify-content-between bg-secondary px-3 py-2">\n\t\t<div class="d-flex align-items-center">\n\t\t\t<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="previous">\n\t\t\t\t<span class="visually-hidden" data-i18n="previous"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\n\t\t\t<span id="title-page-block" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">\n\t\t\t\t<app-icon id="title-page-icon" data-size="1.5em" data-name="Eye" class="border-end border-white pe-1"></app-icon>\n\t\t\t\t<app-icon data-size="1.5em" data-name="Settings"></app-icon>\n\t\t\t\t<span id="title-page"></span>\n\t\t\t</span>\n\n\t\t\t<span id="title-app" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">\n\t\t\t\t<app-icon data-size="2em" data-name="Accessibility"></app-icon>\n\t\t\t\t<span data-i18n="mainTitle"></span>\n\t\t\t\t<span class="text-primary">+</span>\n\t\t\t</span>\n\t\t</div>\n\t\t<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">\n\t\t\t\t<span class="visually-hidden" data-i18n="close"></span>\n\t\t\t\t<app-icon data-name="Reduire_C+"></app-icon>\n\t\t</button>\n\t</header>\n`;

class HeaderComponent extends HTMLElement {
    static observedAttributes=[ "data-display", "data-title-page", "data-prev-route", "data-selected-mode" ];
    closeBtn=null;
    prevBtn=null;
    titleApp=null;
    titlePageBlock=null;
    titlePage=null;
    titlePageIcon=null;
    display="primary";
    i18nService;
    routeService;
    prevRoute="";
    constructor() {
        super();
        this.i18nService = new I18nService;
        this.routeService = new RouteService;
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
            this.titlePage.innerText = this.i18nService.getMessage(newValue);
        }
        if ("data-prev-route" === name) {
            this.prevRoute = newValue;
        }
        if ("data-selected-mode" === name) {
            this.titlePageIcon?.setAttribute("data-name", newValue);
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
    iconService;
    icon="";
    size="1.25em";
    constructor() {
        super();
        this.iconService = new iconsService;
        this.sprite = this.iconService.path;
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
    i18nService;
    constructor() {
        super();
        this.i18nService = new I18nService;
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
        this.inputElement.id = this.normalizeString(this.label);
        this.inputElement.value = this.label;
        this.inputElement.checked = this.checked;
        this.labelElement?.setAttribute("for", this.normalizeString(this.label));
        this.iconElement?.setAttribute("data-name", this.label);
        this.textElement.innerText = this.i18nService.getMessage(`${this.label}Name`);
        this.descriptionElement.innerText = this.i18nService.getMessage(`${this.label}Description`);
    }
    normalizeString=string => string?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\s]/g, "").split("-").join("");
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
    settings=[];
    constructor() {
        super();
        this.i18nService = new I18nService;
        this.routeService = new RouteService;
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
                    route: this.routeService.PAGE_MODES
                }
            });
            this.changeModeBtn?.dispatchEvent(clickEvent);
        }));
        this.settingsBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent("changeRoute", {
                bubbles: true,
                detail: {
                    route: this.routeService.PAGE_SETTINGS
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
            this.modeName.innerText = this.i18nService.getMessage(`${Object.entries(JSON.parse(newValue))[0][0]}Name`);
            this.currentMode.setAttribute("data-settings", JSON.stringify(Object.entries(JSON.parse(newValue))[0][1]));
            this.modeIcon?.setAttribute("data-name", Object.entries(JSON.parse(newValue))[0][0]);
        }
        if ("data-custom" === name) {
            const modeName = this.modeName.innerText;
            this.modeName.innerText = newValue === "true" ? `${modeName}*` : `${modeName}`;
        }
    }
}

customElements.define("app-home", HomeComponent);

"use strict";

const tmplMode = document.createElement("template");

tmplMode.innerHTML = `\n<div id="mode-content" class="sc-mode__setting-grid gap-2">\n\t<app-font-family class="sc-mode__setting"></app-font-family>\n\t<app-increase-text-size class="sc-mode__setting"></app-increase-text-size>\n\t<app-spacing-text class="sc-mode__setting"></app-spacing-text>\n\t<app-reading-guide class="sc-mode__setting"></app-reading-guide>\n\t<app-margin-align class="sc-mode__setting"></app-margin-align>\n\t<app-focus-aspect class="sc-mode__setting"></app-focus-aspect>\n\t<app-color-contrast class="sc-mode__setting"></app-color-contrast>\n\t<app-cursor-aspect class="sc-mode__setting"></app-cursor-aspect>\n\t<app-scroll class="sc-mode__setting"></app-scroll>\n\t<app-link-style class="sc-mode__setting"></app-link-style>\n</div>\n`;

class ModeComponent extends HTMLElement {
    static observedAttributes=[ "data-settings" ];
    modeContent=null;
    settingsDictionnary=[ {
        name: "textSize",
        element: "app-increase-text-size"
    }, {
        name: "textFont",
        element: "app-font-family"
    }, {
        name: "spacingText",
        element: "app-spacing-text"
    }, {
        name: "readingGuide",
        element: "app-reading-guide"
    }, {
        name: "marginAlign",
        element: "app-margin-align"
    }, {
        name: "focusAspect",
        element: "app-focus-aspect"
    }, {
        name: "colorContrast",
        element: "app-color-contrast"
    }, {
        name: "cursorAspect",
        element: "app-cursor-aspect"
    }, {
        name: "scroll",
        element: "app-scroll"
    }, {
        name: "linkStyle",
        element: "app-link-style"
    } ];
    constructor() {
        super();
        this.appendChild(tmplMode.content.cloneNode(true));
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
            let settingObj = this.settingsDictionnary.find((o => o.name === Object.keys(setting)[0]));
            let settingElement = this.querySelector(settingObj?.element);
            settingElement.setAttribute("data-values", JSON.stringify(Object.entries(setting)[0][1]));
            settingElement?.classList.remove("d-none");
        }));
    };
}

customElements.define("app-mode", ModeComponent);

"use strict";

const modesLayout = document.createElement("template");

modesLayout.innerHTML = `\n<section class="p-3">\n\t<fieldset class="d-grid gap-2 mb-4">\n\t\t<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>\n\t\t<div id="select-mode-zone" class="d-grid gap-1">\n\t\t</div>\n\t</fieldset>\n\n\t<div class="d-grid">\n\t\t<button id="select-mode-btn" class="btn btn-primary" type="button" data-i18n="validateThisMode"></button>\n\t</div>\n</section>\n`;

class ModesComponent extends HTMLElement {
    static observedAttributes=[ "data-list-mode" ];
    selectModeBtn=null;
    routeService;
    localStorageService;
    selectModeZone=null;
    constructor() {
        super();
        this.routeService = new RouteService;
        this.localStorageService = new LocalStorageService;
        this.appendChild(modesLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.selectModeBtn = this.querySelector("#select-mode-btn");
        this.selectModeZone = this.querySelector("#select-mode-zone");
        this.selectModeBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent("changeRoute", {
                bubbles: true,
                detail: {
                    route: this.routeService.PAGE_HOME,
                    isPrev: true
                }
            });
            this.localStorageService.getItem("modeOfUse").then((result => {
                let json = result;
                json.selectedMode = this.getSelectedMode();
                this.localStorageService.setItem("modeOfUse", json);
            }));
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
            let isChecked = Object.entries(mode)[0][0] === selectedMode ? true : false;
            let radioMode = `<app-select-mode data-label="${Object.entries(mode)[0][0]}" data-checked="${isChecked}"></app-select-mode>`;
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
    i18nService;
    displayAllSettings=false;
    CLASS_NAME_SHOW="show";
    CLASS_NAME_COLLAPSED="collapsed";
    _triggerArray=[];
    constructor(dictionnary) {
        super();
        this.i18nService = new I18nService;
        this.settingsDictionnary = dictionnary;
    }
    connectedCallback() {
        this.btnAccordion = this.querySelector("button.accordion-button");
        this.accordionContainer = this.querySelector("div.accordion-collapse");
        this.settingsContainer = this.querySelector(".c-category__settings-container");
        this.btnMoreSettings = this.querySelector(".c-category__btn-more");
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
        this.btnMoreSettings?.classList.add("d-none");
        if (!this.displayAllSettings) {
            this.settingsElements.forEach((element => {
                element.removeAttribute("data-default-setting");
                element.classList.add("d-none");
            }));
        }
        let nbActifSetting = 0;
        settings.forEach((setting => {
            let settingObj = this.settingsDictionnary.find((o => o.name === Object.keys(setting)[0]));
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
                    this.btnMoreSettings.innerText = this.i18nService.getMessage("lessSettings");
                } else {
                    this.btnMoreSettings.innerText = this.i18nService.getMessage("moreSettings");
                }
                element.classList.toggle("d-none");
            }
        }));
    };
}

"use strict";

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-layout">\n\t\t\t<app-icon data-name="Agencement" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="layout"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-layout">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container d-flex flex-column gap-2">\n\t\t\t\t<app-margin-align class="c-layout__setting" data-can-edit="true"></app-margin-align>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class LayoutComponent extends AbstractCategory {
    constructor() {
        const settingsDictionnary = [ {
            name: "marginAlign",
            element: "app-margin-align"
        } ];
        super(settingsDictionnary);
        this.appendChild(tmplLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.settingsElements = [ ...this.querySelectorAll(".c-layout__setting") ];
        super.connectedCallback();
    }
}

customElements.define("app-layout", LayoutComponent);

"use strict";

const tmplNavigation = document.createElement("template");

tmplNavigation.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-navigation">\n\t\t\t<app-icon data-name="Nav" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="navigation"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-navigation">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container d-flex flex-column gap-2">\n\t\t\t\t<app-focus-aspect class="c-navigation__setting" data-can-edit="true"></app-focus-aspect>\n\t\t\t\t<app-scroll class="c-navigation__setting" data-can-edit="true"></app-scroll>\n\t\t\t\t<app-link-style class="c-navigation__setting" data-can-edit="true"></app-link-style>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class NavigationComponent extends AbstractCategory {
    constructor() {
        const settingsDictionnary = [ {
            name: "focusAspect",
            element: "app-focus-aspect"
        }, {
            name: "scroll",
            element: "app-scroll"
        }, {
            name: "linkStyle",
            element: "app-link-style"
        } ];
        super(settingsDictionnary);
        this.appendChild(tmplNavigation.content.cloneNode(true));
    }
    connectedCallback() {
        this.settingsElements = [ ...this.querySelectorAll(".c-navigation__setting") ];
        super.connectedCallback();
    }
}

customElements.define("app-navigation", NavigationComponent);

"use strict";

const tmplPictureVideo = document.createElement("template");

tmplPictureVideo.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-picture-video">\n\t\t\t<app-icon data-name="Photo_Video" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="medias"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-picture-video">\n\t\t<div class="accordion-body px-3">\n\t\t</div>\n\t</div>\n`;

class PictureVideoComponent extends AbstractCategory {
    constructor() {
        let settingsDictionnary = [];
        super(settingsDictionnary);
        this.appendChild(tmplPictureVideo.content.cloneNode(true));
    }
}

customElements.define("app-picture-video", PictureVideoComponent);

"use strict";

const tmplPointer = document.createElement("template");

tmplPointer.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-pointer">\n\t\t\t<app-icon data-name="Pointeur" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="pointer"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-pointer">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container d-flex flex-column gap-2">\n\t\t\t\t<app-cursor-aspect class="c-pointer__setting" data-can-edit="true"></app-cursor-aspect>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class PointerComponent extends AbstractCategory {
    constructor() {
        const settingsDictionnary = [ {
            name: "cursorAspect",
            element: "app-cursor-aspect"
        } ];
        super(settingsDictionnary);
        this.appendChild(tmplPointer.content.cloneNode(true));
    }
    connectedCallback() {
        this.settingsElements = [ ...this.querySelectorAll(".c-pointer__setting") ];
        super.connectedCallback();
    }
}

customElements.define("app-pointer", PointerComponent);

"use strict";

const tmplSound = document.createElement("template");

tmplSound.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-sound">\n\t\t\t<app-icon data-name="Audio" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="audio"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-sound">\n\t\t<div class="accordion-body px-3">\n\t\t</div>\n\t</div>\n`;

class SoundComponent extends AbstractCategory {
    constructor() {
        let settingsDictionnary = [];
        super(settingsDictionnary);
        this.appendChild(tmplSound.content.cloneNode(true));
    }
}

customElements.define("app-sound", SoundComponent);

"use strict";

const tmplText = document.createElement("template");

tmplText.innerHTML = `\n\t<div class="accordion-header">\n\t\t<button class="accordion-button gap-2 fs-4 px-3" type="button" aria-expanded="false" aria-controls="category-text">\n\t\t\t<app-icon data-name="Text" data-size="2em"></app-icon>\n\t\t\t<span data-i18n="text"></span>\n\t\t</button>\n\t</div>\n\t<div class="accordion-collapse collapse" id="category-text">\n\t\t<div class="accordion-body px-3">\n\t\t\t<div class="c-category__settings-container d-flex flex-column gap-2">\n\t\t\t\t<app-font-family class="c-text__setting" data-can-edit="true"></app-font-family>\n\t\t\t\t<app-increase-text-size class="c-text__setting" data-can-edit="true"></app-increase-text-size>\n\t\t\t\t<app-color-contrast class="c-text__setting" data-can-edit="true"></app-color-contrast>\n\t\t\t\t<app-reading-guide class="c-text__setting" data-can-edit="true"></app-reading-guide>\n\t\t\t\t<app-spacing-text class="c-text__setting" data-can-edit="true"></app-spacing-text>\n\t\t\t</div>\n\t\t\t<button class="c-category__btn-more btn btn-tertiary mt-3" type="button" data-i18n="moreSettings"></button>\n\t\t</div>\n\t</div>\n`;

class TextComponent extends AbstractCategory {
    settingsElements=[];
    constructor() {
        const settingsDictionnary = [ {
            name: "textSize",
            element: "app-increase-text-size"
        }, {
            name: "textFont",
            element: "app-font-family"
        }, {
            name: "colorContrast",
            element: "app-color-contrast"
        }, {
            name: "readingGuide",
            element: "app-reading-guide"
        }, {
            name: "spacingText",
            element: "app-spacing-text"
        } ];
        super(settingsDictionnary);
        this.appendChild(tmplText.content.cloneNode(true));
    }
    connectedCallback() {
        this.settingsElements = [ ...this.querySelectorAll(".c-text__setting") ];
        super.connectedCallback();
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
    routeService;
    filesService;
    localStorageService;
    historyRoute=[];
    json="";
    defaultJson="";
    constructor() {
        super();
        this.routeService = new RouteService;
        this.filesService = new FilesService;
        this.localStorageService = new LocalStorageService;
        this.appendChild(tmplToolbar.content.cloneNode(true));
    }
    connectedCallback() {
        this.header = this.querySelector("#header");
        this.home = this.querySelector("app-home");
        this.modes = this.querySelector("app-modes");
        this.settings = this.querySelector("app-settings");
        this.filesService.getModesOfUse().then((result => {
            this.defaultJson = result;
            this.localStorageService.getItem("modeOfUse").then((result => {
                if (result && Object.keys(result).length !== 0) {
                    this.json = result;
                } else {
                    this.localStorageService.setItem("modeOfUse", this.defaultJson);
                    this.json = this.defaultJson;
                }
                this.setCurrentMode();
            }));
        }));
        window.addEventListener("storage-modeOfUse", (event => {
            this.localStorageService.getItem("modeOfUse").then((result => {
                this.json = result;
                this.setCurrentMode();
            }));
        }));
        this.routeService.initPages(this);
        this.addEventListener("changeRoute", (event => {
            if (event.detail.isPrev) {
                this.historyRoute.pop();
            } else {
                this.historyRoute.push(this.routeService.currentRoute);
            }
            if (event.detail.setting) {
                this.json.selectedMode = event.detail.mode;
                this.setCurrentMode();
            }
            this.routeService.navigate(event.detail.route);
            this.setHeaderDisplay(event.detail.route);
            this.header?.focus();
            this.header?.setAttribute("data-prev-route", this.historyRoute[this.historyRoute.length - 1]);
        }));
    }
    setHeaderDisplay=page => {
        switch (page) {
          case this.routeService.PAGE_HOME:
            {
                this.header?.setAttribute("data-display", "primary");
                this.header?.setAttribute("data-title-page", "");
                break;
            }

          case this.routeService.PAGE_MODES:
            {
                this.header?.setAttribute("data-display", "secondary");
                this.header?.setAttribute("data-title-page", "pageTitleModes");
                break;
            }

          case this.routeService.PAGE_SETTINGS:
            {
                this.header?.setAttribute("data-display", "secondary");
                this.header?.setAttribute("data-title-page", "pageTitleSettings");
                break;
            }

          case this.routeService.PAGE_EDIT_SETTING:
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
            this.routeService.navigate(this.routeService.PAGE_MODES);
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

const appRootElt = document.createElement("app-root");

document.body.prepend(appRootElt);