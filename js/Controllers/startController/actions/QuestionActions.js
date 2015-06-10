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

	selectType: function(type) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.SET_TYPE_SELECTED,
			type: type
		});
	},

	addAnswer: function(answer) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_ADD,
			answer: answer
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
			actionType: QuestionConstants.ANSWER_UP,
			uuid: uuid
		});
	},

	shiftDownAnswer: function(uuid) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_DOWN,
			uuid: uuid
		});
	},

	updateImgVisible: function(imgVisible) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.IMG_VISIBLE,
			imgVisible: imgVisible
		});
	},

	updateWeightVisible: function(weightVisible) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.WEIGHT_VISIBLE,
			weightVisible: weightVisible
		});
	}
}

module.exports = QuestionActions;