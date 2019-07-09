
const qtFileName = 'quizz.txt'
const qFileName  = 'q.jpg'
const aFileName  = 'a.jpeg'



	function sendtext2chats(text, options) {
	for (var i = 0; i < chats.list.length; i++) {
		_bot.sendMessage(chats.list[i], text, options);
	}
}
function send2chats(url, options) {
	for (var i = 0; i < chats.list.length; i++) {
		_bot.sendPhoto(chats.list[i], url, options);
	}
}

quizzMod2 = {
	quizzIt : function() {
		try{

			
			DAO.quizz2.getQuizz2(function(quizz){
				gQuizz = quizz
				if (gQuizz.active){
					throw new Error("There is active quizz2");
				}else{
					
					dropbox.getNextFolder("quizz", function(folder){
						console.log(folder)
						if (folder!=null){
							dbx.filesMoveV2({from_path: '/quizz/'+folder.name+'', to_path: '/quizz/done/'+folder.name}).then(function(data){
								gQuizz.active = true
								gQuizz.name = folder.name
								gQuizz.files = folder.files
								
								DAO.quizz2.putQuizz2(gQuizz, function(){
									
										
										
									if (folder.files.indexOf(qtFileName)>-1){
										var filename = '/quizz/done/'+quizz.name+"/"+qtFileName																			
										
										dbx.filesDownload({path:filename}).then(function(response){
											 var blob = response.fileBinary;																						
								             var qfile = blob.toString()
								             
								             var prop = require("node-properties-parser");

								             var s = prop.parse(qfile)
								             gQuizz.question = s.q
								             gQuizz.answer= s.a
								             gQuizz.words = s.k.split(',')
								            
								             DAO.quizz2.putQuizz2(gQuizz, function(data){
								            	 
								            	 console.log("saved last quizz2 object")
								            	 
								            	 if (gQuizz.files.indexOf(qFileName)>-1){																				
														dbx.filesGetTemporaryLink({path:'/quizz/done/'+gQuizz.name+"/"+qFileName}).then(function(data){
															
															var options = {
																	caption : gQuizz.question,
																	reply_markup : JSON.stringify({
																		inline_keyboard : [ [ {
																			text : 'Подсказка',
																			callback_data : 'quizz#hint#'
																		}, {
																			text : 'Узнать ответ',
																			callback_data : 'quizz#answer#'
																		} ], ]
																	})
																};

																send2chats(data.link, options)	
															
															
														}, function(err){
															if (err.error!=null &&err.error.error_summary=='path/not_found/...'){
																console.log("path not found")
																console.error(err)	
															}else{
																console.error(err)	
															}
															
														})	

														
													}else{
														console.log("do not have qImage file")
														
														var options = {
															caption : gQuizz.question,
															reply_markup : JSON.stringify({
																inline_keyboard : [ [ {
																	text : 'Подсказка',
																	callback_data : 'quizz#hint#'
																}, {
																	text : 'Узнать ответ',
																	callback_data : 'quizz#answer#'
																} ], ]
															})
														};

														sendtext2chats(gQuizz.question, options)	
														
													}
								             })
												
										})
											
									}
									
									
								})
								
								
								
								
								
							},function(err){
								console.log("cannot move to ")
								console.error(err)
							})
								
							
						}
						else{
							console.error("no files")
						}
					})
				}
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
				_bot.answerCallbackQuery(query.id, 'Сам думай!',true)
			}
			
			// pressed "Узнать ответ"
			if (action[1] == "answer") {									
				_bot.answerCallbackQuery(query.id, 'Может подумаешь еще?',true)							
			}
			
		}catch (e) {
			console.error("Error while quizz.callback")
			console.error(e)
		}
			
	}
}
