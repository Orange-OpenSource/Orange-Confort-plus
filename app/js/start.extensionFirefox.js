/**
    This file is part of Orange Confort+ | A centralized Javascript application to enable users to customize display and behaviour of websites to suit their advanced accessibility needs
    
    Copyright (C) 2014 - 2016  Orange SA

    Orange Confort+ is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    Orange Confort+ is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details (LICENSE.txt file).
**/
var block = false;

window.addEventListener('message', function(event) {
	if(block == false) {
	    if (  typeof event.data === 'object')
	            return false;
	      var split = event.data.split('_');
	      var message = split[0];
	      var value = split[1];
		  if(message === 'orangecomfort+helpfr') {
	          self.port.emit('openhelp', 'fr');
	      }
	      if(message === 'orangecomfort+helpen') {
	          self.port.emit('openhelp', 'en');
	      }
	      if(message === 'orangecomfort+helpes') {
	          self.port.emit('openhelp', 'es');
	      }
	      if(message === 'orangecomfort+userprefget') {
			  self.port.emit('orangecomfort+userprefget', document.location.hostname);
	      }
	      if(message === 'orangecomfort+userprefsave') {
			  self.port.emit('orangecomfort+userprefsave', value);
	      }
	      if(message === 'orangecomfort+blacklistsave') {
	          self.port.emit('orangecomfort+blacklistsave', value);
	      }
	}
  
}, true);

self.port.on('orangecomfort+userprefgetresponse', function(value) {
	if(block == false) {
		accessibilitytoolbar.userPref.setStoredValue(value);
	}
});

self.port.on('orangecomfort+closecdu', function() {
	if(block == false) {
		accessibilitytoolbar.userPref.setStoredValue('00006510006506506500000000000000000065000000100');
		accessibilitytoolbar.reloadToolbar();
		accessibilitytoolbar.close();
	}
});

self.port.on('orangecomfort+loadcdu', function() {
	toolbarServer = document.querySelector("script[src*='crossdom/js']");
	head = document.querySelector("head");
	body = document.querySelector("body");
	if((toolbarServer == null) && (head != null) && (body != null) && (window.location.href != 'about:blank')) {
		accessibilitytoolbar.start();
	} else {
		block = true;
	}
});