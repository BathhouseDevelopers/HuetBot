
var schedule = require('node-schedule');
 
/*
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

addJob('40 13 * * *', ai.itsEverningGirl, "itsEverningGirl")

/*
addJob('20 19 * * 6', ai.itsSundayEvening, "itsSundayEvening")
addJob('36 19 * * 6', ai.itsSundayEvening, "itsSundayEvening")
addJob('40 19 * * *', ai.itsEverningGirl, "itsEverningGirl")
*/

/* =================PRODUCTION===============*/

addJob('07 06 * * *', ai.itsMorning, "itsMorning")
addJob('25 06 * * *', ai.itsMorningGirl, "itsMorningGirl")
addJob('35 20 * * *', ai.itsEverningGirl, "itsEverningGirl")

addJob('11 07 * * 5', ai.itsFridayMorning, "itsFridayMorning")
addJob('10 14 * * 5', ai.itsFridayAfternoon, "itsFridayAfternoon")
addJob('03 17 * * 6', ai.itsSaturdayEvening, "itsSaturdayEvening")
addJob('05 19 * * 7', ai.itsSundayEvening, "itsSundayEvening")


addJob('05 11 * * *', ai.itsFootballTime, "itsFootballTime")
addJob('11 12 * * *', ai.itsLunchTime, "itsLunchTime")


/*Quizz*/
addJob('00 11 * * *', ai.itsQuizz, "itsQuizz")

/*  ------ */

//addJob('51 19 * * *', ai.itsJustPhoto, "itsJustPhoto")

/*
addJob('36 18 * * 6', function(){
	ai.itsJustHappened("Привет, ребятки! Соскучились по мне?")
}, "on spot")


*/