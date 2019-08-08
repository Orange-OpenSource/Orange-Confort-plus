/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014 - 2019  Orange SA

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
 @class Collection of user preference
 */
function UciUserPref() {
    "use strict";
    this.defautStoredValue = "000000000380350270001003000000006500000";
    // settings value
    this.storedValue = false;
    // list of available settings by profils
    this.settings = {current: "", profiles: {}};   
    this.predefinedSettings = {
      '0':this.defautStoredValue, // no profile
      '1':"000100000380350270001100000000006571400",
      // 1 = Arial + font-size = 125% + Texte jaune sur fond bleu + supprimer les images de fond
      '2':"000000010380350270111110000000006500400",
      // 2 = Arial + + font-size = 120%  + espace entre les lignes Moyen + texte à gauche + numbered list + activation du masque moyen ( ?)
      '3':"000000000380350271001103000001006500000" 
      // 3 = start browse on hover + apparence des liens (souligné + couleur standard)
    }

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
        "a11ySiteWebEnabled-0": "a11ySiteWebEnabled-on",
        "a11ySiteWebEnabled-1": "a11ySiteWebEnabled-off",
        "a11yToolbarEnable-0": "a11yToolbarEnable-off",
        "a11yToolbarEnable-1": "a11yToolbarEnable-on",
        "a11yLanguage-0": "a11yLanguage-keepit",
        "a11yLanguage-1": "a11yLanguage-FR",
        "a11yLanguage-2": "a11yLanguage-EN",
        "a11yLanguage-3": "a11yLanguage-ES",
        "a11yLanguage-4": "a11yLanguage-PL",
        "a11yJumpToContent-0": "a11yJumpToContent-false",
        "a11yJumpToContent-1": "a11yJumpToContent-true",
        "a11yLinearize-0": "a11yLinearize-false",
        "a11yLinearize-1": "a11yLinearize-true",
        //Gestion de la taille de police
        //25, 33, 50, 67, 75, 80, 90,
        // keepit, 110, 125, 150, 175, 200
        "a11yBigger-0": "a11yBigger-keepit",
        "a11yBigger-1": "a11yBigger-150",
        "a11yBigger-2": "a11yBigger-200",
        "a11yBigger-3": "a11yBigger-110",
        "a11yBigger-4": "a11yBigger-125",
        "a11yBigger-5": "a11yBigger-175",
        "a11yVisualSettings-0": "a11yVisualSettings-false",
        "a11yVisualSettings-1": "a11yVisualSettings-true",
        "a11yVisualPredefinedSettings-0": "a11yVisualPredefinedSettings-personnal",
        "a11yVisualPredefinedSettings-1": "a11yVisualPredefinedSettings-whiteonblack",
        "a11yVisualPredefinedSettings-2": "a11yVisualPredefinedSettings-blackonwhite",
        "a11yVisualPredefinedSettings-3": "a11yVisualPredefinedSettings-blueonyellow",
        "a11yVisualPredefinedSettings-4": "a11yVisualPredefinedSettings-yellowonblue",
        "a11yVisualPredefinedSettings-5": "a11yVisualPredefinedSettings-greenonblack",
        "a11yVisualPredefinedSettings-6": "a11yVisualPredefinedSettings-blackongreen",
        "a11yVisualPredefinedSettings-7": "a11yVisualPredefinedSettings-blueonwhite",
        "a11yVisualPredefinedSettings-8": "a11yVisualPredefinedSettings-whiteonblue",
        "a11yMotorModeRemote-0": "a11yMotorModeRemote-false",
        "a11yMotorModeRemote-1": "a11yMotorModeRemote-true",
        "a11yMotorModeLooping-0": "a11yMotorModeLooping-false",
        "a11yMotorModeLooping-1": "a11yMotorModeLooping-true",
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
        "a11yDyslexyFont-0": "a11yDyslexyFont-arial",
        "a11yDyslexyFont-1": "a11yDyslexyFont-opendyslexic",
        "a11yDyslexyFont-3": "a11yDyslexyFont-keepit",
        "a11yDyslexyFont-4": "a11yDyslexyFont-opensans",
        "a11yDyslexyFont-5": "a11yDyslexyFont-accessibledfa",
        "a11yDyslexyFont-6": "a11yDyslexyFont-luciole",
        "a11yLineSpacement-0": "a11yLineSpacement-keepit",
        "a11yLineSpacement-1": "a11yLineSpacement-2",
        "a11yLineSpacement-2": "a11yLineSpacement-3",
        //gestion de l'espacement des mot
        "a11ySpacement-0": "a11ySpacement-keepit",
        "a11ySpacement-1": "a11ySpacement-0.5",
        "a11ySpacement-2": "a11ySpacement-1",
        "a11yModifCasse-0": "a11yModifCasse-capitalize",
        "a11yModifCasse-1": "a11yModifCasse-keepit",
        "a11yModifCasse-2": "a11yModifCasse-lowercase",
        "a11yModifCasse-3": "a11yModifCasse-uppercase",
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
        //gestion mask
        "a11yMaskEnabled-0":        "a11yMaskEnabled-false",
        "a11yMaskEnabled-1":        "a11yMaskEnabled-true",
        // mask option, reading mask, hruler or vruler
        "a11yMaskOption-0" :        "a11yMaskOption-mask",
        "a11yMaskOption-1" :        "a11yMaskOption-hruler",
        "a11yMaskOption-2" :        "a11yMaskOption-vruler",

        "a11yMaskOpacity-0" :       "a11yMaskOpacity-.5",
        "a11yMaskOpacity-1" :       "a11yMaskOpacity-.25",
        "a11yMaskOpacity-2" :       "a11yMaskOpacity-.9",

        "a11ySupEffetTransp-0":     "a11ySupEffetTransp-false",
        "a11ySupEffetTransp-1":     "a11ySupEffetTransp-1",
        "a11ySupImageFont-0" :      "a11ySupImageFont-false",
        "a11ySupImageFont-1" :      "a11ySupImageFont-true",
        "a11ySupImageFirstPlan-0" : "a11ySupImageFirstPlan-false",
        "a11ySupImageFirstPlan-1" : "a11ySupImageFirstPlan-true",
        "a11ySupGif-0" :            "a11ySupGif-false",
        "a11ySupGif-1" :            "a11ySupGif-true",
        "a11yPauseVideo-0" :        "a11yPauseVideo-false",
        "a11yPauseVideo-1" :        "a11yPauseVideo-true",
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
        "a11ySiteWebEnabled":     [41,1],
        "a11yToolbarEnable":      [40,1],
        "a11yLanguage":           [39,1],
        "a11yJumpToContent":      [38,1],
        "a11yLinearize":          [37,1],
        "a11yBigger":             [36,1],
        "a11yVisualSettings":     [35,1],
        "a11yVisualPredefinedSettings": [34,1],
        "a11yFontColor":          [32,2],
        "a11yBackgroundColor":    [30,2],
        "a11yMotorModeRemote":    [29,1],
        "a11yMotorModeLooping":   [28,1],
        "a11yDelayBeforeClick":   [27,1],
        "a11yMenuPositionning":   [26,1],
        "a11yDelayBeforeLoop":    [25,1],
        "a11yQuickMode":          [24,1],
        "a11yDyslexyFont":        [23,1],
        "a11yLineSpacement":      [22,1],
        "a11ySpacement":          [21,1],
        "a11yModifCasse":         [20,1],
        "a11yLeftText":           [19,1],
        "a11yNumerotationList":   [18,1],
        "a11yNavLienEnabled":     [17,1],
        "a11yNavLienSelColor":    [15,2],
        "a11yNavLienSelStyle":    [14,1],
        "a11yNavLienNonVisColor": [12,2],
        "a11yNavLienNonVisStyle": [11,1],
        "a11yNavLienVisColor":    [9,2],
        "a11yNavLienVisStyle":    [8,1],
        "a11yMaskEnabled":        [7,1],
        "a11yMaskOption" :        [6,1],
        "a11yMaskOpacity" :       [5,1],
        "a11ySupEffetTransp":     [4,1],
        "a11ySupImageFont" :      [3,1],
        "a11ySupImageFirstPlan" : [2,1],
        "a11ySupGif" :            [1,1],
        "a11yPauseVideo" :        [0,1]
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
        "a11yVisualSettings": "false",
        "a11yVisualPredefinedSettings": "personnal",
        "a11yFontColor": "#000000",
        "a11yBackgroundColor": "#FFFFFF",
        "a11yMotorModeRemote": "false",
        "a11yMotorModeLooping": "false",
        "a11yDelayBeforeClick": "1",
        "a11yMenuPositionning": "center",
        "a11yDelayBeforeLoop": "1",
        "a11yQuickMode": "2",
        "a11yDyslexyFont": "keepit",
        "a11yLineSpacement" : "keepit",
        "a11ySpacement": "keepit",
        "a11yModifCasse" : "keepit",
        "a11yLeftText":           "false",
        "a11yNumerotationList":   "false",
        "a11yNavLienEnabled":     "false",
        "a11yNavLienSelColor":    "#FF0000",
        "a11yNavLienSelStyle":    "keepit",
        "a11yNavLienNonVisColor": "#0000FF",
        "a11yNavLienNonVisStyle": "keepit",
        "a11yNavLienVisColor":    "#FF007F",
        "a11yNavLienVisStyle":    "keepit",
        "a11yMaskEnabled":        "false",
        "a11yMaskOption" :        "mask",
        "a11yMaskOpacity" :     ".5",
        "a11ySupEffetTransp":     "false",
        "a11ySupImageFont" :      "false",
        "a11ySupImageFirstPlan" : "false",
        "a11ySiteWebEnabled" :    "on",
        "a11ySupGif" :            "false",
        "a11yPauseVideo" :        "false"
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
        // if decode without params, load the latest saved value for curent profile
        if(typeof pref === 'undefined') {
            this.settings.current = '0';
            pref = this.predefinedSettings[this.settings.current];
        }
        // update cookie value, adding option to disable gif and video create 2 new bits
        if(pref.length===37) {
            pref = "00"+pref;
        }
        // uniquement si le nombre de caractères du cookie est correct!
        if(pref.length===39)
        {
          for (prefName in this.maskMatrixv3) {
            if(prefName !== "a11ySiteWebEnabled" && prefName !== "a11yToolbarEnable" && prefName !== "a11yLanguage") {
                this.stackv3[prefName]= this.convertMatrixv3[prefName + "-" +pref.substr(this.maskMatrixv3[prefName][0],this.maskMatrixv3[prefName][1])].replace(/.*-/, "");
            }
          }
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
        pref = pref.substring(0,pref.length-3);
        return pref;
    };

    /**
     * Create the string separate by | for cookie or localstorage save
     * format: currentprofilname|profilname1|valueprofil1|profilname2|valueprofil2 ....
     * 
     */
    this.encodeUsageConfort= function () {
        var tempMatrix = this.convertMatrixv3.reverse();
        var encodedValue = tempMatrix["a11yToolbarEnable" + "-" + this.stackv3["a11yToolbarEnable"]].replace(/.*-/, "") + "|" + tempMatrix["a11yLanguage" + "-" + this.stackv3["a11yLanguage"]].replace(/.*-/, "") + "|" + this.settings.current;
        var profil;
        for (profil in this.settings.profiles) {
            encodedValue += "|"+profil+"|"+this.settings.profiles[profil];
        }        
        return encodedValue;
    };

    /**
     * Create the string separate by | for cookie or localstorage save
     * format: websitedisable|currentprofilname|profilname1|valueprofil1|profilname2|valueprofil2 ....
     * 
     */
    this.decodeUsageConfort= function (storageValue) {
        var settings = storageValue.split('|');
         // need to explode the values
         // at least 4 entry : 
         // first bit set site enable or disable second set toolbar enable, third one set default lang, 4th one set to no profile
        // first param set site enable or disable
        var disablevalue = settings.shift();
        if(!onOffEnabled) disablevalue = 0;
        this.stackv3["a11ySiteWebEnabled"] = this.convertMatrixv3["a11ySiteWebEnabled" + "-" +disablevalue].replace(/.*-/, "");
        var a11yToolbarEnable = settings.shift();
        this.stackv3["a11yToolbarEnable"] = this.convertMatrixv3["a11yToolbarEnable" + "-" +a11yToolbarEnable].replace(/.*-/, "");
        var a11yLanguage = settings.shift();
        this.stackv3["a11yLanguage"] = this.convertMatrixv3["a11yLanguage" + "-" +a11yLanguage].replace(/.*-/, "");


        this.settings.current = settings.shift();
        // parse all profiles if they are
        var profil = null;
        while(profil = settings.shift()) {
            this.settings.profiles[profil] = settings.shift();                
        }
        this.readUserPref();
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
    this.setStoredValue = function (storedValue, profilName) {
        if(profilName) {
          this.settings.current = profilName;
        }
        if(this.settings.current.length >= 3) {
            if(storedValue) {
                this.settings.profiles[this.settings.current] = storedValue;
            } else { // if no storedvalue is provided set the default value
                this.settings.profiles[this.settings.current] = this.defautStoredValue;
            }
        } else { // if we are on a predefined profile, set to no profile
            this.settings.current = 0;
        }
        this.readUserPref();
    };

    /**
     * Read browser cookies and save each user preference into the user
     * preference stackv3.
     */
    this.readUserPref = function () {
      if(this.settings.current.length <= 1) {
        this.decode(this.predefinedSettings[this.settings.current]);
      } else {
        this.decode(this.settings.profiles[this.settings.current]);
      }
      this.finish = true;
    };


    /**
     * get the current saved pref as the numerical  string to be compared to current setting in the stack
     */
    this.getCurrentPref = function () {
      if(this.settings.current.length <= 1) {
        return this.predefinedSettings[this.settings.current];
      } else {
        return this.settings.profiles[this.settings.current];
      }
    };

    /**
     * Wait for callback completed and user preference stackv3 updated
     * @return {Boolean} true if user preference is loaded, false otherwise.
     */
    this.isUserPrefLoaded = function () {
        return this.finish;
    };
}