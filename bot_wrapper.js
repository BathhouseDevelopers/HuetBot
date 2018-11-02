
var			debug_mode = true
			debug_mode = false

			 


if (debug_mode){
	require("./bot_stub")
}else{
	require("./bot_telegram")
}
			
ai = require("./bot_ai")


module.exports = { 
	bot: _bot,

	sendMessage: function(chat_id, message){
		//if (chat_id=="-213919094")
			this.bot.sendMessage(chat_id, message, {});
	},
	sendPhoto: function(chat_id, url, message){
		//if (chat_id=="-213919094")
		console.log(url)
			this.bot.sendPhoto(chat_id, url, {caption:message});
	}
	
}