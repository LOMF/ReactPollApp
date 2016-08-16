var express = require('express');
var app = express();

app.use(express.static('./build'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

var connections = [];

io.sockets.on('connection', function (socket) {

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log('WS connections: %s', connections.length);
    })
    connections.push(socket);
    console.log('WS connections: %s', connections.length);
})


console.log('server is running on http://localhost:3000'); 