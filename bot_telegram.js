var TelegramBot = require('node-telegram-bot-api');
var token = '474573752:AAF68n5lOjfe7JqXBs1Lx2ZvrZoCbSq9p-0';
_bot = new TelegramBot(token, {polling: true});
 
_bot.on('polling_error', (error) => {
	  console.log('telegram_bot -> poolingError' + error.code);  // => 'EFATAL'
	  console.error(error);  // => 'EFATAL'	  
	  if(error.code=='ETELEGRAM' & error.statusCode!=502){		  
		  _bot.stopPolling()  
	  }
	  
	});

_bot.on('webhook_error', (error) => {
	  console.log('telegram_bot -> webhookError' + error.code);  // => 'EFATAL'
	});


_bot.on('message', function (msg) {
	console.log('telegram_bot: onMessage');
	ai.onMessage(msg.chat.id, msg.from.first_name, msg.text,msg, msg.date)

});
