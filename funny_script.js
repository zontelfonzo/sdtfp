var fs_rooms = ['home','donator','nsfw','panties'];
var fs_msgs = ['Oh Yeah!','Look at it go!','Roll out the barrel','Feel it in your bones'];
setTimeout(function(){
	Chat.SwitchRoom(fs_rooms[0]);
	Chat.Socket.emit('chat',{'msg':fs_msgs[0]});
	setTimeout(function(){
		Chat.SwitchRoom(fs_rooms[1]);
		Chat.Socket.emit('chat',{'msg':fs_msgs[1]});
		setTimeout(function(){
			Chat.SwitchRoom(fs_rooms[2]);
			Chat.Socket.emit('chat',{'msg':fs_msgs[2]});
			setTimeout(function(){
				Chat.SwitchRoom(fs_rooms[3]);
				Chat.Socket.emit('chat',{'msg':fs_msgs[3]});
			},2000);
		},2000);
	},2000);
},2000);
/*http://pastebin.com/1uCJA9L7*/