var React = require('React');
var AnswerActions = require('../../Controllers/startController/actions/AnswerActions');
var TextView = require('./Text').TextView;

var Conformity = React.createClass({displayName: "Conformity",

	handleChangeText: function (e) {
		if (this.props.handleChangeText)
			this.props.handleChangeText(this.props.uuid, e.target.value);
	},

	handleRemove: function (e) {
		if (this.props.handleRemove)
			this.props.handleRemove(this.props.uuid);
	},

	render: function() {
		return (
			React.createElement("div", {className: "input-group input-group-sm"}, 
				React.createElement(TextView, {value: this.props.text, onBlur: this.handleChangeText, isValid: validate}), 
				React.createElement("input", {type: "text", className: "form-control", value: this.props.text, onChange: this.handleChangeText}), 
				React.createElement("div", {className: "input-group-btn"}, 
					React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.handleRemove}, 
					  React.createElement("span", {className: "glyphicon glyphicon-remove"})
					)
				)
			)
		);
	}
});

var Conformities = React.createClass({displayName: "Conformities",

	handleAdd: function () {
		AnswerActions.addAnswerConformity(this.props.uuid);
	},

	handleRemove: function(conditionUuid){
		AnswerActions.removeAnswerConformity(this.props.uuid, conditionUuid);
	},

	handleChangeText: function(conditionUuid, text){
		AnswerActions.changeAnswerConformity(this.props.uuid, conditionUuid, text);
	},

	render: function() {
		return (
			React.createElement("div", {className: "conditions"}, 
				React.createElement("button", {type: "button", className: "btn btn-default btn-sm", onClick: this.handleAdd}, 
					React.createElement("span", {className: "glyphicon glyphicon-plus"}), 
					React.createElement("span", null, " Добавить соответствие")
				), 
				this.props.conformities.map(function(c){
					return React.createElement(Conformity, {key: c.uuid, uuid: c.uuid, type: c.condition, text: c.text, handleRemove: this.handleRemove, handleChangeText: this.handleChangeText});
				}.bind(this))
			)
		);
	}
});

module.exports = Conformities;