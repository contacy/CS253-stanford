const fs = require('fs')
const path = require('path')
let type = '.'+ process.argv[3]
fs.readdir(process.argv[2], function callback(err,list){
	if(err){return console.log(err)}
	for(let i=0;i<list.length;i++){
		if(path.extname(list[i])===type){
			console.log(list[i])
		}
	}
})









