var React = require('react');
var PropTypes = React.PropTypes;

var Home = React.createClass({

    render: function() {
        return (
            <div>
                Hello from Home! {this.props.children}
            </div>
        );
    }

});

module.exports = Home;
