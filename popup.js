	var SDTFP_APID = {};
	var runDMC = function(){
		for(i=0;i<SDTFP_APID.bots.length;i++){
			var rvar = "<tr class='daRow'><td class=\"bot_type\">&nbsp;&nbsp;"+SDTFP_APID.bots[i].name;
			var rvar = rvar+"</td><td class=\"bot_stat\">&nbsp;&nbsp;"+SDTFP_APID.bots[i].state;
			var rvar = rvar+"</tr>";
			$("#tb").append(rvar);
		}
	};
	var errHide = function(tvar){
		if(tvar===undefined){
			tvar = 3000;
		}
		setTimeout(function(){$(".msg").slideUp(100);},tvar);
	};
	var showErr = function(svar,level){
		if(svar===undefined){
			svar = "Major Error";
		}
		if(level===undefined){
			level = 0;
		}
		switch(level){
			case 1:
				var t_bc = "#FFC300";
				var t_c = "#000";
				var e_c = "#e33a3a";
				var e_tc = "#000";
				break;
			case 2:
				var t_bc = "#F00";
				var t_c = "#FFF";
				var e_c = "#e33a3a";
				var e_tc = "#FFF";
				break;
			default:
				var t_bc = "#A0C5E8";
				var t_c = "#496E91";
				var e_c = "#3ae33a";
				var e_tc = "#000";
				break;
		}
		$(".title").css("background-color",t_bc);
		$(".title").css("color",t_c);
		$(".msg").css("background-color",e_c);
		$(".msg").css("color",e_tc);
		$(".msg").slideDown(100);
		$(".msg").text(svar);
	};
	var call = function(){ 
		$.ajax({
			url:"https://scratch.web1337.net/jsonp/?urMum=bot_stats",
			dataType:"jsonp",
			type:"GET",
			success:function(data,textStatus,jqXHR){
				if(textStatus=="success"){
					SDTFP_APID = data;
					runDMC();
				}else{
					showErr("Api Error :/",1);
					errHide();
				}
				//d= JSON.parse(data);
			}
		});
	};
	call();
	