var React = require("react");
var ReactDOM = require("react-dom");
var { Router, Route, browserHistory, IndexRoute }  = require('react-router');


var PollApp = require("./components/PollApp");
var Audience = require("./components/Audience");
var Speaker = require("./components/Speaker");
var Board = require("./components/Board");


var routes = (
    <Router history={browserHistory}>
    <Route path="/" component={PollApp}>
            <IndexRoute component={Audience}/>
            <Route path="/speaker" component={Speaker} />
            <Route path="/board" component={Board} />
        </Route>
    </Router>
)
    

    ReactDOM.render(routes, document.getElementById("reactContainer"));

