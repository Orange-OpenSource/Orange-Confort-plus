"use strict";
// @ts-nocheck
const toolbar = document.querySelector('app-root');
if (toolbar) {
    // Pause settings if they're active
    const pauseBtn = toolbar.shadowRoot.getElementById('pause-btn');
    if (pauseBtn) {
        const isActive = pauseBtn.querySelector('[data-name="Pause"]') !== null;
        if (isActive)
            pauseBtn.click();
    }
    // Remove toolbar
    toolbar.remove();
}
"EOF";
