var React = require('react');
var Display = require('./parts/Display');
var JoinSpeakerForm = require('./parts/JoinSpeakerForm');
var AudienceList = require('./parts/AudienceList');

var Speaker = React.createClass({

    render: function() {

        return (
            <Display if={this.props.status === 'connected'}>
                <Display if={this.props.member.type === 'speaker'}>
                    <h2>Frågor</h2>
                    <AudienceList audience={this.props.audience} />
                </Display>

                <Display if={this.props.member.type !== 'speaker'}>
                    <JoinSpeakerForm emit={this.props.emit}/>
                </Display>

            </Display>
        )

    }

})
module.exports = Speaker;