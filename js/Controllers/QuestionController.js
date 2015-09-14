var React = require('react');
var QuestionActions = require('../actions/QuestionActions');
var QuestionAPI = require('../api/QuestionAPI');
var StructureAPI = require('../api/StructureAPI');
var Router = require('../router');
var QuestionView = require('../components/QuestionView');
var Config = require('../config');

module.exports = {

	start: function(sectionId) {
		if (!StructureAPI.isSectionExist(sectionId)){
			Router.navigate('#structure');
			return null;
		}
		return {
			promise: Promise.resolve(QuestionAPI.createNewQuestion()),
			promiseCallBack: function(data){
				var app = document.getElementById(Config.dom.questionModalId) || document.body;
				React.unmountComponentAtNode(app);
				QuestionActions.receiveQuestion(data);
				React.render(React.createElement(QuestionView, sectionId), app);
			}
		}
	}
}
