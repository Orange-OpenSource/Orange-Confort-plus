"use strict";
const template = document.createElement('template');
template.innerHTML = `
<style>
    .sc-confort-plus {
        border: none;
        background-color: #ff7900;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        position: fixed;
        top: 50%;
        right: 1rem;
        transform: translate(-50%, -50%);
        cursor: pointer;
    }
    .hidden {
        display: none;
        visibility: hidden;
    }
</style>
<button class="sc-confort-plus" id="confort"></button>
<app-toolbar class="hidden" id="toolbar" onmycustomevent="{handleCustomEvent}"></app-toolbar>
`;
class AppComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    openConfortPlus = false;
    confortPlusBtn = null;
    confortPlusToolbar = null;
    constructor() {
        super();
        this.shadow.appendChild(template.content.cloneNode(true));
        template.addEventListener('closeEvent', (event) => {
            if (event.detail) {
                this.openConfortPlus = !this.openConfortPlus;
                this.openConfortPlus ?
                    this.confortPlusToolbar?.classList.remove('hidden') :
                    this.confortPlusToolbar?.classList.add('hidden');
                this.openConfortPlus ?
                    this.confortPlusBtn?.classList.add('hidden') :
                    this.confortPlusBtn?.classList.remove('hidden');
            }
        });
    }
    connectedCallback() {
        this.confortPlusBtn = this.shadow.getElementById('confort');
        this.confortPlusToolbar = this.shadow.getElementById('toolbar');
        if (!this.confortPlusBtn || !this.confortPlusToolbar) {
            return;
        }
        this.confortPlusBtn.addEventListener('click', () => {
            this.openConfortPlus = !this.openConfortPlus;
            this.openConfortPlus ?
                this.confortPlusToolbar?.classList.remove('hidden') :
                this.confortPlusToolbar?.classList.add('hidden');
            this.openConfortPlus ?
                this.confortPlusBtn?.classList.add('hidden') :
                this.confortPlusBtn?.classList.remove('hidden');
        });
    }
    disconnectedCallback() {
        this.confortPlusBtn?.removeEventListener('click', () => {
        });
        this.confortPlusToolbar?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-root', AppComponent);
const appRootElt = document.createElement('app-root');
document.body.prepend(appRootElt);
"use strict";
const tmplLayout = document.createElement('template');
tmplLayout.innerHTML = `
    <style>
        :host {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
        .c-btn-tool {
            display: flex;
            align-items: center;
            width: 100%;
            padding: .5rem;
        }
        .c-btn-tool__picto {
            background: #ff7900;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1rem;
            height: 1rem;
            margin-right: .75rem;
        }
        .c-btn-tool:first-child {
            margin-right: .75rem;
        }
        .c-btn-tool__label {
            text-align: left;
            flex: 1;
        }

        .c-tool__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: .5rem;
        }

        button {
            border-radius: .5rem;
            border: none;
            cursor: pointer;
        }
        .hidden {
            display: flex;
            visibility: hidden;
            height: 0;
            margin-right: 0;
            padding: 0;
        }
    </style>
    <button class="c-btn-tool" id="tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label">Agencement</span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="tool-content">
        En cours ...
    </div>
`;
class LayoutComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    toolBtn = null;
    open = false;
    constructor() {
        super();
        this.shadow.appendChild(tmplLayout.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.shadow.getElementById('tool-btn');
        const contentElt = this.shadow.getElementById('tool-content');
        this.toolBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove('hidden');
            }
            else {
                contentElt?.classList.add('hidden');
            }
        });
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-layout', LayoutComponent);
"use strict";
const tmplPictureVideo = document.createElement('template');
tmplPictureVideo.innerHTML = `
    <style>
        :host {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
        .c-btn-tool {
            display: flex;
            align-items: center;
            width: 100%;
            padding: .5rem;
        }
        .c-btn-tool__picto {
            background: #ff7900;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1rem;
            height: 1rem;
            margin-right: .75rem;
        }
        .c-btn-tool:first-child {
            margin-right: .75rem;
        }
        .c-btn-tool__label {
            text-align: left;
            flex: 1;
        }

        .c-tool__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: .5rem;
        }

        button {
            border-radius: .5rem;
            border: none;
            cursor: pointer;
        }
        .hidden {
            display: flex;
            visibility: hidden;
            height: 0;
            margin-right: 0;
            padding: 0;
        }
    </style>
    <button class="c-btn-tool" id="tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label">Image et Vidéo</span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="tool-content">
        En cours ...
    </div>
`;
class PictureVideoComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    toolBtn = null;
    open = false;
    constructor() {
        super();
        this.shadow.appendChild(tmplPictureVideo.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.shadow.getElementById('tool-btn');
        const contentElt = this.shadow.getElementById('tool-content');
        this.toolBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove('hidden');
            }
            else {
                contentElt?.classList.add('hidden');
            }
        });
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-picture-video', PictureVideoComponent);
"use strict";
const tmplPointer = document.createElement('template');
tmplPointer.innerHTML = `
    <style>
        :host {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
        .c-btn-tool {
            display: flex;
            align-items: center;
            width: 100%;
            padding: .5rem;
        }
        .c-btn-tool__picto {
            background: #ff7900;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1rem;
            height: 1rem;
            margin-right: .75rem;
        }
        .c-btn-tool:first-child {
            margin-right: .75rem;
        }
        .c-btn-tool__label {
            text-align: left;
            flex: 1;
        }

        .c-tool__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: .5rem;
        }

        button {
            border-radius: .5rem;
            border: none;
            cursor: pointer;
        }
        .hidden {
            display: flex;
            visibility: hidden;
            height: 0;
            margin-right: 0;
            padding: 0;
        }
    </style>
    <button class="c-btn-tool" id="tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label">Pointeur</span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="tool-content">
        En cours ...
    </div>
`;
class PointerComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    toolBtn = null;
    open = false;
    constructor() {
        super();
        this.shadow.appendChild(tmplPointer.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.shadow.getElementById('tool-btn');
        const contentElt = this.shadow.getElementById('tool-content');
        this.toolBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove('hidden');
            }
            else {
                contentElt?.classList.add('hidden');
            }
        });
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-pointer', PointerComponent);
"use strict";
const tmplSound = document.createElement('template');
tmplSound.innerHTML = `
    <style>
        :host {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
        .c-btn-tool {
            display: flex;
            align-items: center;
            width: 100%;
            padding: .5rem;
        }
        .c-btn-tool__picto {
            background: #ff7900;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1rem;
            height: 1rem;
            margin-right: .75rem;
        }
        .c-btn-tool:first-child {
            margin-right: .75rem;
        }
        .c-btn-tool__label {
            text-align: left;
            flex: 1;
        }

        .c-tool__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: .5rem;
        }

        button {
            border-radius: .5rem;
            border: none;
            cursor: pointer;
        }
        .hidden {
            display: flex;
            visibility: hidden;
            height: 0;
            margin-right: 0;
            padding: 0;
        }
    </style>
    <button class="c-btn-tool" id="tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label">Audio</span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="tool-content">
        En cours ...
    </div>
`;
class SoundComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    toolBtn = null;
    open = false;
    constructor() {
        super();
        this.shadow.appendChild(tmplSound.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.shadow.getElementById('tool-btn');
        const contentElt = this.shadow.getElementById('tool-content');
        this.toolBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove('hidden');
            }
            else {
                contentElt?.classList.add('hidden');
            }
        });
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-sound', SoundComponent);
"use strict";
const tmplFontFamily = document.createElement('template');
tmplFontFamily.innerHTML = `
<style>
    :host {
        margin-bottom: 1rem;
    }
</style>
<button id="normal-font">Normal</button>
<button id="arial-font">Arial</button>
<button id="open-font-font">Open Sans</button>
<button id="accessible-dfa-font">Accessible-DFA</button>
<button id="open-dyslexic-font">Open Dyslexic</button>
`;
class FontFamilyComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    normalBtn = null;
    arialBtn = null;
    openSansBtn = null;
    accessibleDFABtn = null;
    openDyslexicBtn = null;
    constructor() {
        super();
        this.shadow.appendChild(tmplFontFamily.content.cloneNode(true));
        let head = document.head || document.getElementsByTagName('head')[0];
        let styles = document.createElement('style');
        head.appendChild(styles);
        styles.innerHTML = '@font-face{font-family:"Accessible-DFA";src:url("./assets/fonts/AccessibleDfA-Regular.woff2");font-display:swap}@font-face{font-family:"Open-Dyslexic";src:url("./assets/fonts/OpenDyslexic-Regular.woff2");font-display:swap}@font-face{font-family:"Open-Sans";src:url("./assets/fonts/OpenSans-Regular.woff2");font-display:swap}';
        this.normalBtn = this.shadow.getElementById('normal-font');
        this.arialBtn = this.shadow.getElementById('arial-font');
        this.openSansBtn = this.shadow.getElementById('open-font-font');
        this.accessibleDFABtn = this.shadow.getElementById('accessible-dfa-font');
        this.openDyslexicBtn = this.shadow.getElementById('open-dyslexic-font');
    }
    connectedCallback() {
        const bodyElt = document.getElementsByTagName('body')[0];
        this.normalBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = ``;
        });
        this.arialBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `arial`;
        });
        this.openSansBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Open-Sans`;
        });
        this.accessibleDFABtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Accessible-DFA`;
        });
        this.openDyslexicBtn?.addEventListener('click', () => {
            bodyElt.style.fontFamily = `Open-Dyslexic`;
        });
    }
    disconnectedCallback() {
        this.normalBtn?.removeEventListener('click', () => {
        });
        this.arialBtn?.removeEventListener('click', () => {
        });
        this.openSansBtn?.removeEventListener('click', () => {
        });
        this.accessibleDFABtn?.removeEventListener('click', () => {
        });
        this.openDyslexicBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-font-family', FontFamilyComponent);
"use strict";
const tmplIncreaseTextSize = document.createElement('template');
tmplIncreaseTextSize.innerHTML = `
    <style>
        :host {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }
        .sc-increase-text-size__btn-size {
            background: #ff7900;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 5rem;
            height: 5rem;
            margin-right: 1rem;
        }

        .sc-increase-text-size__btn-slots {
            display: flex;
            margin-top: 1rem;
        }
        .sc-increase-text-size__btn-slot {
            background: #FFBE85;
            border-radius: 50%;
            width: .5rem;
            height: .5rem;
            margin-right: .25rem;
        }
        .sc-increase-text-size__btn-slot:last-child {
            margin-right: 0;
        }
        .selected {
            background: black;
        }

        .sc-increase-text-size__size-info {
            font-weight: 700;
            background: #ff7900;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 5rem;
            padding: 1rem 2rem 1rem 1rem;
            clip-path: polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);
        }

        button {
            border-radius: .5rem;
            border: none;
            cursor: pointer;
        }
    </style>
    <button class="sc-increase-text-size__btn-size" id="btn-size">
        <span>Taille</span>
        <div class="sc-increase-text-size__btn-slots" id="btn-content-slots"></div>
    </button>
    <div class="sc-increase-text-size__size-info" id="content-size-info"></div>
`;
class IncreaseTextSizeComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    toolBtn = null;
    sizeBtn = null;
    index = 0;
    fontSizes = [16, 18, 20, 22, 24];
    constructor() {
        super();
        this.shadow.appendChild(tmplIncreaseTextSize.content.cloneNode(true));
    }
    connectedCallback() {
        const bodyElt = document.getElementsByTagName('body')[0];
        const sizeInfoElt = this.shadow.getElementById('content-size-info');
        this.sizeBtn = this.shadow.getElementById('btn-size');
        if (!sizeInfoElt) {
            return;
        }
        // @ts-ignore
        const btnContentSlots = this.shadow.getElementById('btn-content-slots');
        let slot = '';
        this.fontSizes.forEach((size, index) => {
            let div = '<div class="sc-increase-text-size__btn-slot"></div>';
            if (index === this.index) {
                div = '<div class="sc-increase-text-size__btn-slot selected"></div>';
            }
            slot = `${slot}${div}`;
        });
        btnContentSlots.innerHTML = slot;
        sizeInfoElt.innerHTML = `${this.fontSizes[this.index]}`;
        this.sizeBtn?.addEventListener('click', () => {
            this.index++;
            if (this.index >= this.fontSizes.length) {
                this.index = 0;
            }
            slot = '';
            this.fontSizes.forEach((size, index) => {
                let div = '<div class="sc-increase-text-size__btn-slot"></div>';
                if (index === this.index) {
                    div = '<div class="sc-increase-text-size__btn-slot selected"></div>';
                }
                slot = `${slot}${div}`;
            });
            btnContentSlots.innerHTML = slot;
            bodyElt.style.fontSize = `${this.fontSizes[this.index]}px`;
            sizeInfoElt.innerHTML = `${this.fontSizes[this.index]}`;
        });
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener('click', () => {
        });
        this.sizeBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-increase-text-size', IncreaseTextSizeComponent);
"use strict";
const tmplReadingGuide = document.createElement('template');
tmplReadingGuide.innerHTML = `
<style>
    :host {
        margin-bottom: 1rem;
    }
    .c-reading-guide {
        background: rgba(0, 0, 0, .5);
        position: fixed;
        left: 0;
        right: 0;
        z-index: 99999;
    }
    .c-reading-guide--top {
        top: 0;
    }
    .c-reading-guide--bottom {
        bottom: 0;
    }
    .c-reading-guide__close-msg {
        color: white;
        font-weight: 700;
        padding: 1rem;
        position: absolute;
        right: 0;
        bottom: 0;
    }
    .c-reading-guide__close-btn {
        width: 80px;
        height: 80px;
        position: absolute;
        right: 0;
        bottom: -80px;
    }
</style>
<button id="reading-guide-btn">Guide de lecture</button>
<div id="top-guide-elt" class="c-reading-guide c-reading-guide--top">
    <span class="c-reading-guide__close-msg">Fermeture du masque: touche Echape</span>
    <button id="close-btn" class="c-reading-guide__close-btn">Close</button>
</div>
<div id="bottom-guide-elt" class="c-reading-guide c-reading-guide--bottom"></div>
`;
class ReadingGuideComponent extends HTMLElement {
    open = false;
    sizeGuide = 40;
    shadow = this.attachShadow({ mode: 'open' });
    topGuideElt = null;
    bottomGuideElt = null;
    activeGuideBtn = null;
    closeBtn = null;
    constructor() {
        super();
        this.shadow.appendChild(tmplReadingGuide.content.cloneNode(true));
        this.activeGuideBtn = this.shadow.getElementById('reading-guide-btn');
        this.topGuideElt = this.shadow.getElementById('top-guide-elt');
        this.bottomGuideElt = this.shadow.getElementById('bottom-guide-elt');
        this.closeBtn = this.shadow.getElementById('close-btn');
        if (this.topGuideElt && this.bottomGuideElt) {
            this.topGuideElt.style.display = 'none';
            this.bottomGuideElt.style.display = 'none';
        }
    }
    connectedCallback() {
        this.activeGuideBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (!this.open) {
                this.resetReadingGuide();
                return;
            }
            if (this.topGuideElt && this.bottomGuideElt) {
                this.topGuideElt.style.removeProperty('display');
                this.bottomGuideElt.style.removeProperty('display');
            }
        });
        this.closeBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (!this.open) {
                this.resetReadingGuide();
            }
        });
        document.onkeydown = (event) => {
            if (event.code === 'Escape') {
                this.open = !this.open;
                this.resetReadingGuide();
            }
        };
        document.addEventListener('mousemove', (event) => {
            if (this.open && this.topGuideElt && this.bottomGuideElt) {
                this.topGuideElt.style.height = `${event.y - this.sizeGuide}px`;
                this.bottomGuideElt.style.height = `${window.innerHeight - event.y - this.sizeGuide}px`;
            }
            event.stopPropagation();
        });
    }
    disconnectedCallback() {
        this.closeBtn?.removeEventListener('click', () => {
        });
    }
    resetReadingGuide() {
        if (this.topGuideElt && this.bottomGuideElt) {
            this.topGuideElt.style.display = 'none';
            this.bottomGuideElt.style.display = 'none';
            this.topGuideElt.style.removeProperty('height');
            this.bottomGuideElt.style.removeProperty('height');
        }
    }
}
customElements.define('app-reading-guide', ReadingGuideComponent);
"use strict";
const tmplTextTransform = document.createElement('template');
tmplTextTransform.innerHTML = `
<style>
    :host {
        margin-bottom: 1rem;
    }
</style>
<button id="normal-btn">Normal</button>
<button id="first-letter-btn">Première lettre</button>
<button id="lowercase-btn">Minuscule</button>
<button id="uppercase-btn">Majuscule</button>
`;
class TextTransformComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    normalBtn = null;
    firstLetterBtn = null;
    lowercaseBtn = null;
    uppercaseBtn = null;
    constructor() {
        super();
        this.shadow.appendChild(tmplTextTransform.content.cloneNode(true));
        this.normalBtn = this.shadow.getElementById('normal-btn');
        this.firstLetterBtn = this.shadow.getElementById('first-letter-btn');
        this.lowercaseBtn = this.shadow.getElementById('lowercase-btn');
        this.uppercaseBtn = this.shadow.getElementById('uppercase-btn');
    }
    connectedCallback() {
        const bodyElt = document.getElementsByTagName('body')[0];
        this.normalBtn?.addEventListener('click', () => {
            bodyElt.style.textTransform = ``;
        });
        this.firstLetterBtn?.addEventListener('click', () => {
            bodyElt.style.textTransform = `capitalize`;
        });
        this.lowercaseBtn?.addEventListener('click', () => {
            bodyElt.style.textTransform = `lowercase`;
        });
        this.uppercaseBtn?.addEventListener('click', () => {
            bodyElt.style.textTransform = `uppercase`;
        });
    }
    disconnectedCallback() {
        this.normalBtn?.removeEventListener('click', () => {
        });
        this.firstLetterBtn?.removeEventListener('click', () => {
        });
        this.lowercaseBtn?.removeEventListener('click', () => {
        });
        this.uppercaseBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-text-transform', TextTransformComponent);
"use strict";
const tmplText = document.createElement('template');
tmplText.innerHTML = `
    <style>
        :host {
            font-size: 1rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .75rem;
        }
        .c-btn-tool {
            display: flex;
            align-items: center;
            width: 100%;
            padding: .5rem;
        }
        .c-btn-tool__picto {
            background: #ff7900;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1rem;
            height: 1rem;
            margin-right: .75rem;
        }
        .c-btn-tool:first-child {
            margin-right: .75rem;
        }
        .c-btn-tool__label {
            text-align: left;
            flex: 1;
        }

        .c-tool__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: .5rem;
        }

        button {
            border-radius: .5rem;
            border: none;
            cursor: pointer;
        }
        .hidden {
            display: flex;
            visibility: hidden;
            height: 0;
            margin-right: 0;
            padding: 0;
        }
    </style>
    <button class="c-btn-tool" id="tool-btn">
        <div class="c-btn-tool__picto"></div>
        <span class="c-btn-tool__label">Texte</span>
        <div class="c-btn-tool__picto"></div>
    </button>
    <div class="c-tool__content hidden" id="tool-content">
        <app-increase-text-size></app-increase-text-size>
        <app-text-transform></app-text-transform>
        <app-font-family></app-font-family>
        <app-reading-guide></app-reading-guide>
    </div>
`;
class TextComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    toolBtn = null;
    open = false;
    constructor() {
        super();
        this.shadow.appendChild(tmplText.content.cloneNode(true));
    }
    connectedCallback() {
        this.toolBtn = this.shadow.getElementById('tool-btn');
        const contentElt = this.shadow.getElementById('tool-content');
        this.toolBtn?.addEventListener('click', () => {
            this.open = !this.open;
            if (this.open) {
                contentElt?.classList.remove('hidden');
            }
            else {
                contentElt?.classList.add('hidden');
            }
        });
    }
    disconnectedCallback() {
        this.toolBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-text', TextComponent);
"use strict";
const tmplToolbar = document.createElement('template');
tmplToolbar.innerHTML = `
<style>
    :host {
        color: black;
        background: white;
        box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
        display: grid;
        grid-template-rows: 4rem 7rem 1fr;
        width: 19.5vw;
        height: 100vh;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 999;
    }
    .sc-toolbar__header,
    .sc-toolbar__header-infos {
        color: white;
        background: black;
        display: flex;
        align-items: center;
        padding: 0 1rem;
    }
    .sc-toolbar__logo {
        margin-right: 1rem;
    }
    .sc-toolbar__title {
        font-size: 1.5rem;
        font-weight: 700;
        flex: 1;
    }
    .sc-toolbar__btn {
        color: white;
        font-weight: 700;
        background: black;
        border: 1px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        margin-left: 1rem;
        cursor: pointer;
    }
    .sc-toolbar__btn:hover {
        color: black;
        background: #ff7900;
        border: 1px solid #ff7900;
    }

    .sc-toolbar__close {
        color: black;
        background: #ff7900;
        border: 1px solid #ff7900;
    }

    .sc-toolbar__infos-picto {
        background: white;
        border-radius: 50%;
        width: 5rem;
        height: 5rem;
        margin-right: 1rem;
    }
    .sc-toolbar__infos-libelles {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .sc-toolbar__infos-mode {
        color: #ff7900;
        font-weight: 700;
        font-size: 1.25rem;
    }
    .sc-toolbar__infos-tools {
        display: flex;
    }

    .sc-toolbar__content {
        display: flex;
        flex-direction: column;
        padding: 1rem;
    }
</style>
<section class="sc-toolbar__header">
    <span class="sc-toolbar__title">Confort+</span>
    <button id="close-toolbar" class="sc-toolbar__btn"> -> </button>
    <button id="close-toolbar" class="sc-toolbar__btn sc-toolbar__close"> >> </button>
</section>
<section class="sc-toolbar__header-infos">
    <div class="sc-toolbar__infos-picto"></div>
    <div class="sc-toolbar__infos-libelles">
        <span>Mode d'usage</span>
        <span class="sc-toolbar__infos-mode">Vision +</span>
    </div>
    <div class="sc-toolbar__infos-tools">
        <button id="close-toolbar" class="sc-toolbar__btn"> O </button>
        <button id="close-toolbar" class="sc-toolbar__btn"> [] </button>
    </div>
</section>

<section class="sc-toolbar__content">
    <app-text></app-text>
    <app-layout></app-layout>
    <app-picture-video></app-picture-video>
    <app-sound></app-sound>
    <app-pointer></app-pointer>
</section>
`;
class ToolbarComponent extends HTMLElement {
    shadow = this.attachShadow({ mode: 'open' });
    closeBtn = null;
    constructor() {
        super();
        this.shadow.appendChild(tmplToolbar.content.cloneNode(true));
    }
    connectedCallback() {
        this.closeBtn = this.shadow.getElementById('close-toolbar');
        this.closeBtn?.addEventListener('click', () => {
            let clickEvent = new CustomEvent('closeEvent', { detail: true });
            // @ts-ignore
            template.dispatchEvent(clickEvent);
        });
    }
    disconnectedCallback() {
        this.closeBtn?.removeEventListener('click', () => {
        });
    }
}
customElements.define('app-toolbar', ToolbarComponent);