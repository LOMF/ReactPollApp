var React = require('react')
var Display = require('./parts/Display');
var Join = require('./parts/Join');
var Ask = require('./parts/Ask');
var Audience = React.createClass({
    render: function () {
        return (
            <div>
                <Display if={this.props.status === 'connected'}>

                    <Display if={this.props.member.name}>
                        <Display if={!this.props.currentQuestion}>

                            <h2>Välkommen {this.props.member.name}!</h2>
                            <p>Antal deltagare {this.props.audience.length}</p>
                            <p>Frågorna kommer visas här...</p>
                        </Display>
                        <Display if={this.props.currentQuestion}>
                            <Ask question={this.props.currentQuestion} emit={this.props.emit}/>
                        </Display>
                    </Display>
                    <Display if={!this.props.member.name}>
                        <h1>Var med och Tyck till!!</h1>
                        <Join emit={this.props.emit}/>
                    </Display>

                </Display>
            </div>
        )
    }
})
module.exports = Audience;