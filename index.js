// Node server which will handle socket io connections
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

const users = {};

io.on('connection', Socket=>{
    Socket.on('new-user-joined', name=>{
        // console.log("New user", name)
        users[Socket.id]=name;
        Socket.broadcast.emit('user-joined', name); 
    });

    Socket.on('send' , message =>{
        Socket.broadcast.emit('receive', {message: message, name: users[Socket.id]});
    });

    Socket.on('disconnect' , message =>{
        Socket.broadcast.emit('left', users[Socket.id]);
        delete users[Socket.id];
    });
})