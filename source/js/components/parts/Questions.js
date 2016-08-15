var React = require('react');
var Display = require('./Display');


var Questions = React.createClass({


    render: function () {
        return (
            <div id="questions" className="row">
                <h2>Questions</h2>
                {this.props.questions.map(this.addQuestion) }

            </div>
        )
    }
    , addQuestion: function (question, i) {
        return (
            <div key={i} className="col-xs-12 col-sm-6 col-md-3">
                <span onClick={this.askQuestion.bind(null, question)}>{question.q}</span>

            </div>
        )
    }

    , askQuestion: function(question) {
        this.props.emit('ask', question)
    }

})

module.exports = Questions;