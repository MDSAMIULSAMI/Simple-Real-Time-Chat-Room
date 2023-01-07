const io = require('socket.io')(3000, {
    cors: { origin: "*" }
});
console.log("Server Started at port: 3000")
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log("New User:", name, "Connected")
        users[socket.id] = name;

        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
        console.log("Name:", users[socket.id], "Message:", message)
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        console.log("User:", users[socket.id], "exited");
    });

});