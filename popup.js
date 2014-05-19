var snd_hahano = document.getElementById('tnt-hahano');
var snd_idu = document.getElementById('tnt-idu');
var snd_td = document.getElementById('tnt-td');

if(snd_hahano.paused){
	$('#btn-hahano').on('click',function(){
		$('#tar_pe').text('Ponys Disabled');
		$('#tar_pl').hide();
		snd_hahano.play();
		setTimeout(function(){$('#tar_pe').text('Ponys Enabled');},2000);
		setTimeout(function(){$('#tar_pl').show();},2750);
	});
}
if(snd_idu.paused){
	$('#btn-idu').on('click',function(){
		snd_idu.play();
	});
}if(snd_td.paused){
	$('#btn-td').on('click',function(){
		snd_td.play();
	});
}