var React = require('react');
var QuestionActions = require('../actions/QuestionActions');
var QuestionAPI = require('../utils/QuestionAPI');
var QuestionView = require('../components/QuestionView');

function StructureController() {
	var app = document.getElementById('app');
	React.unmountComponentAtNode(app);

	this.start = function() {
		QuestionAPI.getQuestionData().then(function(data){
			QuestionActions.receiveQuestion(data);
			React.render(React.createElement(QuestionView), app);
		});
	}
}

module.exports = new StructureController();
