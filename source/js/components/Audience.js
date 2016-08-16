var React = require('react');
var Display = require('./parts/Display');
var JoinForm = require('./parts/JoinForm');

var Audience = React.createClass({

    render: function() {

        return (
            <Display if={this.props.status === 'connected'}>

                <Display if={this.props.member.name}>
                    <p>Anslutna användare: {this.props.audience.length}</p>
                </Display>

                <Display if={!this.props.member.name}>
                    <JoinForm emit={this.props.emit} />
                </Display>
                <h2> Audience sida! {this.props.status}</h2>
            </Display>
        )

    }
    

})
module.exports = Audience;