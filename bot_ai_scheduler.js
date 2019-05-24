
var schedule = require('node-schedule');
 
/*
 
 -3 hours
 
 
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/


function  getRandomIntInterval(min, max) {
	return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function  getRandomInt(max) {
	  return getRandomIntInterval(1, max)
}

function  getRandomFromArray(array) {
	  return array[getRandomInt(array.length)-1]
}



module.exports = {
		init: function(){
			DAO.cron.getCrons(function(crons){
				
				for (var i = 0; i < crons.length; i++) {
					var cron = crons[i]				
						
					
					/*** text-message *********/
					if (cron.type=="text-message"){	
					  						 
						console.log("setting CRON: "+cron.type+": "+ cron.alias+":"+cron.cron+":"+cron.text)	
						addJob(cron.cron, function(id){
							
							try{
								console.log("executing CRON " + id)
								DAO.cron.getCron(id, function(cron){								  
									ai.sendMessageToChats(getRandomFromArray(cron.text))																															
								})															
							}catch(e){
								console.error("error invocating cron job " + id)
								console.error(e)
							}
							
						}.bind(null, cron._id), cron.alias)
					}
					/*** photo-message *********/
					if (cron.type=="photo-message"){
						
						console.log("setting CRON: "+cron.type+": "+ cron.alias+":"+cron.cron+":"+cron.text)	
						addJob(cron.cron, function(id){
							try{							
								console.log("executing CRON " + id)
								DAO.cron.getCron(id, function(cron){								  
									dropbox.getNextFile(cron.folder, function(url){									
										ai.sendPhotoToChats(url, getRandomFromArray(cron.text))	
										})		 																																				
								})							
							
							}catch(e){
								console.error("error invocating cron job " + id)
								console.error(e)
							}

							
						}.bind(null, cron._id), cron.alias)
					}					
					
				}
			})
		},
		reset: function(){
			for (var i = 0; i < schedule.scheduledJobs.length; i++) {
				schedule.scheduledJobs[i].cancel()
			}
		}
}




function addJob(cron, func, desc){
	var j = schedule.scheduleJob(cron, function(){
		try{
			func();
		}catch (e) {
			console.error("Error invocation of job "+cron+ "-" +desc)
			console.error(e)
		}
	   
	});	
		
	
}



