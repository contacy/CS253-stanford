let total=0
const limit=process.argv.length
for(let i=2;i<limit;i++){
	total+=Number(process.argv[i])
}
console.log(total)
