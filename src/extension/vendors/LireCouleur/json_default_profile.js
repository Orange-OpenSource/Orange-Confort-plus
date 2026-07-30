// "format" : {"height":24,"line_spacing":130,"page_width":70},
// => style="font-size: 24px; line-height: 1.3; max-width: 70rem;">

// "ɑ̃" replaced with "a\u0303" otherwise display is wrong
// 'ʒ' replaced with "\u0292" : does not solve the display issue with Accessible DfA
const defaultProfileJson = `
{
    "name"   : "Graphèmes colorés",
    "params" : {"novice_reader":true},
    "format" : {"line_spacing":150,"page_width":70},
    "process":[
        {
            "function":"phonemes",
            "format":[
                {"color":"#999999",                               "phonemes":["#","verb_3p","#_amb"],   "phonetics":"",        "example":["lettre muette"]},
                {"color":"#7f3c00",                               "phonemes":["a"],                     "phonetics":"a",       "example":["patte", "pâte"]},
                {"color":"#6688ff",                               "phonemes":["q","q_caduc","x", "x^"], "phonetics":"ø, ə, œ", "example":["je, une, oeil"]},
                {"color":"#ffd200", "stroke":false, "bold":false, "phonemes":["i"],                     "phonetics":"i",       "example":["si"]},
                {"color":"#fee347",                               "phonemes":["j"],                     "phonetics":"j",       "example":["fille"]},
                {"color":"#ff47c2",                               "phonemes":["o","o_comp","o_ouvert"], "phonetics":"o",       "example":["rose", "taureau"]},
                {"color":"#ff0000",                               "phonemes":["u"],                     "phonetics":"u",       "example":["doux"]},
                {"color":"#c40083",                               "phonemes":["y"],                     "phonetics":"y",       "example":["tu"]},
                {"color":"#ff7900",                               "phonemes":["e","e_comp"],            "phonetics":"e",       "example":["blé", "et"]},
                {"color":"#008000",                               "phonemes":["e^","e^_comp"],          "phonetics":"ɛ",       "example":["è, ai"]},
                {"color":"#16b84e", "stroke":false, "bold":false, "phonemes":["a~"],                    "phonetics":"a\u0303", "example":["enfant"]},
                {"color":"#cfc3b4",                 "bold":false, "phonemes":["e~","x~"],               "phonetics":"ɛ̃, œ̃",    "example":["vin", "main", "un"]},
                {"color":"#f88e55", "stroke":false, "bold":false, "phonemes":["o~"],                    "phonetics":"ɔ̃",       "example":["bon"]},
                {"color":"#00ffcc",                               "phonemes":["k", "k_qu"],             "phonetics":"k",       "example":["coq", "quai"]},
                {"color":"#bef574",                               "phonemes":["s^"],                    "phonetics":"ʃ",       "example":["ch", "sh"]},
                {"color":"#bf3030",                               "phonemes":["f", "f_ph"],             "phonetics":"f",       "example":["feu", "phi"]},
                {"color":"#66ff33",                               "phonemes":["g", "g_u"],              "phonetics":"g",       "example":["gars", "gui"]},
                {"color":"#ffff66", "stroke":false,               "phonemes":["z^", "z^_g"],            "phonetics":"ʒ",       "example":["j'ai, geai"]},
                {"color":"#b58e6b",                               "phonemes":["wa"],                    "phonetics":"wa",      "example":["oie"]},
                {"color":"#095228",                               "phonemes":["s", "s_c", "s_t"],       "phonetics":"s",       "example":["ss", "ç"]},
                {"color":"#6c0277",                               "phonemes":["z", "z_s"],              "phonetics":"z",       "example":["zone"]},
                {"color":"#7f3c00",                               "phonemes":["p"],                     "phonetics":"p",       "example":["pont"]},
                {"color":"#6688ff",                               "phonemes":["b"],                     "phonetics":"b",       "example":["bon"]},
                {"color":"#ffd200",                               "phonemes":["t"],                     "phonetics":"t",       "example":["temps"]},
                {"color":"#fee347",                               "phonemes":["d"],                     "phonetics":"d",       "example":["dans"]},
                {"color":"#ff47c2",                               "phonemes":["v"],                     "phonetics":"v",       "example":["vent"]},
                {"color":"#ff0000",                               "phonemes":["m"],                     "phonetics":"m",       "example":["mont"]},
                {"color":"#c40083",                               "phonemes":["n"],                     "phonetics":"n",       "example":["nom"]},
                {"color":"#ff7900",                               "phonemes":["n~"],                    "phonetics":"ɲ",       "example":["agneau"]},
                {"color":"#008000",                               "phonemes":["g~"],                    "phonetics":"ŋ",       "example":["camping"]},
                {"color":"#16b84e",                               "phonemes":["l"],                     "phonetics":"l",       "example":["long"]},
                {"color":"#cfc3b4",                               "phonemes":["r"],                     "phonetics":"ʁ",       "example":["rond"]}

            ]
        }
    ]
}
`
 /** Retrieve default profile object from json code */
 getDefaultProfile = () => {  
    const cg = JSON.parse(defaultProfileJson)
    return JsonProfile.from(cg)
}

/** Class used to manipulate high-level profiles (aka 'format' type profiles) */
class JsonProfile {

    constructor(name, description, params, format, process) {
        this.name = name;
        this.description = description;
        this.params = params;
        this.format = format;
        this.process = process;
    }

    stringify = () => JSON.stringify(this)

    /** Transform high-level profile ('format' type profile) used by end developer
     *  into low-level profile ('style' type profile, closer to html) */
    asUserProfile = () => new UserProfile(JSON.parse(this.stringify()))

    getProcess = () => new ProfileProcess(this.process)

    addFunc(funcObj) { this.process.push(funcObj); return this }
    unshiftFunc(funcObj) { this.process.unshift(funcObj); return this }
    getFuncAt = (index) => this.process[index]
    setFuncAt(index, funcObj) { this.process[index] = funcObj }
    funcIndex = (funcName) => this.process.findIndex( f => f.function === funcName)
    replaceOrAddFunc(funcObj) {
        const index = this.funcIndex(funcObj.function)
        if(index== -1) this.addFunc(funcObj)
        else this.setFuncAt(index, funcObj)
        return this
    }

    /** Handling of syllables separation, using 'syllabes' function.
     *  NOTE: 'syllabes' is French for 'syllables' */
    getSyllabesFunc = () => this.process[this.funcIndex("syllabes")]
    setSyllabesSeparator = (sep) => this.getSyllabesFunc().separator = sep

    getPhonemesFunc = () => this.process[this.funcIndex("phonemes")]

    /** Getting the array of all specs in the profile.
     * NOTE : A 'spec' is an association of a fontSpec (aka color) and the group of phonemes to which it is applied. */
    getSpecTable = () => this.getPhonemesFunc().format

    /** Get a table of all colors used in the 'phonemes' function of the profile. */
    getColors = () => this.getSpecTable().map(obj => obj.color)
    
    /** Get the 'font spec' part of all spec elements into a new table. Extends getColors() purpose.
     *  NOTE : The font spec is the spec independently of the phonemes it is used for. */
    getFontSpecs = () => this.getSpecTable().map(obj => ({color:obj.color, bold:obj.bold, stroke:obj.stroke}))

    setFontSpecAt = (index, color, bold, stroke) => { 
        this.getSpecTable().splice(index, 0, {color, stroke, bold})
    }
    /** Adding given spec to profile. */
    addSpec = (spec) => {
        this.getSpecTable().push(spec)
    }
    /** Removing given spec from profile. */
    removeSpec = (spec) => {
        const phoneme = spec.phonemes[0]
        const specTable = this.getSpecTable()
        const specIndex = specTable.findIndex(p => p.phonemes.includes(phoneme))
        specTable.splice(specIndex, 1)
    }

    static from (obj) {
        let jp = new JsonProfile(obj.name, obj.description, obj.params, obj.format, obj.process)
        jp.name = obj.name
        jp.description = obj.description
        jp.params = obj.params
        jp.format = obj.format
        jp.process = obj.process
        return jp;
    }
}

/** Adapt text using LireCouleur (toHTML).
 *  Keep original text in 'elt.originalContent' to allow temporary cancellation of adaptation. */
const adapt = (usedProfile, id) => {
    let elt = document.getElementById(id);

    if(!elt) {
        console.log(`adapt() called on 'falsy' element ${elt}`)
        return
    }
  
    if(!elt.originalContent) elt.originalContent = elt.textContent
  
    let html = usedProfile.toHTML(elt.originalContent, elt);
  
    /** insertion du html du texte adapté dans le DOM à partir de l'élément 'id'
     *  et ajustement du style de l'élément */
    elt.innerHTML = html;
    elt.style = usedProfile.style;
  
    /** facultatif : traitement complémentaire pour l'applications de fonctions globales
      * comme le surlignage des lignes, ou la fonction de lecture de texte */
    usedProfile.postProcessHTML(elt);
   
}

/** Temporary cancellation of adaptation */
const cancelAdapt = (id) => {
    const elt = document.getElementById(id);
    if(elt.originalContent) elt.textContent = elt.originalContent 
}