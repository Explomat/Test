var React = require('react');
var MButtonClass = require('./MButton').Class;
var extend = require('extend');

var MPlusButtonBlue = extend({}, MButtonClass, {

	handleClick: function (e) {
		MButtonClass.handleClick.call(this, e);
	},

	render: function () {
		return (
			<button className={this.props.className + ' ' +this.baseClassName} onMouseDown={this.handleClick} onClick={this.props.onClick}>
                {this.state.value}
	        </button>
		);
	}


});

module.exports = React.createClass(MPlusButtonBlue);
module.exports.Class = MPlusButtonBlue;

