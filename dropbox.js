require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
dbx = new Dropbox({ clientId: 'h2w806q9xmitayu', redirectUri:"https://ya.ru/" });
dbx.setAccessToken(process.env.DROPBOX_TOKEN)

module.exports = {
	
	
	getFileUrl: function(folder, id, callback){
		console.log("getting " +id+" file from dropbox from folder " + folder)
		dbx.filesGetTemporaryLink({path:'/'+folder+'/'+id+'.jpg'}).then(function(data){
			callback(data.link, id)
		}, function(err){
			if (err.error!=null &&err.error.error_summary=='path/not_found/...'){
				console.log("path not found")
			}else{
				console.error(err)	
			}
			
		})		
	},
	
	getFileUrl2: function(folder, filename, callback){
		console.log("getting " +filename+" file from dropbox from folder " + folder)
		dbx.filesGetTemporaryLink({path:'/'+folder+'/'+filename}).then(function(data){
			callback(data.link)
		}, function(err){
			if (err.error!=null &&err.error.error_summary=='path/not_found/...'){
				console.log("path not found")
			}else{
				console.error(err)	
			}
			
		})		
	}



}

