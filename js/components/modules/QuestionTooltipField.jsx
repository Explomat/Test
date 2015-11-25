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
			<div className="question-filed question-filed_left">
				<QuestionTooltipLeft text={this.props.text} />
				<div className="question-filed__content">
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
			<div className="question-filed question-filed_right">
				<div className="question-filed__content">
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