var React = require('react');

var TooltipBase = {

	propTypes: {
		text: React.PropTypes.string.isRequired,
		show: React.PropTypes.bool,
		rootStyle: React.PropTypes.object,
		childStyle: React.PropTypes.object,
		rootClassName: React.PropTypes.string,
		childClassName: React.PropTypes.string
	},

	getDefaultProps: function(){
		return {
			show: false
		}
	},

	_getRootClassName: function(){
		return this.props.rootClassName ? this.props.rootClassName : '';
	},

	_getChildClassName: function(){
		return this.props.childClassName ? this.props.childClassName : '';
	},

	_getShowClass: function(){
		return this.props.show ? "tooltip_show" : '';
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
			<div className={"tooltip-box " + this._getRootClassName()} style={this.props.rootStyle}>
				{this.props.children}
				<div className={"tooltip tooltip_left " + this._getShowClass() + " " + this._getChildClassName()} style={this.props.childStyle}>
			    	<div className="tooltip__arrow tooltip__arrow_left"></div>
			    	{this._getInnerMark()}
			    </div>
			</div>
		);
	},

	getTopDirectionMark: function(){
		return (
			<div className={"tooltip-box " + this._getRootClassName()} style={this.props.rootStyle}>
				{this.props.children}
				<div className={"tooltip tooltip_top " + this._getShowClass() + " " + this._getChildClassName()} style={this.props.childStyle}>
			    	<div className="tooltip__arrow tooltip__arrow_top"></div>
			    	{this._getInnerMark()}
			    </div>
			</div>
		);
	},

	getBottomDirectionMark: function(){
		return (
			<div className={"tooltip-box " + this._getRootClassName()} style={this.props.rootStyle}>
				{this.props.children}
				<div className={"tooltip tooltip_bottom " + this._getShowClass() + " " + this._getChildClassName()} style={this.props.childStyle}>
			    	<div className="tooltip__arrow tooltip__arrow_bottom"></div>
			    	{this._getInnerMark()}
			    </div>
			</div>
		);
	},

	getRightDirectionMark: function(){
		return (
			<div className={"tooltip-box " + this._getRootClassName()} style={this.props.rootStyle}>
				{this.props.children}
				<div className={"tooltip tooltip_right " + this._getShowClass() + " " + this._getChildClassName()} style={this.props.childStyle}>
			    	<div className="tooltip__arrow tooltip__arrow_right"></div>
			    	{this._getInnerMark()}
			    </div>
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