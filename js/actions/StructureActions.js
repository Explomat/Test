var AppDispatcher = require('../dispatcher/AppDispatcher');
var StructureConstants = require('../constants/StructureConstants');
var ServerConstants = require('../constants/ServerConstants');
var StructureAPI = require('../api/StructureAPI');

var StructureActions = {

	receiveStructure: function(data) {
		AppDispatcher.handleData({
			actionType: ServerConstants.RECEIVE_STRUCTURE_DATA,
			data: data
		});
	}
}

module.exports = StructureActions;