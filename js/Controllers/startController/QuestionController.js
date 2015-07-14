function QuestionController() {
	var React = require('react');
	var app = document.getElementById('app');
	React.unmountComponentAtNode(app);

	var QuestionActions = require('./actions/QuestionActions');
	var QuestionAPI = require('./utils/QuestionAPI');
	var QuestionView = require('../../../js/jsx/QuestionView');

	QuestionAPI.getQuestionData().then(function(data){
		QuestionActions.receiveQuestion(data);
	});

	this.start = function() {
		React.render(React.createElement(QuestionView), app);
	}
}

module.exports = new QuestionController();
