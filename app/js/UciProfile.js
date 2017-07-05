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
          ["input", { type: "radio", name: "example", "checked": "true", id: "uci_profile_none" }],
          ["label", { "class":"labelcolor","for": "uci_profile_none" }, "Aucun profile"]
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
        ["div", { id: "uci_save_header", "class": "uci-save-header" },
          ["h2", { id: "uci_save_title", "class": "uci-save-title", "tabindex":"0" }, accessibilitytoolbar.get('save_service')],
          ["button", {"class":"ucibtn-secondary uci-popin-btn", id:"uci_discover_close", title:accessibilitytoolbar.get('uci_close_guide'), type:"button"},
            ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-croix"}],
            ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_close_guide')],
          ]
        ],
        ["div", {id: "saveContent"},
          ["ul",
            ["li",{class: "uci_menu_ouverture_aide"},
              ["input", { type: "radio", "checked": "true", name: "example", id: "uci_profile_select" }],
              ["label", { "class":"labelcolor","for": "uci_profile_reading" }, "profile"],
              
              UciProfile.selectProfile(),
            ],
            ["li",{class: "uci_menu_ouverture_aide"},
              ["input", { type: "radio", name: "example", id: "uci_profile_reading" }],
              ["label", { "class":"labelcolor","for": "uci_profile_reading" }, "Ameliorer la lisibilite"],
              ["input", {type: "texte"}]
            ],
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
	      li.className = 'uci_inline uci_menu_profile active';
      }
      UciIhm.close_menu();
      document.getElementById("uci_activer_profile").focus();
      
    } else {
      UciProfile.close_menu();
    }
    accessibilitytoolbar.stopEvt(e);
	  return false;
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
		   li.className = 'uci_inline uci_menu_profile';
      }
      if(nofocus) return false;
      document.getElementById("uci_activer_profile").focus();
    }
  },

  UciSavedProfile: function (params) {
    var returnSavedProfile = "";
    var tableauProfile = ["ul", {"class":"toto", id:"ulId", role:"radiogroup", "aria-labelledby":"idLabel"}];
    for (i=0; i < 5; i++){
      returnSavedProfile = ["li",{class: "uci_menu_ouverture_aide"},
                              ["input", {type: "radio", name: "example", "checked": "true", id: "uci_profile"+i }],
                              ["label", {"class":"labelcolor", "for": "uci_profile"+i }, "Toto"]
                          ];
      tableauProfile.push(returnSavedProfile);
    }
    console.log(tableauProfile);
    return tableauProfile;
  },

  selectProfile: function(){
    var returnAllProfile = "";
    var tableauSelectProfile = ["select", {id:"select", "class": "toto"}];
    for (i=0; i<5; i++){
      returnAllProfile = ["option",{"value":i},""+i+""];
      tableauSelectProfile.push(returnAllProfile);
    }
    console.log(tableauSelectProfile);
    return tableauSelectProfile;
  },

  showProfile: function(){
    document.getElementById("uci_zone_form").appendChild(UciProfile.SaveProfile());
  },

  improve_visibility: function () {
    /* mise en place du masque */
    accessibilitytoolbar.userPref.decode("00006510106506506500000000000000000065000000100");
    accessibilitytoolbar.setCSS();
  },

  improve_layout: function () {
    /* font dyslexie + taille fonte */
    accessibilitytoolbar.userPref.decode("00006510006506506500000001100000000065001000100");
    accessibilitytoolbar.setCSS();
  },
  improve_motricity: function (){

  },
  reset: function (){
    var defaultstoredValue = "0000651000650650650000000000000000006500000010"+(accessibilitytoolbar.userPref.get('a11ySiteWebEnabled')==='on'?'0':'1');
    accessibilitytoolbar.userPref.setStoredValue(defaultstoredValue);
    accessibilitytoolbar.setCSS();
  }
}
