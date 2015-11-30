var React = require('react');
var AnswerActions = require('../../actions/AnswerActions');
var SubAnswer = require('../../utils/SubAnswer');
var TextView = require('./TextLabel').TextView;
var AnswerValidation = require('../../utils/validation/AnswerValidation');
var DropDown = require('./DropDown');

var Condition = {

	handleSelect:function (e, type) {
		if (this.props.handleSelect)
			this.props.handleSelect(type);
	},

	handleChangeText: function(val) {
		if (this.props.handleChangeText)
			this.props.handleChangeText(this.props.uuid, val);
	},

	getConditionsType: function(){
		return Object.keys(SubAnswer.conditions.keys).map(function(c){
			return {payload: c, text: SubAnswer.conditions.values[c]};
		});
	},

	getConditionsTypeText: function(){
		return Object.keys(SubAnswer.conditionsText.keys).map(function(c){
			return {payload: c, text: SubAnswer.conditionsText.values[c]};
		});
	},

	getMark: function(conditions, type, validate){
		return(
			<div className="condition">
				<DropDown className={"condition__dropdown"} items={conditions} selectedPayload={type} onChange={this.handleSelect} />
				<TextView className={"condition__text"} value={this.props.text} onBlur={this.handleChangeText} isValid={validate} placeholder={"Условие"}/>
			</div>
		);
	}
}

var ConditionText = React.createClass({

	mixins: [Condition],

	render: function() {
		return(
			this.getMark(this.getConditionsTypeText(), this.props.type)
		);
	}
});

var ConditionNumber = React.createClass({

	mixins: [Condition],

	render: function() {
		return(
			this.getMark(this.getConditionsType(), this.props.type, AnswerValidation.isValidCondition)
		);
	}
});

var BaseConditions = {

	getCondition: function() {
		var condition = this.props.condition;
		return <ConditionNumber key={condition.uuid} uuid={condition.uuid} type={condition.condition} text={condition.text} handleSelect={this.handleSelect} handleChangeText={this.handleChangeText}/>;
	},

	getConditionText: function() {
		var conditionText = this.props.condition;
		return <ConditionText key={conditionText.uuid} uuid={conditionText.uuid} type={conditionText.condition} text={conditionText.text} handleSelect={this.handleSelect} handleChangeText={this.handleChangeText}/>;
	},

	getMark: function(condition) {
		return condition;
	}
}

var ConditionsText = React.createClass({

	mixins: [BaseConditions],

	handleSelect: function(type) {
		AnswerActions.changeAnswerConditionText(this.props.uuid, null, type);
	},

	handleChangeText: function(text) {
		AnswerActions.changeAnswerConditionText(this.props.uuid, text);
	},

	render: function() {
		return (
			this.getMark(this.getConditionText())
		);
	}
});

var Conditions = React.createClass({

	mixins: [BaseConditions],

	handleSelect: function(type) {
		AnswerActions.changeAnswerCondition(this.props.uuid, null, type);
	},

	handleChangeText: function(text){
		AnswerActions.changeAnswerCondition(this.props.uuid, text);
	},

	render: function() {
		return (
			this.getMark(this.getCondition())
		);
	}
});

module.exports = {
	Conditions: Conditions,
	ConditionsText: ConditionsText
}