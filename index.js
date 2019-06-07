require('dotenv').config()
DAO = require('./DAO')

storage = require('./storage2')
dropbox = require('./dropbox')


chats = {filter: false,		 
		 group_prod_Huet-test: '-377088509',
		 group_test_BotHuetBot-dev1: '-248416559',
		 group_banya: '-187427483'}

chats.list = [chats.group_prod_Huet-test, chats.group_test_BotHuetBot-dev1, group_banya]


PARAMS = {skipRandom:15, responseTimeout:3, skipBetweenMessages:3}

ai = require('./bot_ai');
bot = require("./bot_wrapper")

scheduler = require('./bot_ai_scheduler')
scheduler.init()

require('./web');


