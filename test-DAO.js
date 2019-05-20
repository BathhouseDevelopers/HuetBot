require('dotenv').config()

DAO = require('./DAO')


DAO.params.getCron("5c3b2e11fb6fc0600bdf20c6", function(doc){
	console.log(doc)
})

DAO.params.setCron("5c3b2e11fb6fc0600bdf20c6",{a:"2"}, function(doc){
	console.log(doc)
})



