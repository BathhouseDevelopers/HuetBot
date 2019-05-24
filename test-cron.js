require('dotenv').config()

chats = {filter: false,		 
	 group_dev1: '-377088509',
	 group_bania: '-187427483'}
chats.list = [chats.group_dev1] //,chats.group_bania


DAO = require('./DAO')
storage = require('./storage2')

scheduler = require('./bot_ai_scheduler')
scheduler.init()


//require('./web');

