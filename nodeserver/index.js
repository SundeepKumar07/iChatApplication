// const io = require('socket.io')(8000);

// const users = {};

// io.on("connection", socket => {
//     // When a new user joins
//     socket.on('new-user-joined', name => {
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     // When a message is sent
//     socket.on('send', message => {
//         socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
//     });
// });

    

// server.js
const io = require('socket.io')(8000, {
    cors: {
        origin: 'http://127.0.0.1:5500', // Replace with the origin of your client
        methods: ['GET', 'POST']
    }
});

const users = {};

io.on('connection', socket => {
    console.log('A new user connected: ' + socket.id);

    // When a new user joins
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // When a message is sent
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
});
