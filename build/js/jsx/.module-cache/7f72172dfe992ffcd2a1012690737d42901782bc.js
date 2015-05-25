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
			        React.createElement("div", {className: "form-group"}, 
						React.createElement("label", {for: "comment"}, "Comment:"), 
						React.createElement("textarea", {className: "form-control", rows: "5", id: "comment"})
					)
				)
			)
		);
	}
});

module.exports = QuestionView;