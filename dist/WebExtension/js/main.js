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
		chrome.tabs.sendMessage(tab.id, {message: "orangeconfort+doyouexist"}, function(response) {
	        if (response) {
	        	chrome.tabs.sendMessage(tab.id, {message: 'orangeconfort+loadcdu'});
	        }
	    });
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.message) {
		case 'orangeconfort+userprefget' :
			if(localStorage.getItem('UCI41') === null) {
          // Default cookie value first bit set toolbar enable, second one set default lang, third one set to no profile
		      localStorage.setItem('UCI41', '1|0|0');
		    }
		    var index = localStorage.getItem('blacklist').indexOf(request.value);
		    var flag = 0;
		    if(index > -1) {
		        flag = 1;
		    }
			chrome.tabs.sendMessage(sender.tab.id, {message:'orangeconfort+userprefgetresponse', value:flag+"|"+localStorage.getItem('UCI41')});
			break;
		case 'orangeconfort+userprefsave' :
			localStorage.setItem('UCI41', request.value);
			break;
		case 'orangeconfort+blacklistsave' :
			var blacklist = localStorage.getItem('blacklist');
			var index = blacklist.indexOf(request.value);
		    if(index > -1) {
		    	localStorage.setItem('blacklist', blacklist.splice(index, 1));
		    } else {
		    	localStorage.setItem('blacklist', blacklist.push(value));
		    }
			break;
		case 'orangeconfort+getIsCduEnabled' :
			sendResponse({value:localStorage.getItem('isCduEnabled')});
			break;
	}
});
// Update CDU button icon
function updateButtonIcon(isEnabled) {
	if (isEnabled === true) {
		chrome.browserAction.setIcon({path: "img/icon-19.png"});
	} else {
		chrome.browserAction.setIcon({path: "img/icon-disabled-19.png"});
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
			  chrome.tabs.sendMessage(tabs[i].id, {message: 'orangeconfort+closecdu'});
		  }
	  });
  }
});
