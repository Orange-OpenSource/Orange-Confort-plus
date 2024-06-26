/**
		This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs

		Copyright (C) 2014 - 2023  Orange SA

		Orange Confort+ is free software; you can redistribute it and/or
		modify it under the terms of the GNU General Public License
		as published by the Free Software Foundation; either version 2
		of the License, or (at your option) any later version.

		Orange Confort+ is distributed in the hope that it will be useful,
		but WITHOUT ANY WARRANTY; without even the implied warranty of
		MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
		GNU General Public License for more details (LICENSE.txt file).
 **/
UciMask = {
	settings: {
		launched: false,
		thickness: 'none',
		option: 'mask' // option could be mask, vruler or hruler
	},

	init: function () {
		if ((!window.Modernizer) || !Modernizr.touch) {
			// check if mask already exist, remove textual content for translation
			if (!document.getElementById('topMask')) {
				topMask = document.createElement("div");
				topMask.className = "uci_mask topMask";
				topMask.id = "topMask";
				bottomMask = document.createElement("div");
				bottomMask.className = "uci_mask bottomMask";
				bottomMask.id = "bottomMask";
				document.body.appendChild(topMask);
				document.body.appendChild(bottomMask);
				vMouse = document.createElement("div");
				vMouse.className = "vMouse";
				vMouse.id = "vMouse";
				hMouse = document.createElement("div");
				hMouse.className = "hMouse";
				hMouse.id = "hMouse";
				document.body.appendChild(vMouse);
				document.body.appendChild(hMouse);
			}
			// remove tomask childs if exists
			while (document.getElementById('topMask').hasChildNodes()) {
				document.getElementById('topMask').removeChild(document.getElementById('topMask').childNodes[0]);
			}
			// append textual content to topmask
			document.getElementById('topMask').appendChild(UciMask.initCloseMask());
			document.getElementById("topMask").appendChild(UciMask.explainHowToCloseDiv());
		}
	},

	start: function () {
		if (!UciMask.settings.launched) {
			UciMask.maskEventCreate();
		}
		UciMask.maskEvent(accessibilitytoolbar.mouseLastEvent);
	},

	initCloseMask: function () {
		var a11y_toolbar = accessibilitytoolbar.make(
			["div", {id: "closeMaskDiv", "class": "closeMask"},
				["button", {
					id: "closeMask",
					title: accessibilitytoolbar.get('uci_close_mask'),
					type: "button",
					"class": "closeMaskHidden uci-popin-btn ucibtn-secondary"
				},
					["span", {"aria-hidden": "true", "class": "cdu-icon cdu-icon-croix"}],
					["span", {"class": "cdu_n"}, accessibilitytoolbar.get('uci_close_mask')]
				]
			]
		);
		a11y_toolbar.querySelector("#closeMask").onclick = function () {
			UciMask.closeMask();
		};
		return a11y_toolbar;
	},

	explainHowToCloseDiv: function () {
		return accessibilitytoolbar.make(["div", {
			id: "howToClose",
			"class": "howtoclose"
		}, accessibilitytoolbar.get('howToClose')])
	},

	maskEventCreate: function () {
		document.addEventListener('mousemove', UciMask.maskEvent, false);
		document.addEventListener('keydown', function (event) {
			UciMask.exitMask(event)
		}, false);
		UciMask.settings.launched = true;
	},

	exitMask: function (e) {
		var winObj = "";
		if (!e)
			e = window.event;

		var intKeyCode = e.keyCode;
		// escape key
		if (intKeyCode === 27 && (
			document.getElementById('topMask').style.display === "block"
			|| document.getElementById('vMouse').style.display === "block"
			|| document.getElementById('hMouse').style.display === "block")) {
			UciMask.closeMask();
		}

	},

	closeMask: function () {
		accessibilitytoolbar.setPref({target: {id: "a11yMaskEnabled", value: "false", type: "checkbox"}});
		UciMask.maskEventRemove();
	},

	maskEventRemove: function () {
		document.removeEventListener('mousemove', UciMask.maskEvent, false);
		// if the mask was launched before, removed it from the dom
		document.getElementById('topMask').style.display = "none";
		document.getElementById('closeMaskDiv').style.display = "none";
		document.getElementById('bottomMask').style.display = "none";
		document.getElementById('vMouse').style.display = "none";
		document.getElementById('hMouse').style.display = "none";
		UciMask.settings.launched = false;
	},

	maskEvent: function (e) {
		if (e) {
			UciMask.draw(e.clientY, e.clientX);
		}
	},

	draw: function (positionY, positionX) {
		// mask mode
		if (this.settings.option === 'mask') {
			closeMask = document.getElementById("closeMask");
			document.getElementById('howToClose').className = document.getElementById('howToClose').className.replace(/ howtocloselight{0,1}/, "");
			var size = 90;
			closeMask.style.height = "90px";
			closeMask.style.width = "90px";
			if (typeof positionY == 'undefined') {
				size = 0;
			}
			var topMaskHeight = 0;
			if ((positionY - (size / 2)) > 0) {
				topMaskHeight = positionY - (size / 2);
			}
			document.getElementById('topMask').style.height = topMaskHeight + "px";
			document.getElementById('topMask').style.display = "block";
			document.getElementById('closeMaskDiv').style.top = topMaskHeight + "px";
			document.getElementById('closeMaskDiv').style.display = "block";
			document.getElementById('howToClose').style.top = topMaskHeight - document.getElementById("howToClose").clientHeight + "px";

			var bottomMaskHeight = 0;
			var winHeight = 0;
			if (window.getComputedStyle) {
				winHeight = parseInt(document.documentElement.clientHeight, 10);
			} else {
				winHeight = parseInt(document.documentElement.offsetHeight, 10);
			}

			if ((winHeight - topMaskHeight - size) > 0) {
				bottomMaskHeight = winHeight - topMaskHeight - size;
			}

			document.getElementById('bottomMask').style.height = bottomMaskHeight + "px";
			document.getElementById('bottomMask').style.display = "block";
		} else {
			document.getElementById('topMask').style.display = "none";
			document.getElementById('closeMaskDiv').style.display = "none";
			document.getElementById('bottomMask').style.display = "none";
			// vruler or hruler
			if (this.settings.option === 'vruler') {
				document.getElementById('vMouse').style.display = "block";
				document.getElementById('vMouse').style.left = ('' + (positionX + 1) + 'px');
			} else {
				// if the vertical ruler was launched before, removed it from the dom
				document.getElementById('vMouse').style.display = "none";
			}

			// horizontal
			if (this.settings.option === 'hruler') {
				document.getElementById('hMouse').style.display = "block";
				document.getElementById('hMouse').style.top = ('' + (positionY + 1) + 'px');
			} else {
				// if the horizontal ruler was launched before, removed it from the dom
				document.getElementById('hMouse').style.display = "none";
			}

		}
	}
}
