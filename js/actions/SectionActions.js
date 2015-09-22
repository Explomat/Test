var AppDispatcher = require('../dispatcher/AppDispatcher');
var SectionConstants = require('../constants/SectionConstants');

var SectionActions = {

	addAnswer: function() {
		AppDispatcher.handleAction({
			actionType: SectionConstants.RECEIVE_DATA
		});
	}
}

module.exports = SectionActions;