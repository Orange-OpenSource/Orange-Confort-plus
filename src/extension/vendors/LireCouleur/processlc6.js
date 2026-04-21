/*
 * processlc6.js
 * Ce module fait partie du projet LireCouleur - http://lirecouleur.arkaline.fr
 * 
 * @author Marie-Pierre Brungard
 * @version 1.0
 * @since 2022
 *
 * GNU General Public Licence (GPL) version 3
  */

class Texte {
    constructor(txt) {
        this.text = txt;
        this.level = FunctionLC6.TEXTE;
        this.portions = new Array();
        this.intercal = new Array();
    }

    /**
     * Prépare la structure de données pour le formatage typographique
     * @param {*} lfunc 
     */
    prepare(lfunc, lecteur_deb, std_lc, oral_ecrit) {
        // définition du niveau de décomposition maximal
        let maxlev = 0;
        lfunc.forEach(element => {
            maxlev = Math.max(maxlev, element.getLevel());
        });

        // décompositions
        this.decompose(maxlev, lecteur_deb, std_lc, oral_ecrit);
    }

    decompose(lev, lecteur_deb, std_lc, oral_ecrit) {
        if (lev > this.level) {
            let ntext = this.text;
            let i = 0;
            const pat = /([a-z@àäâéèêëîïôöûùçœ'’0123456789]+)/gi;
            for (const match of ntext.matchAll(pat)) {
                // mot
                let nmot = new Mot(match[0]);
                nmot.decompose(lev, lecteur_deb, std_lc, oral_ecrit);
                this.portions.push(nmot);

                // portion entre mots
                this.intercal.push(ntext.slice(i, match.index));
                i = match.index + match[0].length;
            }
            this.intercal.push(ntext.slice(i));
        }
    }

    span(txt) {
        return (txt.length > 0 ? `<span class="mot">${txt}</span>` : "");
    }

    toHTML(lfunc, textElt) {
        let ntext = "";
        // appliquer les fonctions de transformation aux portions
        if (this.portions.length > 0) {
            for (let i = 0; i < this.portions.length; i++) {
                let portion = this.portions[i].toHTML(lfunc, textElt);
                //if (this.intercal.length > 0) ntext += this.span(this.intercal[i]);
                if (this.intercal.length > 0) ntext += this.intercal[i];
                ntext += portion;
            }
            //if (this.intercal.length > 0) ntext += this.span(this.intercal[this.portions.length]);
            if (this.intercal.length > 0) ntext += this.intercal[this.portions.length];
        } else {
            ntext = this.text;
        }

        // appliquer les fonctions de transformation globales
        for (let i = 0; i < lfunc.length; i++) {
            let func = lfunc[i];
            if (func.getLevel() == this.level) {
                ntext = func.toHTML(ntext, textElt);
            }
        }
        //console.log(ntext);
        return ntext;
    }
}

class Mot extends Texte {
    constructor(txt) {
        super(txt);
        this.level = FunctionLC6.MOT;
        this.mot = /([a-zA-ZàäâéèêëîïôöûùçœÂÊÎÔÛÄËÏÖÜÀÇÉÈŒÙ'’]+)/.test(txt);
        //console.log("Mot:"+txt);
    }

    decompose(lev, lecteur_deb, std_lc, oral_ecrit) {
        if ((lev > this.level) && (this.mot)) {
            if (lev == FunctionLC6.LETTRE) {
                // décomposition du mot en lettres
                let ntext = this.text;
                if (ntext.length < 1) {
                    return;
                }
                for (let i = 0; i < ntext.length; i++) {
                    this.portions.push(new Lettre(ntext[i]));
                }
            } else {
                // décomposition du mots en phonèmes et syllabes
                try {
                    var phon = LireCouleur.extrairePhonemes(this.text, lecteur_deb);
                    if (phon === null) {
                        this.mot = false;
                    } else {
                        var sylls = LireCouleur.extraireSyllabes(phon, std_lc, oral_ecrit);
                        var nbsylls = sylls.length;
                        var isyll = 0;
                        sylls.forEach(element => {
                            var nsyll = new Syllabe("", isyll, nbsylls);
                            nsyll.compose(element, lev);
                            this.portions.push(nsyll);
                            isyll += 1;
                        });
                    }
                } catch (error) {
                    console.error(error);
                    this.mot = false;
                }
            }
        }
    }

    toHTML(lfunc, txtElt) {
        if (!this.mot) {
            // pas de transformation pour les non mots
            return this.span(this.text);
        }
        return this.span(super.toHTML(lfunc, txtElt));
    }
}

class Syllabe extends Texte {
    constructor(txt, index, nbobj) {
        //console.log(lcs);
        super(txt);
        this.index = index;
        this.level = FunctionLC6.SYLLABE;
    }

    compose(lcs, lev) {
        if (lev > this.level) {
            lcs.phonemes.forEach(element => {
                let nphon = new Phoneme(element.lettres, element.phoneme);
                this.portions.push(nphon);
                this.text += element.lettres;
            });
        } else {
            lcs.phonemes.forEach(element => {
                this.text += element.lettres;
            });
        }
    }

    toHTML(lfunc, txtElt) {
        let ntext = "";
        // appliquer les fonctions de transformation aux portions
        if (this.portions.length > 0) {
            this.portions.forEach(element => {
                ntext += element.toHTML(lfunc, txtElt);
            });
        } else {
            ntext = this.text;
        }

        // appliquer les fonctions de transformation globales
        for (let i = 0; i < lfunc.length; i++) {
            let func = lfunc[i];
            if (func.getLevel() == this.level) {
                ntext = func.toHTML(ntext, this.index, txtElt);
            }
        }
        //console.log(ntext);
        return ntext;
    }
}

class Phoneme extends Texte {
    constructor(txt, code) {
        super(txt);
        this.code = code;
        this.level = FunctionLC6.PHONEME;
    }

    toHTML(lfunc, txtElt) {
        let ntext = '';
        for (let i = 0; i < lfunc.length; i++) {
            let func = lfunc[i];
            if (func.getLevel() == this.level) {
                ntext = func.toHTML(this.text, this.code, txtElt);
            }
        }
        //console.log(ntext);
        return ntext;
    }
}

class Lettre extends Texte {
    constructor(txt, code) {
        super(txt);
        this.code = code;
        this.level = FunctionLC6.LETTRE;
    }

    toHTML(lfunc, txtElt) {
        let ntext = '';
        for (let i = 0; i < lfunc.length; i++) {
            let func = lfunc[i];
            if (func.getLevel() == this.level) {
                ntext = func.toHTML(this.text, this.code, txtElt);
            }
        }
        //console.log(ntext);
        return ntext;
    }
}
