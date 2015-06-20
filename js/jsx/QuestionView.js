var React = require('react');
var QuestionStore = require('../Controllers/startController/stores/QuestionStore');
var QuestionActions = require('../Controllers/startController/actions/QuestionActions');
var QuiestionTypes = require('../Controllers/startController/utils/QuestionTypes');
var ChoiceAnswer = require('./AnswersView').ChoiceAnswer;

function getQuestionState() {
	return {
		title: QuestionStore.getTitle(),
		text: QuestionStore.getText(),
		answers: QuestionStore.getAnswers(),
		isDisplayTypes: QuestionStore.isDisplayTypes(),
		type: QuestionStore.getTypeSelected()
	};
}

var Menu = React.createClass({displayName: "Menu",
	render:function() {
		return (
			React.createElement("div", {className: "menu"}, 
				React.createElement("div", null, 
					React.createElement("button", {type: "button", className: "btn btn-default btn-sm"}, React.createElement("span", {className: "glyphicon glyphicon-plus"})), 
					React.createElement("span", null, "Добавить ответ")
				)
			)
		);
	}
});

var Title = React.createClass({displayName: "Title",

	handleChange:function(e) {
		QuestionActions.changeTitle(e.target.value);
	},

	render:function() {
		return (
			React.createElement("div", {className: "input-group all menu-float"}, 
	            React.createElement("span", {className: "input-group-addon"}, "Заголовок : *"), 
	            React.createElement("input", {type: "text", className: "form-control", placeholder: "Заголовок вопроса", value: this.props.title, onChange: this.handleChange})
	        )
		);
	}
});

var QuestionText = React.createClass({displayName: "QuestionText",

	handleChange:function(e) {
		QuestionActions.changeText(e.target.value);
	},

	render:function() {
		return (
			React.createElement("div", {className: "form-group all menu-float"}, 
				React.createElement("label", null, "Вопрос : *"), 
				React.createElement("textarea", {className: "form-control", rows: "2", value: this.props.text, onChange: this.handleChange})
			)
		);
	}
});

var QuestionType = React.createClass({displayName: "QuestionType",

	handleSelectType:function() {
		if (this.props.handleSelectType)
			this.props.handleSelectType(this.props.id);
	},

	render:function() {
		return (
			React.createElement("li", {onClick: this.handleSelectType}, React.createElement("a", {href: "#"}, this.props.type))
		);
	}
});

var SelectQuestionType = React.createClass({displayName: "SelectQuestionType",

	componentWillUnmount: function() {
		document.removeEventListener('click', this.handleBlurTypes);
	},

	componentDidMount: function() {
		document.addEventListener('click', this.handleBlurTypes);
	},

	handleSelectType:function(key) {
		QuestionActions.selectType(key);
	},

	handleBlurTypes:function() {
		QuestionActions.displayTypes(false);
	},

	handleDisplayTypes:function(e) {
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();
    	QuestionActions.displayTypes(!QuestionStore.isDisplayTypes());
	},

	render:function() {
		var isTypeDisplayStyle = { display: QuestionStore.isDisplayTypes() ? "block" : "none" };
		var list = [];
		Object.keys(QuiestionTypes.values).forEach(function(k, count){
			if (count % 2 == 0 && count != 0)
				list.push(React.createElement("li", {key: "divider"+k, className: "divider"}));
			list.push(React.createElement(QuestionType, {key: k, id: k, type: QuiestionTypes.values[k], handleSelectType: this.handleSelectType}));
		}.bind(this));
		
		return (
			React.createElement("div", {className: "btn-group"}, 
				React.createElement("button", {className: "btn btn-default btn-sm dropdown-toggle qtype-btn", type: "button", onClick: this.handleDisplayTypes}, 
					React.createElement("span", null, QuiestionTypes.values[this.props.type], "  "), 
					React.createElement("span", {className: "caret"})
				), 
				React.createElement("ul", {className: "dropdown-menu", style: isTypeDisplayStyle}, 
					list
				)
			)
		);
	}
});

var QuestionView = React.createClass({displayName: "QuestionView",

	componentDidMount:function() {
		QuestionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount:function() {
		QuestionStore.removeChangeListener(this._onChange);
	},

	_onChange:function() {
		this.setState(getQuestionState());
	},

	getInitialState: function () {
		return getQuestionState();
	},

	render:function () {
		var answers = [];
		this.state.answers.forEach(function(ans, i){
			answers.push(React.createElement(ChoiceAnswer, {uuid: ans.uuid, key: ans.uuid, selected: ans.selected, number: i+1, text: ans.text, weight: ans.weight}));
		});
		return (
			React.createElement("div", {className: "panel panel-default"}, 
				React.createElement("div", {className: "panel-body"}, 
					React.createElement(Title, {title: this.state.title}), 
			        React.createElement(QuestionText, {text: this.state.text}), 
			        React.createElement(Menu, null), 
			        React.createElement(SelectQuestionType, {type: this.state.type}), 
			        answers
				)
			)
		);
	}
});

module.exports = QuestionView;