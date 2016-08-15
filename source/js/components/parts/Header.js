var React = require('react');
var Display = require('./Display');

var Header = React.createClass({

    propTypes: {
        title: React.PropTypes.string.isRequired
    }

    , render: function () {
        return (
            <header className="row">
                <div className="col-xs-10">
                    <h1>{this.props.title}</h1>
                    <Display if={this.props.speaker}>
                        <p>av <strong>{this.props.speaker}</strong></p>
                    </Display>
                </div>
                <div className="col-xs-2">
                    <span className={'connection-status ' + this.props.status }/>
                </div>
            </header>
        )
    }


});
module.exports = Header;