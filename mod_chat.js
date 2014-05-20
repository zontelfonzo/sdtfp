//grab settings
var beepSetting = localStorage['sdtfp-cus-chatbeep'];
if(beepSetting === null || beepSetting == "")/*Check if beepSetting is set*/
{
	beepSetting = $('#chatBeep').attr('src');/*if ! use the default from #chatBeep*/
}else{
	$('#chatBeep').attr('src',beepSetting);
}



/*Add Script Package*/
var genPopMenu = function(){
	var rvar = "<div class='sdtfp-popMenu'>";
	rvar = rvar+"<div class='sdtfp-popPoint'></div>";
	rvar = rvar+"<h4>&nbsp;&nbsp;&nbsp;&nbsp;Scrap.<span style='color:#F00;'>T</span><span style='color:#00F;'>F</span>+</h4>";
	rvar = rvar+"<dt><dl>";
	rvar = rvar+"<button id='sdtfp-btn-DEBUG'>Reload Chat</button><br>";
	rvar = rvar+"<button id='sdtfp-btn-toggleChatLines'>Toggle Chat Lines</button><br>";
	rvar = rvar+"</dl></dt>";

	rvar = rvar+"<div class='ocordbox' id='sdtfp-box-vidList'>";
	rvar = rvar+"<div class='ocordbox-title'>Video List</div>";
	rvar = rvar+"<div class='ocordbox-content'>";
	rvar = rvar+"</div>";
	rvar = rvar+"</div>";

	rvar = rvar+"<div class='ocordbox'>";
	rvar = rvar+"<div class='ocordbox-title'>Title Two</div>";
	rvar = rvar+"<div class='ocordbox-content'>";
	rvar = rvar+"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec mauris in orci semper pellentesque. Suspendisse dui leo, tristique ac dignissim sed, semper id nisl. Curabitur mi magna, aliquet id placerat sit amet, mattis at mauris. Morbi massa est, imperdiet eget ante sit amet, rutrum venenatis diam. Nam tempus sapien in tellus tempor lobortis. Morbi sapien dui, placerat sed lacus in, porttitor ultricies purus. Phasellus rhoncus gravida justo a tincidunt. Duis faucibus metus quis tristique pretium.";
	rvar = rvar+"</div>";
	rvar = rvar+"</div>";

	rvar = rvar+"<br></div>";
	return rvar;
}

var peck = document.createElement('div');
peck.innerHTML = genPopMenu();
document.body.appendChild(peck);

var pack = document.createElement('script');
pack.src = chrome.extension.getURL('pack.chat.js');
pack.onLoad = function(){
	this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(pack);
peck = undefined;
pack = undefined;

/*Add Elements/Buttons*/
$('#jukebox-button').after('<button accesskey="P" title="Scrap.TF+ Chat Settings" id="sdtfp-chatSettings" class="chat-button" onclick="sdtfp.showSdtfpMenu();" value="+"><i class="fa fa-plus"></i></button>');