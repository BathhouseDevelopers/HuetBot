storage = require('./storage2')
mongodb = require('mongodb')

module.exports={

		cron:{
			getCrons: function(callback){
					storage.getObjects('crons', function(obj){
						callback(obj)											 					
					})
				},
			getCron: function(id, callback){
				storage.getObjectByID('crons', id, function(obj){
					callback(obj)
				})
			},
			setCron: function(id, obj, callback){
				if(id==null){
					storage.newObject('crons', obj, function(res) {
						callback(res)
					})					
					
				}else{
					storage.updateObjectByID('crons', id, obj, function(res) {
						callback(res)
					})					
				}
			},
			deleteCron: function(id, callback){
				if(id==null){
					console.log("ID===nul!!")
				}else{
					storage.deleteObjectByID('crons', id, function(res) {
						callback(res)
					})					
				}
			}

							
		},
		settings:{
			getValue: function(key, callback){
				storage.getObject('settings',{key: key}, function(obj){
					if (obj!=null){
						callback(obj.value)	
					}else{
						callback(null)						
					}					 					
				})
			},
			setValue: function(key, value){
				storage.updateObject('settings', {key: key}, {value : value}, function(res) {
					//console.log(res)
				})
			}
			
		},
		announcement:{
			getAnnouncement: function(id, callback){
				storage.getObject('announcements',{id: parseInt(id)}, function(obj){
					if (obj!=null){
						callback(obj)	
					}else{
						throw new Error("Announcement id="+id+"not found");						
					}					 					
				})
			}	
		},
	
		quizz:{
			getQuizz: function(id, callback){
				storage.getObject('quizz',{id: parseInt(id)}, function(quizz){
					if (quizz!=null){
						callback(quizz)	
					}else{
						throw new Error("Quizz id="+id+"not found");
						
					}
					 
					
				})
			},			
			getNewQuizz: function(callback){
				storage.getObject('quizz',{sentQuestion: null}, function(quizz){
					if (quizz!=null){
						callback(quizz)	
					}else{
						throw new Error("New unsent quizz not found");
						
					}
				})
			},
			setQuizzAsked: function(id){
				storage.updateObject('quizz', {id : parseInt(id)}, {sentQuestion : true}, function(res) {
					//console.log(res)
				})
			},
			setQuizzAnswered: function(id){
				storage.updateObject('quizz', {id : parseInt(id)}, {sentanswer : true}, function(res) {
					//console.log(res)
				})
			},

			incrementAskAnswer(id, name, callback){
				console.log("incrementAskAnswer")
				storage.getObject('quizz',{id: parseInt(id)}, function(quizz){
					console.log("incrementAskAnswer#getObject ")
					//console.log(quizz)
					if (quizz.askAnswer==null||quizz.askAnswer==NaN){
						quizz.askAnswer=[]
					}
					if (quizz.askAnswer.indexOf(name)<0){
						quizz.askAnswer.push(name)
					}
					
					storage.updateObject('quizz', {id : quizz.id}, {askAnswer : quizz.askAnswer}, function(res) {
						console.log("incrementAskAnswer#updateObject ")
						console.log(quizz)
						callback(quizz)
					})
					
				})
				
			}			
		}
}