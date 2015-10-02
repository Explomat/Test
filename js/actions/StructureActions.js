var AppDispatcher = require('../dispatcher/AppDispatcher');
var StructureConstants = require('../constants/StructureConstants');
var StructureAPI = require('../api/StructureAPI');

var StructureActions = {

	receiveStructure: function(data) {
		AppDispatcher.handleData({
			actionType: StructureConstants.RECEIVE_STRUCTURE_DATA,
			data: data
		});
	},

	saveStructure: function(structure){
		StructureAPI.saveStructure(structure);
		AppDispatcher.handleData({
			actionType: StructureConstants.SAVE_STRUCTURE_DATA
		});
	},

	removeQuestion: function(sectionUuid, questionUuid){
		StructureAPI.removeQuestion(sectionUuid, questionUuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REMOVE_QUESTION,
			sectionUuid: sectionUuid,
			questionUuid: questionUuid
		});
	},

	replaceQuestion: function(questionUuid, sourceSectionUuid, destSectionUuid){
		StructureAPI.replaceQuestion(questionUuid, sourceSectionUuid, destSectionUuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REPLACE_QUESTION,
			questionUuid: questionUuid,
			sourceSectionUuid: sourceSectionUuid,
			destSectionUuid: destSectionUuid
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
		StructureAPI.removeSection(uuid);
		AppDispatcher.handleData({
			actionType: StructureConstants.REMOVE_SECTION,
			uuid: uuid
		});
	}
}

module.exports = StructureActions;