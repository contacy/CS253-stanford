const httpCore = require('http')
httpCore.get(process.argv[2],function(response){
	response.setEncoding('utf-8')
	response.on('data', function (data){
		console.log(data)
	})
	response.on('error', console.error)
}).on('error', console.error)





