/**
		This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs

		Copyright (C) 2014 - 2023  Orange SA

		Orange Confort+ is free software; you can redistribute it and/or
		modify it under the terms of the GNU General Public License
		as published by the Free Software Foundation; either version 2
		of the License, or (at your option) any later version.

		Orange Confort+ is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details (LICENSE.txt file).
 **/
/*
 * String localization Manager
 */
var traduction = [];

function ToolbarStrings() {
	/**
	 * A {String} reprensenting Locale code
	 * @private
	 */
	var locale = "EN";
	/**
	 * A {String} reprensenting default Locale code
	 * @private
	 */
	var defaultLocale = "EN";
	/**
	 * A {String} force default locale language
	 * @private
	 */
	var ForceDefaultLocale = false;

	/* local to default to - see setLocale() */

	/**
	 * Set in which language the toolbar is supposed to speak
	 * based on html@lang or body@lang
	 * if none is set or none can be found in localeStrings[]
	 * then locale = defaultLocale
	 * @return nothing
	 */
	this.setLocale = function () {
		var htmlTag = document.documentElement;
		/* HTML tag <html> of the page */
		var bodyTag = document.body;
		/* HTML tag <body> of the page */
		this.locale = ((htmlTag.lang) ? htmlTag.lang : (htmlTag.getAttribute("xml:lang")) ? htmlTag.getAttribute("xml:lang") : (bodyTag.lang) ? bodyTag.lang : defaultLocale).substr(0, 2).toUpperCase();
		if (!this.locale || !traduction[this.locale]) {
			this.locale = defaultLocale;
		}
		// if extension mode force default locale not depending from page lang
		if (this.ForceDefaultLocale) {
			this.locale = this.ForceDefaultLocale;
		}
		//Debug.log("locale (final): " + locale);

	};

	/**
	 * Set default locale for Extension mode
	 *
	 */
	this.setForceDefaultLocale = function (defLocal) {
		// filter existing languages
		if (defLocal == "EN" || defLocal == "FR" || defLocal == "ES" || defLocal == "PL") {
			this.ForceDefaultLocale = defLocal;
		}
	};

	/**
	 * Get the locale code used by the tool-bar
	 * @return {String} the locale used
	 */
	this.getLocale = function () {
		return this.locale;
	};

	/**
	 * Fonction permettant de mettre a jour la variable locale concernant la langue
	 * @param {String} str the string reference to language
	 */
	this.setMyLocale = function (langue) {
		this.locale = langue;
	};

	/**
	 * Get the text corresponding to the specified reference in the defined language
	 * @param {String} str the string reference to get
	 * @return {String} txt the desired text
	 */
	this.get = function (str) {
		return traduction[this.locale][str];
	};
}
