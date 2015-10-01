var AppDispatcher = require('../dispatcher/AppDispatcher');
var MappingConstants = require('../constants/MappingConstants');

var MappingActions = {

	receiveData: function(data) {
		AppDispatcher.handleAction({
			actionType: MappingConstants.RECEIVE_MAPPING_DATA,
			data: data
		});
	}
}

module.exports = MappingActions;