// Copyright (c) 2016 - 2019 Orange. 
//
// This file is part of Orange Confort+ Internet Explorer Extension | An Internet Explorer Extension that embed Orange Confort+ (http://confort-plus.orange.com/)
//
// Orange Confort+ is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// Orange Confort+ is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details (LICENSE.txt file).
var toolbarServer = document.querySelector("script[src*='crossdom/js']");
var head = document.querySelector("head");
var body = document.querySelector("body");
var toolbarDiv = document.querySelector("accessibilitytoolbarGraphic");
if ((toolbarServer == null) && (head != null) && (body != null) && (window.location.href != 'about:blank')) {
    if (toolbarDiv == null) {
        accessibilitytoolbar.start();
    }
} else {
    serviceBlocked = true;
}