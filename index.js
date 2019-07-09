require('dotenv').config()
DAO = require('./DAO')

storage = require('./storage2')
dropbox = require('./dropbox')


chats = {filter: false,		 
		 group_prod_Huet_test: '-377088509',
		 group_test_BotHuetBot_dev1: '-248416559',
		 group_prod_Banya: '-187427483'}

chats.list = [chats.group_prod_Huet_test, chats.group_test_BotHuetBot_dev1, chats.group_prod_Banya]


PARAMS = {skipRandom:15, responseTimeout:3, skipBetweenMessages:3}

ai = require('./bot_ai');
bot = require("./bot_wrapper")

scheduler = require('./bot_ai_scheduler')
scheduler.init()

quizz = null

DAO.quizz2.getQuizz2(function(data){
	quizz = data
})

require('./web');


