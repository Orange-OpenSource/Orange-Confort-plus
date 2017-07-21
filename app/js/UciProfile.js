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
 * @class Help
 * @classdesc Cette classe permettra d'implémenter l'onglet Help
 */
/*global window */
/*global document: false */
/* global alert */
UciProfile = {
  /*
  * @property
  * @private
   */

  /*
   * @constructor
   */
  InitUciProfile: function () {
    return accessibilitytoolbar.make(["div",
      UciProfile.UciSavedProfile(),
      ["span","profils predefinis"],
      ["ul",
        ["li",{class: "uci_menu_ouverture_aide"}, 
          ["input", { type: "radio", name: "example", id: "uci_profile_none" }],
          ["label", { "class":"labelcolor","for": "uci_profile_none" }, "Aucun profil"]
        ],
        ["li",{class: "uci_menu_ouverture_aide"},
          ["input", { type: "radio", name: "example", id: "uci_profile_reading" }],
          ["label", { "class":"labelcolor","for": "uci_profile_reading" }, "Ameliorer la lisibilite"],
        ],
        ["li",{class: "uci_menu_ouverture_aide"},
          ["input", { type: "radio", name: "example", id: "uci_profile_layout" }],
          ["label", { "class":"labelcolor","for": "uci_profile_layout" }, "Modifier la mise en page"],
        ],
        ["li",{class: "uci_menu_ouverture_aide"},
          ["input", { type: "radio", name: "example", id: "uci_profile_move" }],
          ["label", { "class":"labelcolor","for": "uci_profile_move" }, "Aide motrice"],
        ],
      ]  
    ])
  },
  SaveProfile: function (){
    return accessibilitytoolbar.make(["div",{id :"save_profile"},
      ["div", {"class":"save_popin"},
        ["form", {name:"uci_form_profil", action:"#", id:"uci_form_profil"},
          ["div", { id: "uci_save_header", "class": "uci-save-header" },
            ["h2", { id: "uci_save_title", "class": "uci-save-title", "tabindex":"0" }, accessibilitytoolbar.get('save_service')],
            ["button", {"class":"ucibtn-secondary uci-popin-btn", onclick: "UciProfile.hide_save_profile()", id:"uci_discover_close", title:accessibilitytoolbar.get('uci_close_guide'), type:"button"},
              ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-croix"}],
              ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_close_guide')],
            ]
          ],
          ["div",
            ["ul",
              ["li",{class: "uci_menu_ouverture_aide"},
                ["label", { "class":"labelcolor","for": "uci-selectProfile" }, accessibilitytoolbar.get('uci_profile_save_label')+" : "],
                UciProfile.selectProfile(),
              ],
              ["li",{class: "uci_menu_ouverture_aide", id:"uci_profile_name_container", "style":"display:none"},
                ["label", { "class":"labelcolor","for": "uci_profile_name" }, accessibilitytoolbar.get('uci_profile_new_label')+" : "],
                ["input", {id: "uci_profile_name", type: "texte", "class":"margin-left"}]
              ],
            ]
          ],
          ["div", {"class": "uci-popin-buttom" },
            ["button", { name: "saveCancel", onclick:"UciProfile.hide_save_profile()", "type": "button", "class": "uci-popin-button-left ucibtn-info ucibtn ucibtn-sm" }, accessibilitytoolbar.get('uci_button_cancel')],
            ["input", { name: "saveSubmit", "type": "submit", "class": "uci-popin-button-right ucibtn-primary ucibtn ucibtn-sm" }, accessibilitytoolbar.get('uci_button_valid')]
          ]
        ]
      ]
    ])
  },
  uci_show_profile: function(e){
    // when more settings is open, disable quick settings buttons
    if(document.getElementById('uci_right_toolbar').className.match("/uci_mask/")) return false;
    var menu = document.getElementById('uci_cdu_profile');
	  if (document.getElementById('uci_cdu_profile').style.display === "none") {
      document.getElementById('uci_cdu_profile').style.display = "block";
      var button = document.getElementById("uci_activer_profile");
      if(button.nodeName === 'BUTTON') {
        button.title = "profile";
        var li = button.parentNode;
	      li.className = 'uci_inline uci_menu_bton active';
      }
      UciIhm.close_menu(true);      
    } else {
      UciProfile.close_menu();
    }
    accessibilitytoolbar.stopEvt(e);
	  return false;
  },

  hide_save_profile: function(){
    document.getElementById("uci_cdu_popin").style.display = "none";
    document.getElementById("uci_cdu_popin").removeChild(document.getElementById("save_profile"));
  },

  close_menu: function (nofocus) {
    // if cookie can't be retrieve for security reason, uci_cdu_menu doesn't exist and throw an error
    // fix issue #11 https://github.com/Orange-OpenSource/Orange-Confort-plus/issues/11
    if(document.getElementById('uci_cdu_profile'))
    {
		  document.getElementById('uci_cdu_profile').style.display = "none";
      var button = document.getElementById("uci_activer_profile");
      if(button.nodeName === 'BUTTON') {
        button.title = "profile";
		    var li = button.parentNode;
		   li.className = 'uci_inline uci_menu_bton';
      }
      if(nofocus) return false;
      document.getElementById("uci_activer_profile").focus();
    }
  },

  changeStatus:function(){
    if (document.getElementById('uci-selectProfile').value !== ""){
      document.getElementById("uci_profile_name_container").style.display = "none";
    } else {
      document.getElementById("uci_profile_name_container").style.display = "inline";
    }
  },

  UciSavedProfile: function (params) {
    var returnSavedProfile = "";
    var profil = null;
    var i = 0;
    var tableauProfile = ["ul", {role:"radiogroup", "aria-labelledby":"idLabel"}];
    for (profil in accessibilitytoolbar.userPref.settings.profiles) {
        if(accessibilitytoolbar.userPref.settings.current === profil) {
          returnSavedProfile = ["li",{class: "uci_menu_ouverture_aide"},
                                  ["input", {type: "radio", name: "example", "checked": "true", id: "uci_profile"+i, onchange:"UciProfile.loadProfile('"+profil+"')" }],
                                  ["label", {"class":"labelcolor", "for": "uci_profile"+i }, profil]
                              ];
        } else {
          returnSavedProfile = ["li",{class: "uci_menu_ouverture_aide"},
                                  ["input", {type: "radio", name: "example", id: "uci_profile"+i, onchange:"UciProfile.loadProfile('"+profil+"')" }],
                                  ["label", {"class":"labelcolor", "for": "uci_profile"+i }, profil]
                              ];
        }
      tableauProfile.push(returnSavedProfile);
      i++;
    }
    return tableauProfile;
  },

  selectProfile: function(){
    var returnAllProfile = "";
    var profil = null;
    var i = 0;
    var tableauSelectProfile = ["select", {id:"uci-selectProfile","class":"uci_select_profile margin-left",onchange: "UciProfile.changeStatus(2)"}];
    tableauSelectProfile.push(["option",{"value":""},accessibilitytoolbar.get('uci_profile_new_option')]);
    for (profil in accessibilitytoolbar.userPref.settings.profiles) {
      // if it's current profile, select it
      if(accessibilitytoolbar.userPref.settings.current === profil) {
        returnAllProfile = ["option",{"value":i,"selected":"selected"},""+profil+""];
      } else {
        returnAllProfile = ["option",{"value":i},""+profil+""];
      }
      tableauSelectProfile.push(returnAllProfile);
      i++;
    }
    UciProfile.close_menu();
    return tableauSelectProfile;
  },

  showProfile: function(){
    document.getElementById("uci_cdu_popin").appendChild(UciProfile.SaveProfile());
    document.getElementById("uci_cdu_popin").style.display= "block";
    document.getElementById("uci_cdu_popin").style.height = document.getElementsByTagName("body")[0].clientHeight+"px";
    accessibilitytoolbar.uciAttachEvent('submit','onsubmit',document.getElementById('uci_form_profil'), function(e) {accessibilitytoolbar.stopEvt(e);UciValidation.Validation();UciProfile.hide_save_profile();UciIhm.confirm_validation();});
  },

  reset: function (){
    accessibilitytoolbar.userPref.setStoredValue();
    accessibilitytoolbar.setCSS();
  },

  /**
   * Attach events to the profile menu
   * 
   */
  create_menu_events: function() {
    /********** Profile *********************/
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_activer_profile'),UciProfile.uci_show_profile);
    accessibilitytoolbar.uciAttachEvent('change','onchange',document.getElementById('uci_profile_reading'),function(){UciProfile.loadProfile(false,"0000651000650650650001100110000000006500100010")});
    accessibilitytoolbar.uciAttachEvent('change','onchange',document.getElementById('uci_profile_none'),UciProfile.reset);
    accessibilitytoolbar.uciAttachEvent('change','onchange',document.getElementById('uci_profile_layout'),function(){UciProfile.loadProfile(false,"0000651000650650650111101310000000006500000010")});
    accessibilitytoolbar.uciAttachEvent('change','onchange',document.getElementById('uci_profile_move'),function(){UciProfile.loadProfile(false,"0000651000650650650001100310000101006500000010")});
  },

  /**
   * Load a profile on option update
   * 
   */
  loadProfile: function(profilName,settingsValue) {
    if(profilName) {
      accessibilitytoolbar.userPref.settings.current = profilName;
      accessibilitytoolbar.userPref.readUserPref();
      accessibilitytoolbar.updateIhmFormsSettings();
    } else {
      accessibilitytoolbar.userPref.decode(settingsValue);
      accessibilitytoolbar.updateIhmFormsSettings();
    }
  }
}
