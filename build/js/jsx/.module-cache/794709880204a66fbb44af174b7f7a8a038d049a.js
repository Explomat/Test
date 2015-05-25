var React = require('React');

var QuestionView = React.createClass({displayName: "QuestionView",
	render:function () {
		return (
			React.createElement("div", {className: "panel panel-default"}, 
				React.createElement("div", {className: "panel-body"}, 
					React.createElement("div", {className: "input-group"}, 
			            React.createElement("span", {className: "input-group-addon"}, "Заголовок : *"), 
			            React.createElement("input", {type: "text", className: "form-control", placeholder: "Заголовок вопроса"})
			        ), 
			        React.createElement("div", {className: "form-group all"}, 
						React.createElement("label", {for: "comment"}, "Вопрос : *"), 
						React.createElement("textarea", {className: "form-control", style: {"resize":"none"}})
					)
				)
			)
		);
	}
});

module.exports = QuestionView;