const fs=require('fs')
let number=undefined

fs.readFile(process.argv[2],'utf-8',function callback(error,str){
	if(error){
		return console.log(error)
	}
	console.log(str.split('\n').length-1)
})

