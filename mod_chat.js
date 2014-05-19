//grab settings
var beepSetting = localStorage['sdtfp-cus-chatbeep'];
if(beepSetting === null || beepSetting == "")/*Check if beepSetting is set*/
{
	beepSetting = $('#chatBeep').attr('src');/*if ! use the default from #chatBeep*/
}else{
	$('#chatBeep').attr('src',beepSetting);
}



/*Add Script Package*/
var pack = document.createElement('script');
pack.src = chrome.extension.getURL('pack.chat.js');
pack.onLoad = function(){
	this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(pack);

chrome.runtime.sendMessage({cmd:"task"},function(d){
	var peck = document.createElement('div');
	peck.innerHtml = d;
	console.log("SDTFP>>>"+d);
	document.body.appendChild(peck);
});

/*Add Elements/Buttons*/
$('#jukebox-button').after('<button accesskey="P" title="Scrap.TF+ Chat Settings" id="sdtfp-chatSettings" class="chat-button" onclick="sdtfp.showSdtfpMenu();" value="+"><i class="fa fa-plus"></i></button>');