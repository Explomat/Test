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
	},

	addSection: function(){
		AppDispatcher.handleData({
			actionType: StructureConstants.ADD_SECTION
		});
	},

	removeSection: function(uuid){
		AppDispatcher.handleData({
			actionType: StructureConstants.REMOVE_SECTION,
			uuid: uuid
		});
	}
}

module.exports = StructureActions;