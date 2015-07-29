function QuestionController() {
	var React = require('react');
	var app = document.getElementById('app');
	React.unmountComponentAtNode(app);

	var QuestionActions = require('../actions/QuestionActions');
	var QuestionAPI = require('../utils/QuestionAPI');
	var QuestionView = require('../jsx/QuestionView');

	this.start = function() {
		QuestionAPI.getQuestionData().then(function(data){
			QuestionActions.receiveQuestion(data);
			React.render(React.createElement(QuestionView), app);
		});
	}
}

module.exports = new QuestionController();
