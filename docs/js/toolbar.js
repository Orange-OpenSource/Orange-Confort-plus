/*
 * orange-confort-plus - version 4.3.0 - 08/11/2023
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

"use strict";

const template = document.createElement("template");

template.innerHTML = `\n<style>\n\t\t.sc-confort-plus {\n\t\t\t\tborder: none;\n\t\t\t\tbackground-color: #ff7900;\n\t\t\t\twidth: 3rem;\n\t\t\t\theight: 3rem;\n\t\t\t\tborder-radius: 50%;\n\t\t\t\tposition: fixed;\n\t\t\t\ttop: 50%;\n\t\t\t\tright: 1rem;\n\t\t\t\ttransform: translate(-50%, -50%);\n\t\t\t\tcursor: pointer;\n\t\t}\n\n\t\t[hidden] {\n\t\t\tdisplay: none !important;\n\t\t}\n</style>\n<button class="sc-confort-plus" id="confort">\n\t<span class="sr-only" data-i18n="mainButton"></span>\n</button>\n\x3c!-- @todo rename mycustomevent --\x3e\n<app-toolbar hidden id="toolbar" onmycustomevent="{handleCustomEvent}"></app-toolbar>\n`;

class AppComponent extends HTMLElement {
    openConfortPlus=false;
    confortPlusBtn=null;
    confortPlusToolbar=null;
    i18nService;
    pathService;
    path;
    constructor() {
        super();
        this.pathService = new pathService;
        this.path = this.pathService.path;
        this.i18nService = new i18nService(this.path);
        this.attachShadow({
            mode: "open"
        });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        customElements.upgrade(this);
        setTimeout((() => {
            this.i18nService.translate(this.shadowRoot);
        }));
        this.confortPlusBtn = this.shadowRoot.getElementById("confort");
        this.confortPlusToolbar = this.shadowRoot.getElementById("toolbar");
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
        this.confortPlusToolbar.hidden = !this.openConfortPlus;
        this.confortPlusBtn.hidden = this.openConfortPlus;
    };
}

customElements.define("app-root", AppComponent);

"use strict";

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n    <style>\n        app-layout {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n        .c-btn-tool {\n            display: flex;\n            align-items: center;\n            width: 100%;\n            padding: .5rem;\n        }\n        .c-btn-tool__picto {\n            background: #ff7900;\n            border-radius: 50%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 1rem;\n            height: 1rem;\n            margin-right: .75rem;\n        }\n        .c-btn-tool:first-child {\n            margin-right: .75rem;\n        }\n        .c-btn-tool__label {\n            text-align: left;\n            flex: 1;\n        }\n\n        .c-tool__content {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            padding: .5rem;\n        }\n\n        button {\n            border-radius: .5rem;\n            border: none;\n            cursor: pointer;\n        }\n        .hidden {\n            display: flex;\n            visibility: hidden;\n            height: 0;\n            margin-right: 0;\n            padding: 0;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-layout__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="layout"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-layout__tool-content" data-i18n="wip">\n    </div>\n`;

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

tmplPictureVideo.innerHTML = `\n    <style>\n        app-picture-video {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n        .c-btn-tool {\n            display: flex;\n            align-items: center;\n            width: 100%;\n            padding: .5rem;\n        }\n        .c-btn-tool__picto {\n            background: #ff7900;\n            border-radius: 50%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 1rem;\n            height: 1rem;\n            margin-right: .75rem;\n        }\n        .c-btn-tool:first-child {\n            margin-right: .75rem;\n        }\n        .c-btn-tool__label {\n            text-align: left;\n            flex: 1;\n        }\n\n        .c-tool__content {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            padding: .5rem;\n        }\n\n        button {\n            border-radius: .5rem;\n            border: none;\n            cursor: pointer;\n        }\n        .hidden {\n            display: flex;\n            visibility: hidden;\n            height: 0;\n            margin-right: 0;\n            padding: 0;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-picture-video__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="medias"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-picture-video__tool-content" data-i18n="wip"></div>\n`;

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

tmplPointer.innerHTML = `\n    <style>\n        app-pointer {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n        .c-btn-tool {\n            display: flex;\n            align-items: center;\n            width: 100%;\n            padding: .5rem;\n        }\n        .c-btn-tool__picto {\n            background: #ff7900;\n            border-radius: 50%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 1rem;\n            height: 1rem;\n            margin-right: .75rem;\n        }\n        .c-btn-tool:first-child {\n            margin-right: .75rem;\n        }\n        .c-btn-tool__label {\n            text-align: left;\n            flex: 1;\n        }\n\n        .c-tool__content {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            padding: .5rem;\n        }\n\n        button {\n            border-radius: .5rem;\n            border: none;\n            cursor: pointer;\n        }\n        .hidden {\n            display: flex;\n            visibility: hidden;\n            height: 0;\n            margin-right: 0;\n            padding: 0;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-pointer__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="pointer"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-pointer__tool-content" data-i18n="wip"></div>\n`;

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

tmplSound.innerHTML = `\n    <style>\n        app-sound {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n        .c-btn-tool {\n            display: flex;\n            align-items: center;\n            width: 100%;\n            padding: .5rem;\n        }\n        .c-btn-tool__picto {\n            background: #ff7900;\n            border-radius: 50%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 1rem;\n            height: 1rem;\n            margin-right: .75rem;\n        }\n        .c-btn-tool:first-child {\n            margin-right: .75rem;\n        }\n        .c-btn-tool__label {\n            text-align: left;\n            flex: 1;\n        }\n\n        .c-tool__content {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            padding: .5rem;\n        }\n\n        button {\n            border-radius: .5rem;\n            border: none;\n            cursor: pointer;\n        }\n        .hidden {\n            display: flex;\n            visibility: hidden;\n            height: 0;\n            margin-right: 0;\n            padding: 0;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-sound__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="audio"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-sound__tool-content" data-i18n="wip"></div>\n`;

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

tmplText.innerHTML = `\n    <style>\n        app-text {\n            font-size: 1rem;\n            display: flex;\n            flex-direction: column;\n            margin-bottom: .75rem;\n        }\n        .c-btn-tool {\n            display: flex;\n            align-items: center;\n            width: 100%;\n            margin-bottom: .5rem;\n            padding: .5rem;\n        }\n        .c-btn-tool__picto {\n            background: #ff7900;\n            border-radius: 50%;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 1rem;\n            height: 1rem;\n            margin-right: .75rem;\n        }\n        .c-btn-tool:first-child {\n            margin-right: .75rem;\n        }\n        .c-btn-tool__label {\n            text-align: left;\n            flex: 1;\n        }\n\n        .c-tool__content {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            padding: .5rem;\n\n            > * {\n            \tmargin-bottom: 1rem;\n            }\n        }\n\n        button {\n            border-radius: .5rem;\n            border: none;\n            cursor: pointer;\n        }\n        .hidden {\n            display: flex;\n            visibility: hidden;\n            height: 0;\n            margin-right: 0;\n            padding: 0;\n        }\n    </style>\n    <button class="c-btn-tool" id="sc-text__tool-btn">\n        <div class="c-btn-tool__picto"></div>\n        <span class="c-btn-tool__label" data-i18n="text"></span>\n        <div class="c-btn-tool__picto"></div>\n    </button>\n    <div class="c-tool__content hidden" id="sc-text__tool-content">\n        <app-increase-text-size></app-increase-text-size>\n        <app-text-transform></app-text-transform>\n        <app-font-family></app-font-family>\n        <app-reading-guide></app-reading-guide>\n    </div>\n`;

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
        styles.innerHTML = `\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${path}fonts/accessibleDFA/AccessibleDfA-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${path}fonts/accessibleDFA/AccessibleDfA-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${path}fonts/accessibleDFA/AccessibleDfA-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${path}fonts/open-dyslexic/OpenDyslexic-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${path}fonts/open-dyslexic/OpenDyslexic-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${path}fonts/open-dyslexic/OpenDyslexic-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${path}fonts/open-dyslexic/OpenDyslexic-Bold-Italic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Luciole"; src: url("${path}fonts/luciole/Luciole-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${path}fonts/luciole/Luciole-Regular-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${path}fonts/luciole/Luciole-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${path}fonts/luciole/Luciole-Bold-Italic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${path}fonts/open-sans/OpenSans-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${path}fonts/open-sans/OpenSans-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${path}fonts/open-sans/OpenSans-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${path}fonts/open-sans/OpenSans-BoldItalic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }`;
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

tmplIncreaseTextSize.innerHTML = `\n    <style>\n        app-increase-text-size {\n            display: flex;\n            align-items: center;\n            margin-bottom: 1rem;\n        }\n        .sc-increase-text-size__content {\n        \tdisplay: flex;\n        }\n\n        .sc-increase-text-size__btn-size {\n            background: #ff7900;\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            width: 5rem;\n            height: 5rem;\n            margin-right: 1rem;\n        }\n\n        .sc-increase-text-size__btn-slots {\n            display: flex;\n            margin-top: 1rem;\n        }\n        .sc-increase-text-size__btn-slot {\n            background: #FFBE85;\n            border-radius: 50%;\n            width: .5rem;\n            height: .5rem;\n            margin-right: .25rem;\n        }\n        .sc-increase-text-size__btn-slot:last-child {\n            margin-right: 0;\n        }\n        .selected {\n            background: black;\n        }\n\n        .sc-increase-text-size__size-info {\n            font-weight: 700;\n            background: #ff7900;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 5rem;\n            padding: 1rem 2rem 1rem 1rem;\n            clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);\n        }\n\n        button {\n            border-radius: .5rem;\n            border: none;\n            cursor: pointer;\n        }\n    </style>\n    <div class="sc-increase-text-size__content">\n\t\t\t<button class="sc-increase-text-size__btn-size" id="btn-size">\n\t\t\t\t\t<span data-i18n="textSize"></span>\n\t\t\t\t\t<div class="sc-increase-text-size__btn-slots" id="btn-content-slots"></div>\n\t\t\t</button>\n\t\t\t<div class="sc-increase-text-size__size-info" id="content-size-info"></div>\n\t\t</div>\n`;

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

tmplToolbar.innerHTML = `\n<style>\n    #toolbar {\n        color: black;\n        background: white;\n        box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;\n        display: grid;\n        grid-template-rows: 4rem 7rem 1fr;\n        width: 19.5vw;\n        height: 100vh;\n        position: fixed;\n        top: 0;\n        right: 0;\n        z-index: 999;\n    }\n    .sc-toolbar__header,\n    .sc-toolbar__header-infos {\n        color: white;\n        background: black;\n        display: flex;\n        align-items: center;\n        padding: 1rem;\n    }\n    .sc-toolbar__header-infos {\n    \tpadding-top: 0;\n    }\n\n    .sc-toolbar__logo {\n        margin-right: 1rem;\n    }\n    .sc-toolbar__title {\n        font-size: 1.5rem;\n        font-weight: 700;\n        flex: 1;\n    }\n    .sc-toolbar__btn {\n        color: white;\n        font-weight: 700;\n        background: black;\n        border: 1px solid white;\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 2rem;\n        height: 2rem;\n        margin-left: 1rem;\n        cursor: pointer;\n    }\n    .sc-toolbar__btn:hover {\n        color: black;\n        background: #ff7900;\n        border: 1px solid #ff7900;\n    }\n\n    .sc-toolbar__close {\n        color: black;\n        background: #ff7900;\n        border: 1px solid #ff7900;\n    }\n\n    .sc-toolbar__infos-picto {\n        background: white;\n        border-radius: 50%;\n        width: 5rem;\n        height: 5rem;\n        margin-right: 1rem;\n    }\n    .sc-toolbar__infos-libelles {\n        display: flex;\n        flex-direction: column;\n        flex: 1;\n    }\n    .sc-toolbar__infos-mode {\n        color: #ff7900;\n        font-weight: 700;\n        font-size: 1.25rem;\n    }\n    .sc-toolbar__infos-tools {\n        display: flex;\n    }\n\n    .sc-toolbar__content {\n        display: flex;\n        flex-direction: column;\n        margin-bottom: .5rem;\n        padding: 1rem;\n    }\n</style>\n<section class="sc-toolbar__header">\n    <span class="sc-toolbar__title" data-i18n="mainTitle"></span>\n    <button class="sc-toolbar__btn"> -> </button>\n    <button id="close-toolbar" class="sc-toolbar__btn sc-toolbar__close"> >> </button>\n</section>\n<section class="sc-toolbar__header-infos">\n    <div class="sc-toolbar__infos-picto"></div>\n    <div class="sc-toolbar__infos-libelles">\n        <span data-i18n="profile"></span>\n        \x3c!-- @todo Mise à jour / traudction de cette donnée ? --\x3e\n        <span class="sc-toolbar__infos-mode">Vision+</span>\n    </div>\n    <div class="sc-toolbar__infos-tools">\n        <button class="sc-toolbar__btn"> O </button>\n        <button class="sc-toolbar__btn"> [] </button>\n    </div>\n</section>\n\n<section class="sc-toolbar__content">\n    <app-text></app-text>\n    <app-layout></app-layout>\n    <app-picture-video></app-picture-video>\n    <app-sound></app-sound>\n    <app-pointer></app-pointer>\n</section>\n`;

class ToolbarComponent extends HTMLElement {
    closeBtn=null;
    constructor() {
        super();
        this.appendChild(tmplToolbar.content.cloneNode(true));
    }
    connectedCallback() {
        this.closeBtn = this.querySelector("#close-toolbar");
        this.closeBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent("closeEvent");
            template.dispatchEvent(clickEvent);
        }));
    }
    disconnectedCallback() {
        this.closeBtn?.removeEventListener("click", (() => {}));
    }
}

customElements.define("app-toolbar", ToolbarComponent);

"use strict";

const appRootElt = document.createElement("app-root");

document.body.prepend(appRootElt);