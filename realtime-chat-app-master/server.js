const io = require("socket.io")(8000)
const users = {}
io.on('connection',socket =>{
    socket.on('New-user-joined',name =>{
        console.log("New user",name)
        users[socket.id] = name
        socket.broadcast.emit('user-joined',name)
    })
    socket.on("send",message =>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
        console.log("socket.id",users[socket.id])
    })
    socket.on("disconnect",message =>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id]
    })
})






//url :- http://127.0.0.1:5500