function send2chats(url, options) {
	for (var i = 0; i < chats.list.length; i++) {
		_bot.sendPhoto(chats.list[i], url, options);
	}
}

quizzMod = {
	quizzIt : function(quizz) {
		try{
			DAO.quizz.getNewQuizz(function(quizz){
				dropbox.getFileUrl2("quizz", quizz.questionPicture==null?("q"+quizz.id+"-q.jpg"):quizz.questionPicture, function(url) {
					var options = {
						caption : quizz.question,
						reply_markup : JSON.stringify({
							inline_keyboard : [ [ {
								text : 'Подсказка',
								callback_data : 'quizz#hint#' + quizz.id
							}, {
								text : 'Узнать ответ',
								callback_data : 'quizz#answer#' + quizz.id
							} ], ]
						})
					};

					send2chats(url, options)										
					DAO.quizz.setQuizzAsked(quizz.id)				
				})
		
			})
			
		}catch (e) {
			console.error("Error while quizzIt")
			console.error(e)
		}
		
		
	},
	callback : function(action, query) {
		try{
			
			// pressed "Пдосказка"
			if (action[1] == "hint") {
				_bot.answerCallbackQuery(query.id, 'Хер тебе, а не подсказка',true)
			}
			
			// pressed "Узнать ответ"
			if (action[1] == "answer") {					
				
				
				DAO.quizz.getQuizz(action[2], function(quizz){
					
					if (quizz.askAnswer!=null&&quizz.askAnswer.indexOf(query.message.chat.first_name+"_"+query.message.chat.last_name)>-1){
						_bot.sendMessage(query.message.chat.id, "@" + query.message.chat.first_name +", ты тупой? Я же сказал - попросить должны двое! Ты уже просил.");
					}else{
						DAO.quizz.incrementAskAnswer(action[2], query.message.chat.first_name+"_"+query.message.chat.last_name, function(quizz){				
							if (quizz.askAnswer.length<2){
								 
								_bot.sendMessage(query.message.chat.id, "@" + query.message.chat.first_name +" попросил ответ! Слабак! Или необразованный! Для того, чтобы увидеть ответ - попросить должны ДВОЕ! Кто такой же невежда?");
								_bot.answerCallbackQuery(query.id, 'Ответ опубликуется когда попросят двое!', false)						
							}else{
								_bot.sendMessage(query.message.chat.id, "Вторым невеждой оказался " + query.message.chat.first_name);								
								quizzMod.answer(query, quizz.id)
							}

						})						
					}
						
	
				})
								
				
				
			}
			
		}catch (e) {
			console.error("Error while quizz.callback")
			console.error(e)
		}
			
	},
	answer: function(query, id){
		console.log(query)
		try{
			DAO.quizz.getQuizz(id, function(quizz){
				if (quizz.answerPicture!=null){
					dropbox.getFileUrl2("quizz", quizz.answerPicture, function(url) {
						_bot.sendPhoto(query.message.chat.id, url, {caption: quizz.answer});
						
					})
						
				}else{
					_bot.sendMessage(query.message.chat.id, quizz.answer);
				}
				
				DAO.quizz.setQuizzAnswered(quizz.id)
		
			})
			
		}catch (e) {
			console.error("Error while quizzIt")
			console.error(e)
		}
	}
}
