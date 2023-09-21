const limit=process.argv.length
let total=0
for(let i=2;i<limit;i++){
        total+=Number(process.argv[i])
}
console.log(total)
