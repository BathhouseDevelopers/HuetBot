require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
dbx = new Dropbox({fetch: false,  clientId: 'h2w806q9xmitayu', redirectUri:"https://ya.ru/" });
dbx.setAccessToken(process.env.DROPBOX_TOKEN)


function getFirstFilename(list){
	for (var i = 0; i < list.length; i++) {
		var file = list[i]
		var tag = file['.tag']
		if (tag=="file"){
			return file.name
		}
	}
	return null
}

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
	},


	getNextFile: function(folder, callback){
		console.log('dropbox.getNextFile('+folder+') invoked')
		dbx.filesListFolder({path:'/'+folder+'/'}).then(function(data){
			//console.log(data)
			
			var filename = getFirstFilename(data.entries)
			
			if (filename!=null){
				console.log("opp:"+filename)
				dbx.filesMoveV2({from_path: '/'+folder+'/'+filename, to_path: '/'+folder+'/done/'+filename}).then(function(data){
					
					dbx.filesGetTemporaryLink({path:'/'+folder+'/done/'+filename}).then(function(data){
						callback(data.link)
					}, function(err){
						if (err.error!=null &&err.error.error_summary=='path/not_found/...'){
							console.log("path not found")
						}else{
							console.error(err)	
						}
						
					})	
					
					//getFileUrl2(folder+'/done/', filename, callback)
					
				},function(err){
					console.error(err)
				})
					
				
			}
			else{
				console.error("no files")
			}
			
		}, function(err){
			console.error(err)
		})
		
		
		/*
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
		*/		
	}

	


}

