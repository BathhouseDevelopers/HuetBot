
const qtFileName = 'quizz.txt'
const qFileName  = 'q.jpg'
const aFileName  = 'a.jpeg'

function  getRandomIntInterval(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function  getRandomInt(max) {
	  return getRandomIntInterval(1, max)
}
function  getRandomFromArray(array) {
	  return array[getRandomInt(array.length)-1]
}


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

module.exports = {
	quizzIt : function() {
		try{

				if (glbQuizz.active){
					throw new Error("There is active quizz2");
				}else{
					
					dropbox.getNextFolder("quizz", function(folder){
						console.log(folder)
						if (folder!=null){
							dbx.filesMoveV2({from_path: '/quizz/'+folder.name+'', to_path: '/quizz/done/'+folder.name}).then(function(data){
								
								glbQuizz.active = true
								glbQuizz.name = folder.name
								glbQuizz.files = folder.files
								glbQuizz.hasQText = glbQuizz.files.indexOf(qtFileName)>-1
								glbQuizz.hasQPic =  glbQuizz.files.indexOf(qFileName) >-1
								glbQuizz.hasAPic =  glbQuizz.files.indexOf(aFileName) >-1
								
								DAO.quizz2.putQuizz2(glbQuizz, function(){
									
										
										
									if (glbQuizz.hasQText){
										var filename = '/quizz/done/'+glbQuizz.name+"/"+qtFileName																			
										
										dbx.filesDownload({path:filename}).then(function(response){
											 var blob = response.fileBinary;																						
								             var qfile = blob.toString()
								             
								             var prop = require("node-properties-parser");

								             var s = prop.parse(qfile)
								             glbQuizz.question = s.q
								             glbQuizz.answer= s.a
								             glbQuizz.words = s.k.split(',')
 								             for (var i = 0; i < glbQuizz.words.length; i++) {
 								            	glbQuizz.words[i] = glbQuizz.words[i].trim()
										 	 }
								             
								             
								             DAO.quizz2.putQuizz2(glbQuizz, function(data){
								            	 
								            	 console.log("saved last quizz2 object")
								            	 
								            	 if (glbQuizz.hasQPic){																				
														dbx.filesGetTemporaryLink({path:'/quizz/done/'+glbQuizz.name+"/"+qFileName}).then(function(data){
															
															var options = {
																	caption : glbQuizz.question,
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
															caption : glbQuizz.question,
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

														sendtext2chats(glbQuizz.question, options)	
														
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
			
	},
	sayAnswer:  function(chat_id, from, text, message_date){
		
		if (glbQuizz.hasAPic){																				
			dbx.filesGetTemporaryLink({path:'/quizz/done/'+glbQuizz.name+"/"+aFileName}).then(function(data){
				
				bot.sendPhoto(chat_id, data.link, glbQuizz.answer)
				
				glbQuizz.active=false
				DAO.quizz2.putQuizz2(glbQuizz)

				
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
			bot.sendMessage(chat_id, glbQuizz.answer)			
			
			glbQuizz.active=false
			DAO.quizz2.putQuizz2(glbQuizz)
		}
		
	},
	onAnswer: function(chat_id, from, text, message_date){
		var tt = text.toLowerCase()
		var ww = glbQuizz.words
		
		for (var i = 0; i < ww.length; i++) {
			var w = ww[i].trim()
			if (tt.indexOf(w)>-1){
				console.log(from +" guessed")
				bot.sendMessage(chat_id, from + ", " + getRandomFromArray(["ты умничка!", "красавелла!", "бинго!", " - молодец"]))				
				
				setTimeout(function () {
					quizzMod2.sayAnswer(chat_id)	
					    }, global.PARAMS.responseTimeout*1000) 
				
				
				return true;
			}	
		}
		return false;
	}
}
