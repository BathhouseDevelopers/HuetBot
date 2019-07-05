storage = require('./storage2')
dropbox = require('./dropbox')
DAO = require('./DAO')



PARAMS = {skipRandom:15, responseTimeout:3, skipBetweenMessages:3}

scheduler = require('./bot_ai_scheduler')
scheduler.init()


//ai = require('./bot_ai');
//bot = require("./bot_wrapper")

//scheduler = require('./bot_ai_scheduler')

require('./web');


