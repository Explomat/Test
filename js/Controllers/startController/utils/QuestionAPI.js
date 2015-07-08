var Storage = require('../../../utils/Storage');
var QuestionActions = require('../actions/QuestionActions');
var Config = require('../../../config');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var Promise = require('es6-promise').Promise;

function uploadFiles(eventTarget) {
	return new Promise(function(resolve, reject){
		var files = FileAPI.getFiles(eventTarget);
		FileAPI.upload({
			url: Config.url.createPath({action_name: 'uploadFile'}),
			files: { file_upload: files },
			complete: function (err, xhr){
				if (err){
					reject();
				}
				else {
					resolve(JSON.parse(xhr.responseText));
				}
			}
		});
	});
}

function errorDispatch(_actionType) {
	return function(_err){
		AppDispatcher.handleData({
			actionType: _actionType || '',
			err: _err || ''
		});
	}
}

function successDispatch(_actionType){
	return function(_success){
		AppDispatcher.handleData({
			actionType: _actionType || '',
			success: _success || ''
		});
	}
}

module.exports = {

	getQuestionData: function() {
		var question = Storage.getItem('question');
		QuestionActions.receiveQuestion(question);
	},

	//eventTarget - DOM input for FileAPI
	uploadAnswerImage: function(eventTarget){
		return uploadFiles(eventTarget);
	},

	//eventTarget - DOM input for FileAPI
	uploadQuestionImage: function(event){
		//uploadFiles(eventTarget, successDispatch(AnswerConstants.ANSWER_UPLOADIMG_SUCCESS), errorDispatch(AnswerConstants.ANSWER_UPLOADIMG_ERROR));
	}
}