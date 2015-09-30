var AppDispatcher = require('../dispatcher/AppDispatcher');
var MappingConstants = require('../constants/MappingConstants');

var SectionActions = {

	receiveSection: function(data) {
		AppDispatcher.handleAction({
			actionType: SectionConstants.RECEIVE_SECTION_DATA,
			data: data
		});
	}
}

module.exports = SectionActions;