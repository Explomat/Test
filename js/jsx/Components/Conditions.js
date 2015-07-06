var React = require('React');
var AnswerActions = require('../../Controllers/startController/actions/AnswerActions');
var SubAnswer = require('../../Controllers/startController/utils/SubAnswer');
var TextView = require('./Text').TextView;
var Validation = require('../../utils/Validation');

var ConditionTypeText = React.createClass({displayName: "ConditionTypeText",
	
	handleSelect: function() {
		if (this.props.handleSelect)
			this.props.handleSelect(this.props.type);
	},

	render: function() {
		return(
			React.createElement("li", {onClick: this.handleSelect}, React.createElement("span", null, SubAnswer.conditionsText.values[this.props.type]))
		);
	}
});

var ConditionType = React.createClass({displayName: "ConditionType",
	
	handleSelect: function() {
		if (this.props.handleSelect)
			this.props.handleSelect(this.props.type);
	},

	render: function() {
		return(
			React.createElement("li", {onClick: this.handleSelect}, React.createElement("span", null, SubAnswer.conditions.values[this.props.type]))
		);
	}
});

var Condition = {

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleBlur);
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlur);
	},

	handleBlur: function () {
		this.setState({display: false});
	},

	handleDisplay: function(e) {
		if (e){
			e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
		}
		this.setState({display: !this.state.display});
	},

	handleSelect:function (type) {
		if (this.props.handleSelect)
			this.props.handleSelect(this.props.uuid, type);
	},

	handleRemove: function(){
		if (this.props.handleRemove)
			this.props.handleRemove(this.props.uuid);
	},

	handleChangeText: function(val) {
		if (this.props.handleChangeText)
			this.props.handleChangeText(this.props.uuid, val);
	},

	getConditionsType: function(){
		var list = [];
		Object.keys(SubAnswer.conditions.keys).forEach(function(c){
			list.push(React.createElement(ConditionType, {key: this.props.uuid + c, type: c, handleSelect: this.handleSelect}));
		}.bind(this));
		return list;
	},

	getConditionsTypeText: function(){
		var list = [];
		Object.keys(SubAnswer.conditionsText.keys).forEach(function(c){
			list.push(React.createElement(ConditionTypeText, {key: this.props.uuid + c, type: c, handleSelect: this.handleSelect}));
		}.bind(this));
		return list;
	},

	getMark: function(conditions, type, validate){
		var isDisplayStyle = { display: this.state.display ? "block" : "none" };
		return(
			React.createElement("div", {className: "input-group input-group-sm"}, 
				React.createElement("div", {className: "input-group-btn"}, 
					React.createElement("button", {className: "btn btn-default dropdown-toggle c-btn", type: "button", onClick: this.handleDisplay}, 
						React.createElement("span", null, type, "  "), 
						React.createElement("span", {className: "caret"})
					), 
					React.createElement("ul", {className: "dropdown-menu", style: isDisplayStyle}, 
						conditions
					)
				), 
				React.createElement(TextView, {value: this.props.text, onBlur: this.handleChangeText, isValid: validate}), 
				
				React.createElement("div", {className: "input-group-btn"}, 
					React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.handleRemove}, 
					  React.createElement("span", {className: "glyphicon glyphicon-remove"})
					)
				)
			)
		);
	},

	getInitialState: function() {
		return {
			display: false
		}
	}
}

var ConditionText = React.createClass({displayName: "ConditionText",

	mixins: [Condition],

	render: function() {
		return(
			this.getMark(this.getConditionsTypeText(), SubAnswer.conditionsText.values[this.props.type])
		);
	}
});

var ConditionNumber = React.createClass({displayName: "ConditionNumber",

	mixins: [Condition],

	render: function() {
		return(
			this.getMark(this.getConditionsType(), SubAnswer.conditions.values[this.props.type], Validation.isNumber)
		);
	}
});

var BaseConditions = {

	getConditions: function() {
		return this.props.conditions.map(function(c){
			return React.createElement(ConditionNumber, {key: c.uuid, uuid: c.uuid, type: c.condition, text: c.text, handleSelect: this.handleSelect, handleRemove: this.handleRemove, handleChangeText: this.handleChangeText});
		}.bind(this));
	},

	getConditionsText: function() {
		return this.props.conditions.map(function(c){
			return React.createElement(ConditionText, {key: c.uuid, uuid: c.uuid, type: c.condition, text: c.text, handleSelect: this.handleSelect, handleRemove: this.handleRemove, handleChangeText: this.handleChangeText});
		}.bind(this));
	},

	getMark: function(conditions, descr) {
		return (
			React.createElement("div", {className: "conditions"}, 
				React.createElement("button", {type: "button", className: "btn btn-default btn-sm", onClick: this.handleAdd}, 
					React.createElement("span", {className: "glyphicon glyphicon-plus"}), 
					React.createElement("span", null, " Добавить условие")
				), 
				conditions
			)
		);
	}
}

var ConditionsText = React.createClass({displayName: "ConditionsText",

	mixins: [BaseConditions],

	handleSelect: function(conditionUuid, type) {
		AnswerActions.changeAnswerConditionText(this.props.uuid, conditionUuid, null, type);
	},

	handleAdd: function () {
		AnswerActions.addAnswerConditionText(this.props.uuid);
	},

	handleRemove: function(conditionUuid) {
		AnswerActions.removeAnswerConditionText(this.props.uuid, conditionUuid);
	},

	handleChangeText: function(conditionUuid, text) {
		AnswerActions.changeAnswerConditionText(this.props.uuid, conditionUuid, text);
	},

	render: function() {
		return (
			this.getMark(this.getConditionsText())
		);
	}
});

var Conditions = React.createClass({displayName: "Conditions",

	mixins: [BaseConditions],

	handleSelect: function(uuid, type) {
		AnswerActions.changeAnswerCondition(this.props.uuid, uuid, null, type);
	},

	handleAdd: function () {
		AnswerActions.addAnswerCondition(this.props.uuid);
	},

	handleRemove: function(conditionUuid){
		AnswerActions.removeAnswerCondition(this.props.uuid, conditionUuid);
	},

	handleChangeText: function(conditionUuid, text){
		AnswerActions.changeAnswerCondition(this.props.uuid, conditionUuid, text);
	},

	render: function() {
		return (
			this.getMark(this.getConditions())
		);
	}
});

module.exports = {
	Conditions: Conditions,
	ConditionsText: ConditionsText
}