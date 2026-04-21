/*
 * userprofile.js : gestion du profil utilisateur
 * Ce module fait partie du projet LireCouleur - http://lirecouleur.arkaline.fr
 * 
 * @author Marie-Pierre Brungard
 * @version 1.0
 * @since 2022
 *
 * GNU General Public Licence (GPL) version 3
 */
const profilDefaut1 = '{"name":"Syllabes colorées","description":"Alternance de couleurs sur les syllabes et marquage des phonèmes muets","params":{"SYLLABES_ECRITES":true,"novice_reader":true,"SYLLABES_LC":true},"format":{"font_name":"   ","color":"#111111","background":"#ffffff","line_spacing":150,"scale_width":150,"height":20,"page_width":50},"process":[{"function":"alternsyllabes","format":[{"color":"#ea0000","background":"#ffffff"},{"color":"#0000e1","background":"#ffffff"}]},{"function":"phonemes","format":[{"selection":["#","verb_3p","#_amb"],"color":"#aaaaaa","background":"#ffffff","phonemes":["#","verb_3p","#_amb"]}]}]}';
const profilDefaut2 = '{"name":"Lecture texte","description":"Lit le texte affiché","params":{"SYLLABES_ECRITES":true,"novice_reader":false,"SYLLABES_LC":true},"format":{"font_name":"Accessible DfA","color":"#000000","background":"#ffffff","line_spacing":130,"scale_width":100,"height":20,"page_width":70},"process":[{"function":"lecteur","params":{"rate":8}},{"function":"defaut"}]}';
const profilDefaut3 = '{"name":"Mots colorés","description":"Alternance de couleurs sur les mots et marquage des phonèmes muets","params":{"SYLLABES_ECRITES":true,"novice_reader":true,"SYLLABES_LC":true},"format":{"font_name":"   ","color":"#111111","background":"#ffffff","line_spacing":150,"scale_width":150,"height":20},"process":[{"function":"alternmots","format":[{"color":"#000000","background":"#ffff80"},{"color":"#000000","background":"#80ff80"}]},{"function":"phonemes","format":[{"selection":["#","verb_3p","#_amb"],"color":"#aaaaaa","background":"#ffffff","phonemes":["#","verb_3p","#_amb"]}]}]}';
const profilDefaut4 = '{"name":"Graphèmes colorés","params":{"novice_reader":true},"format":{"height":24,"line_spacing":130,"page_width":70},"process":[{"function":"phonemes","format":[{"color":"#999999","phonemes":["#","verb_3p","#_amb"]},{"color":"#3333ff","phonemes":["a"]},{"color":"#ff0000","phonemes":["q","q_caduc","x"]},{"color":"#33cc00","phonemes":["i"]},{"color":"#cc6600","phonemes":["o","o_comp","o_ouvert"]},{"color":"#ffcc33","phonemes":["u"]},{"color":"#006600","phonemes":["y"]},{"color":"#33ffff","phonemes":["e","e_comp"]},{"color":"#339999","phonemes":["e^","e^_comp"]},{"color":"#3333ff","stroke":true,"bold":true,"phonemes":["a~"]},{"color":"#006600","bold":true,"phonemes":["e~","x~"]},{"color":"#990000","bold":true,"phonemes":["x^"]},{"color":"#cc6600","stroke":true,"bold":true,"phonemes":["o~"]}]}]}';
const profilDefaut5 = '{"name":"Syllabes séparées","description":"Sépare les syllabes","params":{"SYLLABES_ECRITES":true,"novice_reader":false,"SYLLABES_LC":true},"format":{"font":"   ","color":"#111111","background":"#ffffff","line_spacing":200,"scale_width":150,"height":20},"process":[{"separator":"˰","function":"syllabes"},{"function":"phonemes","format":[{"selection":["#_amb","#","verb_3p"],"color":"#9b9b9b","background":"#ffffff","phonemes":["#_amb","#","verb_3p"]}]},{"function":"alternmots","format":[{"color":"#000000","background":"#f8fec7"},{"color":"#000000","background":"#dfefff"}]}]}';

var profilsParDefaut = `[${profilDefaut1},${profilDefaut2},${profilDefaut3},${profilDefaut4},${profilDefaut5}]`;

class UserProfile {
    constructor(jsonProfil) {
        this.json = JSON.parse(JSON.stringify(jsonProfil));
        this.functions = new Array();
        this.style = "";
        this.std_lc = 'lc';
        this.oral_ecrit = 'ecrit';
        this.lecteur_deb = false;
        this.id = jsonProfil.name;

        if (jsonProfil.hasOwnProperty("format")) {
            this.style = txtStyle(jsonProfil['format']);
        } else {
            this.json.format = new Object();
        }

        if (jsonProfil.hasOwnProperty("process")) {
            for (let i = 0; i < jsonProfil.process.length; i++) {
                let fct = jsonProfil.process[i];
                if ((fct.hasOwnProperty("function")) && (lc6classes.hasOwnProperty(fct.function))) {
                    this.functions.push(new lc6classes[fct.function](fct));
                }
            }
        } else {
            this.json.process = new Object();
        }

        if (jsonProfil.hasOwnProperty("params")) {
            if (jsonProfil.params.hasOwnProperty("novice_reader")) {
                this.lecteur_deb = jsonProfil.params.novice_reader;
            }

            if (jsonProfil.params.hasOwnProperty("SYLLABES_LC")) {
                if (!jsonProfil.params.SYLLABES_LC) {
                    this.std_lc = 'std';
                }
            }
            if (jsonProfil.params.hasOwnProperty("SYLLABES_STD")) {
                if (jsonProfil.params.SYLLABES_STD) {
                    this.std_lc = 'std';
                }
            }
            if (jsonProfil.params.hasOwnProperty("SYLLABES_ORALES")) {
                if (jsonProfil.params.SYLLABES_ORALES) {
                    this.oral_ecrit = 'oral';
                }
            }
            if (jsonProfil.params.hasOwnProperty("SYLLABES_ECRITES")) {
                if (!jsonProfil.params.SYLLABES_ECRITES) {
                    this.oral_ecrit = 'oral';
                }
            }
        } else {
            this.json.params = new Object();
        }
    }

    toJSONString() {
        return JSON.stringify(this.json);
    }

    toHTML(text, textElt) {
        /*
        for (let i = 0; i < this.functions.length; i++) {
            text = this.functions[i].execute(text);
        }
        */
        this.txt = new Texte(text);
        this.txt.prepare(this.functions, this.lecteur_deb, this.std_lc, this.oral_ecrit);
        return this.txt.toHTML(this.functions, textElt);
    }

    postProcessHTML(textElt) {
        // appliquer les fonctions de transformation globales
        for (let i = 0; i < this.functions.length; i++) {
            let func = this.functions[i];
            if (func.getLevel() == FunctionLC6.TEXTE) {
                func.postProcessHTML(textElt);
            }
        }
    }

    hasFunction(functionName) {
        let func = lc6classes[functionName];
        for (let i = 0; i < this.functions.length; i++) {
            if (this.functions[i] instanceof func) {
                return true;
            }
        }
        return false;
    }

    getFunction(functionName) {
        let func = lc6classes[functionName];
        for (let i = 0; i < this.functions.length; i++) {
            if (this.functions[i] instanceof func) {
                return this.functions[i];
            }
        }
        return undefined;
    }
}

class UserProfiles {
    constructor() {
        let lccookie = this.getCookie('lirecouleur6');
        let icookie = this.getCookie('lirecouleur-index-profil');
        let cook = null;
        if (lccookie !== null) {
            try {
                cook = JSON.parse(lccookie);
            } catch (error) {
                console.log(error);
                cook = null;
            }
        }
        if (cook === null) {
            cook = JSON.parse(profilsParDefaut);
        }
        if (icookie !== null) {
            this.indexCookie = parseInt(icookie);
        } else {
            this.indexCookie = 0;
        }

        this.profiles = new Array();
        for (let i = 0; i < cook.length; i++) {
            let elem = cook[i];
            this.profiles.push(new UserProfile(cook[i]));
        }
    }

    toJSONString() {
        let txt = '[';
        let sep = '';
        for (let i = 0; i < this.profiles.length; i++) {
            txt += sep + this.profiles[i].toJSONString();
            sep = ',';
        }
        txt += ']';
        return txt;
    }

    replaceProfile(index, json) {
        if (this.profiles.length > 1) {
            if ((index > -1) && (index < this.profiles.length)) {
                delete this.profiles[index];
                this.profiles[index] = new UserProfile(json);
                this.setCookie('lirecouleur6', this.toJSONString(), 365);
            }
        }
    }

    addProfile(json) {
        // recherche s'il existe déjà un profil de même nom
        var nbProfils = this.profiles.length;
        let cpt = 0;

        json.name = json.name.trim();
        for (let i = 0; i < nbProfils; i++) {
            if (this.profiles[i].id == json.name) {
                cpt++;
            }
        }
        if (cpt > 0) {
            // renommage du profil pour distinguer du profil déjà répertorié
            json.name += " (1)";
        }

        // ajout à la liste des profils
        this.profiles.push(new UserProfile(json));
        this.setCookie('lirecouleur6', this.toJSONString(), 365);

        // le profil ajouté devient le profil courant
        this.selectProfile(nbProfils);
    }

    removeProfile(index) {
        if (this.profiles.length > 1) {
            if ((index > -1) && (index < this.profiles.length)) {
                if (this.indexCookie >= index) {
                    // le profil sélectionné est après le profil courant
                    this.selectProfile(this.indexCookie - 1);
                }
                this.profiles.splice(index, 1);
                this.setCookie('lirecouleur6', this.toJSONString(), 365);
            }
        }
    }

    getNbProfiles() {
        return this.profiles.length;
    }

    getProfileIndex(i) {
        return this.profiles[i];
    }

    getSelectedProfile() {
        if ((this.indexCookie < 0) || (this.indexCookie > this.profiles.length - 1)) {
            this.indexCookie = this.profiles.length - 1;
        }
        return this.profiles[this.indexCookie];
    }

    getSelectedProfileIndex() {
        return this.indexCookie;
    }

    selectProfile(i) {
        this.indexCookie = i;
        this.setCookie('lirecouleur-index-profil', i.toString(), 365);
    }

    setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Strict";
    }

    getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                let substr = c.substring(name.length, c.length);
                return decodeURIComponent(substr);
            }
        }
        return null;
    }
}
