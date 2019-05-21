
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
						
						var cron_cron = cron.cron
						var cron_text = getRandomFromArray(cron.text) 
						var cron_alias = cron.alias						 
						console.log("setting CRON: text-message "+ cron_alias+":"+cron_cron+":"+cron_text)	
						addJob(cron_cron, function(cc){
							console.log(cc)
							var msg = cron_text
							ai.sendMessageToChats(msg)								
						}, cron_alias)
					}
					/*** photo-message *********/
					if (cron.type=="photo-message"){
						var cron_cron   = cron.cron
						var cron_text   = getRandomFromArray(cron.text) 
						var cron_alias  = cron.alias						 
						var cron_folder = cron.folder
						console.log("setting CRON: photo-message "+ cron_alias+":"+cron_cron+":"+cron_text+":"+cron_folder)
						
						addJob(cron_cron, function(){
							dropbox.getNextFile(cron_folder, function(url){									
								ai.sendPhotoToChats(url, cron_text)	
								})		 					
						}, cron_alias)
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







/*

addJob('07 06 * * *', ai.itsMorning, "itsMorning")
addJob('25 06 * * *', ai.itsMorningGirl, "itsMorningGirl")
addJob('35 20 * * *', ai.itsEverningGirl, "itsEverningGirl")

addJob('11 07 * * 5', ai.itsFridayMorning, "itsFridayMorning")
addJob('10 14 * * 5', ai.itsFridayAfternoon, "itsFridayAfternoon")
addJob('03 17 * * 6', ai.itsSaturdayEvening, "itsSaturdayEvening")
addJob('05 19 * * 7', ai.itsSundayEvening, "itsSundayEvening")


addJob('05 11 * * *', ai.itsFootballTime, "itsFootballTime")
addJob('11 12 * * *', ai.itsLunchTime, "itsLunchTime")

*/

/*Quizz*/

/*
addJob('00 11 * * *', ai.itsQuizz, "itsQuizz")
*/

/*  ------ */

//addJob('51 19 * * *', ai.itsJustPhoto, "itsJustPhoto")

/*
addJob('36 18 * * 6', function(){
	ai.itsJustHappened("Привет, ребятки! Соскучились по мне?")
}, "on spot")


*/