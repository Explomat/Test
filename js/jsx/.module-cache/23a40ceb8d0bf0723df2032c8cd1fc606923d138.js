var React = require('react');
var quiestionTypes = require('../utils/QuestionTypes');

var Menu = React.createClass({displayName: "Menu",
	render:function() {
		return (
			React.createElement("div", {className: "menu all"}, 
				React.createElement("div", null, 
					React.createElement("button", {type: "button", className: "menu-item"}, React.createElement("i", {className: "fa fa-file-image-o fa-2x"})), 
					React.createElement("span", null, "Показывать картинки")
				), 
				React.createElement("div", null, 
					React.createElement("button", {type: "button", className: "menu-item"}, React.createElement("i", {className: "fa fa-cubes fa-2x"})), 
					React.createElement("span", null, "Показывать вес")
				)
			)
		);
	}
});

var Title = React.createClass({displayName: "Title",

	handleChange:function(e) {
		this.setState({title:e.target.value});
	},

	getInitialState:function() {
		return {
			title:this.props.title || ''
		}
	},

	render:function() {
		return (
			React.createElement("div", {className: "input-group all menu-float"}, 
	            React.createElement("span", {className: "input-group-addon"}, "Заголовок : *"), 
	            React.createElement("input", {type: "text", className: "form-control", placeholder: "Заголовок вопроса", value: this.state.title, onChange: this.handleChange})
	        )
		);
	}
});

var QuestionText = React.createClass({displayName: "QuestionText",

	handleChange:function(e) {
		this.setState({qText:e.target.value});
	},

	getInitialState:function() {
		return {
			qText:this.props.qText || ''
		}
	},

	render:function() {
		return (
			React.createElement("div", {className: "form-group all menu-float"}, 
				React.createElement("label", null, "Вопрос : *"), 
				React.createElement("textarea", {className: "form-control", rows: "2", value: this.state.qText, onChange: this.handleChange})
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

	handleSelectType:function(key) {
		this.setState({qType:key});
		this.handleDisplayTypes();
	},

	handleBlurTypes:function(e) {
		console.log(e.currentTarget.parentNode);
		console.log(e.target.parentNode);
		console.log(e.target);
		console.log(e.relatedTarget);
		this.setState({isTypeDisplay:false});
	},

	handleDisplayTypes:function() {
		this.setState({isTypeDisplay:!this.state.isTypeDisplay});
		React.findDOMNode(this.refs.ul).focus();
	},

	getInitialState:function() {
		return {
			isTypeDisplay:false,
			qType:this.props.qType
		}
	},

	render:function() {
		var isTypeDisplayStyle = { display: this.state.isTypeDisplay ? "block":"none" };
		var list = [];
		var count = 0;
		Object.keys(quiestionTypes.values).forEach(function(k){
			if (count % 2 == 0 && count != 0)
				list.push(React.createElement("li", {key: "divider"+k, className: "divider"}));
			list.push(React.createElement(QuestionType, {key: k, id: k, type: quiestionTypes.values[k], handleSelectType: this.handleSelectType}));
			count++;
		}.bind(this));
		return (
			React.createElement("div", {className: "btn-group select-qtype", tabIndex: "0"}, 
				React.createElement("button", {type: "button", className: "btn btn-default qtype-btn"}, 
					quiestionTypes.values[this.state.qType]
				), 
				React.createElement("button", {type: "button", className: "btn btn-primary dropdown-toggle", onClick: this.handleDisplayTypes}, 
					React.createElement("span", {className: "caret"})
				), 
				React.createElement("ul", {className: "dropdown-menu", role: "menu", style: isTypeDisplayStyle, ref: "ul", onBlur: this.handleBlurTypes, tabIndex: "-1"}, 
					list
				)
			)
		);
	}
});

var QuestionView = React.createClass({displayName: "QuestionView",

	getDefaultProps:function() {
		return {
			title: 'A',
			qText: 'BB',
			qType: 'multiple_choice'
		}
	},

	render:function () {
		return (
			React.createElement("div", {className: "panel panel-default"}, 
				React.createElement("div", {className: "panel-body"}, 
					React.createElement(Menu, null), 
					React.createElement(Title, {title: this.props.title}), 
			        React.createElement(QuestionText, {qText: this.props.qText}), 
			        React.createElement(SelectQuestionType, {qType: this.props.qType})
				)
			)
		);
	}
});

module.exports = QuestionView;