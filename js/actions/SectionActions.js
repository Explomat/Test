var AppDispatcher = require('../dispatcher/AppDispatcher');
var SectionConstants = require('../constants/SectionConstants');

var SectionActions = {

	receiveSection: function(data) {
		AppDispatcher.handleAction({
			actionType: SectionConstants.RECEIVE_SECTION_DATA,
			data: data
		});
	},

	changeTitle: function(title){
		AppDispatcher.handleAction({
			actionType: SectionConstants.CHANGE_SECTION_TITLE,
			title: title
		});
	},

	changePassingScore: function(score){
		AppDispatcher.handleAction({
			actionType: SectionConstants.CHANGE_PASSING_SCORE,
			score: score
		});
	},

	changeDuration: function(duration){
		AppDispatcher.handleAction({
			actionType: SectionConstants.CHANGE_DURATION,
			duration: duration
		});
	},

	selectOrder: function(order){
		AppDispatcher.handleAction({
			actionType: SectionConstants.CHANGE_SELECT_ORDER,
			order: order
		});
	},

	selectSelection: function(selection){
		AppDispatcher.handleAction({
			actionType: SectionConstants.CHANGE_SELECT_SELECTION,
			selection: selection
		});
	}
}

module.exports = SectionActions;