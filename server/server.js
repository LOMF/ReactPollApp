var express = require('express');
var path = require('path');
var app = express();
var _ = require('underscore');

app.use(express.static('./build'));
app.get('*', function (req, res) {
    // and drop 'public' in the middle of here
    console.log(path.join(__dirname, '..', 'build', 'index.html'))
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
})
var server = app.listen(3000);
var io = require('socket.io').listen(server);


var connections = [];
var audience = [];
var speaker = {};
var title = ''
var questions = require('./questions');
var currentQuestion = false;
var results = {
    a: 0
    , b: 0
    , c: 0
    , d: 0
}

io.sockets.on('connection', function (socket) {
    console.log('WS connected: %s', socket.id);

    socket.once('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);

        var member = _.findWhere(audience, { id: socket.id });
        if (member) {
            audience.splice(audience.indexOf(member), 1);
            io.sockets.emit('audience', { audience: audience });
            console.log('Left: %s', member.name);
        } else if (socket.id === speaker.id) {
            console.log('%s has left. %s is over.', speaker.name, title);
            speaker = {};
            title = 'Untitled Presentation';
            io.sockets.emit('end', { title: title, speaker: '' });

        }
        socket.disconnect();
        console.log('Disconnect! Connections: %s', connections.length);
    })
        .on('join', (member) => {
            var newMember = {
                id: socket.id
                , name: member.name
                , type: 'audience'
            };
            audience.push(newMember);
            io.sockets.emit('audience', { audience: audience });
            socket.emit('joined', newMember);
            console.log('User joined: %s', newMember.name);
        })
        .on('start', (payload) => {
            title = payload.title;
            speaker.name = payload.name;
            speaker.id = socket.id
            speaker.type = 'speaker'
            socket.emit('joined', speaker);
            io.sockets.emit('start', { title: title, speaker: speaker.name });
            console.log('Presentation Started: %s by %s', title, speaker.name);
        })
        .on('ask', (question) => {
            results = { a: 0, b: 0, c: 0, d: 0 };
            currentQuestion = question;
            io.sockets.emit('ask', currentQuestion);
            console.log('Question asked: %s', question.q);
        })
        .on('answer', (payload) => {
            results[payload.choice]++;
            io.sockets.emit('results', { results: results })
            console.log('Answer: %s - %j', payload.choice, results)
        })

    socket.emit('welcome', {
        title: title
        , audience: audience
        , speaker: speaker.name
        , questions: questions
        , currentQuestion: currentQuestion
        , results: results
    });

    connections.push(socket);

})

console.log('server is running on http://localhost:3000'); 