var Datastore = require('nedb');
var db = new Datastore({filename : './storage/params'});
db.loadDatabase();

module.exports={
		getValue: function(key, callback){
			//var callback = callback
			db.find({key: key}, function(err, docs){
				if (docs.length>0){
					callback(docs[docs.length-1].value);
				}else{
					callback(null);
				}
					
			})			
		},
		setValue: function(key, value){
			db.find({key: key}, function(err, docs){				
				if (docs.length>0){
					db.update({key : key}, {key : key, value: value}, {multi:true})		
				}else{
					db.insert({key : key, value: value})
					}
				})
			
		}

}

/*
var i = module.exports.getValue("girl.photo.number", function(d){
	
})
console.log("1"+i)
i=i?i+1:1
module.exports.setValue("girl.photo.number", i)
*/