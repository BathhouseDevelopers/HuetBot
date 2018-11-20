
require('dotenv').config()

console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
console.log(process.env.TELEGRAM_TOKEN)


DAO = require('./DAO')
dropbox = require('./dropbox')


PARAMS = {skipRandom:15, responseTimeout:3, skipBetweenMessages:3}

ai = require('./bot_ai');
bot = require("./bot_wrapper")

scheduler = require('./bot_ai_scheduler')

chats = {filter: false,		 
		 group_dev1: '-248416559',
		 chat_sergey: '309739368',
		 group_bania: '-213919094'}
chats.list = [chats.group_dev1, chats.chat_sergey] //,group_bania

_bot.getMe().then(function(){
	
	//ai.itsQuizz()
		
})





