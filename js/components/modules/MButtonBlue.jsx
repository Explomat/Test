var React = require('react');
var MButtonClass = require('./MButton').Class;
var extend = require('extend');

var MButtonBlue = extend({}, MButtonClass, {

	handleClick: function (e) {
		MButtonClass.handleClick.call(this, e);
	},

	render: function () {
		return (
			<button className={this.baseClassName} onMouseDown={this.handleClick} onClick={this.props.onClick}>
                <span className="glyphicon glyphicon-plus"></span>
                <span>&nbsp;{this.state.value}</span>
	        </button>
		);
	}


});

module.exports = React.createClass(MButtonBlue);
module.exports.Class = MButtonBlue;

