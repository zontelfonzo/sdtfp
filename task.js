chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	var x = new XMLHttpRequest();
	x.open("GET",chrome.extension.getUrl('sdtfp_chat_opts.html'),true);
	x.send();
	console.log("SDTFP>>>"+x.responseText);
	sendResponse(x.responseText);
});