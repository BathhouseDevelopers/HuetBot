
schedule = require('node-schedule');
 
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
		//running: [],
		init: function(done){
			DAO.cron.getCrons(function(crons){
				
				for (var i = 0; i < crons.length; i++) {
					var cron = crons[i]				
						
					
					/*** text-message *********/
					if (cron.type=="text-message"){	
						
						console.log("setting CRON: type: "+cron.type+", alias: "+ cron.alias+", cron: "+cron.cron+", text: "+cron.text)
						var j = schedule.scheduleJob(cron.alias, cron.cron, function(id){
							
							try{
								console.log("executing CRON " + id)
								DAO.cron.getCron(id, function(cron){								  
									ai.sendMessageToChats(getRandomFromArray(cron.text))																															
								})															
							}catch(e){
								console.error("error invocating cron job " + id)
								console.error(e)
							}
							
						}.bind(null, cron._id))												
						
	
					}
					/*** photo-message *********/
					if (cron.type=="photo-message"){
						
						console.log("setting CRON: type: "+cron.type+", alias: "+ cron.alias+", cron: "+cron.cron+", text: "+cron.text)	
						var j =schedule.scheduleJob(cron.alias, cron.cron, function(id){
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

							
						}.bind(null, cron._id))
						
					}					
					
				}
				
				if (done)done()
			})
		},
		reset: function(done){
			console.log("cancelling jobs:")			
			var jobs = schedule.scheduledJobs;			
			for(jobName in jobs){
				schedule.cancelJob(jobName)
				
				// or use this:
				//var job = jobs[jobName]
				//job.cancel()
			}						
			if (done)done()
		},
		getScheduledJobs:function(done){
			console.log("getScheduledJobs:")
			var jobs = schedule.scheduledJobs;
			var list = new Array()
			for(jobName in jobs){
				var job = jobs[jobName]
				list.push({name:job.name})
			}					
			if (done)done(list)
		} 
}
