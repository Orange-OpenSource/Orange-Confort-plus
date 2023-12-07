/*
<<<<<<< HEAD
 * orange-confort-plus - version 4.3.0 - 18/12/2023
=======
<<<<<<< HEAD
 * orange-confort-plus - version 4.3.0 - 12/12/2023
=======
 * orange-confort-plus - version 4.3.0 - 07/12/2023
>>>>>>> Ajout de la sélection de mode d'usage.
>>>>>>> Ajout de la sélection de mode d'usage.
 * Enhance user experience on web sites
 * © 2014 - 2023 Orange SA
 */
"use strict";

class i18nService {
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

class pathService {
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

class routeService {
    _currentRoute="";
    PAGE_HOME="home";
    PAGE_MODES="modes";
    PAGE_SETTINGS="settings";
    PAGE_EDIT_SETTING="edit-setting";
    pageHome=null;
    pageModes=null;
    pageSettings=null;
    pageEditSetting=null;
    routes=new Route(this.PAGE_HOME, "app-home", this.pageHome, [ new Route(this.PAGE_MODES, "app-modes", this.pageModes), new Route(this.PAGE_SETTINGS, "app-settings", this.pageSettings, [ new Route(this.PAGE_EDIT_SETTING, "app-edit-setting", this.pageEditSetting, [ new Route(this.PAGE_MODES, "app-modes", this.pageModes), new Route(this.PAGE_SETTINGS, "app-settings", this.pageSettings, [ new Route(this.PAGE_EDIT_SETTING, "app-edit-setting", this.pageEditSetting) ]) ]) ]) ]);
    constructor() {
        this._currentRoute = this.PAGE_HOME;
    }
    get currentRoute() {
        return this._currentRoute;
    }
    set currentRoute(value) {
        if (value !== this.currentRoute) {
            this._currentRoute = value;
            this.emitChangeEvent(value);
        }
    }
    emitChangeEvent(value) {
        return value;
    }
    initPages(root) {
        const initializePage = route => {
            route["element"] = root.querySelector(route.component);
        };
        const initializeChildPages = parentRoute => {
            if (parentRoute?.children && parentRoute?.children.length > 0) {
                parentRoute?.children.forEach((childRoute => {
                    initializePage(childRoute);
                    initializeChildPages(childRoute);
                }));
            }
        };
        initializePage(this.routes);
        initializeChildPages(this.routes);
        this.toggle(null, this.currentRoute);
    }
    toggle(oldRoute, newRoute) {
        oldRoute = oldRoute ? oldRoute : "";
        newRoute = newRoute ? newRoute : this.currentRoute;
        const displayPage = route => {
            if (route.path === newRoute) {
                route["element"].classList.remove("d-none");
            } else if (route.path === oldRoute) {
                route["element"].classList.add("d-none");
            }
        };
        const displayChildPages = parentRoute => {
            if (parentRoute?.children && parentRoute?.children.length > 0) {
                parentRoute?.children.forEach((childRoute => {
                    displayPage(childRoute);
                    displayChildPages(childRoute);
                }));
            }
        };
        displayPage(this.routes);
        displayChildPages(this.routes);
        this.currentRoute = newRoute;
    }
    navigate(newRoute) {
        this.toggle(this.currentRoute, newRoute);
    }
    previous(route, object) {
        route = route ? route : this.currentRoute;
        object = object ? object : this.routes;
        if (!object?.children || object?.children.length === 0 || object?.path === route) {
            return null;
        }
        if (object?.children?.some((child => child?.path === route))) {
            this.toggle(this.currentRoute, object.path);
            return;
        }
        return object.children.map((child => this.previous(route, child))).reduce(((a, b) => a || b));
    }
}

class Route {
    constructor(path, component, pageElement, children = []) {
        this._path = path;
        this._component = component;
        this._pageElement = pageElement;
        this._children = children;
    }
    get path() {
        return this._path;
    }
    get component() {
        return this._component;
    }
    get element() {
        return this._pageElement;
    }
    set element(newElement) {
        this._pageElement = newElement;
    }
    get children() {
        return this._children;
    }
    set children(newChildren) {
        this._children = newChildren;
    }
}

"use strict";

const template = document.createElement("template");

template.innerHTML = `\n<div data-bs-theme="light">\n\t<button type="button" class="btn btn-icon btn-primary btn-lg sc-confort-plus" id="confort" data-i18n-title="mainButton">\n\t\t<span class="visually-hidden" data-i18n="mainButton"></span>\n\t\t<app-icon data-size="3rem" data-name="Accessibility"></app-icon>\n\t</button>\n\t<app-toolbar class="d-none bg-body" id="toolbar"></app-toolbar>\n</div>\n`;

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
        this.i18nService = new i18nService;
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
        this.confortPlusToolbar.addEventListener("closeEvent", this.toggleToolbar);
        this.confortPlusBtn.addEventListener("click", this.toggleToolbar);
    }
    disconnectedCallback() {
        this.confortPlusToolbar?.removeEventListener("click", this.toggleToolbar);
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

const tmplLayout = document.createElement("template");

tmplLayout.innerHTML = `\n\t\t<style>\n\t\t\t\tapp-layout {\n\t\t\t\t\t\tfont-size: 1rem;\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\tflex-direction: column;\n\t\t\t\t\t\tmargin-bottom: .75rem;\n\t\t\t\t}\n\t\t</style>\n\t\t<button class="c-btn-tool" id="sc-layout__tool-btn">\n\t\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t\t\t<span class="c-btn-tool__label" data-i18n="layout"></span>\n\t\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t</button>\n\t\t<div class="c-tool__content hidden" id="sc-layout__tool-content" data-i18n="wip">\n\t\t</div>\n`;

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

tmplPictureVideo.innerHTML = `\n\t\t<style>\n\t\t\t\tapp-picture-video {\n\t\t\t\t\t\tfont-size: 1rem;\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\tflex-direction: column;\n\t\t\t\t\t\tmargin-bottom: .75rem;\n\t\t\t\t}\n\t\t</style>\n\t\t<button class="c-btn-tool" id="sc-picture-video__tool-btn">\n\t\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t\t\t<span class="c-btn-tool__label" data-i18n="medias"></span>\n\t\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t</button>\n\t\t<div class="c-tool__content hidden" id="sc-picture-video__tool-content" data-i18n="wip"></div>\n`;

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

tmplPointer.innerHTML = `\n\t\t<style>\n\t\t\t\tapp-pointer {\n\t\t\t\t\t\tfont-size: 1rem;\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\tflex-direction: column;\n\t\t\t\t\t\tmargin-bottom: .75rem;\n\t\t\t\t}\n\t\t</style>\n\t\t<button class="c-btn-tool" id="sc-pointer__tool-btn">\n\t\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t\t\t<span class="c-btn-tool__label" data-i18n="pointer"></span>\n\t\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t</button>\n\t\t<div class="c-tool__content hidden" id="sc-pointer__tool-content" data-i18n="wip"></div>\n`;

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

tmplSound.innerHTML = `\n\t\t<style>\n\t\t\t\tapp-sound {\n\t\t\t\t\t\tfont-size: 1rem;\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\tflex-direction: column;\n\t\t\t\t\t\tmargin-bottom: .75rem;\n\t\t\t\t}\n\t\t</style>\n\t\t<button class="c-btn-tool" id="sc-sound__tool-btn">\n\t\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t\t\t<span class="c-btn-tool__label" data-i18n="audio"></span>\n\t\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t</button>\n\t\t<div class="c-tool__content hidden" id="sc-sound__tool-content" data-i18n="wip"></div>\n`;

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
    displayMode(mode) {
        this.prevBtn?.classList.toggle("d-none", mode === "primary");
        this.titlePageBlock?.classList.toggle("d-none", mode === "primary");
        this.titleApp?.classList.toggle("d-none", mode === "secondary");
    }
}

customElements.define("app-sound", SoundComponent);

"use strict";

const tmplFontFamily = document.createElement("template");

tmplFontFamily.innerHTML = `\n<style>\n\tapp-font-family {\n\t\t\tmargin-bottom: 1rem;\n\t}\n</style>\n\x3c!-- @todo Loop through predefined values --\x3e\n\x3c!-- @note To translate, or not? --\x3e\n<button id="normal-font" data-i18n="default"></button>\n<button id="arial-font">Arial</button>\n<button id="open-font-font">Open Sans</button>\n<button id="accessible-dfa-font">Accessible-DFA</button>\n<button id="open-dyslexic-font">Open Dyslexic</button>\n<button id="luciole-font">Luciole</button>\n`;

class FontFamilyComponent extends HTMLElement {
    normalBtn=null;
    arialBtn=null;
    openSansBtn=null;
    accessibleDFABtn=null;
    openDyslexicBtn=null;
    lucioleBtn=null;
    pathService;
    path;
    constructor() {
        super();
        this.appendChild(tmplFontFamily.content.cloneNode(true));
        this.pathService = new pathService;
        this.path = this.pathService.path;
        let head = document.head || document.getElementsByTagName("head")[0];
        let styles = document.createElement("style");
        head.appendChild(styles);
        styles.innerHTML = `\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${this.path}assets/fonts/accessibleDFA/AccessibleDfA-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${this.path}assets/fonts/accessibleDFA/AccessibleDfA-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Accessible-DFA"; src: url("${this.path}assets/fonts/accessibleDFA/AccessibleDfA-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${this.path}assets/fonts/open-dyslexic/OpenDyslexic-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${this.path}assets/fonts/open-dyslexic/OpenDyslexic-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${this.path}assets/fonts/open-dyslexic/OpenDyslexic-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Dyslexic"; src: url("${this.path}assets/fonts/open-dyslexic/OpenDyslexic-Bold-Italic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Luciole"; src: url("${this.path}assets/fonts/luciole/Luciole-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${this.path}assets/fonts/luciole/Luciole-Regular-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${this.path}assets/fonts/luciole/Luciole-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Luciole"; src: url("${this.path}assets/fonts/luciole/Luciole-Bold-Italic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }\n\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${this.path}assets/fonts/open-sans/OpenSans-Regular.woff2"); font-style: normal; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${this.path}assets/fonts/open-sans/OpenSans-Italic.woff2"); font-style: italic; font-weight: 400; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${this.path}assets/fonts/open-sans/OpenSans-Bold.woff2"); font-style: normal; font-weight: 700; font-display:swap; }\n\t\t\t@font-face { font-family:"Open-Sans"; src: url("${this.path}assets/fonts/open-sans/OpenSans-BoldItalic.woff2"); font-style: italic; font-weight: 700; font-display:swap; }`;
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

tmplIncreaseTextSize.innerHTML = `\n\t\t<style>\n\t\t\t\tapp-increase-text-size {\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\talign-items: center;\n\t\t\t\t\t\tmargin-bottom: 1rem;\n\t\t\t\t}\n\t\t\t\t.sc-increase-text-size__content {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t}\n\n\t\t\t\t.sc-increase-text-size__btn-size {\n\t\t\t\t\t\tbackground: #ff7900;\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\tflex-direction: column;\n\t\t\t\t\t\tjustify-content: center;\n\t\t\t\t\t\talign-items: center;\n\t\t\t\t\t\twidth: 5rem;\n\t\t\t\t\t\theight: 5rem;\n\t\t\t\t\t\tmargin-right: 1rem;\n\t\t\t\t}\n\n\t\t\t\t.sc-increase-text-size__btn-slots {\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\tmargin-top: 1rem;\n\t\t\t\t}\n\t\t\t\t.sc-increase-text-size__btn-slot {\n\t\t\t\t\t\tbackground: #FFBE85;\n\t\t\t\t\t\tborder-radius: 50%;\n\t\t\t\t\t\twidth: .5rem;\n\t\t\t\t\t\theight: .5rem;\n\t\t\t\t\t\tmargin-right: .25rem;\n\t\t\t\t}\n\t\t\t\t.sc-increase-text-size__btn-slot:last-child {\n\t\t\t\t\t\tmargin-right: 0;\n\t\t\t\t}\n\t\t\t\t.selected {\n\t\t\t\t\t\tbackground: black;\n\t\t\t\t}\n\n\t\t\t\t.sc-increase-text-size__size-info {\n\t\t\t\t\t\tfont-weight: 700;\n\t\t\t\t\t\tbackground: #ff7900;\n\t\t\t\t\t\tdisplay: flex;\n\t\t\t\t\t\tjustify-content: center;\n\t\t\t\t\t\talign-items: center;\n\t\t\t\t\t\twidth: 5rem;\n\t\t\t\t\t\tpadding: 1rem 2rem 1rem 1rem;\n\t\t\t\t\t\tclip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);\n\t\t\t\t}\n\t\t</style>\n\t\t<div class="sc-increase-text-size__content">\n\t\t\t<button class="sc-increase-text-size__btn-size" id="btn-size">\n\t\t\t\t\t<span data-i18n="textSize"></span>\n\t\t\t\t\t<div class="sc-increase-text-size__btn-slots" id="btn-content-slots"></div>\n\t\t\t</button>\n\t\t\t<div class="sc-increase-text-size__size-info" id="content-size-info"></div>\n\t\t</div>\n`;

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

tmplReadingGuide.innerHTML = `\n\t<style>\n\t\tapp-reading-guide {\n\t\t\t\tmargin-bottom: 1rem;\n\t\t}\n\t\t.c-reading-guide {\n\t\t\t\tbackground: rgba(0, 0, 0, .5);\n\t\t\t\tposition: fixed;\n\t\t\t\tleft: 0;\n\t\t\t\tright: 0;\n\t\t\t\tz-index: 99999;\n\t\t}\n\t\t.c-reading-guide--top {\n\t\t\t\ttop: 0;\n\t\t}\n\t\t.c-reading-guide--bottom {\n\t\t\t\tbottom: 0;\n\t\t}\n\t\t.c-reading-guide__close-msg {\n\t\t\t\tcolor: white;\n\t\t\t\tfont-weight: 700;\n\t\t\t\tpadding: 1rem;\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 0;\n\t\t\t\tbottom: 0;\n\t\t}\n\t\t.c-reading-guide__close-btn {\n\t\t\t\twidth: 80px;\n\t\t\t\theight: 80px;\n\t\t\t\tposition: absolute;\n\t\t\t\tright: 0;\n\t\t\t\tbottom: -80px;\n\t\t}\n\t</style>\n\t<button id="reading-guide-btn" data-i18n="readingMask"></button>\n\t<div id="top-guide-elt" class="c-reading-guide c-reading-guide--top">\n\t\t\t<span class="c-reading-guide__close-msg" data-i18n="readingMaskClose"></span>\n\t\t\t<button id="close-btn" class="c-reading-guide__close-btn" data-i18n="close"></button>\n\t</div>\n\t<div id="bottom-guide-elt" class="c-reading-guide c-reading-guide--bottom"></div>\n`;

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
    resetReadingGuide=() => {
        if (this.topGuideElt && this.bottomGuideElt) {
            this.topGuideElt.style.display = "none";
            this.bottomGuideElt.style.display = "none";
            this.topGuideElt.style.removeProperty("height");
            this.bottomGuideElt.style.removeProperty("height");
        }
    };
}

customElements.define("app-reading-guide", ReadingGuideComponent);

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

const tmplText = document.createElement("template");

tmplText.innerHTML = `\n\t<style>\n\t\t\tapp-text {\n\t\t\t\t\tfont-size: 1rem;\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t\tflex-direction: column;\n\t\t\t\t\tmargin-bottom: .75rem;\n\t\t\t}\n\t</style>\n\t<button class="c-btn-tool" id="sc-text__tool-btn">\n\t\t\t<div class="c-btn-tool__picto"></div>\n\t\t\t<span class="c-btn-tool__label" data-i18n="text"></span>\n\t\t\t<div class="c-btn-tool__picto"></div>\n\t</button>\n\t<div class="c-tool__content hidden" id="sc-text__tool-content">\n\t\t\t<app-increase-text-size></app-increase-text-size>\n\t\t\t<app-text-transform></app-text-transform>\n\t\t\t<app-font-family></app-font-family>\n\t\t\t<app-reading-guide></app-reading-guide>\n\t</div>\n`;

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

const tmplToolbar = document.createElement("template");

tmplToolbar.innerHTML = `\n<app-header id="header"></app-header>\n\n<app-home></app-home>\n<app-modes class="d-none"></app-modes>\n<app-settings class="d-none"></app-settings>\n<app-edit-setting class="d-none"></app-edit-setting>\n`;

class ToolbarComponent extends HTMLElement {
    header=null;
    home=null;
    modes=null;
    routeService;
<<<<<<< HEAD
    historyRoute=[];
=======
    json={
        selectedMode: "",
        modes: [ {
            visionPlus: [ {
                "Taille de texte": {
                    value1: "16",
                    value2: "18",
                    value3: "20",
                    value4: "22",
                    value5: "24"
                },
                Police: {
                    value1: "null",
                    value2: "Arial",
                    value3: "Open Sans",
                    value4: "Accessible-DFA",
                    value5: "Open Dyslexic",
                    value6: "Luciole"
                }
            } ]
        }, {
            facilePlus: [ {
                "Taille de texte": {
                    value1: "20",
                    value2: "21",
                    value3: "22",
                    value4: "23"
                }
            }, {
                Police: {
                    value1: "null",
                    value2: "Arial",
                    value3: "Open Sans",
                    value4: "Accessible-DFA",
                    value5: "Open Dyslexic",
                    value6: "Luciole"
                }
            } ]
        } ]
    };
>>>>>>> Ajout de la sélection de mode d'usage.
    constructor() {
        super();
        this.routeService = new routeService;
        this.appendChild(tmplToolbar.content.cloneNode(true));
    }
    connectedCallback() {
<<<<<<< HEAD
        this.header = this.querySelector("#header");
=======
        this.home = this.querySelector("app-home");
        this.modes = this.querySelector("app-modes");
        this.modes.dataset.listMode = JSON.stringify(this.json.modes);
        this.header = this.querySelector("app-header");
>>>>>>> Ajout de la sélection de mode d'usage.
        this.routeService.initPages(this);
        this.addEventListener("changeRoute", (event => {
            if (event.detail.isPrev) {
                this.historyRoute.pop();
            } else {
                this.historyRoute.push(this.routeService.currentRoute);
            }
            this.routeService.navigate(event.detail.route);
            this.setHeaderDisplay(event.detail.route);
            this.header?.focus();
<<<<<<< HEAD
            this.header.setAttribute("data-prev-route", this.historyRoute[this.historyRoute.length - 1]);
=======
        };
<<<<<<< HEAD
        this.addEventListener("changeModeEvent", (event => {
            this.routeService.navigate(this.routeService.PAGE_MODES);
        }));
        this.addEventListener("selectModeEvent", (event => {
=======
        this.setCurrentMode();
        template.addEventListener("changeModeEvent", (event => {
            this.routeService.navigate(this.routeService.PAGE_MODES);
        }));
        template.addEventListener("selectModeEvent", (event => {
            this.setConfig(event);
            this.setCurrentMode();
>>>>>>> Ajout de la sélection de mode d'usage.
            this.routeService.navigate(this.routeService.PAGE_HOME);
        }));
        this.addEventListener("settingsEvent", (event => {
            this.routeService.navigate(this.routeService.PAGE_SETTINGS);
        }));
        this.addEventListener("prevEvent", (event => {
            this.routeService.previous();
>>>>>>> Ajout de la sélection de mode d'usage.
        }));
    }
    setHeaderDisplay=page => {
        switch (page) {
          case this.routeService.PAGE_HOME:
            {
                this.header?.setAttribute("data-mode", "primary");
                this.header?.setAttribute("data-title-page", "");
                break;
            }

          case this.routeService.PAGE_MODES:
            {
                this.header?.setAttribute("data-mode", "secondary");
                this.header?.setAttribute("data-title-page", "pageTitleModes");
                break;
            }

          case this.routeService.PAGE_SETTINGS:
            {
                this.header?.setAttribute("data-mode", "secondary");
                this.header?.setAttribute("data-title-page", "pageTitleSettings");
                break;
            }

          case this.routeService.PAGE_EDIT_SETTING:
            {
                this.header?.setAttribute("data-mode", "secondary");
                this.header?.setAttribute("data-title-page", "pageTitleEditSetting");
                break;
            }
        }
<<<<<<< HEAD
    };
=======
    }
    setCurrentMode() {
        if (this.json.selectedMode) {
            this.json.modes.forEach((mode => {
                if (Object.entries(mode)[0][0] === this.json.selectedMode) {
                    let currentMode = Object.entries(mode)[0];
                    this.home.dataset.mode = JSON.stringify(currentMode);
                }
            }));
        } else {
            this.routeService.navigate(this.routeService.PAGE_MODES);
        }
    }
    setConfig(event) {
        this.json.selectedMode = event?.detail.mode;
    }
>>>>>>> Ajout de la sélection de mode d'usage.
}

customElements.define("app-toolbar", ToolbarComponent);

"use strict";

const editSettingLayout = document.createElement("template");

editSettingLayout.innerHTML = `\n\t<p>Zone d'affichage du réglage</p>\n`;

class EditSettingComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(editSettingLayout.content.cloneNode(true));
    }
}

customElements.define("app-edit-setting", EditSettingComponent);

"use strict";

const homeLayout = document.createElement("template");

homeLayout.innerHTML = `\n<section class="bg-dark p-3 d-flex align-items-center justify-content-between">\n    <div class="d-flex gap-2">\n        <div class="bg-body rounded-circle">\n\t\t\t\t\t\t<app-icon data-size="5rem"></app-icon>\n        </div>\n        <div class="d-flex justify-content-center flex-column">\n            <span class="text-white" data-i18n="profile"></span>\n            <span id="mode-name" class="fs-4 fw-bold text-primary"></span>\n        </div>\n    </div>\n    <div class="d-grid gap-3 d-md-block">\n        <button id="settings-btn" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="openSettingsMode">\n            <span class="visually-hidden" data-i18n="openSettingsMode"></span>\n\t\t\t\t\t\t<app-icon data-name="Settings"></app-icon>\n        </button>\n        <button type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="pause">\n            <span class="visually-hidden" data-i18n="pause"></span>\n\t\t\t\t\t\t<app-icon data-name="Pause"></app-icon>\n        </button>\n    </div>\n</section>\n\n<section class="p-3">\n\t<p>Zone d'affichage des réglages du mode en cours</p>\n\n\t<div class="d-grid">\n\t\t<button id="change-mode-btn" class="btn btn-secondary" type="button" data-i18n="otherModes"></button>\n\t</div>\n</section>\n`;

class HomeComponent extends HTMLElement {
    static observedAttributes=[ "data-mode" ];
    changeModeBtn=null;
    settingsBtn=null;
<<<<<<< HEAD
    routeService;
    constructor() {
        super();
        this.routeService = new routeService;
=======
    modeName=null;
    modeIcon=null;
    i18nService;
    constructor() {
        super();
        this.i18nService = new i18nService;
>>>>>>> Ajout de la sélection de mode d'usage.
        this.appendChild(homeLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.changeModeBtn = this.querySelector("#change-mode-btn");
        this.settingsBtn = this.querySelector("#settings-btn");
        this.modeName = this.querySelector("#mode-name");
        this.modeIcon = this.querySelector("app-icon");
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
<<<<<<< HEAD
    disconnectedCallback() {
        this.changeModeBtn?.removeEventListener("click", (() => {}));
        this.settingsBtn?.removeEventListener("click", (() => {}));
=======
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-mode" === name) {
            this.modeName.innerText = this.i18nService.getMessage(`${JSON.parse(newValue)[0]}Name`);
            this.modeIcon.dataset.name = JSON.parse(newValue)[0];
        }
>>>>>>> Ajout de la sélection de mode d'usage.
    }
}

customElements.define("app-home", HomeComponent);

"use strict";

const modesLayout = document.createElement("template");

modesLayout.innerHTML = `\n<section class="p-3">\n\t<fieldset class="d-grid gap-2 mb-4">\n\t\t<legend class="fs-6 fw-normal" data-i18n="chooseModeAndValidate"></legend>\n\t\t<div id="select-mode-zone" class="d-grid gap-1">\n\t\t</div>\n\t</fieldset>\n\n\t<div class="d-grid">\n\t\t<button id="select-mode-btn" class="btn btn-primary" type="button" data-i18n="validateThisMode"></button>\n\t</div>\n</section>\n`;

class ModesComponent extends HTMLElement {
    static observedAttributes=[ "data-list-mode" ];
    selectModeBtn=null;
<<<<<<< HEAD
    routeService;
=======
    selectModeZone=null;
>>>>>>> Ajout de la sélection de mode d'usage.
    constructor() {
        super();
        this.routeService = new routeService;
        this.appendChild(modesLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.selectModeBtn = this.querySelector("#select-mode-btn");
        this.selectModeZone = this.querySelector("#select-mode-zone");
        this.selectModeBtn?.addEventListener("click", (() => {
<<<<<<< HEAD
            let clickEvent = new CustomEvent("changeRoute", {
                bubbles: true,
                detail: {
                    route: this.routeService.PAGE_HOME,
                    isPrev: true
                }
=======
            let clickEvent = new CustomEvent("selectModeEvent", {
<<<<<<< HEAD
                bubbles: true
>>>>>>> Ajout de la sélection de mode d'usage.
            });
            this.selectModeBtn?.dispatchEvent(clickEvent);
=======
                detail: {
                    mode: this.getSelectedMode()
                }
            });
            template.dispatchEvent(clickEvent);
>>>>>>> Ajout de la sélection de mode d'usage.
        }));
    }
<<<<<<< HEAD
    disconnectedCallback() {
        this.selectModeBtn?.removeEventListener("click", (() => {}));
=======
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-list-mode" === name) {
            this.displayListMode(JSON.parse(newValue));
        }
    }
    displayListMode(list) {
        let radioModeList = "";
        list.forEach((mode => {
            let radioMode = `<app-select-mode data-label="${Object.entries(mode)[0][0]}" data-settings-list="Description blabla"></app-select-mode>`;
            radioModeList = radioModeList + radioMode;
        }));
        this.selectModeZone.innerHTML = radioModeList;
    }
    getSelectedMode() {
        let selectedMode = "";
        let inputs = this.querySelectorAll('input[name="modes"]');
        inputs.forEach((input => {
            if (input.checked) {
                selectedMode = input.value;
            }
        }));
        return selectedMode;
>>>>>>> Ajout de la sélection de mode d'usage.
    }
}

customElements.define("app-modes", ModesComponent);

"use strict";

const settingsLayout = document.createElement("template");

settingsLayout.innerHTML = `\n<section class="d-flex flex-column p-3 mb-2">\n\t<app-text></app-text>\n\t<app-layout></app-layout>\n\t<app-picture-video></app-picture-video>\n\t<app-sound></app-sound>\n\t<app-pointer></app-pointer>\n</section>\n`;

class SettingsComponent extends HTMLElement {
    constructor() {
        super();
        this.appendChild(settingsLayout.content.cloneNode(true));
    }
}

customElements.define("app-settings", SettingsComponent);

"use strict";

const btnModalLayout = document.createElement("template");

btnModalLayout.innerHTML = `<button type="button" class="btn btn-primary pe-4 sc-btn-modal"></button>`;

class BtnModalComponent extends HTMLElement {
    static observedAttributes=[ "data-value", "data-label" ];
    modalBtn=null;
    id="";
    value=null;
    constructor() {
        super();
        this.id = this.dataset?.id || this.id;
        this.value = this.dataset?.value || this.value;
        this.appendChild(btnModalLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.modalBtn = this.querySelector("button");
        this.modalBtn?.addEventListener("click", (() => {
            let clickEvent = new CustomEvent(`clickModalEvent${this.id}`, {
                bubbles: true
            });
            this.modalBtn?.dispatchEvent(clickEvent);
        }));
    }
    disconnectedCallback() {
        this.modalBtn?.removeEventListener("click", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-value" === name && this.modalBtn !== null) {
            this.modalBtn.innerText = newValue;
        }
        if ("data-label" === name && this.modalBtn !== null) {
            this.setA11yName(newValue);
        }
    }
    setA11yName=label => {
        let span = document.createElement("span");
        span.classList.add("visually-hidden");
        span.innerText = label;
        this.modalBtn?.appendChild(span);
        this.modalBtn?.setAttribute("title", label);
    };
}

customElements.define("app-btn-modal", BtnModalComponent);

"use strict";

const btnSettingLayout = document.createElement("template");

btnSettingLayout.innerHTML = `\n\t<button class="btn btn-primary flex-column">\n\t\t<span></span>\n\t\t<app-icon data-name="Text_Size"></app-icon>\n\t\t<ul class="d-flex gap-1 align-items-center mt-2 mb-0 list-unstyled"></ul>\n\t</button>\n`;

class BtnSettingComponent extends HTMLElement {
    static observedAttributes=[ "data-settings-list", "data-label" ];
    settingBtn=null;
    btnContentSlots=null;
    index=1;
    settingsList="";
    label="";
    slot="";
    separator=",";
    settingsArray=[];
    constructor() {
        super();
        this.label = this.dataset?.label || this.label;
        this.appendChild(btnSettingLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.settingBtn = this.querySelector("button");
        this.btnContentSlots = this.querySelector("ul");
        const span = this.querySelector("span");
        span.innerText = this.label;
        this.settingBtn?.addEventListener("click", (() => {
            this.index++;
            if (this.index >= this.settingsArray.length) {
                this.index = 0;
            }
            this.calculateList();
        }));
    }
    disconnectedCallback() {
        this.settingBtn?.removeEventListener("click", (() => {}));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if ("data-settings-list" === name) {
            this.settingsList = newValue;
            this.settingsArray = this.settingsList.split(this.separator);
            this.calculateList();
        }
    }
    calculateList=() => {
        this.slot = "";
        this.settingsArray.forEach(((value, index) => {
            let point = '<li class="bg-white rounded-circle sc-btn-setting__btn-slot"></li>';
            if (index === this.index) {
                point = '<li class="bg-black border border-4 border-black rounded-circle"></li>';
                let clickEvent = new CustomEvent("changeSettingEvent", {
                    bubbles: true,
                    detail: {
                        id: this.id,
                        value: value
                    }
                });
                this.settingBtn?.dispatchEvent(clickEvent);
            }
            this.slot = `${this.slot}${point}`;
        }));
        this.btnContentSlots.innerHTML = this.slot;
    };
}

customElements.define("app-btn-setting", BtnSettingComponent);

"use strict";

const collapseLayout = document.createElement("template");

collapseLayout.innerHTML = `\n\t<div class="accordion-item">\n\t\t<div class="accordion-header">\n\t\t\t<button class="accordion-button collapsed gap-2 fs-4" type="button" data-bs-toggle="collapse" aria-expanded="false">\n\t\t\t\t<app-icon data-size="2rem"></app-icon>\n\t\t\t\t<span></span>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class="accordion-collapse collapse">\n\t\t\t<div class="accordion-body"></div>\n\t\t</div>\n\t</div>\n`;

class CollapseComponent extends HTMLElement {
    button=null;
    container=null;
    iconElement=null;
    titleElement=null;
    id="";
    icon="";
    title="";
    CLASS_NAME_SHOW="show";
    CLASS_NAME_COLLAPSED="collapsed";
    _triggerArray=[];
    constructor() {
        super();
        this.id = this.dataset?.id || this.id;
        this.icon = this.dataset?.icon || this.icon;
        this.title = this.dataset?.title || this.title;
        this.appendChild(collapseLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.button = this.querySelector("button.accordion-button");
        this.container = this.querySelector("div.accordion-collapse");
        this.iconElement = this.querySelector("app-icon");
        this.titleElement = this.button?.querySelector("span");
        this.iconElement?.setAttribute("data-name", this.icon);
        this.titleElement.innerText = this.title;
        this._triggerArray.push(this.button);
        this.button?.setAttribute("aria-controls", this.id);
        this.container?.setAttribute("id", this.id);
        this.button?.addEventListener("click", (() => {
            this.toggle();
        }));
    }
    disconnectedCallback() {
        this.button?.removeEventListener("click", (() => {}));
    }
    toggle=() => {
        this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    };
    _isShown=(element = this.container) => element.classList.contains(this.CLASS_NAME_SHOW);
    _addAriaAndCollapsedClass=(triggerArray, isOpen) => {
        if (!triggerArray.length) {
            return;
        }
        for (const element of triggerArray) {
            this.container?.classList.toggle(this.CLASS_NAME_SHOW, !isOpen);
            element.classList.toggle(this.CLASS_NAME_COLLAPSED, !isOpen);
            element.setAttribute("aria-expanded", String(isOpen));
        }
    };
}

customElements.define("app-collapse", CollapseComponent);

"use strict";

const headerLayout = document.createElement("template");

headerLayout.innerHTML = `\n\t<header class="d-flex justify-content-between bg-secondary px-3 py-2">\n\t\t<div class="d-flex align-items-center">\n\t\t\t<button id="prev-toolbar" type="button" class="btn btn-icon btn-inverse btn-secondary" data-i18n-title="previous">\n\t\t\t\t<span class="visually-hidden" data-i18n="previous"></span>\n\t\t\t\t<app-icon data-name="Form_Chevron_left"></app-icon>\n\t\t\t</button>\n\n\t\t\t<span id="title-page-block" class="d-flex gap-1 align-items-center fs-6 fw-bold text-white ms-2">\n\t\t\t\t<app-icon data-size="1.5rem" data-name="Eye" class="border-end border-white"></app-icon>\n\t\t\t\t<app-icon data-size="1.5rem" data-name="Settings"></app-icon>\n\t\t\t\t<span id="title-page"></span>\n\t\t\t</span>\n\n\t\t\t<span id="title-app" class="d-flex gap-1 align-items-center fs-3 fw-bold text-white">\n\t\t\t\t<app-icon data-size="2rem" data-name="Accessibility"></app-icon>\n\t\t\t\t<span data-i18n="mainTitle"></span>\n\t\t\t\t<span class="text-primary">+</span>\n\t\t\t</span>\n\t\t</div>\n\t\t<button id="close-toolbar" type="button" class="btn btn-icon btn-inverse btn-primary" data-i18n-title="close">\n\t\t\t\t<span class="visually-hidden" data-i18n="close"></span>\n\t\t\t\t<app-icon data-name="ReduireC+"></app-icon>\n\t\t</button>\n\t</header>\n`;

class HeaderComponent extends HTMLElement {
    static observedAttributes=[ "data-mode", "data-title-page", "data-prev-route" ];
    closeBtn=null;
    prevBtn=null;
    titleApp=null;
    titlePageBlock=null;
    titlePage=null;
    mode="primary";
    i18nService;
    routeService;
    prevRoute="";
    constructor() {
        super();
        this.i18nService = new i18nService;
        this.routeService = new routeService;
        this.appendChild(headerLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.closeBtn = this.querySelector("#close-toolbar");
        this.prevBtn = this.querySelector("#prev-toolbar");
        this.titleApp = this.querySelector("#title-app");
        this.titlePageBlock = this.querySelector("#title-page-block");
        this.titlePage = this.querySelector("#title-page");
        this.displayMode(this.mode);
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
        if ("data-mode" === name) {
            this.displayMode(newValue);
        }
        if ("data-title-page" === name) {
            this.titlePage.innerText = this.i18nService.getMessage(newValue);
        }
        if ("data-prev-route" === name) {
            this.prevRoute = newValue;
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
}

customElements.define("app-icon", IconComponent);

"use strict";

const selectModeLayout = document.createElement("template");

selectModeLayout.innerHTML = `\n\t<input type="radio" name="modes" class="sc-select-mode__input">\n\t<label class="d-flex flex-column align-items-start gap-1 p-1 sc-select-mode__label btn btn-tertiary">\n\t\t<div class="d-flex align-items-center gap-2">\n\t\t\t<app-icon data-size="2rem"></app-icon>\n\t\t\t<span class="fs-5 text"></span>\n\t\t</div>\n\t\t<p class="fs-6 fw-normal m-0"></p>\n\t</label>\n`;

class SelectModeComponent extends HTMLElement {
    inputElement=null;
    iconElement=null;
    labelElement=null;
    textElement=null;
    descriptionElement=null;
    label="";
    i18nService;
    constructor() {
        super();
        this.label = this.dataset?.label || this.label;
        this.i18nService = new i18nService;
        this.appendChild(selectModeLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.inputElement = this.querySelector("input");
        this.labelElement = this.querySelector("label");
        this.iconElement = this.querySelector("app-icon");
        this.textElement = this.querySelector("div span");
<<<<<<< HEAD
        this.descriptionElement = this.querySelector("label > span");
        this.inputElement.id = this.dataset?.id || "";
        this.inputElement.name = this.dataset?.name || "";
        this.labelElement.setAttribute("for", this.dataset?.id || "");
        this.iconElement?.setAttribute("data-name", this.icon);
        this.textElement.innerText = this.label;
        this.descriptionElement.innerText = this.description;
=======
        this.descriptionElement = this.querySelector("label > p");
        this.inputElement.id = this.label;
        this.inputElement.value = this.label;
        this.labelElement.setAttribute("for", this.label);
        this.iconElement.dataset.name = this.label;
        this.textElement.innerText = this.i18nService.getMessage(`${this.label}Name`);
        this.descriptionElement.innerText = this.i18nService.getMessage(`${this.label}Description`);
>>>>>>> Ajout de la sélection de mode d'usage.
    }
}

customElements.define("app-select-mode", SelectModeComponent);

"use strict";

class routeService {
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
        this.currentRoute = this.PAGE_HOME;
    }
    initPages(root) {
        this.routes.forEach((route => {
            route.element = root.querySelector(route.selector);
        }));
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
