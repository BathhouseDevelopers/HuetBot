
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


chats = {filter: false,		 
		 group_dev1: '-248416559',
		 chat_sergey: '309739368',
		 group_bania: '-213919094'}
chats.list = [chats.group_dev1, chats.chat_sergey] //,group_bania

require('./quizz_mod')

var hue = require('./huificator')

var 	msgCounter= 0
var 	msgSkip=getRandomInt(PARAMS.skipRandom)

greeting_morning= ["Доброе утро, девочки!", "Всем привет, как настроение?", "Эй, че такие унылые?"]
greeting_friday= ["Пятница-развратница!", "Че, кто сегдня в кабак?", "А че, сегодня нет никакого футбика?", "Че, кто по бабам?"]
greeting_morning_girl= ["Для поддержания утреннего стояка!", "Утренние телочки!", "#Ябвдул", "Телочки-хуёлочки", "Вдуть или не вдуть? вот в чем вопрос!"]
greeting_everning_girl= ["Спокойной ночи, малыши!", "Приятных снов, дружок!", "Для придания вечернего настроения"]
	
module.exports={
	lastMessageDateTime: new Date(),
	
	sendMessageToChat: function(chat_id, message){
		bot.sendMessage(chat_id, message)
	},
	
	sendMessageToChats: function(message){
		for (var i = 0; i < chats.list.length; i++) {
			bot.sendMessage(chats.list[i], message)	
		}

	},	
	sendPhotoToChats: function(url, message){
		for (var i = 0; i < chats.list.length; i++) {
			bot.sendPhoto(chats.list[i], url, message)	
		}

	},

	
	onMessage: function(chat_id, from, text, message_date){
			try{
				console.log("--MSG:"+ chat_id+": "+ from +": " + text)
				
				
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
	
	itsMorning: function(){
		
		console.log("itsMorning")
		var msg = getRandomFromArray(greeting_morning)
		ai.sendMessageToChats(msg)				
	},
	itsFridayMorning: function(){
		console.log("itsFridayMorning")
		ai.sendMessageToChats("Продержаться несколько часов и начинаются выходные!")				
	
	},
	itsFridayAfternoon: function(){
		console.log("itsFridayMorning")
		var msg = getRandomFromArray(greeting_friday)
		ai.sendMessageToChats(msg)				
	},	
	itsSaturdayEvening: function(){
		console.log("itsSaturdayEvening")
		ai.sendMessageToChats("Суббота-вечер - лучшее время для приключений! Кто куда?")
	},
	itsJustHappened: function(message){
		console.log("itsJustHappened")
		ai.sendMessageToChats(message)
	},
	itsSundayEvening: function(){
		console.log("itsSundayEvening")
		ai.sendMessageToChats("Господа, не наебениваемся сегодня - завтра на завод!")
	},
		
	itsFootballTime: function(){
		console.log("itsFootballTime")	
		ai.getNextPhoto("football", function(url){ 
			ai.sendPhotoToChats(url, "Поговорим о футболе")
		})		
	},
	itsLunchTime: function(){
		console.log("itsLunchTime")		
		ai.getNextPhoto("lunch", function(url){ 
			ai.sendPhotoToChats(url, ":-)))")
		})
	},
	itsMorningGirl: function(){
		console.log("itsMorningGirl")		
		ai.getNextPhoto("girls", function(url){ 
			ai.sendPhotoToChats(url, getRandomFromArray(greeting_morning_girl))
		})		
	},
	itsEverningGirl: function(){
		console.log("itsEverningGirl")		
		ai.getNextPhoto("girls.night", function(url){ 
			ai.sendPhotoToChats(url, getRandomFromArray(greeting_everning_girl))
		})		
	},
	
	
	itsJustPhoto: function(){
		console.log("itsFootballTime")	
		ai.getNextPhoto("football", function(url){ 
			ai.sendPhotoToChats(url, "")
		})		
	},

	itsQuizz: function(){
		console.log("itsQuizz")
		quizzMod.quizzIt()
								
	},
	
	itsAnnounce: function(id, chatId){
		console.log("itsAnounce#"+id)
		DAO.announcement.getAnnouncement(id, function(obj){
			ai.sendMessageToChat(chatId, obj.text)			
		})
		
		
								
	}

	
}