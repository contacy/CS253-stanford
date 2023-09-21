const http = require('http')
const url = require('url')
const server=http.createServer(function(req,res){
        const urlData= url.parse(req.url)
        let data='', dateObj={}
        if(req.method!=='GET'&&urlData.search.split('?')[1].split('=')[0]!=='iso'){
                res.end('unknown method or query')
        }
        if(urlData.pathname==='/api/parsetime'){
                date=new Date(urlData.search.split('?')[1].split('=')[1])
                dateObj['hour'] = date.getHours();
                dateObj['minute'] = date.getMinutes();
                dateObj['second'] =date.getSeconds();
        }
        else if(urlData.pathname==='/api/unixtime'){
                date=new Date(urlData.search.split('?')[1].split('=')[1])
                dateObj['unixtime'] =date.getTime();
                }
        if(JSON.stringify(dateObj)!=='{}'){
                res.writeHead(200,{'Content-Type':'application/json'})
                res.end(JSON.stringify(dateObj))
        }
        else{
                res.writeHead(404)
                res.end();
        }
})
server.listen(Number(process.argv[2]))
