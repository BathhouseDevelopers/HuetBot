
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
	if (glbAI.girlLastDate == new Date().toLocaleDateString()&&(glbAI.girlCount>2)){
		bot.sendMessageToChat(chat_id, "Ну сколько вам еще тёлок? Не обдрочитесь? хватит на сегодня!!", true)
	}else{
		dropbox.getNextFile("girls", function(url){			
			bot.sendPhotoToChat(chat_id, url, "Ловите подружку", true)			
			if (glbAI.girlLastDate == new Date().toLocaleDateString()){
				glbAI.girlCount++ 
			}else{
				glbAI.girlLastDate = new Date().toLocaleDateString()
				glbAI.girlCount = 1
			}
			DAO.ai.putAI(glbAI)
			console.log(glbAI)
			
			}, function(){
				bot.sendMessageToChat(chat_id, "Сорян, " + from +", тёлочки кончились, попросите хозяина залить мне в копилку", true)
		})
	}
		
		
}

function sendMem(command, chat_id, from_username, from, text, message_date){
	if (glbAI.memLastDate == new Date().toLocaleDateString()&&(glbAI.memCount>2)){
		bot.sendMessageToChat(chat_id, "Мемы, мемы, сколько можно!! потерпите до завтра. Завтра приходите!", true)
	}else{
		dropbox.getNextFile("mems", function(url){			
			bot.sendPhotoToChat(chat_id, url, "8-))", true)	
			if (glbAI.memLastDate == new Date().toLocaleDateString()){
				glbAI.memCount++ 
			}else{
				glbAI.memLastDate = new Date().toLocaleDateString()
				glbAI.memCount = 1
			}
			DAO.ai.putAI(glbAI)
			console.log(glbAI)
			
		}, function(){
			bot.sendMessageToChat(chat_id, "Сорян, " + from +", мемасики закончились :(", true)
		})
	}
		
	
			
}
function sendFact(command, chat_id, from_username, from, text, message_date){
	if (glbAI.memLastDate == new Date().toLocaleDateString()&&(glbAI.memCount>2)){
		bot.sendMessageToChat(chat_id, "Угомонитесь с этими занимательными фактами, на завтра оставьте!", true)
	}else{
		dropbox.getNextFile("facts", function(url){			
			bot.sendPhotoToChat(chat_id, url, "Это интересно...", true)	
			if (glbAI.memLastDate == new Date().toLocaleDateString()){
				glbAI.memCount++ 
			}else{
				glbAI.memLastDate = new Date().toLocaleDateString()
				glbAI.memCount = 1
			}
			DAO.ai.putAI(glbAI)
			console.log(glbAI)
			
		}, function(){
			bot.sendMessageToChat(chat_id, "Сорян, " + from +", к сожалению интересных фактов не осталось :(", true)
		})
	}
	
	
}

function sendQuizz(command, chat_id, from_username, from, text, message_date){
	console.log(glbAI)
	if (glbAI.quizzLastDate == new Date().toLocaleDateString()&& glbAI.quizzCount>2){
		bot.sendMessageToChat(chat_id, "Брат, на сегодня загадок достаточно", true)
	}else{
		if (glbQuizz.active){
			bot.sendMessageToChat(chat_id, "@"+from_username+", подожди, еще не разгадали предыдущую", true)	
		}else{
			quizzMod2.quizzIt(function(){
				if (glbAI.quizzLastDate == new Date().toLocaleDateString()){
					glbAI.quizzCount++ 
				}else{
					glbAI.quizzLastDate = new Date().toLocaleDateString()
					glbAI.quizzCount = 1
				}
				DAO.ai.putAI(glbAI)
				console.log(glbAI)
				
			}, function(){
				bot.sendMessageToChat(chat_id, "Извините, на сегодня загадки закончились", true)
			})
		}	
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
	var from_ = "@"+from_username
	
	var kw1 = ["телку", "тёлку","телки", "тёлки", "телочку", "тёлочку", "тёлочек", "телочек", "девушку", "бабы", "бабу"]	
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
		bot.sendMessage(chat_id, from_+", хуинг");
		return true;
	}

	
	if (contains(command, ["пошути"])){
		bot.sendMessageToChat(chat_id, "я не шучу",true);
		return true;
	}
	
	if (contains(command, ["сука", "хуй", "пизда", "пидор", "гей", "пидр"])){
		bot.sendMessageToChat(chat_id, from_ + ", сам " + command ,false);
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