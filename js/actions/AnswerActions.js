var AppDispatcher = require('../dispatcher/AppDispatcher');
var AnswerConstants = require('../constants/AnswerConstants');
var ServerConstants = require('../constants/ServerConstants');
var QuestionAPI = require('../api/QuestionAPI');

var AnswerActions = {

	addAnswer: function() {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_ADD
		});
	},

	removeAnswer: function(uuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_REMOVE,
			uuid: uuid
		});
	},

	shiftUpAnswer: function(uuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_SHIFT_UP,
			uuid: uuid
		});
	},

	shiftDownAnswer: function(uuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_SHIFT_DOWN,
			uuid: uuid
		});
	},

	changeAnswerCondition: function(uuid, text, type) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_CONDITION,
			uuid: uuid,
			text: text, 
			type: type
		})
	},

	changeAnswerConditionText: function(uuid, text, type) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_CONDITIONTEXT,
			uuid: uuid,
			text: text,
			type: type
		})
	},
	
	changeAnswerConformity: function(uuid, text) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_CONFORMITY,
			uuid: uuid,
			text: text
		});
	},

	changeAnswerImg: function(uuid, img){
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_IMG,
			uuid: uuid,
			img: img
		});
	},

	selectAnswer: function(uuid, selected){
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_SELECTED,
			uuid: uuid,
			selected: selected
		});
	},

	changeTextAnswer: function(uuid, text){
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_TEXT,
			uuid: uuid,
			text: text
		});
	},

	changeWeightAnswer: function(uuid, weight){
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_WEIGHT,
			uuid: uuid,
			weight: weight
		});
	},

	//eventTarget - DOM input for FileAPI
	uploadImage: function(uuid, eventTarget){
		QuestionAPI.uploadImage(eventTarget).then(function(img){
			AppDispatcher.handleData({
				actionType: ServerConstants.UPLOADED_ANSWER_IMAGE,
				uuid: uuid,
				img: img
			});
		}, function(err) {
			AppDispatcher.handleData({
				actionType: ServerConstants.UPLOADED_ANSWER_ERROR_IMAGE,
				uuid: uuid,
				err: err
			});
		});
	},

	removeImage: function(uuid, img){
		QuestionAPI.removeImage(img).then(function(){
			AppDispatcher.handleData({
				actionType: ServerConstants.REMOVE_ANSWER_IMAGE,
				uuid: uuid
			});
			
		}, function(err) {
			AppDispatcher.handleData({
				actionType: ServerConstants.REMOVE_ANSWER_ERROR_IMAGE,
				uuid: uuid,
				err: err
			});
		});
	},

	toogleExpand: function(uuid, isExpanded){
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_TOOGLE_EXPAND,
			uuid: uuid,
			isExpanded: isExpanded
		});
	}
}

module.exports = AnswerActions;