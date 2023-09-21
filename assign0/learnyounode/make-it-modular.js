const mymodule = require('./mymodule.js')
mymodule(process.argv[2], process.argv[3], print_result)
function print_result(err, perf_list){
	if(err) { 
      		console.log(err)
		return err 
		}
	if(perf_list){
		for(let i=0; i< perf_list.length; i++){
			console.log(perf_list[i])
		}
	}
}
