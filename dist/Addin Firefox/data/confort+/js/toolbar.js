/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014 - 2017  Orange SA

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/*global window */
/*global document: false */
/* global alert */
function LoopingMenu() {
	// attribut
    // private
    /**
     * {LoopingMenu} Internal reference to this object instance
     * @private
     */
    var that = this;
    /**
     * {int} Current display position of the menu
     * @privatent.createElement("ul");

     menuContainer.appe
     */
    var position;
    /**
     * {Array} Items collection to display
     * @private
     */
    var items;
    /**
     * {DivHTMLTag} Html tag &lt;div&gt; containing the menu
     * @private
     */
    var menuContainer;
    /**
     * {H2HTMLTag} Html tag &lt;h2&gt; containing the title
     * @private
     */
    var menuTitle;
    /**
     * {UlHTMLTag} Html tag &lt;ul&gt; containing the items collection
     * @private
     */
    var menuList;

    // public
    /**
     * {int} Define menu position to center screen
     */
    this.CENTER = 1;
    /**
     * {int} Define menu position to be next to the selected item
     */
    this.NEXT_TO = 2;
    /*  */

// method
    // private
    /**
     * Initialisation of the items collection and creation of the menu html structure.
     * @private
     */
    /**
     * Create the menu html structure and set its default rendering
     * @private
     */
    var createMenu = function () {
        if (!document.getElementById("loopingBar")) {
            // Create the structure
            menuContainer = document.createElement("div");
            menuContainer.setAttribute("id", "loopingBar");
            menuTitle = document.createElement("h2");
            menuTitle.setAttribute("style", "display:none;");
            menuList = document.createElement("ul");
            menuContainer.appendChild(menuTitle);
            menuContainer.appendChild(menuList);

            document.getElementsByTagName("body")[0].appendChild(menuContainer);

            // Define default rendering
            that.setPosition(LoopingMenuPosition.CENTER);
            that.hide();
        }
    };

    var init = function () {
        createMenu();
        items = [];
    };

    /**
     * Set the menu rendering to display in the center of the screen
     * @private
     */
    var setCenter = function () {
        var decalage = 0;       /* Offset of the viewport from the top of the page */
        var windowWidth = 0;    /* Width of the viewport */
        var windowHeight = 0;   /* Height of the viewport */
        var top = 0;            /* Top position of the menu */
        var left = 0;           /* Left position of the menu */

        // Get the screen center
        if (window.innerWidth) {
            // Client viewport under common browser
            decalage = window.pageYOffset;
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        } else if ( document.documentElement !== 'undefined' && document.documentElement.clientWidth !== 'undefined'
            && document.documentElement.clientWidth !== 0) {
            decalage = document.documentElement.scrollTop;
            windowWidth = document.documentElement.clientWidth, windowHeight = document.documentElement.clientHeight
        }
        // and for older IE ...
        else {
            decalage = document.body.scrollTop;
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        top = (windowHeight-menuContainer.offsetHeight)/2;
        left = (windowWidth-menuContainer.offsetWidth)/2;

        menuContainer.style.top = (top+decalage)+"px";
        menuContainer.style.left = (left)+"px";
    }

    /**
     * Set the menu rendering to display next to the selected item.
     * @private
     */
    var setNextTo = function() {
        var left=0;				/* Left position of the menu */
        var top =0;				/* Top position of the menu */
        var currentItem;		/* Local reference to the selected item */
        var currentItemWidth;	/* Width of the selected item */
        var currentItemHeight;	/* Height of the selected item */
        var currentItemTop;		/* Top position of the selected item */
        var currentItemLeft;	/* Left position of the selected item */

        // Getting the screen viewport
        var decalage = 0;		/* Offset of the viewport from the top of the page */
        var delta;				/* Used to determine if the menu could be render under the selected item */
        var windowWidth = 0;    /* Width of the viewport */
        var windowHeight = 0;   /* Height of the viewport */
        if (window.innerWidth) {
            // Client viewport under : common browser
            decalage = window.pageYOffset;
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
        } // For IE..
        else if (typeof document.documentElement !== 'undefined'
            && typeof document.documentElement.clientWidth !== 'undefined'
            && document.documentElement.clientWidth !== 0)
        {
            decalage = document.documentElement.scrollTop;
            windowWidth = document.documentElement.clientWidth,
                windowHeight = document.documentElement.clientHeight;
        }
        // and for older IE ...
        else {
            decalage = document.body.scrollTop;
            windowWidth = document.body.clientWidth;
            windowHeight = document.body.clientHeight;
        }

        // Getting selected item top,left,height and width
        if(LoopingUtility.getFocusedElement()<0) {
            return setCenter();
        }
        currentItem = LoopingUtility.getFocusedElement();
        currentItemWidth = currentItem.offsetWidth;
        currentItemTop = 0;
        currentItemLeft = 0;
        do {
            currentItemTop += currentItem.offsetTop;
            currentItemLeft += currentItem.offsetLeft;
        }
        while(currentItem = currentItem.offsetParent);

        // Horizontal positionning tool-bar next to the selected item
        if((currentItemLeft+currentItemWidth+menuContainer.offsetWidth) < windowWidth) {
            left = (currentItemLeft+currentItemWidth+10);
        }
        else {
            left = ((currentItemLeft+currentItemWidth+menuContainer.offsetWidth)-windowWidth);
        }

        // Vertical positionning tool-bar next to the selected item
        delta = ((decalage+windowHeight)-(currentItemTop+menuContainer.offsetHeight));
        /* Fixed menu height for correct implementation */
        if(currentItemTop > (decalage+10) && delta > 0) {
            top = currentItemTop;
        }
        else if(currentItemTop <= (decalage+10)) {
            top = (decalage+10);
        }
        else {
            top = (decalage+windowHeight-menuContainer.offsetHeight-10);
        }

        // Affecting position
        menuContainer.style.top = top+"px";
        menuContainer.style.left = left+"px";
    };

    var getMenuTitle = function() {
        return menuTitle;
    };

    // public
    /**
     * Set the position where to display the menu
     * @param {int} pos, the menu position of the screen. Could be to the center or next to the item
     */
    this.setPosition = function (pos) {
        // Check if specified position exist
        if(pos === LoopingMenuPosition.CENTER || pos === LoopingMenuPosition.NEXT_TO) {
            position = pos;
            //Delegate the rendering to the right internal method
            if(position === LoopingMenuPosition.CENTER) {
                setCenter();
            }
            if(position === LoopingMenuPosition.NEXT_TO) {
                setNextTo();
            }
        }
    };

    /**
     * Check if the current rendering position is in the center of the screen
     * @return {Boolean} true if the current rendering position is set to center, or false either
     */
    this.isCenter = function() {
        if(position === LoopingMenuPosition.CENTER) {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * Check if the current rendering position is next to the selected item
     * @return {Boolean} true if the current rendering position is set to center, or false either
     */
    this.isNextTo = function() {
        if(position === LoopingMenuPosition.NEXT_TO) {
            return true;
        }
        else {
            return false;
        }
    };

    /**
     * Check if the menu is shown on the screen
     * @return {Boolean} true if the menu is currently shown, false either.
     */
    this.isShown = function() {
        if(menuContainer.className.match(/cdu_displayN/i)){
            return false;
        }
        else {
            return true;
        }
    };

    /**
     * Display the menu
     */
    this.show = function() {
        menuContainer.className="uciShow";
        if(that.isCenter()) {
            setCenter();
        } else if (that.isNextTo()) {
            setNextTo();
        }
    };

    /**
     * Hide the menu
     */
    this.hide = function() {
        menuContainer.className="cdu_displayN";
    };

    /**
     * Add an item to the menu
     * @param {String} name, the string to display in the menu
     * @param {Function} callback, the function to call on item activation
     * @param {String} id, the desired id for the menu item
     */
    this.addItem = function(/* String */name, /* function */callback, /* String */id, /* boolean */ defaut) {
        var link = document.createElement("a");
        var item = document.createElement("li");
        // Create Text
        var text = null;
        if(defaut) {
            text = document.createElement("strong");
            text.appendChild(document.createTextNode(name));
        }
        else {
            text = document.createTextNode(name);
        }
        // Create link
        link.appendChild(text);
        link.setAttribute("href","#");
        link.onclick = callback;
        if ( id !== null){
            link.id = id;
        }
        item.appendChild(link);
        menuList.appendChild(item);
        // Save item reference
        items.push([name,link]);
    };

    /**
     * Remove the specified item from the menu
     * @param {String} name, the item's name
     */
    this.removeItem = function(/* String */name) {
        //Parsing items collection
        for(var i=0; i<items.length; i++) {
            if(items[i][0] === name) {
                //Remove from HTML structure and collection
                menuList.removeChild(items[i][1].parentNode);
                return items.splice(i,i);
            }
        }
    };

    /**
     * Remove all items
     */
    this.clean = function() {
        while(items.length > 0) {
            menuList.removeChild(items[0][1].parentNode);
            items.shift();
        }
    };

    /**
     * Set the menu title
     * @param {String} title, the menu title
     */
    this.setTitle = function(title) {
        // If the has been already be specified, remove it
        if(getMenuTitle().hasChildNodes()){
            getMenuTitle().removeChild(getMenuTitle().firstChild);
        }
        // Set the new one
        getMenuTitle().removeAttribute("style");
        getMenuTitle().appendChild(document.createTextNode(title));
    };

    /**
     * Get the current menu title
     * @return {String} title, the menu title. If it has not been defined, return an empty string
     */
    this.getTitle = function() {
        return menuTitle.textContent;
    };

    /**
     * Get the menu items collection
     * @return {Array} menuItems, the collection of html tag <a> assiociated to items
     */
    this.getItems = function() {
        var menuItems = [];
        for(var i=0; i<items.length; i++) {
            menuItems.push(items[i][1]);
        }
        return menuItems;
    };

    /**
     * Get the current selected item in the menu
     * @return {AHtmlTag} link, the current focused html tag <a> in the menu
     */
    this.getSelectedItem = function() {
        for(var i=0; items.length; i++) {
            if(items[i][1].className.match(/a11y-focused/)) {
                return items[i][1];
            }
        }
    };

    /**
     * Get the current position in the menu of the specified item
     * @param {AHtmlTag} elt a HTML tag <a> in the menu
     * @return {int} pos its position in the menu
     */
    this.getItemIndex = function(elt) {
        for(var i=0; items.length; i++) {
            if(items[i][1] === elt) {
                return i;
            }
        }
    };

    /**
     * Get the menu HTML tag used as container
     * @return {DivHtmlNode} container, the menu container
     */
    this.getContainer = function() {
        return menuContainer;
    };

// Constructor
    init();
}

/**
 * Looping Menu position definition
 * @class General definition of menu position
 */
var LoopingMenuPosition = {
    /**
     * Define menu position to center screen
     * @field
     * @type {int}
     */
    CENTER: 1,
    /**
     * Define menu position to be next to the selected item
     * @field
     * @type {int}
     */
    NEXT_TO: 2
};
/**
 * Allow navigation with a single touch
 * @class Manager of the remote control
 */
function LoopingMode() {
	// attribut
    // private
    /**
     * Local reference to this object
     * @private
     */
    var that = this;
    /**
     * Reference Looping menu Manage manager
     * @see {LoopingMenu}
     * @private
     */
    var menu = null;
    /**
     * Value of the step for quick mode
     * @private
     */
    var quickStep = 5;
    /**
     * Value of the step by default
     * @private
     */
    var defaultStep = 1;
    /**
     * Flag to know if looping mode is enable or not
     * @private
     */
    var isMenuEnabled = 1;

    // public
// method
    // private
    /**
     * Initialisation of the object instance.
     * Creation of the menu, registration of trigger
     * and setting default value.
     * @private
     */
    var init = function() {
        // Creating Looping Menu
        menu = new LoopingMenu();
        // Setting default value
        LoopingUtility.step = 1;
        // Registering trigger
        that.registerTrigger();
        LoopingUtility.registerFocusedHandler();
    };

    // Looping menu items definition
    // --> Looping Filter methods for Menu item
    /**
     * Check if the specified element is a looping menu item
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterMenu = function(elt) {
        if(elt.nodeName.match(/^A$/gi) &&
            LoopingUtility.isMenuItem(elt) ) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to call on focusing a Looping menu item
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusMenu = function(elt) {
        elt.className="a11y-focused "+elt.className;
        elt.focus();
    };
    /**
     * Function to call on bluring a Looping menu item
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurMenu = function(elt) {
        elt.className = elt.className.replace(/a11y-focused {0,1}/,"");
    };

    // --> Looping Filter methods for html tag <a> and <area>
    /**
     * Check if the specified element is an elligible link
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterLink = function(elt) {
        if(elt.nodeName.match(/^A|AREA$/gi) && !LoopingUtility.isMenuItem(elt)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to call on focusing an elligible link
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusLink = function(elt) {
        elt.className="loopingmode-focused "+elt.className;
        elt.focus();
    };
    /**
     * Function to call on bluring an elligible link
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurLink = function(elt) {
        elt.className = elt.className.replace(/loopingmode-focused {0,1}/,"");
    };

    // --> Looping Filter methods for form element
    /**
     * Check if the specified element is an elligible form element
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterForm = function(elt) {
        if(elt.nodeName.match(/^TEXTAREA|SELECT|BUTTON/gi)) {
            return true;
        }
        else if(elt.nodeName.match(/^INPUT/gi) &&
            elt.disabled !== true &&
            ((elt.getAttribute("type")!== null && !elt.getAttribute("type").match(/hidden/)) || (elt.getAttribute("type")=== null))) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Function to call on focusing an elligible form element
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusForm = function(elt) {
        var lab = null;
        // Check if a label is associated to the form element
        if(elt.getAttribute("id") !== null) {
            var labels = document.getElementsByTagName("label");
            for(var i=0; i<labels.length; i++) {
                if(labels[i].htmlFor === elt.id) {
                    lab = labels[i];
                }
            }
        }
        // Style the label (if exists) and form element
        if(lab !== null) {
            lab.className = "loopingmode-focused "+lab.className;
        }
        elt.className="loopingmode-focused "+elt.className;
        elt.focus();
    };
    /**
     * Function to call on bluring a elligible form element
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurForm = function(elt) {
        var lab = null;
        // Check if a label is associated to the form element
        if(elt.getAttribute("id") !== null) {
            var labels = document.getElementsByTagName("label");
            for(var i=0; i<labels.length; i++) {
                if(labels[i].htmlFor === elt.id) {
                    lab = labels[i];
                }
            }
        }
        // Remove the style of the label (if exists) and form element
        if(lab !== null) {
            lab.className = lab.className.replace(/loopingmode-focused {0,1}/,"");
        }
        elt.className = elt.className.replace(/loopingmode-focused {0,1}/,"");
    };

    // --> Looping Filter methods for mouse clickable element
    /**
     * Check if the specified element is activable by mouse
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterOnclick = function(elt) {
        if(elt.onclick && elt.onclick !== null && !LoopingUtility.isMenuItem(elt))
            return true;
        else return false;
    };
    /**
     * Function to call on focusing a elligible mouse clickable element
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusOnclick = function(elt) {
        elt.className="loopingmode-focused "+elt.className;
        elt.focus();
    };
    /**
     * Function to call on bluring a elligible mouse clickable element
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurOnclick = function(elt) {
        elt.className = elt.className.replace(/loopingmode-focused {0,1}/,"");
    };

    // --> Looping Filter for flash element
    /**
     * Check if the specified element is an elligible flash element
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterFlash = function(elt) {
        if(elt.nodeName.match(/^OBJECT|EMBED/gi)) {
            if (elt.type.match(/x-shockwave-flash/) && elt.hasConfortdelecture && (elt.hasConfortdelecture() === true)){
                return true;
            } else{
                return false;
            }
        } else {
            return false;
        }
    };
    /**
     * Function to call on focusing an elligible flash
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusFlash = function(elt) {
        LoopingUtility.hasToStop = true;
        elt.focus();
        elt.restartLoopingMode();
    };
    /**
     * Function to call on bluring an elligible flash
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurFlash = function(elt) {

    };

    // --> Looping Filter for global looping
    /**
     * Check if the specified element could be handled by a sub filter
     * @param {HTMLNode} elt : Element to be checked
     * @private
     */
    var filterGeneric = function(elt) {        
        if (elt.tabIndex && elt.tabIndex<0) {
            return false;
        }
        if(LoopingUtility.isVisible(elt)) {
            // Case of clickable elements
            if(filterOnclick(elt)){
                return true;
            }
            // Case of form element
            else if(filterForm(elt)){
                return true;
            }
            // Case of link
            else if(filterLink(elt)){
                return true;
            }
            // Case of flash element
            else if(filterFlash(elt)) {
                return true;
            } else {
                return false;
            }
        } else{
            return false;
        }
    };
    /**
     * Function to call on focusing a generic element
     * Delegate treatment to a sub callbackFocus method
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackFocusGeneric = function(elt) {
        // Case of Link
        if(filterLink(elt)) {
            callbackFocusLink(elt);
        } else if(filterOnclick(elt)){
            callbackFocusOnclick(elt);
        } else if(filterForm(elt)) {
            callbackFocusForm(elt);
        } else if(filterFlash(elt)){
            callbackFocusFlash(elt);
        }
    };
    /**
     * Function to call on bluring a generic element
     * Delegate treatement to a sub callbackBlur method
     * @param {HTMLNode} elt : Element to be processed
     * @private
     */
    var callbackBlurGeneric = function(elt) {
        // Case of link
        if(filterLink(elt)){
            callbackBlurLink(elt);
        }
        // Case of activable element
        else if(filterOnclick(elt)) {
            callbackBlurOnclick(elt);
        }
        // Case of form element
        else if(filterForm(elt)) {
            callbackBlurForm(elt);
        }
        // Case of flash element
        else if(filterFlash(elt)){
            callbackBlurFlash(elt);
        }
    };

    // Publics methods
    /**
     * Register trigger function for key pressed and key released.
     * Call back on key pressed (onkeypress event) just prevent default action
     * Call back on key released (onkeyup event) show the looping menu or activate the menu item
     * @return nothing
     */
    this.registerTrigger = function() {
        // Callback function for onkeyup event
        var keyUpFunc = function(/*Event*/ e) {
            if(!that.isMenuEnabled) return true;
            if(LoopingKey.keyPressed(e) === LoopingKey.ENTER || LoopingKey.keyPressed(e) === LoopingKey.SPACE) {
                // Prevent default action
                that.stopLoop();
                accessibilitytoolbar.stopEvt(e);
                if(!menu.isShown()) {
                    // Check DOM to append items to the menu before showing it
                    var hasLink, hasForm, hasOnclick, hasFlash = false;
                    var nbActivable = 0;
                    var domElts = document.getElementsByTagName("*");
                    for(var i=0; i<domElts.length; i++) {
                        // Check if DOM has links
                        if(filterLink(domElts[i])) {
                            hasLink = true;
                            nbActivable++;
                        }
                        // Check if DOM has form elements
                        if(filterForm(domElts[i])) {
                            hasForm = true;
                            nbActivable++;
                        }
                        // Check if DOM has activable elements
                        if(filterOnclick(domElts[i])) {
                            hasOnclick = true;
                            nbActivable++;
                        }
                        // Check if DOM has flashs
                        if(filterFlash(domElts[i])) {
                            hasFlash = true;
                            nbActivable++;
                        }
                    }
                    // Add items to the menu
                    if(LoopingUtility.getFocusedElement() !== -1 &&
                        (filterLink(LoopingUtility.getFocusedElement()) || filterForm(LoopingUtility.getFocusedElement()))) {
                        menu.addItem(that.getToolbar().get("uci_doClick"),that.doClick, "do_click", true);
                    }
                    if(hasLink || hasForm || hasOnclick || hasFlash) {
                        menu.addItem(that.getToolbar().get("uci_loopActivable"),that.startLoopGeneric, "activable_to_activable");
                        if(nbActivable > quickStep){
                            menu.addItem(that.getToolbar().get("uci_loopActivableQuick"),that.startFastLoopGeneric, "activable_to_activable_fast");
                        }
                        menu.addItem(that.getToolbar().get("uci_loopBackward"),that.startBackLoopGeneric, "activable_to_activable_backward");
                    }
                    menu.addItem(that.getToolbar().get("uci_stopLoop"),that.stopLoop, "stop_loop");
                    // Show the menu
                    menu.show();
                    // And start looping on it
                    that.startLoopMenu();
                }
                else {
                    // Launch the action associated to the selected menu item
                    menu.getSelectedItem().onclick();
                    menu.hide();
                    menu.clean();
                }
                return false;
            }
            else {
                return true;
            }
        };
        // Call back function for onkeypress event
        var keyPressFunc = function(/*Event*/ e) {
            if(LoopingKey.keyPressed(e) === LoopingKey.ENTER || LoopingKey.keyPressed(e) === LoopingKey.SPACE) {
                accessibilitytoolbar.stopEvt(e);
                return false;
            }
        };
        // Call back function for onclick event
        var mouseClickFunc = function(/*Event*/ e) {
            // Launch the action associated to the clicked menu item
            that.stopLoop();
            menu.hide();
            menu.clean();
        };

        // Registering call back for W3C Browser
        if(document.addEventListener) {
            // onkeyup event
            document.addEventListener('keyup',keyUpFunc,true);
            // onkeypress event
            document.addEventListener('keydown',keyPressFunc,true);
            // Mouse click event
            menu.getContainer().addEventListener('click',mouseClickFunc,false);
        }
        // Registering call back for IE Browser
        else if(document.attachEvent) {
            // onkeyup event
            document.attachEvent('onkeyup',keyUpFunc);
            // onkeypress event
            document.attachEvent('onkeypress',keyPressFunc);
            // Mouse click event
            menu.getContainer().attachEvent('onclick',mouseClickFunc);
        }
        // Registering call back for older browser
        else {
            document.onkeyup = keyUpFunc;
            menu.getContainer().onclick = mouseClickFunc;
        }
        document.onkeypress = keyPressFunc;
    };
    /**
     * Start the loop over the looping menu item collection
     */
    this.startLoopMenu = function() {
        LoopingUtility.setCurrentSet(menu.getItems());
        LoopingUtility.setCurrentFilter(new LoopingFilter(filterMenu,callbackFocusMenu,callbackBlurMenu));
        LoopingUtility.hasToDouble(true);
        LoopingUtility.nextIndex = null;
        LoopingUtility.step = defaultStep;
        LoopingUtility.loopOver();
    };
    /**
     * Start the forward looping over the page elements collection
     */
    this.startLoopGeneric = function() {
        LoopingUtility.setCurrentSet(document.getElementsByTagName("*"));
        LoopingUtility.setCurrentFilter(new LoopingFilter(filterGeneric,callbackFocusGeneric,callbackBlurGeneric));
        LoopingUtility.hasToDouble(true);
        LoopingUtility.nextIndex = LoopingUtility.lastDOMIndex;
        LoopingUtility.step = defaultStep;
        LoopingUtility.loopOver();
    };
    /**
     * Start the backward looping over the page elements collection
     */
    this.startBackLoopGeneric = function() {
        LoopingUtility.setCurrentSet(document.getElementsByTagName("*"));
        LoopingUtility.setCurrentFilter(new LoopingFilter(filterGeneric,callbackFocusGeneric,callbackBlurGeneric));
        LoopingUtility.hasToDouble(true);
        LoopingUtility.nextIndex = LoopingUtility.lastDOMIndex;
        LoopingUtility.step = -defaultStep;
        LoopingUtility.loopOver();
    };
    /**
     * Start the forward fast looping over the page elements collection
     */
    this.startFastLoopGeneric = function() {
        LoopingUtility.setCurrentSet(document.getElementsByTagName("*"));
        LoopingUtility.setCurrentFilter(new LoopingFilter(filterGeneric,callbackFocusGeneric,callbackBlurGeneric));
        LoopingUtility.hasToDouble(true);
        LoopingUtility.nextIndex = LoopingUtility.lastDOMIndex;
        LoopingUtility.step = quickStep;
        LoopingUtility.loopOver();
    };
    /**
     * Simulate an user click on the focused element
     */
    this.doClick = function() {
        var elt = LoopingUtility.getFocusedElement();
        if(elt !== -1) {
            // Case of a link ... we do a simple redirection
            if(elt.nodeName.match(/^A|AREA$/i) && elt.href  && elt.href !== "" && !elt.href.match(/#(motor-bloc|visual-bloc|help-bloc)/) && elt.href.match(/.*(#.+).+?/)) {
                window.location = elt.href;
            }
            // Case of a form item ... we do a simple click
            else if(elt.nodeName.match(/^INPUT|SELECT|TEXTAREA$/i)) {
                if(elt.nodeName.match(/^SELECT|TEXTAREA$/i) ||
                    (elt.nodeName.match(/^INPUT$/i) && elt.type === "text")) {
                    elt.focus();
                } else {
                    elt.click();
                }
            }
            // Case of a form label ... we click the associated form item
            else if(elt.nodeName.match(/^LABEL$/i)) {
                document.getElementById(elt.htmlFor).click();
            }
            // Case of an activable onclick item ... we just launch the function
            else if(elt.onclick && elt.onclick !== null) {
                elt.onclick();
            }
            // By default, simulate a click
            else {
                var fakeClick = null;
                /* Case of W3C Compliant Browser */
                if (document.createEvent) {
                    fakeClick = document.createEvent ("MouseEvent");
                    fakeClick.initMouseEvent (
                        "click",
                        true,
                        true,
                        window,
                        0,
                        /*event.screenX*/0,
                        /*event.screenY*/0,
                        /*event.clientX*/0,
                        /*event.clientY*/0,
                        /*event.ctrlKey*/false,
                        /*event.altKey*/false,
                        /*event.shiftKey*/false,
                        /*event.metaKey*/false,
                        0,
                        null);
                    elt.dispatchEvent(fakeClick);
                } else {
                    /* Case of IE */
                    if (document.createEventObject) {
                        fakeClick = document.createEventObject(window.event);
                        fakeClick.button = 1;
                        elt.fireEvent ("onclick", fakeClick);
                    }
                }
            }
        }
    };
    /**
     * Start the default looping mode
     */
    this.start = function() {
        that.isMenuEnabled = 1;
        that.startLoopGeneric();
    };
    /**
     * Restart the default looping mode
     */
    this.restartLoopingmode = function() {
        that.startLoopGeneric();
        //TODO : maybe calling loopOver should be better
    };
    /**
     * Stop the loop over items collection
     */
    this.stopLoop = function() {
        clearTimeout(LoopingUtility.timerId);
    };

    /**
     * Stop the looping mode properly
     */
    this.killLoopingMode = function() {
        this.stopLoop();
        clearTimeout(LoopingUtility.timerId);
        that.isMenuEnabled = 0;
        var elt = LoopingUtility.getFocusedElement();
        if(elt){
            // Case of link
            if(filterLink(elt)){
                callbackBlurLink(elt);
            }
            // Case of activable element
            else if(filterOnclick(elt)) {
                callbackBlurOnclick(elt);
            }
            // Case of form element
            else if(filterForm(elt)) {
                callbackBlurForm(elt);
            }
            // Case of flash element
            else if(filterFlash(elt)){
                callbackBlurFlash(elt);
            }
        }
        if(menu.isShown()) {
            menu.hide();
            menu.clean();
        }
    };

    // public Api used by accessibilitytoolbar
    /**
     * Set the position of the looping menu
     * @param {int} pos the looping menu position (CENTER or NEXT_TO)
     */
    this.setPosition = function(pos) {
        menu.setPosition(pos);
    };
    /**
     * Set the delay before loop
     * @param {int} timeout the delay before loop
     */
    this.setTimeout = function(timeout) {
        LoopingUtility.timeOut = timeout;
    };
    /**
     * Set the step value for quick mode
     * @param {int} _step the step for quick mode
     */
    this.setQuickModeStep = function(_step) {
        quickStep = _step;
    };

    /**
     * Return the accessibilitytoolbar instance
     * @return {AccessibilityToolbar} toolbar the accessibilitytoolbar
     */
    this.getToolbar = function() {
        if(accessibilitytoolbar) {
            return accessibilitytoolbar;
        } else {
            return null;
        }
    };

// Constructor
    init();
}
/**
 * @class Toolbox of the looping mode
 */
LoopingUtility = {
// attribut
    /**
     * Reference to the current focused element
     * @private
     */
    focusedElement: null,
    /**
     * Reference to the timer used for looping
     * @private
     */
    timerId: null,
    /**
     * Delay before loop EXPRESS IN SECOND
     * @private
     */
    timeOut: null,
    /**
     * The increment (if someone have a better definition)
     * @private
     */
    step: null,
    /**
     * Index of the previous focused item
     * @private
     */
    prevIndex: null,
    /**
     * Index of the item to focus
     * @private
     */
    nextIndex: null,
    /**
     * Index of the last item in the page focused (not taking count of looping menu or other toolbar parts
     * @private
     */
    lastDOMIndex: null,
    /**
     * Collection of items to iterate
     * @private
     */
    currentSet: null,
    /**
     * Collection of items of the previously iteration
     * @private
     */
    previousSet: null,
    /**
     * Filter to applicate to the current item collection
     * @private
     */
    currentFilter: null,
    /**
     * Filter to applicate to the previous item collection
     * @private
     */
    previousFilter: null,
    /**
     * Flag to stop loop with user action
     * @private
     */
    hasToStop: false,
    /**
     * Internal flag to remember if we double the first or last item.
     * DO NOT CALL THIS ATTRIBUT OUTTER THIS OBJECT
     * use the "hasToDouble" method instead
     * @private
     */
    hasToStay: false,
    /**
     * Internal check of "hasToDouble" flag.
     * DO NOT CALL THIS ATTRIBUT OUTTER THIS OBJECT
     * use the "hasToDouble" method instead
     * @private
     */
    hasStayed: true,

// method
    /**
     * Register the focus call back
     */
    registerFocusedHandler:function() {
        // Focus callback
    	var getFocus = function(evt) {
            evt = evt || window.event;
            var target = evt.target || evt.srcElement;
            // Save the element reference if it has been focused by the toolbar
            if(target.className &&
                target.className.match(/loopingmode-focused/) &&
                !LoopingUtility.isMenuItem(target)) {
                LoopingUtility.focusedElement = target;
            }
        };
        // Register focus callback for W3C browser
        if(window.addEventListener && !window.opera) {
            window.addEventListener('focus',getFocus,true);
            // Register focus callback for IE
        } else if(window.addEventListener && window.opera){
            window.addEventListener('DOMFocusIn',getFocus,true);
        } else {
            document.onfocusin = getFocus;
        }
    },
    /**
     * Get the current focused element
     * @return {HtmlNode} elt return the current focused element, -1 either
     */
    getFocusedElement: function () {
    	if (LoopingUtility.focusedElement !== null) {
            return LoopingUtility.focusedElement;
        }
        else {
            return -1;
        }
    },

    /**
     * Tell the looping manager if it have to stay on the first (if looping forward)
     * or the last (if looping backward) DOM element
     * @param {boolean} flag set to true to double the first or last element
     */
    hasToDouble: function (flag) {
    	LoopingUtility.hasToStay = flag;
        LoopingUtility.hasStayed = flag;
    },

    /**
     * Save the old filter and use the specified one on the item collection
     * @param {LoopingFilter} filter the filter to use on current set
     */
    setCurrentFilter: function (filter) {
    	LoopingUtility.previousFilter = LoopingUtility.currentFilter;
        LoopingUtility.currentFilter = filter;
    },

    /**
     * Save the old item collection and use the specified one as item collection to iterate
     * @param {Array} set the items collection to iterate
     */
    setCurrentSet: function (set) {
    	LoopingUtility.previousSet = LoopingUtility.currentSet;
        LoopingUtility.currentSet = set;
    },

    /**
     * Seek the index of the next elligible element with the current filter in the items collection
     */
    computeNextIndex: function () {
    	// initialisation
        var raf = Math.abs(LoopingUtility.step);
        var currentElt = null;

        // If we are on the elligible element and if we have to double
        if ((LoopingUtility.hasToStay && !LoopingUtility.hasStayed) &&
            (LoopingUtility.nextIndex !== null && LoopingUtility.currentFilter.filter(LoopingUtility.currentSet[LoopingUtility.nextIndex]))
            ) {
            // Save the fact that we have double and quit without increment pointer
            LoopingUtility.hasStayed = true;
            return;
        }
        // Default value of the pointer
        if (LoopingUtility.nextIndex === null) {
            // If we have to double, initialise internal flag
            if (LoopingUtility.hasToStay) {
                LoopingUtility.hasStayed = false;
            }
            //Initialize pointer value
            if (LoopingUtility.step > 0) {
                LoopingUtility.nextIndex = 0;
            } else {
                LoopingUtility.nextIndex = LoopingUtility.currentSet.length - 1;
            }
        }
        else {
            // Pointer incrementation and prevent array out of bound
            if (LoopingUtility.step > 0) {
                // Case of forward looping
                LoopingUtility.nextIndex++;
                if (LoopingUtility.nextIndex >= LoopingUtility.currentSet.length) {
                    LoopingUtility.nextIndex = 0;
                    //If we have to double, reset internal flag
                    if (LoopingUtility.hasToStay) {
                        LoopingUtility.hasStayed = false;
                    }
                }
            } else {
                // Case of backward looping
                LoopingUtility.nextIndex--;
                if (LoopingUtility.nextIndex < 0) {
                    LoopingUtility.nextIndex = LoopingUtility.currentSet.length - 1;
                    //If we have to double, reset internal flag
                    if (LoopingUtility.hasToStay) {
                        LoopingUtility.hasStayed = false;
                    }
                }
            }
        }
        // While we have iteration to do
        while (raf > 0) {
            currentElt = LoopingUtility.currentSet[LoopingUtility.nextIndex];
            // If element is elligible to the current filter, decrement iteration to do
            if (LoopingUtility.currentFilter.filter(currentElt)) {
                raf--;
            }
            // If element is invalid to the filter or if we still have incrementation to do
            if (!LoopingUtility.currentFilter.filter(currentElt) || raf > 0) {
                // Pointer incrementation and prevent array out of bound
                if (LoopingUtility.step > 0) {
                    // Case of forward looping
                    LoopingUtility.nextIndex++;
                    if (LoopingUtility.nextIndex >= LoopingUtility.currentSet.length) {
                        LoopingUtility.nextIndex = 0;
                        // If we have to double, reset internal flag
                        if (LoopingUtility.hasToStay) {
                            LoopingUtility.hasStayed = false;
                        }
                    }
                } else {
                    // Case of backward looping
                    LoopingUtility.nextIndex--;
                    if (LoopingUtility.nextIndex < 0) {
                        LoopingUtility.nextIndex = LoopingUtility.currentSet.length - 1;
                        //If we have to double, reset internal flag
                        if (LoopingUtility.hasToStay) {
                            LoopingUtility.hasStayed = false;
                        }
                    }
                }
            }
        }
    },

    /**
     * Iterate for the items collection and check if element are elligible to the current filter.
     * If so, focus it and apply style on it.
     */
    loopOver: function () {
    	var currentElt;
        // Check if required data are specified
        if (LoopingUtility.currentFilter !== null && LoopingUtility.currentSet !== null) {
            LoopingUtility.computeNextIndex();
            // Update current element
            currentElt = LoopingUtility.currentSet[LoopingUtility.nextIndex];
            // Suppress effect on previous element, if exists, by calling the filter blur callback
            if(LoopingUtility.prevIndex !== null) {
                //	Use previous filter if element is invalid for the current filter
                if(LoopingUtility.previousFilter !== null && (LoopingUtility.prevIndex > LoopingUtility.currentSet.length ||
                    !LoopingUtility.currentFilter.filter(LoopingUtility.currentSet[LoopingUtility.prevIndex]))) {
                    LoopingUtility.previousFilter.blur(LoopingUtility.previousSet[LoopingUtility.prevIndex]);
                }
                else {
                    LoopingUtility.currentFilter.blur(LoopingUtility.currentSet[LoopingUtility.prevIndex]);
                }
            }

            // Call the filter callback for focus action
            LoopingUtility.currentFilter.focus(currentElt);

            // Update DOM pointer
            if(!LoopingUtility.isMenuItem(currentElt)) {
                LoopingUtility.lastDOMIndex = LoopingUtility.nextIndex;
            }
            LoopingUtility.prevIndex = LoopingUtility.nextIndex;

            // Prepare respawn
            if(!LoopingUtility.hasToStop) {
                if(LoopingUtility.timerId !== null) clearTimeout(LoopingUtility.timerId);
                LoopingUtility.timerId = setTimeout(LoopingUtility.loopOver,LoopingUtility.timeOut*1000);
            }
            else {
                LoopingUtility.hasToStop = false;

            }
        }
    },

    /**
     * Check if specified element is part of the looping menu
     * @param {HtmlNode} elt the element to check
     * @return true if the specified element is a looping menu item, false either
     */
    isMenuItem:function(elt) {
    	if(elt &&
            elt.parentNode &&
            elt.parentNode.parentNode &&
            elt.parentNode.parentNode.parentNode &&
            elt.parentNode.parentNode.parentNode.id &&
            elt.parentNode.parentNode.parentNode.id.match(/loopingBar/)) {
            return true;
        }
        else  {
            return false;
        }
    },

    /**
     * Check if specified element is visible and can be focused
     * @param {HtmlNode} obj the element to check
     * @return true if the specified element is visible, false either
     */
    isVisible:function(obj)
    {
    	if (obj === document){
            return true;
        }
        if (!obj){
            return false;
        }
        if (!obj.parentNode){
            return false;
        }
        if (obj.style) {
            if (obj.style.display === 'none'){
                return false;
            }
            if (obj.style.visibility === 'hidden'){
                return false;
            }
        }

        //Try the computed style in a standard way
        if (window.getComputedStyle) {
            var style = window.getComputedStyle(obj, "");
            if (style.display === 'none'){
                return false;
            }
            if (style.visibility === 'hidden'){
                return false;
            }
        }

        //Or get the computed style using IE's silly proprietary way
        var styleobj = obj.currentStyle;
        if (styleobj) {
            if (styleobj['display'] === 'none') {
                return false;
            }
            if (styleobj['visibility'] === 'hidden') {
                return false;
            }
        }
        return LoopingUtility.isVisible(obj.parentNode);
    }
}

/**
 * Abstract class to define filter item
 * @class Generic definition of item filtering
 * @param {Function} _filter : function returning a {Boolean} to determine if the {HTMLNode} element is eligible.
 * @param {Function} _callbackFocus : function to be called when the given {HTMLNode} element get focus.
 * @param {Function} _callbackBlur : function to be called when the given {HTMLNode} element lost focus.
 */
function LoopingFilter(_filter, _callbackFocus, _callbackBlur) {
// attribut
    //privé
    //public
    /**
     * Filter function to check elligibility of an {HTMLNode} element
     */
    this.filter = _filter;
    /**
     * Focus callback to be called when {HTMLNode} element get focus
     */
    this.focus = _callbackFocus;
    /**
     * Blur callback to be called when {HTMLNode} element lost focus
     */
    this.blur = _callbackBlur;
    // methode
    //privé
    //public
// Constructor
}

/**
 * @class General definition of key pressed
 */
LoopingKey = {
    /**
     * Return the key pressed
     * @param {Event} e the event to check
     * @return {int} keycode the key pressed
     */
    keyPressed:function(/*Event*/ e) {

        var charCode = [];
        // For IE browser
        if(window.event) {
            charCode[0] = window.event.keyCode;
            charCode[1] = 0;
        }
        // For W3C Browser
        else if(e) {
            charCode[0] = e.keyCode;
            charCode[1] = e.which;
        }
        else return -1;

        // Return the corresponding key code
        if((charCode[0] == 32 || charCode[1] == 32))
            return LoopingKey.ENTER;
        if((charCode[0] == 13 || charCode[1] == 13))
            return LoopingKey.SPACE;
        return LoopingKey.OTHER;
    },

    /*
     * Key definition
     */
    /**
     * Enter key representation
     */
    ENTER: 1,
    /**
     * Space key representation
     */
    SPACE: 2,
    /**
     * Unknown key representation
     */
    OTHER: -1
};


/**
 * For motor disabilites.
 * This creates a visible remote control in the bottom-right corner of the screen
 * on mouse over it scrolls
 * on mouse over links it clicks on them
 * @class Manager of the remote control mode
 */
var RemoteControlMode = function () {
    // Attributs
    // Private attributs
    /**
     * Reference Remote control pad manager
     * @see {RemoteControlPad}
     * @private
     */
    var pad = null;
    /**
     * Reposition the remote every repositionTimer in milliseconds (this is part of the 'special IE6' treat)
     * @private
     */
    var repositionTimer = 50;
    /**
     * Number of pixels to scroll at a time
     * @private
     */
    var scrollSteps = 10;
    /**
     * Scroll every scrollTimer in milliseconds
     * @private
     */
    var scrollTimer = 50;
    /**
     * Internal reference to this object
     * @private
     */
    var that = this;

    // Public attributs 
    /**
     * global timerID for setTimeout and clearTimeout
     */
    this.timerId = null;
    /**
     * number of pixels to scroll at a time
     */
    this.scrollSteps = 10;
    /**
     * Element hovered by the mouse at a T time
     */
    this.selectedElt = null;
    /**
     * Timer for click on hovsder, EXPRESSED IN SECONDS
     */
    this.hoverTimer = 3;

    // Methods
    // Private methods
    /**
     * Lists all {HTMLA} and {HTMLArea} links and adds event handlers
     * @private
     */
    var makeLinksHoverable = function () {
        var elts = document.getElementsByTagName("*");
        for (var cpt = 0; cpt < elts.length; cpt++) {
            if (that.isActivable(elts[cpt]))
            {
                that.makeLinkClickableOnHover(elts[cpt]);
            }
        }
    };

    /**
     * Function to stop help motor
     */
    this.stopHelpMotor = function () {
       //Remove remotecontrol
        if(document.getElementById('remotecontrol')){
            var fleche = document.getElementById('remotecontrol');
            fleche.parentNode.removeChild(fleche);
        }
        //on recupere l'ensemble des elements du site
        var element = document.getElementsByTagName("*");
        //On boucle sur l'ensemble des élément du site'
        for (var cpt = 0; cpt < element.length; cpt++) {
            //On test si l'element est activable, si il est activable alors on detache les événements appliqués
            if (that.isActivable(element[cpt])){
                // For W3C Browser
                if (element[cpt].addEventListener) {
                    element[cpt].removeEventListener('mouseover',that.mouseOverActivableTrigger , false);
                    element[cpt].removeEventListener('mouseout', that.mouseOutActivableTrigger, false);
                    element[cpt].removeEventListener('mouseover',that.mouseOverClickableTrigger , false);
                }
                //For IE browser
                else if (element[cpt].attachEvent) {
                    element[cpt].detachEvent('onmouseover', that.mouseOverActivableTrigger);
                    element[cpt].detachEvent('onmouseout', that.mouseOutActivableTrigger);
                    element[cpt].detachEvent('onmouseout', that.mouseOverClickableTrigger);
                }
            }
        }
        // clean selectd element if exist
        if(accessibilitytoolbar.remotecontrol.selectedElt !== null) {
            accessibilitytoolbar.remotecontrol.unselectEltStyle();
        }
    };

    /**
     * Trigger a click after time out expiration
     * @param {Event} evt : event to be processed
     * @private
     */
    this.mouseOverActivableTrigger = function (evt) {
        var target = evt.target || evt.srcElement;
        var hoverTime = null;
        if (accessibilitytoolbar.remotecontrol) {
            hoverTime = accessibilitytoolbar.remotecontrol.hoverTimer * 1000;
            /* test */
            var hasParentSelected = false;
            var currentElt = target;
            while (accessibilitytoolbar.remotecontrol.selectedElt !== null && currentElt.parentNode !== null) {
                if (currentElt.parentNode == accessibilitytoolbar.remotecontrol.selectedElt)
                    hasParentSelected = true;
                else currentElt = currentElt.parentNode;
            }
            if (!hasParentSelected) {
                if (accessibilitytoolbar.remotecontrol.selectedElt !== null)
                    accessibilitytoolbar.remotecontrol.unselectEltStyle();
                /* fin test */
                accessibilitytoolbar.remotecontrol.selectedElt = target;
                accessibilitytoolbar.remotecontrol.selectEltStyle();
                /* modif du 25/03 */
                if (accessibilitytoolbar.remotecontrol.timerId !== null)
                    clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
                /* fin modif */
                accessibilitytoolbar.remotecontrol.timerId = setTimeout("accessibilitytoolbar.remotecontrol.doClick()", hoverTime);
            } // test
        }
        //DEBUG : part for self working
        else {
            hoverTime = that.hoverTimer * 1000;
            that.selectedElt = target;
            that.selectEltStyle();
            that.timerId = setTimeout("that.doClick()", hoverTime);
        }
    };
    // Trigger function called when the mouse is leaving an item
    /**
     * Clear time out if element is no longer hovered
     * @param {Event} evt : event to be processed
     * @private
     */
    this.mouseOutActivableTrigger = function (evt) {
        if (accessibilitytoolbar.remotecontrol) {
            accessibilitytoolbar.remotecontrol.unselectEltStyle();
            accessibilitytoolbar.remotecontrol.selectedElt = null;
            clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
        }
        //DEBUG : part for self working
        else {
            that.unselectEltStyle();
            clearTimeout(that.timerId);
        }
    }
    /**
     * Register call-back on a given element to trigger a click
     * after a time out.
     * @param {HtmlNode} elt element hovered upon
     * @public
     */
    this.makeLinkClickableOnHover = function (elt) {
        // Trigger function called when the mouse is hovering an item

        //Registering callback to elt
        if (!elt.onmouseover) { /* prevents a blunder if some DHTML is present */

            // For W3C Browser
            if (elt.addEventListener) {
                elt.addEventListener('mouseover', that.mouseOverActivableTrigger, false);
                elt.addEventListener('mouseout', that.mouseOutActivableTrigger, false);
            }
            //For IE browser
            else if (elt.attachEvent) {
                elt.attachEvent('onmouseover', that.mouseOverActivableTrigger);
                elt.attachEvent('onmouseout', that.mouseOutActivableTrigger);
            }
            //For Rusty browser
            else {
                elt.onmouseover = that.mouseOverActivableTrigger;
                elt.onmouseout = that.mouseOutActivableTrigger;
            }
        }
    }

    this.mouseOverClickableTrigger = function (/* Event */ evt) {
        var target = evt.target || evt.srcElement;
        var hoverTime = null;
        if (accessibilitytoolbar.remotecontrol.isActivable(target)) {
            if (accessibilitytoolbar.remotecontrol.selectedElt == null) {
                hoverTime = accessibilitytoolbar.remotecontrol.hoverTimer * 1000;
                accessibilitytoolbar.remotecontrol.selectedElt = target;
                accessibilitytoolbar.remotecontrol.selectEltStyle();
                accessibilitytoolbar.remotecontrol.timerId = setTimeout("accessibilitytoolbar.remotecontrol.doClick()", hoverTime);
            }
            else {
                if (!accessibilitytoolbar.remotecontrol.hasParent(target, accessibilitytoolbar.remotecontrol.selectedElt)) {
                    accessibilitytoolbar.remotecontrol.unselectEltStyle();
                    accessibilitytoolbar.remotecontrol.selectedElt = null;
                    clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
                }
            }
        }
        else {
            accessibilitytoolbar.remotecontrol.unselectEltStyle();
            accessibilitytoolbar.remotecontrol.selectedElt = null;
            clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
        }
    }
    /**
     * Register an event delegation to manage the hovering click function
     * @private
     */
    var registerHoverable = function () {
        /**
         * Trigger a click after time out expiration
         * @param {Event} evt : event to be processed
         * @private
         */

        // For W3C Browser
        if (document.addEventListener) {
            document.addEventListener('mouseover', that.mouseOverClickableTrigger, false);
        }
        //For IE browser
        else if (document.attachEvent) {
            document.attachEvent('onmouseover', that.mouseOverClickableTrigger);
        }
        //For Rusty browser
        else {
            document.onmouseover = mouseOverClickableTrigger;
            document.onmouseout = mouseOutClickableTrigger;
        }
    }

    /**
     * Turns the {HTMLArea} tag of the pad into a scroll control that goes either up or down
     * @private
     */
    var makeScrollControl = function () {
        var elt = null;
        //Trigger function called when mouse is hovering the pad's area
        /**
         * Trigger a scroll after time out expiration
         * @param {Event} evt : event to be processed
         * @private
         */
        var mouseOverScrollTrigger = function (evt) {
            var target = evt.target || evt.srcElement;
            var scrollDir = (target.className.match(/scrollup/)) ? -1 : (target.className.match(/scrolldown/)) ? 1 : 0;
            if (scrollDir !== 0 && accessibilitytoolbar.remotecontrol) {
                var scrollBy = accessibilitytoolbar.remotecontrol.getScrollStep() * scrollDir;
                var timeOut = accessibilitytoolbar.remotecontrol.getTimeOut();
                accessibilitytoolbar.remotecontrol.timerId = setInterval("window.scrollBy(0," + scrollBy + ")", timeOut);
            }
            //DEBUG : part for self working
            else if (scrollDir !== 0) {
                var scrollBy = that.scrollSteps * scrollDir;
                var timeOut = that.scrollTimer;
                that.timerId = setInterval("window.scrollBy(0," + scrollBy + ")", timeOut);
            }
        };
        //Trigger function called when mouse is leaving the pad's area
        /**
         * Clear scroll time out if the pad is no longer hovered
         * @param {Event} evt : event to be processed
         * @private
         */
        var mouseOutScrollTrigger = function (evt) {
            if (accessibilitytoolbar.remotecontrol) {
                clearInterval(accessibilitytoolbar.remotecontrol.timerId);
            }
            //DEBUG : part for self working
            else {
                clearInterval(that.timerId);
            }
        }
        //Registering callback to the pad's area
        for (var i = 0; i < pad.getAreaTag().length; i++) {
            elt = pad.getAreaTag()[i];
            // For W3C Browser
            if (elt.addEventListener) {
                elt.addEventListener('mouseover', mouseOverScrollTrigger, false);
                elt.addEventListener('mouseout', mouseOutScrollTrigger, false);
            }
            //For IE browser
            else if (elt.attachEvent) {
                elt.attachEvent('onmouseover', mouseOverScrollTrigger);
                elt.attachEvent('onmouseout', mouseOutScrollTrigger);
            }
            //For Rusty browser
            else {
                elt.onmouseover = mouseOverScrollTrigger;
                elt.onmouseout = mouseOutScrollTrigger;
            }
            elt.onclick = function () {
                return false;
            }
        }
    }

    // Methodes publiques
    /**
     * Special IE6 positioning routine
     */
    this.setPosition = function () {
        pad.setPosition();
    }

    /**
     * Return the scrolling step of the page
     * @return {int} step the scroll step
     */
    this.getScrollStep = function () {
        return scrollSteps;
    }

    /**
     * Return the timeout for activate link
     * @return {int} timeout the timeout before link activation
     */
    this.getTimeOut = function () {
        return scrollTimer;
    }

    /**
     * Check if the given element is activable
     * @param {HtmlTag} elt the {HTMLNode} to check
     * @return {Boolean} true if the {HTMLNode} is activable, false either
     */
    this.isActivable = function(elt) {
        // Skip specific element (like pad area)
    	nav = accessibilitytoolbar.getNavigateur();
        if((nav.indexOf('MSIE') > 0) && (nav < 'MSIE 8')) {        	
        	className = elt.className;
        } else {
        	className = elt.getAttribute("class");
        }
    	if((className && className.match(/dontclick/)) ) {
            return false;
        } else {
            // Check elligible form element
            if (elt.nodeName.match(new RegExp("^INPUT|BUTTON|TEXTAREA|SELECT|OPTION"))) {
                if(elt.disabled == true || elt.type == "hidden" || (elt.tabIndex && elt.tabIndex<0)) {
                    return false;
                }
                else  {
                    return true;
                }
            }
            // Check label with associated form element
            else if(elt.nodeName.match(/^LABEL$/i) && elt.htmlFor !== null && document.getElementById(elt.htmlFor) !== null) {
                return true;
            }
            // Check regular activable element
            else if(elt.nodeName.match(new RegExp("^A|AREA"))) {
                return true;
            }
            // Check element with event specified
            /*else if(elt.nodeName.match(/^SPAN|IMG$/i) && elt.parentNode && that.isActivable(elt.parentNode)) {
                return true;
            } */
            else {
                return false;
            }
        }
    }

    /**
     * Check if the element has the specified parent element into his hierarchy
     * @param {HtmlTag} elt the element to check
     * @param {HtmlTag} parent the parent to look for
     * @return {Boolean} true if the element is a descendant of parent.
     */
    this.hasParent = function (elt, parent) {
        if (elt !== null) {
            if (elt.parentNode !== null) {
                if (elt.parentNode == parent)
                    return true;
                else return that.hasParent(elt.parentNode, parent);
            }
            else return false;
        }
        else return false;
    }

    /**
     * Swap the style apply to the current hovered element
     */
    this.toggleSelectedEltStyle = function () {
        var associatedLabel = null;
        if (that.selectedElt) {
            // If the selected element is a form element, check if it has an associated label
            if (that.selectedElt.nodeName.match(/^INPUT|BUTTON|TEXTAREA|SELECT|OPTION/gi)) {
                var labels = document.getElementsByTagName("label");
                for (var cptLab = 0; cptLab < labels.length; cptLab++) {
                    if (labels[cptLab].htmlFor == that.selectedElt.id)
                        associatedLabel = labels[cptLab];
                }
            }
            // If current element has the hovered style applyed, remove it
            if (that.selectedElt.className.match(/remotecontrol-selected/)) {
                that.selectedElt.className = that.selectedElt.className.replace(/ {0,1}remotecontrol-selected/, "");
                if (associatedLabel !== null)
                    associatedLabel.className = associatedLabel.className.replace(/ {0,1}remotecontrol-selected/, "");
                // Else, apply it
            } else {
                that.selectedElt.className = that.selectedElt.className + " remotecontrol-selected";
                if (associatedLabel !== null)
                    associatedLabel.className = associatedLabel.className + " remotecontrol-selected";
            }
        }
    }

    /**
     * Apply selected style on element
     */
    this.selectEltStyle = function () {
        var associatedLabel = null;
        if (that.selectedElt.nodeName.match(/^INPUT|BUTTON|TEXTAREA|SELECT|OPTION/gi)) {
            var labels = document.getElementsByTagName("label");
            for (var cptLab = 0; cptLab < labels.length; cptLab++) {
                if (labels[cptLab].htmlFor == that.selectedElt.id)
                    associatedLabel = labels[cptLab];
            }
        }
        if (!that.selectedElt.className.match(/^remotecontrol-selected$/i)) {
            that.selectedElt.className = that.selectedElt.className + " remotecontrol-selected";
        }
        if (associatedLabel !== null)
            if (!associatedLabel.className.match(/^remotecontrol-selected$/i))
                associatedLabel.className = associatedLabel.className + " remotecontrol-selected";
    }
    /**
     * Remove selected style on element
     */
    this.unselectEltStyle = function () {
        var associatedLabel = null;
        if (that.selectedElt) {
            if (that.selectedElt.nodeName.match(/^INPUT|BUTTON|TEXTAREA|SELECT|OPTION/gi)) {
                var labels = document.getElementsByTagName("label");
                for (var cptLab = 0; cptLab < labels.length; cptLab++) {
                    if (labels[cptLab].htmlFor == that.selectedElt.id)
                        associatedLabel = labels[cptLab];
                }
            }
            // If current element has the hovered style applyed, remove it
            that.selectedElt.className = that.selectedElt.className.replace(/ {0,1}remotecontrol-selected/gi, "");
            if (associatedLabel !== null)
                associatedLabel.className = associatedLabel.className.replace(/ {0,1}remotecontrol-selected/gi, "");
        }
    }
    /**
     * Simulate a user click on the selected element
     */
    this.doClick = function () {
        if (that.selectedElt !== null) {
            // go to parent while elt is not activable
            while(!accessibilitytoolbar.remotecontrol.isActivable(that.selectedElt))
            {
                that.selectedElt = that.selectedElt.parentNode;
            }
            // Case of a link ... we do a simple redirection
            if (that.selectedElt.nodeName.match(/^A|AREA$/i) && that.selectedElt.href && that.selectedElt.href !== "" && !that.selectedElt.href.match(new RegExp("#$"))) {
                window.location = that.selectedElt.href;
            }
             else if ((that.selectedElt.nodeName.match(/^SELECT|TEXTAREA$/i)) ||
                ((that.selectedElt.nodeName.match(/^INPUT$/i)) &&
                    ((that.selectedElt.type) &&
                        (that.selectedElt.type == "text" || that.selectedElt.type == "password")) )) {
                that.selectedElt.focus();
            }
            // Case of a form item ... we do a simple click 
            else if (that.selectedElt.nodeName.match(/^INPUT|BUTTON|OPTION$/i)) {
                that.selectedElt.click();
            }
            // Case of a form label ... we click the associated form item
            else if (that.selectedElt.nodeName.match(/^LABEL$/i)) {
                document.getElementById(that.selectedElt.htmlFor).click();
            }
            else if (that.selectedElt.nodeName.match(/^SPAN|IMG$/i) && that.selectedElt.parentNode && that.isActivable(that.selectedElt.parentNode)) {
                var elt = that.selectedElt;
                that.selectedElt = that.selectedElt.parentNode;
                that.doClick();
                that.selectedElt = elt;
            }
            // Case of an activable onclick item ... we just launch the function
            else if (that.selectedElt.onclick && that.selectedElt.onclick !== null) {
                that.selectedElt.onclick();
            }
            // By default, simulate a click
            else {
                var fakeClick = null;
                /* Case of W3C Compliant Browser */
                if (document.createEvent) {
                    fakeClick = document.createEvent("MouseEvent");
                    fakeClick.initMouseEvent(
                        "click"
                        , true
                        , true
                        , window
                        , 0
                        , /*event.screenX*/0
                        , /*event.screenY*/0
                        , /*event.clientX*/0
                        , /*event.clientY*/0
                        , /*event.ctrlKey*/false
                        , /*event.altKey*/false
                        , /*event.shiftKey*/false
                        , /*event.metaKey*/false
                        , 0
                        , null);
                    that.selectedElt.dispatchEvent(fakeClick);
                } else {
                    /* Case of IE */
                    if (document.createEventObject) {
                        fakeClick = document.createEventObject();
                        fakeClick.button = 1;
                        that.selectedElt.fireEvent("onclick", fakeClick);
                    }
                }
            }
        }
    }

    /**
     * Initialize the remotecontrol object on demand
     */
    this.init = function () {
        pad = new RemoteControlPad();

        /* dealing with IE6's inability to do position:fixed */
        var v = navigator.appVersion;
        if (navigator.appName.match(/Internet Explorer/)) {
            if (parseInt(v.substring(v.indexOf("MSIE") + 5)) > 0 && parseInt(v.substring(v.indexOf("MSIE") + 5)) <= 6) {
                setInterval("accessibilitytoolbar.remotecontrol.setPosition()", repositionTimer);
            }
        }
        makeScrollControl();
        makeLinksHoverable();
    };

    // Constructeur
    this.init();
}
/**
 * Remote control used in remote control mode to allow user
 * to scroll the page
 * @class Graphical scroll remote control
 */
function RemoteControlPad() {
    // Privates attributes 
    /**
     * Remote control pad image
     * @private
     */
    var imgSrc = imagesPath['arrows'] + "?v=1";
    /**
     * Remote control pad image width
     * @private
     */
    var imgWidth = 73;
    /**
     * Remote control pad image height
     * @private
     */
    var imgHeight = 132;
    /**
     * Remote control pad image distance form screen border
     * @private
     */
    var imgFromBorder = 20;
    /**
     * Reference to {HTMLDiv} tag used to render the remote control pad
     * @private
     */
    var pad = null;
    /**
     * Local reference to this object
     * @private
     */
    var that = this;


    // Privates Methods
    /**
     * Initialisation of the remote control pad (creation of the html structure)
     * @private
     */
    var init = function () {
        createRemoteHTML();
    };

    /**
     * Create the remote and append it to the document
     * @private
     */
    var createRemoteHTML = function () {
        pad = document.createElement("div");
        pad.id = "remotecontrol";
        /* rect: left-x, top-y, right-x, bottom-y. */
        pad.appendChild(accessibilitytoolbar.make(["map", {name:"remotemap"},
          ["area", {href:"#", "class":"dontclick scrollup", shape:"rect", coords:"0,0," + imgWidth + "," + (imgHeight / 2), alt:accessibilitytoolbar.get("remotepad_scrollup")}],
          ["area", {href:"#", "class":"dontclick scrolldown", shape:"rect", coords:"0," + (imgHeight / 2) + "," + (imgHeight / 2) + "," + imgHeight, alt:accessibilitytoolbar.get("remotepad_scrolldown")}]
        ]));
        var i = document.createElement("img");
        i.src = imgSrc;
        i.width = imgWidth;
        i.height = imgHeight;
        i.useMap = "#remotemap";
        pad.appendChild(i);
        document.getElementsByTagName("body")[0].appendChild(pad);
    };

    // Publics methods
    /**
     * Special IE6 positioning routine
     */
    this.setPosition = function () {
        var h = document.documentElement.clientHeight;
        var w = document.documentElement.clientWidth;
        var st = document.documentElement.scrollTop;
        var sl = document.documentElement.scrollLeft;
        pad.style.pixelTop = st + h - imgFromBorder - imgHeight;
        pad.style.pixelLeft = sl + w - imgFromBorder - imgWidth;
    }

    /**
     * Define the pad image source location
     * @param {String} location, the URL of the image
     */
    this.setImgSrc = function (location) {
        pad.childNodes[1].setAttribute("src", location);
    }

    /**
     * Get the collection of {HTMLArea} tag used by the pad
     * @return {Array} nodes, the {HTMLArea} tag collection
     */
    this.getAreaTag = function () {
        return pad.childNodes[0].childNodes;
    }

    // Constructeur
    init();
}

document.confortdelecture = true;
/**
 * Method to check if toolbar is launched.
 * @return {Boolean} true when the accessbilitytoolbar is launched.
 */
function hasConfortdelecture() {
    return true;
}
/**
 * @class Entry point for the accessibility tool-bar
 */
accessibilitytoolbar = {
    
	/**
     * {bool}
     */
    isModern: true,

	/**
     * {object}
     */
    uncompatibility: {
        /**************************************Tableau des nom des navigateurs*****************************
         ie X => MSIE X (exemple MSIE 7.0)
         Firefox X => Firefox v (ex Firefox 31.0)
        ***************************************************************************************************/
        a11yDyslexyFontEnabled: ['MSIE 7.0','MSIE 8.0']
    },
        
    /**
     * {ToolbarStrings} String localization Manager
     */
    strings: new ToolbarStrings(),
    
    /**
     * {Array} of all possible values for the content to skip to
     */
    contentToLookFor: ["contenu", "content"],

    /**
     * {string} css class containt Link
     */
    cssLinkModeClassName: null,

    /**
     * {string} id of skipLink
     */
    idSkipLinkIdLinkMode: null,

    /**
     * {string} skiplink of application
     */
    skipLinkCreate: null,

    /**
     * {string} class of skiLink
     */
    cssSkipLinkClassName : "cdu_hide",

    /**
     * {boolean} using skip link or not
     */
    skipLink : false,
    /**
     * {String} Id contain the link of using confort
     */
    idLinkModeContainer : null,

    /**
     * Value to jump to
     */
    contentToJumpTo: null,
    /**
     * User preference manager
     */
    userPref: null,
    /**
     * Flag to check if user has change is preference
     */
    hasDoneSettings: false,

    /**
     * {LoopingMode} Looping mode Manager
     */

    loopingmode: null,
    /**
     * {storedValue} cookie value received or not
     */
    storedValue: false,

    /**
     * {RemoteControlMode} Remote control Manager
     */
    remotecontrol: null,
    
    /**
     * array of css stylesheets removed
     */
    savesStylesheets : [],

    /**
     * array of elements where style attribute have been removed
     */
    savStyleElmtAtt : [],

    /**
     * array of style value indexed ontot the same key as elements removed
     */
    savStyleAttElmt : [],


    // when the user change the lang of the interface, wee need to reload after save is done
    needToReload : false,
    
    // mask already loaded?
    toolbarMaskInit : false,
    
    // addevent input params : 
    // 1- for addeventlistenername
    // 2- for attacheventlistener
    // 3- the object
    // 4- the callback function to call when event occurs
    uciAttachEvent: function(wichAdd,wichAttach,obj,callBack) {
        if(obj)
        {
        if(obj.addEventListener){
            obj.addEventListener(wichAdd, callBack, false);
        }else if (obj.attachEvent){
            obj.attachEvent(wichAttach, callBack);
        }else{
            obj.onclick = callBack;
        }
        }
    },

    //
    uci_MenuButtonEvent: function(e){
        if (!e)
            e = window.event;
        var target = e.target || e.srcElement;
        //On récupere le parent de l'élément
        var target_enfant = target;
        var className = target.className;
        if((typeof className === "string" && className.indexOf('cdu-icon') > -1) ) {     
         
        	target=target.parentNode;
        }
        // case of path svg
        if(typeof className === 'object' && 'baseVal' in className) {              
        	target=target.parentNode.parentNode;                
        }        
        target=target.parentNode;
        var tagId = target.id;
        var etat = target.getAttribute('aria-selected');
        if(e.type == 'click' && etat == 'false')
        {
            accessibilitytoolbar.uci_OuvrirMenuOnglet(target);
        }
        else if(e.type == 'keydown')
        {
            // Touche Entré
            if(e.keyCode == '13' && etat == 'false')
            {
                accessibilitytoolbar.uci_OuvrirMenuOnglet(target);
            }
            // Touches haut ou bas
            else if(e.keyCode == '38 ' || e.keyCode == '37')
            {
                // accede à l'onglet pr�c�dent, soit il existe, soit on revient au dernier �l�ment
                accessibilitytoolbar.uci_OuvrirMenuOnglet(accessibilitytoolbar.previousElementSibling(target_enfant) || target.children[(target.children.length-1)]);
                accessibilitytoolbar.stopEvt(e);
            }
            // Touches bas ou droite
            else if(e.keyCode == '40' || e.keyCode == '39')
            {
                // accede à l'onglet suivant, soit il existe, soit on revient au premier �l�ment
                accessibilitytoolbar.uci_OuvrirMenuOnglet(accessibilitytoolbar.nextElementSibling(target_enfant) || target.children[0]);

                // on stoppe la propagation de l'�v�nement
                accessibilitytoolbar.stopEvt(e);
            }
        }
    },
    previousElementSibling : function( el ) {
        if( el.previousElementSibling ) {
            return el.previousElementSibling;
        } else {
            while( el = el.previousSibling ) {
                if( el.nodeType === 1 ) return el;
            }
        }
    },
    nextElementSibling : function( el ) {
        if( el.nextElementSibling ) {
            return el.nextElementSibling;
        } else {
            while( el = el.nextSibling ) {
                if( el.nodeType === 1 ) return el;
            }
        }
    },
    // callback of event on radiobuttons
    uciRadioButtonEvent: function(e) {
        if (!e)
            e = window.event;
        var target = e.target || e.srcElement;
        // on boucle jusqu'� remonter sur un li si l'event est envoy� depuis un sous �l�ment
        var tagId = target.id;
        var targetEnfant = target;
        while(tagId==='')
        {
            target=target.parentNode;
            tagId = target.id;
        }
        var etat = target.getAttribute('aria-checked');
        if(document.getElementById('uci_activateOnglet').style.display !== 'block' || tagId.match(/uci_quick/g) == null) {
        // check if clicked
            if(e.type == 'click')
            {
                accessibilitytoolbar.uciCocherRadioButton(target);
            }
            else if(e.type == 'keydown')
            {
                // Touche Espace
                if(e.keyCode == '32')
                {
                    accessibilitytoolbar.uciCocherRadioButton(target);
                }
                // Touches haut ou gauche
                else if(e.keyCode == '38' || e.keyCode == '37')
                {
                    // coche le bouton pr�c�dent, soit il existe, soit on revient au dernier �l�ment
                    accessibilitytoolbar.uciCocherRadioButton(accessibilitytoolbar.previousElementSibling(target) || target.parentNode.children[(target.parentNode.children.length-1)]);

                    accessibilitytoolbar.stopEvt(e);
                }
                // Touches bas ou droite
                else if(e.keyCode == '40' || e.keyCode == '39')
                {
                    // coche le bouton suivant, soit il existe, soit on revient au premier �l�ment
                    accessibilitytoolbar.uciCocherRadioButton(accessibilitytoolbar.nextElementSibling(target) || target.parentNode.children[0]);

                    // on stoppe la propagation de l'�v�nement
                    //IE9 & Other Browsers
                    accessibilitytoolbar.stopEvt(e);
                }
            }
        }
    },
    uciCocherRadioButton: function(elmt) {
        // on active le bouton en question
        elmt.setAttribute('aria-checked','true');
        elmt.tabIndex='0';
        //var bIsColorPalette = false;
        var clearColor = "";
        // remove selected class if present
        elmt.className = elmt.className.replace(/ uci_couleur_li_selected{0,1}/,"");
        elmt.className = elmt.className.replace(/ active{0,1}/,"");
        // add the selected class
        elmt.className = elmt.className.replace(/uci_couleur_li{0,1}/,"uci_couleur_li uci_couleur_li_selected");
        elmt.className = elmt.className.replace(/uci_choix{0,1}/,"uci_choix active");
        if(elmt.id.match(/a11yBigger/g) || elmt.id.match(/a11yVisualPredefined/g)) {
            if(document.getElementById('uci_activateOnglet').style.display == 'block' && elmt.id.match(/uci_a11y/gi) !=null) {
                var element = /^uci_(\S+)$/.exec(elmt.id);
                // on vérifie que son copain existe dans les réglages rapides
                if(document.getElementById('uci_quick_'+ element[1])) {
                    accessibilitytoolbar.uciCocherRadioButton(document.getElementById('uci_quick_'+ element[1]));                    
                }
                elmt.focus();
            } else if(document.getElementById('uci_activateOnglet').style.display == 'none' && elmt.id.match(/uci_quick/gi) !=null) {
                var element = /^uci_quick_(\S+)$/.exec(elmt.id);
                accessibilitytoolbar.uciCocherRadioButton(document.getElementById('uci_'+ element[1]));
                elmt.focus();
            }
        } else {
            elmt.focus();
        }

        // on d�sactive ses fr�res
        var reponses = elmt.parentNode;
        var iterator;
        for(iterator = 0; iterator<reponses.children.length;iterator++) {
            // on r�cup�re un fils
            if(reponses.children[iterator]!=elmt)
            {
                reponses.children[iterator].setAttribute('aria-checked','false');
                reponses.children[iterator].tabIndex='-1';
                
                // remove selected class if present
                reponses.children[iterator].className = reponses.children[iterator].className.replace(/ uci_couleur_li_selected{0,1}/,"");
                reponses.children[iterator].className = reponses.children[iterator].className.replace(/ active{0,1}/,"");
            }
            // use the value of iterator to change the cookie value
            else
            {
                // Here iterator is equal to the index of the radio option 0 first option selected , 1 the second one etc..
                // so from here set the stackv3[myoption]='myvalue-'+iterator;
                // The other option is to define an id wich contains the key and value like id="uciOptions_a11yBigger_keepit"
                var resArray=elmt.id.split('_');
                // key, value
                // make switch case on prefname
                prefName=resArray[resArray.length-2];
                value= resArray[resArray.length-1];
                if (prefName === 'a11yNavLienSelColor'){
                    document.getElementById('uci_NavLienSel').firstChild.style.backgroundColor = value;
                    if(document.getElementById('uci_NavLienSel').firstChild.style.setProperty)
                        document.getElementById('uci_NavLienSel').firstChild.style.setProperty ("background-color", value, "important");
                } else if (prefName === 'a11yNavLienNonVisColor'){
                    document.getElementById('uci_NavLienNonVis').firstChild.style.backgroundColor = value;
                    if(document.getElementById('uci_NavLienSel').firstChild.style.setProperty)
                        document.getElementById('uci_NavLienNonVis').firstChild.style.setProperty ("background-color", value, "important");
                } else if (prefName === 'a11yNavLienVisColor'){
                    document.getElementById('uci_NavLienVis').firstChild.style.backgroundColor = value;
                    if(document.getElementById('uci_NavLienSel').firstChild.style.setProperty)
                        document.getElementById('uci_NavLienVis').firstChild.style.setProperty ("background-color", value, "important");
                }
                accessibilitytoolbar.userPref.set(prefName,value);
                // if the user change the font or background color without activating the option, then activate it
                if((accessibilitytoolbar.userPref.get('a11yVisualSettings') !=='personnal') && (resArray[resArray.length-2] === 'a11yFontColor' || resArray[resArray.length-2] === 'a11yBackgroundColor')){
                    accessibilitytoolbar.userPref.set('a11yVisualSettings','personnal');
                    document.getElementById('uci_couleur_personnalisees_input').checked='checked';
                    document.getElementById('uci_couleur_predefenie_input').removeAttribute('checked');
                } else { 
                  if(accessibilitytoolbar.userPref.get('a11yVisualSettings') ==='personnal' && resArray[resArray.length-2] === 'a11yVisualPredefinedSettings') {
                      accessibilitytoolbar.userPref.set('a11yVisualSettings','predefined');
                      document.getElementById('uci_couleur_predefenie_input').checked='checked';
                      document.getElementById('uci_couleur_personnalisees_input').removeAttribute('checked');
                  }
                }
            }
        }
        if(document.getElementById('uci_validation').className==='cdu_n'){
          document.getElementById('uci_validation').className="";
          UciIhm.hide_confirm_validation();
        }
        document.getElementById('uci_zone_form').style.display="block";
        if(accessibilitytoolbar.userPref.get("a11yApercuAuto")!=="off"){
          accessibilitytoolbar.setCSS();

          // jump to content if needed
          accessibilitytoolbar.jumpToContent();
        }
    },

    uci_OuvrirMenuOnglet: function(elmt){
        elmt.setAttribute('aria-selected','true');
        elmt.tabIndex='0';
        elmt.parentNode.tabIndex='0';
        var spanId = /^uci_contenu_(\S+)$/.exec(elmt.getAttribute('aria-controls'));
        document.getElementById(spanId[1]).parentElement.className='uci_inline onglet_1';
        document.getElementById(elmt.getAttribute('aria-controls')).style.display="block";
        elmt.focus();
        // on d�sactive ses fr�res
        var reponses = elmt.parentNode;
        var iterator = 0;
        for(iterator = 0; iterator<reponses.children.length;iterator++) {
            // on r�cup�re un fils
            if(reponses.children[iterator]!=elmt)
            {
                reponses.children[iterator].setAttribute('aria-selected','false');
                reponses.children[iterator].tabIndex='-1';
                reponses.children[iterator].parentNode.tabIndex='-1';
                var spanIdOther = /^uci_contenu_(\S+)$/.exec(reponses.children[iterator].getAttribute('aria-controls'));
                document.getElementById(spanIdOther[1]).parentElement.className='uci_inline onglet_0';
                document.getElementById(reponses.children[iterator].getAttribute('aria-controls')).style.display="none";
            }
        }
    },

    uci_aria_radio_simulation: function(uciIdListe){
        // Gestion des boutons radio simul�s en ARIA
        var reponses = document.getElementById(uciIdListe);
        if(reponses){
            var iterator = 0;
            var children;
            // parcours de tous les enfants de la liste
            for(iterator = 0; iterator<reponses.children.length;iterator++) {
                // on r�cup�re un fils
                children = reponses.children[iterator];
                accessibilitytoolbar.uciAttachEvent('click','onclick',children,accessibilitytoolbar.uciRadioButtonEvent);
                accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',children,accessibilitytoolbar.uciRadioButtonEvent);
            }
        }
    },

    uci_aria_menu_simulation: function(uciIdListe){
        // Gestion du systeme d'onglet simulé en ARIA
        var reponses = document.getElementById(uciIdListe);
        if(reponses){
            var iterator = 0;
            var children;
            // parcours de tous les enfants de la liste
            for(iterator = 0; iterator<reponses.children.length;iterator++) {
                // on r�cup�re un fils
                children = reponses.children[iterator];
                accessibilitytoolbar.uciAttachEvent('click','onclick',children,accessibilitytoolbar.uci_MenuButtonEvent);
                accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',children,accessibilitytoolbar.uci_MenuButtonEvent);
            }
        }
    },

    /**
     * Get the localized string associated to the specified reference
     * in the correct language
     * @param {String} string the text reference
     * @return {String} the text in the right language
     */
    get: function (str) {
        return this.strings.get(str);
    },

    /**
     * Retourne si le navigateur est compatible ou pas
     * @param {string}
     * @return {bool}
     * @function
     */
    getCompatible: function(toolsToolbar){
        var testNavigateur = this.getNavigateur();
        if(this.uncompatibility[toolsToolbar]){
            for (var i = 0; i< this.uncompatibility[toolsToolbar].length; i++){
                if (this.uncompatibility[toolsToolbar][i] == testNavigateur) {
                    return false;
                }
            }
        }
        return true;
    },

    getNavigateur : function(){
        var ua= navigator.userAgent, tem,
            M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/([\.\d]+)/i))!== null) M[2]= tem[1];
        return M.join(' ');
    },

    /**
     * Add the right CSS link to the head for our tool-bar
     */
    createToolbarCSSLink: function () {
        var l = document.createElement('link');
        l.rel = "stylesheet";
        l.type = "text/css";
        l.href = uci_classic_toolbar_css;
        l.media = 'all';
        l.id = "a11yCSS";
        this.head.appendChild(l);    
        
        if(fontsPath['fonticone']) {
          var newStyle = document.createElement("style");
          newStyle.setAttribute("type", "text/css");
          newStyle.id = "a11yCSSFontStyle";
          if (document.all && !window.opera) { // if IE then we can't rely on newStyle.appendChild(textnode)
              newStyle.styleSheet.cssText = "@font-face{font-family: \"orangeconfortplus\";src: "+ fontsPath['fonticone'] +";font-style: normal;font-weight: normal;}";
          }
          else { // standards-oriented browsers
              newStyle.appendChild(document.createTextNode("@font-face{font-family: \"orangeconfortplus\";src: "+ fontsPath['fonticone'] +";font-style: normal;font-weight: normal;}"));
          }
          document.getElementsByTagName('head')[0].appendChild(newStyle);
        }
    },

    /**
     * Generates the accessibility too-bar with a button
     *
     */
    toolbarCreateButton: function () {
        return accessibilitytoolbar.make(["p",{id:"cdu_close", style:accessibilitytoolbar.userPref.get('a11yToolbarEnable')=='on'?"display:none":"display:block"},
          ["button", {title:this.get('uci_alt_logo')},this.get('uci_serv_name'),
            ["span","+"]
          ]
        ]);
    },

    /**
     * Generates the accessibility too-bar with a link
     *
     */
    toolbarCreateLink: function () {
        var style = ".cdu_hide {display:none} #cdu_close {display:none}";
        var newStyle = document.createElement("style");
        newStyle.setAttribute("type", "text/css");
        if (document.all && !window.opera) { // if IE then we can't rely on newStyle.appendChild(textnode)
            newStyle.styleSheet.cssText = style;
        }else { // standards-oriented browsers
            newStyle.appendChild(document.createTextNode(style));
        }
        var _head = document.getElementsByTagName('head')[0];
        // newStyle
        _head.insertBefore(newStyle, _head.firstChild);
        
        //search link container
        this.node = document.getElementById(accessibilitytoolbar.idLinkModeContainer);
        //create link with attribute
        this.lien = document.createElement("a");
        var spanLink = document.createElement("span");
        spanLink.className = "uci-plus-orange"; 
        spanLink.textContent = '+';
        this.lien.textContent = this.get('uci_serv_name');
        this.lien.appendChild(spanLink);
        
        if(accessibilitytoolbar.cssLinkModeClassName){
            this.lien.className=accessibilitytoolbar.cssLinkModeClassName;
        }
        this.lien.setAttribute("id" ,'uci_link');
        this.lien.setAttribute("title", this.get('uci_alt_logo'));
        this.lien.setAttribute("href", "#");
        this.node.appendChild(this.lien);

        //create skipLink for accessibility
        //search link container
        var skipLinkCreate = document.createElement("a");
        var spanLink2 = document.createElement("span");
        spanLink2.className = "uci-plus-orange"; 
        spanLink2.textContent = '+';
        skipLinkCreate.textContent = this.get('uci_serv_name');
        skipLinkCreate.appendChild(spanLink2);
        
        skipLinkCreate.className=accessibilitytoolbar.cssSkipLinkClassName;
        skipLinkCreate.setAttribute("id" ,'idCduSkip');
        skipLinkCreate.setAttribute("title",  this.get('uci_alt_logo'));
        skipLinkCreate.setAttribute("href", "#");
        if(accessibilitytoolbar.idLinkModeContainer){
            if(accessibilitytoolbar.idSkipLinkIdLinkMode){
                this.node = document.getElementById(accessibilitytoolbar.idSkipLinkIdLinkMode);
                this.node.appendChild(skipLinkCreate);
            }else{
                this.body.insertBefore(skipLinkCreate, this.body.firstChild);
            }
        }
    },

    /**
     * Generates the accessibility tool-bar per se
     */
    createToolbar: function () {
        return accessibilitytoolbar.make(["form", {name:"uci_form", action:"#", id:"uci_form"},
          UciIhm.InitUciIHM()
        ]);
    },

    /**
     * attach event to button or link for toolbar opening
     */
    createButtonLinkBehaviour: function(){
        //declarate my object list in array
        var myObject=[];
        if(accessibilitytoolbar.idLinkModeContainer){
            myObject.push(document.getElementById("uci_link"));
            myObject.push(document.getElementById("closeLink"));
            myObject.push(document.getElementById("idCduSkip"));
        }
        if(document.getElementById("cdu_close"))
        {
            myObject.push(document.getElementById("cdu_close").getElementsByTagName("button")[0]);
        }
        accessibilitytoolbar.eventToolbar(myObject);
    },

    /**
     * Add object to objectList for toolbar events
     */
    createObjectBehaviour: function (){
        var actionButtons = document.getElementById("cdu_content").getElementsByTagName("input");
        var selectButtons = document.getElementById("cdu_content").getElementsByTagName("select");
    
        // User settings behaviour
        var toolbar = document.getElementById("cdu_content");
        for (var i = 0; i < actionButtons.length; i++) {
            if(actionButtons[i].type && actionButtons[i].type!=='submit' && actionButtons[i].type!=='reset'
            && !(actionButtons[i].id && (actionButtons[i].id==='uci_fr' || actionButtons[i].id==='uci_en' || actionButtons[i].id==='uci_sp' )) && !actionButtons[i].disabled)
                accessibilitytoolbar.uciAttachEvent('click','onclick',actionButtons[i],accessibilitytoolbar.setPref);
        }
        for (i = 0; i < selectButtons.length; i++) {
            accessibilitytoolbar.uciAttachEvent('change','onchange',selectButtons[i],accessibilitytoolbar.setPref);
        }

        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_NavLienSel'),accessibilitytoolbar.displayOrNot);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_NavLienNonVis'),accessibilitytoolbar.displayOrNot);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_NavLienVis'),accessibilitytoolbar.displayOrNot);
        document.getElementById('uci_NavLienSel').firstChild.onclick = function (e) { document.getElementById('uci_NavLienSel').click();accessibilitytoolbar.stopEvt(e);};
        document.getElementById('uci_NavLienNonVis').firstChild.onclick = function (e) { document.getElementById('uci_NavLienNonVis').click();accessibilitytoolbar.stopEvt(e);};
        document.getElementById('uci_NavLienVis').firstChild.onclick = function (e) { document.getElementById('uci_NavLienVis').click();accessibilitytoolbar.stopEvt(e);};
                    
        var liButtonsPalette = document.getElementById("uci_reponses_couleur_lien_sel").getElementsByTagName("li");
        for (i=0; i < liButtonsPalette.length; i++){
           accessibilitytoolbar.uciAttachEvent('blur','onblur',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
           accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
        }

        liButtonsPalette = document.getElementById("uci_reponses_couleur_lien_notsel").getElementsByTagName("li");
        for (i=0; i < liButtonsPalette.length; i++){
           accessibilitytoolbar.uciAttachEvent('blur','onblur',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
           accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
        }
        liButtonsPalette = document.getElementById("uci_reponses_couleur_lien_visite").getElementsByTagName("li");
        for (i=0; i < liButtonsPalette.length; i++){
           accessibilitytoolbar.uciAttachEvent('blur','onblur',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
           accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
        }
        
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_bigger');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_bigger_quick_set');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleurpredefinie_quick_set');

        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_wordspacing');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_charspacing');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_linespacement');
        if(this.getCompatible('a11yDyslexyFontEnabled'))
        {
            accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_fontfamily');
        }
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_changecasse');
        if(this.getCompatible('a11yMaskEnabled'))
        {
            accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_epaisseurmask');
        }
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleurpredefinie');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleurpolice');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleurbackground');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleur_lien_visite');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleur_lien_notsel');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleur_lien_sel');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_DelayBeforeLoop');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_a11yMenuPositionning');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_DelayBeforeLoop_auto');
        accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_a11yQuickMode');

        //gestion des evenement sur les onglets :
        accessibilitytoolbar.uci_aria_menu_simulation('uci_onglet_confort');
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_moreconfort'),UciIhm.more_confort);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_menu_activer_menu'),function() {UciValidation.Annulation();UciIhm.ToolbarHide(); UciIhm.hide_confirm_validation();} );
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_menu_remove_all'),UciIhm.remove_all);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_activer_menu'),UciIhm.uci_activate_menu);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_FR'), function() {return UciIhm.changement_langue('FR');});
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_EN'), function() {return UciIhm.changement_langue('EN');});
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_ES'), function() {return UciIhm.changement_langue('ES');});
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_PL'), function() {return UciIhm.changement_langue('PL');});
        accessibilitytoolbar.uciAttachEvent('submit','onsubmit',document.getElementById('uci_form'), function(e) {accessibilitytoolbar.stopEvt(e);UciValidation.Validation(); UciIhm.confirm_validation();});
        accessibilitytoolbar.uciAttachEvent('reset','onreset',document.getElementById('uci_form'), function(e) {accessibilitytoolbar.stopEvt(e);UciValidation.Annulation();});
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci-onoffswitch'), UciIhm.desactiveCDUForWebSite);
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_chekbox_dyslexy_font'), function() {return UciTypographie.displayFieldset('uci_fieldset_fontfamily');});
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_chekbox_casse'), function() {return UciTypographie.displayFieldset('uci_fieldset_changecasse');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_fontfamily'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_typo_help_fontfamily');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_fontfamily'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_typo_help_fontfamily');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_changecase'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_typo_help_changecase');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_changecase'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_typo_help_changecase');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_jumptocontent'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_jumptocontent');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_jumptocontent'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_jumptocontent');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_listmode'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_listmode');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_listmode'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_listmode');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_links'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_links');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_links'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_links');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_disabletransp'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_disabletransp');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_disabletransp'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_disabletransp');});
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_disablepppictures'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_disablepppictures');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_disablepppictures'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_disablepppictures');}); 
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_link_help_mask'), function() {return accessibilitytoolbar.toolbarDisplayHelp('uci_help_mask');});
        accessibilitytoolbar.uciAttachEvent('blur','onblur',document.getElementById('uci_link_help_mask'), function() {return accessibilitytoolbar.toolbarHideHelp('uci_help_mask');}); 
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('a11yMotorModeEnabled'), UciAideMotrice.activate_aide_motrice);
        
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('apparence_lien'), function() {UciApparence.displayLien('apparence_lien','uci_gestion_lien');});
       
        accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_check_mask'), function() {UciApparence.displayLien('uci_check_mask','uci_div_mask');});    
        
        accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',document.getElementById('uci_reponses_couleur_lien_sel'), function(event) {UciApparence.uciFermetureOverlay(event,"uci_palette_couleur_lien_selectionne");});    
        accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',document.getElementById('uci_reponses_couleur_lien_notsel'), function(event) {UciApparence.uciFermetureOverlay(event,"uci_palette_couleur_lien_notselectionne");});  
        accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',document.getElementById('uci_reponses_couleur_lien_visite'), function(event) {UciApparence.uciFermetureOverlay(event,"uci_palette_couleur_lien_visite");});  
    },
    /**
     * Function event implementation
     * Create an object list with
     */

    eventToolbar: function(myObject){
        var i=0,theFrames,theFrame;
        while( i < myObject.length){
            if(myObject[i]){
                accessibilitytoolbar.uciAttachEvent('click','onclick',myObject[i],accessibilitytoolbar.toggle);
            }
            i++;
        }
        i = 0;        
        theFrames=document.getElementsByTagName('iframe');
        if(theFrames.length>0)
        {
            while(theFrame = theFrames[i]){
                try{                        
                    theFrameDocument = theFrame.document || theFrame.contentDocument;               
                    // attach event to frame onload to reload the css...
                     accessibilitytoolbar.uciAttachEvent('load','onload',theFrame,accessibilitytoolbar.setCSS);
                } catch(e){}
                i++;
            }
        }
        i = 0;        
        theFrames=document.getElementsByTagName('frame');
        if(theFrames.length>0)
        {
            while(theFrame = theFrames[i]){
                try{                        
                    theFrameDocument = theFrame.document || theFrame.contentDocument;               
                    // attach event to frame onload to reload the css...
                     accessibilitytoolbar.uciAttachEvent('load','onload',theFrame,accessibilitytoolbar.setCSS);
                } catch(e){}
                i++;
            }
        }
    },

    /**
     * Gestion des ouvertures d element en display= none
     */
    displayOrNot : function (e) {
        if (!e)
            e = window.event;
        var target = e.target || e.srcElement;
        //On récupere le parent de l'élément
        tagId = target.id;
        var idCible;
        var idEnfant;
        switch(tagId) {
            case 'uci_NavLienSel':
                idCible = "uci_palette_couleur_lien_selectionne";
                idEnfant = document.getElementById('uci_a11yNavLienSelColor_'+accessibilitytoolbar.userPref.get("a11yNavLienSelColor"));
                break;
            case 'uci_NavLienNonVis':
                idCible = "uci_palette_couleur_lien_notselectionne";
                idEnfant = document.getElementById('uci_a11yNavLienNonVisColor_'+accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor"));
                break;
            case 'uci_NavLienVis':
                idCible = "uci_palette_couleur_lien_visite";
                idEnfant = document.getElementById('uci_a11yNavLienVisColor_'+accessibilitytoolbar.userPref.get("a11yNavLienVisColor"));
                break;
        }
        if(document.getElementById(idCible)!== null) {
            if (document.getElementById(idCible).style.display === "none") {
                document.getElementById(idCible).style.display = "block";
                idEnfant.focus();
            }else {
                document.getElementById(idCible).style.display = "none";
            }
        }
        accessibilitytoolbar.stopEvt(e);
    },

    /**
     * Couleur div hide
     */
    HidePaletColor: function (e){
        if (!e)
            e = window.event;
        var target = e.target || e.srcElement;
        setTimeout(function(){accessibilitytoolbar.HideColorPalettePret(target)},5);
    },

    HideColorPalettePret: function(target){
       // var element = /^uci_a11yNavLienSelColor(\S+)$/.exec(document.activeElement.id);
        if(document.activeElement.parentNode.id !== target.parentNode.id){
            if(document.getElementById('uci_palette_couleur_lien_selectionne').style.display === "block"){
                document.getElementById('uci_palette_couleur_lien_selectionne').style.display = "none";
            }else if (document.getElementById('uci_palette_couleur_lien_notselectionne').style.display === "block"){
                document.getElementById('uci_palette_couleur_lien_notselectionne').style.display = "none";
            }else if(document.getElementById('uci_palette_couleur_lien_visite').style.display === "block"){
                document.getElementById('uci_palette_couleur_lien_visite').style.display = "none";
            }
        }
    },

    /**
     * If user has change his preference, save the change
     * @see {ToolbarData}
     */
    saveUserPref: function () {
        if (this.hasDoneSettings) {
            this.hasDoneSettings = false;
            this.userPref.updateUserPref();
        }
    },

    /*
     * next 2 functions control behaviour for the graphic toolbar :
     * - show
     * - hide
     */

    /**
     * Toggle the display of the toolbar. If its shown then it will be
     * hided and if its hide, then it will be shown
     * @param {Event} e Event to be processed.
     */
    toggle: function (/*Event*/e) {
        var toolbarContent = document.getElementById("cdu_content");

        if (!toolbarContent || toolbarContent.className.match(/cdu_displayN/)) {
            if(document.getElementById('cdu_close'))
            {
                document.getElementById('cdu_close').style.display = "none";
            }
            accessibilitytoolbar.show();
        } else {
            accessibilitytoolbar.hide();
        }
        accessibilitytoolbar.stopEvt(e);
    },
    /**
     * Show the graphic tool-bar
     */
    show: function (e) {
        // check if need to update the cookie
        accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
        // if toolbar content not already create
        if(!document.getElementById("cdu_content")) {
            // create content 
            var contentToolbar = document.createElement("div");
            contentToolbar.setAttribute("id" ,'cdu_content');
            contentToolbar.className = 'cdu_displayN';
            contentToolbar.appendChild(accessibilitytoolbar.createToolbar());
            document.getElementById('cdu_zone').appendChild(contentToolbar);
            // add JS behaviour
            accessibilitytoolbar.createObjectBehaviour();
        }
        document.getElementById("cdu_content").className = "";
        try{
            document.getElementById("uci-onoffswitch").focus();
        }
        catch(e){}
    },

    toolbarDisplayHelp: function (id_parent) {
        if (document.getElementById(id_parent)) {
            // if help was hidden, then display it  
            if(document.getElementById(id_parent).className==='uci_span_help_bulle cdu_n') {
                document.getElementById(id_parent).className='uci_span_help_bulle';
            } else { // otherwise, hide it
                this.toolbarHideHelp(id_parent);
            }
        }
    },

    toolbarHideHelp: function (id_parent) {
        if (document.getElementById(id_parent)) {
            document.getElementById(id_parent).className='uci_span_help_bulle cdu_n';
        }
    },

    /**
     *
     */
    displayHelpNone:function () {
        if (document.getElementById('help')) {
            var element = document.getElementById('help');
            element.parentNode.removeChild(element);
        }
    },

    /**
     * Hide the graphic tool-bar
     */
    hide: function () {
        UciIhm.close_menu(true);
        if(document.getElementById('cdu_close'))
        {
            document.getElementById('cdu_close').style.display = "block";
        }
        document.getElementById("cdu_content").className = 'cdu_displayN';
        if (accessibilitytoolbar.hasDoneSettings) {
            accessibilitytoolbar.saveUserPref();
        } else {
            if (document.location.href.match(new RegExp("#" + accessibilitytoolbar.contentToJumpTo))) {
                document.location.reload();
            }
        }
    },
    
    close: function () {
    	var toolbar = document.getElementById('accessibilitytoolbarGraphic');
        if(toolbar) {
        	document.body.removeChild(toolbar);
        }
        var script = document.getElementById('a11yCSS');
        if(script) {
        	document.head.removeChild(script);
        }        
    },

    /**
     * Adds load to the page
     * tries to add it as soon as the dom has loaded if possible
     * else adds it to the window.onload stack
     * inspired by the discussion at http://dean.edwards.name/weblog/2006/06/again/
     * @param {Function}func : the function to be added
     */
    addOnLoad: function (/*function*/func) {
        var ignited = false;
        /* for Mozilla/Opera9 */
        if (document.addEventListener && !ignited) {
            document.addEventListener("DOMContentLoaded", func, false);
            //Debug.log("addEventListener triggered");
            ignited = true;
        }

        /* For IE not so rusty */
        if (window.attachEvent && !ignited) {
            window.attachEvent('onload', func);
            ignited = true;
        }
        /* end */

        /* for Safari */
        if (/WebKit/i.test(navigator.userAgent) && !ignited) { // sniff
            var _timer = setInterval(function () {
                if (/loaded|complete/.test(document.readyState) && !ignited) {
                    func(); // call the onload handler
                    ignited = true;
                }
            }, 10);
        }

        if (!ignited) {
            var oldonload = window.onload;
            if (typeof window.onload !== 'function') {
                window.onload = func;
            } else {
                window.onload = function () {
                    if (oldonload) {
                        oldonload();
                    }
                    func();
                }
            }
            ignited = true;
        }
    },

    /**
     * Apply selected preference to the current page.
     * @param {Event} e : the event to be processed
     */
    setPref: function (e) {
        var event = e || window.event;
        var target = e.target || window.event.srcElement;
        var prefName = target.getAttribute("name");
        var prefType = target.getAttribute("type");
        var elementLists = null;
        var parent = null;
        if(document.getElementById('uci_validation').className==='cdu_n'){
            document.getElementById('uci_validation').className="";
            document.getElementById('uci_zone_form').style.display="block";
        }
        if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') == 'off'){

        }
        var value = target.value;
        // for checkbox default value when unckecked = false
        if(target.type == "checkbox" && (!target.checked || !target.checked=="checked") )
        {
            value = "false";
        }
        // when the user disable the auto-preview, we need to get back the css with the cookie saved value
        if(prefName==="a11yApercuAuto" && value==="off"){
            accessibilitytoolbar.removePreviewCss();
        }
        accessibilitytoolbar.userPref.set(prefName, value);

        if(accessibilitytoolbar.userPref.get("a11yApercuAuto")!=="off"){
            accessibilitytoolbar.setCSS();
            // jump to content if needed
            accessibilitytoolbar.jumpToContent();
        }
    },

    /**
     * Jump to content if chosen so by the visitor
     */
    jumpToContent: function () {
        if (this.userPref.get("a11yJumpToContent") === "true" && this.contentToJumpTo) {
            if (!document.location.href.match(/#.+$/)) {
                document.location.href = "#" + this.contentToJumpTo;
            }
        } else {
            if (document.location.hash ==='#'+this.contentToJumpTo) {
                document.location.hash = "";
            }
        }
    },

    removeOrStartRemote: function () {
        if (this.userPref.get("a11ySiteWebEnabled") !== "off" && this.userPref.get("a11yMotorModeEnabled") == "true" && this.userPref.get("a11yMotorMode") == "remote") {
            if(this.remotecontrol == null){
                this.startRemote();
            } 
            // FIX 17/01/2017 if remote already launch, but delay update
            else if(this.userPref.get("a11yDelayBeforeClick") && this.userPref.get("a11yDelayBeforeClick") >0 && this.userPref.get("a11yDelayBeforeClick") != this.remotecontrol.hoverTimer) {
              this.remotecontrol.hoverTimer = this.userPref.get("a11yDelayBeforeClick");              
            }
        }else {
            if(this.remotecontrol !== null) {
                this.remotecontrol.stopHelpMotor();
                clearTimeout(this.remotecontrol.timerId);
                this.remotecontrol = null;
            }

        }
    },
    /**
     * If visitor asked for the remotecontrol, then start it (obvious, isn't it)
     */
    startRemote: function () {
        this.remotecontrol = new RemoteControlMode();
        if (this.userPref.get("a11yDelayBeforeClick") && this.userPref.get("a11yDelayBeforeClick") > 0) {
            this.remotecontrol.hoverTimer = this.userPref.get("a11yDelayBeforeClick");
        }
    },

    removeOrStartLoopingMode: function (){
        if (this.userPref.get("a11ySiteWebEnabled") !== "off" && this.userPref.get("a11yMotorModeEnabled") == "true" && this.userPref.get("a11yMotorMode") == "looping") {
            this.startLoopingmode();
        }else{
            if(this.loopingmode !== null){
                this.loopingmode.killLoopingMode();
            }
        }
    },


            /**
     * If visitor wants looping mode ("navigation une touche"), start it
     */
    startLoopingmode: function () {
        // Create a new looping mode manager
        if (this.loopingmode == null) this.loopingmode = new LoopingMode();
        // Set the user prefered position
        if (this.userPref.get("a11yMenuPositionning") == "center") {
            this.loopingmode.setPosition(LoopingMenuPosition.CENTER);
        }
        else this.loopingmode.setPosition(LoopingMenuPosition.NEXT_TO);
        // Set the user prefered speed
        if (this.userPref.get("a11yDelayBeforeLoop") > 0) {
            this.loopingmode.setTimeout(this.userPref.get("a11yDelayBeforeLoop"));
        }
        else this.loopingmode.setTimeout(loopingmode.defaultLoopTimeout);
        // Set the user prefered quick mode step
        if (this.userPref.get("a11yQuickMode") > 0) {
            this.loopingmode.setQuickModeStep(this.userPref.get("a11yQuickMode"));
        }
        else this.loopingmode.setQuickModeStep(this.loopingmode.defaultQuickmode);
        // Start the looping mode
        var axsTb = this;
        setTimeout(function () {
            axsTb.loopingmode.start();
        }, 1000);
    },



    /**
     * Public method that can be used if loopingmode has been stopped
     * (for instance by a flash that has the Flex Confort de Lecture component)
     */
    restartLoopingmode: function () {
        this.loopingmode.restartLoopingmode();
        /* easy does it :) */
    },

    removePreviewCss: function(){
        // get the current stack values
        var currentStackv3value = this.userPref.encode()+'0';
        // put the cookie value into the stackv3
        this.userPref.decode(accessibilitytoolbar.userPref.storedValue);
        this.cleanImgDisabled();
        // then apply the cookie css value
        this.setCSS();  
        // then come back to the current settings
        this.userPref.decode(currentStackv3value);

    },

    /**
     * Set new CSS rules
     * If init mode = true, don't try to custom IHM
     * 1. linearize if need be by destroying all CSS informations
     * 2. add a new STYLE node with the user's preferences
     */
    setCSS: function (init) {   
        var links, i, allElts,  done, mask, doneMask, imageAlt, spanImage, element, image_uci, s = "", indexFrame, theFrame, theFrameDocument, theFrames, fontSizeDef, toolbarContent;
        if (accessibilitytoolbar.userPref.get("a11yToolbarEnable") !== "off") {
            if(document.getElementById('cdu_close'))
            {
                document.getElementById('cdu_close').style.display == 'none';
            }
            toolbarContent = document.getElementById("cdu_content");
            if (!toolbarContent || toolbarContent.className.match(/cdu_displayN/)) {
                accessibilitytoolbar.show();
            }
        }  
        // Remove previous user style
        if (document.getElementById("a11yUserPrefStyle")) {
            document.getElementsByTagName("head")[0].removeChild(document.getElementById("a11yUserPrefStyle"));
            /*
             * remove css to frames if possible
             * Works only if frame src is onto the same domain
             *
             */
            indexFrame = 0;
            theFrames=window.frames;
            //theFrames=document.getElementsByTagName("iframe");
            if(theFrames.length>0)
            {
                while(theFrame = theFrames[indexFrame]){
                    try{
                        //theFrameDocument = theFrame.contentDocument || theFrame.contentWindow.document;
                        theFrameDocument = theFrame.document || theFrame.contentDocument;
                        if(theFrameDocument.getElementsByTagName('head')[0]){
                            theFrameDocument.getElementsByTagName('head')[0].removeChild(theFrameDocument.getElementById("a11yUserPrefStyle"));
                        }
                    } catch(e){}
                    indexFrame++;
                }
            }
        }
        
        accessibilitytoolbar.removeOrStartRemote();
        accessibilitytoolbar.removeOrStartLoopingMode();   
        // Remove linearization if it had been done : 
        // 1. linearize ? -- which is the same as: get rid of all CSS info first
        // if the user remove the option, we need to put back the stylesheets and styles attributes
        if (accessibilitytoolbar.userPref.get("a11yLinearize") === "false" 
          || accessibilitytoolbar.userPref.get("a11ySiteWebEnabled")=="off") {
            if(accessibilitytoolbar.savesStylesheets.length>0)
            {
                for (i = accessibilitytoolbar.savesStylesheets.length - 1; i >= 0; i--) {
                    document.getElementsByTagName('head')[0].insertBefore(accessibilitytoolbar.savesStylesheets[i],document.getElementById('a11yCSS'));
                }
                // then clean the array
                accessibilitytoolbar.savesStylesheets = [];
            }
            if(accessibilitytoolbar.savStyleElmtAtt.length>0)
            {
                i = "";
                for (i in accessibilitytoolbar.savStyleElmtAtt) {
                    accessibilitytoolbar.savStyleElmtAtt[i].setAttribute("style",accessibilitytoolbar.savStyleAttElmt[i]);
                }
                // then clean the array
                accessibilitytoolbar.savStyleElmtAtt = [];
                accessibilitytoolbar.savStyleAttElmt = [];
            }   
        }
        if (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled")!="off"){
            // 1. linearize ? -- which is the same as: get rid of all CSS info first
            if (accessibilitytoolbar.userPref.get("a11yLinearize") !== "false") {
                // delete all the CSS references
                links = document.getElementsByTagName("link");
                for (i = links.length - 1; i >= 0; i--) {
                    if (links[i].rel.match(/stylesheet/i) && (!links[i].id || !links[i].id.match(/a11yCSS/))) {
                        accessibilitytoolbar.savesStylesheets.push(links[i]);
                        links[i].parentNode.removeChild(links[i]);
                    }
                }

                // remove the style attribute
                allElts = accessibilitytoolbar.body.getElementsByTagName("*");
                for (i = 0; i < allElts.length; i++) {
                    if ((allElts[i].className  instanceof String && !allElts[i].className.match(/uci_/) && !allElts[i].className.match(/cdu_/)) ||  (allElts[i].id && !allElts[i].id.match(/uci_/) && !allElts[i].id.match(/cdu_/))) {
                        if(allElts[i].getAttribute("style"))
                        {
                            accessibilitytoolbar.savStyleElmtAtt[i]=allElts[i];
                            accessibilitytoolbar.savStyleAttElmt[i]=allElts[i].getAttribute("style");
                            allElts[i].removeAttribute("style");
                        }
                    }
                }
            }
            
            // generate the CSS instructions
            // 1. do we want bigger fonts?
            // make it proportional to the initial font          
            fontSizeDef = '16px';
            if(window.getComputedStyle) {
              fontSizeDef = window.getComputedStyle(document.getElementsByTagName('html')[0],null).getPropertyValue("font-size") || '16px';
            }
            
            if (accessibilitytoolbar.userPref.get("a11yBigger") !== "keepit") {
                s += "html { font-size:" + accessibilitytoolbar.userPref.get("a11yBigger") * (parseFloat(fontSizeDef)/16) + "% !important; }\n";
            }

            //gestion de l'affichage du mode espacement des mots
            if (accessibilitytoolbar.userPref.get("a11ySpacement") !== "keepit") {
                s += "*{ word-spacing:" + accessibilitytoolbar.userPref.get("a11ySpacement") + "em !important; }\n";
            }

            //gestion de l'affichage du mode espacement des lignes
            if (accessibilitytoolbar.userPref.get("a11yLineSpacement") !== "keepit") {
                s += "*{ line-height:" + accessibilitytoolbar.userPref.get("a11yLineSpacement") + " !important; }\n";
            }

            //gestion de l'espacement des caractères
            if (accessibilitytoolbar.userPref.get("a11yCharSpacement") !== "keepit") {
              if(accessibilitytoolbar.isModern) {
                s += "* :not(.cdu-icon) {letter-spacing:" + accessibilitytoolbar.userPref.get("a11yCharSpacement") + "em !important; }\n";
              } else{
                s += "*{letter-spacing:" + accessibilitytoolbar.userPref.get("a11yCharSpacement") + "em !important; }\n";
              }
            }

            //gestion de la casse : a11yModifCase
            if (accessibilitytoolbar.userPref.get("a11yModifCasse") !== "keepit") {
                s += "*{ text-transform:" + accessibilitytoolbar.userPref.get("a11yModifCasse") + " !important; }\n";
            }

            //gestion de la police d'écriture
            if (accessibilitytoolbar.userPref.get("a11yDyslexyFont")!=='keepit') {
                //load the font face
                if(accessibilitytoolbar.userPref.get("a11yDyslexyFont")==='opendyslexic')
                {
                  if(fontsPath['opendyslexicregular']) {
                    s += "@font-face{font-family: \"opendyslexic\";src: "+ fontsPath['opendyslexicregular'] +";font-style: normal;font-weight: normal;}@font-face{font-family: \"opendyslexic\";src: "+ fontsPath['opendyslexicitalic'] +";font-style: italic;font-weight: normal;}@font-face{font-family: \"opendyslexic\";src: "+ fontsPath['opendyslexicbold'] +";font-weight: bold;font-style: normal;}@font-face{font-family: \"opendyslexic\";src: " + fontsPath['opendyslexicbolditalic'] + ";font-weight: bold;font-style: italic;} ";
                  }
                }
                if(accessibilitytoolbar.isModern) {
                  s += "* :not(.cdu-icon) {font-family:" + accessibilitytoolbar.userPref.get("a11yDyslexyFont") + " !important; }\n";
                } else{
                  s += "*{font-family:" + accessibilitytoolbar.userPref.get("a11yDyslexyFont") + " !important; }\n"; 
                }
            }

            //gestion alignement des texte à gauche
            if (accessibilitytoolbar.userPref.get("a11yLeftText") !== "false") {
                s += "* {text-align:" + accessibilitytoolbar.userPref.get("a11yLeftText") + "!important; }\n";
            }

            //numerotation en mode liste
            if (accessibilitytoolbar.userPref.get("a11yNumerotationList") !== "false") {

                s += "ul, ol  {list-style-position:initial !important; list-style-image: none !important; list-style-type: " + accessibilitytoolbar.userPref.get("a11yNumerotationList") + "!important; }\n";
            }

            //gestion des liens de navigations
            if (accessibilitytoolbar.userPref.get("a11yNavLienEnabled") !== "false"){
                //gestion des liens non visités
                if (accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "border") {
                    s += "a:link  {border: 1px solid !important; color : " + accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                }  else if (accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "bold") {
                    s += "a:link  {font-weight: bold !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                } else if (accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "underline") {
                    s += "a:link  {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                } else {
                    s += "a:link  {color: " + accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                }

                //gestion des liens visités
                if (accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "border") {
                    s += "a:visited {border: 1px solid !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                } else if (accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "bold") {
                    s += "a:visited {font-weight: bold !important; color : " + accessibilitytoolbar.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }else if (accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "underline") {
                    s += "a:visited {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }else {
                    s += "a:visited {color: " + accessibilitytoolbar.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }

                //gestion du lien actif
                if (accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "border") {
                    s += "a:active {border: 2px solid #F16E00!important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {border: 2px solid #F16E00 !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {border: 2px solid #F16E00 !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                } else if (accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "underline") {
                    s += "a:active {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {text-decoration:underline !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                }
                else if (accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "bold") {
                    s += "a:active {font-weight: bold !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {font-weight: bold !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {font-weight: bold !important; color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                }else {
                    s += "a:active {color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {color: " + accessibilitytoolbar.userPref.get("a11yNavLienSelColor") + " !important; }\n";

                }
            }

            //suppression des effets de transparences
            if (accessibilitytoolbar.userPref.get("a11ySupEffetTransp") !== "false") {                            
                s += "*  { opacity: 1 !important; -ms-filter: 'none'; filter: none !important }";                
            }

            //supression des images de fond
            if (accessibilitytoolbar.userPref.get("a11ySupImageFont") !== "false") {
                s += "*  { background-image: none !important; }\n";
            }

            
            var listeimg,i,backGroundColor,fontColor,uminositeFond,LuminositePolice,newStyle;
            //suppression des images de premier plan
            
            if (accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") !== "false" && !document.getElementById("spanImage1")){
                listeimg = document.images;
                for (i = 0; i < listeimg.length; i++) {
                    if(!document.getElementById("spanImage"+i)){
                        if(!(/^uci_(\S+)$/.exec(listeimg[i].parentNode.id))){
                            imageAlt = listeimg[i].alt;
                            spanImage = document.createElement("span");
                            spanImage.setAttribute("id", "spanImage" + i);
                            var newlink = document.createElement('a');
                            if (imageAlt === ""){
                                newlink.textContent = accessibilitytoolbar.get('uci_link_display_picture') + " " + accessibilitytoolbar.get('uci_link_display_picture_no_alt');
                            }else {
                                newlink.textContent = accessibilitytoolbar.get('uci_link_display_picture') + " " + imageAlt;
                            }
                            newlink.href = "#uci_img_" + i;
                            accessibilitytoolbar.uciAttachEvent('click','onclick',newlink,accessibilitytoolbar.activationPicture);
                            spanImage.appendChild(newlink);
                            listeimg[i].parentNode.insertBefore(spanImage, listeimg[i]);
                            listeimg[i].className=listeimg[i].className+" uci_disable_image";        
                        }
                    }
                }
            }else if (accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") == "false"){                
                accessibilitytoolbar.cleanImgDisabled();
            } 
            
            // reading mask
            if (accessibilitytoolbar.userPref.get("a11yMaskEnabled") !== "false") {
                UciMask.settings.thickness=accessibilitytoolbar.userPref.get("a11yMaskEpaisseur");
                if(!accessibilitytoolbar.toolbarMaskInit){
                    UciMask.init();
                    accessibilitytoolbar.toolbarMaskInit = true;
                }
                UciMask.start();
                
            	s += ".topMask  { position: fixed; z-index:2147483646; top:0; left:0; width:100%; height:0; background-color:black; opacity:0.9; }\n";
            	s += ".bottomMask  { position: fixed; z-index:2147483646; bottom:0; left:0; width:100%; height:0; background-color:black; opacity:0.9; }\n";

            }
            // if mask was launch before deactivation kill!
            else if(UciMask.settings.launched)
            {
            	UciMask.maskEventRemove();
            }
                

            //gestion des couleurs
            // 2. add a new STYLE node with the user's preferences only if font color wasn't equal to the background one
            if(!init) {
                document.getElementById('uci_reponses_bigger_quick_set').className = document.getElementById('uci_reponses_bigger_quick_set').className.replace(/ uci_black{0,1}/,"");
                document.getElementById('uci_reponses_couleurpredefinie').className = document.getElementById('uci_reponses_couleurpredefinie').className.replace(/ uci_black{0,1}/,"");            
            }
            if((accessibilitytoolbar.userPref.get("a11yVisualSettings") === "predefined" && accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") !=="keepit") || (accessibilitytoolbar.userPref.get("a11yVisualSettings") === "personnal" && accessibilitytoolbar.userPref.get("a11yFontColor") !== accessibilitytoolbar.userPref.get("a11yBackgroundColor")))
            {
                if (accessibilitytoolbar.userPref.get("a11yVisualSettings") === "predefined") {
                    if(!init) {
                        document.getElementById('uci_message_constraste').style.display= 'none';
                        element = document.getElementById('uci_reponses_bigger_quick_set');
                    }
                    backGroundColor = "#FFF";
                    fontColor = "#000";  
                    
                    var predifinedCombinaisons = {
                    'blackonwhite':{fontColor : '#000',backGroundColor : '#FFF'},
                    'whiteonblack':{fontColor : '#fff',backGroundColor : '#000'},
                    'blueonyellow':{fontColor : '#00F',backGroundColor : '#FF0'},
                    'yellowonblue':{fontColor : '#FF0',backGroundColor : '#00F'},
                    'greenonblack':{fontColor : '#090',backGroundColor : '#000'},
                    'blackongreen':{fontColor : '#000',backGroundColor : '#090'},
                    'blueonwhite':{fontColor : '#00F',backGroundColor : '#FFF'},
                    'whiteonblue':{fontColor : '#FFF',backGroundColor : '#00F'}};
                    if(predifinedCombinaisons[accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings")])
                    {
                      fontColor = predifinedCombinaisons[accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings")].fontColor;
                      backGroundColor = predifinedCombinaisons[accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings")].backGroundColor ;
                      
                    }         
                    /*defect 67 */ 
                    if(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") == "whiteonblack")
                    {       
                        if(!init) {                                
                          document.getElementById('uci_reponses_bigger_quick_set').className = document.getElementById('uci_reponses_bigger_quick_set').className + " uci_black";
                          document.getElementById('uci_reponses_couleurpredefinie').className = document.getElementById('uci_reponses_couleurpredefinie').className + " uci_black";
                        }
                        fontColor = "#FFF";
                        backGroundColor = "#000";
                    }
                }
                else {
                    /**                    
                    http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef                                        
                    */                    
                    LuminositeFond = accessibilitytoolbar.relativeLum(accessibilitytoolbar.userPref.get("a11yBackgroundColor"));
                    
                    LuminositePolice = accessibilitytoolbar.relativeLum(accessibilitytoolbar.userPref.get("a11yFontColor"));

                    //calcul du contraste entre 2 couleurs
                    /*
                      contrast ratio
                        (L1 + 0.05) / (L2 + 0.05), where
                            L1 is the relative luminance of the lighter of the colors, and
                            L2 is the relative luminance of the darker of the colors.
                    */
                    if(!init) {
                        if (((Math.max(LuminositePolice, LuminositeFond) + 0.05)/(Math.min(LuminositePolice, LuminositeFond) + 0.05)) < 4.5 ) {
                            if (document.getElementById('uci_message_constraste').style.display  === 'none'){
                                document.getElementById('uci_message_constraste').style.display = 'block';
                            }
                        } else if (document.getElementById('uci_message_constraste').style.display === 'block'){
                            document.getElementById('uci_message_constraste').style.display= 'none';
                        }
                    }
                    fontColor = accessibilitytoolbar.userPref.get("a11yFontColor");
                    backGroundColor = accessibilitytoolbar.userPref.get("a11yBackgroundColor");                        
                }
                
                s += "* { color:" + fontColor + " !important; }\n";
                s += "fieldset, button, input { border-color:" + fontColor + " !important; }\n";                
                // UPDATE 17/01/2017 add a border with for forms elements to ensure they can be read
                s += "input { border-width: 1px !important; border-style: solid !important}\n";
                s += "td,th {border:1px solid " + fontColor + " !important; padding:.2em !important;}";
                s += "table {border-collapse: collapse !important;}";
                s += "* { background-color:" + backGroundColor + " !important;}"; 
                // FIX 17/01/2017 keep background images, as thay can be used to transmit information like icons or other
                // background:" + backGroundColor + " !important; }\n";
                s += "*:link, *:visited , *:hover { color:" + fontColor + ";}\n";     
                
                document.getElementById('cdu_zone').className = 'uci_a11yVisualPredefinedSettings_enabled';
            }
            else {
                document.getElementById('cdu_zone').className = 'uci_a11yVisualPredefinedSettings_disabled';
            }
        }
            
        // create a new style sheet
        if (s !== "") {
            newStyle = document.createElement("style");
            newStyle.setAttribute("type", "text/css");
            newStyle.id = "a11yUserPrefStyle";
            if (document.all && !window.opera) { // if IE then we can't rely on newStyle.appendChild(textnode)
                newStyle.styleSheet.cssText = s;
            }
            else { // standards-oriented browsers
                newStyle.appendChild(document.createTextNode(s));
            }
            document.getElementsByTagName('head')[0].appendChild(newStyle);
            /*
             * Apply css to frames if possible
             * Works only if frame src is onto the same domain
             *
             */
            indexFrame = 0;
            theFrames=window.frames;
            //frames=document.getElementsByTagName("iframe");
            if(theFrames.length>0)
            {
                while(theFrame = theFrames[indexFrame]){
                    try{                        
                        theFrameDocument = theFrame.document || theFrame.contentDocument;
                        if(theFrameDocument.getElementsByTagName('head')[0]){
                            theFrameDocument.getElementsByTagName('head')[0].appendChild(newStyle.cloneNode(true));
                        }                        
                    } catch(e){}
                    indexFrame++;
                }
            }
        }
    },
    // from HTMLCS : https://github.com/squizlabs/HTML_CodeSniffer/blob/90b8660fbc22698f98f3d50122241c123b3491c0/HTMLCS.js#L820
    /**
     * Calculate relative luminescence for a colour in the sRGB colour profile.
     *
     * Supports rgb() and hex colours. rgba() also supported but the alpha
     * channel is currently ignored.
     * Hex colours can have an optional "#" at the front, which is stripped.
     * Relative luminescence formula is defined in the definitions of WCAG 2.0.
     * It can be either three or six hex digits, as per CSS conventions.
     * It should return a value in the range [0.0, 1.0].
     *
     * @param {String} colour The colour to calculate from.
     *
     * @returns {Number}
     */
    relativeLum:  function(colour) {
        if (colour.charAt) {
            var colour = this.colourStrToRGB(colour);
        }

        var transformed = {};
        for (var x in colour) {
            if (colour[x] <= 0.03928) {
                transformed[x] = colour[x] / 12.92;
            } else {
                transformed[x] = Math.pow(((colour[x] + 0.055) / 1.055), 2.4);
            }
        }//end for

        var lum = ((transformed.red * 0.2126) + (transformed.green * 0.7152) + (transformed.blue * 0.0722));
        return lum;
    },

    /**
     * Convert a colour string to a structure with red/green/blue elements.
     *
     * Supports rgb() and hex colours (3 or 6 hex digits, optional "#").
     * rgba() also supported but the alpha channel is currently ignored.
     * Each red/green/blue element is in the range [0.0, 1.0].
     *
     * @param {String} colour The colour to convert.
     *
     * @returns {Object}
     */
    colourStrToRGB: function(colour) {
        colour = colour.toLowerCase();

        if (colour.substring(0, 3) === 'rgb') {
            // rgb[a](0, 0, 0[, 0]) format.
            var matches = /^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)([^)]*)\)$/.exec(colour);
            colour = {
                red: (matches[1] / 255),
                green: (matches[2] / 255),
                blue: (matches[3] / 255)
            }
        } else {
            // Hex digit format.
            if (colour.charAt(0) === '#') {
                colour = colour.substr(1);
            }

            if (colour.length === 3) {
                colour = colour.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3');
            }

            colour = {
                red: (parseInt(colour.substr(0, 2), 16) / 255),
                green: (parseInt(colour.substr(2, 2), 16) / 255),
                blue: (parseInt(colour.substr(4, 2), 16) / 255)
            };
        }

        return colour;
    },
             
    /*
     * remove the link from pictures disabled
     */
    cleanImgDisabled : function(){
        var i,image_uci, listeimg = document.images;
        for(i = 0; i < listeimg.length; i++) {
            image_uci = /^uci_(\S+)$/.exec(listeimg[i].parentNode.id) ;
            if(!image_uci){
                if(document.getElementById("spanImage"+i)){
                    element = document.getElementById("spanImage"+i);
                    element.parentNode.removeChild(element);
                    listeimg[i].className = listeimg[i].className.replace(/ uci_disable_image{0,1}/,"");
                }
                else // if there is no span, stop the loop
                {
                    i=listeimg.length;
                }
            }
        }
    },
                
    /*
     * reload the toolbar
     */
    reloadToolbar : function(){
        document.getElementById('accessibilitytoolbarGraphic').lang = this.strings.getLocale();
        if(accessibilitytoolbar.userPref.get('a11yLanguage') !== "keepit"){
            accessibilitytoolbar.strings.setMyLocale(accessibilitytoolbar.userPref.get('a11yLanguage'));
        }else{
            accessibilitytoolbar.strings.setLocale();
        }

        if(accessibilitytoolbar.loopingmode !== null){
            accessibilitytoolbar.loopingmode.killLoopingMode();
        }
        if(accessibilitytoolbar.remotecontrol !== null){
            accessibilitytoolbar.remotecontrol.stopHelpMotor();
            clearTimeout(accessibilitytoolbar.remotecontrol.timerId);
            accessibilitytoolbar.remotecontrol = null;
        }
        
        if(accessibilitytoolbar.idLinkModeContainer){            
            // remove the opent link
            var myChildNode = document.getElementById('uci_link');
            myChildNode.parentNode.removeChild(myChildNode);
            // remove the skip link
            var myChildNodeSkip = document.getElementById('idCduSkip');
            myChildNodeSkip.parentNode.removeChild(myChildNodeSkip);
        }
        
        var htmlContent = document.createElement("div");
        htmlContent.setAttribute("id","cdu_zone");         
        if(accessibilitytoolbar.idLinkModeContainer) {
          accessibilitytoolbar.toolbarCreateLink();
        }
        else {
          htmlContent.appendChild(accessibilitytoolbar.toolbarCreateButton());
        }
        document.getElementById('accessibilitytoolbarGraphic').removeChild(document.getElementById('accessibilitytoolbarGraphic').firstChild);
        document.getElementById('accessibilitytoolbarGraphic').appendChild(htmlContent);
        
        accessibilitytoolbar.loadTheToolbar();
    },

    /**
     * Activation de l'image via le lien
     */
    activationPicture : function(e){    
        var target = e.target || e.srcElement;
        var indexImg = target.hash.split("_");        
        document.images[indexImg[2]].className = document.images[indexImg[2]].className.replace(/ uci_disable_image{0,1}/,"");        
        element = document.getElementById("spanImage"+indexImg[2]);
        element.parentNode.removeChild(element);
        accessibilitytoolbar.stopEvt(e);
    },
    
    /**
     * convert rgb color for relative luminance
     *
     *     if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
     *     
     *     if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
     *     
     *     if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
     *     
     *     and RsRGB, GsRGB, and BsRGB are defined as:
     *     
     *         RsRGB = R8bit/255
     *     
     *         GsRGB = G8bit/255
     *     
     *         BsRGB = B8bit/255     
     *          
     */
    conversionColor : function(color){
        color = color/255;
        if(color <= 0.03928){
            color = color/12.92;
        }else{
            color = Math.pow(((color+0.055)/1.055),2.4);
        }
        return(color);
    },

    /**
     * Initialise the toolbar
     */
    init: function () {
        // Bypass the default idLinkModeContainer
        if (window.accessibilitytoolbar_custom && window.accessibilitytoolbar_custom.idLinkModeContainer){
            if(document.getElementById(window.accessibilitytoolbar_custom.idLinkModeContainer)){
                accessibilitytoolbar.idLinkModeContainer = window.accessibilitytoolbar_custom.idLinkModeContainer;
            }
            if( window.accessibilitytoolbar_custom.cssLinkModeClassName){
                accessibilitytoolbar.cssLinkModeClassName = window.accessibilitytoolbar_custom.cssLinkModeClassName;
            }
            if( window.accessibilitytoolbar_custom.idSkipLinkIdLinkMode){
                if(document.getElementById(window.accessibilitytoolbar_custom.idSkipLinkIdLinkMode)){
                    accessibilitytoolbar.idSkipLinkIdLinkMode = window.accessibilitytoolbar_custom.idSkipLinkIdLinkMode;
                }
            }
            if( window.accessibilitytoolbar_custom.cssSkipLinkClassName){
                accessibilitytoolbar.cssSkipLinkClassName = window.accessibilitytoolbar_custom.cssSkipLinkClassName;
            }
        }

        // Bypass the default toolbar theme
        // Check if user preference has finished loading
        if (!accessibilitytoolbar.userPref.isUserPrefLoaded()) {
            setTimeout(accessibilitytoolbar.init, "100");
            return;
        }
        // if a global contentToLookFor is found then we'll use it
        // it has to be declared before our script is inserted
        if (window.accessibilitytoolbar_custom && window.accessibilitytoolbar_custom.contentToLookFor) {
            accessibilitytoolbar.contentToLookFor = accessibilitytoolbar.contentToLookFor.concat(window.accessibilitytoolbar_custom.contentToLookFor);
        }
        // this looks for an anchor named after one of the items in the contentToLookFor array
        for (var i = 0; i < accessibilitytoolbar.contentToLookFor.length; i++) {
            if (document.getElementById(accessibilitytoolbar.contentToLookFor[i])) {
                accessibilitytoolbar.contentToJumpTo = accessibilitytoolbar.contentToLookFor[i];
                break;
            }
        }
        // Check if no main content to look for, search for a tag "main" or a tag with this role attribute
        // if this tag has an id, take it into acount otherwise, set uci_jump_to as the main id
        if(!accessibilitytoolbar.contentToJumpTo) {
          var mainElement  = '';
          if(document.getElementsByTagName('main') && document.getElementsByTagName('main').length > 0) {
            mainElement = document.getElementsByTagName('main')[0]
          }
          else if(document.querySelector('[role="main"]')) {
            mainElement = document.querySelector('[role="main"]');
          }
          if(mainElement) {
            if(mainElement.id) {
              accessibilitytoolbar.contentToJumpTo = mainElement.id;
            }
            else {
              accessibilitytoolbar.contentToJumpTo = 'uci_jump_to';
              mainElement.id = 'uci_jump_to';
            }
          }
        }
        // this creates a few hooks to hold to
        accessibilitytoolbar.head = document.getElementsByTagName('head')[0];
        accessibilitytoolbar.body = document.getElementsByTagName('body')[0];
        accessibilitytoolbar.html = document.getElementsByTagName('html')[0];
        if(document.getElementById('accessibilitytoolbarGraphic')) {
          return false; 
        }
        if(accessibilitytoolbar.userPref.get('a11yLanguage') !== "keepit") {
            accessibilitytoolbar.strings.setMyLocale(accessibilitytoolbar.userPref.get('a11yLanguage'));
        }
        accessibilitytoolbar.firstInitToolbar();
        if (window.accessibilitytoolbar_custom && window.accessibilitytoolbar_custom.callback && typeof window.accessibilitytoolbar_custom.callback ==='function' ){
            window.accessibilitytoolbar_custom.callback();        
        }
    },

    firstInitToolbar: function(){
        // let's create the toolbar
        var style = "#accessibilitytoolbarGraphic {display:none}";
        var newStyle = document.createElement("style");
        newStyle.setAttribute("type", "text/css");
        if (document.all && !window.opera) { // if IE then we can't rely on newStyle.appendChild(textnode)
            newStyle.styleSheet.cssText = style;
        }else { // standards-oriented browsers
            newStyle.appendChild(document.createTextNode(style));
        }
        var _head = document.getElementsByTagName('head')[0];
        // newStyle
        _head.insertBefore(newStyle, _head.firstChild);
        // And now we create the toolbar...
        this.createToolbarCSSLink();
        var d = document.createElement('div');
        d.id = "accessibilitytoolbarGraphic";
        d.lang = this.strings.getLocale();
        d.className = 'cdu_modern_browser';
        accessibilitytoolbar.isModern = true;
        var nav = this.getNavigateur();
        var list = ['MSIE 8.', 'MSIE 7.', 'MSIE 6.'];
        try {
            for(var i = 0, len = list.length; i < len; ++i) {
                var pos = nav.indexOf(list[i]);
                if(pos !== -1) {
                    throw "OldBrowser";
                }
            }
        } catch(e) {
        	accessibilitytoolbar.isModern = false;
          d.className = 'cdu_old_browser';
        }
        var htmlContent = document.createElement("div");
        htmlContent.setAttribute("id","cdu_zone"); 
        if(accessibilitytoolbar.idLinkModeContainer) {
          accessibilitytoolbar.toolbarCreateLink();
        }
        else {
          htmlContent.appendChild(accessibilitytoolbar.toolbarCreateButton());
        }
        d.appendChild(htmlContent);
        this.body.insertBefore(d, this.body.firstChild);
        accessibilitytoolbar.loadTheToolbar();

    },

    loadTheToolbar: function () {
        accessibilitytoolbar.createButtonLinkBehaviour();
        accessibilitytoolbar.cleanImgDisabled();
        // set CSS to the user's settings
        accessibilitytoolbar.setCSS(true);
        // jump to content if needed
        accessibilitytoolbar.jumpToContent();
    },
    
    /**
     * @function isTouchDevice from http://detectmobilebrowser.com/
     * updated on 04/01/2016
     * @returns {boolean}
     */  
    isTouchDevice: function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
        {
            return true;
        }
            return false;
    },
    
    /**
     * @function isInFrame
     * check if Orange Confort+ is displayed into a frame or iframe, then don't display the toolbar
     * @returns {boolean} return true if in frame
     */
     inIframe: function () {
    	try {
            return (window.frameElement);// || window.opener);
            //return (window.parent != window);// || window.opener);
        } catch (e) {
            return true;
        }
    },

    /**
     * Stop the event bubbling and prevent default action
     * @param {Event} e the event
     */
    stopEvt: function (/*Event*/ e) {
        // For W3C Browser
    	if (e && e.stopPropagation) {
            e.stopPropagation();
            e.preventDefault();
        } else if (window.event) {
            window.event.cancelBubble = true;
            window.eventReturnValue = false;
        }
        return false;
    },

    /**
     * Check if parameter is an array
     * @return true if it is, false otherwise
     */
    isArray: function(a) {
        return Object.prototype.toString.call(a) === "[object Array]";
    },

    /**
     * Check if parameter is a string
     * @return true if it is, false otherwise
     */
    isString: function(x) {
        return Object.prototype.toString.call(x) === "[object String]";
    },

    /**
     * src code : http://stackoverflow.com/questions/2946656/advantages-of-createelement-over-innerhtml#answer-2947012
     * make create an html tree
     * desc is an array, 
     * first elmt is the name of the htmltag
     * second one is a object containing attributes/value for this tag
     * all NEXT one if exists are the TextNodeContent OR an array of children OR a nodeElement
     * sample call : 
     *  accessibilitytoolbar.make(["p", {"class":"myPClassname"}, "Here is a ", ["a", { href:"http://www.google.com/" }, "link"], "."]);
     * 
     */
    make: function(desc) {
        if (!this.isArray(desc)) {
            return make.call(this, Array.prototype.slice.call(arguments));
        }

        var name = desc[0];
        var attributes = desc[1];

        var el = document.createElement(name);

        var start = 1;
        if (typeof attributes === "object" && attributes !== null && !this.isArray(attributes)) {
            for (var attr in attributes) {
                // specific boolean attributes checked or selected, if state is false, don't add it
                if((attr != "checked" && attr != "selected") || attributes[attr]) {                    
                    el.setAttribute(attr,attributes[attr]);
                }
            }
            start = 2;
        }

        for (var i = start; i < desc.length; i++) {
            // An array? so build the node
            if (this.isArray(desc[i])) {
                el.appendChild(this.make(desc[i]));
            }
            // A string? add has a textnode
            else if(this.isString(desc[i])) {
                el.appendChild(document.createTextNode(desc[i]));
            }
            // not a string nor an array, so it's a node
            else if(desc[i]) {
                el.appendChild(desc[i]);
            }
        }

        return el;
    },

    makeHelpTpl: function(linkId,spanId,content) {
      return ["a", {href:"#", "class":"uci_link_help_bulle", role:"presentation", id:linkId},
              ["span", {"aria-hidden":"true","class":"cdu-icon cdu-icon-help"}],
              ["span", {"class":"uci_span_help_bulle cdu_n", id:spanId},
                ["p",content],
                ["span", {"aria-hidden":"true","class":"uci_fleche_help_bulle"}]
              ]              
            ];
    },

    makeCouleurTpl: function(ulClass,idOption,currentUserValue,ulId,idLabel) {
      var mesCouleurs = [
        ["#330000","#331900","#333300","#193300","#003300","#003319","#003333","#001933","#000033","#190033","#330033","#330019","#000000"],
        ["#990000","#994C00","#999900","#4C9900","#009900","#00994C","#009999","#004C99","#000099","#4C0099","#990099","#99004C","#404040"],
        ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FF00","#00FF80","#00FFFF","#0080FF","#0000FF","#7F00FF","#FF00FF","#FF007F","#808080"],
        ["#FF6666","#FFB266","#FFFF66","#B2FF66","#66FF66","#66FFB2","#66FFFF","#66B2FF","#6666FF","#B266FF","#FF66FF","#FF66B2","#C0C0C0"],
        ["#FFCCCC","#FFE5CC","#FFFFCC","#E5FFCC","#CCFFCC","#CCFFE5","#CCFFFF","#CCE5FF","#CCCCFF","#E5CCFF","#FFCCFF","#FFCCE5","#FFFFFF"]
      ];
      var tableauCouleurPolice = ["ul", {"class":ulClass, id:ulId, role:"radiogroup", "aria-labelledby":idLabel}]
      var index = 0;
      var indexCouleur = 0;
      var currentLine = "";
      var moreclass = "";
      var current_li;
      for (index = 0; index < mesCouleurs.length; ++index) {
        if(mesCouleurs[index] instanceof Array)
        {
          indexCouleur = 0;
          currentLine = mesCouleurs[index];
          for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {              
              current_li = ["li", {id:idOption+currentLine[indexCouleur], 
                role:"radio", 
                "class":"uci_inline cdu_c uci_couleur_li cdu_c "+moreclass+" "+(currentUserValue === currentLine[indexCouleur] ? "uci_couleur_li_selected" : ""), 
                tabindex:currentUserValue === currentLine[indexCouleur] ? "0" : "-1",
                "aria-checked":currentUserValue === currentLine[indexCouleur] ? "true" : "false",
                style:"background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;"},
                "\u00a0"
                ];
              tableauCouleurPolice.push(current_li)
              moreclass = "";
          }
          moreclass = "uci_couleur_clear";
        }
      }
      current_li = ["span", {"class":"uci_fleche_help_bulle"}];
      tableauCouleurPolice.push(current_li)
      return tableauCouleurPolice;
    },

    makePredefinedCouleurTpl: function() {
      var predifinedCombinaisons = ['keepit','blackonwhite','whiteonblack','blueonyellow','yellowonblue','greenonblack','blackongreen','blueonwhite','whiteonblue'];
      var curCouleur;
      var aCouleur = ["ul", {"class":"padding-left-align uci_clear uci_liste_bton", id:"uci_reponses_couleurpredefinie", role:"radiogroup", "aria-labelledby":"uci_couleur_predefenie_input"}];
      for(var key in predifinedCombinaisons){
        curCouleur = ["li", {id:"uci_a11yVisualPredefinedSettings_"+predifinedCombinaisons[key], role:"radio", "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary"+(key % 2 === 0 ? "":" uci_clear")+" ucibtn-"+predifinedCombinaisons[key]+" "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === predifinedCombinaisons[key] ? "active" :""),
          tabindex:accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === predifinedCombinaisons[key] ? "0" : "-1",
          "aria-checked":accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === predifinedCombinaisons[key] ? "true" : "false"
          },
          accessibilitytoolbar.get('uci_title_color_'+predifinedCombinaisons[key])
        ];
        aCouleur.push(curCouleur);
      }
      return aCouleur;
    },

    /**
     * Start the thing
     */
    start: function () {
      // if we are in a frame doesn't display the button
      if (!document.getElementById || !document.getElementsByTagName || !document.createElement) {
          return;
      }
      /*  clean escape just in case you're using a very rusty browser */
      if (document.getElementById("a11yToolbar")) {
          document.getElementById("a11yToolbar").setAttribute("uci_language", "unknown");
      } else {
          // doesn't work on ie<7 so we test before
          if (window.postMessage) {
              // when the data response was received, launch the init of the toolbar
              // find the locale for correct language  
              this.strings.setLocale();
              this.userPref = new UciStorage();
              if (document.readyState !== 'loading') {
                  this.init();
              }
              else {
                  this.addOnLoad(this.init);
              }
          }
      }
    }    
};