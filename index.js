require('dotenv').config()
PARAMS = {skipRandom:15, responseTimeout:3, skipBetweenMessages:3,}

chats = {filter: false,		 
		 group_prod_Huet_test: '-377088509',
		 group_test_BotHuetBot_dev1: '-248416559',
		 group_prod_Banya: '-187427483'}

chats.list = [chats.group_prod_Huet_test, chats.group_test_BotHuetBot_dev1, chats.group_prod_Banya]

storage = require('./storage2')
DAO = require('./DAO')
dropbox = require('./dropbox')

context = require('./context')
context.init(function(){
	
	quizzMod2 = require('./quizz_mod2')
	ai = require('./bot_ai');
	bot = require("./bot_wrapper")

	scheduler = require('./bot_ai_scheduler')
	scheduler.init(function(){
		
		require('./web');	
	})

	
})


