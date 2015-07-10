var AppDispatcher = require('../dispatcher/AppDispatcher');
var AnswerConstants = require('../constants/AnswerConstants');
var ServerConstants = require('../constants/ServerConstants');
var QuestionAPI = require('../utils/QuestionAPI');

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

	addAnswerCondition: function(uuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_ADD_CONDITION,
			uuid: uuid
		});
	},

	removeAnswerCondition: function(uuid, conditionUuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_REMOVE_CONDITION,
			uuid: uuid,
			conditionUuid: conditionUuid
		});
	},

	changeAnswerCondition: function(uuid, conditionUuid, text, type) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_CONDITION,
			uuid: uuid,
			conditionUuid: conditionUuid,
			text: text, 
			type: type
		})
	},

	addAnswerConditionText: function(uuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_ADD_CONDITIONTEXT,
			uuid: uuid
		});
	},

	removeAnswerConditionText: function(uuid, conditionUuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_REMOVE_CONDITIONTEXT,
			uuid: uuid,
			conditionUuid: conditionUuid
		});
	},

	changeAnswerConditionText: function(uuid, conditionUuid, text, type) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_CONDITIONTEXT,
			uuid: uuid,
			conditionUuid: conditionUuid,
			text: text,
			type: type
		})
	},
	
	addAnswerConformity: function(uuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_ADD_CONFORMITY,
			uuid: uuid
		});
	},

	removeAnswerConformity: function(uuid, conformityUuid) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_REMOVE_CONFORMITY,
			uuid: uuid,
			conformityUuid: conformityUuid
		});
	},

	changeAnswerConformity: function(uuid, conformityUuid, text) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_CONFORMITY,
			uuid: uuid,
			conformityUuid: conformityUuid,
			text: text
		});
	},

	changeAnswerSize: function(uuid, width, height) {
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_CHANGE_SIZE,
			uuid: uuid,
			width: width,
			height: height
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
		/*AppDispatcher.handleData({
			actionType: ServerConstants.UPLOADED_IMAGE,
			uuid: uuid,
			img: {id:123, name: "TEST"}
		});*/
		QuestionAPI.uploadAnswerImage(eventTarget).then(function(img){
			AppDispatcher.handleData({
				actionType: ServerConstants.UPLOADED_IMAGE,
				uuid: uuid,
				img: img
			});
		}, function(err) {
			AppDispatcher.handleData({
				actionType: ServerConstants.UPLOADED_ERROR_IMAGE,
				uuid: uuid,
				err: err
			});
		});
	},

	removeImage: function(uuid, img){
		QuestionAPI.removeImage(img).then(function(isRemoved){
			AppDispatcher.handleData({
				actionType: ServerConstants.REMOVE_IMAGE,
				uuid: uuid,
				isRemoved: isRemoved
			});
		}, function(err) {
			console.log(err);
		});
	}

	/*uploadImageSuccess: function(uuid, img){
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_IMG_SUCCES_UPLOAD,
			uuid: uuid,
			img: img
		});
	},

	uploadImageError: function(uuid){
		AppDispatcher.handleAction({
			actionType: AnswerConstants.ANSWER_IMG_ERROR_UPLOAD,
			uuid: uuid
		});
	}*/
}

module.exports = AnswerActions;