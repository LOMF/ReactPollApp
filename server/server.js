var express = require('express');
var app = express();

app.use(express.static('./build'));

var server = app.listen(3000);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('WS connected: %s', socket.id);
})


console.log('server is running on http://localhost:3000'); 