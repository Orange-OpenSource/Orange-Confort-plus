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
 * @class uci_typographie
 * @classdesc Cette classe permettra d'implémenter l'onglet apparence
 */
/*global window */
/*global document: false */
/* global alert */
UciApparence = {
	/*
	 * @constructor init
	 */

	InitUciApparence: function () {
		return accessibilitytoolbar.make(["div", {
			id: "uci_contenu_onglet_apparence",
			"class": "uci_contenu_onglet cdu_c",
			role: "tabpanel"
		},
			["div", {"class": "uci_onglet_div margin-left margin-right-xlg"},
				// Line spacing
				["div", {"class": "uci_aria_button_group cdu_c uci_clear"},
					["span", {
						"class": "cdu_left uci_label",
						id: "uci_typo_spacement_line_aria_label"
					}, accessibilitytoolbar.get('uci_typo_titre_linespacing')],
					["ul", {
						"class": "uci_liste_bton",
						id: "uci_reponses_linespacement",
						role: "radiogroup",
						"aria-labelledby": "uci_typo_spacement_line_aria_label"
					},
						["li",
							{
								id: "uci_a11yLineSpacement_keepit",
								role: "radio",
								"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "active" : ""),
								tabindex: accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "0" : "-1",
								"aria-checked": accessibilitytoolbar.userPref.get("a11yLineSpacement") === "keepit" ? "true" : "false",
								title: accessibilitytoolbar.get('uci_title_linespacing_radio_normal')
							},
							accessibilitytoolbar.get('uci_radio_default')
						],
						["li",
							{
								id: "uci_a11yLineSpacement_2",
								role: "radio",
								"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "active" : ""),
								tabindex: accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "0" : "-1",
								"aria-checked": accessibilitytoolbar.userPref.get("a11yLineSpacement") === "2" ? "true" : "false",
								title: accessibilitytoolbar.get('uci_title_linespacing_radio_medium')
							},
							accessibilitytoolbar.get('uci_radio_medium')
						],
						["li",
							{
								id: "uci_a11yLineSpacement_3",
								role: "radio",
								"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "active" : ""),
								tabindex: accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "0" : "-1",
								"aria-checked": accessibilitytoolbar.userPref.get("a11yLineSpacement") === "3" ? "true" : "false",
								title: accessibilitytoolbar.get('uci_title_linespacing_radio_large')
							},
							accessibilitytoolbar.get('uci_radio_large')
						]
					]
				],
				// Wording espacement
				["div", {id: "uci_typo_espacement_mot", "class": "uci_aria_button_group cdu_c uci_clear"},
					["span", {
						"class": "cdu_left uci_label",
						id: "uci_espacement_word_aria_label"
					}, accessibilitytoolbar.get('uci_typo_titre_wordspacing')],
					["ul", {
						"class": "uci_liste_bton",
						id: "uci_reponses_wordspacing",
						role: "radiogroup",
						"aria-labelledby": "uci_espacement_word_aria_label"
					},
						["li",
							{
								id: "uci_a11ySpacement_keepit",
								role: "radio",
								"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "active" : ""),
								tabindex: accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "0" : "-1",
								"aria-checked": accessibilitytoolbar.userPref.get("a11ySpacement") === "keepit" ? "true" : "false",
								title: accessibilitytoolbar.get('uci_title_wordspacing_radio_normal')
							},
							accessibilitytoolbar.get('uci_radio_default')
						],
						["li",
							{
								id: "uci_a11ySpacement_0.5",
								role: "radio",
								"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "active" : ""),
								tabindex: accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "0" : "-1",
								"aria-checked": accessibilitytoolbar.userPref.get("a11ySpacement") === "0.5" ? "true" : "false",
								title: accessibilitytoolbar.get('uci_title_wordspacing_radio_medium')
							},
							accessibilitytoolbar.get('uci_radio_medium')
						],
						["li",
							{
								id: "uci_a11ySpacement_1",
								role: "radio",
								"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "active" : ""),
								tabindex: accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "0" : "-1",
								"aria-checked": accessibilitytoolbar.userPref.get("a11ySpacement") === "1" ? "true" : "false",
								title: accessibilitytoolbar.get('uci_title_wordspacing_radio_large')
							},
							accessibilitytoolbar.get('uci_radio_large')
						]
					]
				]
			],
			["div", {"class": "uci_onglet_div margin-left margin-right-xlg"},
				["div", {"class": "margin-top-lg"}, accessibilitytoolbar.get('uci_mask_settings_titre'),
					["p", {"class": "font-normal margin-left-lg margin-top"}, accessibilitytoolbar.get('uci_mask_settings_help')]
				],
				["div", {"class": "margin-left-lg margin-top-lg"},
					["input", {
						type: "radio",
						value: "hruler",
						name: "a11yMaskOption",
						id: "a11yMaskOption-hruler",
						checked: accessibilitytoolbar.userPref.get("a11yMaskOption") === "hruler" ? "checked" : false
					}],
					["label", {"for": "a11yMaskOption-hruler"}, accessibilitytoolbar.get('uci_label_regle_horizontale')]
				],
				["div", {"class": "margin-left-lg margin-top-lg"},
					["input", {
						type: "radio",
						value: "vruler",
						name: "a11yMaskOption",
						id: "a11yMaskOption-vruler",
						checked: accessibilitytoolbar.userPref.get("a11yMaskOption") === "vruler" ? "checked" : false
					}],
					["label", {"for": "a11yMaskOption-vruler"}, accessibilitytoolbar.get('uci_label_regle_vertical')]
				],
				["div", {"class": "margin-left-lg margin-top-lg"},
					["input", {
						type: "radio",
						value: "mask",
						name: "a11yMaskOption",
						id: "a11yMaskOption-mask",
						checked: accessibilitytoolbar.userPref.get("a11yMaskOption") === "mask" ? "checked" : false
					}],
					["label", {"for": "a11yMaskOption-mask"}, accessibilitytoolbar.get('uci_mask_label')]
				],
				["div", {"class": "margin-left-lg"},
					["div", {"class": "padding-left-align"},
						["span", {
							id: "uci_title_epaisseur_mask",
							"class": "margin-top cdu_left"
						}, accessibilitytoolbar.get('uci_txt_mask_opacity')],
						["ul", {
							"class": "uci_liste_bton",
							id: "uci_reponses_epaisseurmask",
							role: "radiogroup",
							"aria-labelledby": "uci_title_epaisseur_mask"
						},
							["li",
								{
									id: "uci_a11yMaskOpacity_.25",
									role: "radio",
									"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".25" ? "active" : ""),
									tabindex: accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".25" ? "0" : "-1",
									"aria-checked": accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".25" ? "true" : "false",
								},
								accessibilitytoolbar.get('uci_radio_light')
							],
							["li",
								{
									id: "uci_a11yMaskOpacity_.5",
									role: "radio",
									"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".5" ? "active" : ""),
									tabindex: accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".5" ? "0" : "-1",
									"aria-checked": accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".5" ? "true" : "false",
								},
								accessibilitytoolbar.get('uci_radio_medium')
							],
							["li",
								{
									id: "uci_a11yMaskOpacity_.9",
									role: "radio",
									"class": "uci_choix uci_inline ucibtn ucibtn-sm ucibtn-secondary " + (accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".9" ? "active" : ""),
									tabindex: accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".9" ? "0" : "-1",
									"aria-checked": accessibilitytoolbar.userPref.get("a11yMaskOpacity") === ".9" ? "true" : "false",
								},
								accessibilitytoolbar.get('uci_radio_dark')
							]
						]
					]
				]
			],
			["div", {"class": "uci_onglet_div margin-left margin-right"},
				["div", {"class": "margin-top-lg"}, accessibilitytoolbar.get('uci_other_settings_titre')],
				["div", {"class": "margin-left-lg margin-top-lg"},
					["input", {
						type: "checkbox",
						value: "left",
						name: "a11yLeftText",
						id: "a11yLeftText",
						checked: accessibilitytoolbar.userPref.get("a11yLeftText") === "left" ? "checked" : false
					}],
					["label", {"for": "a11yLeftText"}, accessibilitytoolbar.get('uci_label_alignleft')]
				],
				["div", {"class": "margin-left-lg margin-top-lg"},
					["input", {
						type: "checkbox",
						value: "decimal",
						name: "a11yNumerotationList",
						id: "a11yNumerotationList",
						checked: accessibilitytoolbar.userPref.get("a11yNumerotationList") === "decimal" ? "checked" : false
					}],
					["label", {"for": "a11yNumerotationList"}, accessibilitytoolbar.get('uci_label_putnumonlist')]
				]
			]
		]);
	},

	uciFermetureOverlay: function (_event_, id) {
		var winObj = window.event;

		var intKeyCode = winObj.keyCode;
		if (intKeyCode === 13 || intKeyCode === 27) {
			document.getElementById(id).style.display = "none";
		}
	}
}
