var TelegramBot = require('node-telegram-bot-api');
_bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
 

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

_bot.on('callback_query', function onCallbackQuery(callbackQuery) {
	console.log('telegram_bot: callback_query: ');
	console.log(callbackQuery)
	  const action = callbackQuery.data;
	  
	  var mm = action.split('#')
	  if (mm[0]=='quizz'){
		  quizzMod.callback(mm, callbackQuery)
	  }
	});