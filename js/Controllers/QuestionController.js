var React = require('react');
var QuestionActions = require('../actions/QuestionActions');
var QuestionAPI = require('../api/QuestionAPI');
var StructureAPI = require('../api/StructureAPI');
var Hasher = require('../utils/Hasher');
var QuestionView = require('../components/QuestionView');
var Config = require('../config');

module.exports = {

	start: function(sectionUuid, questionUuid) {
		var question = questionUuid ? QuestionAPI.getQuestion(questionUuid) : QuestionAPI.createQuestion();
		if (!StructureAPI.isSectionExist(sectionUuid) || !question){
			Hasher.setHash('structure');
			return;
		}
		var app = document.getElementById(Config.dom.modalId) || document.body;
		React.unmountComponentAtNode(app);
		QuestionActions.receiveQuestion(question);
		React.render(React.createElement(QuestionView, {sectionUuid: sectionUuid}), app);
	}
}
