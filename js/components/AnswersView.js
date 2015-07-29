var React = require('react');
var TextView = require('./modules/Text').TextView;
var TextAreaView = require('./modules/Text').TextAreaView;
var ImageSelect = require('./modules/ImageSelect');
var AnswerActions = require('../actions/AnswerActions');
var AnswersStore = require('../stores/AnswersStore');
var Validation = require('../utils/Validation');
var Conditions = require('./modules/Conditions').Conditions;
var ConditionsText = require('./modules/Conditions').ConditionsText;
var Conformities = require('./modules/Conformities');

var Answer = {

	uploadImage: function(eventTarget) {
		AnswerActions.uploadImage(this.props.uuid, eventTarget);
	},

	removeImage: function (img) {
		AnswerActions.removeImage(this.props.uuid, img);
	},

	getIcons: function(){
		return (
			React.createElement("div", {className: "btn-group btn-group-xs pull-right"}, 
				React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.shiftUp}, 
				  React.createElement("span", {className: "glyphicon glyphicon-arrow-up"})
				), 
				React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.shiftDown}, 
				  React.createElement("span", {className: "glyphicon glyphicon-arrow-down"})
				), 
				React.createElement("button", {type: "button", className: "btn btn-default", onClick: this.remove}, 
				  React.createElement("span", {className: "glyphicon glyphicon-remove"})
				)
			)
		);
	},

	getBasicFields: function(){
		return (
			React.createElement("div", {className: "form-group"}, 
				React.createElement("label", null, "Ответ : *"), 
				React.createElement(TextAreaView, {rows: "1", value: this.props.text, onBlur: this.changeText}), 
				React.createElement(ImageSelect, {img: AnswersStore.getAnswerImg(this.props.uuid), uploadImage: this.uploadImage, removeImage: this.removeImage}), 
				React.createElement("label", null, 
					React.createElement("span", null, "Вес :"), 
					React.createElement(TextView, {value: this.props.weight, onBlur: this.changeWeight, isValid: Validation.isNumberOrReal})
				)
			)
		);
	},

	shiftUp: function(){
		AnswerActions.shiftUpAnswer(this.props.uuid);
	},

	shiftDown: function(){
		AnswerActions.shiftDownAnswer(this.props.uuid);
	},

	changeText: function(val){
		AnswerActions.changeTextAnswer(this.props.uuid, val);
	},

	changeWeight: function(val){
		AnswerActions.changeWeightAnswer(this.props.uuid, val);
	},

	remove: function(){
		AnswerActions.removeAnswer(this.props.uuid);
	}
}


var FillAnswer = {

	changeHeight: function(val){
		AnswerActions.changeAnswerSize(this.props.uuid, null, val);
	},

	changeWidth: function(val){
		AnswerActions.changeAnswerSize(this.props.uuid, val, null);
	},

	getMark: function(conditions){
		return(
			React.createElement("div", {className: "all"}, 
				this.getIcons(), 
				React.createElement("label", null, 
					React.createElement("span", null, this.props.number, " ")
				), 
				this.getBasicFields(), 
				React.createElement("label", null, 
					React.createElement("span", null, "Высота"), 
					React.createElement(TextView, {value: this.props.height, onBlur: this.changeHeight, isValid: Validation.isNumber})
				), 
				React.createElement("label", null, 
					React.createElement("span", null, "Ширина"), 
					React.createElement(TextView, {value: this.props.width, onBlur: this.changeWidth, isValid: Validation.isNumber})
				), 
				React.createElement("div", {className: "a-conditions"}, 
					conditions
				)
			)
		);
	}
}

//текстовый ввод
var NumericalFillAnswer = React.createClass({displayName: "NumericalFillAnswer",

	mixins: [Answer, FillAnswer],

	render: function() {
		return(
			this.getMark(React.createElement(ConditionsText, {uuid: this.props.uuid, conditions: AnswersStore.getConditionsText(this.props.uuid)}))
		);
	}
});


//цифровой ввод
var MatchItemAnswer = React.createClass({displayName: "MatchItemAnswer",

	mixins:[Answer, FillAnswer],

	render: function() { 
		return(
			this.getMark(React.createElement(Conditions, {uuid: this.props.uuid, conditions: AnswersStore.getConditions(this.props.uuid)}))
		);
	}
});

//соответствие
var ConformityAnswer = React.createClass({displayName: "ConformityAnswer",

	mixins:[Answer],

	render: function() {
		return (
			React.createElement("div", {className: "all"}, 
				this.getIcons(), 
				React.createElement("label", null, 
					React.createElement("span", null, this.props.number, " ")
				), 
				this.getBasicFields(), 
				React.createElement("div", {className: "a-conditions"}, 
					React.createElement(Conformities, {uuid: this.props.uuid, conformities: AnswersStore.getConformities(this.props.uuid)})
				)
			)
		);
	}
});

//единственный, множественный выбор
var ChoiceAnswer = React.createClass({displayName: "ChoiceAnswer",

	mixins:[Answer],

	handleSelect: function(e){
		AnswerActions.selectAnswer(this.props.uuid, e.target.checked);
	},

	render:function() {
		return(
			React.createElement("div", {className: "all"}, 
				this.getIcons(), 
				React.createElement("label", null, 
					React.createElement("span", null, this.props.number, " "), 
					React.createElement("input", {type: "checkbox", checked: this.props.selected, onChange: this.handleSelect})
				), 
				this.getBasicFields()
			)
		);
	}
});

//ранжирование
var OrderAnswer = React.createClass({displayName: "OrderAnswer",

	mixins:[Answer],

	render:function() {
		return(
			React.createElement("div", {className: "all"}, 
				this.getIcons(), 
				React.createElement("label", null, 
					React.createElement("span", null, this.props.number, " ")
				), 
				this.getBasicFields()
			)
		);
	}
});

module.exports = {
	ChoiceAnswer: ChoiceAnswer,
	OrderAnswer: OrderAnswer,
	MatchItemAnswer: MatchItemAnswer,
	NumericalFillAnswer: NumericalFillAnswer,
	ConformityAnswer: ConformityAnswer
}