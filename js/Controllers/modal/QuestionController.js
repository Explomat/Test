var React = require('react');
var ReactDOM = require('react-dom');
var QuestionActions = require('../../actions/QuestionActions');
var QuestionAPI = require('../../api/QuestionAPI');
var StructureAPI = require('../../api/StructureAPI');
var Hasher = require('../../utils/Hasher');
var QuestionView = require('../../components/QuestionView');
var Config = require('../../config');

module.exports = {

	start: function(sectionUuid, questionUuid, x, y) {
		var question = questionUuid ? QuestionAPI.getQuestion(questionUuid) : QuestionAPI.createQuestion();
		if (!StructureAPI.isSectionExist(sectionUuid) || !question){
			Hasher.setHash('structure');
			return;
		}
		var app = document.getElementById(Config.dom.modalId) || document.body;
		ReactDOM.unmountComponentAtNode(app);
		QuestionActions.receiveQuestion(question);
		ReactDOM.render(React.createElement(QuestionView, {sectionUuid: sectionUuid, positionX: x, positionY: y}), app);
	}
}
