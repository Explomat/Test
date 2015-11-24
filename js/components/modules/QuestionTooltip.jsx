var React = require('react');
var TooltipLeft = require('./Tooltip').TooltipLeft;
var TooltipRight = require('./Tooltip').TooltipRight;

var QuestionTooltipBase = {

	propTypes: {
		text: React.PropTypes.string.isRequired
	},

	getInitialState: function(){
		return {
			show: false
		}
	},

	handleMouseOver: function(){
		this.setState({show: true});
	},

	handleMouseOut: function(){ 
		this.setState({show: false});
	}
}

var QuestionTooltipLeft = React.createClass({

	mixins: [QuestionTooltipBase],

	render: function() {
		return (
			<div className="question-tooltip-box question-tooltip-box_left">
				<TooltipLeft text={this.props.text} show={this.state.show} childStyle={{position: 'absolute', top: '50%', right: '100%', transform: 'translateY(-50%)', margin: '0px'}}/>
				<span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} className="question-tooltip question-tooltip_left glyphicon glyphicon-question-sign"></span>
			</div>
		);
	}
});

var QuestionTooltipRight = React.createClass({

	mixins: [QuestionTooltipBase],

	render: function() {
		return (
			<div className="question-tooltip-box question-tooltip-box_right">
				<span onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} className="question-tooltip question-tooltip_right glyphicon glyphicon-question-sign"></span>
				<TooltipRight text={this.props.text} show={this.state.show} childStyle={{position: 'absolute', top: '50%', left: '100%', transform: 'translateY(-50%)', margin: '0px'}}/>
			</div>
		);
	}
});

module.exports = {
	QuestionTooltipLeft: QuestionTooltipLeft,
	QuestionTooltipRight: QuestionTooltipRight
}