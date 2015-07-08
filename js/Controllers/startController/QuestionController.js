
function QuestionController() {
	var React = require('react');
	var app = document.getElementById('app');
	React.unmountComponentAtNode(app);

	var QuestionData = require('./QuestionData');
	var QuestionAPI = require('./utils/QuestionAPI');
	var QuestionView = require('../../../js/jsx/QuestionView');

	QuestionData.init();
	QuestionAPI.getQuestionData();

	this.start = function() {
		React.render(React.createElement(QuestionView), app);
	}
}

module.exports = new QuestionController();
