var React = require('react');
var TooltipLeft = require('./Tooltip').TooltipLeft;
var TooltipRight = require('./Tooltip').TooltipRight;

var QuestionTooltipBase = {

	propTypes: {
		text: React.PropTypes.string.isRequired
	}
}

var QuestionTooltipLeft = React.createClass({

	mixins: [QuestionTooltipBase],

	render: function() {
		return (
			<div className="question-tooltip question-tooltip_left glyphicon glyphicon-question-sign">
				<TooltipLeft text={this.props.text} style={{position: 'absolute', top: '50%', right: '100%', transform: 'translateY(-50%)', margin: '0px'}}/>
			</div>
		);
	}
});

var QuestionTooltipRight = React.createClass({

	mixins: [QuestionTooltipBase],

	render: function() {
		return (
			<div className="question-tooltip question-tooltip_right glyphicon glyphicon-question-sign">
				<TooltipRight text={this.props.text} style={{position: 'absolute', top: '50%', left: '100%', transform: 'translateY(-50%)', margin: '0px'}}/>
			</div>
		);
	}
});

module.exports = {
	QuestionTooltipLeft: QuestionTooltipLeft,
	QuestionTooltipRight: QuestionTooltipRight
}