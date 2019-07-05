require('dotenv').config()

storage = require('./storage2')
dropbox = require('./dropbox')
DAO = require('./DAO')


scheduler = require('./bot_ai_scheduler')
scheduler.init()

require('./web')





