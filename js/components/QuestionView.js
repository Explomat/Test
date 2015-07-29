var React = require('react');
var QuestionStore = require('../stores/QuestionStore');
var AnswersStore = require('../stores/AnswersStore');
var QuestionActions = require('../actions/QuestionActions');
var AnswerActions = require('../actions/AnswerActions');
var QuestionTypes = require('../utils/QuestionTypes');
var Answer = require('./AnswersView');
var Txt = require('./modules/Text');
var ImageSelect = require('./modules/ImageSelect');

function getQuestionState() {
	return {
		title: QuestionStore.getTitle(),
		text: QuestionStore.getText(),
		answers: AnswersStore.getAnswers(),
		type: QuestionStore.getTypeSelected()
	};
}

var Menu = React.createClass({displayName: "Menu",

	handleClick:function() {
		AnswerActions.addAnswer();
	},

	render:function() {
		return (
			React.createElement("div", {className: "pull-right"}, 
				React.createElement("button", {type: "button", className: "btn btn-default btn-sm", onClick: this.handleClick}, 
					React.createElement("span", {className: "glyphicon glyphicon-plus"}), 
					React.createElement("span", null, " Добавить ответ")
				)
			)
		);
	}
});

var Title = React.createClass({displayName: "Title",

	handleChange:function(val) {
		QuestionActions.changeTitle(val);
	},

	render:function() {
		return (
			React.createElement("div", {className: "input-group all"}, 
	            React.createElement("span", {className: "input-group-addon"}, "Заголовок : *"), 
	            React.createElement(Txt.TextView, {value: this.props.title, onBlur: this.handleChange, placeholder: "Заголовок вопроса"})
	        )
		);
	}
});

var QuestionImage = React.createClass({displayName: "QuestionImage",

	uploadImage: function(eventTarget) {
		QuestionActions.uploadImage(eventTarget);
	},

	removeImage: function (img) {
		QuestionActions.removeImage(img);
	},

	render:function() {
		return (
			React.createElement(ImageSelect, {img: QuestionStore.getImg(), uploadImage: this.uploadImage, removeImage: this.removeImage})
		);
	}
});

var QuestionText = React.createClass({displayName: "QuestionText",

	handleChange:function(val) {
		QuestionActions.changeText(val);
	},

	render:function() {
		return (
			React.createElement("div", {className: "form-group all"}, 
				React.createElement("label", null, "Вопрос : *"), 
				React.createElement(Txt.TextAreaView, {value: this.props.text, onBlur: this.handleChange, placeholder: "Введите вопрос"})
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
			React.createElement("li", {onClick: this.handleSelectType}, 
				React.createElement("span", null, this.props.type)
			)
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

	getInitialState: function() {
		return {
			display: false
		}
	},

	handleSelectType:function(key) {
		QuestionActions.selectType(key);
	},

	handleBlurTypes:function() {
		if (this.state.display === true)
			this.setState({display: false});
	},

	handleDisplayTypes:function(e) {
		if (e){
			e.stopPropagation();
    		e.nativeEvent.stopImmediatePropagation();
		}
		this.setState({display: !this.state.display});
		/*e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();
    	QuestionActions.displayTypes(!QuestionStore.isDisplayTypes());*/
	},

	render: function() {
		var isTypeDisplayStyle = { display: this.state.display ? "block" : "none" };
		var list = [];
		Object.keys(QuestionTypes.values).forEach(function(k, count){
			if (count % 2 == 0 && count != 0)
				list.push(React.createElement("li", {key: "divider"+k + count, className: "divider"}));
			list.push(React.createElement(QuestionType, {key: k + count, id: k, type: QuestionTypes.values[k], handleSelectType: this.handleSelectType}));
		}.bind(this));
		
		return (
			React.createElement("div", {className: "btn-group btn-group-sm"}, 
				React.createElement("button", {className: "btn btn-default dropdown-toggle qtype-btn", type: "button", onClick: this.handleDisplayTypes}, 
					React.createElement("span", null, QuestionTypes.values[this.props.type], "  "), 
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
		AnswersStore.addChangeListener(this._onChange);
	},

	componentWillUnmount:function() {
		QuestionStore.removeChangeListener(this._onChange);
		AnswersStore.addChangeListener(this._onChange);
	},

	_onChange:function() {
		this.setState(getQuestionState());
	},

	getInitialState: function () {
		return getQuestionState();
	},

	render:function () {
		var answers = [];
		var qType = QuestionStore.getTypeSelected();
		this.state.answers.forEach(function(ans, i){
			var answer = null;
			if (qType == QuestionTypes.keys.multiple_choice || qType == QuestionTypes.keys.multiple_response)
				answer = React.createElement(Answer.ChoiceAnswer, {uuid: ans.uuid, key: ans.uuid, selected: ans.selected, number: i+1, text: ans.text, weight: ans.weight});
			else if (qType == QuestionTypes.keys.order)
				answer = React.createElement(Answer.OrderAnswer, {uuid: ans.uuid, key: ans.uuid, number: i+1, text: ans.text, weight: ans.weight});
			else if (qType == QuestionTypes.keys.match_item)
				answer = React.createElement(Answer.MatchItemAnswer, {uuid: ans.uuid, key: ans.uuid, number: i+1, text: ans.text, weight: ans.weight, height: ans.height, width: ans.width});
			else if (qType == QuestionTypes.keys.numerical_fill_in_blank)
				answer = React.createElement(Answer.NumericalFillAnswer, {uuid: ans.uuid, key: ans.uuid, number: i+1, text: ans.text, weight: ans.weight, height: ans.height, width: ans.width});
			else if (qType == QuestionTypes.keys.gap_fill)
				answer = React.createElement(Answer.ConformityAnswer, {uuid: ans.uuid, key: ans.uuid, number: i+1, text: ans.text, weight: ans.weight});
			if (answer)
				answers.push(answer);
		});
		return (
			React.createElement("div", {className: "panel panel-default"}, 
				React.createElement("div", {className: "panel-heading"}, 
					React.createElement(Title, {title: this.state.title}), 
					React.createElement(QuestionImage, null), 
			        React.createElement(QuestionText, {text: this.state.text}), 
			        React.createElement(Menu, null), 
			        React.createElement(SelectQuestionType, {type: this.state.type})
				), 
				React.createElement("div", {className: "panel-body answers"}, 
			        answers
				)
			)
		);
	}
});

module.exports = QuestionView;