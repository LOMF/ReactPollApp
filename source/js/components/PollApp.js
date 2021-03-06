var React = require("react");
var io = require('socket.io-client');
var Header = require('./parts/Header');
var Link = require('react-router').Link;


var PollApp = React.createClass({

    getInitialState: function() {
        return {
            status:'disconnected'
            ,title: ''
            ,member: {}
            ,audience: []
        }
    }
    ,componentWillMount: function () {
        this.socket = io("http://localhost:3000");
        this.socket.on('connect', () => {
            this.setState({status:'connected'});
            console.log('ansluten till websocket!');
        })
        .on('disconnect', () => {
            this.setState({status:'disconnected'});
            console.log('Inte ansluten till websocket!');
        })
        .on('welcome', (info) => {
            this.setState(info);
            console.log(this.state.title);
        })
        .on('audience', (audienceArr) => {
            this.setState({audience: audienceArr});
        })
    }
    ,onEmit: function(msg, payload) {
        this.setState(payload);
        this.socket.emit(msg,payload);
        //alert('pollApp - onEmit!');
    }
    ,render: function () {
        var propObj = jQuery.extend({emit:this.onEmit}, this.state)
        return (
            <div>
                <Header title={this.state.title}
                status={this.state.status} />
                {React.cloneElement(this.props.children, propObj)}

                <footer>
                    <ul>
                        <li><Link to="/">Audience</Link></li>
                        <li><Link to="/speaker">Speaker</Link></li>
                        <li><Link to="/board">Board</Link></li>
                    </ul>
                </footer>
            </div>
        )
    }

});
module.exports = PollApp;