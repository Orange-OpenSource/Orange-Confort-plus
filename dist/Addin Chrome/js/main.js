var tabsList = {};
// Set CDU disable by default
if(localStorage.getItem('isCduEnabled') === null) {
	localStorage.setItem('isCduEnabled', false);	
}
var value = (localStorage.getItem('isCduEnabled') == 'true') ? true : false;
updateButtonIcon(value);
// init blacklist websites
if(localStorage.getItem('blacklist') === null) {
	localStorage.setItem('blacklist', []);	
}

function startCDU(tab) {
	if(localStorage.getItem('isCduEnabled') == "true") {
		chrome.tabs.sendMessage(tab.id, {message: "orangecomfort+doyouexist"}, function(response) {
	        if (response) {
	        	chrome.tabs.sendMessage(tab.id, {message: 'orangecomfort+loadcdu'});
	        }
	    });
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.message) {
	case 'openhelp' :
		
		break;
	case 'orangecomfort+userprefget' :
		if(localStorage.getItem('userPref') === null) {   
            localStorage.setItem('userPref', '00006510006506506500000000000000000065000000100');
        }
        var index = localStorage.getItem('blacklist').indexOf(request.value);
        var flag = 0;
        if(index > -1) {
            flag = 1;
        }
		chrome.tabs.sendMessage(sender.tab.id, {message:'orangecomfort+userprefgetresponse', value:localStorage.getItem('userPref') + flag});
		break;
	case 'orangecomfort+userprefsave' :
		localStorage.setItem('userPref', request.value);
		break;
	case 'orangecomfort+blacklistsave' :
		var blacklist = localStorage.getItem('blacklist');
		var index = blacklist.indexOf(request.value);
        if(index > -1) {
        	localStorage.setItem('blacklist', blacklist.splice(index, 1));
        } else {
        	localStorage.setItem('blacklist', blacklist.push(value));
        }
		break;
	case 'orangecomfort+getIsCduEnabled' :
		sendResponse({value:localStorage.getItem('isCduEnabled')});
		break;
	}
});
// Update CDU button icon
function updateButtonIcon(isEnabled) {
	if (isEnabled === true) {
		chrome.browserAction.setIcon({path: "data/icon-19.png"});
	} else {
		chrome.browserAction.setIcon({path: "data/icon-disabled-19.png"});
	}
}

// CDU button click event
chrome.browserAction.onClicked.addListener(function(tab) {
  var value = (localStorage.getItem('isCduEnabled') == 'true') ? false : true;
  localStorage.setItem('isCduEnabled', value);
  updateButtonIcon(value);
  if(localStorage.getItem('isCduEnabled') == 'true') {
	chrome.tabs.query({
		"status":        "complete"
	},
	function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			startCDU(tabs[i]);
		}
	});
  }
  else {
	  chrome.tabs.query({
			"status":        "complete"
	  },
	  function(tabs) {
		  for (var i = 0; i < tabs.length; i++) {
			  chrome.tabs.sendMessage(tabs[i].id, {message: 'orangecomfort+closecdu'});
		  }
	  });
  }
});