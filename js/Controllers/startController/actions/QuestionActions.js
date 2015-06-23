var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuestionConstants = require('../constants/QuestionConstants');

var QuestionActions = {

	receiveQuestion: function(data) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.RECEIVE_DATA,
			data: data
		});
	},

	changeTitle: function(title){
		AppDispatcher.handleAction({
			actionType: QuestionConstants.SET_TITLE,
			title: title
		});
	},

	changeText: function(text) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.SET_TEXT,
			text: text
		});
	},

	displayTypes:function(isDisplay) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.DISPLAY_TYPES,
			isDisplay: isDisplay
		});
	},

	selectType: function(type) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.SET_TYPE_SELECTED,
			type: type
		});
	},

	addAnswer: function() {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_ADD
		});
	},

	removeAnswer: function(uuid) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_REMOVE,
			uuid: uuid
		});
	},

	shiftUpAnswer: function(uuid) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_SHIFT_UP,
			uuid: uuid
		});
	},

	shiftDownAnswer: function(uuid) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_SHIFT_DOWN,
			uuid: uuid
		});
	},

	addAnswerCondidtion: function(uuid) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_ADD_CONDITION,
			uuid: uuid
		});
	},

	removeAnswerCondidtion: function(uuid, conditionUuid) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_REMOVE_CONDITION,
			uuid: uuid,
			conditionUuid: conditionUuid
		});
	},

	addAnswerConformity: function(uuid) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_ADD_CONDITION,
			uuid: uuid
		});
	},

	removeAnswerConformity: function(uuid, conformity) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_REMOVE_CONDITION,
			uuid: uuid,
			conformity: conformity
		});
	},

	selectAnswer: function(uuid, selected){
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_SELECTED,
			uuid: uuid,
			selected: selected
		});
	},

	changeTextAnswer: function(uuid, text){
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_CHANGE_TEXT,
			uuid: uuid,
			text: text
		});
	},

	changeWeightAnswer: function(uuid, weight){
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_CHANGE_WEIGHT,
			uuid: uuid,
			weight: weight
		});
	},

	changeImgAnswer: function(uuid, img){
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_CHANGE_IMG,
			uuid: uuid,
			img: img
		});
	},
}

module.exports = QuestionActions;