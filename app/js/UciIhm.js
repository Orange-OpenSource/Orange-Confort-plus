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
/**
 * @class IHM
 * @classdesc Cette classe permettra de gérer les appels des onglets de la toolbar
 */
/*global window */
/*global document: false */
/* global alert */
/**
 * @class Entry point for the accessibility tool-bar
 */
UciIhm = {
    /*
     * @public
     * @constructor
     * 	constructor uci_ihm() : Constructeur de la class uciIhm
     *
     */
    InitUciIHM: function () {        
      return accessibilitytoolbar.make(["div", {"class":"cdu_c"},
          ["div", {id:"uci_toolbar-quick", "class":"cdu_c"},
            ["div", {"class":"uci_logo_plus_de_confort cdu_c"},
              ["h1", {"class":"uci_alt_logo"},
                accessibilitytoolbar.get('uci_serv_name'),
                ["span", {"class":"uci-plus-orange"}, "+"]
              ],
              ["div", {"class":"cdu_c uci-onoffswitch"},
                ["a", {"class":"uci-onoffswitch-label"+(accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?"-on":""),
                        title:accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on"?accessibilitytoolbar.get('uci_title_disable_cdu'):accessibilitytoolbar.get('uci_title_enable_cdu'),
                        id:"uci-onoffswitch",
                        href:"#"
                  },
                  ["span", {"class":"uci-onoffswitch-inner-before"}, "On"],
                  ["span", {"class":"uci-onoffswitch-inner-after"}, "Off"]
                ]
              ]            
            ],
            ["div", {"class":"uci_right"},
              ["div", {"class":"cdu_c uci_notmask", id:"uci_left_toolbar", style:(accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on" ? "display:none":"")},
                ["ul", {"class":"uci_liste_bton cdu_c",id:"uci_reponses_bigger_quick_set",role:"radiogroup"},
                  ["li", {id:"uci_quick_a11yBigger_keepit",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? "true" : "false",                    
                      title:accessibilitytoolbar.get('uci_title_fontsize_radio_normal')
                    }, ["span",
                      "A",
                      ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_title_fontsize_radio_normal')]
                    ]
                  ],
                  ["li", 
                    {id:"uci_quick_a11yBigger_150",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yBigger") === "150" ? "true" : "false",                    
                      title:accessibilitytoolbar.get('uci_title_fontsize_radio_medium')
                    },
                    ["span",
                      "A",
                      ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_title_fontsize_radio_medium')]
                    ]
                  ],
                  ["li", 
                    {id:"uci_quick_a11yBigger_200",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? "true" : "false",                    
                      title:accessibilitytoolbar.get('uci_title_fontsize_radio_large')
                    },
                    ["span",
                      "A",
                      ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_title_fontsize_radio_large')]
                    ]
                  ]
                ],
                ["ul", {"class":"uci_liste_bton cdu_c",id:"uci_reponses_couleurpredefinie_quick_set",role:"radiogroup"},
                  ["li", {id:"uci_quick_a11yVisualPredefinedSettings_keepit",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "keepit" ? "true" : "false",                    
                      title:accessibilitytoolbar.get('uci_title_color_keepit')
                    },
                    ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_title_color_keepit')],
                    ["span", {"class":"cdu-icon cdu-icon-test"},
                      ["span", {"class":"cdu-icon path1"}],
                      ["span", {"class":"cdu-icon path2"}],
                      ["span", {"class":"cdu-icon path3"}],
                      ["span", {"class":"cdu-icon path4"}]
                    ]
                  ],
                  ["li", 
                    {id:"uci_quick_a11yVisualPredefinedSettings_blackonwhite",
                      role:"radio",
                      "class":"uci_choix uci_inline ucibtn-secondary "+(accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "active": ""),
                      tabindex:accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "0" : "-1",
                      "aria-checked":accessibilitytoolbar.userPref.get("a11yVisualPredefinedSettings") === "blackonwhite" ? "true" : "false",                    
                      title:accessibilitytoolbar.get('uci_title_color_blackonwhite')
                    },
                    ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_title_color_blackonwhite')],
                    ["span", {"class":"cdu-icon cdu-icon-couleurs2"}]
                  ]
                ]
              ],
              ["div", {"class":"cdu_c uci_notmask", id:"uci_middle_toolbar", style:(accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on" ? "display:none":"")},
                ["a", {"class":"uci_lien_plus_reglage cdu_c ucibtn ucibtn-sm ucibtn-secondary", href:"#", id:"uci_moreconfort"},
                  ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-plus2", id:"uci_icon_moreconfort"}],
                  ["span", { id:"uci_moreconfort_content"}, accessibilitytoolbar.get('uci_txt_more_settings')]
                ]
              ],
              ["div", {"class":"cdu_c uci_notmask", id:"uci_right_toolbar"},
                ["ul",
                  ["li", {"class":"uci_inline uci_menu_bton"},
                    ["button", {"class":"uci_bton_menu cdu_c", "aria-haspopup":"true", "aria-expanded":"false", id:"uci_activer_profile", type:"button"}, "profile"],
                    ["div",
                      ["div", {id:"uci_cdu_profile", style:"display:none;", class:"uci_submenu"},
                        UciProfile.InitUciProfile()
                      ]
                    ]
                  ],
                  ["li", {"class":"uci_inline uci_menu_bton"},
                    ["button", {"class":"uci_bton_menu cdu_c", id:"uci_activer_menu", type:"button"}, accessibilitytoolbar.get('uci_txt_link_menu')],
                    ["div",
                      ["div", {id:"uci_cdu_menu", style:"display:none;",class:"uci_submenu"},
                        ["ul",
                          ["li",
                            ["div", {id:"uci_language"},
                              ["input", {"class":(accessibilitytoolbar.userPref.get("a11yLanguage") === "FR"?"uci_choix active":"uci_choix")+" ucibtn ucibtn-sm ucibtn-secondary",
                                          type:"button",
                                          name:"uci_language_FR",
                                          value:"FR",
                                          id:"uci_FR",
                                          title:accessibilitytoolbar.get('uci_txt_menu_change_lang_fr')
                                        }],
                              ["input", {"class":(accessibilitytoolbar.userPref.get("a11yLanguage") === "EN"?"uci_choix active":"uci_choix")+" ucibtn ucibtn-sm ucibtn-secondary",
                                          type:"button",
                                          name:"uci_language_EN",
                                          value:"EN",
                                          id:"uci_EN",
                                          title:accessibilitytoolbar.get('uci_txt_menu_change_lang_en')
                                        }],
                              ["input", {"class":(accessibilitytoolbar.userPref.get("a11yLanguage") === "ES"?"uci_choix active":"uci_choix")+" ucibtn ucibtn-sm ucibtn-secondary",
                                          type:"button",
                                          name:"uci_language_ES",
                                          value:"ES",
                                          id:"uci_ES",
                                          title:accessibilitytoolbar.get('uci_txt_menu_change_lang_es')
                                        }],
                              ["input", {"class":(accessibilitytoolbar.userPref.get("a11yLanguage") === "PL"?"uci_choix active":"uci_choix")+" ucibtn ucibtn-sm ucibtn-secondary",
                                          type:"button",
                                          name:"uci_language_PL",
                                          value:"PL",
                                          id:"uci_PL",
                                          title:accessibilitytoolbar.get('uci_txt_menu_change_lang_pl')
                                        }]
                            ]
                          ],
                          ["li",
                            ["a", {"class":"uci_menu_ouverture_aide", href:"http://confort-plus.orange.com/index_"+accessibilitytoolbar.strings.getLocale().toLowerCase(), title:accessibilitytoolbar.get('uci_menu_info')+" ("+accessibilitytoolbar.get('uci_new_window')+")", target:"_blank"},
                              ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-info"}],
                              ["span", accessibilitytoolbar.get('uci_menu_info')]
                            ]
                          ],
                          ["li",
                            ["a", {"class":"uci_menu_ouverture_aide", href:helpPath[accessibilitytoolbar.strings.getLocale()], title:accessibilitytoolbar.get('uci_menu_help')+" ("+accessibilitytoolbar.get('uci_new_window')+")", target:helpPathTarget},
                              ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-help"}],
                              ["span", accessibilitytoolbar.get('uci_menu_help')]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ],
                  ["li", {"class":"uci_inline uci_menu_close"},
                    ["button", {"class":"uci_bton_menu cdu_c", id:"uci_menu_activer_menu", title:accessibilitytoolbar.get('uci_link_hide_toolbar'), type:"button"},
                      ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-croix"}],
                      ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_link_hide_toolbar')]
                    ]
                  ]
                ]
              ]
            ]
          ],
          ["div", {"class":"uci_systeme_onglets uci_clear cdu_c", id:"uci_zone_form", style:"display:none;"},
            ["div", {id:"uci_activateOnglet", style:"display:none;"},
              ["button", {"class":"uci_choix ucibtn ucibtn-sm ucibtn-secondary", id:"uci_menu_remove_all", type:"button"},
                ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-reload2"}],
                accessibilitytoolbar.get('uci_menu_remove_all')
              ],
              ["div", {"class":"uci_onglets"},
                ["div",
                  ["div", {"class":"uci_container_onglets"},
                    ["ul", {id:"uci_onglet_confort", role:"tablist", "class":"cdu_c"},
                      ["li", {role:"tab", "aria-selected":"true", "aria-controls":"uci_contenu_onglet_typographie", tabindex:"0", "class":"uci_inline onglet_1"},
                        ["span", {"class":"onglet", id:"onglet_typographie"},
                          ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-typographie"}],
                          accessibilitytoolbar.get('uci_txt_onglet_typo')
                        ]
                      ],
                      ["li", {role:"tab", "aria-selected":"false", "aria-controls":"uci_contenu_onglet_apparence", tabindex:"-1", "class":"uci_inline onglet_0"},
                        ["span", {"class":"onglet", id:"onglet_apparence"},
                          ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-agencement"}],
                          accessibilitytoolbar.get('uci_txt_onglet_apparence')
                        ]
                      ],
                      ["li", {role:"tab", "aria-selected":"false", "aria-controls":"uci_contenu_onglet_couleur", tabindex:"-1", "class":"uci_inline onglet_0"},
                        ["span", {"class":"onglet", id:"onglet_couleur"},
                          ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-couleurs2"}],
                          accessibilitytoolbar.get('uci_txt_onglet_color')
                        ]
                      ],
                      ["li", {role:"tab", "aria-selected":"false", "aria-controls":"uci_contenu_onglet_aidemotrice", tabindex:"-1", "class":"uci_inline onglet_0"},
                        ["span", {"class":"onglet", id:"onglet_aidemotrice"},
                          ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-comportement"}],
                          accessibilitytoolbar.get('uci_txt_onglet_motor_help')
                        ]
                      ]
                    ]
                  ]
                ]
              ],
              ["div", {"class":"uci_div_conteneur_contenu_onglets"},
                ["div", {"class":"uci_contenu_onglets"},
                  UciTypographie.InitUciTypographie(),
                  UciApparence.InitUciApparence(),
                  UciCouleur.InitUciCouleur(),
                  UciAideMotrice.InitUciAideMotrice()
                ]
              ]
            ],
            ["div", {id:"uci_validation", "class":"cdu_n"},
              ["input", {type:"reset", "class":"ucibtn ucibtn-info", id:"uci_annuler", value:accessibilitytoolbar.get('uci_button_cancel')}],
              ["input", {type:"submit", "class":"ucibtn ucibtn-primary", id:"uci_valider", value:accessibilitytoolbar.get('uci_button_valid')}]
            ]
          ],
          ["div", {id:"uci_confirm_validation"},
            ["span",accessibilitytoolbar.get('uci_confirm_validation')]
          ]
        ]
      );
    },
    

    /* Permet de désactiver l’affichage du menu facebook.
       @param nofocus boolean true if focus don't need to be pushed
    */


    close_menu: function (nofocus) {
      // if cookie can't be retrieve for security reason, uci_cdu_menu doesn't exist and throw an error
      // fix issue #11 https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/11
      if(document.getElementById('uci_cdu_menu'))
      {
		    document.getElementById('uci_cdu_menu').style.display = "none";
        var button = document.getElementById("uci_activer_menu");
        if(button.nodeName === 'BUTTON') {
          button.title = accessibilitytoolbar.get('uci_txt_link_menu_open');
			    var li = button.parentNode;
			    li.className = 'uci_inline uci_menu_bton';
        }
        if(nofocus) return false;
        document.getElementById("uci_activer_menu").focus();
      }
    },
    /*Permet d’activer le menu facebook du confort d’utilisation*/
    uci_activate_menu: function (e) {
        // when more settings is open, disable quick settings buttons
      if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
      var menu = document.getElementById('uci_cdu_menu');
		  if (document.getElementById('uci_cdu_menu').style.display === "none") {
        document.getElementById('uci_cdu_menu').style.display = "block";
        var button = document.getElementById("uci_activer_menu");
        if(button.nodeName === 'BUTTON') {
          button.title = accessibilitytoolbar.get('uci_txt_link_menu_close');
          var li = button.parentNode;
			    li.className = 'uci_inline uci_menu_bton active';
        }
        UciProfile.close_menu();
        document.getElementById("uci_activer_menu").focus();
      } else {
        UciIhm.close_menu();
      }
      accessibilitytoolbar.stopEvt(e);
		  return false;
    },
    /*Permet d’ouvrir les onglets de plus de confort de la toolbar de CDU.*/
    more_confort: function (e) {
    	if (document.getElementById('uci_activateOnglet').style.display === "none") {
            UciIhm.close_menu();
            UciProfile.close_menu();
            document.getElementById("uci_icon_moreconfort").className= "cdu-icon cdu-icon-moins2";
            document.getElementById('uci_activateOnglet').style.display = "block";
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
            document.getElementById('uci_menu_activer_menu').setAttribute('tabindex','-2');                        
            document.getElementById('uci_activer_menu').setAttribute('tabindex','-2');
            if(document.getElementById('uci_zone_form'))
            {
                document.getElementById('uci_zone_form').style.display = "block";
				        UciIhm.hide_confirm_validation();
            }
            //document.getElementById('uci_fermeture_more_confort').style.display = "block";            
            document.getElementById('uci_left_toolbar').className = document.getElementById('uci_left_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");         
            document.getElementById('uci_middle_toolbar').className = document.getElementById('uci_middle_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");         
            document.getElementById('uci_right_toolbar').className = document.getElementById('uci_right_toolbar').className.replace(/uci_notmask{0,1}/,"uci_mask");
            document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','true');
            document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','true');         
            document.getElementById('uci_moreconfort').title=accessibilitytoolbar.get('uci_txt_low_settings');
            document.getElementById('uci_moreconfort_content').textContent=accessibilitytoolbar.get('uci_txt_low_settings_display');
            // disable hide the toolbar
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
            UciIhm.hide_more_confort();
        }
        accessibilitytoolbar.stopEvt(e);
        return false;
    },
    hide_more_confort: function () {
		UciIhm.hide_confirm_validation();
    	document.getElementById("uci-onoffswitch").focus();
        document.getElementById("uci_icon_moreconfort").className= "cdu-icon cdu-icon-plus2";
        document.getElementById('uci_activateOnglet').style.display = "none";
        if(document.getElementById('uci_zone_form'))
        {
            document.getElementById('uci_zone_form').style.display = "none";
        }
        document.getElementById('uci_left_toolbar').className = document.getElementById('uci_left_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");
        document.getElementById('uci_left_toolbar').setAttribute('aria-hidden','false');              
            document.getElementById('uci_middle_toolbar').className = document.getElementById('uci_middle_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");      
            document.getElementById('uci_right_toolbar').className = document.getElementById('uci_right_toolbar').className.replace(/uci_mask{0,1}/,"uci_notmask");
        document.getElementById('uci_right_toolbar').setAttribute('aria-hidden','false');
        
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
        document.getElementById('uci_activer_menu').removeAttribute('tabindex');
        document.getElementById('uci_menu_activer_menu').removeAttribute('tabindex');
        document.getElementById('uci_moreconfort').removeAttribute('title');  
        document.getElementById('uci_moreconfort_content').textContent=accessibilitytoolbar.get('uci_txt_more_settings');
        return false;
    },
	confirm_validation: function() {
		document.getElementById('uci_confirm_validation').style.display = "block";
    setTimeout(function(){document.getElementById('uci_confirm_validation').style.display = "none";}, 5000);
	},
	
	hide_confirm_validation: function() {
		document.getElementById('uci_confirm_validation').style.display = "none";
	},

    activate_liens: function (id_liens) {
        if (document.getElementById(id_liens).style.display === "none") {
            document.getElementById(id_liens).style.display = "block";
            document.getElementById(checked_apparence).checked = "true";
        } else {
            document.getElementById(id_liens).style.display = "none";
            document.getElementById(checked_apparence).checked = "false";
        }
        return false;
    },

    changement_langue: function (/* String*/langue) {
        // if stack value not equal to storedValue then display a confirm message to inform the user
        var tempMatrix = accessibilitytoolbar.userPref.convertMatrixv3.reverse();
        if ((accessibilitytoolbar.userPref.encode()+tempMatrix['a11ySiteWebEnabled' + "-" + accessibilitytoolbar.userPref.stackv3['a11ySiteWebEnabled']].replace(/.*-/, "") === accessibilitytoolbar.userPref.storedValue) 
                || confirm(accessibilitytoolbar.get('uci_modif_not_saved'))){
            accessibilitytoolbar.userPref.decode();
            accessibilitytoolbar.userPref.set("a11yLanguage", langue);
            accessibilitytoolbar.needToReload = true;
            accessibilitytoolbar.userPref.updateUserPref();
            // when the user change the lang of the interface, wee need to reload after save is done
            accessibilitytoolbar.reloadToolbar();
        }
        return false;
    },
    remove_all: function () {
        // when more settings is open, disable quick settings buttons
        if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
        if(confirm(accessibilitytoolbar.get('uci_remove_all_settings'))) {            
            accessibilitytoolbar.userPref.setStoredValue();
            accessibilitytoolbar.userPref.updateUserPref();
            accessibilitytoolbar.userPref.set('a11yToolbarEnable','on');
            accessibilitytoolbar.reloadToolbar();
        }
        return false;
    },


    desactiveCDUForWebSite: function (e) {
        if (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") !== "on") {
            document.getElementById('uci_left_toolbar').style.display='';
            document.getElementById('uci_middle_toolbar').style.display='';
            document.getElementById('uci-onoffswitch').title = accessibilitytoolbar.get('uci_title_disable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "on");
            document.getElementById("uci-onoffswitch").className="uci-onoffswitch-label-on";
            document.getElementById("uci-onoffswitch").focus();
        } else {
            UciIhm.hide_more_confort();
            document.getElementById('uci_left_toolbar').style.display='none';
            document.getElementById('uci_middle_toolbar').style.display='none';
            document.getElementById('uci-onoffswitch').title = accessibilitytoolbar.get('uci_title_enable_cdu');
            accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "off");
            document.getElementById("uci-onoffswitch").className="uci-onoffswitch-label";
            document.getElementById("uci-onoffswitch").focus();
        }    
        accessibilitytoolbar.userPref.updateBlackList();
        
        accessibilitytoolbar.cleanImgDisabled();
        accessibilitytoolbar.setCSS();
        UciIhm.close_menu(true);
        accessibilitytoolbar.stopEvt(e);
        return false;
    },

    ToolbarHide: function () {
        // when more settings is open, disable quick settings buttons
        if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
        accessibilitytoolbar.userPref.decode();
        accessibilitytoolbar.userPref.set("a11yToolbarEnable", "off");
        accessibilitytoolbar.userPref.updateUserPref();

        accessibilitytoolbar.hide();
        if(accessibilitytoolbar.idLinkModeContainer){
            document.getElementById(accessibilitytoolbar.idLinkModeContainer).focus();
        }else{
            document.getElementById('cdu_close').getElementsByTagName("button")[0].focus();
        }
        return false;
    }
};