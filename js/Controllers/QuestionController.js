var React = require('react');
var QuestionActions = require('../actions/QuestionActions');
var QuestionAPI = require('../api/QuestionAPI');
var StructureAPI = require('../api/StructureAPI');
var Router = require('../router');
var QuestionView = require('../components/QuestionView');
var Config = require('../config');

module.exports = {

	start: function(sectionUuid, questionUuid) {
		if (!StructureAPI.isSectionExist(sectionUuid)){
			Router.navigate('#structure');
			return null;
		}
		var question = questionUuid ? QuestionAPI.getQuestion(questionUuid) : QuestionAPI.createNewQuestion();
		var app = document.getElementById(Config.dom.questionModalId) || document.body;
		React.unmountComponentAtNode(app);
		QuestionActions.receiveQuestion(question);
		React.render(React.createElement(QuestionView, {sectionUuid: sectionUuid}), app);
	}
}
