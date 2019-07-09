
						             

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


require('./quizz_mod2')

gQuizz = null

DAO.quizz2.getQuizz2(function(quizz){
	gQuizz = quizz
})


bot = require("./bot_wrapper")
_bot.getMe().then(function(){


	quizzMod2.quizzIt();
		
})





