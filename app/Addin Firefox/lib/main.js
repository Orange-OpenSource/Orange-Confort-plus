var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var data = require("sdk/self").data;
var ss = require("sdk/simple-storage");
var _ = require("sdk/l10n").get;
var listOfWorkers = {};
var {Cc, Cu, Ci} = require('chrome');

var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
var ios = Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService);
Cu.import("resource://gre/modules/BrowserUtils.jsm");

var css = "@font-face{" +
    "font-family:'orangeconfortplus';" +
    "src:url(" + data.url('confort+/fonts/orangeconfortplus.eot') + ");" +
    "src:url(" + data.url('confort+/fonts/orangeconfortplus.eot') + "?#iefix) format('embedded-opentype')," +
    "url(" + data.url('confort+/fonts/orangeconfortplus.woff') + ") format('woff')," +
    "url(" + data.url('confort+/fonts/orangeconfortplus.ttf') + ") format('truetype')," +
    "url(" + data.url('confort+/fonts/orangeconfortplus.svg') + "#orangeconfortplus) format('svg');}";

css += "@font-face{" +
    "font-family:'opendyslexic';" +
    "src:url(" + data.url('confort+/fonts/open-dyslexic/eot/OpenDyslexic-Regular.eot') + ");" +
    "src:url(" + data.url('confort+/fonts/open-dyslexic/eot/OpenDyslexic-Regular.eot') + "?#iefix) format('embedded-opentype')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/woff/OpenDyslexic-Regular.woff') + ") format('woff')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/ttf/OpenDyslexic-Regular.ttf') + ") format('truetype')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/svg/OpenDyslexic-Regular.svg') + "#opendyslexic) format('svg');font-style: normal;font-weight: normal;}";
css += "@font-face{" +
    "font-family:'opendyslexic';" +
    "src:url(" + data.url('confort+/fonts/open-dyslexic/eot/OpenDyslexic-Bold.eot') + ");" +
    "src:url(" + data.url('confort+/fonts/open-dyslexic/eot/OpenDyslexic-Bold.eot') + "?#iefix) format('embedded-opentype')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/woff/OpenDyslexic-Bold.woff') + ") format('woff')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/ttf/OpenDyslexic-Bold.ttf') + ") format('truetype')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/svg/OpenDyslexic-Bold.svg') + "#opendyslexic) format('svg');font-weight: bold;font-style: normal;}";
css += "@font-face{" +
    "font-family:'opendyslexic';" +
    "src:url(" + data.url('confort+/fonts/open-dyslexic/eot/OpenDyslexic-BoldItalic.eot') + ");" +
    "src:url(" + data.url('confort+/fonts/open-dyslexic/eot/OpenDyslexic-BoldItalic.eot') + "?#iefix) format('embedded-opentype')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/woff/OpenDyslexic-BoldItalic.woff') + ") format('woff')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/ttf/OpenDyslexic-BoldItalic.ttf') + ") format('truetype')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/svg/OpenDyslexic-BoldItalic.svg') + "#opendyslexic) format('svg');font-weight: bold;font-style: italic;}";
css += "@font-face{" +
    "font-family:'opendyslexic';" +
    "src:url(" + data.url('confort+/fonts/open-dyslexic/eot/OpenDyslexic-Italic.eot') + ");" +
    "src:url(" + data.url('confort+/fonts/open-dyslexic/eot/OpenDyslexic-Italic.eot') + "?#iefix) format('embedded-opentype')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/woff/OpenDyslexic-Italic.woff') + ") format('woff')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/ttf/OpenDyslexic-Italic.ttf') + ") format('truetype')," +
    "url(" + data.url('confort+/fonts/open-dyslexic/svg/OpenDyslexic-Italic.svg') + "#opendyslexic) format('svg');font-style: italic;font-weight: normal;}";	

//var cssEnc = 'data:text/css;base64,' + window.btoa(css);
var cssEnc = encodeURIComponent(css);
var cssUri = BrowserUtils.makeURI('data:text/css,' + cssEnc);
sss.loadAndRegisterSheet(cssUri, sss.USER_SHEET);

// Disabled by default
if(typeof(ss.storage.isCduEnabled)=='undefined') {
    ss.storage.isCduEnabled = false;
}
if (typeof(ss.storage.blacklist)=='undefined') {
    ss.storage.blacklist=[];
}

function startCDU(tab) {
	if (ss.storage.isCduEnabled) {
		worker = tab.attach({
      contentScriptFile: [data.url("confort+/conf/extensionFirefox/hebergement.js"),
                          data.url("confort+/js/ToolbarStrings.js"),
                          data.url("confort+/js/UciUserPref.js"),
                          data.url("confort+/js/UciSimpleStorage.js"),
                          data.url("confort+/language/en.js"),
                          data.url("confort+/language/es.js"),
                          data.url("confort+/language/fr.js"),
                          data.url("confort+/language/pl.js"),
                          data.url("confort+/js/UciAideMotrice.js"),
                          data.url("confort+/js/UciCouleur.js"),
                          data.url("confort+/js/UciApparence.js"),
                          data.url("confort+/js/UciTypographie.js"),
                          data.url("confort+/js/UciHelp.js"),
                          data.url("confort+/js/UciValidation.js"),
                          data.url("confort+/js/UciIhm.js"),
                          data.url("confort+/js/toolbar.js"),
                          data.url("confort+/js/mask.js"),
                          data.url("confort+/js/start.extensionFirefox.js")],      
			//contentScriptFile: "confort+/js/concat.js",
			contentScriptOptions: {
			   css :  data.url("confort+/css/classic-toolbar.css"),			   
			   arrows :  data.url("confort+/images/arrows_60.png"),
			   helpfr: data.url("javascript:window.postMessage('orangeconfort+helpfr', document.location.href);"),
			   helpen: data.url("javascript:window.postMessage('orangeconfort+helpen', document.location.href);"),
			   helpes: data.url("javascript:window.postMessage('orangeconfort+helpes', document.location.href);"),
			   helppl: data.url("javascript:window.postMessage('orangeconfort+helppl', document.location.href);"),
               helpPathTarget: ''
			}
		});
			
		worker.port.on('orangeconfort+openhelp', function(langue) {      
      tabs.open({
          url: data.url('confort+/help/help_' + langue + '.html')
      });
    });
    worker.port.on('orangeconfort+userprefget', function(hostname) {
      if(typeof(ss.storage.userPref)=='undefined') {   
        ss.storage.userPref = '00006510006506506500000000000000000065000000100';
      }
      var index = ss.storage.blacklist.indexOf(hostname);
      var flag = 0;
      if(index > -1) {
        flag = 1;
      }
			this.emit('orangeconfort+userprefgetresponse', ss.storage.userPref + flag);
			
    });
    worker.port.on('orangeconfort+userprefsave', function(value) {
      ss.storage.userPref = value;
    });
    worker.port.on('orangeconfort+blacklistsave', function(value) {
      var index = ss.storage.blacklist.indexOf(value);
      if(index > -1) {
          ss.storage.blacklist.splice(index, 1);
      } else {
          ss.storage.blacklist.push(value);
      }
    });
	    
    listOfWorkers[worker.tab.id] = worker; 
		
		worker.port.emit('orangeconfort+loadcdu');
	
		
	}
}

// Update CDU button icon
function updateButtonIcon() {
	if (ss.storage.isCduEnabled) {
		cduButton.icon = {
			  "16": "./icon-16.png",
		    "32": "./icon-32.png",
		    "64": "./icon-64.png"		
		}
	} else {
		cduButton.icon = {
			  "16": "./icon-disabled-16.png",
		    "32": "./icon-disabled-32.png",
		    "64": "./icon-disabled-64.png"		
		}
	}
}

var prefix ='icon';
if(ss.storage.isCduEnabled == false) {
    prefix = prefix + '-disabled';
}
// Create toolbar CDU button
var cduButton = buttons.ActionButton({
  id: "cdu-link",
  label: _("cdu_title"),
  icon: {
    "16": "./" + prefix + "-16.png",
    "32": "./" + prefix + "-32.png",
    "64": "./" + prefix + "-64.png"
  },  
  onClick: function () {
		ss.storage.isCduEnabled = !ss.storage.isCduEnabled;
		updateButtonIcon();
		if(ss.storage.isCduEnabled) {
			for(let tab of tabs) {
				if(tab.readyState == 'complete') {
					startCDU(tab);
				}
			}
			tabs.on("ready", startCDU);
		}
		else {
			for(var id in listOfWorkers) {
				var aWorker = listOfWorkers[id];
				if (aWorker.tab != null && aWorker.tab !== undefined) {
					if ((aWorker.tab.readyState == 'complete') && (aWorker.tab.id != 'undefined')) {
						aWorker.port.emit('orangeconfort+closecdu');
					}
				}
				aWorker.destroy();
			}
			listOfWorkers = {};
			tabs.removeListener("ready", startCDU);
		}
	  }  
});
tabs.on("ready", startCDU);