module.exports = function makeModule(directName, fileExt, callback){
	const fs = require('fs')
	const path = require('path')
	fileExt='.'+fileExt
	fs.readdir(directName, function(err,list){
		if(err){
			return callback(err)
		}
		const filteredList = []
		const listLength=list.length
		for(let i=0;i<listLength;i++){
			if(path.extname(list[i])===fileExt){
				filteredList.push(list[i])
			}
		}
		return callback(null,filteredList)
		
	})
}
