require('dotenv').config()
DAO = require('./DAO')

storage = require('./storage2')
dropbox = require('./dropbox')


chats = {filter: false,		 
		 group_dev1: '-248416559',
		 chat_sergey: '309739368',
		 group_bania: '-187427483'}
chats.list = [chats.group_dev1, chats.chat_sergey, chats.group_bania] //,chats.group_bania


PARAMS = {skipRandom:15, responseTimeout:3, skipBetweenMessages:3}

ai = require('./bot_ai');
bot = require("./bot_wrapper")

scheduler = require('./bot_ai_scheduler')

require('./web');


