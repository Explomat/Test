var React = require('react');
var QuestionTooltipLeft = require('./QuestionTooltip').QuestionTooltipLeft;
var QuestionTooltipRight = require('./QuestionTooltip').QuestionTooltipRight;

var QuestionTooltipFieldLeft = React.createClass({

	getDefaultProps: function(){
		return {
			text: ''
		}
	},

	render: function() {
		return (
			<div className="question-tooltip-field question-tooltip-field_left">
				<QuestionTooltipLeft text={this.props.text} />
				<div className="question-tooltip-field__content">
					{this.props.children}
				</div>
			</div>
		);
	}
});

var QuestionTooltipFieldRight = React.createClass({

	getDefaultProps: function(){
		return {
			text: ''
		}
	},

	render: function() {
		return (
			<div className="question-tooltip-field question-tooltip-field_right">
				<div className="question-tooltip-field__content">
					{this.props.children}
				</div>
				<QuestionTooltipRight text={this.props.text} />
			</div>
		);
	}
});


module.exports = {
	QuestionTooltipFieldLeft: QuestionTooltipFieldLeft,
	QuestionTooltipFieldRight: QuestionTooltipFieldRight
};