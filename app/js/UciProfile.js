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
  timerFocusOut: null,
  isTrashing: false,
  
  createButtonProfile: function() {
    if(accessibilitytoolbar.profileEnabled) {
      return ["li", {"class":"uci_inline uci_menu_bton", id:"uci_profile_list"},
                    ["button", {"class":"uci_bton_menu cdu_c uci_dropdown", "aria-haspopup":"true", "aria-expanded":"false", id:"uci_profile_menu_button", type:"button", title:accessibilitytoolbar.get('uci_txt_link_menu_open') +" "+ accessibilitytoolbar.get('uci_txt_link_profil')}, accessibilitytoolbar.get('uci_txt_link_profil')],
                    ["div",
                      ["div", {id:"uci_profile_menu", style:"display:none;", class:"uci_submenu"},
                      this.InitUciProfile()
                      ]
                    ]
                  ];
    } else {
      return;
    }
  },
  /*
   * @constructor
   */
  InitUciProfile: function () {
    return accessibilitytoolbar.make(["div",
        this.createProfileList(),         
    ])
  },

  /**
   * Create the object array of list elements
   */
  createProfileList: function () {
    var returnSavedProfile = "";
    var profil = null;
    var i = 0;
    var tableauProfile = ["ul"];
    // allow delete only if there's more than one profile
    var nbprofile = Object.keys(accessibilitytoolbar.userPref.settings.profiles).length;
    for (profil in accessibilitytoolbar.userPref.settings.profiles) {
        if(accessibilitytoolbar.userPref.settings.current === profil) {
          returnSavedProfile = ["li",{class: "uci_menu_ouverture_aide uci_menu_space-between uci_menu_active"},
                                  ["a", { id: "uci_profile"+i, href:"#", role:"button", onclick:"UciProfile.loadProfile('"+profil+"','uci_profile"+i+"')", "class":"uci_profil_link", "aria-current":"true"}, profil],
                                  ["div",
                                    ["a", { id: "uci_profile_edit"+i, href:"#", role:"button" , onclick:"UciProfile.editProfile('"+profil+"')", "class":"cdu-icon cdu-icon-edit margin-left-lg", title:"Rename profile : "+profil }],
                                    ["a", { id: "uci_profile_trash"+i, href:"#", role:"button" , onclick:"UciProfile.trashProfile('"+profil+"','uci_profile"+i+"')", "class":"cdu-icon cdu-icon-trash margin-left-lg", title:"Delete profile : "+profil }]
                                  ],
                              ];
        } else {
          returnSavedProfile = ["li",{class: "uci_menu_ouverture_aide uci_menu_space-between"},
                                  ["a", { id: "uci_profile"+i, href:"#", role:"button" , onclick:"UciProfile.loadProfile('"+profil+"','uci_profile"+i+"')", "class":"uci_profil_link" }, profil],
                                  ["div",
                                    ["a", { id: "uci_profile_edit"+i, href:"#", role:"button" , onclick:"UciProfile.editProfile('"+profil+"')", "class":"cdu-icon cdu-icon-edit margin-left-lg", title:"Rename profile : "+profil }],
                                    ["a", { id: "uci_profile_trash"+i, href:"#", role:"button" , onclick:"UciProfile.trashProfile('"+profil+"','uci_profile"+i+"')", "class":"cdu-icon cdu-icon-trash margin-left-lg", title:"Delete profile : "+profil }]
                                  ],
                              ];
        }
      tableauProfile.push(returnSavedProfile);
      i++;
    }
    if(i>0) {
      tableauProfile.push(["li",{ "aria-hidden":"true", "role": "presentation", "class":"uci_dropdown-divider"}]);
    }
    if(accessibilitytoolbar.userPref.settings.current === '0') {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_space-between uci_menu_active"}, 
          ["a", { id: "uci_profile_none", href:"#", role:"button", "aria-current":"true" }, accessibilitytoolbar.get('uci_predefined_none')]
        ]);
    } else {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_space-between"}, 
          ["a", { id: "uci_profile_none", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_none')]
        ]);
    }
    if(accessibilitytoolbar.userPref.settings.current === '1') {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_space-between uci_menu_active"}, 
          ["a", { id: "uci_profile_reading", href:"#", role:"button", "aria-current":"true" }, accessibilitytoolbar.get('uci_predefined_improve_readability')],
        ]);
    } else {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_space-between"}, 
          ["a", { id: "uci_profile_reading", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_improve_readability')],
        ]);
    }
    if(accessibilitytoolbar.userPref.settings.current === '2') {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_space-between uci_menu_active"}, 
          ["a", { id: "uci_profile_layout", href:"#", role:"button", "aria-current":"true" }, accessibilitytoolbar.get('uci_predefined_change_layout')],
        ]);
    } else {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_space-between"}, 
          ["a", { id: "uci_profile_layout", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_change_layout')],
        ]);
    }
    if(accessibilitytoolbar.userPref.settings.current === '3') {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_space-between uci_menu_active"}, 
          ["a", { id: "uci_profile_move", href:"#", role:"button", "aria-current":"true" }, accessibilitytoolbar.get('uci_predefined_motor_help')],
        ]);
    } else {
      tableauProfile.push(["li",{class: "uci_menu_ouverture_aide uci_menu_space-between"}, 
          ["a", { id: "uci_profile_move", href:"#", role:"button" }, accessibilitytoolbar.get('uci_predefined_motor_help')],
        ]);
    }
    
    return tableauProfile;
  },

  /**
   * Create the content of save profile popin
   * 
   */
  saveProfile: function (){
    var displayInput = "display:none";
    if(accessibilitytoolbar.userPref.settings.current.length < 3) {
      displayInput = "";
    }
    return accessibilitytoolbar.make(["div",{id :"save_profile"},
      ["div", {"class":"save_popin"},
        ["form", {name:"uci_form_profil", action:"#", id:"uci_form_profil"},
          ["div", { id: "uci_save_header", "class": "uci-save-header" },
            ["h2", { id: "uci_save_title", "class": "uci-save-title", "tabindex":"0" }, accessibilitytoolbar.get('save_service')]
          ],
          ["div", {"class":"margin-top margin-left margin-right" },
            ["div",
              ["label", { "class":"labelcolor","for": "uci-selectProfile" }, accessibilitytoolbar.get('uci_profile_save_label')+" : "],
              UciProfile.selectProfile(),
            ],
            ["div",{id:"uci_profile_name_container", "style":displayInput},
              ["label", { "class":"labelcolor","for":"uci_profile_name" }, accessibilitytoolbar.get('uci_profile_new_label')+" : ",
              ["div",{ id:"uci_profile_info_msg", "class":"uci_profile_info_msg" },accessibilitytoolbar.get('uci_profile_name_format')]],
              ["input", {id: "uci_profile_name", type: "texte", "class":"uci_form-control"}]
            ],
          ],
          ["div", {"class": "margin-top margin-left margin-right padding-bottom" },
            ["input", { name: "saveCancel", "type": "reset", "class": "ucibtn-info ucibtn ucibtn-sm", value:accessibilitytoolbar.get('uci_button_cancel')}],
            ["input", { name: "saveSubmit", "type": "submit", "class": "ucibtn-primary ucibtn ucibtn-sm", value:accessibilitytoolbar.get('uci_button_valid')}]
          ]
        ]
      ]
    ])
  },

  /**
   * Create the select option form for the save popin
   * 
   */
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
    return tableauSelectProfile;
  },

  /**
   * Create the content form "rename" profile option
   * 
   */
  formProfile: function (profilName){
    return accessibilitytoolbar.make(["div",{id :"save_profile"},
      ["div", {"class":"save_popin"},
        ["form", {name:"uci_form_profil", action:"#", id:"uci_form_profil"},
          ["div", { id: "uci_save_header", "class": "uci-save-header" },
            ["h2", { id: "uci_save_title", "class": "uci-save-title", "tabindex":"0" }, accessibilitytoolbar.get('uci_rename_profile')],
            ["button", {"class":"ucibtn-secondary uci-popin-btn", onclick: "UciProfile.hide_save_profile()", id:"uci_discover_close", title:accessibilitytoolbar.get('uci_close_guide'), type:"button"},
              ["span", {"aria-hidden":"true", "class":"cdu-icon cdu-icon-croix"}],
              ["span", {"class":"cdu_n"}, accessibilitytoolbar.get('uci_close_guide')],
            ]
          ],
          ["div", {"class":"margin-top margin-left margin-right"},
            ["div",accessibilitytoolbar.get('uci_profile_curent_name')+" : "+profilName],
            ["input",{ "type":"hidden", id:"previous_profil_name", value:profilName}],
            ["label", { "class":"labelcolor","for": "uci_profile_name" }, accessibilitytoolbar.get('uci_profile_rename_label')+" : ",
            ["div",{ id:"uci_profile_info_msg", "class":"uci_profile_info_msg" },accessibilitytoolbar.get('uci_profile_name_format')]],
            ["input", {id: "uci_profile_name", type: "texte", "class":"uci_form-control"}]
          ],
          ["div", {"class": "margin-top margin-left margin-right padding-bottom" },
            ["input", { name: "saveCancel", onclick:"UciProfile.hide_save_profile()", "type": "reset", "class": "ucibtn-info ucibtn ucibtn-sm", value:accessibilitytoolbar.get('uci_button_cancel')}],
            ["input", { name: "saveSubmit", "type": "submit", "class": "ucibtn-primary ucibtn ucibtn-sm", value:accessibilitytoolbar.get('uci_button_valid_profil')}]
          ]
        ]
      ]
    ])
  },

  /**
   * Hide the popin
   * 
   */
  hide_save_profile: function(){
    document.getElementById("uci_profile_menu_button").focus();
    document.getElementById("uci_cdu_popin").style.display = "none";
  },

  /**
   * Manage profile option update to display the input field for new profile option 
   * 
   */
  changeStatus:function(){
    if (document.getElementById('uci-selectProfile').value !== ""){
      document.getElementById("uci_profile_name_container").style.display = "none";
    } else {
      document.getElementById("uci_profile_name_container").style.display = "inline";
    }
  },

  /**
   * Display the save profile popin
   * 
   */
  showProfilePopin: function(){
    UciIhm.hide_confirm_validation();
    if(document.getElementById('uci_activateOnglet').style.display === "none") {
      document.getElementById('uci_zone_form').style.display = "none";
    }
    // clean the popin
    while(document.getElementById("uci_cdu_popin").firstChild) {
      document.getElementById("uci_cdu_popin").removeChild(document.getElementById("uci_cdu_popin").firstChild);
    }
    document.getElementById("uci_cdu_popin").appendChild(UciProfile.saveProfile());
    document.getElementById("uci_cdu_popin").style.display= "block";
    document.getElementById("uci_cdu_popin").style.height = document.getElementsByTagName("body")[0].clientHeight+"px";
    document.getElementById("uci-selectProfile").focus();
    accessibilitytoolbar.uciAttachEvent('submit','onsubmit',document.getElementById('uci_form_profil'), function(e) {accessibilitytoolbar.stopEvt(e);UciProfile.checkProfileName();});
    accessibilitytoolbar.uciAttachEvent('reset','onreset',document.getElementById('uci_form_profil'), function(e) {UciProfile.hide_save_profile();document.getElementById('uci_form').reset(e);});
  },

  /**
   * Check if profileName lenght is more than 3 char and alphanum only, otherwise, display an error message in the popin
   * 
   */
  checkProfileName: function() {
    // check if there's a profile named
    var profilName;
    if((document.getElementById('uci-selectProfile') && document.getElementById('uci-selectProfile').value === "") 
      || document.getElementById("previous_profil_name")) {
      // if value == "" that's a new profile
      profilName = document.getElementById('uci_profile_name').value;
      // check if profile name is alpha num with accent and special languages chars, but not parenthesis, punct or others symbol
      if(profilName.length < 3 || !profilName.match(/^[A-Za-z0-9\u00C0-\u02AF\u0390-\u0556 !\u00F7]+$/) || accessibilitytoolbar.userPref.settings.profiles[profilName]) {
        // display the error message into the popin
        document.getElementById("uci_profile_name").style.borderColor = "#cd3c14";
        document.getElementById("uci_profile_info_msg").style.color = "#cd3c14";        
        document.getElementById("uci_profile_name").focus();
        return false;
      }
    }
    UciValidation.Validation();
    UciProfile.hide_save_profile();
    UciIhm.confirm_validation();
  },

  /**
   * Attach events to the profile menu
   * 
   */
  create_menu_events: function() {
    /********** Profile *********************/
    accessibilitytoolbar.uciAttachEvent('focusout','onfocusout',document.getElementById('uci_profile_list'),UciProfile.setFocusOut);
    accessibilitytoolbar.uciAttachEvent('focusin','onfocusin',document.getElementById('uci_profile_list'),UciProfile.setFocusIn);
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_profile_none'),function(e){accessibilitytoolbar.stopEvt(e);UciProfile.loadProfile('0',"uci_profile_none")});
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_profile_reading'),function(e){accessibilitytoolbar.stopEvt(e);UciProfile.loadProfile('1',"uci_profile_reading")});
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_profile_layout'),function(e){accessibilitytoolbar.stopEvt(e);UciProfile.loadProfile('2',"uci_profile_layout")});
    accessibilitytoolbar.uciAttachEvent('click','onclick',document.getElementById('uci_profile_move'),function(e){accessibilitytoolbar.stopEvt(e);UciProfile.loadProfile('3',"uci_profile_move")});
  },

  /**
   * If focus really goes out, close the submenu
   * 
   */
  setFocusOut: function() {
    if(!this.isTrashing) {
      clearTimeout(this.timerFocusOut);
      this.timerFocusOut = setTimeout(function(){UciIhm.uci_close_menu('uci_profile_menu')},10);
    }
  },

  /**
   * kill timer if focus goes in
   * 
   */
  setFocusIn: function() {
    clearTimeout(this.timerFocusOut);
  },

  /**
   * Refresh profile list
   * 
   */
  refreshMenuDisplay: function() {
    // update profile list
    document.getElementById("uci_profile_menu").replaceChild(this.InitUciProfile(),document.getElementById("uci_profile_menu").firstChild);
    // add event to profile menu
    this.create_menu_events();
  },

  /**
   * Load a profile on option update
   * doesntneedtotconfirm is used when a user just trash the current profile
   */
  loadProfile: function(profilName,idCible,doesntneedtotconfirm) {
    e = window.event;
    accessibilitytoolbar.stopEvt(e);
    // Ignore the displaytoolbar, and lang flag for comparison
    if (doesntneedtotconfirm || (accessibilitytoolbar.userPref.encode().substr(0,accessibilitytoolbar.userPref.encode().length-3) === accessibilitytoolbar.userPref.getCurrentPref().substr(0,accessibilitytoolbar.userPref.getCurrentPref().length-3)) 
      || confirm(accessibilitytoolbar.get('uci_modif_not_saved')))
    {
      // hide validation buttons
      document.getElementById('uci_validation').className = "cdu_n";
      document.getElementById('uci_zone_form').style.display = "none";
      
      if(uci_activateOnglet)      
      if(profilName) {
        accessibilitytoolbar.userPref.settings.current = profilName;
        accessibilitytoolbar.userPref.readUserPref();
        accessibilitytoolbar.updateIhmFormsSettings();
        accessibilitytoolbar.saveUserPref();
      }
      // update the selected element
      if(idCible) {
        var parent = document.getElementById(idCible).parentNode;
        var sibblings = parent.parentNode.childNodes;
        var curNode;
        // remove uci_menu_active from all 
        for(curNode in sibblings) {
          if(sibblings[curNode].className) {            
            sibblings[curNode].className = sibblings[curNode].className.replace(/ uci_menu_active{0,1}/,"");
            if(sibblings[curNode].firstChild) {
              sibblings[curNode].firstChild.removeAttribute("aria-current");
            }
          }
        }
        // add uci_menu_active class to selected element
        parent.className += " uci_menu_active";
        document.getElementById(idCible).setAttribute("aria-current",true);
        // Push the focus to the selected element, if menu is shown
        if(document.getElementById('uci_profile_menu').style.display !== "none") {
          document.getElementById(idCible).focus();
        }
      }
      this.isTrashing = false;
    }
  },

  /**
   * edit a profil
   * 
   */
  editProfile: function(profilName) {
    e = window.event;
    accessibilitytoolbar.stopEvt(e);
    UciIhm.hide_confirm_validation();
    UciIhm.uci_close_menu('uci_profile_menu');
    // clean the popin
    while(document.getElementById("uci_cdu_popin").firstChild) {
      document.getElementById("uci_cdu_popin").removeChild(document.getElementById("uci_cdu_popin").firstChild);
    }
    document.getElementById("uci_cdu_popin").appendChild(UciProfile.formProfile(profilName));
    document.getElementById("uci_cdu_popin").style.display= "block";
    document.getElementById("uci_cdu_popin").style.height = document.getElementsByTagName("body")[0].clientHeight+"px";
    document.getElementById("uci_profile_name").focus();
    accessibilitytoolbar.uciAttachEvent('submit','onsubmit',document.getElementById('uci_form_profil'), function(e) {accessibilitytoolbar.stopEvt(e);UciProfile.checkProfileName();});
  },

  /**
   * remove a profil
   * 
   */
  trashProfile: function(profilName,idToRemove) {
    var profilok = false;
    e = window.event;
    accessibilitytoolbar.stopEvt(e);
    this.isTrashing = true;
    if(confirm(accessibilitytoolbar.get('uci_profile_delete_warning'))) {
      delete accessibilitytoolbar.userPref.settings.profiles[profilName];
      // if it's the current profile, check if there's another to set
      if(accessibilitytoolbar.userPref.settings.current === profilName) {
        accessibilitytoolbar.userPref.settings.current = "";
        // load empty settings
        this.loadProfile('0',"uci_profile_none",true);
      } else {
        document.getElementsByClassName("uci_menu_active")[0].firstChild.focus();
        this.isTrashing = false;
      }
      var parentDelete = document.getElementById(idToRemove).parentNode;
      var parentDeleteParent = parentDelete.parentNode;
      parentDeleteParent.removeChild(parentDelete);
      accessibilitytoolbar.saveUserPref();
    } else {
      this.isTrashing = false;
    }
  }
}
