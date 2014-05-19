//var sdtfp_content = "<legand style='display: block; width: 100%; padding: 0; margin-bottom: 20px; font-size: 21px; line-height: inherit; color: #333; border: 0; border-bottom: 1px solid #e5e5e5;'>Scrap.TF+</legand> <div class='test-group'> <label for='chat-triggers' class='col-lg-2 control-label'>Custom Chat Sound URL:</label> <div class='col-lg-10'> <input class='form-control' id='sdtfp-chatbeep-iv' placeholder='hue' type='text' name='chat-beep' title='hue'> <p class='help-block'>Can only be a url to a website. Can not use local files. Security Reasons.</p> </div> </div><div class='form-group'> <div class='col-lg-offset-2 col-lg-10'> <input id='scratchs-button' type='button' class='btn btn-primary' id='sdtfpBeepSaveBtn' value='Save'></button> </div></div></form>";


//$('.welcome-overlay-well').append(sdtfp_content);
//$('.welcome-overlay-well').css('height',"854px");//jerry rig
$('#sdtfp-chatbeep-iv').attr('value',localStorage['homeBeep']);

var pack = document.createElement('script');
pack.src = chrome.extension.getURL('pack.settings.js');
pack.onLoad = function(){
	this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(pack);