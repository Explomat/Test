var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuestionConstants = require('../constants/QuestionConstants');

/*
	RECEIVE_DATA: null,
	SET_TYPE_SELECTED: null,
	ANSWER_ADD: null,
	ANSWER_REMOVE: null,
	ANSWER_UP: null,
	ANSWER_DOWN: null,
	IMG_VISIBLE: null,
	WEIGHT_VISIBLE: null
*/

var QuestionActions = {

	receiveQuestion: function(data) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.RECEIVE_DATA,
			data: data
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

	removeAnswer: function(id) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_REMOVE,
			id: id
		});
	},

	upAnswer: function(id) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_UP,
			id: id
		});
	},

	downAnswer: function(id) {
		AppDispatcher.handleAction({
			actionType: QuestionConstants.ANSWER_DOWN,
			id: id
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