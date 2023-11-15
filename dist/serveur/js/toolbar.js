/*
 * orange-confort-plus - version 4.3.0 - 15/11/2023
 * Enhance user experience on web sites
 * © 2014 - 2023 Orange SA
 */
class i18nService {
    locale="en";
    path="";
    constructor(path) {
        this.path = path;
        if ([ "en", "fr" ].some((language => navigator.language.startsWith(language)))) {
            this.locale = navigator.language.slice(0, 2);
        }
        const xhr = new XMLHttpRequest;
        xhr.open("GET", `${this.path}_locales/${this.locale}/messages.json`, false);
        xhr.addEventListener("error", (() => {
            throw new Error(`Couldn’t find ${this.locale}.`);
        }));
        xhr.send();
        localStorage.setItem("orange-i18n", xhr.responseText);
    }
    get locale() {
        return this.locale;
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

class pathService {
    path="";
    constructor() {
        this.path = window.location.origin + "/";
    }
    get path() {
        return this.path;
    }
}

class iconsService {
    constructor() {}
    get path() {
        return `${window.location.origin}/assets/icons/orange-icons-sprite.svg`;
    }
    loadSprite(root) {
        return;
    }
}

"use strict";

const template = document.createElement("template");

template.innerHTML = `\n<style>\n\t.sc-confort-plus {\n\t\t\tborder-radius: 50%;\n\t\t\tposition: fixed;\n\t\t\ttop: 50%;\n\t\t\tright: 1rem;\n\t\t\tpadding: 0 !important;\n\t\t\ttransform: translate(-50%, -50%);\n\t}\n</style>\n<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">\n\t<span class="visually-hidden" data-i18n="mainButton"></span>\n\t<app-icon data-size="3rem" data-name="Accessibility"></app-icon>\n</button>\n<app-toolbar class="d-none bg-body" id="toolbar"></app-toolbar>\n`;

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
        this.pathService = new pathService;
        this.path = this.pathService.path;
        this.i18nService = new i18nService(this.path);
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
        if (!this.confortPlusBtn || !this.confortPlusToolbar) {
            return;
        }
        template.addEventListener("closeEvent", this.toggleToolbar);
        this.confortPlusBtn.addEventListener("click", this.toggleToolbar);
    }
    disconnectedCallback() {
        this.confortPlusBtn?.removeEventListener("click", this.toggleToolbar);
    }
    toggleToolbar=() => {
        this.openConfortPlus = !this.openConfortPlus;
        this?.confortPlusToolbar?.classList.toggle("d-none");
        this?.confortPlusBtn?.classList.toggle("d-none");
    };
}

customElements.define("app-root", AppComponent);

"use strict";

const btnModalLayout = document.createElement("template");

btnModalLayout.innerHTML = `\n\t<style>\n\t</style>\n`;

class BtnModalComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(btnModalLayout.content.cloneNode(true));
    }
    connectedCallback() {}
}

customElements.define("app-btn-modal", BtnModalComponent);

"use strict";

const btnSettingLayout = document.createElement("template");

btnSettingLayout.innerHTML = `\n\t<style>\n\t\t.sc-btn-setting__btn-slots {\n\t\t\tmargin-top: .5rem;\n\t\t}\n\n\t\t.sc-btn-setting__btn-slot {\n\t\t\tbackground: white;\n\t\t\tborder-radius: 50%;\n\t\t\twidth: .25rem;\n\t\t\theight: .25rem;\n\t\t}\n\t\t.sc-btn-setting__btn-slot.selected {\n\t\t\tbackground: black;\n\t\t\tborder: 2px solid black;\n\t\t\tbox-sizing: content-box;\n\t\t}\n\t</style>\n\n\t<button class="btn btn-primary flex-column">\n\t\t<span>Label</span>\n\t\t<app-icon data-name="Text_Size"></app-icon>\n\t\t<div class="d-flex gap-1 align-items-center sc-btn-setting__btn-slots"></div>\n\t</button>\n`;

class BtnSettingComponent extends HTMLElement {
    settingBtn=null;
    index=0;
    settingsList="";
    separator=",";
    constructor() {
        super();
        this.settingsList = this.dataset?.settingsList || this.settingsList;
        this.appendChild(btnSettingLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("button");
        const btnContentSlots = this.querySelector("div");
        const settingsArray = this.settingsList.split(this.separator);
        let slot = "";
        settingsArray.forEach(((value, index) => {
            let div = '<div class="sc-btn-setting__btn-slot"></div>';
            if (index === this.index) {
                div = '<div class="sc-btn-setting__btn-slot selected"></div>';
            }
            slot = `${slot}${div}`;
        }));
        btnContentSlots.innerHTML = slot;
        this.settingBtn?.addEventListener("click", (() => {
            this.index++;
            if (this.index >= settingsArray.length) {
                this.index = 0;
            }
            slot = "";
            settingsArray.forEach(((value, index) => {
                let div = '<div class="sc-btn-setting__btn-slot"></div>';
                if (index === this.index) {
                    div = '<div class="sc-btn-setting__btn-slot selected"></div>';
                    let clickEvent = new CustomEvent("changeSettingEvent", {
                        detail: {
                            value: value
                        }
                    });
                    template.dispatchEvent(clickEvent);
                }
                slot = `${slot}${div}`;
            }));
            btnContentSlots.innerHTML = slot;
        }));
    }
    disconnectedCallback() {
        this.settingBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-btn-setting", BtnSettingComponent);

"use strict";

const collapseLayout = document.createElement("template");

collapseLayout.innerHTML = `\n\t<div class="accordion-item">\n    <div class="accordion-header">\n\t\t\t<button class="accordion-button collapsed gap-2 fs-4" type="button" data-bs-toggle="collapse" aria-expanded="false">\n\t\t\t\t<app-icon data-size="2rem"></app-icon>\n\t\t\t\t<span></span>\n\t\t\t</button>\n    </div>\n    <div class="accordion-collapse collapse">\n      <div class="accordion-body"></div>\n    </div>\n  </div>\n`;

class CollapseComponent extends HTMLElement {
    button=null;
    container=null;
    id="";
    accordion="";
    icon="";
    title="";
    CLASS_NAME_SHOW="show";
    CLASS_NAME_COLLAPSED="collapsed";
    _triggerArray=[];
    constructor() {
        super();
        this.id = this.dataset?.id || this.id;
        this.accordion = this.dataset?.idAccordion || this.accordion;
        this.icon = this.dataset?.icon || this.icon;
        this.title = this.dataset?.title || this.title;
        this.appendChild(collapseLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.button = this.querySelector("button.accordion-button");
        this.container = this.querySelector("div.accordion-collapse");
        this._triggerArray.push(this.button);
        const iconElement = this.querySelector("app-icon");
        iconElement.dataset.name = this.icon;
        const titleElement = this.button.querySelector("span");
        titleElement.innerHTML = this.title;
        this.button?.setAttribute("aria-controls", this.id);
        this.button?.setAttribute("data-bs-target", `#${this.id}`);
        this.container?.setAttribute("id", this.id);
        this.container?.setAttribute("data-bs-parent", `#${this.accordion}`);
        this.button?.addEventListener("click", (() => {
            this.toggle();
        }));
    }
    toggle() {
        if (this._isShown()) {
            this.hide();
        } else {
            this.show();
        }
    }
    show() {
        this.container?.classList.add(this.CLASS_NAME_SHOW);
        this._addAriaAndCollapsedClass(this._triggerArray, true);
    }
    hide() {
        this.container?.classList.remove(this.CLASS_NAME_SHOW);
        this._addAriaAndCollapsedClass(this._triggerArray, false);
    }
    _isShown(element = this.container) {
        return element.classList.contains(this.CLASS_NAME_SHOW);
    }
    _addAriaAndCollapsedClass(triggerArray, isOpen) {
        if (!triggerArray.length) {
            return;
        }
        for (const element of triggerArray) {
            element.classList.toggle(this.CLASS_NAME_COLLAPSED, !isOpen);
            element.setAttribute("aria-expanded", isOpen);
        }
    }
}

customElements.define("app-collapse", CollapseComponent);

"use strict";

const headerLayout = document.createElement("template");

headerLayout.innerHTML = `\n\t<header class="d-flex justify-content-between bg-secondary px-3 py-2">\n\t\t<div class="d-flex align-items-center">\n\t\t\t<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-title-i18n="close">\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\t\t\t<span id="title-app" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">\n\t\t\t\t<app-icon data-size="2rem" data-name="Accessibility"></app-icon>\n\t\t\t\t<span data-i18n="mainTitle"></span>\n\t\t\t\t<span class="text-primary">+</span>\n\t\t\t</span>\n\t\t</div>\n\t\t<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-title-i18n="close">\n\t\t\t\t<span class="visually-hidden" data-i18n="close"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_right"></app-icon>\n\t\t</button>\n\t</header>\n`;

class HeaderComponent extends HTMLElement {
    prevBtn=null;
    closeBtn=null;
    titleApp=null;
    mode="primary";
    constructor() {
        super();
        this.mode = this.dataset.mode || this.mode;
        this.closeBtn = this.querySelector("#close-toolbar");
        this.prevBtn = this.querySelector("#prev-toolbar");
        this.appendChild(headerLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.displayMode();
        this.closeBtn?.addEventListener("click", (() => {
            let clickCloseEvent = new CustomEvent("closeEvent");
            template.dispatchEvent(clickCloseEvent);
        }));
        this.prevBtn?.addEventListener("click", (() => {
            let clickPrevEvent = new CustomEvent("prevEvent");
            template.dispatchEvent(clickPrevEvent);
        }));
    }
    disconnectedCallback() {
        this.closeBtn?.removeEventListener("click", (() => {}));
        this.prevBtn?.removeEventListener("click", (() => {}));
    }
    displayMode() {
        this.prevBtn = this.querySelector("#prev-toolbar");
        this.titleApp = this.querySelector("#title-app");
        if (this.mode === "primary") {
            this.prevBtn?.classList.remove("d-none");
            this.titleApp?.classList.add("d-none");
            console.log(this.titleApp);
        } else {
            this.prevBtn?.classList.add("d-none");
            this.titleApp?.classList.remove("d-none");
        }
    }
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
    size="1.25rem";
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
    attributeChangedCallback(name, oldValue, newValue) {
        let use = this.querySelector("use");
        if ("data-name" === name) {
            use?.setAttribute("href", `${this.path}${this.sprite}#ic_${newValue}`);
        }
    }
}

customElements.define("app-icon", IconComponent);

"use strict";

const selectModeLayout = document.createElement("template");

selectModeLayout.innerHTML = `\n\t<style>\n\t\tlabel {\n\t\t\twidth: 100%;\n\t\t\tcursor: pointer;\n\t\t}\n\n\t\tinput {\n\t\t\tappearance: none;\n    \t-webkit-appearance: none;\n    \t-moz-appearance: none;\n\t\t\tposition: absolute;\n\t\t}\n\n\t\tinput:checked + div {\n\t\t\tbox-shadow: var(--bs-focus-ring-x,0) var(--bs-focus-ring-y,0) var(--bs-focus-ring-blur,0) var(--bs-focus-ring-width) var(--bs-focus-ring-color);\n\t\t}\n\n\t\tinput:not(:checked) + div > p {\n\t\t\tdisplay: none;\n\t\t}\n\t</style>\n\n\t<label>\n\t\t<input type="radio">\n\t\t<div class="d-flex flex-column gap-1 p-1">\n\t\t\t<div class="d-flex align-items-center gap-2">\n\t\t\t\t<app-icon data-size="2rem"></app-icon>\n\t\t\t\t<span class="fs-5 text"></span>\n\t\t\t</div>\n\t\t\t<p class="fs-6 fw-normal m-0"></p>\n\t\t</div>\n\t</label>\n`;

class SelectModeComponent extends HTMLElement {
    id="";
    icon="";
    name="";
    label="";
    description="";
    constructor() {
        super();
        this.id = this.dataset?.id || this.id;
        this.icon = this.dataset?.icon || this.icon;
        this.name = this.dataset?.name || this.name;
        this.label = this.dataset?.label || this.label;
        this.description = this.dataset?.description || this.description;
        this.appendChild(selectModeLayout.content.cloneNode(true));
    }
    connectedCallback() {
        const inputElement = this.querySelector("input");
        const iconElement = this.querySelector("app-icon");
        const labelElement = this.querySelector("span");
        const descriptionElement = this.querySelector("p");
        inputElement?.setAttribute("id", this.id);
        inputElement?.setAttribute("name", this.name);
        iconElement.dataset.name = this.icon;
        labelElement.innerHTML = this.label;
        descriptionElement.innerHTML = this.description;
    }
}

customElements.define("app-select-mode", SelectModeComponent);

"use strict";

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n    <style>\n        app-layout {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-layout__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="layout"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-layout__tool-content" data-i18n="wip">\n    </div>\n`;

class LayoutComponent extends HTMLElement {
    toolBtn=null;
    open=false;
    constructor() {
        super();
        this.appendChild(tmplLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.querySelector("#sc-layout__tool-btn");
        const contentElt = this.querySelector("#sc-layout__tool-content");
        this.toolBtn?.addEventListener("click", (() => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove("hidden");
            } else {
                contentElt?.classList.add("hidden");
            }
        }));
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-layout", LayoutComponent);

"use strict";

const tmplPictureVideo = document.createElement("template");

tmplPictureVideo.innerHTML = `\n    <style>\n        app-picture-video {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-picture-video__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="medias"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-picture-video__tool-content" data-i18n="wip"></div>\n`;

class PictureVideoComponent extends HTMLElement {
    toolBtn=null;
    open=false;
    constructor() {
        super();
        this.appendChild(tmplPictureVideo.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.querySelector("#sc-picture-video__tool-btn");
        const contentElt = this.querySelector("#sc-picture-video__tool-content");
        this.toolBtn?.addEventListener("click", (() => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove("hidden");
            } else {
                contentElt?.classList.add("hidden");
            }
        }));
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-picture-video", PictureVideoComponent);

"use strict";

const tmplPointer = document.createElement("template");

tmplPointer.innerHTML = `\n    <style>\n        app-pointer {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-pointer__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="pointer"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-pointer__tool-content" data-i18n="wip"></div>\n`;

class PointerComponent extends HTMLElement {
    toolBtn=null;
    open=false;
    constructor() {
        super();
        this.appendChild(tmplPointer.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.querySelector("#sc-pointer__tool-btn");
        const contentElt = this.querySelector("#sc-pointer__tool-content");
        this.toolBtn?.addEventListener("click", (() => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove("hidden");
            } else {
                contentElt?.classList.add("hidden");
            }
        }));
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-pointer", PointerComponent);

"use strict";

const tmplSound = document.createElement("template");

tmplSound.innerHTML = `\n    <style>\n        app-sound {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-sound__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="audio"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-sound__tool-content" data-i18n="wip"></div>\n`;

class SoundComponent extends HTMLElement {
    toolBtn=null;
    open=false;
    constructor() {
        super();
        this.appendChild(tmplSound.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.querySelector("#sc-sound__tool-btn");
        const contentElt = this.querySelector("#sc-sound__tool-content");
        this.toolBtn?.addEventListener("click", (() => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove("hidden");
            } else {
                contentElt?.classList.add("hidden");
            }
        }));
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-sound", SoundComponent);

"use strict";

const tmplText = document.createElement("template");

tmplText.innerHTML = `\n    <style>\n        app-text {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-text__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="text"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-text__tool-content">\n        <app-increase-text-size></app-increase-text-size>\n        <app-text-transform></app-text-transform>\n        <app-font-family></app-font-family>\n        <app-reading-guide></app-reading-guide>\n    </div>\n`;

class TextComponent extends HTMLElement {
    toolBtn=null;
    open=false;
    constructor() {
        super();
        this.appendChild(tmplText.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.querySelector("#sc-text__tool-btn");
        const contentElt = this.querySelector("#sc-text__tool-content");
        this.toolBtn?.addEventListener("click", (() => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove("hidden");
            } else {
                contentElt?.classList.add("hidden");
            }
        }));
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-text", TextComponent);

"use strict";

const tmplFontFamily = document.createElement("template");

tmplFontFamily.innerHTML = `\n<style>\n    app-font-family {\n        margin-bottom: 1rem;\n    }\n</style>\n\x3c!-- @todo Loop through predefined values --\x3e\n\x3c!-- @note To translate, or not? --\x3e\n<button id="normal-font" data-i18n="default"></button>\n<button id="arial-font">Arial</button>\n<button id="open-font-font">Open Sans</button>\n<button id="accessible-dfa-font">Accessible-DFA</button>\n<button id="open-dyslexic-font">Open Dyslexic</button>\n<button id="luciole-font">Luciole</button>\n`;

class FontFamilyComponent extends HTMLElement {
    normalBtn=null;
    arialBtn=null;
    openSansBtn=null;
    accessibleDFABtn=null;
    openDyslexicBtn=null;
    lucioleBtn=null;
    pathService;
    constructor() {
        super();
        this.appendChild(tmplFontFamily.content.cloneNode(true));
        this.pathService = new pathService;
        const path = this.pathService.path;
        let head = document.head || document.getElementsByTagName("head")[0];
        let styles = document.createElement("style");
        head.appendChild(styles);
        styles.innerHTML = `\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${path}assets/fonts/accessibleDFA/AccessibleDfA-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${path}assets/fonts/accessibleDFA/AccessibleDfA-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${path}assets/fonts/accessibleDFA/AccessibleDfA-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${path}assets/fonts/open-dyslexic/OpenDyslexic-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${path}assets/fonts/open-dyslexic/OpenDyslexic-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${path}assets/fonts/open-dyslexic/OpenDyslexic-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${path}assets/fonts/open-dyslexic/OpenDyslexic-Bold-Italic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Luciole"; src: url("${path}assets/fonts/luciole/Luciole-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${path}assets/fonts/luciole/Luciole-Regular-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${path}assets/fonts/luciole/Luciole-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${path}assets/fonts/luciole/Luciole-Bold-Italic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${path}assets/fonts/open-sans/OpenSans-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${path}assets/fonts/open-sans/OpenSans-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${path}assets/fonts/open-sans/OpenSans-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${path}assets/fonts/open-sans/OpenSans-BoldItalic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }`;
        this.normalBtn = this.querySelector("#normal-font");
        this.arialBtn = this.querySelector("#arial-font");
        this.openSansBtn = this.querySelector("#open-font-font");
        this.accessibleDFABtn = this.querySelector("#accessible-dfa-font");
        this.openDyslexicBtn = this.querySelector("#open-dyslexic-font");
        this.lucioleBtn = this.querySelector("#luciole-font");
    }
    connectedCallback() {
        const bodyElt = document.getElementsByTagName("body")[0];
        this.normalBtn?.addEventListener("click", (() => {
            bodyElt.style.fontFamily = ``;
        }));
        this.arialBtn?.addEventListener("click", (() => {
            bodyElt.style.fontFamily = `"Liberation Sans", Arial, sans-serif`;
        }));
        this.openSansBtn?.addEventListener("click", (() => {
            bodyElt.style.fontFamily = `Open-Sans`;
        }));
        this.accessibleDFABtn?.addEventListener("click", (() => {
            bodyElt.style.fontFamily = `Accessible-DFA`;
        }));
        this.openDyslexicBtn?.addEventListener("click", (() => {
            bodyElt.style.fontFamily = `Open-Dyslexic`;
        }));
        this.lucioleBtn?.addEventListener("click", (() => {
            bodyElt.style.fontFamily = `Luciole`;
        }));
    }
    disconnectedCallback() {
        this.normalBtn?.removeEventListener("click", (() => {}));
        this.arialBtn?.removeEventListener("click", (() => {}));
        this.openSansBtn?.removeEventListener("click", (() => {}));
        this.accessibleDFABtn?.removeEventListener("click", (() => {}));
        this.openDyslexicBtn?.removeEventListener("click", (() => {}));
        this.lucioleBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-font-family", FontFamilyComponent);

"use strict";

const tmplIncreaseTextSize = document.createElement("template");

tmplIncreaseTextSize.innerHTML = `\n    <style>\n        app-increase-text-size {\n            display: flex;\n            align-items: center;\n            margin-bottom: 1rem;\n        }\n        .sc-increase-text-size__content {\n        \tdisplay: flex;\n        }\n\n        .sc-increase-text-size__btn-size {\n            background: #ff7900;\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            width: 5rem;\n            height: 5rem;\n            margin-right: 1rem;\n        }\n\n        .sc-increase-text-size__btn-slots {\n            display: flex;\n            margin-top: 1rem;\n        }\n        .sc-increase-text-size__btn-slot {\n            background: #FFBE85;\n            border-radius: 50%;\n            width: .5rem;\n            height: .5rem;\n            margin-right: .25rem;\n        }\n        .sc-increase-text-size__btn-slot:last-child {\n            margin-right: 0;\n        }\n        .selected {\n            background: black;\n        }\n\n        .sc-increase-text-size__size-info {\n            font-weight: 700;\n            background: #ff7900;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 5rem;\n            padding: 1rem 2rem 1rem 1rem;\n            clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);\n        }\n    </style>\n    <div class="sc-increase-text-size__content">\n\t\t\t<button class="sc-increase-text-size__btn-size" id="btn-size">\n\t\t\t\t\t<span data-i18n="textSize"></span>\n\t\t\t\t\t<div class="sc-increase-text-size__btn-slots" id="btn-content-slots"></div>\n\t\t\t</button>\n\t\t\t<div class="sc-increase-text-size__size-info" id="content-size-info"></div>\n\t\t</div>\n`;

class IncreaseTextSizeComponent extends HTMLElement {
    toolBtn=null;
    sizeBtn=null;
    index=0;
    fontSizes=[ 16, 18, 20, 22, 24 ];
    constructor() {
        super();
        this.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
    }
    connectedCallback() {
        const bodyElt = document.getElementsByTagName("body")[0];
        const sizeInfoElt = this.querySelector("#content-size-info");
        this.sizeBtn = this.querySelector("#btn-size");
        if (!sizeInfoElt) {
            return;
        }
        const btnContentSlots = this.querySelector("#btn-content-slots");
        let slot = "";
        this.fontSizes.forEach(((size, index) => {
            let div = '<div class="sc-increase-text-size__btn-slot"></div>';
            if (index === this.index) {
                div = '<div class="sc-increase-text-size__btn-slot selected"></div>';
            }
            slot = `${slot}${div}`;
        }));
        btnContentSlots.innerHTML = slot;
        sizeInfoElt.innerHTML = `${this.fontSizes[this.index]}`;
        this.sizeBtn?.addEventListener("click", (() => {
            this.index++;
            if (this.index >= this.fontSizes.length) {
                this.index = 0;
            }
            slot = "";
            this.fontSizes.forEach(((size, index) => {
                let div = '<div class="sc-increase-text-size__btn-slot"></div>';
                if (index === this.index) {
                    div = '<div class="sc-increase-text-size__btn-slot selected"></div>';
                }
                slot = `${slot}${div}`;
            }));
            btnContentSlots.innerHTML = slot;
            bodyElt.style.fontSize = `${this.fontSizes[this.index]}px`;
            sizeInfoElt.innerHTML = `${this.fontSizes[this.index]}`;
        }));
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener("click", (() => {}));
        this.sizeBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-increase-text-size", IncreaseTextSizeComponent);

"use strict";

const tmplReadingGuide = document.createElement("template");

tmplReadingGuide.innerHTML = `\n<style>\n    app-reading-guide {\n        margin-bottom: 1rem;\n    }\n    .c-reading-guide {\n        background: rgba(0, 0, 0, .5);\n        position: fixed;\n        left: 0;\n        right: 0;\n        z-index: 99999;\n    }\n    .c-reading-guide--top {\n        top: 0;\n    }\n    .c-reading-guide--bottom {\n        bottom: 0;\n    }\n    .c-reading-guide__close-msg {\n        color: white;\n        font-weight: 700;\n        padding: 1rem;\n        position: absolute;\n        right: 0;\n        bottom: 0;\n    }\n    .c-reading-guide__close-btn {\n        width: 80px;\n        height: 80px;\n        position: absolute;\n        right: 0;\n        bottom: -80px;\n    }\n</style>\n<button id="reading-guide-btn" data-i18n="readingMask"></button>\n<div id="top-guide-elt" class="c-reading-guide c-reading-guide--top">\n    <span class="c-reading-guide__close-msg" data-i18n="readingMaskClose"></span>\n    <button id="close-btn" class="c-reading-guide__close-btn" data-i18n="close"></button>\n</div>\n<div id="bottom-guide-elt" class="c-reading-guide c-reading-guide--bottom"></div>\n`;

class ReadingGuideComponent extends HTMLElement {
    open=false;
    sizeGuide=40;
    topGuideElt=null;
    bottomGuideElt=null;
    activeGuideBtn=null;
    closeBtn=null;
    constructor() {
        super();
        this.appendChild(tmplReadingGuide.content.cloneNode(true));
        this.activeGuideBtn = this.querySelector("#reading-guide-btn");
        this.topGuideElt = this.querySelector("#top-guide-elt");
        this.bottomGuideElt = this.querySelector("#bottom-guide-elt");
        this.closeBtn = this.querySelector("#close-btn");
        if (this.topGuideElt && this.bottomGuideElt) {
            this.topGuideElt.style.display = "none";
            this.bottomGuideElt.style.display = "none";
        }
    }
    connectedCallback() {
        this.activeGuideBtn?.addEventListener("click", (() => {
            this.open = !this.open;
            if (!this.open) {
                this.resetReadingGuide();
                return;
            }
            if (this.topGuideElt && this.bottomGuideElt) {
                this.topGuideElt.style.removeProperty("display");
                this.bottomGuideElt.style.removeProperty("display");
            }
        }));
        this.closeBtn?.addEventListener("click", (() => {
            this.open = !this.open;
            if (!this.open) {
                this.resetReadingGuide();
            }
        }));
        document.onkeydown = event => {
            if (event.code === "Escape") {
                this.open = !this.open;
                this.resetReadingGuide();
            }
        };
        document.addEventListener("mousemove", (event => {
            if (this.open && this.topGuideElt && this.bottomGuideElt) {
                this.topGuideElt.style.height = `${event.y - this.sizeGuide}px`;
                this.bottomGuideElt.style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
            }
            event.stopPropagation();
        }));
    }
    disconnectedCallback() {
        this.closeBtn?.removeEventListener("click", (() => {}));
    }
    resetReadingGuide() {
        if (this.topGuideElt && this.bottomGuideElt) {
            this.topGuideElt.style.display = "none";
            this.bottomGuideElt.style.display = "none";
            this.topGuideElt.style.removeProperty("height");
            this.bottomGuideElt.style.removeProperty("height");
        }
    }
}

customElements.define("app-reading-guide", ReadingGuideComponent);

"use strict";

const tmplTextTransform = document.createElement("template");

tmplTextTransform.innerHTML = `\n<style>\n    app-text-transform {\n        margin-bottom: 1rem;\n    }\n</style>\n<button id="normal-btn" data-i18n="default"></button>\n<button id="first-letter-btn" data-i18n="firstLetter"></button>\n<button id="lowercase-btn" data-i18n="lowercase"></button>\n<button id="uppercase-btn" data-i18n="uppercase"></button>\n`;

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
        const bodyElt = document.getElementsByTagName("body")[0];
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

const tmplToolbar = document.createElement("template");

tmplToolbar.innerHTML = `\n<style>\n    #toolbar {\n        box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;\n        display: grid;\n        grid-template-rows: 4rem 7rem 1fr;\n        width: 19.5vw;\n        height: 100vh;\n        position: fixed;\n        top: 0;\n        right: 0;\n        z-index: 999;\n    }\n</style>\n<section class="bg-secondary p-3 d-flex align-items-center justify-content-between">\n\t<span class="fs-3 fw-bold text-white">\n\t\t<span data-i18n="mainTitle"></span>\n\t\t<span class="text-primary">+</span>\n\t</span>\n\t<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">\n\t\t\t<span class="visually-hidden" data-i18n="close"></span>\n\t\t\t<app-icon data-name="Form_Chevron_right"></app-icon>\n\t</button>\n</section>\n<section class="bg-dark p-3 d-flex align-items-center justify-content-between">\n    <div class="d-flex gap-3">\n        <div class="bg-body rounded-circle">\n\t\t\t\t\t\t<app-icon data-size="5rem" data-name="Eye"></app-icon>\n        </div>\n        <div class="d-flex justify-content-center flex-column">\n            <span data-i18n="profile"></span>\n            <span class="fs-4 fw-bold text-primary">Vision +</span>\n        </div>\n    </div>\n    <div class="d-grid gap-3 d-md-block">\n        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="openSettingsMode">\n            <span class="visually-hidden" data-i18n="openSettingsMode"></span>\n\t\t\t\t\t\t<app-icon data-name="Settings"></app-icon>\n        </button>\n        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">\n            <span class="visually-hidden" data-i18n="pause"></span>\n\t\t\t\t\t\t<app-icon data-name="Pause"></app-icon>\n        </button>\n    </div>\n</section>\n\n<section class="d-flex flex-column p-3 mb-2">\n    <app-text></app-text>\n    <app-layout></app-layout>\n    <app-picture-video></app-picture-video>\n    <app-sound></app-sound>\n    <app-pointer></app-pointer>\n</section>\n`;

class ToolbarComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(tmplToolbar.content.cloneNode(true));
    }
    connectedCallback() {
        template.addEventListener("changeSettingEvent", (event => {
            this.getSettingsValue(event);
        }));
    }
    getSettingsValue(event) {
        console.log(event.detail.value);
    }
}

customElements.define("app-toolbar", ToolbarComponent);

"use strict";

const appRootElt = document.createElement("app-root");

document.body.prepend(appRootElt);
