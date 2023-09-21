const fs = require('fs')
let buf=fs.readFileSync(process.argv[2])
const str=buf.toString()
let arr = str.split('\n')
console.log(arr.length-1)


