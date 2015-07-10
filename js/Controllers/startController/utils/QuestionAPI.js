var Storage = require('../../../utils/Storage');
var QuestionActions = require('../actions/QuestionActions');
var Config = require('../../../config');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Ajax = require('../../../utils/Ajax');

module.exports = {

	getQuestionData: function() {
		var question = Storage.getItem('question');
		QuestionActions.receiveQuestion(question);
	},

	//eventTarget - DOM input for FileAPI
	uploadAnswerImage: function(eventTarget){
		return Ajax.uploadFiles(eventTarget, Config.url.createPath({action_name: 'uploadFile'}));
	},

	removeImage: function(img){
		return Ajax.sendRequest(Config.url.createPath({action_name: 'removeImage', id: img.id, name: img.name}));
	},

	//eventTarget - DOM input for FileAPI
	uploadQuestionImage: function(eventTarget){
		
	}
}