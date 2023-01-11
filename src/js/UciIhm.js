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
	timerFocusHelpOut: null,
	timerFocusLangOut: null,
	/*
	 * @public
	 * @constructor
	 * 	constructor uci_ihm() : Constructeur de la class uciIhm
	 *
	 */
	InitUciIHM: function () {
		return accessibilitytoolbar.make(["div", {"class": "cdu_c"},
				["div", {id: "uci_toolbar-quick", "class": "cdu_c"},
					["div", {"class": "uci_logo_plus_de_confort cdu_c", id: "uci_logo"},
						["a", {
							"class": "uci_alt_logo",
							id: "uci_logo_link",
							href: "http://confort-plus.orange.com/index_" + accessibilitytoolbar.strings.getLocale().toLowerCase(),
							title: accessibilitytoolbar.get('uci_menu_info') + " (" + accessibilitytoolbar.get('uci_new_window') + ")",
							target: "_blank"
						},
							accessibilitytoolbar.get('uci_serv_name'),
							["span", {"class": "uci-plus-orange"}, "+"]
						],
						this.makeUciOnOff()
					],
					["div", {"class": "uci_right", id: "uci_right"},
						["div", {
							"class": "cdu_c uci_notmask",
							id: "uci_left_toolbar",
							style: (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on" ? "display:none" : "")
						},


							["div", {"class": "uci_liste_bton cdu_c", id: "uci_reponses_bigger_quick_set"},
								["input",
									{
										id: "uci_quick_a11yBigger_less",
										type: "button",
										"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary",
										title: accessibilitytoolbar.get('uci_title_fontsize_radio_medium'),
										value: "A-",
										"disabled": (accessibilitytoolbar.userPref.get("a11yBigger") === "keepit" ? 'disabled' : '')
									}
								],
								["input",
									{
										id: "uci_quick_a11yBigger_more",
										type: "button",
										"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary",
										title: accessibilitytoolbar.get('uci_title_fontsize_radio_large'),
										value: "A+",
										"disabled": (accessibilitytoolbar.userPref.get("a11yBigger") === "200" ? 'disabled' : '')
									}
								]
							],
							["input", {
								type: "checkbox",
								value: "true",
								name: "uci_quick_a11yVisualSettings",
								id: "uci_quick_a11yVisualSettings",
								checked: accessibilitytoolbar.userPref.get("a11yVisualSettings") === "true" ? true : false
							}
							],
							["label", {
								"for": "uci_quick_a11yVisualSettings",
								"class": "ucibtn ucibtn-secondary uci_quick_checkbox uci_color_checkbox",
								title: accessibilitytoolbar.get('uci_color_titre')
							},
								["span", {"class": "cdu_n"}, accessibilitytoolbar.get('uci_color_titre')],
								["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-color"},
									["span", {"class": "cdu-icon path1"}],
									["span", {"class": "cdu-icon path2"}],
									["span", {"class": "cdu-icon path3"}],
									["span", {"class": "cdu-icon path4"}],
									["span", {"class": "cdu-icon path5"}],
									["span", {"class": "cdu-icon path6"}]
								]
							],
							["input", {
								type: "checkbox",
								value: "true",
								name: "a11yMaskEnabled",
								id: "a11yMaskEnabled",
								checked: accessibilitytoolbar.userPref.get("a11yMaskEnabled") === "true" ? true : false
							}
							],
							["label", {
								"for": "a11yMaskEnabled",
								"class": "ucibtn ucibtn-secondary uci_quick_checkbox margin-left-lg",
								title: accessibilitytoolbar.get('uci_mask_titre')
							},
								["span", {"class": "cdu_n"}, accessibilitytoolbar.get('uci_mask_titre')],
								["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-masque"}]
							]
						],
						["div", {
							"class": "cdu_c uci_notmask",
							id: "uci_middle_toolbar",
							style: (accessibilitytoolbar.userPref.get('a11ySiteWebEnabled') !== "on" ? "display:none" : "")
						},
							["button", {
								"class": "uci_lien_plus_reglage cdu_c ucibtn ucibtn-sm ucibtn-secondary",
								href: "#",
								id: "uci_moreconfort",
								"type": "button"
							},
								["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-plus2", id: "uci_icon_moreconfort"}],
								["span", {id: "uci_moreconfort_txt"}, accessibilitytoolbar.get('uci_txt_more_settings')]
							]
						],
						["div", {"class": "cdu_c uci_notmask", id: "uci_right_toolbar"},
							["ul",
								UciProfile.createButtonProfile(),
								["li", {"class": "uci_inline uci_menu_bton", id: "uci_help_list"},
									["button", {
										"class": "ucibtn ucibtn-sm ucibtn-secondary uci_bton_menu cdu_c uci_dropdown",
										"aria-haspopup": "true",
										"aria-expanded": "false",
										id: "uci_help_menu_button",
										type: "button",
										title: accessibilitytoolbar.get('uci_txt_link_menu_open') + " " + accessibilitytoolbar.get('uci_txt_link_menu')
									}, accessibilitytoolbar.get('uci_txt_link_menu')],
									["div",
										["div", {id: "uci_help_menu", style: "display:none;", class: "uci_submenu"},
											["ul",
												UciHelp.createLinkGuide(),
												["li",
													["a", {
														"class": "uci_menu_ouverture_aide",
														href: helpPath[accessibilitytoolbar.strings.getLocale()],
														title: accessibilitytoolbar.get('uci_menu_help') + " (" + accessibilitytoolbar.get('uci_new_window') + ")",
														target: '_blank'
													},
														["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-help"}],
														["span", accessibilitytoolbar.get('uci_menu_help')]
													]
												],
												["li",
													["a", {
														"class": "uci_menu_ouverture_aide",
														href: "http://confort-plus.orange.com/index_" + accessibilitytoolbar.strings.getLocale().toLowerCase(),
														title: accessibilitytoolbar.get('uci_menu_info') + " (" + accessibilitytoolbar.get('uci_new_window') + ")",
														target: "_blank"
													},
														["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-info"}],
														["span", accessibilitytoolbar.get('uci_menu_info')]
													]
												]
											]
										]
									]
								],
								["li", {"class": "uci_inline uci_menu_bton", id: "uci_lang_list"},
									["button", {
										"class": "ucibtn ucibtn-sm ucibtn-secondary uci_bton_menu cdu_c uci_dropdown",
										"aria-haspopup": "true",
										"aria-expanded": "false",
										id: "uci_lang_menu_button",
										type: "button"
									}, accessibilitytoolbar.strings.getLocale().toUpperCase()],
									["div",
										["div", {id: "uci_lang_menu", style: "display:none;", class: "uci_submenu"},
											["div", {id: "uci_language", "class": "uci_lang"},
												["input", {
													"class": (accessibilitytoolbar.userPref.get("a11yLanguage") === "FR" ? "uci_choix active" : "uci_choix") + " ucibtn ucibtn-sm ucibtn-secondary",
													type: "button",
													name: "uci_language_FR",
													value: "FR",
													id: "uci_FR",
													title: accessibilitytoolbar.get('uci_txt_menu_change_lang_fr')
												}],
												["input", {
													"class": (accessibilitytoolbar.userPref.get("a11yLanguage") === "EN" ? "uci_choix active" : "uci_choix") + " ucibtn ucibtn-sm ucibtn-secondary",
													type: "button",
													name: "uci_language_EN",
													value: "EN",
													id: "uci_EN",
													title: accessibilitytoolbar.get('uci_txt_menu_change_lang_en')
												}],
												["input", {
													"class": (accessibilitytoolbar.userPref.get("a11yLanguage") === "ES" ? "uci_choix active" : "uci_choix") + " ucibtn ucibtn-sm ucibtn-secondary",
													type: "button",
													name: "uci_language_ES",
													value: "ES",
													id: "uci_ES",
													title: accessibilitytoolbar.get('uci_txt_menu_change_lang_es')
												}],
												["input", {
													"class": (accessibilitytoolbar.userPref.get("a11yLanguage") === "PL" ? "uci_choix active" : "uci_choix") + " ucibtn ucibtn-sm ucibtn-secondary",
													type: "button",
													name: "uci_language_PL",
													value: "PL",
													id: "uci_PL",
													title: accessibilitytoolbar.get('uci_txt_menu_change_lang_pl')
												}]
											]
										]
									]
								],

								["li", {"class": "uci_inline uci_menu_close"},
									["button", {
										"class": "ucibtn ucibtn-sm ucibtn-secondary uci_bton_menu cdu_c",
										id: "uci_close_toolbar",
										title: accessibilitytoolbar.get('uci_link_hide_toolbar'),
										type: "button"
									},
										["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-croix"}],
										["span", {"class": "cdu_n"}, accessibilitytoolbar.get('uci_link_hide_toolbar')]
									]
								]
							]
						]
					]
				],
				["div", {"class": "uci_systeme_onglets uci_clear cdu_c", id: "uci_zone_form", style: "display:none;"},
					["div", {id: "uci_activateOnglet", style: "display:none;"},
						["button", {
							"class": "uci_choix ucibtn ucibtn-sm ucibtn-secondary margin-right",
							id: "uci_menu_remove_all",
							type: "button"
						},
							["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-reload2"}],
							accessibilitytoolbar.get('uci_menu_remove_all')
						],
						["div", {"class": "uci_onglets"},
							["div",
								["div", {"class": "uci_container_onglets"},
									["ul", {id: "uci_onglet_confort", role: "tablist", "class": "cdu_c"},
										["li", {
											role: "tab",
											"aria-selected": "true",
											"aria-controls": "uci_contenu_onglet_typographie",
											tabindex: "0",
											"class": "uci_inline uci_onglet_0 uci_onglet_1"
										},
											["span", {"class": "uci_onglet", id: "onglet_typographie"},
												["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-typographie"}],
												accessibilitytoolbar.get('uci_txt_onglet_typo')
											]
										],
										["li", {
											role: "tab",
											"aria-selected": "false",
											"aria-controls": "uci_contenu_onglet_apparence",
											tabindex: "-1",
											"class": "uci_inline uci_onglet_0"
										},
											["span", {"class": "uci_onglet", id: "onglet_apparence"},
												["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-agencement"}],
												accessibilitytoolbar.get('uci_txt_onglet_apparence')
											]
										],
										["li", {
											role: "tab",
											"aria-selected": "false",
											"aria-controls": "uci_contenu_onglet_couleur",
											tabindex: "-1",
											"class": "uci_inline uci_onglet_0"
										},
											["span", {"class": "uci_onglet", id: "onglet_couleur"},
												["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-color"},
													["span", {"class": "cdu-icon path1"}],
													["span", {"class": "cdu-icon path2"}],
													["span", {"class": "cdu-icon path3"}],
													["span", {"class": "cdu-icon path4"}],
													["span", {"class": "cdu-icon path5"}],
													["span", {"class": "cdu-icon path6"}]
												],
												accessibilitytoolbar.get('uci_txt_onglet_color')
											]
										],
										["li", {
											role: "tab",
											"aria-selected": "false",
											"aria-controls": "uci_contenu_onglet_aidemotrice",
											tabindex: "-1",
											"class": "uci_inline uci_onglet_0"
										},
											["span", {"class": "uci_onglet", id: "onglet_aidemotrice"},
												["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-comportement"}],
												accessibilitytoolbar.get('uci_txt_onglet_motor_help')
											]
										],
										["li", {
											role: "tab",
											"aria-selected": "false",
											"aria-controls": "uci_contenu_onglet_settings",
											tabindex: "-1",
											"class": "uci_inline uci_onglet_0"
										},
											["span", {"class": "uci_onglet", id: "onglet_settings"},
												["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-settings"}],
												accessibilitytoolbar.get('uci_txt_onglet_settings')
											]
										]
									]
								]
							]
						],
						["div", {id: "uci-div-conteneur-contenu-onglets", "class": "uci_div_conteneur_contenu_onglets"},
							["div", {id: "uci-contenu-onglets", "class": "uci_contenu_onglets"},
								UciTypographie.InitUciTypographie(),
								UciApparence.InitUciApparence(),
								UciCouleur.InitUciCouleur(),
								UciAideMotrice.InitUciAideMotrice(),
								UciSettings.InitUciSettings()
							]
						]
					],
					["div", {id: "uci_validation", "class": "cdu_n"},
						["input", {
							type: "reset",
							"class": "ucibtn ucibtn-info",
							id: "uci_annuler",
							value: accessibilitytoolbar.get('uci_button_cancel')
						}],
						["input", {
							type: "submit",
							"class": "ucibtn ucibtn-primary",
							id: "uci_valider",
							value: accessibilitytoolbar.get('uci_button_valid')
						}]
					]
				],
				["div", {id: "uci_confirm_validation"},
					["span", accessibilitytoolbar.get('uci_confirm_validation')]
				],
				["div", {id: "masque_haut", "class": "masque-haut"},
					["div", {id: "masque_haut_logo", "class": "masque-haut-logo"}],
					["div", {id: "masque_haut_intermediaire", "class": "masque-haut-intermediaire"}],
					["div", {id: "masque_haut_param", "class": "masque-haut-param"}],
					["div", {id: "masque_haut_advanced_param", "class": "masque-haut-advanced-param"}],
					["div", {id: "masque_haut_exit", "class": "masque-haut-exit"}]
				]
			]
		);
	},

	makeUciOnOff: function () {
		if (onOffEnabled) {
			return ["div", {"class": "cdu_c uci-onoffswitch"},
				["a", {
					"class": "uci-onoffswitch-label" + (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on" ? "-on" : ""),
					title: accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") === "on" ? accessibilitytoolbar.get('uci_title_disable_cdu') : accessibilitytoolbar.get('uci_title_enable_cdu'),
					id: "uci-onoffswitch",
					href: "#"
				},
					["span", {"class": "uci-onoffswitch-inner-before"}, "On"],
					["span", {"class": "uci-onoffswitch-inner-after"}, "Off"]
				]
			];
		} else return '';
	},


	/**
	 * Open a submenu
	 *
	 */
	uci_toggle_menu: function (idMenu, e) {
		//if(document.getElementById('uci_right_toolbar').className.match(/uci_mask/)) return false;
		var menu = document.getElementById(idMenu);
		if (menu.style.display === "none") {
			menu.style.display = "block";
			var button = document.getElementById(idMenu + "_button");
			button.title = accessibilitytoolbar.get('uci_txt_link_menu_close') + " " + button.textContent;
			button.setAttribute('aria-expanded', true);
			var li = button.parentNode;
			li.className = 'uci_inline uci_menu_bton active';
		} else {
			UciIhm.uci_close_menu(idMenu);
		}
		accessibilitytoolbar.stopEvt(e);
		return false;
	},

	/**
	 * Close a submenu
	 *
	 */
	uci_close_menu: function (idMenu) {
		var menu = document.getElementById(idMenu);
		if (menu) {
			menu.style.display = "none";
			var button = document.getElementById(idMenu + "_button");
			button.title = accessibilitytoolbar.get('uci_txt_link_menu_open') + " " + button.textContent;
			button.setAttribute('aria-expanded', false);
			var li = button.parentNode;
			li.className = 'uci_inline uci_menu_bton';
		}
	},

	/**
	 * If focus really goes out, close the submenu
	 *
	 */
	setFocusHelpOut: function () {
		clearTimeout(this.timerFocusHelpOut);
		this.timerFocusHelpOut = setTimeout(function () {
			UciIhm.uci_close_menu('uci_help_menu')
		}, 10);
	},

	/**
	 * If focus really goes out, close the submenu
	 *
	 */
	setFocusLangOut: function () {
		clearTimeout(this.timerFocusLangOut);
		this.timerFocusLangOut = setTimeout(function () {
			UciIhm.uci_close_menu('uci_lang_menu')
		}, 10);
	},

	/**
	 * kill timer if focus goes in
	 *
	 */
	setFocusHelpIn: function () {
		clearTimeout(this.timerFocusHelpOut);
	},
	/**
	 * kill timer if focus goes in
	 *
	 */
	setFocusLangIn: function () {
		clearTimeout(this.timerFocusLangOut);
	},

	/*Permet d’ouvrir les onglets de plus de confort de la toolbar de CDU.*/
	more_confort: function (e) {
		if (document.getElementById('uci_activateOnglet').style.display === "none") {
			document.getElementById("uci_icon_moreconfort").className = "cdu-icon cdu-icon-moins2";
			document.getElementById('uci_activateOnglet').style.display = "block";
			document.getElementById('uci_quick_a11yBigger_less').setAttribute('disabled', 'disabled');
			document.getElementById('uci_quick_a11yBigger_more').setAttribute('disabled', 'disabled');
			document.getElementById('uci_quick_a11yVisualSettings').setAttribute('disabled', 'disabled');
			document.getElementById('a11yMaskEnabled').setAttribute('disabled', 'disabled');
			if (document.getElementById('uci_profile_menu_button')) {
				document.getElementById('uci_profile_menu_button').setAttribute('disabled', 'disabled');
			}
			document.getElementById('uci_help_menu_button').setAttribute('disabled', 'disabled');
			document.getElementById('uci_close_toolbar').setAttribute('disabled', 'disabled');
			if (document.getElementById('uci_zone_form')) {
				document.getElementById('uci_zone_form').style.display = "block";
				UciIhm.hide_confirm_validation();
			}
			//document.getElementById('uci_fermeture_more_confort').style.display = "block";
			document.getElementById('uci_left_toolbar').className = document.getElementById('uci_left_toolbar').className.replace(/uci_notmask{0,1}/, "uci_mask");
			document.getElementById('uci_middle_toolbar').className = document.getElementById('uci_middle_toolbar').className.replace(/uci_notmask{0,1}/, "uci_mask");
			//document.getElementById('uci_right_toolbar').className = document.getElementById('uci_right_toolbar').className.replace(/uci_notmask{0,1}/, "uci_mask");
			document.getElementById('uci_left_toolbar').setAttribute('aria-hidden', 'true');
			//document.getElementById('uci_right_toolbar').setAttribute('aria-hidden', 'true');
			document.getElementById('uci_moreconfort').title = accessibilitytoolbar.get('uci_txt_low_settings');
			document.getElementById('uci_moreconfort').className += " active";
			document.getElementById('uci_moreconfort_txt').textContent = accessibilitytoolbar.get('uci_txt_low_settings_display');
			// disable hide the toolbar
			// disable hide fontsize buttons
			// disable color button
			var elmt = document.getElementById('uci_onglet_confort');
			for (var i = 0; i < elmt.children.length; i++) {
				var elmt_enfant = elmt.children[i];
				if (elmt_enfant.getAttribute('tabindex') === '0' && elmt_enfant.getElementsByTagName('li')) {
					elmt_enfant.focus();
					break;
				}
			}

		} else {
			UciIhm.hide_more_confort();
		}
		accessibilitytoolbar.stopEvt(e);
		return false;
	},
	hide_more_confort: function (hideValidationBtn) {
		UciIhm.hide_confirm_validation();
		document.getElementById("uci_icon_moreconfort").className = "cdu-icon cdu-icon-plus2";
		document.getElementById('uci_activateOnglet').style.display = "none";
		if (document.getElementById('uci_zone_form') && (hideValidationBtn || document.getElementById('uci_validation').className === "cdu_n")) {
			document.getElementById('uci_zone_form').style.display = "none";
		}
		document.getElementById('uci_left_toolbar').className = document.getElementById('uci_left_toolbar').className.replace(/uci_mask{0,1}/, "uci_notmask");
		document.getElementById('uci_left_toolbar').setAttribute('aria-hidden', 'false');
		document.getElementById('uci_middle_toolbar').className = document.getElementById('uci_middle_toolbar').className.replace(/uci_mask{0,1}/, "uci_notmask");
		if (accessibilitytoolbar.userPref.get("a11yBigger") !== "keepit") {
			document.getElementById('uci_quick_a11yBigger_less').removeAttribute('disabled');
		}
		if (accessibilitytoolbar.userPref.get("a11yBigger") !== "200") {
			document.getElementById('uci_quick_a11yBigger_more').removeAttribute('disabled');
		}
		document.getElementById('uci_quick_a11yVisualSettings').removeAttribute('disabled');
		document.getElementById('a11yMaskEnabled').removeAttribute('disabled');
		if (document.getElementById('uci_profile_menu_button')) {
			document.getElementById('uci_profile_menu_button').removeAttribute('disabled');
		}
		document.getElementById('uci_help_menu_button').removeAttribute('disabled');
		document.getElementById('uci_close_toolbar').removeAttribute('disabled');
		document.getElementById('uci_moreconfort').removeAttribute('title');
		document.getElementById('uci_moreconfort').className = document.getElementById('uci_moreconfort').className.replace(/ active{0,1}/, "");
		document.getElementById('uci_moreconfort_txt').textContent = accessibilitytoolbar.get('uci_txt_more_settings');
		return false;
	},

	confirm_validation: function () {
		document.getElementById('uci_confirm_validation').style.display = "block";
		setTimeout(function () {
			document.getElementById('uci_confirm_validation').style.display = "none";
		}, 5000);
	},

	hide_confirm_validation: function () {
		document.getElementById('uci_confirm_validation').style.display = "none";
	},

	activate_liens: function (id_liens) {
		if (document.getElementById(id_liens).style.display === "none") {
			document.getElementById(id_liens).style.display = "block";
			document.getElementById(checked_apparence).checked = true;
		} else {
			document.getElementById(id_liens).style.display = "none";
			document.getElementById(checked_apparence).checked = false;
		}
		return false;
	},

	changement_langue: function (/* String*/langue) {
		// if stack value not equal to storedValue then display a confirm message to inform the user
		// Ignore the displaytoolbar, and lang flag for comparison
		if ((accessibilitytoolbar.userPref.encode() === accessibilitytoolbar.userPref.getCurrentPref())
			|| confirm(accessibilitytoolbar.get('uci_modif_not_saved'))) {
			accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.getCurrentPref());
			accessibilitytoolbar.userPref.set("a11yLanguage", langue);
			accessibilitytoolbar.needToReload = true;
			accessibilitytoolbar.userPref.updateUserPref();
			// when the user change the lang of the interface, wee need to reload after save is done
			accessibilitytoolbar.reloadToolbar();
			if (accessibilitytoolbar.userPref.settings.current.length >= 3) {
				accessibilitytoolbar.saveUserPref(accessibilitytoolbar.userPref.settings.current);
			} else {
				accessibilitytoolbar.saveUserPref();
			}

		}
		return false;
	},
	remove_all: function () {
		if (confirm(accessibilitytoolbar.get('uci_remove_all_settings'))) {
			accessibilitytoolbar.userPref.setStoredValue();
			accessibilitytoolbar.userPref.updateUserPref();
			accessibilitytoolbar.userPref.set('a11yToolbarEnable', 'on');
			accessibilitytoolbar.reloadToolbar();
		}
		return false;
	},

	desactiveCDUForWebSite: function (e) {
		if (accessibilitytoolbar.userPref.get("a11ySiteWebEnabled") !== "on") {
			document.getElementById('uci_left_toolbar').style.display = '';
			document.getElementById('uci_profile_list').style.display = '';
			document.getElementById('uci_middle_toolbar').style.display = '';
			document.getElementById('uci-onoffswitch').title = accessibilitytoolbar.get('uci_title_disable_cdu');
			accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "on");
			document.getElementById("uci-onoffswitch").className = "uci-onoffswitch-label-on";
			document.getElementById("uci-onoffswitch").focus();
		} else {
			UciIhm.hide_more_confort(true);
			document.getElementById('uci_left_toolbar').style.display = 'none';
			document.getElementById('uci_profile_list').style.display = 'none';
			document.getElementById('uci_middle_toolbar').style.display = 'none';
			document.getElementById('uci-onoffswitch').title = accessibilitytoolbar.get('uci_title_enable_cdu');
			accessibilitytoolbar.userPref.set("a11ySiteWebEnabled", "off");
			document.getElementById("uci-onoffswitch").className = "uci-onoffswitch-label";
			document.getElementById("uci-onoffswitch").focus();
		}
		accessibilitytoolbar.userPref.updateBlackList();

		accessibilitytoolbar.cleanImgDisabled();
		accessibilitytoolbar.setCSS();
		accessibilitytoolbar.stopEvt(e);
		return false;
	},

	ToolbarHide: function () {
		// when more settings is open, disable quick settings buttons
		// if(document.getElementById('uci_right_toolbar').className.match(/uci_mask/)) return false;
		accessibilitytoolbar.userPref.decode(accessibilitytoolbar.userPref.getCurrentPref());
		accessibilitytoolbar.userPref.set("a11yToolbarEnable", "off");
		accessibilitytoolbar.userPref.updateUserPref();

		accessibilitytoolbar.hide();
		if (accessibilitytoolbar.idLinkModeContainer) {
			document.getElementById(accessibilitytoolbar.idLinkModeContainer).focus();
		} else {
			document.getElementById('cdu_close').getElementsByTagName("button")[0].focus();
		}
		return false;
	}
};
