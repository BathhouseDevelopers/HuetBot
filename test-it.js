require('dotenv').config()

var m = 'Доброе утречко!\nМолодые люди, как настроение?\n'.split('\n')

var s= new Array()


for (var i = 0; i < m.length; i++) {
	if(m[i]!=''){
		s.push(m[i])		
	} 	
} 

console.log(s)

db = require("./dropbox")


db.getNextFile("girls", function(obj){
	console.log(obj)
	
})




