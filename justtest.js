var fullCommand = "sdsd бот, жопа а а а а"

if (fullCommand.indexOf("бот,")>-1){
	var command = fullCommand.substring(fullCommand.indexOf("бот,") + 4)
	command = command.trim()
	console.log("'"+command+"'")
}