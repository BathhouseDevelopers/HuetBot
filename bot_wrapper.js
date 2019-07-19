require("./bot_telegram")
			
ai = require("./bot_ai")


function invokeWithDelay(f, isDelay){	
	try{					
		if (isDelay){
			setTimeout(f, global.PARAMS.responseTimeout*1000)
		}else{
			f()
		}									
	}catch(e){
		console.error(e)
	}
	
}

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
	},
	
	sendMessageToChat: function(chat_id, message, isDelay){
		var f = function(){bot.sendMessage(chat_id, message)}		
		invokeWithDelay(f, isDelay)
	},
	sendPhotoToChat: function(chat_id, url,  message, isDelay){
		var f = function(){bot.sendPhoto(chat_id, url, message)}		
		invokeWithDelay(f, isDelay)
	},
	sendMessageToChats: function(message, isDelay){
		var f = function(){
			for (var i = 0; i < chats.list.length; i++) {
				console.log(chats.list[i])
				bot.sendMessage(chats.list[i], message)	
			}
		}
		invokeWithDelay(f, isDelay)
	},	
	sendPhotoToChats: function(url, message, delay){
		var f = function(){
			for (var i = 0; i < chats.list.length; i++) {
				bot.sendPhoto(chats.list[i], url, message)	
			}
		}
		invokeWithDelay(f, isDelay)
	}

	
}