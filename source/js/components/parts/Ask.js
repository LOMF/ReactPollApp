var React = require('react');
var Display = require('./Display');


var Ask = React.createClass({

    getInitalState: function () {
        return {
            choices: []
            , answer: undefined
        }
    }
    , componentWillMount: function () {
        this.setupChoices();
    }
    , componentWillReceiveProps: function () {
        this.setupChoices();
    }
    , setupChoices: function () {
        var choices = Object.keys(this.props.question);
        choices.shift(); // ta bort Q
        this.setState({ 
                choices: choices
                , answer: sessionStorage.answer 
            });
    }

    , select: function (choice) {
        this.setState({ answer: choice });
        sessionStorage.answer = choice;
        this.props.emit('answer', {
            question: this.props.question
            , choice: choice
        })
    }
    , render: function () {
        return (
            <div id="currentQuestion">
                <Display if={this.state.answer}>
                    <h3>You answered: <strong>{this.state.answer}</strong></h3>
                    <p>{this.props.question[this.state.answer]}</p>
                </Display>
                <Display if={!this.state.answer}>
                    <h2>{this.props.question.q}</h2>
                    <div className="row">
                        {this.state.choices.map(this.addChoiceButton) }
                    </div>
                </Display>

            </div>
        )
    }
    , addChoiceButton: function (choice, i) {

        var buttonTypes = ['primary', 'success', 'warning', 'danger']

        return (
            <button key={i}
                className={'col-xs-12 col-sm-5 btn btn-' + buttonTypes[i]}
                onClick={this.select.bind(null, choice) }>
                <strong>{choice} </strong>
                {this.props.question[choice]}

            </button>
        )
    }

})

module.exports = Ask;