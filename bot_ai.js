
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


var commands = {}

function contains(word, array){	
	for (var i = 0; i < array.length; i++) {
		var kw = array[i]
		if (word.indexOf(kw)>-1){
			return true;
		}
	}
	return false			
}

function sendGirl(command, chat_id, from_username, from, text, message_date){
	dropbox.getNextFile("girls", function(url){			
		bot.sendPhotoToChat(chat_id, url, "Ловите подружку", true)	
		}, function(){
			bot.sendMessageToChat(chat_id, "Сорян, " + from +", тёлочки кончились, попросите хозяина залить мне в копилку", true)
		})	
}

function sendMem(command, chat_id, from_username, from, text, message_date){
	dropbox.getNextFile("mems", function(url){			
		bot.sendPhotoToChat(chat_id, url, "8-))", true)	
		}, function(){
			bot.sendMessageToChat(chat_id, "Сорян, " + from +", Мемасы закончились :(", true)
		})	
	
}
function sendFact(command, chat_id, from_username, from, text, message_date){
	dropbox.getNextFile("facts", function(url){			
		bot.sendPhotoToChat(chat_id, url, "Ловите подружку", true)	
		}, function(){
			bot.sendMessageToChat(chat_id, "Сорян, " + from +", Факты к сожалению кончились =((", true)
		})	
}

function sendQuizz(command, chat_id, from_username, from, text, message_date){	
	if (glbQuizz.active){
		bot.sendMessageToChat(chat_id, "@"+from_username+", подожди, еще не разгадали предыдущую", true)	
	}else{
		quizzMod2.quizzIt(function(){}, function(){
			bot.sendMessageToChat(chat_id, "Извините, на сегодня загадки закончились", true)
		})
	}
}

function sendQuizzAnswer(command, chat_id, from_username, from, text, message_date){
	if (glbQuizz.active){
		quizzMod2.sayAnswer(chat_id, from_username)	
	}else{
		bot.sendMessageToChat(chat_id, "@"+from_username+", какой тебе еще ответ? Проснись, все уже разгадали!", true)		
	}	
}


function runCommand(command, chat_id, from_username, from, text, message_date){
	
	var kw1 = ["телку", "тёлку","телки", "тёлки", "телочку", "тёлочку", "тёлочек", "телочек", "девушку"]	
	if (contains(command, kw1)){
		console.log("the Телки")
		sendGirl(command, chat_id, from_username, from, text, message_date)		
		return true;
	}
	
	var kw2 = ["мемчик", "мемас","мемасик", "мем", "мемасики"]	
	if (contains(command, kw2)){
		console.log("the Мемасы")
		sendMem(command, chat_id, from_username, from, text, message_date)
		return true;
	}
	
	var kw3 = ["загадка", "quizz", "загадку", "загадки", "загадай"]	
	if (contains(command, kw3)){
		console.log("the quizz")
		sendQuizz(command, chat_id, from_username, from, text, message_date)
		return true;
	}

	var kw4 = ["факты", "факт", "интересно"]	
	if (contains(command, kw4)){
		console.log("the Fact")
		sendFact(command, chat_id, from_username, from, text, message_date)
		return true;
	}

	var kw5 = ["ответ"]	
	if (contains(command, kw5)){
		console.log("user " + from+" asked for an answer")
		sendQuizzAnswer(command, chat_id, from_username, from, text, message_date)		
		return true;
	}

	var kw6 = ["ping", "пинг"]	
	if (contains(command, kw6)){
		bot.sendMessage(chat_id, "@"+from_username+", хуинг");
		return true;
	}

	
	if (contains(command, ["пошути"])){
		bot.sendMessageToChat(chat_id, "я не шучу",true);
		return true;
	}
	
	
	// ---------------------------------------
	console.log("Unknown command: " + command)
	//bot.sendMessageToChat(chat_id, ((from_username!=null&&from_username!="")?("@"+from_username):"Брат")+", я не понял, что ты от меня хочешь", true)	
	
}


module.exports={
	lastMessageDateTime: new Date(),			
	
	onMessage: function(chat_id, from_username, from, text, message_date){
		
		// Temporary, if text null||undefined
		if (text==null||text==undefined||text==""){
			console.log("--EMPTY MESSAGE : chatId:"+ chat_id+", from: "+ from + "(@"+from_username+")")
			return
		}
		
		try{
			console.log("--MSG: chatId:"+ chat_id+", from: "+ from + "(@"+from_username+")" +", text: " + text)
				
			var fullCommand = text.toLowerCase().trim()
			
			// var fullCommand = lowcase, trim				
			if (fullCommand.indexOf("бот,")>-1){
				var command = fullCommand.substring(fullCommand.indexOf("бот,") + 4)
				command = command.trim()
				
				if (command!=""){
					if (runCommand(command, chat_id, from_username, from, text, message_date)){
						return
					}					
				}
				
			}
									
			var b = quizzMod2.onAnswer(chat_id, from_username, from, fullCommand, message_date)
			if (b){
				return
			}
									
			this.huificateMessage(chat_id, from_username, from, text, message_date)
							
		}catch (e) {
			console.error(e)
		}
		
		
	},

	huificateMessage: function(chat_id, from_username, from, text, message_date){
		if ((new Date().getTime()- this.lastMessageDateTime.getTime()) >global.PARAMS.skipBetweenMessages*1000){
			this.lastMessageDateTime = new Date()
			msgCounter++;
			if (msgCounter>msgSkip){
				msgSkip = getRandomInt(global.PARAMS.skipRandom)
				msgCounter = 0;	    
			    var message = hue.encode1(text)		   
			    bot.sendMessageToChat(chat_id, message, true);			    			    
			}			
		}else{
			console.error("seems too many messages  at once, so missing it:  " + this.lastMessageDateTime + "->" + new Date())
		}
	}
	
	
}