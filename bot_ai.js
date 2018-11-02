
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


var hue = require('./huificator')

var 	msgCounter= 0
var 	msgSkip=getRandomInt(PARAMS.skipRandom)

greeting_morning= ["Доброе утро, девочки!", "Всем привет, как настроение?", "Привет, тёлочки в папочке кончились, футюбика больше нет, мемчиков никаких давно хоязин не подбрасывал - и не знаю, чем вас порадовать теперь :("]
greeting_friday= ["Пятница-развратница!", "Че, кто сегдня в кабак?", "А че, сегодня нет никакого футбика?", "Че, кто по бабам?"]
greeting_morning_girl= ["Для поддержания утреннего стояка!", "Утренние телочки!", "#Ябвдул", "Телочки-хуёлочки", "Вдуть или не вдуть? вот в чем вопрос!"]
greeting_everning_girl= ["Спокойной ночи, малыши!", "Приятных снов, дружок!", "Для придания вечернего настроения"]
	
module.exports={
	lastMessageDateTime: new Date(),
	sendMessageToChats: function(message){
		for (var i = 0; i < chats.length; i++) {
			bot.sendMessage(chats[i], message)	
		}

	},	
	sendPhotoToChats: function(url, message){
		for (var i = 0; i < chats.length; i++) {
			bot.sendPhoto(chats[i], url, message)	
		}

	},
	onMessage: function(chat_id, from, text, message_date){
		try{
			console.log("--MSG:"+ chat_id+": "+ from +": " + text)		
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
	
}