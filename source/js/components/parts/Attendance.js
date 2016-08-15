var React = require('react');
var Display = require('./Display');


var Attendance = React.createClass({


    render: function () {
        return (
            <div>
                <h2>Attendance - {this.props.audience.length} members</h2>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Audience member</th>
                            <th>Socket ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.audience.map(this.addMemberRow) }
                    </tbody>
                </table>
            </div>
        )
    }
    , addMemberRow: function (member, i) {
        return (
            <tr key={i}>
                <td>{member.name}</td>
                <td>{member.id}</td>
            </tr>
        )
    }

})

module.exports = Attendance;