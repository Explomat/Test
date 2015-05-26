
function StartController() {
	var React = require('React');
	var app = document.getElementById('app');
	React.unmountComponentAtNode(app);

	this.start = function() {
		var questionView = require('../../../build/js/jsx/QuestionView');
		React.render(React.createElement(questionView), app);
	}
}

module.exports = new StartController();
