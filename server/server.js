var express = require('express');
var path = require('path');
var app = express();
var questions = require('./questions');


app.use(express.static('./build'));
app.use('*', function(req,res) {
    res.sendFile(path.join(__dirname,'..','build','index.html'));
    // c:\reactKurs\reactLivePoll\server\..\build\index.html         
})

var server = app.listen(3000);
var io = require('socket.io').listen(server);

var connections = [];
var audienceArr = [];
var title = 'Unnamned presentation';
var speaker = {};


io.sockets.on('connection', function (socket) {

    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        socket.disconnect();
        console.log('WS connections: %s', connections.length);

        for (var i = 0;i<audienceArr.length;i++) {
            if (audienceArr[i].id === socket.id) {
                audienceArr.splice(i, 1);
                break;
            }
        }
        io.sockets.emit('audience', audienceArr);


    })
    .on('join', (payload) => {
        var member = {
            id:socket.id
            ,type: 'audience'
            ,name: payload.member.name
        };
        audienceArr.push(member);
        socket.emit('joined', member);

        io.sockets.emit('audience', audienceArr);
        console.log(payload.member.name);
    } )
    .on('start', (payload) => {
        speaker = payload.speaker;
        speaker.id = socket.id;
        speaker.type = 'speaker';

        title = payload.title;
        socket.emit('joined', speaker);

        io.sockets.emit('started', {title: title, speaker: speaker.name, audience: audienceArr});

    })
    connections.push(socket);

    socket.emit('welcome', {
        title: title
        ,speaker: speaker.name
        ,questions: questions
    });

    console.log('WS connections: %s', connections.length);
})


console.log('server is running on http://localhost:3000'); 