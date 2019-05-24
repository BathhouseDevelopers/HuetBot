
function  getRandomIntInterval(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function  getRandomInt(max) {
	  return getRandomIntInterval(1, max)
}
function  getRandomFromArray(array) {
	  return array[getRandomInt(array.length)-1]
}


/**
 * 
 */   
   
require('./quizz_mod')

var hue = require('./huificator')

var 	msgCounter= 0
var 	msgSkip=getRandomInt(PARAMS.skipRandom)
	
module.exports={
	lastMessageDateTime: new Date(),
	
	sendMessageToChat: function(chat_id, message){
		bot.sendMessage(chat_id, message)
	},
	
	sendMessageToChats: function(message){
		console.log("send message to chats")
		console.log(chats.list)
		for (var i = 0; i < chats.list.length; i++) {
			console.log(chats.list[i])
			bot.sendMessage(chats.list[i], message)	
		}

	},	
	sendPhotoToChats: function(url, message){
		for (var i = 0; i < chats.list.length; i++) {
			bot.sendPhoto(chats.list[i], url, message)	
		}

	},

	
	onMessage: function(chat_id, from, text, message_date){
		
		// Temporary, if text null||undefined
		if (text==null){
			return
		}
		
			try{
				console.log("--MSG:"+ chat_id+": "+ from +": " + text)

				// Check for commands				
				if (text!=undefined&&text!=null){
					if (text=="bot#quizz"){
						this.itsQuizz()
						return
					}	
					if (text=="bot#ping"){
						bot.sendMessage(chat_id, "хуинг");					
						return
					}
					    //bot#announce#msg_id#char_id , if chat_id is not passed, this chat_id will be used
					if (text.indexOf("bot#announce")>-1){					
						// if chatId 
						this.itsAnnounce(text.split("#")[2], (text.split("#").length>3?text.split("#")[3]:chat_id))					
						return
					}

					if (text=="bot#girl_everning"){
						this.itsEverningGirl()					
						return
					}

					if (text=="bot#girl_morning"){
						this.itsMorningGirl()					
						return
					}
					
				}

				
				
				
	/**			
				console.log(this.lastMessageDateTime + "->" + new Date())
				console.log(global.PARAMS.skipBetweenMessages*1000)
				console.log(this.lastMessageDateTime.getTime() + "->" + new Date().getTime())
				console.log(new Date().getTime() -this.lastMessageDateTime.getTime())
				console.log(new Date().getTime() -this.lastMessageDateTime.getTime())					
				console.log((new Date().getTime()- this.lastMessageDateTime.getTime()) >2*1000)
	*/		
				if ((new Date().getTime()- this.lastMessageDateTime.getTime()) >global.PARAMS.skipBetweenMessages*1000){
					this.lastMessageDateTime = new Date()
					msgCounter++;
					if (msgCounter>msgSkip){
						msgSkip = getRandomInt(global.PARAMS.skipRandom)
						msgCounter = 0;	    
					    var message = hue.encode1(text)		   
					    
					    setTimeout(function () {
					    	bot.sendMessage(chat_id, message);	
					    }, global.PARAMS.responseTimeout*1000) 
					    
					}			
				}else{
					console.error("seems too many messages  at once, so missing it:  " + this.lastMessageDateTime + "->" + new Date())
				}			
			}catch (e) {
				console.error(e)
			}
		
		
	},

	getNextPhoto: function(folder, callback){		
		storage.getValue(folder+".photo.number", function(i){
			i=i?i:0		
			dropbox.getFileUrl(folder, i+1, function(url, id){
				try{
					callback(url)
					storage.setValue(folder+".photo.number", id)
				}catch (e) {
					console.error(e)
				}
				
			})			
		})

	},
	
	getNextQuizz: function(callback){		
		storage.getObject("quizz.number", function(object){
			i=i?i:0		
			dropbox.getFileUrl2("quizz", "q"+(i+1)+"q.jpg", i+1, function(url, id){
				try{
					callback(url)
					storage.setValue("quizz.number", id)
				}catch (e) {
					console.error(e)
				}
				
			})			
		})

	},
	
	
	itsLunchTime: function(){
		console.log("itsLunchTime")		
		ai.getNextPhoto("lunch", function(url){ 
			ai.sendPhotoToChats(url, ":-)))")
		})
	},

	itsQuizz: function(){
		console.log("itsQuizz")
		quizzMod.quizzIt()
								
	},
	
	itsAnnounce: function(id, chatId){
		console.log("itsAnounce#"+id+"$"+chatId)
		DAO.announcement.getAnnouncement(id, function(obj){
			ai.sendMessageToChat(chatId, obj.text)			
		})
		
		
								
	}

	
}