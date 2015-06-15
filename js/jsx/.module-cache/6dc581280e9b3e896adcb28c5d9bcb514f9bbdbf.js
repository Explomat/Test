var React = require('react');
var QuestionStore = require('../Controllers/startController/stores/QuestionStore');
var QuestionActions = require('../Controllers/startController/actions/QuestionActions');
var quiestionTypes = require('../utils/QuestionTypes');

function getQuestionState() {
	return {
		title: QuestionStore.getTitle(),
		text: QuestionStore.getText(),
		answers: QuestionStore.getAnswers(),
		imgVisible: QuestionStore.getImgVisible(),
		weightVisible: QuestionStore.getWeightVisible(),
		isDisplayTypes: QuestionStore.isDisplayTypes(),
		type: QuestionStore.getTypeSelected()
	};
}

var Menu = React.createClass({displayName: "Menu",
	render:function() {
		return (
			React.createElement("div", {className: "menu all"}, 
				React.createElement("div", null, 
					React.createElement("button", {type: "button", className: "btn btn-default"}, React.createElement("span", {className: "glyphicon glyphicon-plus"})), 
					React.createElement("span", null, "Добавить раздел")
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
		//this.setState({isTypeDisplay:false});
	},

	handleDisplayTypes:function(e) {
		e.stopPropagation();
    	e.nativeEvent.stopImmediatePropagation();
    	QuestionActions.displayTypes(true);
		//this.setState({isTypeDisplay:!this.state.isTypeDisplay});
	},

	render:function() {
		var isTypeDisplayStyle = { display: this.props.isDisplayTypes ? "block":"none" };
		var list = [];
		var count = 0;
		Object.keys(quiestionTypes.values).forEach(function(k){
			if (count % 2 == 0 && count != 0)
				list.push(React.createElement("li", {key: "divider"+k, className: "divider"}));
			list.push(React.createElement(QuestionType, {key: k, id: k, type: quiestionTypes.values[k], handleSelectType: this.handleSelectType}));
			count++;
		}.bind(this));
		
		return (
			React.createElement("div", {className: "btn-group"}, 
				React.createElement("button", {className: "btn btn-default dropdown-toggle qtype-btn", type: "button", onClick: this.handleDisplayTypes}, 
					React.createElement("span", null, quiestionTypes.values[this.props.type], "  "), 
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
		return (
			React.createElement("div", {className: "panel panel-default"}, 
				React.createElement("div", {className: "panel-body"}, 
					React.createElement(Menu, null), 
					React.createElement(Title, {title: this.state.title}), 
			        React.createElement(QuestionText, {text: this.state.text}), 
			        React.createElement(SelectQuestionType, {type: this.state.type, isDisplayTypes: this.state.isDisplayTypes})
				)
			)
		);
	}
});

module.exports = QuestionView;