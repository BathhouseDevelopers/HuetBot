require('dotenv').config()
DAO = require('../DAO')


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


var crons = [
	
				{
				    "alias": "morning-message",
				    "type": "text-message",
				    "cron": "07 06 * * *",
				    "text": [ "Доброе утречко!", "Молодые люди, как настроение?" ]
				},
				
				{
				    "alias": "morning-message",
				    "type": "text-message",
				    "cron": "45 18 * * *",
				    "text": [
				        "Учебная тревога (Серега тестит новую фичу)",
				        "бля"
				    ]
				}
			]


	for (var i = 0; i < crons.length; i++) {
		var item = crons[i]
		DAO.cron.setCron(null, item, function(){
			
		})		
	}

