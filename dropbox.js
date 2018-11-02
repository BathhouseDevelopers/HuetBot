require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
dbx = new Dropbox({ clientId: 'h2w806q9xmitayu', redirectUri:"https://ya.ru/" });
dbx.setAccessToken('bkyIfXD7Z5YAAAAAAAANFOQu_Y8eqyulB8koAGQo2Or4WNrvSq5LyqSxnyXKrKl9')

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
	}
}

