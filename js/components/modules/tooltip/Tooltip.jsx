var React = require('react');

var TooltipBase = {

	propTypes: {
		text: React.PropTypes.string.isRequired,
		style: React.PropTypes.object,
		className: React.PropTypes.string
	},

	_getClassName: function(){
		return this.props.rootClassName ? this.props.rootClassName : '';
	},

	_getInnerMark: function(){
		return (
			<div className="tooltip__inner">
	        	{this.props.text}
	      	</div>
		);
	},

	getLeftDirectionMark: function(){
		return (
			<div className={"tooltip tooltip_left " + this._getClassName()} style={this.props.style}>
		    	<div className="tooltip__arrow tooltip__arrow_left"></div>
		    	{this._getInnerMark()}
		    </div>
		);
	},

	getTopDirectionMark: function(){
		return (
			<div className={"tooltip tooltip_top " + this._getClassName()} style={this.props.style}>
		    	<div className="tooltip__arrow tooltip__arrow_top"></div>
		    	{this._getInnerMark()}
		    </div>
		);
	},

	getBottomDirectionMark: function(){
		return (
			<div className={"tooltip tooltip_bottom " + this._getClassName()} style={this.props.style}>
		    	<div className="tooltip__arrow tooltip__arrow_bottom"></div>
		    	{this._getInnerMark()}
		    </div>
		);
	},

	getRightDirectionMark: function(){
		return (
			<div className={"tooltip tooltip_right " + this._getClassName()} style={this.props.style}>
		    	<div className="tooltip__arrow tooltip__arrow_right"></div>
		    	{this._getInnerMark()}
		    </div>
		);
	}
}


var TooltipLeft = React.createClass({
	
	mixins: [TooltipBase],

	render: function() {
		return (
			this.getLeftDirectionMark()
		);
	}
});

var TooltipTop = React.createClass({

	mixins: [TooltipBase],

	render: function() {
		return (
			this.getTopDirectionMark()
		);
	}
});


var TooltipBottom = React.createClass({

	mixins: [TooltipBase],

	render: function() {
		return (
			this.getBottomDirectionMark()
		);
	}
});

var TooltipRight = React.createClass({

	mixins: [TooltipBase],

	render: function() {
		return (
			this.getRightDirectionMark()
		);
	}
});


module.exports = {
	TooltipLeft: TooltipLeft,
	TooltipTop: TooltipTop,
	TooltipBottom: TooltipBottom,
	TooltipRight: TooltipRight
}