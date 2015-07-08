var Storage = require('../../../utils/Storage');
var QuestionActions = require('../actions/QuestionActions');
var AnswerActions = require('../actions/AnswerActions');
var Config = require('../../../config');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AnswerConstants = require('../constants/AnswerConstants');

function uploadFiles(eventTarget, successCallBack, errorCallBack) {
	var files = FileAPI.getFiles(eventTarget);
	var ctx = this;
	FileAPI.upload({
		url: Config.url.createPath({action_name: 'uploadFile'}),
		files: { file_upload: files },
		complete: function (err, xhr){
			if (err){
				if (errorCallBack)
					errorCallBack(err);
				return;
			}
			else if (successCallBack){
				successCallBack(JSON.parse(xhr.responseText));
			}
		}
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
		uploadFiles(eventTarget, successDispatch(AnswerConstants.ANSWER_UPLOADIMG_SUCCESS), errorDispatch(AnswerConstants.ANSWER_UPLOADIMG_ERROR));
	},

	//eventTarget - DOM input for FileAPI
	uploadQuestionImage: function(event){
		uploadFiles(eventTarget, successDispatch(), errorDispatch());
	}
}