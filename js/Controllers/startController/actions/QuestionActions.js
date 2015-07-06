var AppDispatcher = require('../dispatcher/AppDispatcher');
var QuestionConstants = require('../constants/QuestionConstants');
var ServerConstants = require('../constants/ServerConstants');

var QuestionActions = {

	receiveQuestion: function(data) {
		AppDispatcher.handleData({
			actionType: ServerConstants.RECEIVE_DATA,
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
	}
}

module.exports = QuestionActions;