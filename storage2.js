const mongo = require('mongodb')		
const MongoClient = mongo.MongoClient;
ObjectID = require('mongodb').ObjectID
const assert = require('assert');			 
// Connection URL
const url = "mongodb://"+process.env.DATABASE_TOKEN+"@ds163510.mlab.com:63510/heroku_9c9j7t6q"
// Database Name
const dbName = 'heroku_9c9j7t6q';

const insertDocuments = function(db, collection_name, callback, obj) {
  // Get the documents collection
  const collection = db.collection(collection_name);
  // Insert some documents
  collection.insert( obj , function(err, result) {
	  callback(result);
  });
}

const findDocuments = function(db, callback, obj) {
	  // Get the documents collection
	  const collection = db.collection('settings');
	  // Find some documents
	  collection.find(obj).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs)
	    callback(docs);
	  });
	}

const findObject = function(db, collectionName, query, callback) {
	  // Get the documents collection
	  const collection = db.collection(collectionName);
	  // Find some documents
	  collection.findOne(query,function(err, doc) {
	    assert.equal(err, null);
	    callback(doc);
	  });
	}

module.exports={	
		
		updateObject: function(collectionName, query, values, callback){
			console.log("storage.updateObject:")
			console.log(query)
			MongoClient.connect(url, function(err, client) {
				  assert.equal(null, err);
				  console.log("Connected successfully to server");
				  var db = client.db(dbName);				 
				  var collection = db.collection(collectionName);
				  var newvalues ={ $set:  values}; 
				  collection.updateOne(query, newvalues, function(err, res){
					  callback(res)
				  })
			})			
		},		
		
		getObjects: function(collectionName, callback){
			console.log("storage.getObjects: from collection: "+collectionName)
			
			MongoClient.connect(url, function(err, client) {
			  assert.equal(null, err);
			  console.log("Connected successfully to server");
			  var db = client.db(dbName);				 
			  var collection = db.collection(collectionName);			  
			  collection.find().toArray(function(err, doc) {
				  	client.close();				  
				  	assert.equal(err, null);			    
				  	callback(doc);
			  });			  			  		
			});
			
		},
		
		getObjectByID: function(collectionName, _id, callback){
			console.log("storage.getObjectBu_Id:")
			console.log(_id)
			
			MongoClient.connect(url, function(err, client) {
			  assert.equal(null, err);
			  console.log("Connected successfully to server");
			  var db = client.db(dbName);				 
			  var collection = db.collection(collectionName);
			  collection.findOne({_id: ObjectID(_id)}, function(err, doc) {
				  	client.close();				  
				  	assert.equal(err, null);			    
				  	callback(doc);
			  });			  			  		
			});
			
		},

		newObject: function(collectionName, values, callback){
			console.log("storage.newObject:")
			MongoClient.connect(url, function(err, client) {
				  assert.equal(null, err);
				  console.log("Connected successfully to server");
				  var db = client.db(dbName);				 
				  var collection = db.collection(collectionName);				 
				  collection.save(values, function(err, res){
					  assert.equal(err, null);
					  callback(res)
				  })
			})			
		},		

		updateObjectByID: function(collectionName, _id, values, callback){
			console.log("storage.updateObject:")
			console.log(_id)
			MongoClient.connect(url, function(err, client) {
				  assert.equal(null, err);
				  console.log("Connected successfully to server");
				  var db = client.db(dbName);				 
				  var collection = db.collection(collectionName);
				  var newvalues ={ $set:  values}; 
				  console.log({_id: ObjectID(_id)})
				  collection.updateOne({_id: ObjectID(_id)}, newvalues, function(err, res){
					  assert.equal(err, null);
					  callback(res)
				  })
			})			
		},		
		
		getObject: function(collectionName, query, callback){
			console.log("storage.getObject:")
			console.log(query)
			
			MongoClient.connect(url, function(err, client) {
			  assert.equal(null, err);
			  console.log("Connected successfully to server");
			  var db = client.db(dbName);				 
			  var collection = db.collection(collectionName);
			  collection.findOne(query, function(err, doc) {
				  	client.close();				  
				  	assert.equal(err, null);			    
				  	callback(doc);
			  });			  			  		
			});
			
		},

		
		getValue: function(key, callback){
			 
			// Use connect method to connect to the server
			MongoClient.connect(url, function(err, client) {
			  assert.equal(null, err);
			  console.log("Connected successfully to server");
			 
			  const db = client.db(dbName);
			 
			  findDocuments(db, function(docs) {
			    client.close();
			    
				if (docs.length>0){
					callback(docs[docs.length-1].value);
				}else{
					callback(null);
				}

			  }, {key: key});
			});
			
		},
		setValue: function(key, value){
			// Use connect method to connect to the server
			MongoClient.connect(url, function(err, client) {
			  assert.equal(null, err);
			  console.log("Connected successfully to server");
			 
			  const db = client.db(dbName);
			 
			  insertDocuments(db, "settings", function() {
			    client.close();
			  }, {key : key, value: value});
			});
			
			
						
		},

		saveFile: function(key, value, callback){
			// Use connect method to connect to the server
			MongoClient.connect(url, function(err, client) {
			  assert.equal(null, err);
			  console.log("Connected successfully to server");
			 
			  const db = client.db(dbName);
			 
			  insertDocuments(db, "files", function() {
			    client.close();
			    callback()
			  }, {key : key, value: mongo.Binary(value)});
			  
			  
			});
			
			
						
		}

}
