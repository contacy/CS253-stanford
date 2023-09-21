const net = require('net')
const server=net.createServer(function (socket){
        var now=new Date()

        let data=""+fillZero(now.getFullYear())+"-"+fillZero((now.getMonth()+1))+"-"+fillZero(now.getDate())+" "+fillZero(now.getHours())+":"+fillZero(now.getMinutes())+""
        socket.end(data+'\n')
})
server.listen(process.argv[2])

function fillZero(num){
        if(num<10){
                return '0'+num
        }
        else{
                return num
        }
}
