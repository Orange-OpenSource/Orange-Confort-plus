/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014 - 2016  Orange SA

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
 * User pref stackv3 generic class.<br />
 @class Collection of user preference
 */
function UciUserPref() {
    "use strict";
    
    this.storedValue = false;
    this.finish = false;
 
    
    /**
     * Collection of mask used to get value of necessary bits
     * for each encoded variable
     * @private
     */
    this.couleurs={"00": "#FFFFFF",  "01": "#330000",  "02": "#331900",  "03": "#333300",  "04": "#193300",  "05": "#003300",  "06": "#003319",  "07": "#003333",  "08": "#001933",  "09": "#000033",  "10": "#190033",  "11": "#330033",  "12": "#330019",  "13": "#000000",  "14": "#990000",  "15": "#994C00",  "16": "#999900",  "17": "#4C9900",  "18": "#009900",  "19": "#00994C",  "20": "#009999",  "21": "#004C99",  "22": "#000099",  "23": "#4C0099",  "24": "#990099",  "25": "#99004C",  "26": "#404040",  "27": "#FF0000",  "28": "#FF8000",  "29": "#FFFF00",  "30": "#80FF00",  "31": "#00FF00",  "32": "#00FF80",  "33": "#00FFFF",  "34": "#0080FF",  "35": "#0000FF",  "36": "#7F00FF",  "37": "#FF00FF",  "38": "#FF007F",  "39": "#808080",  "40": "#FF6666",  "41": "#FFB266",  "42": "#FFFF66",  "43": "#B2FF66",  "44": "#66FF66",  "45": "#66FFB2",  "46": "#66FFFF",  "47": "#66B2FF",  "48": "#6666FF",  "49": "#B266FF",  "50": "#FF66FF",  "51": "#FF66B2",  "52": "#C0C0C0",  "53": "#FFCCCC",  "54": "#FFE5CC",  "55": "#FFFFCC",  "56": "#E5FFCC",  "57": "#CCFFCC",  "58": "#CCFFE5",  "59": "#CCFFFF",  "60": "#CCE5FF",  "61": "#CCE5FF",  "62": "#E5CCFF",  "63": "#FFCCFF",  "64": "#FFCCE5",  "65": "#000000"};
    
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
        //gestion masque
        "a11yMaskEpaisseur-0" :    "a11yMaskEpaisseur-thin",
        "a11yMaskEpaisseur-1" :    "a11yMaskEpaisseur-medium",
        "a11yMaskEpaisseur-2" :    "a11yMaskEpaisseur-thick",

        "a11ySupEffetTransp-0":     "a11ySupEffetTransp-false",
        "a11ySupEffetTransp-1":     "a11ySupEffetTransp-1",
        "a11ySupImageFont-0" :      "a11ySupImageFont-false",
        "a11ySupImageFont-1" :      "a11ySupImageFont-true",
        "a11ySupImageFirstPlan-0" : "a11ySupImageFirstPlan-false",
        "a11ySupImageFirstPlan-1" : "a11ySupImageFirstPlan-true",
        "a11yMaskEnabled-0" :       "a11yMaskEnabled-false",
        "a11yMaskEnabled-1" :       "a11yMaskEnabled-true",
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
    
    /**
     * Create the var for each color
     */
    this.create_color = function(paramname){
        for(var key in this.couleurs){
            this.convertMatrixv3[paramname + key]=paramname+this.couleurs[key];
        }
    };

    this.create_color('a11yFontColor-');
    this.create_color('a11yBackgroundColor-');
    this.create_color('a11yNavLienSelColor-');
    this.create_color('a11yNavLienNonVisColor-');
    this.create_color('a11yNavLienVisColor-');
    
    this.maskMatrixv3 = {
        // Mask Name                | Dec Value
    	"a11ySiteWebEnabled":     [42,1],
    	"a11yMaskEpaisseur" :     [41,1],
        "a11yMaskEnabled":        [40,1],
        "a11yApercuAuto":         [39,1],
        "a11yToolbarEnable":      [38,1],
        "a11yLanguage":           [37,1],
        "a11yJumpToContent":      [36,1],
        "a11yLinearize":          [35,1],
        "a11yBigger":             [34,1],
        "a11yVisualSettings":     [33,1],
        "a11yVisualPredefinedSettings": [32,1],
        "a11yFontColor":          [30,2],
        "a11yBackgroundColor":    [28,2],
        "a11yMotorModeEnabled":   [27,1],
        "a11yMotorMode":          [26,1],
        "a11yDelayBeforeClick":   [25,1],
        "a11yMenuPositionning":   [24,1],
        "a11yDelayBeforeLoop":    [23,1],
        "a11yQuickMode":          [22,1],
        "a11yCharSpacement":      [21,1],
        "a11yDyslexyFontEnabled": [20,1],
        "a11yDyslexyFont":        [19,1],
        "a11yLineSpacement":      [18,1],
        "a11ySpacement":          [17,1],
        "a11yModifCasseEnabled":  [16,1],
        "a11yModifCasse":         [15,1],
        "a11yLeftText":           [14,1],
        "a11yNumerotationList":   [13,1],
        "a11yNavLienEnabled":     [12,1],
        "a11yNavLienSelColor":    [10,2],
        "a11yNavLienSelStyle":    [9,1],
        "a11yNavLienNonVisColor": [7,2],
        "a11yNavLienNonVisStyle": [6,1],
        "a11yNavLienVisColor":    [4,2],
        "a11yNavLienVisStyle":    [3,1],
        "a11ySupEffetTransp":     [2,1],
        "a11ySupImageFont" :      [1,1],
        "a11ySupImageFirstPlan" : [0,1]
    };
    
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
        "a11yMaskEpaisseur" :    "thin",
        "a11ySupEffetTransp":     "false",
        "a11ySupImageFont" :     "false",
        "a11ySupImageFirstPlan" : "false",
        "a11ySupImageFirstPlan" : "false",
        "a11ySiteWebEnabled" : "on",
        "a11yApercuAuto" : "false",
        "a11yMaskEnabled" : "false"
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
        if(pref.length===43)
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
    /*
     * @constructor init
     */
    this.setStoredValue = function (storedValue) {
        this.storedValue = storedValue;
        this.readUserPref();
    };

    /**
     * Read browser cookies and save each user preference into the user
     * preference stackv3.
     */
    this.readUserPref = function () {
        if(this.storedValue !== false)
        {
            this.decode(this.storedValue);
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
}