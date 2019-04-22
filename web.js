storage = require('./storage2')
var express = require('express');
var busboy = require('connect-busboy');
DAO = require('./DAO')

var app = express();
app.use(express.static('public'));
app.use(busboy());
//app.use(express.static(__dirname + '/Views'));

app.set('view engine', 'ejs');
app.use(express.json());



// ******************   Admin pages **************************/

app.get('/', function (req, res) {
	console.log('web request');	
	res.sendFile(__dirname +'/public/pages/index-public.html');	  
	});

app.get('/adm', function (req, res) {
	res.sendFile(__dirname +'/public/pages/index.html');	
	  
	});

app.get('/adm-cron', function (req, res) {
		DAO.cron.getCrons(function(doc){
			res.render('settings-cron', {crons: doc});					  
		});
	})
	
app.get('/adm-cron-edit/:id', function (req, res) {
		try{
			if (req.params.id=="new"){
				var doc= {_id:"new"}
				res.render('settings-cron-edit', {obj: doc});
			}else{
				console.log("id:")
				console.log(req.params.id)
				DAO.cron.getCron(req.params.id, function(doc){
					if (doc==null){
						doc= {_id:'new'}
					}
					res.render('settings-cron-edit', {obj: doc});			
				})	
			}
			
		}catch(e){
			console.error(e)
			res.sendStatus(500)

		}
		
	})
	
	


app.get('/adm-chats', function (req, res) {	  
	res.sendFile(__dirname +'/public/pages/chats.html');	
	  
	});

app.get('/adm-upload', function (req, res) {	  
	res.sendFile(__dirname +'/public/pages/upload.html');	
	  
	});
app.get('/adm-telki', function (req, res) {	  
	res.sendFile(__dirname +'/public/pages/upload-telki.html');	
	  
	});
app.get('/adm-mems', function (req, res) {	  
	res.sendFile(__dirname +'/public/pages/upload-mems.html');	
	  
	});
app.get('/adm-babos', function (req, res) {	  
	res.sendFile(__dirname +'/public/pages/upload-babos.html');	
	  
	});



app.post('/service/telki-upload', function (req, res) {
 
	var Grid = require('gridfs-stream');
	mongoose = require("mongoose");
	const url = "mongodb://test12:test12@ds163510.mlab.com:63510/heroku_9c9j7t6q"
	mongoose.connect(url, { useNewUrlParser: true });
	var connection = mongoose.connection
	Grid.mongo = mongoose.mongo 
	connection.once("open", function(){
		const gfs = Grid(mongoose.connection.db, mongoose.mongo);
	
	    var writestream = gfs.createWriteStream({
	        filename: 'filename1'
	    });
	    writestream.on('close', function (file) {
	      callback(null, file);
	    });

	    req.busboy.on('file', function (fieldname, file, filename) {
	    	
			file.on('data', function (data) {
				writestream.write(data)
				            
			});
	        
	        file.on('end', function () {        	
	            
	        });
	        
	    });

		req.pipe(req.busboy);	    		    

	})

	
	
	
	

	
			  
});

app.get('/service/telki-get', function (req, res) {
	//console.log(req)
	console.log(req.query.id)
		var Binary = require('mongodb').Binary	
        storage.getFileByID("telki", req.query.id, function(file){
        	
        	console.log('===')
        	console.log(file)
        	console.log('---')
        	console.log(file.file)
        	console.log('---')        	
        	console.log(file.file.buffer)
        	console.log('===')
        	
        		/*res.writeHead(200, { 
        			'Content-Type': 'image/jpeg', 
        			//'Content-Length': '"'+file.length+'"',//
        			'Content-Disposition': 'attachment; filename="image.jpeg"'
        				}
        		);
        		*/
        	
        		res.send(file.file.buffer);
        	
        	//	
        })
            
			
	  
});


app.get('/service/cron', function (req, res) {
		console.log('/service/cron requested');
		DAO.params.getCron(function(doc){
			res.send(doc);
		})
	});
app.get('/service/cron/:id', function (req, res) {
	console.log('/service/cron/'+req.params.id+' requested');
	DAO.params.getCronItem(req.params.id, function(doc){
				res.send(doc);
		})	
	});

app.post('/service/cron', function (req, res) {
	console.log('POST /service/cron/ invoked');
	console.log(req.body)
	try{
		DAO.cron.setCron(req.body.id, req.body.value , function(doc){
			console.log("POST save good")
			console.log("ok")
			res.sendStatus(200)
		})	
	}catch(e){
		console.error(e)
		res.sendStatus(500)
	}
	

});


	
var server = app.listen(process.env.PORT||8000, function () {
	  var host = server.address().address;
	  var port = server.address().port;

	  console.log('Web server started at http://%s:%s', host, port);
	});
