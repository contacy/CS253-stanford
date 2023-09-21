const http=require('http')
let results=[]
let count=0
function printResults(){
        for(let i=0;i<3;i++){
                console.log(results[i])
        }
}
function httpGet(index){
        http.get(process.argv[2+index], (res)=>{
                let str=''
                //res.setEncoding()
                res.on('data',(chunk)=>{
                        str += chunk
                })
                res.on('end', ()=>{
                        count++
                        results[index]=str
                        if(count==3)
                                printResults()
                })
        })
}
for(let j=0;j<3;j++){
        httpGet(j)
}
