sdtfp = {
	vidList:{},
	roomBeepList:{},
	roomDefault:"donator",
	roomJoinList:['donator','nsfw','panties'],
	joinTaskSet:false,
	chatBuffer:"",
	chatLimit:0,
	chatLineLastId:-34,
	chatLineOn:true,
	reloadHard:false,
	test:"test",
	say:function(msg,room){
		if(room == undefined){
			room = "global";
		}
		Chat.LogChat("http://i.imgur.com/xOP0CHd.png", "Scrap.TF+", msg, room, -34, "Extension", "scraptf", 666, "http://i.imgur.com/e2IjUlO.png");
	},
	init:function(){
		$("#chat-settings>a:last-child").text("Save and Apply");
		$("body").prepend("<div class='sdtfp-audioBlock'></div>");
		sdtfp.chatLimit = localStorage.messageLimit*2;
		$("#message-limit").attr('type','number');
		$(".chat-settings>a:last").text('Save And Apply');
		if(localStorage['sdtfp-chatBeep'] != undefined){
			try{
				$("#chatBeep").attr('src',localStorage['sdtfp-chatBeep']);	
			}catch(err){
				console.log("ScrapTF+>>> couldn't set default beep");
			}
		}
		if(localStorage['sdtfp-roomBeepList'] != undefined){
			try{
				sdtfp.roomBeepList = JSON.parse(localStorage['sdtfp-roomBeepList']);	
			}catch(err){
				console.warn("ScrapTF+>>> couldn't parse roomBeepList");
			}
		}
		if(localStorage['sdtfp-vidList'] != undefined){
			try{
				sdtfp.vidList = JSON.parse(localStorage['sdtfp-vidList']);	
			}catch(err){
				console.warn("ScrapTF+>>> couldn't parse vidList");
			}
		}
		for(v in sdtfp.roomBeepList){
			$(".sdtfp-audioBlock").append("<audio id='sdtfp-ae-"+v+"' src='"+sdtfp.roomBeepList[v]+"'>");
		}
		Chat.Toast('Scrap.TF+ Loaded.','alert-success');		
	},
	chatLine:function(xvar,uid){
		if(xvar == true){
			return "<div class='sdtfp-chatLine sdtfp-usrid-"+ uid +"'></div>";
		}else{
			return "<div class='sdtfp-chatLine sdtfp-usrid-"+ uid +" sdtfp-hideme'></div>";	
		}
	},
	helpHTML:function(){
		rvar = "";
		rvar += "<ul>";

		rvar += "<li>Help Not Complete cuz im lazzz</li>";
		rvar += "<li><u><h4>/sdtfp</h4></u></li>";
		rvar += "<li><h6>These commands</h6></li>";
		rvar += "<li><u><h4>Other Commands</h4></u></li>";
		rvar += "<li>/google <Your question> Post a Let Me Google That for you link</li>";
		rvar += "<li>/Google <Your question> Post a Google Search link</li>";

		rvar += "</ul>";
		return rvar;
	},
	reinit:function(msg){
		sdtfp.vidList = JSON.parse(localStorage["sdtfp-vidList"]);
		sdtfp.roomBeepList = JSON.parse(localStorage["sdtfp-roomBeepList"]);
		sdtfp.chatBeep = localStorage["sdtfp-chatBeep"] || $("#chatBeep").attr('src');
		sdtfp.chatLimit = localStorage.messageLimit*2;
		beepTriggers = (localStorage.beepTriggers) ? localStorage.beepTriggers.split(';') : [];
		sdtfp.say("Reloading Settings");
		$("#chatBeep").attr('src',sdtfp.chatBeep);

	},
	toggleAppendId:function(){
		if(localStorage["sdtfp-appendid"] === null || localStorage["sdtfp-appendid"] == "false"){
			localStorage.setItem('sdtfp-appendid',true);
			$(".sdtfp-appendid-tar").show();
			Toast('Showing Id\'s','alert-success');
		}else{
			localStorage.setItem('sdtfp-appendid',"false");
			$(".sdtfp-appendid-tar").hide();
			Toast('Hiding Id\'s','alert-error');
		}
	},
	sdtfp_getParm:function(msg){
		if(msg.search(" ") == -1){return false;}
		var rvar = msg;
		var rvar = rvar.substr(1,msg.length);
		return rvar.substr(0,rvar.search(" "));
	},
	sdtfp_popParm:function(msg){
		if(msg.search(" ") == -1){return false;}
		var rvar = msg;
		var rvar = rvar.substr(1,msg.length);
		return rvar.substr(rvar.search(" "),rvar.length);
	},
	showSdtfpMenu:function(){
		$(".sdtfp-popMenu").fadeToggle();
	},
	slimRoom:function(){ 	
		$('.chat-history').each(function(i,roomEle){
			$(roomEle).each(function(x,asd){
				if(x>sdtfp.chatLimit){
					x.remove();
				}
			});
		});
	},
	toggleChatLines:function(){
		if(localStorage["sdtfp-chatLines"] === null || localStorage["sdtfp-chatLines"] == "false"){
			localStorage.setItem('sdtfp-chatLines',"true");
			$(".sdtfp-chatLine").show();
			Chat.Toast('Chat lines on','alert-success');
		}else{
			localStorage.setItem('sdtfp-chatLines',"false");
			$(".sdtfp-chatLine").hide();
			Chat.Toast('Chat lines off','alert-error');
		}
	},
	playSound:function(room){
		if(sdtfp.roomBeepList[room] == undefined){
			Chat.BeepElement.play();
		}else{
			var temp = "sdtfp-ae-"+room;
			console.log("Played a sound for "+temp);
			document.getElementById(temp).play();
		}
	},
	shortcuts:{
		roomIn:function(){
			return Chat.RoomIn.substr(1,Chat.RoomIn.length-1);
		},
		videoOverwriteVideoPrompt:function(tag,vlink){
			sdtfp.say("<h5>A video has already been assigned to "+tag+". Would you like to overwrite it?</h5><h6>Current video for "+tag+" - "+sdtfp.vidList[tag]+"</h6><br><center class='overwriteButtons'><a class='OverwriteConfirm' href='#'>Yes</a> - <a class='OverwriteCancel' href='#'>No</a></center>");
			$(".OverwriteConfirm").on('click',function(){
				$(".overwriteButtons").html("<span style='color:#0C0;'>Overwrote [v/"+tag+"]</span>");
				$(".overwriteButtons").attr("class","sdtfp-videoOverwriteStatusResault");
				console.log("sdtfp>>>adding video to video list "+tag+":"+vlink);
				sdtfp.vidList[tag] = vlink;
				localStorage.setItem("sdtfp-vidList",JSON.stringify(sdtfp.vidList));
			});
			$(".OverwriteCancel").on('click',function(){
				$(".overwriteButtons").html("<span style='color:#C00;'>[v/"+tag+"] is unchanged</span>");
				$(".overwriteButtons").attr("class","sdtfp-videoOverwriteStatusResault");
			});
		},
	}
};

/*Function overrrides*/
Chat.LogSmall = function(txt, room){
		if(txt === "<span style='color:red;'>The chat server is currently offline.</span>"){
			txt = "<span style='color:red;'>The chat server is currently offline.<br>This page will reload in 10 seconds</span>";
			setTimeout(function(){
				location.reload();
			},10000);
		}
		if(room=="global" || !room) {
			var chatHistoryDiv = (Chat.$chatHistoryAll.length) ? Chat.$chatHistoryAll : Chat.$chatHistory;
		} else {
			var $roomRoom = $("#room-"+room);
			var chatHistoryDiv = (typeof $roomRoom.length != "undefined") ? $roomRoom : Chat.$chatHistory;
		}
		chatHistoryDiv.prepend("<div class='chat-message-small chat-item'>" + txt + "</div>");
	},
Chat.LogChat = function(ava, name, text, room, userid, title, bg, level, badge){
	if(!sdtfp.joinTaskSet){
		for(var i = 0;i<sdtfp.roomJoinList.length;i++){
			Chat.SwitchRoom(sdtfp.roomJoinList[i]);
			console.log("SDTFP>>>autojoin: "+sdtfp.roomJoinList[i]);
		}
		sdtfp.joinTaskSet = true;
	}
	if(userid == 0){
		if(text=="Slow down there!"){
			$("#chat-input-txt").val(sdtfp.chatBuffer);
		}
		if(text.search("PM From") > 0){
			room = "global";
		}
	}
	
	level = (level == undefined)? "1" : level;
	title = (title) ? title : "User";
	bg = 	(bg) ? "style='background-image:url(/img/pony/chatbg/"+bg+".png);'" : "";
	ava = 	(ava) ? "<div class='pull-left'><img src='" + ava + "' style='cursor:help' onclick='userTool("+userid+",\""+Chat.Util.EscapeHTML(name)+"\","+level+",event)' /></div>" : "";
	limit = (localStorage.messageLimit && localStorage.messageLimit > 9) ? localStorage.messageLimit : 100;
	limit *= 2;

	if(name == "Sweeitebot" && msg == "Slow down there!"){
		$("#chat-input-txt").val(sdtfp.chatBuffer);
	}
	//if(Chat.$chatHistory.length) var chatHistoryDiv = Chat.$chatHistory; //backwards compatibility
	if(room=="global" || !room) var chatHistoryDiv = Chat.$chatHistoryAll;
	else var chatHistoryDiv = $("#room-"+room);
	
	if(Chat.RoomIn != '#'+room) 
		$("#roomtab-"+room).addClass('activity-tab');
	if(room == "support" && badge && badge == "support") 
		name = "<i class='fa fa-user-md'></i> "+name;
	
	chatHistoryDiv.prepend("<div "+bg+" class='chat-history-item chat-item lvl"+level+" "+badge+"'>"+ava+"<span><a class='chat-ulink group"+level+"' title='" + title + "' target='_blank' href='/profile/" + userid + "'>" + name + "</a></span><div class='chat-message'>" + text + "</div></div>"+sdtfp.chatLine(localStorage['sdtfp-chatLines'],userid));
	
	if (chatHistoryDiv.children().length > limit) 
			chatHistoryDiv.children().slice(-1).remove();

};
Chat.SendChat = function(e) {
		
	if(e.which == 33 || e.which == 38) //scroll up with arrow/pgup
		window.scrollBy(0,-36);
	else if(e.which == 34 || e.which == 40) //scroll down with arrow/pgdn
		window.scrollBy(0,36);
	else if(e.which == 36) //home
		window.scrollTo(0,0);

	if(e.which != 13) return;
	
	var msg = Chat.$chatInputTxt.val();
	
	if(Chat.PopupChat) {
		if(msg.indexOf("/track ")===0 || msg.indexOf("!jukebox")===0 || msg.indexOf("/v ")===0) {
			Chat.ToggleJukebox(true);
			if(vol = msg.match(/^\/v ([0-9])/)) return setVolume("0."+vol[1]+"9");
		}
	} else if(msg.indexOf("/")===0) {
		if (msg.indexOf("/join ")===0)	
			return Chat.LogSmall("<span>Multiple room support is only available in popout chat!</span>");
		else if(msg.indexOf("/track ")===0)	
			return Chat.LogSmall("<span>Jukebox is only available in popout chat!</span>");
	}
	
	Chat.SendChat2(msg);
};
Chat.SendChat2 = function(msg) {
	$("#chat-input-txt").val("");
	sdtfp.chatBuffer = msg;
	if(msg.substr(0,3) == "[v`" || msg.substr(0,3) == "[v/"){
		var ebp = msg.search(/\]/g);/*end braket position*/
		if(ebp != -1){
			var tag = msg.substr(3,ebp-3);
			if(sdtfp.vidList[tag] != undefined){
				Chat.Socket.emit('chat',{'msg':sdtfp.vidList[tag]});
			}else{
				sdtfp.say("Video tag "+tag+" was not found");
			}
		}else{
			if(Chat.IsConnected()){
				Chat.Socket.emit("chat", {"msg":msg});
			}
		}
	}else if(msg.substr(0,7) == "/sdtfp "){
		if(msg.length === 7){
			sdtfp.say(sdtfp.helpHTML());
		}
		var t = msg.substr(7,msg.length-7);
		while(t.substr(0,1) == " "){
			t =t.substr(1,t.length-1);
		}
		t = t.split(" ");
		var scmd = t.shift();
		switch(scmd){
			case "vidList":
				switch(t.shift().toLowerCase()){
					case "add":
						var tag = t.shift();
						var vlink = t.shift();
						if(tag == undefined || vlink == undefined){
							sdtfp.say("Shits broke son");
						}else{
							if(sdtfp.vidList[tag] == undefined){
								console.log("sdtfp>>>adding video to video list "+tag+":"+vlink);
								sdtfp.vidList[tag] = vlink;
								sdtfp.say("added video [v`"+tag+"]");
								localStorage.setItem("sdtfp-vidList",JSON.stringify(sdtfp.vidList));
							}else{
								sdtfp.shortcuts.videoOverwriteVideoPrompt(tag,vlink);
							}
						}
						break;
					case "link":
						var tag = t.shift();
						if(tag == undefined){
							sdtfp.say("What tag do you want to look for?");
						}else{
							console.log("sdtfp>>>searching for "+tag);
							var vlink = sdtfp.vidList[tag];
							if(vlink == undefined){
								sdtfp.say("There is not video assinged to that tag");
							}else{
								sdtfp.say("Link: <a href="+vlink+" target='_blank'>"+tag+" - "+vlink+"</a>");
							}
						}
						break;
					case "remove":
						var tag = t.shift();
						if(tag == undefined){
							sdtfp.say("What tag do you want to look for?");
						}else{
							console.log("sdtfp>>>searching for "+tag);
							var vlink = sdtfp.vidList[tag];
							if(vlink == undefined){
								sdtfp.say("There is not video assinged to that tag");
							}else{
								delete sdtfp.vidList[tag];
								sdtfp.say("removed video "+tag+"");
								localStorage.setItem("sdtfp-vidList",JSON.stringify(sdtfp.vidList));
							}
						}
						break;
					case "list":
						var qwe = "<h2>List of all videos</h2>";
						for(key in sdtfp.vidList){
						    qwe += key+" - Link: <a href="+sdtfp.vidList[key]+" target='_blank'>"+sdtfp.vidList[key]+"</a><br/>";
						}
						sdtfp.say(qwe,sdtfp.shortcuts.roomIn());
						break;
					case "search":
						var tag = t.shift();
						if(tag !== undefined){
							var vlink = sdtfp.vidList[tag];
							if(vlink === undefined){
								sdtfp.say("No video is set for tag "+tag);
							}else{
								sdtfp.say(tag+" - <a href='"+vlink+"'>"+vlink+"</a>");
							}
						}else{
							sdtfp.say("You didnt supply a tag to look for...<br>You'r tearing me aprat Lisa!")
						}
						break;
					default :
						sdtfp.say("That is not a vaild argument for vidList");
				}
				break;
			default:
				sdtfp.say(scmd+" is not a known command");
		}
	}else if(msg.substr(0,8) == "/google "){
		Chat.Socket.emit("chat", {"msg":"http://lmgtfy.com/?q="+msg.substr(8,msg.length-8).replace(/\+/g,"%2B").replace(/\s/g,"+")});
	}else if(msg.substr(0,8) == "/Google "){
		Chat.Socket.emit("chat", {"msg":"http://www.google.com/?q="+msg.substr(8,msg.length-8).replace(/\+/g,"%2B").replace(/\s/g,"+")});
	}else{
		if(Chat.IsConnected()){
			Chat.Socket.emit("chat", {"msg":msg});
		}
	}
};
Chat.PlaySound = function(text, room){ 
	if(localStorage.chatBeep === "trigger") {
		var triggerLength = Chat.BeepTriggers.length;
		for(p=0; p<triggerLength; p++) {
			if(Chat.BeepTriggers[p].length < 2) continue;
			if(text.toUpperCase().indexOf(Chat.BeepTriggers[p].toUpperCase())!==-1) {
				if(Chat.RoomIn != '#'+room){
					$("#roomtab-"+room).addClass('alert-tab')
				}
				return sdtfp.playSound(room);
			}
		}
	} else if(localStorage.chatBeep === "true") {
		sdtfp.playSound(room);
	}
},
Chat.ToggleChatSettings = function(event){
	if ($("#chat-settings").length){
		$("#chat-settings").hide("fast").remove();
		$("#settings-button").css({"background-color": "#BDC3C7"});
		return false;
	}
	$(".chat-settings").remove();
	$("#settings-button").css({"background-color": "#2ECC71"});
	$("body").append("<div id='chat-settings' class='chat-settings' style='right:5px;top:"+(event.clientY-170)+"px;' />");
	$("#chat-settings").append("<span style='font-size:15px; font-weight:bold;'><i class='fa fa-cogs'></i> Chat Settings <a href='#' style='float:right;' onclick='Chat.ToggleChatSettings();'>X</a></span><hr style='clear:both' />");
	$("#chat-settings").append("<span style='width:auto; font-weight:bold;'>Chat Triggers: <input type='text' id='chat-triggers' placeholder='raffle; free items; streaming' title='Words or phrases that will trigger the chat sound, separate with SEMICOLONS!' style='padding:1px;font-size:15px;line-height:15px;width:98%' /><br />Separate each trigger with <i>;</i> !</span><br />");
	if (localStorage.beepTriggers != null && localStorage.beepTriggers.length > 0) 
		$("#chat-triggers").val(localStorage.beepTriggers);
	$("#chat-settings").append("<span style='width:auto; font-weight:bold;'>Message Limit: <input type='number' id='message-limit' placeholder='100' title='How many messages should be displayed before the oldest is removed' style='padding:1px;font-size:15px;line-height:15px' /></span><br/>");
	if (localStorage.messageLimit != null && localStorage.messageLimit.length > 0) 
		$("#message-limit").val(localStorage.messageLimit);
	$("#chat-settings").append("<input id='disabled-welcome' type='checkbox'><label for='disabled-welcome'> Always join #home automatically.</label>");
	if (localStorage.autojoin == "true" || localStorage.autojoin == null) $("#disabled-welcome").prop("checked", true);
	if (Chat.GroupID >= 80){
	$("#chat-settings").append("<br /><input id='modbar-show' type='checkbox'><label for='modbar-show'> Enable ugly bar.</label>");
		if (localStorage.uglymodbar == "true" || localStorage.uglymodbar == null) $("#modbar-show").prop("checked", true);
	}
	$("#chat-settings").append("<hr />");
	$("#chat-settings").append("<a href='#' onclick='Chat.UpdateChatSettings()'>Save And Apply</a>");
	$("#chat-settings").show("fast");
	return false;
},
Chat.UpdateChatSettings = function(){
	var triggers = $("#chat-triggers").val().split(";");
	for(p=0;p<triggers.length;p++) 
		triggers[p] = $.trim(triggers[p]);
	localStorage.beepTriggers = triggers.join(";");
	$("#chat-triggers").val($.trim(localStorage.beepTriggers));
	localStorage.messageLimit = $.trim($("#message-limit").val());
	if (!$("#disabled-welcome").is(":checked")) 
		localStorage.autojoin = false; else localStorage.autojoin = true;
	if (Chat.GroupID >= 80 && !$("#modbar-show").is(":checked")){
		localStorage.uglymodbar = false;
		$("a[href='javascript:toggleStaffChat();']").hide("fast");
		$(".chat-history").attr("style", "padding-top:62px!important");
	}else{
		localStorage.uglymodbar = true;
		$("a[href='javascript:toggleStaffChat();']").css("display", "block").show("fast");
		$(".chat-history").removeAttr("style");
	}
	Chat.Toast("Chat settings have been saved!","alert-success");
	Chat.ToggleChatSettings();
	limit = localStorage.messageLimit;
	if (chatHistoryDiv.children().length > limit){
			chatHistoryDiv.children().slice(limit-chatHistoryDiv.children().length).remove();
	}
	sdtfp.reinit();
};

/*Events*/
$('#sdtfp-btn-DEBUG').on('click',function(){
	location.reload();
});
$('#sdtfp-btn-toggleChatLines').on('click',function(){
	sdtfp.toggleChatLines();
});
$('#sdtfp-btn-toggleAppendId').on('click',function(){
	sdtfp.toggleAppendId();
});

$("#message-limit").on('keyup',function(){
	if($("#message-limit").val()<1){
		$("#message-limit").val('1');
		sdtfp.say('Message Limit has a min value of 1');
	}
});

/*Code to Run*/
sdtfp.init();