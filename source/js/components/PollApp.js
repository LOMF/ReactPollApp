var React = require("react");
var io = require('socket.io-client');

var PollApp = React.createClass({
    componentWillMount: function () {
        this.socket = io();

    }
    ,render: function () {
        return (
            <h1>Testar igen</h1>
        )
    }

});
module.exports = PollApp;