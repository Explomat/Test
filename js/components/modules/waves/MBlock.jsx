var React = require('react');
var Wave = require('./Wave');
var extend = require('extend');

var MBlock = extend({}, Wave, {

	propTypes: {
        onClick: React.PropTypes.func
  	},

  	getDefaultProps: function () {
		return {
			duration: 750,
			delay: 200
		};
	},

	handleMouseDown: function (e, _element) {
		var element = _element || e.target || e.srcElement;
		this.show(e, element);
		element.addEventListener("mouseup", this.hide);
		element.addEventListener("mouseleave", this.hide);
	},

	render: function () {
		return (
			<button title={this.state.value} className={this.baseButtonClassName} onMouseDown={this.handleMouseDown} onClick={this.props.onClick}>
	           	{this.state.value}
	        </button>
		);
	}


});

module.exports = React.createClass(MBlock);
module.exports.Class = MBlock;

