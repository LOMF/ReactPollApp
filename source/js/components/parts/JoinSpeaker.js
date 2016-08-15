var React = require('react');

var JoinSpeaker = React.createClass({

    render: function () {
        return (
            <form action="javascript:void(0)" onSubmit={this.start}>
                <label>Vad heter du?</label>
                <input className="form-control"
                    placeholder="Ange ditt namn"
                    required
                    ref="name"
                    />
                <input className="form-control"
                    placeholder="Ange en titel på föreläsningen"
                    required
                    ref="title"
                    />
                <button className="btn btn-primary">Starta</button>


            </form>
        )
    }
    , start: function () {
        var speakerName = this.refs.name.value;
        var title = this.refs.title.value;
        this.props.emit('start', { name: speakerName, title: title })
    }
})

module.exports = JoinSpeaker;