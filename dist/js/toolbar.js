/* orange-confort-plus - version 3.1.0 - 12-03-2015
enhance user experience on web sites
 Copyright (C) 2014 - 2015 Orange */
var hebergementDomaine = 'https://comfort.orange.com';
var hebergementFullPath = hebergementDomaine + '/serveur/crossdom/';
// Source: app/js/UciCookie.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_cookie
 * @classdesc Cette classe permettra d'implémenter le cookie
 */
/*global window */
/*global document: false */
/* global alert */
var traduction = [];

function ToolbarStrings() {
    /**
     * A {String} reprensenting Locale code
     * @private
     */
    var locale = "en";
    /**
     * A {String} reprensenting default Locale code
     * @private
     */
    var defaultLocale = "en";
    /* local to default to - see setLocale() */

    /**
     * Set in which language the toolbar is supposed to speak
     * based on html@lang or body@lang
     * if none is set or none can be found in localeStrings[]
     * then locale = defaultLocale
     * @return nothing
     */
    this.setLocale = function () {
        var htmlTag = document.getElementsByTagName("html")[0];
        /* HTML tag <html> of the page */
        var bodyTag = document.getElementsByTagName("body")[0];
        /* HTML tag <body> of the page */        
        this.locale = ((htmlTag.lang) ? htmlTag.lang : (bodyTag.lang) ? bodyTag.lang : defaultLocale).substr(0,2);
        if (!this.locale || !traduction[this.locale]) {
            this.locale = defaultLocale;
        }
        //Debug.log("locale (final): " + locale);
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

/**
 * User pref stackv3 used by the toolbar.<br />


 *  Can retrieve data from PNS or cookie
 @class Collection of user preference
 */

function UciCookie() {
/**
     * Collection of mask used to get value of necessary bits
     * for each encoded variable
     * @private
     */
    var maskMatrixv3, convertMatrixv3, stackv3, couleurs;
    this.couleurs={"00": "#FFFFFF",  "01": "#330000",  "02": "#331900",  "03": "#333300",  "04": "#193300",  "05": "#003300",  "06": "#003319",  "07": "#003333",  "08": "#001933",  "09": "#000033",  "10": "#190033",  "11": "#330033",  "12": "#330019",  "13": "#000000",  "14": "#990000",  "15": "#994C00",  "16": "#999900",  "17": "#4C9900",  "18": "#009900",  "19": "#00994C",  "20": "#009999",  "21": "#004C99",  "22": "#000099",  "23": "#4C0099",  "24": "#990099",  "25": "#99004C",  "26": "#404040",  "27": "#FF0000",  "28": "#FF8000",  "29": "#FFFF00",  "30": "#80FF00",  "31": "#00FF00",  "32": "#00FF80",  "33": "#00FFFF",  "34": "#0080FF",  "35": "#0000FF",  "36": "#7F00FF",  "37": "#FF00FF",  "38": "#FF007F",  "39": "#808080",  "40": "#FF6666",  "41": "#FFB266",  "42": "#FFFF66",  "43": "#B2FF66",  "44": "#66FF66",  "45": "#66FFB2",  "46": "#66FFFF",  "47": "#66B2FF",  "48": "#6666FF",  "49": "#B266FF",  "50": "#FF66FF",  "51": "#FF66B2",  "52": "#C0C0C0",  "53": "#FFCCCC",  "54": "#FFE5CC",  "55": "#FFFFCC",  "56": "#E5FFCC",  "57": "#CCFFCC",  "58": "#CCFFE5",  "59": "#CCFFFF",  "60": "#CCE5FF",  "61": "#CCE5FF",  "62": "#E5CCFF",  "63": "#FFCCFF",  "64": "#FFCCE5",  "65": "#000000"};
    /**
     * Create the var for each color
     */
    this.uci_cookie_create_color = function(paramname){
        for(var key in this.couleurs){
            this.convertMatrixv3[paramname + key]=paramname+this.couleurs[key];
        }
    };
    this.cookieValue = false;
    this.finish = false;
    this.maskMatrixv3 = {
        // Mask Name                | Dec Value
        "a11ySiteWebEnabled":     [46,1],
        "a11yApercuAuto":         [45,1],
        "a11yToolbarEnable":      [44,1],
        "a11yLanguage":           [43,1],
        "a11yJumpToContent":      [42,1],
        "a11yLinearize":          [41,1],
        "a11yBigger":             [40,1],
        "a11yVisualSettings":     [39,1],
        "a11yVisualPredefinedSettings": [38,1],
        "a11yFontColor":          [36,2],
        "a11yBackgroundColor":    [34,2],
        "a11yMotorModeEnabled":   [33,1],
        "a11yMotorMode":          [32,1],
        "a11yDelayBeforeClick":   [31,1],
        "a11yMenuPositionning":   [30,1],
        "a11yDelayBeforeLoop":    [29,1],
        "a11yQuickMode":          [28,1],
        "a11yCharSpacement":      [27,1],
        "a11yDyslexyFontEnabled": [26,1],
        "a11yDyslexyFont":        [25,1],
        "a11yLineSpacement":      [24,1],
        "a11ySpacement":          [23,1],
        "a11yModifCasseEnabled":  [22,1],
        "a11yModifCasse":         [21,1],
        "a11yLeftText":           [20,1],
        "a11yNumerotationList":   [19,1],
        "a11yNavLienEnabled":     [18,1],
        "a11yNavLienSelColor":    [16,2],
        "a11yNavLienSelStyle":    [15,1],
        "a11yNavLienNonVisColor": [13,2],
        "a11yNavLienNonVisStyle": [12,1],
        "a11yNavLienVisColor":    [10,2],
        "a11yNavLienVisStyle":    [9,1],
        "a11yRegleEnabled":       [8,1],
        "a11yRegleVertical" :     [7,1],
        "a11yRegleHorizontal" :   [6,1],
        "a11yRegleColor":         [4,2],
        "a11yRegleEpaisseur" :    [3,1],
        "a11ySupEffetTransp":     [2,1],
        "a11ySupImageFont" :      [1,1],
        "a11ySupImageFirstPlan" : [0,1]
    };

    /**
     * Convertion matrix used to get associated string value corresponding
     * to encoded bit. Each key and value are prefixed by param name in
     * order to ensure bijection as it or when matrix is reverted.
     * @private
     */
    this.convertMatrixv3 = {
        "a11yApercuAuto-0":     "a11yApercuAuto-false",
        "a11yApercuAuto-1":     "a11yApercuAuto-off",
        "a11ySiteWebEnabled-0": "a11ySiteWebEnabled-on",
        "a11ySiteWebEnabled-1": "a11ySiteWebEnabled-off",
        "a11yToolbarEnable-0": "a11yToolbarEnable-off",
        "a11yToolbarEnable-1": "a11yToolbarEnable-on",
        "a11yLanguage-0": "a11yLanguage-keepit",
        "a11yLanguage-1": "a11yLanguage-fr",
        "a11yLanguage-2": "a11yLanguage-en",
        "a11yLanguage-3": "a11yLanguage-es",
        "a11yJumpToContent-0": "a11yJumpToContent-false",
        "a11yJumpToContent-1": "a11yJumpToContent-true",
        "a11yLinearize-0": "a11yLinearize-false",
        "a11yLinearize-1": "a11yLinearize-true",
        //Gestion de la taille de police
        "a11yBigger-0": "a11yBigger-keepit",
        "a11yBigger-1": "a11yBigger-150",
        "a11yBigger-2": "a11yBigger-200",
        "a11yVisualSettings-0": "a11yVisualSettings-predefined",
        "a11yVisualSettings-1": "a11yVisualSettings-personnal",
        "a11yVisualPredefinedSettings-0": "a11yVisualPredefinedSettings-keepit",
        "a11yVisualPredefinedSettings-1": "a11yVisualPredefinedSettings-whiteonblack",
        "a11yVisualPredefinedSettings-2": "a11yVisualPredefinedSettings-blackonwhite",
        "a11yMotorModeEnabled-0": "a11yMotorModeEnabled-false",
        "a11yMotorModeEnabled-1": "a11yMotorModeEnabled-true",
        "a11yMotorMode-0": "a11yMotorMode-remote",
        "a11yMotorMode-1": "a11yMotorMode-looping",
        "a11yDelayBeforeClick-0": "a11yDelayBeforeClick-1",
        "a11yDelayBeforeClick-1": "a11yDelayBeforeClick-2",
        "a11yDelayBeforeClick-2": "a11yDelayBeforeClick-3",
        "a11yDelayBeforeClick-3": "a11yDelayBeforeClick-6",
        "a11yMenuPositionning-0": "a11yMenuPositionning-center",
        "a11yMenuPositionning-1": "a11yMenuPositionning-nextto",
        "a11yDelayBeforeLoop-0": "a11yDelayBeforeLoop-1",
        "a11yDelayBeforeLoop-1": "a11yDelayBeforeLoop-2",
        "a11yDelayBeforeLoop-2": "a11yDelayBeforeLoop-3",
        "a11yDelayBeforeLoop-3": "a11yDelayBeforeLoop-6",
        "a11yQuickMode-0": "a11yQuickMode-2",
        "a11yQuickMode-1": "a11yQuickMode-5",
        "a11yQuickMode-2": "a11yQuickMode-10",
        "a11yCharSpacement-0": "a11yCharSpacement-keepit",
        "a11yCharSpacement-1": "a11yCharSpacement-0.2",
        "a11yCharSpacement-2": "a11yCharSpacement-0.5",
        "a11yDyslexyFontEnabled-0": "a11yDyslexyFontEnabled-false",
        "a11yDyslexyFontEnabled-1": "a11yDyslexyFontEnabled-on",
        "a11yDyslexyFont-0": "a11yDyslexyFont-arial",
        "a11yDyslexyFont-1": "a11yDyslexyFont-opendyslexic",
        "a11yLineSpacement-0": "a11yLineSpacement-keepit",
        "a11yLineSpacement-1": "a11yLineSpacement-2",
        "a11yLineSpacement-2": "a11yLineSpacement-3",
        //gestion de l'espacement des mot
        "a11ySpacement-0": "a11ySpacement-keepit",
        "a11ySpacement-1": "a11ySpacement-0.5",
        "a11ySpacement-2": "a11ySpacement-1",
        //gestion de la casse des mots
        "a11yModifCasseEnabled-0" : "a11yModifCasseEnabled-false",
        "a11yModifCasseEnabled-1" : "a11yModifCasseEnabled-on",
        "a11yModifCasse-0": "a11yModifCasse-capitalize",
        "a11yModifCasse-1": "a11yModifCasse-uppercase",
        "a11yModifCasse-2": "a11yModifCasse-lowercase",
        //gestion de l'apparence ; Alignement a gauche
        "a11yLeftText-0":           "a11yLeftText-false",
        "a11yLeftText-1":           "a11yLeftText-left",
        //gestion de l'apparence ; Numeroatation en mode list
        "a11yNumerotationList-0":   "a11yNumerotationList-false",
        "a11yNumerotationList-1":   "a11yNumerotationList-decimal",
        //gestion des liens
        "a11yNavLienEnabled-0":     "a11yNavLienEnabled-false",
        "a11yNavLienEnabled-1":     "a11yNavLienEnabled-true",
        //gestion liens selectionnées
        "a11yNavLienSelStyle-0":    "a11yNavLienSelStyle-keepit",
        "a11yNavLienSelStyle-1":    "a11yNavLienSelStyle-border",
        "a11yNavLienSelStyle-2":    "a11yNavLienSelStyle-underline",
        "a11yNavLienSelStyle-3":    "a11yNavLienSelStyle-bold",
        //gestion liens Non visités
        "a11yNavLienNonVisStyle-0":    "a11yNavLienNonVisStyle-keepit",
        "a11yNavLienNonVisStyle-1":    "a11yNavLienNonVisStyle-border",
        "a11yNavLienNonVisStyle-2":    "a11yNavLienNonVisStyle-underline",
        "a11yNavLienNonVisStyle-3":    "a11yNavLienNonVisStyle-bold",
        //gestion liens Visités
        "a11yNavLienVisStyle-0":    "a11yNavLienVisStyle-keepit",
        "a11yNavLienVisStyle-1":    "a11yNavLienVisStyle-border",
        "a11yNavLienVisStyle-2":    "a11yNavLienVisStyle-underline",
        "a11yNavLienVisStyle-3":    "a11yNavLienVisStyle-bold",
        //gestion règle
        "a11yRegleEnabled-0":      "a11yRegleEnabled-false",
        "a11yRegleEnabled-1":       "a11yRegleEnabled-true",
        "a11yRegleVertical-0" :     "a11yRegleVertical-false",
        "a11yRegleVertical-1" :     "a11yRegleVertical-true",
        "a11yRegleHorizontal-0" :   "a11yRegleHorizontal-false",
        "a11yRegleHorizontal-1" :   "a11yRegleHorizontal-true",

        "a11yRegleEpaisseur-0" :    "a11yRegleEpaisseur-thin",
        "a11yRegleEpaisseur-1" :    "a11yRegleEpaisseur-medium",
        "a11yRegleEpaisseur-2" :    "a11yRegleEpaisseur-thick",

        "a11ySupEffetTransp-0":     "a11ySupEffetTransp-false",
        "a11ySupEffetTransp-1":     "a11ySupEffetTransp-1",
        "a11ySupImageFont-0" :      "a11ySupImageFont-false",
        "a11ySupImageFont-1" :      "a11ySupImageFont-true",
        "a11ySupImageFirstPlan-0" : "a11ySupImageFirstPlan-false",
        "a11ySupImageFirstPlan-1" :  "a11ySupImageFirstPlan-true",
        /**
         * Reverse the matrix. Keys becomes values and values becomes keys.*/
        reverse: function () {
            var temp = {}, prop;
            for (prop in this) {
                if (prop !== "reverse") {
                    temp[this[prop]] = prop;
                }
            }
            return temp;
        }
    };

    this.uci_cookie_create_color('a11yFontColor-');
    this.uci_cookie_create_color('a11yBackgroundColor-');
    this.uci_cookie_create_color('a11yNavLienSelColor-');
    this.uci_cookie_create_color('a11yNavLienNonVisColor-');
    this.uci_cookie_create_color('a11yNavLienVisColor-');
    this.uci_cookie_create_color('a11yRegleColor-');

    /**
     * User preference stackv3. Used to save user preference.
     * Initialized with default value.
     * @private
     */
    this.stackv3 = {
        "a11yToolbarEnable": "off",
        "a11yLanguage": "keepit",
        "a11yJumpToContent": "false",
        "a11yLinearize": "false",
        "a11yBigger": "keepit",
        "a11yVisualSettings": "predefined",
        "a11yVisualPredefinedSettings": "keepit",
        "a11yFontColor": "#000000",
        "a11yBackgroundColor": "#FFFFFF",
        "a11yMotorModeEnabled": "false",
        "a11yMotorMode": "remote",
        "a11yDelayBeforeClick": "1",
        "a11yMenuPositionning": "center",
        "a11yDelayBeforeLoop": "1",
        "a11yQuickMode": "2",
        "a11yCharSpacement": "keepit",
        "a11yDyslexyFontEnabled": "false",
        "a11yDyslexyFont": "arial",
        "a11yLineSpacement" : "keepit",
        "a11ySpacement": "keepit",
        "a11yModifCasseEnabled": "false",
        "a11yModifCasse" : "capitalize",
        "a11yLeftText":           "false",
        "a11yNumerotationList":   "false",
        "a11yNavLienEnabled":     "false",
        "a11yNavLienSelColor":    "#000000",
        "a11yNavLienSelStyle":    "keepit",
        "a11yNavLienNonVisColor": "#000000",
        "a11yNavLienNonVisStyle": "keepit",
        "a11yNavLienVisColor":    "#000000",
        "a11yNavLienVisStyle":    "keepit",
        "a11yRegleEnabled":       "false",
        "a11yRegleVertical" :     "false",
        "a11yRegleHorizontal" :   "true",
        "a11yRegleColor" :        "#000000",
        "a11yRegleEpaisseur" :    "thin",
        "a11ySupEffetTransp":     "false",
        "a11ySupImageFont" :     "false",
        "a11ySupImageFirstPlan" : "false",
        "a11ySiteWebEnabled" : "on",
        "a11yApercuAuto" : "false"
    };


    /***************************************************Ancienne version du cookie************************************/
    var maskMatrix = {
        // Mask Name            | Dec Value    |  Bin Value
        "a11yJumpToContent": 1            // 00000000000000000000000000000001
        , "a11yLinearize": 2            // 00000000000000000000000000000010
        , "a11yBigger": 12                // 00000000000000000000000000001100
        , "a11yVisualSettings": 48        // 00000000000000000000000000110000
        , "a11yFontColor": 1984            // 00000000000000000000011111000000
        , "a11yBackgroundColor": 63488    // 00000000000000001111100000000000
        , "a11yMotorModeEnabled": 65536    // 00000000000000010000000000000000
        , "a11yMotorMode": 131072        // 00000000000000100000000000000000
        , "a11yDelayBeforeClick": 786432// 00000000000011000000000000000000
        , "a11yMenuPositionning": 1048576// 00000000000100000000000000000000
        , "a11yDelayBeforeLoop": 6291456// 00000000011000000000000000000000
        , "a11yQuickMode": 25165824        // 1100000000000000000000000
    };

    /**
     * Convertion matrix used to get associated string value corresponding
     * to encoded bit. Each key and value are prefixed by param name in
     * order to ensure bijection as it or when matrix is reverted.
     * @private
     */
    var convertMatrix = {
        // Mask+Value                        | Literal Value                        | Bin Mask Value
        // ------------------------------------------------------------------------------------------------------------
        "a11yJumpToContent-0"            :    "a11yJumpToContent-false"
        ,"a11yJumpToContent-1"            :    "a11yJumpToContent-true"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yLinearize-0"                :    "a11yLinearize-false"
        ,"a11yLinearize-2"                :    "a11yLinearize-true"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yBigger-0"                    :    "a11yBigger-keepit"
        ,"a11yBigger-4"                    :    "a11yBigger-150"
        ,"a11yBigger-8"                    :    "a11yBigger-200"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yVisualSettings-0"            :    "a11yVisualSettings-predefined"
        ,"a11yVisualSettings-16"        :    "a11yVisualSettings-personnal"
        ,"a11yVisualSettings-32"        :    "a11yVisualSettings-personnal"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yFontColor-0"                :    "a11yFontColor-#FFFFFF"
        ,"a11yFontColor-64"                :    "a11yFontColor-#000000"
        ,"a11yFontColor-128"            :    "a11yFontColor-#FF0000"
        ,"a11yFontColor-192"            :    "a11yFontColor-#FF0000"
        ,"a11yFontColor-256"            :    "a11yFontColor-#FF8000"
        ,"a11yFontColor-320"            :    "a11yFontColor-#FFB266"
        ,"a11yFontColor-384"            :    "a11yFontColor-#FFFF00"
        ,"a11yFontColor-448"            :    "a11yFontColor-#FFFF00"
        ,"a11yFontColor-512"            :    "a11yFontColor-#B2FF66"
        ,"a11yFontColor-576"            :    "a11yFontColor-#80FF00"
        ,"a11yFontColor-640"            :    "a11yFontColor-#00FF80"
        ,"a11yFontColor-704"            :    "a11yFontColor-#00FF80"
        ,"a11yFontColor-768"            :    "a11yFontColor-#00FFFF"
        ,"a11yFontColor-832"            :    "a11yFontColor-#00FFFF"
        ,"a11yFontColor-896"            :    "a11yFontColor-#0080FF"
        ,"a11yFontColor-960"            :    "a11yFontColor-#0080FF"
        ,"a11yFontColor-1024"            :    "a11yFontColor-#0000FF"
        ,"a11yFontColor-1088"            :    "a11yFontColor-#0000FF"
        ,"a11yFontColor-1152"            :    "a11yFontColor-#000099"
        ,"a11yFontColor-1216"            :    "a11yFontColor-#4C0099"
        ,"a11yFontColor-1280"            :    "a11yFontColor-#7F00FF"
        ,"a11yFontColor-1344"            :    "a11yFontColor-#B266FF"
        ,"a11yFontColor-1408"            :    "a11yFontColor-#FF00FF"
        ,"a11yFontColor-1472"            :    "a11yFontColor-#FF00FF"
        ,"a11yFontColor-1536"            :    "a11yFontColor-#FF66B2"
        ,"a11yFontColor-1600"            :    "a11yFontColor-#FF007F"
        ,"a11yFontColor-1664"            :    "a11yFontColor-#FF0000"
        ,"a11yFontColor-1728"            :    "a11yFontColor-#990000"
        ,"a11yFontColor-1792"            :    "a11yFontColor-#330000"
        ,"a11yFontColor-1856"            :    "a11yFontColor-#330000"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yBackgroundColor-0"        :    "a11yBackgroundColor-#FFFFFF"
        ,"a11yBackgroundColor-2048"        :    "a11yBackgroundColor-#000000"
        ,"a11yBackgroundColor-4096"        :    "a11yBackgroundColor-#FF0000"
        ,"a11yBackgroundColor-6144"        :    "a11yBackgroundColor-#FF0000"
        ,"a11yBackgroundColor-8192"        :    "a11yBackgroundColor-#FF8000"
        ,"a11yBackgroundColor-10240"    :    "a11yBackgroundColor-#FFB266"
        ,"a11yBackgroundColor-12288"    :    "a11yBackgroundColor-#FFFF00"
        ,"a11yBackgroundColor-14336"    :    "a11yBackgroundColor-#FFFF00"
        ,"a11yBackgroundColor-16384"    :    "a11yBackgroundColor-#B2FF66"
        ,"a11yBackgroundColor-18432"    :    "a11yBackgroundColor-#80FF00"
        ,"a11yBackgroundColor-20480"    :    "a11yBackgroundColor-#00FF80"
        ,"a11yBackgroundColor-22528"    :    "a11yBackgroundColor-#00FF80"
        ,"a11yBackgroundColor-24576"    :    "a11yBackgroundColor-#00FFFF"
        ,"a11yBackgroundColor-26624"    :    "a11yBackgroundColor-#00FFFF"
        ,"a11yBackgroundColor-28672"    :    "a11yBackgroundColor-#0080FF"
        ,"a11yBackgroundColor-30720"    :    "a11yBackgroundColor-#0080FF"
        ,"a11yBackgroundColor-32768"    :    "a11yBackgroundColor-#0000FF"
        ,"a11yBackgroundColor-34816"    :    "a11yBackgroundColor-#0000FF"
        ,"a11yBackgroundColor-36864"    :    "a11yBackgroundColor-#000099"
        ,"a11yBackgroundColor-38912"    :    "a11yBackgroundColor-#4C0099"
        ,"a11yBackgroundColor-40960"    :    "a11yBackgroundColor-#7F00FF"
        ,"a11yBackgroundColor-43008"    :    "a11yBackgroundColor-#B266FF"
        ,"a11yBackgroundColor-45056"    :    "a11yBackgroundColor-#FF00FF"
        ,"a11yBackgroundColor-47104"    :    "a11yBackgroundColor-#FF00FF"
        ,"a11yBackgroundColor-49152"    :    "a11yBackgroundColor-#FF66B2"
        ,"a11yBackgroundColor-51200"    :    "a11yBackgroundColor-#FF007F"
        ,"a11yBackgroundColor-53248"    :    "a11yBackgroundColor-#FF0000"
        ,"a11yBackgroundColor-55296"    :    "a11yBackgroundColor-#990000"
        ,"a11yBackgroundColor-57344"    :    "a11yBackgroundColor-#330000"
        ,"a11yBackgroundColor-59392"    :    "a11yBackgroundColor-#330000"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yMotorModeEnabled-0"        :    "a11yMotorModeEnabled-false"
        ,"a11yMotorModeEnabled-65536"    :    "a11yMotorModeEnabled-true"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yMotorMode-0"                :    "a11yMotorMode-remote"
        ,"a11yMotorMode-131072"            :    "a11yMotorMode-looping"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yDelayBeforeClick-0"        :    "a11yDelayBeforeClick-1"
        ,"a11yDelayBeforeClick-262144"    :    "a11yDelayBeforeClick-2"
        ,"a11yDelayBeforeClick-524288"    :    "a11yDelayBeforeClick-3"
        ,"a11yDelayBeforeClick-786432"    :    "a11yDelayBeforeClick-6"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yMenuPositionning-0"        :    "a11yMenuPositionning-center"
        ,"a11yMenuPositionning-1048576"    :    "a11yMenuPositionning-nextto"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yDelayBeforeLoop-0"        :    "a11yDelayBeforeLoop-1"
        ,"a11yDelayBeforeLoop-2097152"    :    "a11yDelayBeforeLoop-2"
        ,"a11yDelayBeforeLoop-4194304"    :    "a11yDelayBeforeLoop-3"
        ,"a11yDelayBeforeLoop-6291456"    :    "a11yDelayBeforeLoop-6"
        // ------------------------------------------------------------------------------------------------------------
        ,"a11yQuickMode-0"                :    "a11yQuickMode-2"
        ,"a11yQuickMode-8388608"        :    "a11yQuickMode-5"
        ,"a11yQuickMode-16777216"        :    "a11yQuickMode-10"
        // ------------------------------------------------------------------------------------------------------------

        /**
         * Reverse the matrix. Keys becomes values and values becomes keys.
         */
        , reverse: function () {
            var temp = {};
            for (var prop in this) {
                if (prop != "reverse") {
                    temp[this[prop]] = prop;
                }
            }
            return temp;
        }
    };

    /**
     * User preference stack. Used to save user preference.
     * Initialized with default value.
     * @private
     */
    var stack = {
        "a11yJumpToContent":"false"
        ,"a11yLinearize":"false"
        ,"a11yBigger":"keepit"
        ,"a11yVisualSettings":"predefined"
        ,"a11yFontColor":"#000000"
        ,"a11yBackgroundColor":"#FFFFFF"
        ,"a11yMotorMode":"remote"
        ,"a11yMotorModeEnabled":"false"
        ,"a11yDelayBeforeClick":"1"
        ,"a11yMenuPositionning":"center"
        ,"a11yDelayBeforeLoop":"1"
        ,"a11yQuickMode":"5"
    };

        /*****************************************************************************************************************/

    /*
     * @constructor init
     */
    this.InitUciCookie = function (cookieValue) {
        this.cookieValue = cookieValue;
        this.readUserPref();
    };

    /**
     * Decode an encoded pref using mask matrix and convert matrix.
     * The encoded pref is a representation of a number in hexadecimal.
     * each mask of the matrix is applied in order to get the corresponding bit
     * of a pref. This value is used as an index with the convert matrix to get
     * the corresponding textual value.
     * @param {String} pref representing a number in
     * hexadecimal representation
     */
    /*jshint validthis:true */
    this.decode = function (/* String*/ pref) {
        var prefName;
        // uniquement si le nombre de caractères du cookie est correct!
        if(pref.length==47)
        {
          for (prefName in this.maskMatrixv3) {
             this.stackv3[prefName]= this.convertMatrixv3[prefName + "-" +pref.substr(this.maskMatrixv3[prefName][0],this.maskMatrixv3[prefName][1])].replace(/.*-/, "");
          }
        }else{
            //ancienne version du cookie
            for (var prefName in maskMatrix) {
                this.stackv3[prefName] = convertMatrix[prefName + "-" + (parseInt(pref, 16) & maskMatrix[prefName])].replace(/.*-/, "");
            }
            // then update the cookie value
            this.updateUserPref();
        }
    };

    /**
     * Encode the user preference stackv3 in a hexadecimal number.
     * Each user preference is used as an index in the convert matrix reversed.
     * the corresponding value is then merged.
     * @return {String} representation of a number in hexadecimal representation
     */
    this.encode = function () {
        var pref = "";
        var tempMatrix = this.convertMatrixv3.reverse();
        var prefName;
        for (prefName in this.maskMatrixv3) {
            if (prefName !== "") {
                // si la pref existe dans le stack sinon 0
                if(prefName in this.stackv3) {
                    pref = tempMatrix[prefName + "-" + this.stackv3[prefName]].replace(/.*-/, "") + pref;
                }
                // on garantie la longeur de la chaine
                else {
                    pref = "0"+pref;
                }
            }
        }
        pref = pref.substring(0,pref.length-1);
        return pref;
    };

    /**
     * Return the value of a given user preference name
     * @param {String} param representing the user preference name
     * @return {String} value : the corresponding user preference value. Could be a string or a number.
     */
    this.get = function (/*String*/param) {
        return (this.stackv3[param] !== null ? this.stackv3[param] : "");
    };

    /**
     * Save the value of a given user preference name into the stackv3
     * @param {String} prefName the user preference name
     * @param {String} prefValue the corresponding user preference value.
     */
    /*jshint validthis:true */
    this.set = function (/* String */prefName, /* String */prefValue) {
        this.stackv3[prefName] = prefValue;
    };

    /**
     * Concatenate user preference into a string with the format : param1=val1&param2=val2....paramX=valX.
     * @return {String} stackv3String : string representing user preference concatenation
     */
    this.stackv3ToString = function () {
        var stackv3String = "";
        var prop;
        for (prop in stackv3) {
            if (prop !== "") {
                stackv3String += prop + "=" + this.stackv3[prop] + "&";
            }
        }
        return stackv3String.replace(/&$/, "");
    };

    /**
     * Read browser cookies and save each user preference into the user
     * preference stackv3.
     */
    this.readUserPref = function () {
        if(this.cookieValue !== false)
        {
            this.decode(this.cookieValue);
        }
        this.finish = true;
    };

    /**
     * Wait for callback completed and user preference stackv3 updated
     * @return {Boolean} true if user preference is loaded, false otherwise.
     */
    this.isUserPrefLoaded = function () {
        return this.finish;
    };

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateUserPref = function() {
        // Update the cdu cookies with the stackv3 value
        var pref = this.encode();
        document.getElementById('id_frame_cookie').src=hebergementFullPath+"saveCookie.php?UsageComfort="+pref+"&origin="+document.location.href;
        var tempMatrix = this.convertMatrixv3.reverse();
        this.cookieValue = ''+pref+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
    };

    /**
     * Update browser cookies in order to save each of user preference value.
     */
    this.updateBlackList = function() {
        // Update the cdu cookies with the stackv3 value
        document.getElementById('id_frame_cookie').src=hebergementFullPath+"saveCookieBlWebSite.php?hostname="+document.location.hostname;
        var tempMatrix = this.convertMatrixv3.reverse();
        this.cookieValue = this.cookieValue.substr(0,this.cookieValue.length-1)+tempMatrix['a11ySiteWebEnabled' + "-" + this.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "");
    };

}
// Source: app/language/en.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
traduction['en']={
  uci_link_hide_toolbar:"hide toolbar",
  uci_alt_logo:"Comfort+",
  uci_serv_name:"Comfort",
  uci_title_fontsize_radio_normal:"default font size",
  uci_title_fontsize_radio_medium:"average font size",
  uci_title_fontsize_radio_large:"large font size",
  uci_title_color_default:"default colors ",
  uci_title_color_blackandwhite:"black text on white background",
  uci_checkbox_disable_apercuauto:"deactivate automatic preview of my settings",
  uci_help_disable_apercuauto:"by default settings preview applies to the site, you can deactivite this feature checking the matching box",
  uci_button_valid:"save my settings",
  uci_button_cancel:"do not save my settings",
  uci_txt_more_settings:"more settings",
  uci_txt_low_settings_display:"less settings",
  uci_txt_low_settings:"close more settings panel",
  uci_txt_disable_cdu:"deactivate Comfort<span class='uci-plus-orange'>+</span> on this site",
  uci_txt_enable_cdu:"activate Comfort<span class='uci-plus-orange'>+</span> on this site",
  uci_title_disable_cdu:"deactivate Comfort+ on this site",
  uci_title_enable_cdu:"activate Comfort+ on this site",
  uci_txt_link_menu_open:"show menu",
  uci_txt_link_menu_close:"hide menu",
  uci_menu_help:"visit general help",
  uci_menu_remove_all:"cancel all settings",
  uci_txt_menu_change_lang_fr:"show this service in french",
  uci_txt_menu_change_lang_en:"show this service in english",
  uci_txt_menu_change_lang_es:"show this service in spanish",
  uci_txt_onglet_typo:"typography",
  uci_txt_onglet_apparence:"layout",
  uci_txt_onglet_color:"colors",
  uci_txt_onglet_motor_help:"behaviour",
  uci_typo_titre_fontsize:"font size",
  uci_typo_titre_wordspacing:"word spacing",
  uci_typo_titre_charspacing:"character spacing",
  uci_typo_titre_linespacing:"line spacing",
  uci_typo_titre_fontfamily:"font face",
  uci_typo_titre_changecase:"text case",
  uci_typo_help_fontfamily:"This feature allows to modify the site defined font to improve reading comfort",
  uci_typo_help_changecase:"This feature allows to modify texts display to meet your needs",
  uci_title_wordspacing_radio_normal:"default word spacing ",
  uci_title_wordspacing_radio_medium:"medium word spacing",
  uci_title_wordspacing_radio_large:"large word spacing",
  uci_title_charspacing_radio_normal:"default character spacing",
  uci_title_charspacing_radio_medium:"medium character spacing",
  uci_title_charspacing_radio_large:"large character spacing",
  uci_title_linespacing_radio_normal:"default line spacing",
  uci_title_linespacing_radio_medium:"medium line spacing",
  uci_title_linespacing_radio_large:"large line spacing",
  uci_title_minfont_radio_normal:"minimal text size 12px",
  uci_title_minfont_radio_medium:"minimal text size 16px",
  uci_title_minfont_radio_large:"minimal text size 18px",
  uci_title_fontfamily_radio_arial:"Arial font face",
  uci_title_fontfamily_radio_opendys:"Open Dyslexic font face",
  uci_changecase_firstlettre:"First Character Of Each Word To Upper Case",
  uci_changecase_toupper:"UPPER CASE TEXT",
  uci_changecase_tolower:"lower case text",
  uci_label_listmode:"cancel layout",
  uci_label_alignleft:"text align left",
  uci_label_putnumonlist:"numbering list elements",
  uci_label_disabletransp:"cancel transparency effects",
  uci_label_disablebgpictures:"disable background images",
  uci_label_disablepppictures:"cancel foreground images",
  uci_link_display_picture:"view this picture:",
  uci_link_display_picture_no_alt:"description not available",
  uci_titre_links:"navigation links appearence",
  uci_txt_notvisited:"links",
  uci_txt_visited:"visited links",
  uci_txt_active:"selected link",
  uci_title_link_notvisited_color:"default links color",
  uci_title_link_visited_color:"visited links color",
  uci_title_link_active_color:"selected link color",
  uci_title_link_notvisited_render:"links formatting",
  uci_title_link_visited_render:"visited links additionnal formatting",
  uci_title_link_active_render:"selected link additionnal formatting",
  uci_link_render_options_default:"by default",
  uci_link_render_options_underline:"underline",
  uci_link_render_options_border:"box",
  uci_link_render_options_bold:"bold",
  uci_title_regle:"show a reading ruler",
  uci_txt_regle_color:"ruler color",
  uci_txt_regle_size:"ruler width ",
  uci_title_regle_thin:"thin",
  uci_title_regle_medium:"medium",
  uci_title_regle_big:"thick",
  uci_label_regle_vertical:"show a vertical ruler",
  uci_label_regle_horizontale:"show a horizontal ruler",
  uci_help_listmode:"This feature replaces site font faces with your default font faces (those defined in your browser or computeur). Moreover, the content is linearised and displayed without columns.",
  uci_help_disabletransp:"This feature allows deactivation of possible transparency effects in the page. This minimises disturbance when reading content.",
  uci_help_disablepppictures:"This feature hides images of the page to avoid reading disturbance. Those are replaced by their text alternatives. A link allows to show the image  on demand.",
  uci_help_links:"This feature allows to define the appearence of links. You can choose color, and formatting parameters.",
  uci_help_regle:"This feature allows to show a horizontal and/or vertical ruler following the mouse pointer that helps reading text. You can set their color and width.",
  uci_color_titre:"combination of preset colors",
  uci_title_color_whiteandblack:"white text on black background",
  uci_color_titre_use_personal:"select personalized colors",
  uci_color_txt_texte:"font color",
  uci_color_txt_background:"background color",
  uci_color_warning_title:"insufficient contrast",
  uci_color_warning_content:"Text and background colors has an insufficient contrast. This may make it difficult to read and cause eyestrain.",
  uci_label_jumptocontent:"always skip to content",
  uci_help_jumptocontent:"allow an automatic positioning on main page content, in particular,  by jumping navigation links",
  uci_enableMotorMode:"motor help",
  uci_label_telecomande:"navigation on hover",
  uci_help_telecomande:"Add vertical scrolling arrows on rollover. Allow also, clickable links activation on rollover after a defined delay",
  uci_legend_delai_clic:"delay before automatic click",
  uci_label_1sec:"1 second",
  uci_label_2sec:"2 seconds",
  uci_label_3sec:"3 seconds",
  uci_label_6sec:"6 seconds",
  uci_label_automove:"automatic selection of elements",
  uci_help_automove:"Select clickable elements one after the other. Press the ",
  uci_legend_menupos:"menu position",
  uci_label_centeredmenu:"center on the page",
  uci_label_nearelemtmenu:"next to the selected item",
  uci_legend_time_before_sel:"elements selection delay",
  uci_help_quickmode:"(number of \253 ignored \273 elements between to selected elements)",
  uci_legend_pasquickmode:"quick mode steps",
  uci_label_2par2:"1",
  uci_label_5par5:"4",
  uci_label_10par10:"9",
  uci_securityCookieChangeAlert:"Warning",
  uci_securityCookieChange:"Comfort<span class='uci-plus-orange'>+</span> service has to store your comfort settings.",
  uci_securityCookieChangeLinkPage:"Configure my browser now to authorize Comfort<span class='uci-plus-orange'>+</span> service to store my comfort settings.",
  uci_doClick:"Click",
  uci_loopActivable:"Navigate through items",
  uci_loopActivableQuick:"Navigate quickly through items",
  uci_loopBackward:"Navigate backwards",
  uci_stopLoop:"Pause navigation",
  uci_closeButton:"close",
  uci_modif_not_saved:"Your unsaved settings will be lost, do you want to continue ?",
  uci_radio_default:"default",
  uci_radio_medium:"medium",
  uci_radio_large:"large",
  uci_service_disabled:"disabled"
};
// Source: app/language/es.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
traduction['es']={
  uci_link_hide_toolbar:"esconder el panel",
  uci_alt_logo:"Confort+",
  uci_serv_name:"Confort",
  uci_title_fontsize_radio_normal:"tama\361o de letra normal",
  uci_title_fontsize_radio_medium:"tama\361o de letra medio",
  uci_title_fontsize_radio_large:"tama\361o de letra grande",
  uci_title_color_default:"colores por defecto",
  uci_title_color_blackandwhite:"texto negro en fondo blanco",
  uci_checkbox_disable_apercuauto:"desactivar la vista previa autom\341tica de mis ajustes",
  uci_help_disable_apercuauto:"Por defecto la vista previa de los ajustes se aplica autom\341ticamente al sitio, puedes desactivar esta funcionalidad punteando la casilla asociada.",
  uci_button_valid:"memorizar mis ajustes",
  uci_button_cancel:"no memorizar mis ajustes",
  uci_txt_more_settings:"m\341s ajustes",
  uci_txt_low_settings_display:"menos ajustes",
  uci_txt_low_settings:"cerrar el panel m\341s ajustes",
  uci_txt_disable_cdu:"desactivar Confort<span class='uci-plus-orange'>+</span> para este sitio",
  uci_txt_enable_cdu:"activar Confort<span class='uci-plus-orange'>+</span> para este sitio",
  uci_title_disable_cdu:"desactivar Confort+ para este sitio",
  uci_title_enable_cdu:"activar Confort+ para este sitio",
  uci_txt_link_menu_open:"mostrar men\372",
  uci_txt_link_menu_close:"ocultar men\372",
  uci_menu_help:"consultar  ayuda general",
  uci_menu_remove_all:"anular todos los ajustes",
  uci_txt_menu_change_lang_fr:"mostrar el servicio en franc\351s",
  uci_txt_menu_change_lang_en:"mostrar el servicio en ingles",
  uci_txt_menu_change_lang_es:"mostrar el servicio en espa\361ol",
  uci_txt_onglet_typo:"tipograf\355a",
  uci_txt_onglet_apparence:"apariencia",
  uci_txt_onglet_color:"colores",
  uci_txt_onglet_motor_help:"comportamiento",
  uci_typo_titre_fontsize:"tama\361o del texto",
  uci_typo_titre_wordspacing:"espacio entre palabras",
  uci_typo_titre_charspacing:"espacio entre caracteres",
  uci_typo_titre_linespacing:"espacio interlineal",
  uci_typo_titre_fontfamily:"tipo de fuente",
  uci_typo_titre_changecase:"alternar MAY/min",
  uci_typo_help_fontfamily:"Este comando permite modificar la fuente definida por el sitio web, con el fin de mejorar la Confort<span class='uci-plus-orange'>+</span>",
  uci_typo_help_changecase:"Este comando permite modificar la presentaci\363n del texto seg\372n tus necesidades",
  uci_title_wordspacing_radio_normal:"espacio normal entre palabras",
  uci_title_wordspacing_radio_medium:"espacio medio entre palabras",
  uci_title_wordspacing_radio_large:"espacio grande entre palabras",
  uci_title_charspacing_radio_normal:"espacio normal entre caracteres",
  uci_title_charspacing_radio_medium:"espacio medio entre caracteres",
  uci_title_charspacing_radio_large:"espacio grande entre caracteres",
  uci_title_linespacing_radio_normal:"espacio normal entre lineas",
  uci_title_linespacing_radio_medium:"espacio medio entre lineas",
  uci_title_linespacing_radio_large:"espacio grande entre lineas",
  uci_title_minfont_radio_normal:"tama\361o m\355nimo de letra 12 ptos",
  uci_title_minfont_radio_medium:"tama\361o m\355nimo de letra 16 ptos",
  uci_title_minfont_radio_large:"tama\361o m\355nimo de letra 18 ptos",
  uci_title_fontfamily_radio_arial:"tipo de letra Arial",
  uci_title_fontfamily_radio_opendys:"tipo de letra Open Dyslexic",
  uci_changecase_firstlettre:"primera letra de cada palabra en May\372scula",
  uci_changecase_toupper:"TEXTO EN MAYUSCULAS",
  uci_changecase_tolower:"texto en min\372sculas",
  uci_label_listmode:"desactiva el dise\361o de la p\341gina ",
  uci_label_alignleft:"alinea  textos a la izquierda",
  uci_label_putnumonlist:"numeriza los esquemas",
  uci_label_disabletransp:"anula  efectos de transparencia",
  uci_label_disablebgpictures:"anula im\341genes de fondo",
  uci_label_disablepppictures:"anula im\341genes del primer plano",
  uci_link_display_picture:"visualizar la imagen :",
  uci_link_display_picture_no_alt:"descripci\363n no disponible",
  uci_titre_links:"apariencia enlaces de navegaci\363n ",
  uci_txt_notvisited:"enlaces",
  uci_txt_visited:"enlaces consultados",
  uci_txt_active:"enlace seleccionado",
  uci_title_link_notvisited_color:"color de enlaces por defecto",
  uci_title_link_visited_color:"color de enlaces consultados",
  uci_title_link_active_color:"color de enlace seleccionado",
  uci_title_link_notvisited_render:"formato de enlaces",
  uci_title_link_visited_render:"formato complementario de enlaces consultados",
  uci_title_link_active_render:"formato complementario del enlace seleccioan",
  uci_link_render_options_default:"por defecto ",
  uci_link_render_options_underline:"subrayado",
  uci_link_render_options_border:"encuadrado",
  uci_link_render_options_bold:"en negrita",
  uci_title_regle:"visualizar regla de lectura",
  uci_txt_regle_color:"color de la regla",
  uci_txt_regle_size:"espesor  de la regla",
  uci_title_regle_thin:"fina",
  uci_title_regle_medium:"normal",
  uci_title_regle_big:"espesa",
  uci_label_regle_vertical:"visualizar regla vertical",
  uci_label_regle_horizontale:"visualizar regla horizontal",
  uci_help_listmode:"Este comando reemplaza el tipo de letra del sitio por las tuyas por defecto (aquellas que has definido en tu ordenador o tu navegador). Adem\341s el contenido se vuelve completamente lineal y sin columnas.",
  uci_help_disabletransp:"Este comando desactiva los efectos de transparencia eventuales de la p\341gina, limitando as\355 las perturbaciones de lectura del contenido",
  uci_help_disablepppictures:"Este comando suprime la visualizaci\363n de im\341genes en la p\341gina y son reemplazadas por sus alternativas textuales. Un enlace permite visualizar las im\341genes a petici\363n ",
  uci_help_links:"Este comando define la apariencia de los enlaces en la p\341gina. Puedes elegir el color y el formato de los enlaces",
  uci_help_regle:"Este comando muestra una regla horizontal y/o vertical que sigue el foco del rat\363n para facilitar la lectura del texto. \nPuedes elegir el color y el espesor de las reglas.",
  uci_color_titre:"combinaci\363n de colores predefinidos",
  uci_title_color_whiteandblack:"texto blanco y fondo negro",
  uci_color_titre_use_personal:"selecionar colores personalizados",
  uci_color_txt_texte:"color de texto",
  uci_color_txt_background:"color de fondo",
  uci_color_warning_title:"contrate insuficiente",
  uci_color_warning_content:"Los colores de texto y fondo tienen un contraste insuficiente, en consecuencia la lectura puede ser inconfortable y provocar un cansancio visual.\nTe recomendamos modificar la combinaci\363n de colores",
  uci_label_jumptocontent:"saltar siempre al contenido principal",
  uci_help_jumptocontent:"Permite posicionarse autom\341ticamente en el contenido principal de la p\341gina, saltandose en particular todos los enlaces de navegaci\363n ",
  uci_enableMotorMode:"asistencia motriz",
  uci_label_telecomande:"navegaci\363n con clic autom\341tico",
  uci_help_telecomande:"A\361ade flechas verticales para recorrer la p\341gina, activadas al pasar el rat\363n por encima.\nActiva los elementos clicables al pasar el rat\363n por encima, y con un retraso predefinido en los ajustes",
  uci_legend_delai_clic:"temporizaci\363n del clic autom\341tico",
  uci_label_1sec:"1 segundo",
  uci_label_2sec:"2 segundos",
  uci_label_3sec:"3 segundos",
  uci_label_6sec:"6 segundos",
  uci_label_automove:"navegaci\363n con selecci\363n autom\341tica de elementos",
  uci_help_automove:"Selecciona uno tras otro los elementos clicables\nPresiona la tecla Entrar o Espacio para abrir el men\372 que te permite activar el elemento seleccionado, o bien modificar el tipo de recorrido de la p\341gina (r\341pido, atr\341s, parar)",
  uci_legend_menupos:"posici\363n del men\372",
  uci_label_centeredmenu:"centrar en la p\341gina",
  uci_label_nearelemtmenu:"al lado del elemento seleccionado",
  uci_legend_time_before_sel:"temporizaci\363n de selecci\363n de elementos",
  uci_help_quickmode:"(cantidad de elementos \253 ignorados \273 entre 2 elementos seleccionados)",
  uci_legend_pasquickmode:"pasos de modo r\341pido",
  uci_label_2par2:"1",
  uci_label_5par5:"4",
  uci_label_10par10:"9",
  uci_securityCookieChangeAlert:"Atenci\363n ",
  uci_securityCookieChange:"El servicio Confort<span class='uci-plus-orange'>+</span> necesita memorizar tus ajustes",
  uci_securityCookieChangeLinkPage:"Configurar mi navegador ahora, para autorizar Confort<span class='uci-plus-orange'>+</span> a salvaguardar mis preferencias",
  uci_doClick:"Pulsar",
  uci_loopActivable:"Recorrer la p\341gina",
  uci_loopActivableQuick:"Navegar r\341pidamente",
  uci_loopBackward:"Navegar hacia atr\341s",
  uci_stopLoop:"Parar la navegaci\363n",
  uci_closeButton:"cerrar",
  uci_modif_not_saved:"Los ajustes no memorizados se perder\341n \277 deseas proseguir esta acci\363n ?",
  uci_radio_default:"normal",
  uci_radio_medium:"medio",
  uci_radio_large:"grande",
  uci_service_disabled:"desactivado"
};
// Source: app/language/fr.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
traduction['fr']={
  uci_link_hide_toolbar:"masquer la barre",
  uci_alt_logo:"Confort+",
  uci_serv_name:"Confort",
  uci_title_fontsize_radio_normal:"taille de police normale",
  uci_title_fontsize_radio_medium:"taille de police moyenne",
  uci_title_fontsize_radio_large:"taille de police grande",
  uci_title_color_default:"couleurs par d\351faut",
  uci_title_color_blackandwhite:"texte en noir sur fond blanc",
  uci_checkbox_disable_apercuauto:"d\351sactiver l'aper\347u automatique de mes r\351glages",
  uci_help_disable_apercuauto:"Par d\351faut l\47aper\347u des r\351glages s\47applique automatiquement au site, vous pouvez d\351sactiver cette fonctionnalit\351 en cochant la case associ\351e.",
  uci_button_valid:"enregistrer mes r\351glages",
  uci_button_cancel:"ne pas enregistrer mes r\351glages",
  uci_txt_more_settings:"plus de r\351glages",
  uci_txt_low_settings_display:"moins de r\351glages",
  uci_txt_low_settings:"fermer la zone plus de r\351glages",
  uci_txt_disable_cdu:"d\351sactiver Confort<span class='uci-plus-orange'>+</span> pour ce site",
  uci_txt_enable_cdu:"activer Confort<span class='uci-plus-orange'>+</span> pour ce site",
  uci_title_disable_cdu:"d\351sactiver Confort+ pour ce site",
  uci_title_enable_cdu:"activer Confort+ pour ce site",
  uci_txt_link_menu_open:"afficher le menu",
  uci_txt_link_menu_close:"masquer le menu",
  uci_menu_help:"consulter l\47aide g\351n\351rale",
  uci_menu_remove_all:"annuler tous les r\351glages",
  uci_txt_menu_change_lang_fr:"afficher le service en fran\347ais",
  uci_txt_menu_change_lang_en:"afficher le service en anglais",
  uci_txt_menu_change_lang_es:"afficher le service en espagnol",
  uci_txt_onglet_typo:"typographie",
  uci_txt_onglet_apparence:"agencement",
  uci_txt_onglet_color:"couleurs",
  uci_txt_onglet_motor_help:"comportement",
  uci_typo_titre_fontsize:"taille du texte ",
  uci_typo_titre_wordspacing:"espacement entre les mots ",
  uci_typo_titre_charspacing:"espacement entre les caract\350res",
  uci_typo_titre_linespacing:"espacement entre les lignes",
  uci_typo_titre_fontfamily:"police de caract\350re",
  uci_typo_titre_changecase:"casse du texte",
  uci_typo_help_fontfamily:"Permet de modifier la police d\351finie par le site internet afin d\47am\351liorer le confort lors de la lecture.",
  uci_typo_help_changecase:"Permet de modifier l\47affichage des textes en fonction de vos besoins.",
  uci_title_wordspacing_radio_normal:"espace normal entre les mots",
  uci_title_wordspacing_radio_medium:"espace moyen entre les mots",
  uci_title_wordspacing_radio_large:"espace grand entre les mots",
  uci_title_charspacing_radio_normal:"espace normal entre les caract\350res",
  uci_title_charspacing_radio_medium:"espace moyen entre les caract\350res",
  uci_title_charspacing_radio_large:"espace grand entre les caract\350res",
  uci_title_linespacing_radio_normal:"espace normal entre les lignes",
  uci_title_linespacing_radio_medium:"espace moyen entre les lignes",
  uci_title_linespacing_radio_large:"espace grand entre les lignes",
  uci_title_minfont_radio_normal:"taille minimale du texte 12px",
  uci_title_minfont_radio_medium:"taille minimale du texte 16px",
  uci_title_minfont_radio_large:"taille minimale du texte 18px",
  uci_title_fontfamily_radio_arial:"police de caract\350res Arial",
  uci_title_fontfamily_radio_opendys:"police de caract\350res Open Dyslexic",
  uci_changecase_firstlettre:"Premi\350re Lettre De Chaque Mot En Majuscule",
  uci_changecase_toupper:"TEXTE EN MAJUSCULE",
  uci_changecase_tolower:"texte en minuscule",
  uci_label_listmode:"suppression de la mise en page",
  uci_label_alignleft:"alignement des textes \340 gauche ",
  uci_label_putnumonlist:"num\351rotation des \351l\351ments de liste",
  uci_label_disabletransp:"suppression des effets de transparence",
  uci_label_disablebgpictures:"suppression des images de fond",
  uci_label_disablepppictures:"suppression des images de premier plan",
  uci_link_display_picture:"voir cette image :",
  uci_link_display_picture_no_alt:"description non disponible",
  uci_titre_links:"apparence des liens de navigation",
  uci_txt_notvisited:"liens",
  uci_txt_visited:"liens visit\351s",
  uci_txt_active:"lien s\351lectionn\351",
  uci_title_link_notvisited_color:"couleur des liens par d\351faut",
  uci_title_link_visited_color:"couleur des liens visit\351s",
  uci_title_link_active_color:"couleur du lien s\351lectionn\351",
  uci_title_link_notvisited_render:"mise en forme des liens",
  uci_title_link_visited_render:"mise en forme compl\351mentaire des liens visit\351s",
  uci_title_link_active_render:"mise en forme compl\351mentaire du lien s\351lectionn\351",
  uci_link_render_options_default:"par d\351fault",
  uci_link_render_options_underline:"soulign\351",
  uci_link_render_options_border:"encadr\351",
  uci_link_render_options_bold:"mis en gras",
  uci_title_regle:"affichage d\47une r\350gle de lecture",
  uci_txt_regle_color:"couleur de la r\350gle",
  uci_txt_regle_size:"\351paisseur de la r\350gle",
  uci_title_regle_thin:"fine",
  uci_title_regle_medium:"normale",
  uci_title_regle_big:"\351paisse",
  uci_label_regle_vertical:"affichage d\47une r\350gle verticale",
  uci_label_regle_horizontale:"affichage d\47une r\350gle horizontale",
  uci_help_listmode:"Cette commande remplace les polices du site par vos polices par d\351faut (celles que vous avez d\351finies dans votre ordinateur ou votre navigateur). De plus le contenu devient compl\350tement lin\351aire et sans colonnes.",
  uci_help_disabletransp:"Cette commande permet de d\351sactiver les effets de transparence \351ventuels de la page. Cela limite les perturbations lors de la lecture du contenu.",
  uci_help_disablepppictures:"Cette commande permet de supprimer l\47affichage des images dans la page qui peuvent g\352ner la lecture. Celles-ci sont alors remplac\351es par leurs alternatives textuelles. Un lien permet d\47afficher l\47image \340 la demande.",
  uci_help_links:"Cette commande permet de d\351finir l\47apparence des liens dans la page. Vous pouvez choisir la couleur et la mise en forme de ceux-ci.",
  uci_help_regle:"Cette commande permet d\47afficher une r\350gle horizontale et/ou verticale qui suit le curseur souris ce qui facilite la lecture du texte. Vous pouvez choisir la couleur et l\47\351paisseur de celles-ci.",
  uci_color_titre:"combinaison de couleurs pr\351d\351finies",
  uci_title_color_whiteandblack:"texte blanc sur fond noir",
  uci_color_titre_use_personal:"combinaison de couleurs personnalis\351es",
  uci_color_txt_texte:"couleur du texte",
  uci_color_txt_background:"couleur du fond",
  uci_color_warning_title:"contraste insuffisant ",
  uci_color_warning_content:"La couleur du texte pr\351sente un contraste insuffisant avec la couleur du fond. Ceci risque de rendre la lecture inconfortable et de provoquer une fatigue visuelle. \nNous vous recommandons de modifier la combinaison de couleurs.",
  uci_label_jumptocontent:"aller automatiquement au contenu ",
  uci_help_jumptocontent:"Permet de se positionner automatiquement sur le contenu principal de la page, en sautant notamment tous les liens de navigation.",
  uci_enableMotorMode:"aide motrice",
  uci_label_telecomande:"navigation par pointage",
  uci_help_telecomande:"Ajoute des fl\350ches de d\351filement vertical activ\351es au survol de la souris.\nPermet aussi d\47activer les \351l\351ments cliquables au survol de la souris apr\350s le d\351lai param\351tr\351.",
  uci_legend_delai_clic:"d\351lai avant le clic automatique",
  uci_label_1sec:"1 seconde",
  uci_label_2sec:"2 secondes",
  uci_label_3sec:"3 secondes",
  uci_label_6sec:"6 secondes",
  uci_label_automove:"s\351lection automatique des \351l\351ments",
  uci_help_automove:"S\351lectionne l\47un apr\350s l\47autre les \351l\351ments cliquables.\nAppuyez sur la touche entr\351e ou espace pour ouvrir le menu qui permet soit d\47activer l\47\351l\351ment s\351lectionn\351, soit de modifier le mode de parcours (rapide, arri\350re, arr\352ter)",
  uci_legend_menupos:"position du menu",
  uci_label_centeredmenu:"centr\351 sur la page",
  uci_label_nearelemtmenu:"\340 c\364t\351 de l'\351l\351ment s\351lectionn\351",
  uci_legend_time_before_sel:"d\351lai de s\351lection des \351l\351ments",
  uci_help_quickmode:"(nombre d\47\351l\351ments \253 ignor\351s \273 entre deux \351l\351ments s\351lectionn\351s)",
  uci_legend_pasquickmode:"pas du mode rapide",
  uci_label_2par2:"1",
  uci_label_5par5:"4",
  uci_label_10par10:"9",
  uci_securityCookieChangeAlert:"Avertissement",
  uci_securityCookieChange:"Le service Confort<span class='uci-plus-orange'>+</span> a besoin de m\351moriser vos r\351glages.",
  uci_securityCookieChangeLinkPage:"Configurer mon navigateur maintenant, pour autoriser Confort<span class='uci-plus-orange'>+</span> a m\351moriser mes r\351glages",
  uci_doClick:"Cliquer",
  uci_loopActivable:"Parcourir la page",
  uci_loopActivableQuick:"Naviguer rapidement",
  uci_loopBackward:"Naviguer en arri\351re",
  uci_stopLoop:"Arr\352ter la  navigation",
  uci_closeButton:"fermer",
  uci_modif_not_saved:"Vos r\351glages en cours ne seront pas sauvegard\351s, souhaitez-vous pousuivre cette action?",
  uci_radio_default:"normal",
  uci_radio_medium:"moyen",
  uci_radio_large:"grand",
  uci_service_disabled:"d\351sactiv\351"
};
// Source: app/js/UciAideMotrice.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet aide motrice
 * @property {string}  attr_aide_motrice : the string containt hinner html for aide motrice.
 */
/*global window */
/*global document: false */
/* global alert */
function UciAideMotrice() {
/**
     * @property
     * @private
     */
    var attr_aide_motrice, attr_onglet;
    attr_aide_motrice = "";
    /*
     * @constructor
     */
    UciAideMotrice.prototype.InitUciAideMotrice = function () {
        attr_aide_motrice = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_aidemotrice'>"; //uci_contenu_onglet_aidemotrice
        attr_aide_motrice += "<div id='setting-bloc-content'>";
        attr_aide_motrice += "<input type='checkbox' value='true' name='a11yJumpToContent' id='a11yJumpToContent'"+(accessibilitytoolbar.userPref.get("a11yJumpToContent") === "true" ? " checked='checked'" : "") + ">";
        attr_aide_motrice += "<label for='a11yJumpToContent'>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_jumptocontent');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<a href='#' onblur=\"accessibilitytoolbar.toolbarHideHelp('uci_help_jumptocontent');\" onclick=\"accessibilitytoolbar.toolbarDisplayHelp('uci_help_jumptocontent');return false;\" class='uci_link_help_bulle' role='presentation'><span class='uci_span_help_bulle cdu_n' id='uci_help_jumptocontent'><p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_jumptocontent');
        attr_aide_motrice += "</p></span></a>";
        attr_aide_motrice += "</div>"; //setting-bloc-content
/**********************************************Gestion réglage motor*********************************************************/
        attr_aide_motrice += "<div id='uci_div_motor'>";
        attr_aide_motrice += "<input onclick=\"UciAideMotrice.activate_aide_motrice();\" type='checkbox' value='true' name='a11yMotorModeEnabled'  id='a11yMotorModeEnabled' "+(accessibilitytoolbar.userPref.get("a11yMotorModeEnabled") === "true" ? " checked='checked'" : "") + ">";
        attr_aide_motrice += "<label for='a11yMotorModeEnabled'>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_enableMotorMode');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "</div>"; //uci_div_motor
        if (accessibilitytoolbar.userPref.get("a11yMotorModeEnabled") === "true") {
            attr_aide_motrice += "<div id='uci_motor_general' style='display:block'>";
        } else {
            attr_aide_motrice += "<div id='uci_motor_general' style='display:none'>";
        }
/******************************************************Navigation par pointage ******************************************************************/
        attr_aide_motrice += "<div id='uci_motor_div_left'>";
        attr_aide_motrice += "<input type='radio' name='a11yMotorMode' id='a11yMotorMode-remote' value='remote' ";
        attr_aide_motrice += accessibilitytoolbar.userPref.get("a11yMotorMode") === "remote" ? "checked='checked'" : "";
        attr_aide_motrice += "/>";
        attr_aide_motrice += "<label for='a11yMotorMode-remote'>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_label_telecomande');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_telecomande');
        attr_aide_motrice += '</p>';
        
        attr_aide_motrice += "<div id='uci_motor_mode' class='setting-sub-container'>";
        attr_aide_motrice += "<p >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_delai_clic');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_DelayBeforeLoop' role='radiogroup' aria-labelledby='a11yDelayBeforeLoop0'>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_1' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "1" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_1sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_3' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "3" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_3sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeLoop_6' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeLoop") === "6" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_6sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";
        attr_aide_motrice += "</div>"; //uci_motor_mode
        
        attr_aide_motrice += "</div>"; //uci_motor_div_left
/******************************************************Fin Navigation par pointage ******************************************************************/

/******************************************************Parcours automatique des elements cliquable ******************************************************************/
        attr_aide_motrice += "<div id='uci_motor_div_right'>";
        
        attr_aide_motrice += "<div class='btn-check btn-check-large'>";
        attr_aide_motrice += "<input type='radio' value='looping' id='a11yMotorMode-looping' name='a11yMotorMode'";
        attr_aide_motrice += accessibilitytoolbar.userPref.get("a11yMotorMode") === "looping" ? "checked='checked'" : "";
        attr_aide_motrice += ">";
        attr_aide_motrice += "<label for='a11yMotorMode-looping'>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_label_automove');
        attr_aide_motrice += "</label>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_help_automove');
        attr_aide_motrice += '</p>';
        attr_aide_motrice += "</div>"; //btn-check btn-check-large

        //gestion de la position du menu
        attr_aide_motrice += "<div>";
        attr_aide_motrice += "<p class='uci_clear'></br>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_menupos');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_a11yMenuPositionning' role='radiogroup' aria-labelledby='a11yMenuPositionning'>";
        attr_aide_motrice += "<li id='uci_a11yMenuPositionning_center' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "center" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_centeredmenu');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yMenuPositionning_nextto' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yMenuPositionning") === "nextto" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_nearelemtmenu');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";

        //gestion du clic automatique
        attr_aide_motrice += "<p class='uci_clear'></br>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_time_before_sel');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_DelayBeforeLoop_auto' role='radiogroup' aria-labelledby='a11yDelayBeforeClick'>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_1' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "1" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_1sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick-2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_3' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "3" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_3sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yDelayBeforeClick_6' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDelayBeforeClick") === "6" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_6sec');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";

        //gestion pas du mode rapide
        attr_aide_motrice += "<p class='uci_clear'></br>";
        attr_aide_motrice += accessibilitytoolbar.get('uci_legend_pasquickmode');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<p>";
        attr_aide_motrice +=  accessibilitytoolbar.get('uci_help_quickmode');
        attr_aide_motrice += "</p>";
        attr_aide_motrice += "<ul class='uci_liste_bton' id='uci_reponses_a11yQuickMode' role='radiogroup' aria-labelledby='a11yQuickMode'>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_2par2');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_5' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "5" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_5par5');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "<li id='uci_a11yQuickMode_10' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yQuickMode") === "10" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_aide_motrice += accessibilitytoolbar.get('uci_label_10par10');
        attr_aide_motrice += "</li>";
        attr_aide_motrice += "</ul>";
        
        attr_aide_motrice += "</div>";
        attr_aide_motrice += "</div>"; //uci_motor_div_right
/******************************************************Fin parcours automatique des éléments cliquables******************************************************************/
        attr_aide_motrice += "</div>"; //uci_motor_general
        attr_aide_motrice += "</div>"; //uci_contenu_onglet_aidemotrice
        return attr_aide_motrice;
    };

    UciAideMotrice.activate_aide_motrice = function () {
        if (document.getElementById('a11yMotorModeEnabled').checked) {
            document.getElementById('uci_motor_general').style.display = "block";
        } else {
            document.getElementById('uci_motor_general').style.display = "none";
        }
    };

}
// Source: app/js/UciCouleur.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_couleur
 * @classdesc Cette classe permettra d'implémenter l'onglet couleur
 * @property {string}  attr_couleur : the string containt hinner html for couleur.
 */
/*global window */
/*global document: false */
/* global alert */
function UciCouleur() {

/*
     * @property
     * @private
     */
    var attr_onglet, attr_couleur;
    attr_couleur = "";

    var mesCouleurs=[
        ["#330000","#331900","#333300","#193300","#003300","#003319","#003333","#001933","#000033","#190033","#330033","#330019","#000000"],
        ["#990000","#994C00","#999900","#4C9900","#009900","#00994C","#009999","#004C99","#000099","#4C0099","#990099","#99004C","#404040"],
        ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FF00","#00FF80","#00FFFF","#0080FF","#0000FF","#7F00FF","#FF00FF","#FF007F","#808080"],
        ["#FF6666","#FFB266","#FFFF66","#B2FF66","#66FF66","#66FFB2","#66FFFF","#66B2FF","#6666FF","#B266FF","#FF66FF","#FF66B2","#C0C0C0"],
        ["#FFCCCC","#FFE5CC","#FFFFCC","#E5FFCC","#CCFFCC","#CCFFE5","#CCFFFF","#CCE5FF","#CCCCFF","#E5CCFF","#FFCCFF","#FFCCE5","#FFFFFF"]
    ];
    /*
     * @constructor
     */
    UciCouleur.prototype.InitUciCouleur = function () {
        attr_couleur = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_couleur'>";
/*****************************************Creation de la partie gauche des couleurs*****************************************
 * Gestion de la partie des couleurs prédéfinies
*****************************************************************************************************************************/
        //couleur predefinie
        attr_couleur += "<div id='uci_div_couleur_predefinie'>";
        attr_couleur += "<input type='radio' name='a11yVisualSettings' value='predefined' id='uci_couleur_predefenie_input' "+(accessibilitytoolbar.userPref.get("a11yVisualSettings") === "predefined" ? " checked='checked'" : '')+"><label for='uci_couleur_predefenie_input'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_titre');
        attr_couleur += "</label>";
       
        attr_couleur += "<ul class='uci_liste_bton' id='uci_reponses_couleurpredefinie' role='radiogroup' aria-labelledby='uci_couleur_predefenie_input'>";
        attr_couleur += "<!--[if IE 8 ]>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_keepit' role='radio' class=' uci_choix ie8_uci_inline  "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_default');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_blackonwhite' role='radio' class=' uci_choix ie8_uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_blackandwhite');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_whiteonblack' role='radio' class=' uci_choix ie8_uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "whiteonblack" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_whiteandblack');
        attr_couleur += "</li>";
        attr_couleur += "<!--<![endif]-->";
        attr_couleur += "<!--[if !IE 8]>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_keepit' role='radio' class='uci_choix uci_inline  "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_default');
        attr_couleur += "</li>";   
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_blackonwhite' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_blackandwhite');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_whiteonblack' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "whiteonblack" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_whiteandblack');
        attr_couleur += "</li>";
        attr_couleur += "<!--<![endif]-->";
        attr_couleur += "<!--[if !IE]><!-->";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_keepit' role='radio' class='uci_choix uci_inline  "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_default');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_blackonwhite' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_blackandwhite');
        attr_couleur += "</li>";
        attr_couleur += "<li id='uci_a11yVisualPredefinedSettings_whiteonblack' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "whiteonblack" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+">";
        attr_couleur += accessibilitytoolbar.get('uci_title_color_whiteandblack');
        attr_couleur += "</li>";
        attr_couleur += "<!--<![endif]-->";
        attr_couleur += "</ul>";
        //gestion des message d'erreur de contraste et de luminosite
        attr_couleur += "<div id='uci_message_constraste' style='display:none;' class='message_couleur'>";
        attr_couleur += "<p style='color: black !important; background-color: #FFFFFF !important;'>";
        attr_couleur += accessibilitytoolbar.get("uci_color_warning_title");
        attr_couleur += "</p>";
        attr_couleur += "<span style='color: black !important; background-color: #FFFFFF !important;' id='uci_message_contraste_lbl'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_warning_content');
        attr_couleur += "</span>";
        attr_couleur += "</div>";

        /*gestion message luminosite
        attr_couleur += "<div id='uci_message_luminosite' class='message_couleur' style='display:none'>";
        attr_couleur += "<h4>";
        attr_couleur += accessibilitytoolbar.get("uci_color_warning_title");
        attr_couleur += "</h4>";
        attr_couleur += "<label id='uci_message_luminosite_lbl'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_warning_title');
        attr_couleur += "</label>";
        attr_couleur += "</div>";*/
        attr_couleur += "</div>";



        /*****************************************Creation de la partie gauche des couleurs*****************************************
 * Gestion de la partie des couleurs personnalisées
 *****************************************************************************************************************************/
        attr_couleur += "<div id='uci_div_right_couleur'>";
        attr_couleur += "<div><input type='radio' name='a11yVisualSettings' value='personnal' id='uci_couleur_personnalisees_input' "+(accessibilitytoolbar.userPref.get("a11yVisualSettings") === "personnal" ? " checked='checked'" : "")+"><label for='uci_couleur_personnalisees_input'>";
        attr_couleur += accessibilitytoolbar.get('uci_color_titre_use_personal');
        attr_couleur += "</label></div>";
        attr_couleur += "<div id='uci_couleur_police' class='cdu_c'>";
        attr_couleur += "<span id='aria_label_texte' >"+accessibilitytoolbar.get('uci_color_txt_texte')+"</span>";
        //couleur de police                
        var tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleurpolice' role='radiogroup' aria-labelledby='aria_label_texte'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        var moreclass = "";
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yFontColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yFontColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';        
        attr_couleur += tableauCouleurPolice;
        attr_couleur += "</div>";
        
        //Couleur de fond
        attr_couleur += "<div id='uci_couleur_fond' class='cdu_c'>";
        attr_couleur += "<span id='uci_aria_label_fond' class='uci_couleur_clear'>"+accessibilitytoolbar.get('uci_color_txt_background')+"</span>";
        var tableauCouleurFond = "<ul class='uci_table_couleur cdu_c' id='uci_reponses_couleurbackground' role='radiogroup' aria-labelledby='uci_aria_label_fond'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurFond += "<li id='uci_a11yBackgroundColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yBackgroundColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";                    
                    tableauCouleurFond += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurFond += '</ul>';
        
        attr_couleur += tableauCouleurFond;
        attr_couleur += "</div>";
        attr_couleur += "</div>";
        attr_couleur += "</div>";
        return attr_couleur;
    };
}
// Source: app/js/UciApparence.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet apparence
 * @property {string}  attr_apparence : the string containt hinner html for apparence.
 */
/*global window */
/*global document: false */
/* global alert */
function UciApparence() {
/**
     * @property
     * @private
     */
    var attr_apparence, attr_onglet;
    attr_apparence = "";
    /*
     * @constructor init
     */

    var mesCouleurs=[
        ["#330000","#331900","#333300","#193300","#003300","#003319","#003333","#001933","#000033","#190033","#330033","#330019","#000000"],
        ["#990000","#994C00","#999900","#4C9900","#009900","#00994C","#009999","#004C99","#000099","#4C0099","#990099","#99004C","#404040"],
        ["#FF0000","#FF8000","#FFFF00","#80FF00","#00FF00","#00FF80","#00FFFF","#0080FF","#0000FF","#7F00FF","#FF00FF","#FF007F","#808080"],
        ["#FF6666","#FFB266","#FFFF66","#B2FF66","#66FF66","#66FFB2","#66FFFF","#66B2FF","#6666FF","#B266FF","#FF66FF","#FF66B2","#C0C0C0"],
        ["#FFCCCC","#FFE5CC","#FFFFCC","#E5FFCC","#CCFFCC","#CCFFE5","#CCFFFF","#CCE5FF","#CCCCFF","#E5CCFF","#FFCCFF","#FFCCE5","#FFFFFF"]
    ];

    UciApparence.prototype.InitUciApparence = function () {
        attr_apparence = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_apparence'>";
/************************************gestion de la partie gauche********************************************************/
        attr_apparence += "<div id='uci_apparence_div_left'>";

        //Gestion de la mise en page : supprimer la mise en page
        attr_apparence += "<div id='uci_div_supprimer_miseenpage'>";

        attr_apparence += "<input type='checkbox' value='true' name='a11yLinearize'  id='a11yLinearize'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yLinearize") === "true" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='a11yLinearize'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_listmode');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' onblur=\"accessibilitytoolbar.toolbarHideHelp('uci_help_listmode');\" onclick=\"accessibilitytoolbar.toolbarDisplayHelp('uci_help_listmode');return false;\" class='uci_link_help_bulle' role='presentation'><span class='uci_span_help_bulle cdu_n' id='uci_help_listmode'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_listmode');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //Gestion de la mise en page : alignement a gauche
        attr_apparence += "<div id='uci_div_alignement_gauche'>";
        attr_apparence += "<input type='checkbox' value='left' name='a11yLeftText' id='alignement_gauche'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yLeftText") === "left" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='alignement_gauche'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_alignleft');
        attr_apparence += "</label>";
        attr_apparence += "</div>";


        //Gestion de la mise en page : numerotation des ligne
        attr_apparence += "<div id='uci_div_numero_ligne'>";
        attr_apparence += "<input type='checkbox' value='decimal'  name='a11yNumerotationList' id='putNumOnList'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yNumerotationList") === "decimal" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='putNumOnList'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_putnumonlist');
        attr_apparence += "</label>";
        attr_apparence += "</div>";

        //gestion de l'apparence des liens
        attr_apparence += "<div id='uci_div_apparence_liens'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11yNavLienEnabled' id='apparence_lien' onclick=\"UciApparence.displayLien('apparence_lien','uci_gestion_lien');\"";
        attr_apparence += accessibilitytoolbar.userPref.get("a11yNavLienEnabled") === "true" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='apparence_lien'>";
        attr_apparence += accessibilitytoolbar.get('uci_titre_links');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' onblur=\"accessibilitytoolbar.toolbarHideHelp('uci_help_links');\" onclick=\"accessibilitytoolbar.toolbarDisplayHelp('uci_help_links');return false;\" class='uci_link_help_bulle' role='presentation'><span class='uci_span_help_bulle cdu_n' id='uci_help_links'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_links');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //gestion du lien actif : couleur
        if(accessibilitytoolbar.userPref.get("a11yNavLienEnabled")=== "true"){
            attr_apparence += "<div id='uci_gestion_lien' style='display:block' >";
        }else {
            attr_apparence += "<div id='uci_gestion_lien' style='display:none' >";
        }

        attr_apparence += "<div id='uci_div_lien_selectionne'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_active')+"</span>";        
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienSel' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_active_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienSelColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_active_color')+"</span>";
        attr_apparence +="</a>";
        attr_apparence += "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_selectionne' style='display:none'>";
        //couleur de police
        var tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' onkeydown='UciApparence.uciFermetureOverlay(event,\"uci_palette_couleur_lien_selectionne\");' id='uci_reponses_couleur_lien_sel' role='radiogroup' aria-labelledby='uci_a11yNavLienSelColor'>";
        var index = 0;
        var indexCouleur = 0;
        var currentLine = "";
        var moreclass = "";
        var focus_li;
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienSelColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li cdu_c "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienSelColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";
          


        //gestion du lien actif : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienSelStyle' title=\""+accessibilitytoolbar.get("uci_title_link_active_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "keepit" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "underline" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "border" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienSelStyle") === "bold" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        attr_apparence += "</div>";

        //gestion des liens non visite
        //gestion des liens non visite : couleur 
        attr_apparence += "<div id='uci_div_lien_notselectionne'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_notvisited')+"</span>";
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienNonVis' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_notvisited_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_notvisited_color')+"</span>";
        attr_apparence +="</a>";
        attr_apparence+= "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_notselectionne' style='display:none'>";        
        //couleur de police
        tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' onkeydown='UciApparence.uciFermetureOverlay(event,\"uci_palette_couleur_lien_notselectionne\");' id='uci_reponses_couleur_lien_notsel' role='radiogroup' aria-labelledby='uci_a11yNavLienNonVisColorSpan'>";
        index = 0;
        indexCouleur = 0;
        currentLine = "";
        moreclass = "";
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienNonVisColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'"  : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";

                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";
        //gestion des liens non visite : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienNonVisStyle' title=\""+accessibilitytoolbar.get("uci_title_link_notvisited_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "keepit" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "underline" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "border" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienNonVisStyle") === "bold" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        attr_apparence += "</div>";

        //gestion des liens visités
        //gestion des liens visite : couleur
        
        
        attr_apparence += "<div id='uci_div_lien_visite'>";
        attr_apparence += "<span class='uci_span_lien cdu_c'>"+accessibilitytoolbar.get('uci_txt_visited')+"</span>";
        attr_apparence += "<div class='cdu_left'><a href='#' id='uci_NavLienVis' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_title_link_visited_color')+"\" style='background-color: "+accessibilitytoolbar.userPref.get("a11yNavLienVisColor")+"!important'>";
        attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_link_visited_color')+"</span>";
        attr_apparence +="</a>";


        attr_apparence+= "<div class='uci_span_help_bulle' id='uci_palette_couleur_lien_visite' style='display:none'>";
        //couleur de police
        tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c'  onkeydown='UciApparence.uciFermetureOverlay(event,\"uci_palette_couleur_lien_visite\");' id='uci_reponses_couleur_lien_visite' role='radiogroup' aria-labelledby='uci_a11yNavLienVisColorSpan'>";
        index = 0;
        indexCouleur = 0;
        currentLine = "";
        moreclass = "";
        for (index = 0; index < mesCouleurs.length; ++index) {
            if(mesCouleurs[index] instanceof Array)
            {
                indexCouleur = 0;
                currentLine = mesCouleurs[index];
                for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                    tableauCouleurPolice += "<li id='uci_a11yNavLienVisColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yNavLienVisColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                    tableauCouleurPolice += "</li>";
                    moreclass = "";
                }
                moreclass = "uci_couleur_clear";
            }
        }
        tableauCouleurPolice += '</ul>';
        attr_apparence += tableauCouleurPolice;
        attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";           

        //gestion des liens visité : mise en forme
        attr_apparence += "<div class='cdu_left'>";
        attr_apparence += "<select class='uci_select_lien' name='a11yNavLienVisStyle' title=\""+accessibilitytoolbar.get("uci_title_link_visited_render")+"\">";
        attr_apparence += "<option value='keepit' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "keepit" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_default');
        attr_apparence += "</option>";
        attr_apparence += "<option value='underline' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "underline" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_underline');
        attr_apparence += "</option>";
        attr_apparence += "<option value='border' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "border" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_border');
        attr_apparence += "</option>";
        attr_apparence += "<option value='bold' "+(accessibilitytoolbar.userPref.get("a11yNavLienVisStyle") === "bold" ? " selected" : "")+">";
        attr_apparence += accessibilitytoolbar.get('uci_link_render_options_bold');
        attr_apparence += "</option>";
        attr_apparence += "</select>";
        attr_apparence += "</div>";
        attr_apparence += '</div>';
        attr_apparence += '</div>';

        //gestion de l'affichage de la règle
        attr_apparence += "<div id='uci_div_affichage_regle'>";

        attr_apparence += "<div id='uci_regle_enabled'>";
        if(accessibilitytoolbar.getCompatible('a11yRegleEnabled')) {
            attr_apparence += "<input value='true' name='a11yRegleEnabled' type='checkbox' id='uci_check_regle' onclick=\"UciApparence.displayLien('uci_check_regle','uci_div_regle');\"";
            attr_apparence += (accessibilitytoolbar.userPref.get("a11yRegleEnabled") === "true" ? " checked='checked'>" : ">");
        } else {
            attr_apparence += "<input value='true' name='a11yRegleEnabled' type='checkbox' id='uci_check_regle' disabled>";        
        }
        attr_apparence += "<label for='uci_check_regle'>";
        attr_apparence += accessibilitytoolbar.get('uci_title_regle');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' onblur=\"accessibilitytoolbar.toolbarHideHelp('uci_help_regle');\" onclick=\"accessibilitytoolbar.toolbarDisplayHelp('uci_help_regle');return false;\" class='uci_link_help_bulle' role='presentation'><span class='uci_span_help_bulle cdu_n' id='uci_help_regle'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_regle');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>"; //uci_regle_enabled
        
        if(accessibilitytoolbar.getCompatible('a11yRegleEnabled')) {                  
            if(accessibilitytoolbar.userPref.get("a11yRegleEnabled") === 'true'){
                attr_apparence += "<div id='uci_div_regle' style='display:block'>";
            }else {
                attr_apparence += "<div id='uci_div_regle' style='display:none'>";
            }
            attr_apparence += "<div id='uci_div_regle_horizontal'>";
            attr_apparence += " <input type='checkbox' value='true' name='a11yRegleHorizontal' id='uci_check_regle_horizontal'";
            attr_apparence += (accessibilitytoolbar.userPref.get("a11yRegleHorizontal") === "true" ? " checked='checked'>" : ">");
            attr_apparence += "<label for='uci_check_regle_horizontal'>";
            attr_apparence += accessibilitytoolbar.get('uci_label_regle_horizontale');
            attr_apparence += "</label>";
            attr_apparence += "</div>";
    
            attr_apparence += "<div id='uci_div_regle_verticale' >";
            attr_apparence += " <input type='checkbox' value='true' name='a11yRegleVertical' id='uci_check_regle_verticale'";
            attr_apparence += (accessibilitytoolbar.userPref.get("a11yRegleVertical") === "true" ? " checked='checked'>" : ">");
            attr_apparence += "<label for='uci_check_regle_verticale'>";
            attr_apparence += accessibilitytoolbar.get('uci_label_regle_vertical');
            attr_apparence += "</label>";
            attr_apparence += "</div>";
    
            //gestion réglage de la règle
            attr_apparence += "<div id='uci_div_more_reglage_regle'>";
            //gestion couleur de la règle
            attr_apparence += "<div id='uci_regle_couleur'>";
            attr_apparence += "<span class='cdu_c uci_regle_couleur_span cdu_left'>"+accessibilitytoolbar.get('uci_txt_regle_color')+"</span>";
            attr_apparence += "<div class='cdu_left'><a href='#' id='uci_regle_couleur_lien' class='uci_inline uci_couleur_li' title=\""+accessibilitytoolbar.get('uci_txt_regle_color')+"\" style='background-color:"+accessibilitytoolbar.userPref.get("a11yRegleColor")+ "!important'>";
            attr_apparence += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_txt_regle_color')+"</span> ";
            attr_apparence +="</a>";
            attr_apparence+= "<div class='uci_span_help_bulle' id='uci_palette_couleur_regle' style='display:none'>";
            
            tableauCouleurPolice = "<ul class='uci_table_couleur cdu_c' onkeydown='UciApparence.uciFermetureOverlay(event,\"uci_palette_couleur_regle\");' id='uci_reponses_couleur_regle' role='radiogroup' aria-labelledby='uci_a11yRegleColorSpan'>";
            index = 0;
            indexCouleur = 0;
            currentLine = "";
            moreclass = "";
            for (index = 0; index < mesCouleurs.length; ++index) {
                if(mesCouleurs[index] instanceof Array)
                {
                    indexCouleur = 0;
                    currentLine = mesCouleurs[index];
                    for (indexCouleur = 0; indexCouleur < currentLine.length; ++indexCouleur) {
                        tableauCouleurPolice += "<li id='uci_a11yRegleColor_"+currentLine[indexCouleur]+"' role='radio' class='uci_inline cdu_c uci_couleur_li "+moreclass+" "+(accessibilitytoolbar.userPref.get("a11yRegleColor") === currentLine[indexCouleur] ? "uci_couleur_li_selected' aria-checked='true' tabindex='0'" : "'aria-checked='false' tabindex='-1'")+" style='background:"+currentLine[indexCouleur]+"!important; color:#FFF!important;'>&nbsp;";
                        tableauCouleurPolice += "</li>";
                        moreclass = "";
                    }
                    moreclass = "uci_couleur_clear";
                }
            }
            tableauCouleurPolice += '</ul>';
            attr_apparence += tableauCouleurPolice;
            attr_apparence += "<span class='uci_fleche_help_bulle'></span></div></div>";
            attr_apparence += "</div>";
            attr_apparence += "</div>";
            //epaisseur de la régle
            attr_apparence += "<div id='uci_regle_epaisseur'>";
    
            attr_apparence += "<span id='uci_title_epaisseur_regle' class='cdu_left'>";
            attr_apparence += accessibilitytoolbar.get('uci_txt_regle_size');
            attr_apparence += "</span>";
            attr_apparence += "<ul class='uci_liste_bton' id='uci_reponses_epaisseurregle' role='radiogroup' aria-labelledby='uci_title_epaisseur_regle'>";
            attr_apparence += "<li id='uci_a11yRegleEpaisseur_thin' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yRegleEpaisseur") === "thin" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence +=  accessibilitytoolbar.get('uci_title_regle_thin');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "<li id='uci_a11yRegleEpaisseur_medium' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yRegleEpaisseur") === "medium" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence += accessibilitytoolbar.get('uci_title_regle_medium');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "<li id='uci_a11yRegleEpaisseur_thick' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yRegleEpaisseur") === "thick" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
            attr_apparence += "<span>";
            attr_apparence += "<samp>-</samp>";
            attr_apparence += "<span class='cdu_n'>";
            attr_apparence +=  accessibilitytoolbar.get('uci_title_regle_big');
            attr_apparence += "</span>";
            attr_apparence += "</span>";
            attr_apparence += "</li>";
            attr_apparence += "</lu>";
            attr_apparence += "</div>";
            attr_apparence += "</div>"; //uci_div_regle
        }
        attr_apparence += "</div>"; //uci_div_affichage_regle
/*********************************************Fin de la partie gauche******************************************************/
        attr_apparence += "</div>"; //uci_apparence_div_left

/**********************************************Gestion de la partie de droite**********************************************/

        attr_apparence += "<div id='uci_apparence_div_right'>";
        //desactiver la transparence
        attr_apparence += "<div id='uci_div_desactiver_transparence'>";
        attr_apparence += "<input type='checkbox' value='1' name='a11ySupEffetTransp' id='uci_desactiver_transparence'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupEffetTransp") === "1" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='uci_desactiver_transparence'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disabletransp');
        attr_apparence += "</label>";
        attr_apparence += "<a href='#' onblur=\"accessibilitytoolbar.toolbarHideHelp('uci_help_disabletransp');\" onclick=\"accessibilitytoolbar.toolbarDisplayHelp('uci_help_disabletransp');return false;\" class='uci_link_help_bulle' role='presentation'><span class='uci_span_help_bulle cdu_n' id='uci_help_disabletransp'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_disabletransp');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";

        //debut gestion de la désactivation des images de fond
        attr_apparence += "<div id='uci_div_disabled_fond_picture'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11ySupImageFont' id='uci_label_disablebgpictures'";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupImageFont") === "true" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='uci_label_disablebgpictures'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disablebgpictures');
        attr_apparence += "</label>";
        attr_apparence += "</div>";

        //debut gestion de la désactivation des images de premier plan
        attr_apparence += "<div id='uci_div_disabled_first_plan_picture'>";
        attr_apparence += "<input type='checkbox' value='true' name='a11ySupImageFirstPlan' id='uci_label_disablepppictures' ";
        attr_apparence += accessibilitytoolbar.userPref.get("a11ySupImageFirstPlan") === "true" ? "checked='checked'" : "";
        attr_apparence += ">";
        attr_apparence += "<label for='uci_label_disablepppictures'>";
        attr_apparence += accessibilitytoolbar.get('uci_label_disablepppictures');
        attr_apparence += "</label >";
        attr_apparence += "<a href='#' onblur=\"accessibilitytoolbar.toolbarHideHelp('uci_help_disablepppictures');\" onclick=\"accessibilitytoolbar.toolbarDisplayHelp('uci_help_disablepppictures');return false;\" class='uci_link_help_bulle' role='presentation'><span class='uci_span_help_bulle cdu_n' id='uci_help_disablepppictures'><p>";
        attr_apparence += accessibilitytoolbar.get('uci_help_disablepppictures');
        attr_apparence += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_apparence += "</div>";
/**********************************************Fin de la partie de droite*************************************************/
        attr_apparence += "</div>";
/*************************************************Fin de la partie apparence**********************************************/
        attr_apparence += "</div>";
        return attr_apparence;
    };

    UciApparence.displayLien = function (elementparent,id) {

            if (document.getElementById(elementparent).checked) {
                document.getElementById(id).style.display = "block";
            }else {
                document.getElementById(id).style.display = "none";
            }
    };

    UciApparence.displayLienCouleur = function (id) {
        if (document.getElementById(id).style.display === "none") {
            document.getElementById(id).style.display = "block";
            document.getElementById(id).focus();
        }else {
            UciApparence.hideLienCouleur(id);
        }
    };

    UciApparence.hideLienCouleur = function (id) {
            document.getElementById(id).style.display = "none";
    };

    UciApparence.uciFermetureOverlay = function(_event_, id) {
        var winObj="";
        if ( window.event )
            winObj = window.event;
        // --- Netscape and other explorers
        else
            winObj = _event_;

        var intKeyCode = winObj.keyCode;
        if (intKeyCode ===13 || intKeyCode ===27){
            document.getElementById(id).style.display = "none";
        }
    };
}
// Source: app/js/UciTypographie.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet typographie
 */
/*global window */
/*global document: false */
/* global alert */
function UciTypographie() {
/*
    * @property
    * @private
     */
    var attr_typography;
    /*
     * @constructor
     */
    UciTypographie.prototype.InitUciTypographie = function () {
        attr_typography = "<div class='uci_contenu_onglet cdu_c' role='tabpanel' id='uci_contenu_onglet_typographie' style='display: block'>";

/************************************gestion de la partie gauche********************************************************/
        attr_typography += "<div id='uci_typo_div_left' class='cdu_c'>";
        /*gestion de la taille de police*/
        attr_typography += "<div class='uci_aria_button_group cdu_c'>";
        attr_typography += "<span class='cdu_left'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_fontsize');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_bigger' role='radiogroup'>";
        attr_typography += "<li id='uci_a11yBigger_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_normal')+"\">";
        attr_typography += "<span>";
        attr_typography += "a";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_normal');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yBigger_150' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_medium')+"\">";
        attr_typography += "<span>";
        attr_typography += "a";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_medium');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yBigger_200' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_large')+"\">";
        attr_typography += "<span>";
        attr_typography += "a";
        attr_typography += "<span class='cdu_n'>";
        attr_typography +=  accessibilitytoolbar.get('uci_title_fontsize_radio_large');
        attr_typography += "</span>";
        attr_typography += "</span>";
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        //gestion de l'espacement entre les mots            
        attr_typography += "<div id='uci_typo_espacement_mot' class='uci_aria_button_group cdu_c uci_clear'>";
        attr_typography += "<span id='uci_espacement_word_aria_label' class='cdu_left'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_wordspacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_wordspacing' role='radiogroup' aria-labelledby='uci_espacement_word_aria_label'>";
        attr_typography += "<li id='uci_a11ySpacement_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_normal')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11ySpacement_0.5' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_medium')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');     
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11ySpacement_1' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_wordspacing_radio_large')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
/******************************************************Fin partie de gauche**************************************************/
        attr_typography += "</div>";
/************************************gestion de la partie centrale********************************************************/
        attr_typography += "<div id='uci_typo_div_centre' class='cdu_c'>";

        // gestion de l'espacement entre les caractère
        attr_typography += "<div class='uci_aria_button_group cdu_c'>";
        attr_typography += "<span id='uci_typo_font_caractere' class='cdu_left'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_charspacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_charspacing' role='radiogroup' aria-labelledby='uci_typo_font_caractere'>";
        attr_typography += "<li id='uci_a11yCharSpacement_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_normal')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yCharSpacement_0.2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "0.2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_medium')+"\">";  
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');     
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yCharSpacement_0.5' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yCharSpacement") === "0.5" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_charspacing_radio_large')+"\">";
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        // gestion espacement entre les lignes
        attr_typography += "<div id='uci_typo_spacement_line' class='uci_aria_button_group cdu_c uci_clear'>";        
        attr_typography += "<span id='uci_typo_spacement_line_aria_label' class='cdu_left'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_linespacing');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_linespacement' role='radiogroup' aria-labelledby='uci_typo_spacement_line_aria_label'>";
        attr_typography += "<li id='uci_a11yLineSpacement_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_normal')+"\">";       
        attr_typography += accessibilitytoolbar.get('uci_radio_default');  
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yLineSpacement_2' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_medium')+"\">";         
        attr_typography += accessibilitytoolbar.get('uci_radio_medium');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yLineSpacement_3' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_linespacing_radio_large')+"\">";    
        attr_typography += accessibilitytoolbar.get('uci_radio_large');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
/************************************Fin de la partie centrale*************************************************************/
        attr_typography += "</div>";
/***************************************Debut de la partie droite*************************************************************/
        attr_typography += "<div id='uci_typo_div_right' class='cdu_c'>";


        // Gestion de la police à utiliser pour les dysléxique
        attr_typography += "<div id='uci_typo_dyslexy_font' class='uci_aria_button_group cdu_c'>";
        attr_typography += "<div id='box-a11yDyslexyFontEnabled_off'>" ;
        if(accessibilitytoolbar.getCompatible('a11yDyslexyFontEnabled')) {
            attr_typography += "<input type='checkbox' value='on' name='a11yDyslexyFontEnabled' onclick=\"UciTypographie.displayFieldset(\'uci_fieldset_fontfamily\');\" id='uci_chekbox_dyslexy_font' "+(accessibilitytoolbar.userPref.get("a11yDyslexyFontEnabled") === "on" ? " checked='checked'" : "")+">";
        } else {
            attr_typography += "<input type='checkbox' value='on' name='a11yDyslexyFontEnabled' id='uci_chekbox_dyslexy_font' disabled>";
        }        
        attr_typography += "<label for='uci_chekbox_dyslexy_font' id='uci_title_typographie'>";
        attr_typography += "<span>";
        attr_typography +=  accessibilitytoolbar.get('uci_typo_titre_fontfamily');
        attr_typography += "</span>";
        attr_typography += "</label>";
        attr_typography += "<a href='#' onblur=\"accessibilitytoolbar.toolbarHideHelp('uci_typo_help_fontfamily');\" onclick=\"accessibilitytoolbar.toolbarDisplayHelp('uci_typo_help_fontfamily');return false;\" class='uci_link_help_bulle' role='presentation'><span class='uci_span_help_bulle cdu_n' id='uci_typo_help_fontfamily'><p>";
        attr_typography += accessibilitytoolbar.get('uci_typo_help_fontfamily');
        attr_typography += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_typography += "</div>";
        
        // only if compatible
        if(accessibilitytoolbar.getCompatible('a11yDyslexyFontEnabled')) {
            if (accessibilitytoolbar.userPref.get("a11yDyslexyFontEnabled") === "on"){
                attr_typography += "<div id='uci_fieldset_fontfamily' style='display:block'>";
            }else {
                attr_typography += "<div id='uci_fieldset_fontfamily' style='display:none'>";
            }
    
            attr_typography += "<span class='cdu_n'>";
            attr_typography += accessibilitytoolbar.get('uci_typo_titre_fontfamily');
            attr_typography += "</span>";
            
            attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_fontfamily' role='radiogroup' aria-labelledby='uci_title_typographie'>";
            attr_typography += "<li id='uci_a11yDyslexyFont_arial' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "arial" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_arial')+"\">";
            attr_typography += "Arial";
            attr_typography += "</li>";
            attr_typography += "<li id='uci_a11yDyslexyFont_opendyslexic' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yDyslexyFont") === "opendyslexic" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontfamily_radio_opendys')+"\">";
            attr_typography += "Open Dyslexic";
            attr_typography += "</li>";
            attr_typography += "</ul>";
            attr_typography += "</div>"; //uci_fieldset_fontfamily
        }
        attr_typography += "</div>";
        // Gestion de la casse du texte
        attr_typography += "<div id='uci_typo_modif_casse' class='uci_aria_button_group cdu_c uci_clear'>";
        attr_typography += "<div id='box-a11yModifCasseEnabled_off'>";
        attr_typography += "<input type='checkbox' name='a11yModifCasseEnabled' onclick=\"UciTypographie.displayFieldset(\'uci_fieldset_changecasse\');\" id='uci_chekbox_casse'"+(accessibilitytoolbar.userPref.get("a11yModifCasseEnabled") === "on" ? " checked='checked'" : "")+">";
        attr_typography += "<label for='uci_chekbox_casse'>";
        attr_typography += "<span>";
        attr_typography +=  accessibilitytoolbar.get('uci_typo_titre_changecase');
        attr_typography += "</span>";
        attr_typography += "</label>";
        attr_typography += "<a href='#' onblur=\"accessibilitytoolbar.toolbarHideHelp('uci_typo_help_changecase');\" onclick=\"accessibilitytoolbar.toolbarDisplayHelp('uci_typo_help_changecase');return false;\" class='uci_link_help_bulle' role='presentation'><span class='uci_span_help_bulle cdu_n' id='uci_typo_help_changecase'><p>";
        attr_typography += accessibilitytoolbar.get('uci_typo_help_changecase');
        attr_typography += "</p><span class='uci_fleche_help_bulle'></span></span></a>";
        attr_typography += "</div>";
        if (accessibilitytoolbar.userPref.get("a11yModifCasseEnabled") === "on"){
            attr_typography += "<div id='uci_fieldset_changecasse' style='display:block'>";
        }else {
            attr_typography += "<div id='uci_fieldset_changecasse' style='display:none'>";
        }
        attr_typography += "<span class='cdu_n'>";
        attr_typography += accessibilitytoolbar.get('uci_typo_titre_changecase');
        attr_typography += "</span>";
        attr_typography += "<ul class='uci_liste_bton' id='uci_reponses_changecasse' role='radiogroup' aria-labelledby='uci_fieldset_changecasse'>";
        attr_typography += "<li id='uci_a11yModifCasse_capitalize' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "capitalize" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography +=  accessibilitytoolbar.get('uci_changecase_firstlettre');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yModifCasse_uppercase' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "uppercase" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography += accessibilitytoolbar.get('uci_changecase_toupper');
        attr_typography += "</li>";
        attr_typography += "<li id='uci_a11yModifCasse_lowercase' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yModifCasse") === "lowercase" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" >";
        attr_typography += accessibilitytoolbar.get('uci_changecase_tolower');
        attr_typography += "</li>";
        attr_typography += "</ul>";
        attr_typography += "</div>";
        attr_typography += "</div>";
/***************************************Fin de la partie droite*************************************************************/
        attr_typography += "</div>";
/***************************************Fin de la partie Typographie********************************************************/
        attr_typography += "</div>";
        return attr_typography;
    };

    UciTypographie.displayFieldset = function (id) {
        if (document.getElementById(id).style.display === "none") {
            document.getElementById(id).style.display = "block";
        } else {
            document.getElementById(id).style.display = "none";
        }
    };


}

// Source: app/js/UciValidation.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class uci_validation
 * @classdesc Cette classe permettra d'implémenter la validation
 * @property {string}  attr_aide_motrice : the string containt hinner html for aide motrice.
 */
/*global window */
/*global document: false */
/* global alert */
function UciValidation() {
/**
     * @property
     * @private
     */
    var attr_validation;
    attr_validation = "";
    /*
     * @constructor init
     */
    UciValidation.prototype.InitUciValidation = function () {
        attr_validation += "<div class='uci_squaredOne'>";
        attr_validation += "<input type='checkbox' value='off' name='a11yApercuAuto' id='a11yApercuAuto' "+(accessibilitytoolbar.userPref.get("a11yApercuAuto") === "off" ? " checked=\"checked\"" : "")+"/>";
        attr_validation += "<label for='a11yApercuAuto'>";
        attr_validation += "<span class='uci_ui'></span>";
        attr_validation += accessibilitytoolbar.get('uci_checkbox_disable_apercuauto');
        attr_validation += "</label>";
        attr_validation += "</div>";
        attr_validation += "<div id='uci_validation_button'>";
        attr_validation += "<input type='submit' class='uci_button_valider' id='uci_valider' value=\""+accessibilitytoolbar.get('uci_button_valid')+"\" />";
        attr_validation += "<input type='reset' class='uci_button_reset' id='uci_annuler' value=\""+accessibilitytoolbar.get('uci_button_cancel')+"\" />";
        attr_validation += "</div>";
        return attr_validation;
    };

    UciValidation.Validation = function (/*event*/e) {
        var event = e || window.event;
        if (event && event.stopPropagation) {
            event.stopPropagation();
            event.preventDefault();
        } else if (window.event) {
            window.event.cancelBubble = true;
            window.eventReturnValue = false;
        }
        //document.getElementById('uci_moreconfortleft').focus();
        if(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on") {
            document.getElementById("uci_active_cdu_img").focus();
        }
        else {
            document.getElementById("uci_inactive_cdu_img").focus();
        }
        accessibilitytoolbar.setCSS();
        accessibilitytoolbar.hasDoneSettings = true;
        accessibilitytoolbar.saveUserPref();
        document.getElementById('uci_validation').className = "cdu_n";
        UciIhm.hide_more_confort('uci_activateOnglet','uci_moreconfort_content');
    };

    UciValidation.Annulation = function () {
        //document.getElementById('uci_moreconfortleft').focus();
        if(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on") {
            document.getElementById("uci_active_cdu_img").focus();
        }
        else {
            document.getElementById("uci_inactive_cdu_img").focus();
        }
        accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.cookieValue);
        accessibilitytoolbar.reloadToolbar();
    };
}
// Source: app/js/UciIhm.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/ 
/**
 * @class IHM
 * @classdesc Cette classe permettra de gérer les appels des onglets de la toolbar
 */
/*global window */
/*global document: false */
/* global alert */
function UciIhm() {
/*
     *@private
     *@proporty
     * variable permettant de regrouper l’ensemble du code html de l’ihm générale.
     */
    var attr_ihm;
    var anc_onglet = "typographie";

    /*
     * @public
     * @constructor
     * 	constructor uci_ihm() : Constructeur de la class uciIhm
     *
     */
    UciIhm.prototype.InitUciIHM = function () {
        attr_ihm = "<div class='cdu_c'>";
        attr_ihm += "<div id='uci_toolbar-quick' class='cdu_left'>";
        /****************************Integration dans la toolbar du menu de gauche********************************************
         * Mise en place du lien "masquer la barre", qui permettra de masquer la barre du confort d'utilisateur
         * Mise en place du logo " + de confort" pour donner identité graphique à la barre de confort
         * *********************************************************************************************************************/

        attr_ihm += "<div class='uci_logo_plus_de_confort cdu_c'>";
        attr_ihm += "<h1 class='uci_alt_logo'>";
        attr_ihm += accessibilitytoolbar.get('uci_serv_name')+'<span class="uci-plus-orange">+</span>';
        attr_ihm += "</h1>";
        if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') === "on") {
            attr_ihm += "<span id='uci_span_disabled' style='display:none'>";
        } else {
            attr_ihm += "<span id='uci_span_disabled' style='display:block'>";
        }
        attr_ihm += accessibilitytoolbar.get('uci_service_disabled');
        attr_ihm += "</span>";
        attr_ihm += "</div>";
        attr_ihm += "<div class='uci_right'>";
        if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') === "on") {
            attr_ihm += "<div id='uci_left_toolbar' class='cdu_c' style='display:block'>";
        } else {
            attr_ihm += "<div id='uci_left_toolbar' class='cdu_c' style='display:none'>";
        }
        /***************************************Fin menu de gauche*************************************************************/

        /**********************************************Menu central de la toolbar**********************************************
         * Mise en place des choix rapides concernant les tailles de police : 3 choix possibles
         * Mise en place des choix rapides concernant les contraste de couleur de police et d'arriere plan : 2 choix possibles
         * Mise en place du lien " + plus de confort" pour permettre l'ouverture complète aux options du CDU
         ***********************************************************************************************************************/
        /*
         * gestion de la police
         */
        attr_ihm += "<ul class='uci_liste_bton cdu_c' id='uci_reponses_bigger_quick_set' role='radiogroup' aria-labelledby='uci_typo_size'>";
        attr_ihm += "<li id='uci_quick_a11yBigger_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_normal')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "a";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_normal');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yBigger_150' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_medium')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "a";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_medium');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yBigger_200' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_fontsize_radio_large')+"\">";
        attr_ihm += "<span>";
        attr_ihm += "a";
        attr_ihm += "<span class=\"cdu_n\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_title_fontsize_radio_large');
        attr_ihm += "</span>";
        attr_ihm += "</span>";
        attr_ihm += "</li>";
        attr_ihm += "</ul>";
        /**
         * Gestion des couleurs
         */
        attr_ihm += "<ul class='uci_liste_bton cdu_c' id='uci_reponses_couleurpredefinie_quick_set' role='radiogroup' aria-labelledby='question'>";
        attr_ihm += "<li id='uci_quick_a11yVisualPredefinedSettings_keepit' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_color_default')+"\">";
        attr_ihm += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_color_default')+"</span>";
        attr_ihm += "</li>";
        attr_ihm += "<li id='uci_quick_a11yVisualPredefinedSettings_blackonwhite' role='radio' class='uci_choix uci_inline "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "uci_choix_selected' aria-checked='true' tabindex='0'" : "' aria-checked='false' tabindex='-1'")+" title=\""+accessibilitytoolbar.get('uci_title_color_blackandwhite')+"\">";
        attr_ihm += "<span class='cdu_n'>"+accessibilitytoolbar.get('uci_title_color_blackandwhite')+"</span>";
        attr_ihm += "</li>";
        attr_ihm += "</ul>";
        attr_ihm += "</div>";
        /***************************************** Fin bloc uci_left_toolbar de la toolbar *****************************************/
        if (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') === "on") {
            attr_ihm += "<div id='uci_middle_toolbar' class='cdu_c' style='display:block'>";
        } else {
            attr_ihm += "<div id='uci_middle_toolbar' class='cdu_c' style='display:none'>";
        }

        //  gestion du lien "+ de confort"          
        attr_ihm += "<a class='uci_lien_plus_reglage cdu_c' href=\"#\" id='uci_moreconfort' onclick=\"UciIhm.more_confort('uci_activateOnglet','uci_moreconfort_content');return false;\">";
        attr_ihm += "<span id='uci_moreconfort_content'>"+accessibilitytoolbar.get('uci_txt_more_settings')+"</span>";
        attr_ihm += "</a>";
        attr_ihm += "</div>";


        attr_ihm += "<div id='uci_right_toolbar' class='cdu_c'>";
        /************************************************Menu de droite de la toolbar*******************************************
         * Mise en place du bouton poussoir sous forme d'image pour activer ou desactiver cdu sur le site
         * Mise en place du menu facebook tout a droite, permettant d'un menu comprenant :
         * le choix de langues
         * la consultation de l'aide générale
         * la reinitialisation de tout mes réglages
         * le masquage de la barre "+ de confort"
         **********************************************************************************************************************/
        attr_ihm += "<a class='cdu_c' href='javascript:UciIhm.desactiveCDUForWebSite();' id='uci_active_cdu_img' style='display:"+(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?'block':'none')+"' title=\""+accessibilitytoolbar.get('uci_title_disable_cdu')+"\"><img alt=\""+ accessibilitytoolbar.get('uci_title_disable_cdu') + "\" src='" + hebergementFullPath + "/images/btn_on_bar.fccd942b.png'></a>";
        attr_ihm += "<a class='cdu_c' href='javascript:UciIhm.desactiveCDUForWebSite();' id='uci_inactive_cdu_img' style='display:"+(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?'none':'block')+"' title=\""+accessibilitytoolbar.get('uci_title_enable_cdu')+"\"><img alt=\""+ accessibilitytoolbar.get('uci_title_enable_cdu') + "\" src='" + hebergementFullPath + "/images/btn_off_bar.8a3a0f55.png'></a>";



        // hide the toolbar
        /*
        attr_ihm += "<a class='cdu_c' href=\"#\" id=\"uci_moreconfortleft\" onclick=\"UciIhm.ToolbarHide();return false;\">";
        attr_ihm += accessibilitytoolbar.get('uci_link_hide_toolbar');
        attr_ihm += "</a>";
        */


        attr_ihm += "<div id='uci_activate_menu' class='cdu_c'>";
        attr_ihm += "<a href='javascript:UciIhm.uci_activate_menu();' id='uci_activer_menu' title=\""+accessibilitytoolbar.get('uci_txt_link_menu_open')+"\"><img alt=\""+accessibilitytoolbar.get('uci_txt_link_menu_open')+"\" src='"+ hebergementFullPath + "/images/btn_menu.3a58a5fb.png'></a>";
        attr_ihm += "<a href='javascript:UciIhm.uci_activate_menu();' id='uci_fermer_menu' style='display:none;' title=\""+accessibilitytoolbar.get('uci_txt_link_menu_close')+"\"><img alt=\""+accessibilitytoolbar.get('uci_txt_link_menu_close')+"\" src='"+ hebergementFullPath +"/images/btn_menu_active.4410871c.png'></a>";



        //gestion du menu deroulant du menu
        attr_ihm += "<div id='uci_cdu_menu' style='display:none;'>";
        attr_ihm += "<ul>";
        attr_ihm += "<li>";
        attr_ihm += "<div id='uci_language'>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "fr"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_fr' value='fr' id='uci_fr' onClick=\"UciIhm.changement_langue('fr');\" title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_fr')+"\"/>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "en"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_en' value='en' id='uci_en' onClick=\"UciIhm.changement_langue('en');\" title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_en')+"\"/>";
        attr_ihm += "<input class='"+(accessibilitytoolbar.userPref.get("a11yLanguage") === "es"?'uci_choix uci_choix_selected':'uci_choix')+"' type='button' name='uci_language_sp' value='sp' id='uci_sp' onClick=\"UciIhm.changement_langue('es');\" title=\""+accessibilitytoolbar.get('uci_txt_menu_change_lang_es')+"\"/>";
        attr_ihm += "</div>";
        attr_ihm += "</li>";
        attr_ihm += "<li><a id='uci_menu_ouverture_aide' href=\""+hebergementFullPath+"help/help_"+accessibilitytoolbar.strings.getLocale()+".html"+"\" target='_blank'>";
        attr_ihm += accessibilitytoolbar.get('uci_menu_help');
        attr_ihm += "</a></li>";
        attr_ihm += "<li><a id='uci_menu_toolbar' value='on' name='a11yToolbarEnabled' href='#' onclick='UciIhm.ToolbarHide();return false;'>";
        attr_ihm += accessibilitytoolbar.get('uci_link_hide_toolbar');
        attr_ihm += "</a>";
        attr_ihm +=  "</li>";
        attr_ihm += " <li><a id='uci_menu_remoce_all' href='#' onclick='UciIhm.remove_all();return false;'>";
        attr_ihm += accessibilitytoolbar.get('uci_menu_remove_all');
        attr_ihm += "</a></li>";
        attr_ihm += "<li><a href='#' id='uci_menu_activate_cdu_for_site' onclick=\"UciIhm.desactiveCDUForWebSite();return false;\">";
        attr_ihm += (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?accessibilitytoolbar.get('uci_txt_disable_cdu'):accessibilitytoolbar.get('uci_txt_enable_cdu'));
        attr_ihm += "</a></li>";
        attr_ihm += "<li><a href='#' id='uci_menu_activer_menu'  onclick='UciIhm.uci_activate_menu();return false;'>";
        attr_ihm += accessibilitytoolbar.get('uci_txt_link_menu_close');
        attr_ihm += "</a></li>";
        attr_ihm += "</ul>";
        attr_ihm += "</div>"; // fin menu     
        attr_ihm += "</div>"; // fin menu        
        attr_ihm += "</div>"; // fin div activate
        attr_ihm += "</div>"; // fin div right
        attr_ihm += "</div>"; // fin div toolbar quick
        /*********************************************Gestion du menu d'onglet*****************************************************
         Mise en place d'un système d'onglet, pour la gestion des différents onglets composant le CDU :
         - Onglet typographie : reprenant les différents éléments en rapport
         * à la police d'écriture
         * aux tailles des texte
         * aux tailles des espacements des mots,des lignes, des caractères
         * à la casse du texte.
         - Onglet agencement : reprenant les différents éléments en rapport :
         * à la gestion de la mise en page
         * à l'alignement des texte
         * à l'apparence des liens de navigations
         * à la supression des effet de transparence, aux images de fond, à la suppréssion des images de premier plan
         - Onglet couleurs : reprenant les différents éléments suivant :
         * Utilisation prédéfinis de couleurs de fond et d'écriture
         * Ou utilisation de couleurs prédéfinies
         * Gestion du contraste entre les couleurs
         - Onglet aide motrices : reprenant les différents comportement d'aide à la motricité :
         * Sauter le contenu
         * Gestion de la navigation par pointage
         * Gestion de la sélection automatique des éléments
         ***************************************************************************************************************************/

        attr_ihm += "<div class='uci_systeme_onglets cdu_c' id=\"uci_zone_form\" style='display:none;'>";
        attr_ihm += "<a id='uci_fermeture_more_comfort' href=\"#\" onclick=\"UciIhm.hide_more_confort('uci_activateOnglet', 'uci_moreconfort_content');return false;\" style='display:none;' title='"+ accessibilitytoolbar.get('uci_txt_low_settings')+"'>";
        attr_ihm += "<img src=\"" + hebergementFullPath + "images/btn_close_cross.39254d4b.png\" alt='"+ accessibilitytoolbar.get('uci_txt_low_settings')+"'>";
        attr_ihm += "</a>";
        attr_ihm += "<div id=\"uci_activateOnglet\" style='display:none;'>"; // uci_activateOnglet        
        attr_ihm += "<!--[if IE 7]><div class='uci_onglets uci_ongletsie7'><![endif]-->";
        attr_ihm += "<!--[if (IE) & (!IE 7)]><div class='uci_onglets'><![endif]-->";        
        attr_ihm += "<!--[if (!IE)]>--><div class='uci_onglets'><!--<![endif]-->"; // uci_onglets
        attr_ihm += "<div>"; // 2
        attr_ihm += "<div class='uci_container_onglets'>";  // 1

        attr_ihm += "<ul id='uci_onglet_confort' role='tablist' class='cdu_c'>";
        attr_ihm += "<li role='tab' aria-selected='true' aria-controls='uci_contenu_onglet_typographie' tabindex='0' class='uci_inline'> <span class=\"onglet_1 onglet\" id=\"onglet_typographie\">";
        attr_ihm += accessibilitytoolbar.get('uci_txt_onglet_typo');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_apparence' tabindex='-1' class='uci_inline'> <span class=\"onglet_0 onglet\" id=\"onglet_apparence\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_txt_onglet_apparence');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_couleur' tabindex='-1' class='uci_inline'> <span  class=\"onglet_0 onglet\" id=\"onglet_couleur\">";
        attr_ihm +=  accessibilitytoolbar.get('uci_txt_onglet_color');
        attr_ihm += "</span></li>";
        attr_ihm += "<li role='tab' aria-selected='false' aria-controls='uci_contenu_onglet_aidemotrice' tabindex='-1' class='uci_inline'> <span class=\"onglet_0 onglet\" id=\"onglet_aidemotrice\">";
        attr_ihm += accessibilitytoolbar.get('uci_txt_onglet_motor_help');
        attr_ihm += "</span></li>";
        attr_ihm += "</ul>";

        attr_ihm += "</div>"; // fin 1
        attr_ihm += "</div>"; // fin 2
        attr_ihm += "</div>"; // fin uci_onglets

        attr_ihm += "<div class='uci_div_conteneur_contenu_onglets'>";
        attr_ihm += "<!--[if IE 7]><div class='uci_contenu_onglets uci_contenu_ongletsie7'><![endif]-->";
        attr_ihm += "<!--[if (IE) & (!IE 7)]><div class='uci_contenu_onglets'><![endif]-->";        
        attr_ihm += "<!--[if (!IE)]>--><div class='uci_contenu_onglets'><!--<![endif]-->"; // uci_contenu_onglets
        var typo = new UciTypographie();
        attr_ihm += typo.InitUciTypographie();
        var apparence = new UciApparence();
        attr_ihm += apparence.InitUciApparence();
        var couleur = new UciCouleur();
        attr_ihm += couleur.InitUciCouleur();
        var aide_motrice = new UciAideMotrice();
        attr_ihm += aide_motrice.InitUciAideMotrice();
        attr_ihm += "</div>"; // fin contenu onglets
        attr_ihm += "</div>"; // fin clear
        attr_ihm += "</div>"; // fin uci_activateOnglet


        var validation =  new UciValidation();
        var strValidation = validation.InitUciValidation();
        attr_ihm += "<div id='uci_validation' class='cdu_n'>"+strValidation+"</div></form>";

        attr_ihm += "</div>"; // fin uci_zone_form
        attr_ihm += "</div>"; // fin container
        return attr_ihm;
    };
    /*Permet d’activer le menu facebook du confort d’utilisation*/
    UciIhm.uci_activate_menu = function () {
        if (document.getElementById('uci_cdu_menu').style.display === "none") {
            document.getElementById('uci_cdu_menu').style.display = "block";
            document.getElementById("uci_activer_menu").style.display = "none";
            document.getElementById("uci_fermer_menu").style.display = "block";
            document.getElementById("uci_fermer_menu").focus();
        } else {
            UciIhm.close_menu();
        }
    };

    /* Permet de désactiver l’affichage du menu facebook.
       @param nofocus boolean true if focus don't need to be pushed
    */


    UciIhm.close_menu = function (nofocus) {
        document.getElementById('uci_cdu_menu').style.display = "none";
        document.getElementById("uci_activer_menu").style.display = "block";
        document.getElementById("uci_fermer_menu").style.display = "none";
        if(nofocus) return false;
        document.getElementById("uci_activer_menu").focus();
    };
    /*Permet d’ouvrir les onglets de plus de confort de la toolbar de CDU.*/
    UciIhm.more_confort = function (id_confort, id_more) {
        if (document.getElementById(id_confort).style.display === "none") {
            UciIhm.close_menu();
            document.getElementById("uci_middle_toolbar").style.backgroundImage= "url("+ hebergementFullPath + "/images/btn_minus.30c7e0a3.png)";
            document.getElementById(id_confort).style.display = "block";
            if(document.getElementById('uci_quick_a11yBigger_keepit').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_keepit').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yBigger_150').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_150').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yBigger_200').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yBigger_200').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').setAttribute('tabindex','-2');
            if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').getAttribute('tabindex')=== '0')
                document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').setAttribute('tabindex','-2');
            document.getElementById('uci_active_cdu_img').setAttribute('tabindex','-2');
            document.getElementById('uci_activer_menu').setAttribute('tabindex','-2');
            if(document.getElementById('uci_zone_form'))
            {
                document.getElementById('uci_zone_form').style.display = "block";
            }
            document.getElementById('uci_fermeture_more_comfort').style.display = "block";
            document.getElementById('uci_left_toolbar').className = "cdu_c uci_mask";
            document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','true');
            document.getElementById('uci_middle_toolbar').className = "cdu_c uci_mask";
            document.getElementById('uci_right_toolbar').className = "cdu_c uci_mask";
            document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','true');
            document.getElementById('uci_toolbar-quick').className = "cdu_c uci_mask";            
            document.getElementById('uci_moreconfort').title=accessibilitytoolbar.get('uci_txt_low_settings');
            document.getElementById('uci_moreconfort_content').innerHTML=accessibilitytoolbar.get('uci_txt_low_settings_display');
            // disable hide the toolbar
            //document.getElementById('uci_moreconfortleft').setAttribute('onclick','return false;');
            //document.getElementById('uci_moreconfortleft').setAttribute('tabindex','-1');
            document.getElementById('uci_activer_menu').setAttribute('href','#');
            document.getElementById('uci_active_cdu_img').setAttribute('href','#');
            // disable hide fontsize buttons
            // disable color button
            var elmt = document.getElementById('uci_onglet_confort');
            for(var i=0;i<elmt.children.length;i++){
                var elmt_enfant = elmt.children[i];
                if (elmt_enfant.getAttribute('tabindex') === '0' && elmt_enfant.getElementsByTagName('li')){
                   elmt_enfant.focus();
                }
            }

        } else {
            UciIhm.hide_more_confort(id_confort, id_more);
        }
    };
    UciIhm.hide_more_confort = function (id_confort, id_more) {

        //document.getElementById('uci_moreconfortleft').focus();
        if(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on") {
            document.getElementById("uci_active_cdu_img").focus();
        }
        else {
            document.getElementById("uci_inactive_cdu_img").focus();
        }
        document.getElementById("uci_middle_toolbar").style.backgroundImage= "url("+ hebergementFullPath + "/images/btn_plus.813e8e02.png)";
        document.getElementById(id_confort).style.display = "none";
        if(document.getElementById('uci_zone_form'))
        {
            document.getElementById('uci_zone_form').style.display = "none";
        }
        document.getElementById('uci_fermeture_more_comfort').style.display = "none";
        document.getElementById('uci_left_toolbar').className = "cdu_c";
        document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','false');
        document.getElementById('uci_middle_toolbar').className = "cdu_c";
        document.getElementById('uci_right_toolbar').className = "cdu_c";
        document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','false');
        document.getElementById('uci_toolbar-quick').className = "cdu_c";
        document.getElementById('uci_activer_menu').setAttribute('href',"javascript:UciIhm.uci_activate_menu();");
        document.getElementById('uci_active_cdu_img').setAttribute('href',"javascript:UciIhm.desactiveCDUForWebSite();");
        if(document.getElementById('uci_quick_a11yBigger_keepit').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_keepit').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yBigger_150').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_150').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yBigger_200').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yBigger_200').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yVisualPredefinedSettings_keepit').setAttribute('tabindex','0');
        if(document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').getAttribute('tabindex')=== '-2')
            document.getElementById('uci_quick_a11yVisualPredefinedSettings_blackonwhite').setAttribute('tabindex','0');
        document.getElementById('uci_active_cdu_img').removeAttribute('tabindex');
        //document.getElementById('uci_moreconfortleft').removeAttribute('tabindex');
        document.getElementById('uci_activer_menu').removeAttribute('tabindex');
        document.getElementById('uci_moreconfort').removeAttribute('title');  
        document.getElementById('uci_moreconfort_content').innerHTML=accessibilitytoolbar.get('uci_txt_more_settings');
        // enable hide the toolbar    
        //document.getElementById('uci_moreconfortleft').setAttribute('onclick','UciIhm.ToolbarHide();return false;');

        //document.getElementById('uci_moreconfortleft').setAttribute('tabindex','0');
    };

    UciIhm.activate_liens = function (id_liens) {
        if (document.getElementById(id_liens).style.display === "none") {
            document.getElementById(id_liens).style.display = "block";
            document.getElementById(checked_apparence).checked = "true";
        } else {
            document.getElementById(id_liens).style.display = "none";
            document.getElementById(checked_apparence).checked = "false";
        }
    };

    UciIhm.changement_langue = function (/* String*/langue) {
        // if stack value not equal to cookievalue then display a confirm message to inform the user
        var tempMatrix = accessibilitytoolbar.userPref.convertMatrixv3.reverse();
        if ((accessibilitytoolbar.userPref.encode()+tempMatrix['a11ySiteWebEnabled' + "-" + accessibilitytoolbar.userPref.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "") === accessibilitytoolbar.userPref.cookieValue) 
                || confirm(accessibilitytoolbar.get('uci_modif_not_saved'))){
            accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.cookieValue);
            accessibilitytoolbar.userPref.set("a11yLanguage", langue);
            accessibilitytoolbar.userPref.updateUserPref();
            // when the user change the lang of the interface, wee need to reload after save is done
            accessibilitytoolbar.needToReload = true;
        }
    };

    UciIhm.remove_all = function () {
        var defaultcookieValue = "0000651000650650650000000000000000006500000010"+(accessibilitytoolbar.userPref.get('a11ySiteWebEnabled')==='on'?'0':'1');
        accessibilitytoolbar.userPref.InitUciCookie(defaultcookieValue);
        accessibilitytoolbar.userPref.updateUserPref();
        accessibilitytoolbar.reloadToolbar();
    };


    UciIhm.desactiveCDUForWebSite = function () {
        if (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") !== "on") {
            document.getElementById('uci_active_cdu_img').style.display='block';
            document.getElementById('uci_inactive_cdu_img').style.display='none';
            document.getElementById('uci_left_toolbar').style.display='block';
            document.getElementById('uci_middle_toolbar').style.display='block';
            document.getElementById('uci_span_disabled').style.display='none';
            document.getElementById('uci_menu_activate_cdu_for_site').innerHTML = accessibilitytoolbar.get('uci_txt_disable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "on");
            document.getElementById("uci_active_cdu_img").focus();
        } else {
            document.getElementById('uci_active_cdu_img').style.display='none';
            document.getElementById('uci_inactive_cdu_img').style.display='block';
            document.getElementById('uci_span_disabled').style.display='block';
            document.getElementById('uci_left_toolbar').style.display='none';
            document.getElementById('uci_middle_toolbar').style.display='none';
            document.getElementById('uci_menu_activate_cdu_for_site').innerHTML = accessibilitytoolbar.get('uci_txt_enable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "off");
            document.getElementById("uci_inactive_cdu_img").focus();
        }    
        accessibilitytoolbar.userPref.updateBlackList();
        accessibilitytoolbar.setCSS();
        UciIhm.close_menu(true);
    };

    UciIhm.ToolbarHide = function () {
        accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.cookieValue);
        accessibilitytoolbar.userPref.set("a11yToolbarEnable", "off");
        accessibilitytoolbar.userPref.updateUserPref();

        accessibilitytoolbar.hide();
        if(accessibilitytoolbar.idLinkModeContainer){
            document.getElementById(accessibilitytoolbar.idLinkModeContainer).focus();
        }else{
            document.getElementById('cdu_close').getElementsByTagName("button")[0].focus();
        }
        return false;
    };
}
// Source: app/js/toolbar.js
/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014  Orange

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
        menuContainer.className="show";
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
        if(LoopingUtility.isVisible(elt)) {
            // Case of link
            if(filterLink(elt)){
                return true;
            }
            // Case of clickable elements
            else if(filterOnclick(elt)){
                return true;
            }
            // Case of form element
            else if(filterForm(elt)){
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
            if(elt.nodeName.match(/^A|AREA$/i) && elt.href  && elt.href !== "" && !elt.href.match(/#(motor-bloc|visual-bloc|help-bloc)/) && elt.href.match(/.*(#.+)?/)) {
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
        if(elt.className && elt.className.match(/dontclick/)) {
            return false;
        } else {
            // Check elligible form element
            if (elt.nodeName.match(new RegExp("^INPUT|BUTTON|TEXTAREA|SELECT|OPTION"))) {
                if(elt.disabled == true || elt.type == "hidden") {
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
            //alert(that.selectedElt.nodeName);
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
    var imgSrc = hebergementFullPath+"images/arrows_60.557b9d38.png?v=1";
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
        pad.innerHTML = "<map name='remotemap'>"
            + "<area href='#' class='dontclick scrollup' shape='rect' coords='0,0," + imgWidth + "," + (imgHeight / 2) + "' alt='" + accessibilitytoolbar.get("remotepad_scrollup") + "' />"
            + "<area href='#' class='dontclick scrolldown' shape='rect' coords='0," + (imgHeight / 2) + "," + (imgHeight / 2) + "," + imgHeight + "' alt='" + accessibilitytoolbar.get("remotepad_scrolldown") + "' />"
            + "</map>";
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
     * Cookie error message
     */
    secCookie: null,
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
     * {cookieValue} cookie value received or not
     */
    cookieValue: false,

    /**
     * {RemoteControlMode} Remote control Manager
     */
    remotecontrol: null,

    /**
     * Reference the ruler
     */
    toolbarRuler : null,

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
        if(document.getElementById('uci_activateOnglet').style.display !== 'block' || tagId.match(/uci_quick/g) == null){
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
        elmt.tabindex='0';
        //var bIsColorPalette = false;
        var clearColor = "";
        // remove selected class if present
        elmt.className = elmt.className.replace(/ uci_couleur_li_selected{0,1}/,"");
        elmt.className = elmt.className.replace(/ uci_choix_selected{0,1}/,"");
        // add the selected class
        elmt.className = elmt.className.replace(/uci_couleur_li{0,1}/,"uci_couleur_li uci_couleur_li_selected");
        elmt.className = elmt.className.replace(/uci_choix{0,1}/,"uci_choix uci_choix_selected");
        if(elmt.id.match(/a11yBigger/g) || elmt.id.match(/a11yVisualPredefined/g)){
            if(document.getElementById('uci_activateOnglet').style.display == 'block' && elmt.id.match(/uci_a11y/gi) !=null){
                var element = /^uci_(\S+)$/.exec(elmt.id);
                // on vérifie que son copain existe dans les réglages rapides
                if(document.getElementById('uci_quick_'+ element[1]))
                {
                    accessibilitytoolbar.uciCocherRadioButton (document.getElementById('uci_quick_'+ element[1]));
                    elmt.focus();
                }
            }else if(document.getElementById('uci_activateOnglet').style.display == 'none' && elmt.id.match(/uci_quick/gi) !=null){
                var element = /^uci_quick_(\S+)$/.exec(elmt.id);
                accessibilitytoolbar.uciCocherRadioButton (document.getElementById('uci_'+ element[1]));
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
                reponses.children[iterator].tabindex='-1';
                
                // remove selected class if present
                reponses.children[iterator].className = reponses.children[iterator].className.replace(/ uci_couleur_li_selected{0,1}/,"");
                reponses.children[iterator].className = reponses.children[iterator].className.replace(/ uci_choix_selected{0,1}/,"");
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
                if (prefName === 'a11yRegleColor'){
                    document.getElementById('uci_regle_couleur_lien').style.backgroundColor = value;
                    document.getElementById('uci_regle_couleur_lien').style.setProperty ("background-color", value, "important");
                } else if (prefName === 'a11yNavLienSelColor'){
                    document.getElementById('uci_NavLienSel').style.backgroundColor = value;       
                    document.getElementById('uci_NavLienSel').style.setProperty ("background-color", value, "important");
                } else if (prefName === 'a11yNavLienNonVisColor'){
                    document.getElementById('uci_NavLienNonVis').style.backgroundColor = value;   
                    document.getElementById('uci_NavLienNonVis').style.setProperty ("background-color", value, "important");
                } else if (prefName === 'a11yNavLienVisColor'){
                    document.getElementById('uci_NavLienVis').style.backgroundColor = value;
                    document.getElementById('uci_NavLienVis').style.setProperty ("background-color", value, "important");
                }
                accessibilitytoolbar.userPref.set(prefName,value);
                // if the user change the font or background color without activating the option, then activate it
                if((accessibilitytoolbar.userPref.get('a11yVisualSettings') !=='personnal') && (resArray[resArray.length-2] === 'a11yFontColor' || resArray[resArray.length-2] === 'a11yBackgroundColor')){
                    accessibilitytoolbar.userPref.set('a11yVisualSettings','personnal');
                    document.getElementById('uci_couleur_personnalisees_input').checked='checked';
                    document.getElementById('uci_couleur_predefenie_input').removeAttribute('checked');
                } else{ if(accessibilitytoolbar.userPref.get('a11yVisualSettings') ==='personnal' && resArray[resArray.length-2] === 'a11yVisualPredefinedSettings'){
                            accessibilitytoolbar.userPref.set('a11yVisualSettings','predefined');
                            document.getElementById('uci_couleur_predefenie_input').checked='checked';
                            document.getElementById('uci_couleur_personnalisees_input').removeAttribute('checked');
                        }
                    }
            }
        }
        if(document.getElementById('uci_validation').className==='cdu_n'){
            document.getElementById('uci_validation').className="";
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
        elmt.setAttribute('tabindex', '0');
        elmt.parentNode.setAttribute('tabindex', '0');
        var spanId = /^uci_contenu_(\S+)$/.exec(elmt.getAttribute('aria-controls'));
        document.getElementById(spanId[1]).className='onglet_1 onglet';
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
                reponses.children[iterator].setAttribute('tabindex', '-1');
                reponses.children[iterator].parentNode.setAttribute('tabindex', '-1');
                var spanIdOther = /^uci_contenu_(\S+)$/.exec(reponses.children[iterator].getAttribute('aria-controls'));
                document.getElementById(spanIdOther[1]).className='onglet_0 onglet';
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
        var l = document.createElement('LINK');
        l.rel = "stylesheet";
        l.type = "text/css";
        l.href = hebergementFullPath + 'css/classic-toolbar.669de3f5.css';
        l.id = "a11yCSS";
        this.head.appendChild(l);
    },

    /**
     *
     */
    toolbarCDUContent: function (){   
        var str = "";
        if(accessibilitytoolbar.idLinkModeContainer){
            str = accessibilitytoolbar.toolbarCreateLink();
        }else{
            str = accessibilitytoolbar.toolbarCreateButton();
        }
        return str;
    },

    /**
     * Generates the accessibility too-bar with a button
     *
     */
    toolbarCreateButton: function () {
        var str="";
            str += "<div id='cdu_zone'>";
            if(accessibilitytoolbar.userPref.get('a11yToolbarEnable')=='on'){
                str += "<p id='cdu_close' style='display:none'><button title=\"";
            }else{
                str += "<p id='cdu_close' style='display:block'><button title=\"";
            }

            str +=this.get('uci_alt_logo');
            str += "\">";
            str += this.get('uci_serv_name');
            str += "<span>+</span></button></p>";
            str += "<div id='cdu_content' class='cdu_displayN' >";
            str += accessibilitytoolbar.createToolbar();
        return str;
    },

    /**
     * Generates the accessibility too-bar with a link
     *
     */
    toolbarCreateLink: function () {
        var str="";
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


        //initialisation str for using into createToolbar function
        //search link container
        this.node = document.getElementById(accessibilitytoolbar.idLinkModeContainer);
        //create link with attribute
        this.lien = document.createElement("a");
        this.lien.innerHTML =  this.get('uci_serv_name')+'<span class="uci-plus-orange">+</span>';
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
        skipLinkCreate.innerHTML = this.get('uci_serv_name')+'<span class="uci-plus-orange">+</span>';
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
        //create cdu_content zone
        str += "<div id='cdu_zone'>";

        //create content of CDU
        str += "<div id='cdu_content' class='cdu_displayN' >";
        str += accessibilitytoolbar.createToolbar();
        str += "</div>";
        return str;

    },

    /**
     * Generates the accessibility tool-bar per se
     */
    createToolbar: function () {
        var str = "<form onsubmit='UciValidation.Validation();return false;' onreset='UciValidation.Annulation();' name='uci_form' action='#'>";
        if (accessibilitytoolbar.secCookie !== null) {
            str += "<p id='cdu_secu'>";
            str += "<span class='cdu_hide'>";
            str += this.get('uci_securityCookieChangeAlert');
            str += "</span>";
            str += this.get("uci_securityCookieChange");
            str += "&nbsp;<a href=\"" + hebergementFullPath+"help/help_"+this.strings.getLocale()+".html#_Gestion_des_cookies\">" + this.get("uci_securityCookieChangeLinkPage") + "</a>";
            str += "</p>";
        }else {
            var uci_ihm = new UciIhm();
            str += uci_ihm.InitUciIHM();
        }
        str += "</form>";

        return str;
    },

    /**
     * Add object to objectList for toolbar events
     */
    createObjectBehaviour: function (){
        //declarate my object list in array
        var myObject=[];
        myObject.push(document.getElementById("cdu_jump_link"));
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
        if(this.getCompatible('a11yRegleEnabled'))
        {
            accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_epaisseurregle');
            accessibilitytoolbar.uci_aria_radio_simulation('uci_reponses_couleur_regle');
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


    },
    /**
     * Function event implementation
     * Create an object list with
     */

    eventToolbar: function(myObject){
        var i=0;
        while( i < myObject.length){
            if(myObject[i]){
                accessibilitytoolbar.uciAttachEvent('click','onclick',myObject[i],accessibilitytoolbar.toggle);
            }
            i++;
        }

        if (accessibilitytoolbar.secCookie === null) {
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
            accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_regle_couleur_lien'),accessibilitytoolbar.displayOrNot);

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
            liButtonsPalette = document.getElementById("uci_reponses_couleur_regle").getElementsByTagName("li");
            for (i=0; i < liButtonsPalette.length; i++){
               accessibilitytoolbar.uciAttachEvent('blur','onblur',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
               accessibilitytoolbar.uciAttachEvent('keydown','onkeydown',liButtonsPalette[i],accessibilitytoolbar.HidePaletColor);
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
            case 'uci_regle_couleur_lien':
                idCible = "uci_palette_couleur_regle";
                idEnfant = document.getElementById('uci_a11yRegleColor_'+accessibilitytoolbar.userPref.get("a11yRegleColor"));
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
            }else {
                document.getElementById('uci_palette_couleur_regle').style.display = "none";
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

        if (toolbarContent.className.match(/cdu_displayN/)) {
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
        if(accessibilitytoolbar.userPref.get('a11yToolbarEnable')=='off')
        {
           accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
           accessibilitytoolbar.userPref.updateUserPref();
        }
        document.getElementById("cdu_content").className = "";
        if(!accessibilitytoolbar.idLinkModeContainer){
            var closeLink = document.getElementById("cdu_zone").getElementsByTagName("button")[0];
            closeLink.setAttribute("title", accessibilitytoolbar.get("uci_closeButton"));
            closeLink.innerHTML = accessibilitytoolbar.get("uci_closeButton") + "<span>&times;</span>";
        }
        try{
        //document.getElementById("uci_moreconfortleft").focus();
            if(this.userPref.get("a11ySiteWebEnabled") === "on") {
                document.getElementById("uci_active_cdu_img").focus();
            }
            else {
                document.getElementById("uci_inactive_cdu_img").focus();
            }
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
            if(!accessibilitytoolbar.idLinkModeContainer){
                var openLink = document.getElementById("cdu_zone").getElementsByTagName("button")[0];
                openLink.setAttribute("title", this.get("uci_alt_logo"));
                openLink.innerHTML = this.get('uci_serv_name')+'<span>+</span>';
            }
            if (document.location.href.match(new RegExp("#" + accessibilitytoolbar.contentToJumpTo))) {
                document.location.reload();
            }
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
        if (this.userPref.get("a11ySiteWebEnabled") !== "off" && this.userPref.get("a11yMotorModeEnabled") == "true" && this.userPref.get("a11yMotorMode") == "remote"){
            if(this.remotecontrol == null){
                this.startRemote();
            }
        }else {
            if(this.remotecontrol !== null){
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

    complete : function(){
        // if toolbarRuler isn't already launched
        if(!this.toolbarRuler)
        {
            this.toolbarRuler = new UciRuler();
        }
        else
        {
            if(!this.toolbarRuler.settings.launched)
            {
                this.toolbarRuler.rulerEventCreate();
            }
        }                                              
        // throw move event to update the ruler
        this.toolbarRuler.settings.color=this.userPref.get("a11yRegleColor");
        this.toolbarRuler.settings.thickness=this.userPref.get("a11yRegleEpaisseur");
        this.toolbarRuler.settings.showVertical= this.userPref.get("a11yRegleVertical") == "true";
        this.toolbarRuler.settings.showHorizontal= this.userPref.get("a11yRegleHorizontal")== "true";   
        $(document).mousemove();
    },

    removePreviewCss: function(){
        // get the current stack values
        var currentStackv3value = this.userPref.encode()+'0';
        // put the cookie value into the stackv3
        this.userPref.decode(accessibilitytoolbar.userPref.cookieValue);
        // then apply the cookie css value
        this.setCSS();  
        // then come back to the current settings
        this.userPref.decode(currentStackv3value);

    },

    /**
     * Set new CSS rules
     * 1. linearize if need be by destroying all CSS informations
     * 2. add a new STYLE node with the user's preferences
     */
    setCSS: function () {   
        var links, i, allElts, scriptJquery, done, ruler, doneRuler, imageAlt, spanImage, element, image_uci, s = "";
        if (this.userPref.get("a11yToolbarEnable") !== "off" && document.getElementById("cdu_content").className.match(/cdu_displayN/)) {
            if(document.getElementById('cdu_close'))
            {
                document.getElementById('cdu_close').style.display == 'none';
            }
            this.show();
        }           
        this.removeOrStartRemote();
        this.removeOrStartLoopingMode();   
        if (this.userPref.get("a11ySiteWebEnabled")!="off"){
            // 1. linearize ? -- which is the same as: get rid of all CSS info first
            if (this.userPref.get("a11yLinearize") !== "false") {
                // delete all the CSS references
                links = document.getElementsByTagName("link");
                for (i = links.length - 1; i >= 0; i--) {
                    if (links[i].rel.match(/stylesheet/i) && (!links[i].id || !links[i].id.match(/a11yCSS/))) {
                        this.savesStylesheets.push(links[i]);
                        links[i].parentNode.removeChild(links[i]);
                    }
                }

                // remove the style attribute
                allElts = this.body.getElementsByTagName("*");
                for (i = 0; i < allElts.length; i++) {
                    if (!allElts[i].className.match(/uci_/) && !allElts[i].id.match(/uci_/) && !allElts[i].className.match(/cdu_/) && !allElts[i].id.match(/cdu_/)) {
                        if(allElts[i].getAttribute("style"))
                        {
                            this.savStyleElmtAtt[i]=allElts[i];
                            this.savStyleAttElmt[i]=allElts[i].getAttribute("style");
                            allElts[i].removeAttribute("style");
                        }
                    }
                }
            }
            // if the user remove the option, we need to put back the stylesheets and styles attributes
            else{
                if(this.savesStylesheets.length>0)
                {
                    for (i = this.savesStylesheets.length - 1; i >= 0; i--) {
                        document.getElementsByTagName('head')[0].insertBefore(this.savesStylesheets[i],document.getElementById('a11yCSS'));
                    }
                    // then clean the array
                    this.savesStylesheets = [];
                }
                if(this.savStyleElmtAtt.length>0)
                {
                    i = "";
                    for (i in this.savStyleElmtAtt) {
                        this.savStyleElmtAtt[i].setAttribute("style",this.savStyleAttElmt[i]);
                    }
                    // then clean the array
                    this.savStyleElmtAtt = [];
                    this.savStyleAttElmt = [];
                }   
            }

            
            // generate the CSS instructions
            // 1. do we want bigger fonts?
            if (this.userPref.get("a11yBigger") !== "keepit") {
                s += "body { font-size:" + this.userPref.get("a11yBigger") + "% !important; }\n";
            }

            //gestion de l'affichage du mode espacement des mots
            if (this.userPref.get("a11ySpacement") !== "keepit") {
                s += "*{ word-spacing:" + this.userPref.get("a11ySpacement") + "em !important; }\n";
            }

            //gestion de l'affichage du mode espacement des lignes
            if (this.userPref.get("a11yLineSpacement") !== "keepit") {
                s += "*{ line-height:" + this.userPref.get("a11yLineSpacement") + " !important; }\n";
            }

            //gestion de l'espacement des caractères
            if (this.userPref.get("a11yCharSpacement") !== "keepit") {
                s += "*{ letter-spacing:" + this.userPref.get("a11yCharSpacement") + "em !important; }\n";
            }

            //gestion de la casse : a11yModifCase
            if (this.userPref.get("a11yModifCasseEnabled") !== "false") {
                s += "*{ text-transform:" + this.userPref.get("a11yModifCasse") + " !important; }\n";
            }

            //gestion de la police d'écriture
            if (this.getCompatible('a11yDyslexyFontEnabled') && this.userPref.get("a11yDyslexyFontEnabled") !== "false") {
                //load the font face
                if(this.userPref.get("a11yDyslexyFont")==='opendyslexic')
                {
                    s += "@font-face{font-family: \"opendyslexic\";src: url('"+hebergementFullPath+"fonts/woff/OpenDyslexic-Regular.woff');font-style: normal;font-weight: normal;}@font-face{font-family: \"opendyslexic\";src: url('"+hebergementFullPath+"fonts/woff/OpenDyslexic-Italic.woff');font-style: italic;font-weight: normal;}@font-face{font-family: \"opendyslexic\";src: url('"+hebergementFullPath+"/fonts/woff/OpenDyslexic-Bold.woff');font-weight: bold;font-style: normal;}@font-face{font-family: \"opendyslexic\";src: url('"+hebergementFullPath+"fonts/woff/OpenDyslexic-BoldItalic.woff');font-weight: bold;font-style: italic;} ";
                }
                s += "* {font-family:" + this.userPref.get("a11yDyslexyFont") + " !important; }\n";
            }

            //gestion alignement des texte à gauche
            if (this.userPref.get("a11yLeftText") !== "false") {
                s += "* { text-align:" + this.userPref.get("a11yLeftText") + "!important; }\n";
            }

            //numerotation en mode liste
            if (this.userPref.get("a11yNumerotationList") !== "false") {

                s += "ul, ol  {list-style-position:initial !important; list-style-image: none !important; list-style-type: " + this.userPref.get("a11yNumerotationList") + "!important; }\n";
            }

            //gestion des liens de navigations
            if (this.userPref.get("a11yNavLienEnabled") !== "false"){
                //gestion des liens non visités
                if (this.userPref.get("a11yNavLienNonVisStyle") === "border") {
                    s += "a:link  {border: 1px solid !important; color : " + this.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                }  else if (this.userPref.get("a11yNavLienNonVisStyle") === "bold") {
                    s += "a:link  {font-weight: bold !important; color: " + this.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                } else if (this.userPref.get("a11yNavLienNonVisStyle") === "underline") {
                    s += "a:link  {text-decoration:underline !important; color: " + this.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                } else {
                    s += "a:link  {color: " + this.userPref.get("a11yNavLienNonVisColor") + " !important; }\n";
                }

                //gestion des liens visités
                if (this.userPref.get("a11yNavLienVisStyle") === "border") {
                    s += "a:visited {border: 1px solid !important; color: " + this.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                } else if (this.userPref.get("a11yNavLienVisStyle") === "bold") {
                    s += "a:visited {font-weight: bold !important; color : " + this.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }else if (this.userPref.get("a11yNavLienVisStyle") === "underline") {
                    s += "a:visited {text-decoration:underline !important; color: " + this.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }else {
                    s += "a:visited {color: " + this.userPref.get("a11yNavLienVisColor") + " !important; }\n";
                }

                //gestion du lien actif
                if (this.userPref.get("a11yNavLienSelStyle") === "border") {
                    s += "a:active {border: 1px solid #FF7900!important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {border: 1px solid #FF7900 !important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {border: 1px solid #FF7900 !important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                } else if (this.userPref.get("a11yNavLienSelStyle") === "underline") {
                    s += "a:active {text-decoration:underline !important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {text-decoration:underline !important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {text-decoration:underline !important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                }
                else if (this.userPref.get("a11yNavLienSelStyle") === "bold") {
                    s += "a:active {font-weight: bold !important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {font-weight: bold !important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {font-weight: bold !important; color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                }else {
                    s += "a:active {color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:focus {color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";
                    s += "a:hover {color: " + this.userPref.get("a11yNavLienSelColor") + " !important; }\n";

                }
            }

            //gestion de la regle
            if (this.userPref.get("a11yRegleEnabled") !== "false") {
                //load jquery if not loaded
                if (typeof jQuery == 'undefined') {
                    scriptJquery = document.createElement('script');
                    scriptJquery.src = hebergementFullPath + "js/jquery.min.js";
                    done = false;
                    // wait for jquery complete load
                    scriptJquery.onload = scriptJquery.onreadystatechange = function () {
                        if (!done && ( !this.readyState
                            || this.readyState == "loaded"
                            || this.readyState == "complete")) {
                            done = true;
                            // load the ruler
                            if (!this.toolbarRuler) {
                                ruler = document.createElement('script');
                                ruler.src = hebergementFullPath + "js/ruler.js";
                                doneRuler = false;
                                // wait until ruler complete loaded
                                ruler.onload = ruler.onreadystatechange = function () {
                                    if (!doneRuler && ( !this.readyState
                                        || this.readyState == "loaded"
                                        || this.readyState == "complete")) {
                                        doneRuler = true;
                                        //run the ruler
                                        accessibilitytoolbar.complete();
                                    }
                                };
                                document.getElementsByTagName('body')[0].appendChild(ruler);
                            }
                        }
                    };
                    document.getElementsByTagName('body')[0].appendChild(scriptJquery);
                }

                // if jquery loaded, check if ruler loaded
                if (typeof jQuery !== 'undefined' && !this.toolbarRuler) {
                    ruler = document.createElement('script');
                    ruler.src = hebergementFullPath + "js/ruler.js";
                    doneRuler = false;
                    // wait until ruler complete loaded
                    ruler.onload = ruler.onreadystatechange = function () {
                        if (!doneRuler && ( !this.readyState
                            || this.readyState == "loaded"
                            || this.readyState == "complete")) {
                            doneRuler = true;
                            //run the ruler
                            accessibilitytoolbar.complete();
                        }
                    };
                    document.getElementsByTagName('body')[0].appendChild(ruler);
                }
                if (typeof jQuery !== 'undefined' && this.toolbarRuler) {
                    accessibilitytoolbar.complete();
                }
            }
            // if ruler was launch before deactivation kill!
            else if(this.toolbarRuler && this.toolbarRuler.settings.launched)
            {
                this.toolbarRuler.rulerEventRemove();
            }

            //suppression des effets de transparences
            if (this.userPref.get("a11ySupEffetTransp") !== "false") {
                /* Case of old IE Browser */
                s += "*  { filter:alpha(opacity=100) !important; }\n";
                /* Case of IE Browser */
                s += "*  { opacity: 1 !important; }\n";
            }

            //supression des images de fond
            if (this.userPref.get("a11ySupImageFont") !== "false") {
                s += "*  { background-image: none !important; }\n";
            }

            
            var listeimg,i,backGroundColor,fontColor,uminositeFond,LuminositePolice,newStyle;
            //suppression des images de premier plan
            listeimg = document.images;
            
            if (this.userPref.get("a11ySupImageFirstPlan") !== "false" && !document.getElementById("spanImage1")){
                for (i = 0; i < listeimg.length; i++) {
                    if(!document.getElementById("spanImage"+i)){
                        if(!(/^uci_(\S+)$/.exec(listeimg[i].parentNode.id))){
                            imageAlt = listeimg[i].alt;
                            spanImage = document.createElement("span");
                            spanImage.setAttribute("id", "spanImage" + i);
                            var newlink = document.createElement('a');
                            if (imageAlt === ""){
                                newlink.innerHTML = accessibilitytoolbar.get('uci_link_display_picture') + " " + accessibilitytoolbar.get('uci_link_display_picture_no_alt');
                            }else {
                                newlink.innerHTML = accessibilitytoolbar.get('uci_link_display_picture') + " " + imageAlt;
                            }
                            newlink.href = "#uci_img_" + i;
                            accessibilitytoolbar.uciAttachEvent('click','onclick',newlink,accessibilitytoolbar.activationPicture);
                            spanImage.appendChild(newlink);
                            listeimg[i].parentNode.insertBefore(spanImage, listeimg[i]);
                            listeimg[i].className=listeimg[i].className+" uci_disable_image";        
                        }
                    }
                }
            }else if (this.userPref.get("a11ySupImageFirstPlan") == "false"){
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
            } 

            //gestion des couleurs
            // 2. add a new STYLE node with the user's preferences only if font color wasn't equal to the background one
            document.getElementById('uci_reponses_bigger_quick_set').className = document.getElementById('uci_reponses_bigger_quick_set').className.replace(/ uci_black{0,1}/,"");
            document.getElementById('uci_reponses_couleurpredefinie').className = document.getElementById('uci_reponses_couleurpredefinie').className.replace(/ uci_black{0,1}/,"");            
            if((this.userPref.get("a11yVisualSettings") === "predefined" && this.userPref.get("a11yVisualPredefinedSettings") !=="keepit") || (this.userPref.get("a11yVisualSettings") === "personnal" && this.userPref.get("a11yFontColor") !== this.userPref.get("a11yBackgroundColor")))
            {
                if (this.userPref.get("a11yVisualSettings") === "predefined") {
                    document.getElementById('uci_message_constraste').style.display= 'none';
                    element = document.getElementById('uci_reponses_bigger_quick_set');
                    backGroundColor = "#FFF";
                    fontColor = "#000";                    
                    /*defect 67 */ 
                    if(this.userPref.get("a11yVisualPredefinedSettings") == "whiteonblack")
                    {                                       
                        document.getElementById('uci_reponses_bigger_quick_set').className = document.getElementById('uci_reponses_bigger_quick_set').className + " uci_black";
                        document.getElementById('uci_reponses_couleurpredefinie').className = document.getElementById('uci_reponses_couleurpredefinie').className + " uci_black";
                        fontColor = "#FFF";
                        backGroundColor = "#000";
                    }
                }
                else {
                    /**
                     * Convert hexa colo to rgb
                    */
                    /* Implemented algorithm                                         
                    R = hexToR("#FFFFFF");
                    G = hexToG("#FFFFFF");
                    B = hexToB("#FFFFFF");
                    
                    function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
                    function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
                    function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
                    function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
                    
                    Puis application calcul luminosité relative
                    http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef                    
                    
                    */                    
                    LuminositeFond = this.conversionColor(parseInt(this.userPref.get("a11yBackgroundColor").substring(1,3),16)) * 0.2126 
                        + this.conversionColor(parseInt(this.userPref.get("a11yBackgroundColor").substring(3,5),16)) * 0.7152 
                        + this.conversionColor(parseInt(this.userPref.get("a11yBackgroundColor").substring(5,7),16)) * 0.0722;
                    
                    LuminositePolice = this.conversionColor(parseInt(this.userPref.get("a11yFontColor").substring(1,3),16)) * 0.2126 
                        + this.conversionColor(parseInt(this.userPref.get("a11yFontColor").substring(3,5),16)) * 0.7152 
                        + this.conversionColor(parseInt(this.userPref.get("a11yFontColor").substring(5,7),16)) * 0.0722;

                    //calcul du contraste entre 2 couleurs
                    /*
                      contrast ratio
                        (L1 + 0.05) / (L2 + 0.05), where
                            L1 is the relative luminance of the lighter of the colors, and
                            L2 is the relative luminance of the darker of the colors.
                    */
                    if (((Math.max(LuminositePolice, LuminositeFond) + 0.05)/(Math.min(LuminositePolice, LuminositeFond) + 0.05)) < 4.5 ) {
                        if (document.getElementById('uci_message_constraste').style.display  === 'none'){
                            document.getElementById('uci_message_constraste').style.display = 'block';
                        }
                    } else if (document.getElementById('uci_message_constraste').style.display === 'block'){
                        document.getElementById('uci_message_constraste').style.display= 'none';
                    }
                    fontColor = this.userPref.get("a11yFontColor");
                    backGroundColor = this.userPref.get("a11yBackgroundColor");                        
                }
                
                s += "* { color:" + fontColor + " !important; }\n";
                s += "a:link { color:" + fontColor + "; text-decoration:underline !important; }\n";
                s += "a:visited { color:" + fontColor + "; text-decoration:underline !important;}\n";
                s += "fieldset { border-color:" + fontColor + " !important; }\n";
                s += "button, input[type='submit'], input[type='text'] { border-style:outset !important; border-color:" + fontColor + " !important; }\n";
                s += "td,th {border:1px solid " + fontColor + " !important; padding:.2em !important;}";
                s += "table {border-collapse: collapse !important;}";
                s += "* { background-color:" + backGroundColor + " !important; background:" + backGroundColor + " !important; }\n";
            }            
        }
        
        // Remove previous user style
        if (document.getElementById("a11yUserPrefStyle")) {
            document.getElementsByTagName("head")[0].removeChild(document.getElementById("a11yUserPrefStyle"));
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
            var str ="";
            // remove the opent link
            var myChildNode = document.getElementById('uci_link');
            myChildNode.parentNode.removeChild(myChildNode);
            // remove the skip link
            var myChildNodeSkip = document.getElementById('idCduSkip');
            myChildNodeSkip.parentNode.removeChild(myChildNodeSkip);
            str = accessibilitytoolbar.toolbarCreateLink();
            document.getElementById('accessibilitytoolbarGraphic').innerHTML = str;
        }else{
            document.getElementById('accessibilitytoolbarGraphic').innerHTML = accessibilitytoolbar.toolbarCreateButton();
        }
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
        // this creates a few hooks to hold to
        accessibilitytoolbar.head = document.getElementsByTagName('head')[0];
        accessibilitytoolbar.body = document.getElementsByTagName('body')[0];
        accessibilitytoolbar.html = document.getElementsByTagName('html')[0];

        // find the locale for correct language  
        accessibilitytoolbar.strings.setLocale();

        if(accessibilitytoolbar.userPref.get('a11yLanguage') !== "keepit"){

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
        d.innerHTML = accessibilitytoolbar.toolbarCDUContent();
        this.body.insertBefore(d, this.body.firstChild);
        accessibilitytoolbar.loadTheToolbar();

    },

    loadTheToolbar: function () {
        accessibilitytoolbar.createObjectBehaviour();
        if (accessibilitytoolbar.secCookie === null) {
            // set CSS to the user's settings
            accessibilitytoolbar.setCSS();
            // jump to content if needed
            accessibilitytoolbar.jumpToContent();
        }

    },

    /**
     * Receive message from the iframe
     */
    receiveMessage: function (event) {
        // Do we trust the sender of this message?
        if ( event.origin.replace('https:', '') !== hebergementDomaine.replace('https:', '') || typeof event.data === 'object')
            return;
        
        // back from cookie Save
        if (event.data == "saveDone") {
            if(accessibilitytoolbar.needToReload)
            {
                accessibilitytoolbar.reloadToolbar();
            }
        }
        //cookieData
        else
        {            
            if (event.data == "NOCOOKIE") {
                // Put the information message into cdu_intro area
                accessibilitytoolbar.secCookie = true;
                // default value
                accessibilitytoolbar.cookieValue = false;
                accessibilitytoolbar.userPref.InitUciCookie(false);
            }
            else {
                accessibilitytoolbar.cookieValue = event.data;
                accessibilitytoolbar.userPref.InitUciCookie( event.data);
            }
        }
    },
    /**
     * @function is_touch_device
     * @returns {boolean}
     */
    is_touch_device: function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|android|ipad|playbook|silk|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
        {
            return true;
        }
            return false;
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
     * Start the thing
     */
    start: function () {
        // detect the browser 
        if(!this.is_touch_device(navigator.userAgent || navigator.vendor || window.opera)){
            if (!document.getElementById || !document.getElementsByTagName || !document.createElement) {
                return;
            }
            /*  clean escape just in case you're using a very rusty browser */
            if (document.getElementById("a11yToolbar")) {
                document.getElementById("a11yToolbar").setAttribute("uci_language", "unknown");
            } else {
                // doesn't work on ie>7 so we test before
                if (window.postMessage) {
                    // when the data response was received, launch the init of the toolbar
                    this.userPref = new UciCookie();
                    this.addOnLoad(this.init);

                    /**
                     * Add the catch event for message from the iframe
                     */
                    if (window.addEventListener) {
                        window.addEventListener("message", this.receiveMessage, false);
                    }
                    else if (window.attachEvent) {
                        window.attachEvent("onmessage", this.receiveMessage);
                    }
                    var oNewNode = document.createElement("iframe");
                    oNewNode.setAttribute("src", hebergementFullPath + 'cookie.php?hostname='+document.location.hostname+'&origin=' + document.location.href);
                    oNewNode.setAttribute("id", 'id_frame_cookie');
                    oNewNode.setAttribute("name", 'frame_cookie');
                    oNewNode.setAttribute("width", '0');
                    oNewNode.setAttribute("height", '0');
                    oNewNode.setAttribute("style", 'width:0;height:0;border:0');
                    document.getElementsByTagName('body')[0].appendChild(oNewNode);
                }
            }
        }

    }
};
accessibilitytoolbar.start();