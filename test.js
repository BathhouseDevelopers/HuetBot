

require('dotenv').config()
DAO = require('./DAO')
dropbox = require('./dropbox')


PARAMS = {skipRandom:15, responseTimeout:3, skipBetweenMessages:3}

ai = require('./bot_ai');


scheduler = require('./bot_ai_scheduler')

chats = {filter: false,		 
		 group_dev1: '-248416559',
		 chat_sergey: '309739368',
		 group_bania: '-213919094'}
chats.list = [chats.group_dev1, chats.chat_sergey] //,group_bania


context = require('./context')
context.init(function(){
	
	
	quizzMod2 = require('./quizz_mod2')		
	bot = require("./bot_wrapper")
	
	_bot.getMe().then(function(){
		console.log("1")
		if (!glbQuizz.active) quizzMod2.quizzIt();
			
	})
	
})









