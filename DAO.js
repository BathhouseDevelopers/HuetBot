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
			
		ai:{
			getAI: function(callback){
				storage.getObject('context',{type: 'ai'}, function(obj){
					if (obj!=null){
						callback(obj)	
					}else{
						throw new Error("ai  object not found");						
					}
				})
			},
			putAI: function(obj, callback){
				storage.updateObject('context', {type: 'ai'}, obj, function(res) {
					if (callback){
						callback(res)
					}
				})
				
			}
		},		
		quizz2:{
			getQuizz2: function(callback){
				storage.getObject('context',{type: 'quizz2'}, function(obj){
					if (obj!=null){
						callback(obj)	
					}else{
						throw new Error("Quizz2  object not found");						
					}
				})
			},
			putQuizz2: function(obj, callback){
				storage.updateObject('context', {type: 'quizz2'}, obj, function(res) {
					if (callback){
						callback(res)
					}
				})				
			}
		}
}