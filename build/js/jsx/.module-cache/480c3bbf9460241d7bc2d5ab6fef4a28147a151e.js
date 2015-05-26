var React = require('React');

var quiestionTypes = {
	values:{
		'multiple_choice':'Единственный выбор',
		'multiple_response':'Множественный выбор',
		'order':'Ранжирование',
		'gap_fill':'Соответствие',
		'numerical_fill_in_blank':'Текстовый ввод',
		'match_item':'Цифровой ввод'
	},

	toArray:function() {
		return (Object.keys(this.values).map(function(key){
			var obj = {};
			Object.defineProperty(obj, key,{
				value: this.values[key],
				writable: true,
				enumerable: true,
				configurable: true
			});
	    	return obj;
	    }.bind(this)));
	}
};

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
	render:function() {
		return (
			React.createElement("div", {className: "input-group all menu-float"}, 
	            React.createElement("span", {className: "input-group-addon"}, "Заголовок : *"), 
	            React.createElement("input", {type: "text", className: "form-control", placeholder: "Заголовок вопроса", value: this.props.title})
	        )
		);
	}
});

var QuestionText = React.createClass({displayName: "QuestionText",
	render:function() {
		return (
			React.createElement("div", {className: "form-group all menu-float"}, 
				React.createElement("label", null, "Вопрос : *"), 
				React.createElement("textarea", {className: "form-control", rows: "2", value: this.props.qText})
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

	handleBlurTypes:function() {
		//this.setState({isTypeDisplay:false});
	},

	handleDisplayTypes:function() {
		this.setState({isTypeDisplay:!this.state.isTypeDisplay});
	},

	getInitialState:function() {
		return {
			isTypeDisplay:false,
			qType:this.props.qType || quiestionTypes.values.multiple_choice
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
				React.createElement("div", {className: "btn btn-default qtype-btn"}, 
					quiestionTypes.values[this.state.qType]
				), 
				React.createElement("button", {type: "button", className: "btn btn-primary dropdown-toggle", onClick: this.handleDisplayTypes, onBlur: this.handleBlurTypes}, 
					React.createElement("span", {className: "caret"})
				), 
				React.createElement("ul", {className: "dropdown-menu", role: "menu", style: isTypeDisplayStyle}, 
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
			qText: 'B',
			qType: 'order'
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