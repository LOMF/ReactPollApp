var React = require('react');

var Join = React.createClass({

    render: function () {
        return (
            <form action="javascript:void(0)" onSubmit={this.join} className="joinForm">
                <label>Vad heter du?</label>
                <input className="form-control"
                    placeholder="Förnamn Efternamn"
                    required
                    ref="name"
                    />
                <button className="btn btn-primary">Anslut!</button>


            </form>
        )
    }
    , join: function () {
        var memberName = this.refs.name.value;
        this.props.emit('join', { name: memberName })
    }
})

module.exports = Join;