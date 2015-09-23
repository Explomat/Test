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

	saveStructure: function(structure){
		StructureAPI.saveStructure(structure);
	},

	removeQuestion: function(sectionUuid, questionUuid){
		StructureAPI.removeQuestion(sectionUuid, questionUuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REMOVE_QUESTION,
			sectionUuid: sectionUuid,
			questionUuid: questionUuid
		});
	},

	saveSection: function(section){
		StructureAPI.saveSection(section);
		AppDispatcher.handleData({
			actionType: StructureConstants.SAVE_SECTION,
			section: section
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