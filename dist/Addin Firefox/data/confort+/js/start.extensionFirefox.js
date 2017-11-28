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

window.addEventListener('message', function (event) {
  if (!document.getElementById("uci-onoffswitch")) {
    if (typeof event.data === 'object')
      return false;
    var split = event.data.split('_');
    var message = split[0];
    var value = split[1];
    if (message === 'orangeconfort+helpfr') {
      self.port.emit('orangeconfort+openhelp', 'fr');
    }
    if (message === 'orangeconfort+helpen') {
      self.port.emit('orangeconfort+openhelp', 'en');
    }
    if (message === 'orangeconfort+helpes') {
      self.port.emit('orangeconfort+openhelp', 'es');
    }
    if (message === 'orangeconfort+helppl') {
      self.port.emit('orangeconfort+openhelp', 'pl');
    }
    if (message === 'orangeconfort+userprefget') {
      self.port.emit('orangeconfort+userprefget', document.location.hostname);
    }
    if (message === 'orangeconfort+userprefsave') {
      self.port.emit('orangeconfort+userprefsave', value);
    }
    if (message === 'orangeconfort+blacklistsave') {
      self.port.emit('orangeconfort+blacklistsave', value);
    }
  }

}, true);

self.port.on('orangeconfort+userprefgetresponse', function (value) {
  if (!document.getElementById("uci-onoffswitch")) {
    accessibilitytoolbar.userPref.decodeUsageConfort(value);
  }
});

self.port.on('orangeconfort+closecdu', function () {
  if (!document.getElementById("uci-onoffswitch")) {
    accessibilitytoolbar.userPref.setStoredValue();
    accessibilitytoolbar.reloadToolbar();
    accessibilitytoolbar.close();
  }
});

self.port.on('orangeconfort+loadcdu', function () {
  toolbarServer = document.querySelector("script[src*='crossdom/js']");
  head = document.querySelector("head");
  body = document.querySelector("body");
  if ((toolbarServer == null) && (head != null) && (body != null) && (window.location.href != 'about:blank') && !document.getElementById("uci-onoffswitch")) {
    accessibilitytoolbar.strings.setForceDefaultLocale(browser.i18n.getUILanguage().toUpperCase());
    accessibilitytoolbar.start();
  }
});