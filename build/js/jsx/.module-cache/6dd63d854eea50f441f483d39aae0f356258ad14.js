var React = require('React');

var Menu = React.createClass({displayName: "Menu",
	render:function() {
		return (
			React.createElement("div", {className: "menu all"}, 
				React.createElement("i", {className: "fa fa-file-image-o fa-3x"})
			)
		);
	}
})

var QuestionView = React.createClass({displayName: "QuestionView",
	render:function () {
		return (
			React.createElement("div", {className: "panel panel-default"}, 
				React.createElement("div", {className: "panel-body"}, 
					React.createElement(Menu, null), 
					React.createElement("div", {className: "input-group all .menu-float"}, 
			            React.createElement("span", {className: "input-group-addon"}, "Заголовок : *"), 
			            React.createElement("input", {type: "text", className: "form-control", placeholder: "Заголовок вопроса"})
			        ), 
			        React.createElement("div", {className: "form-group all menu-float"}, 
						React.createElement("label", null, "Вопрос : *"), 
						React.createElement("textarea", {className: "form-control", rows: "2"})
					)
				)
			)
		);
	}
});

module.exports = QuestionView;