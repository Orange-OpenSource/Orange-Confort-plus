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
      ["div", {id:"save_popin"},
        ["form", {name:"uci_form_profil", action:"#", id:"uci_form_profil"},
          ["div", { id: "uci_save_header", "class": "uci-save-header" },
            ["h2", { id: "uci_save_title", "class": "uci-save-title", "tabindex":"0" }, accessibilitytoolbar.get('save_service')],
            ["button", {"class":"ucibtn-secondary uci-popin-btn", onclick: "UciProfile.hide_save_profile()", id:"uci_discover_close", title:accessibilitytoolbar.get('uci_close_guide'), type:"button"},
              ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-croix"}],
              ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_close_guide')],
            ]
          ],
          ["div", {id: "saveContent"},
            ["ul",
              ["li",{class: "uci_menu_ouverture_aide"},
                ["input", { type: "radio", onchange: "UciProfile.changeStatus(1)","checked": "true", name: "example", id: "uci_profile_select" }],
                ["label", { "class":"labelcolor","for": "uci_profile_select" }, "profile"],
                
                UciProfile.selectProfile(),
              ],
              ["li",{class: "uci_menu_ouverture_aide"},
                ["input", { type: "radio", onchange: "UciProfile.changeStatus(2)", name: "example", id: "uci_profile_save" }],
                ["label", { "class":"labelcolor","for": "uci_profile_save" }, "Ameliorer la lisibilite"],
                ["input", {id: "profile_name", type: "texte", disabled:"disabled"}]
              ],
            ]
          ],
          ["div", {"class": "uci-popin-buttom" },
            ["button", { id: "save_cancel", name: "saveCancel", onclick:"UciProfile.hide_save_profile()", "type": "button", "class": "uci-popin-button-left ucibtn-info ucibtn ucibtn-sm" }, accessibilitytoolbar.get('uci_button_cancel')],
            ["input", { id: "save_submit", name: "saveSubmit", "type": "submit", "class": "uci-popin-button-right ucibtn-primary ucibtn ucibtn-sm" }, accessibilitytoolbar.get('uci_button_valid')]
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
    parent = document.getElementById("save_popin").parentNode;
    parent.removeChild(parent.lastChild);
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

  changeStatus:function(option){
    if (option == 1){
      document.getElementById("uci-selectProfile").removeAttribute("disabled");
      document.getElementById("profile_name").setAttribute("disabled", "disabled");
    }
    else if (option == 2){
      document.getElementById("profile_name").removeAttribute("disabled");
      document.getElementById("uci-selectProfile").setAttribute("disabled", "disabled");
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
    var tableauSelectProfile = ["select", {id:"uci-selectProfile"}];
    tableauSelectProfile.push(["option",{"value":""},"créer nouveau"]);
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

  improve_visibility: function () {
    /* mise en place du masque */
    accessibilitytoolbar.userPref.decode("0000651010650650650000000000000000006500000010");
    accessibilitytoolbar.setCSS();
  },

  improve_layout: function () {
    /* font dyslexie + taille fonte */
    accessibilitytoolbar.userPref.decode("0000651000650650650000000110000000006500100010");
    accessibilitytoolbar.setCSS();
  },
  improve_motricity: function (){

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
    accessibilitytoolbar.uciAttachEvent('change','onchange',document.getElementById('uci_profile_reading'),UciProfile.improve_visibility);
    accessibilitytoolbar.uciAttachEvent('change','onchange',document.getElementById('uci_profile_none'),UciProfile.reset);
    accessibilitytoolbar.uciAttachEvent('change','onchange',document.getElementById('uci_profile_layout'),UciProfile.improve_layout);
    accessibilitytoolbar.uciAttachEvent('change','onchange',document.getElementById('uci_profile_move'),UciProfile.showProfile);
  },

  /**
   * Load a profile on option update
   * 
   */
  loadProfile: function(profilName) {
    accessibilitytoolbar.userPref.settings.current = profilName;
    accessibilitytoolbar.userPref.readUserPref();
    accessibilitytoolbar.setCSS();
  }
}
