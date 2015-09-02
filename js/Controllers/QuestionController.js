var React = require('react');
var QuestionActions = require('../actions/QuestionActions');
var QuestionAPI = require('../api/QuestionAPI');
var QuestionView = require('../components/QuestionView');

function QuestionController() {
	var app = document.getElementById('add_question') || document.body;
	React.unmountComponentAtNode(app);

	this.start = function(args) {
		QuestionAPI.getQuestionData().then(function(data){
			QuestionActions.receiveQuestion(data);
			React.render(React.createElement(QuestionView, args), app);
		});
	}
}

module.exports = QuestionController;
