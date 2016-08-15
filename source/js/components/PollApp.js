var React = require("react");
var io = require('socket.io-client');
var Header = require('./parts/header');
var Display = require('./parts/Display');
var Link = require("react-router").Link;
var PollApp = React.createClass({

    getInitialState: function () {
        return {
            status: 'disconnected'
            , title: ''
            , member: {}
            , audience: []
            , speaker: ''
            , questions: []
            , currentQuestion: false
            , results: {}
        }
    }
    , componentWillMount: function () {
        this.socket = io();
        this.socket
            .on('connect', () => {
                if (sessionStorage.member) {
                    var member = JSON.parse(sessionStorage.member)
                    if (member.type === 'speaker') {
                        this.emit('start', { name: member.name, title: sessionStorage.title });
                    } else if (member.type === 'audience') {
                        this.emit('join', member);
                    }
                }
                this.setState({ status: 'connected' })
            })
            .on('disconnect', () => this.setState({ status: 'disconnected' }))
            .on('welcome', (state) => this.setState(state))
            .on('joined', (member) => {
                this.setState({ member: member });
                sessionStorage.setItem("member", JSON.stringify(member));
            })
            .on('audience', (audience) => this.setState(audience))
            .on('start', (info) => {
                if (this.state.member.type === 'speaker') {
                    sessionStorage.title = info.title;
                }
                this.setState(info)
            })
            .on('end', (info) => this.setState(info))
            .on('ask', (question) => {
                sessionStorage.answer = '';
                this.setState({ currentQuestion: question, results: { a: 0, b: 0, c: 0, d: 0 } });
            })
            .on('results', (state) => this.setState(state))


    }
    , emit: function (msg, payload) {
        this.socket.emit.apply(this.socket, arguments);
    }
    , render: function () {
        var passObj = jQuery.extend({ emit: this.emit }, this.state);

        return (
            <div>
                <Header {...this.state} />
                <section>
                    {this.props.children && React.cloneElement(this.props.children, passObj) }
                </section>

            </div>
        )

        /*      <ul>
                    <li><Link to="/">Audience</Link></li>
                    <li><Link to="/board">Board</Link></li>
                    <li><Link to="/speaker">Speaker</Link></li>
                </ul> */
    }

});
module.exports = PollApp;
