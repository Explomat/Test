var Storage = require('../../../utils/Storage');
var QuestionActions = require('../actions/QuestionActions');
var AnswerActions = require('../actions/AnswerActions');
var Config = require('../../../config');
var AppDispatcher = require('../dispatcher/AppDispatcher');

function uploadFiles(eventTarget, successCallBack, errorCallBack) {
	var files = FileAPI.getFiles(eventTarget);
	var ctx = this;
	FileAPI.upload({
		url: Config.getPath({action_name: 'uploadFile'}),//'http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087&server_id=6166852566696923932&action_name=uploadFile',
		files: { file_upload: files },
		complete: function (err, xhr){
			if (err){
				if (errorCallBack)
					errorCallBack(err);
				return;
			}
			//var img = JSON.parse(xhr.responseText);
			if (successCallBack){
				successCallBack(JSON.parse(xhr.responseText));
			}
		}
	});
}

function errorDispatch(_actionType, _err) {
	return function(){
		AppDispatcher.handleData({
			actionType: _actionType,
			err: _err || ''
		});
	}
}

function successDispatch(_actionType, _success){
	AppDispatcher.handleData({
		actionType: _actionType,
		success: _success || ''
	});
}

module.exports = {

	getQuestionData: function() {
		var question = Storage.getItem('question');
		QuestionActions.receiveQuestion(question);
	},

	//eventTarget - DOM input for FileAPI
	uploadAnswerImage: function(eventTarget){
		uploadFiles(eventTarget, successDispatch(), errorDispatch());
	},

	//eventTarget - DOM input for FileAPI
	uploadQuestionImage: function(event){
		uploadFiles(eventTarget, successDispatch(), errorDispatch());
	}
}