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
	}
}

module.exports = SectionActions;