var valInAppendid = localStorage["sdtfp-appendid"];
if(valInAppendid === null || valInAppendid == "" || valInAppendid == undefined){
	valInAppendid = "";
}
var valInChatBeep = localStorage["sdtfp-cus-chatbeep"];
if(valInChatBeep === null || valInChatBeep == "" || valInChatBeep == undefined){
	valInChatBeep = "";
}

/*Custom Chat Beeps*/
var valInCusBeep_home = localStorage["sdtfp-cus-beep-home"];
if(valInCusBeep_home === null || valInCusBeep_home == "" || valInCusBeep_home == undefined){
	valInCusBeep_home = "";
}
var valInCusBeep_support = localStorage["sdtfp-cus-beep-support"];
if(valInCusBeep_support === null || valInCusBeep_support == "" || valInCusBeep_support == undefined){
	valInCusBeep_support = "";
}
var valInCusBeep_donator = localStorage["sdtfp-cus-beep-donator"];
if(valInCusBeep_donator === null || valInCusBeep_donator == "" || valInCusBeep_donator == undefined){
	valInCusBeep_donator = "";
}
var valInCusBeep_erp = localStorage["sdtfp-cus-beep-erp"];
if(valInCusBeep_erp === null || valInCusBeep_erp == "" || valInCusBeep_erp == undefined){
	valInCusBeep_erp = "";
}

/*//add the html*/
$('.welcome-overlay-well').append("<form id='sdtfp-form' name='chat' class='form-horizontal' role='form' style='padding-right:32px;'> <legend>Scrap.TF+ settings</legend> <div class='form-group'> <label for='sdtfp-in-chatBeep' class='col-lg-2 control-label'>Default custom chat beep</label> <div class='col-lg-10'> <input class='form-control' value='"+valInChatBeep+"' id='sdtfp-in-chatBeep' placeholder='hue' type='text' name='chat-triggers' title='chat bleep bah'> <p class='help-block'>Must be a URL</p> </div> </div><div class='form-group'> <div class='col-lg-10'> <table> <tr> <td><input value='#home' disabled></td> <td><input id='sdtfp-in-beep-home' value='"+valInCusBeep_home+"'></td> </tr> <tr> <td><input value='#support' disabled></td> <td><input id='sdtfp-in-beep-support' value='"+valInCusBeep_support+"'></td> </tr> <tr> <td><input value='#donator' disabled></td> <td><input id='sdtfp-in-beep-donator' value='"+valInCusBeep_donator+"'></td> </tr> <tr> <td><input value='#erp' disabled></td> <td><input id='sdtfp-in-beep-erp' value='"+valInCusBeep_erp+"'></td> </tr> </table> </div></div><div class='form-group'> <div class='col-lg-offset-2 col-lg-10'> <input type='button' class='btn btn-primary' id='sdtfp-save' value='Save+'></button> </div> </div> </form> ");

/*//do some stuff*/

if(valInAppendid == "true"){
	$('#sdtfp-appendid').prop('checked',true);
}else{
	$('#sdtfp-appendid').prop('checked',false);
}
/*//add the click event to the button*/
$('#sdtfp-save').on('click', function () {
	localStorage.setItem('sdtfp-cus-chatbeep',$('#sdtfp-in-chatBeep').val());
	localStorage.setItem('sdtfp-appendid',$('#sdtfp-appendid').prop('checked'));
	localStorage.setItem('sdtfp-cus-beep-home',$('#sdtfp-in-beep-home').val());
	localStorage.setItem('sdtfp-cus-beep-support',$('#sdtfp-in-beep-support').val());
	localStorage.setItem('sdtfp-cus-beep-donator',$('#sdtfp-in-beep-donator').val());
	localStorage.setItem('sdtfp-cus-beep-erp',$('#sdtfp-in-beep-erp').val());
	Toast('Scrap.TF+ Settings Saved','alert-success');
});