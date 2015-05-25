var React = require('React');

var QuestionView = React.createClass({displayName: "QuestionView",
	render:function () {
		return (
			React.createElement("div", {className: "panel panel-default"}, 
				"AAA"
			)
		);
	}
});

module.exports = QuestionView;